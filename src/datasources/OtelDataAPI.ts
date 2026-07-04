import { randomUUID } from 'node:crypto';
import type { components } from '@stuartshay/otel-data-types';
import { config } from '../config.js';

type Schemas = components['schemas'];

/** Accept null from GraphQL InputMaybe<T> args. buildUrl already skips null/undefined. */
type Nullable<T> = { [K in keyof T]: T[K] | null };

type GarminSyncTriggerResult = Schemas['GarminSyncResponse'] & {
  accepted: boolean;
};

type GarminSyncUpstreamResponse = Schemas['GarminSyncResponse'] & {
  accepted?: boolean | null;
};

interface FetchParams {
  path: string;
  query?: Record<string, string | number | boolean | undefined | null>;
  method?: 'GET' | 'POST';
  /** TTL in milliseconds. When set, responses are cached and deduplicated. */
  cacheTtlMs?: number;
  /** Non-2xx statuses to handle as structured responses instead of throwing. */
  acceptStatusCodes?: number[];
  /** Extra HTTP headers to include in the request. */
  headers?: Record<string, string>;
  /** Abort timeout in milliseconds (default: 30 000). */
  timeoutMs?: number;
}

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

interface GarminDeviceCount {
  label: string;
  activity_count: number;
}

interface GarminActivityClimb {
  id: number;
  activity_id: string;
  source_split_index: number;
  message_index: number | null;
  split_type: string | null;
  climb_type: string | null;
  start_time: string | null;
  end_time: string | null;
  start_time_local: string | null;
  duration_seconds: number | null;
  elapsed_duration_seconds: number | null;
  moving_duration_seconds: number | null;
  distance_meters: number | null;
  elevation_gain_meters: number | null;
  elevation_loss_meters: number | null;
  start_elevation_meters: number | null;
  average_grade_percent: number | null;
  max_grade_percent: number | null;
  average_speed_mps: number | null;
  average_moving_speed_mps: number | null;
  max_speed_mps: number | null;
  average_vertical_speed_mps: number | null;
  average_elapsed_vertical_speed_mps: number | null;
  start_latitude: number | null;
  start_longitude: number | null;
  end_latitude: number | null;
  end_longitude: number | null;
  climb_pro_difficulty: string | null;
  calories: number | null;
  bmr_calories: number | null;
  average_temperature_c: number | null;
  min_temperature_c: number | null;
  max_temperature_c: number | null;
  created_at: string | null;
  updated_at: string | null;
}

type GarminActivityLap = Schemas['GarminActivityLap'];

/** Map that evicts expired entries on access, preventing unbounded growth. */
class ExpiringCache<K, V extends { expiry: number }> extends Map<K, V> {
  override get(key: K): V | undefined {
    const value = super.get(key);
    if (!value) return undefined;
    if (Date.now() > value.expiry) {
      super.delete(key);
      return undefined;
    }
    return value;
  }

  override has(key: K): boolean {
    const value = super.get(key);
    if (!value) return false;
    if (Date.now() > value.expiry) {
      super.delete(key);
      return false;
    }
    return true;
  }
}

// ── Shared response cache & in-flight dedup maps ──
// Note: Node.js native fetch (undici) uses keep-alive by default.
const cache = new ExpiringCache<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

/**
 * Test-only utility to clear shared cache and in-flight maps.
 * Prevents cross-test pollution when modules are cached between tests.
 */
export function __resetCacheForTests(): void {
  cache.clear();
  inflight.clear();
}

export class OtelDataAPI {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? config.otelDataApiUrl;
  }

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean | undefined | null>,
  ): URL {
    const url = new URL(path, this.baseUrl);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url;
  }

  private async fetch<T>({
    path,
    query,
    method = 'GET',
    cacheTtlMs,
    acceptStatusCodes,
    headers,
    timeoutMs,
  }: FetchParams): Promise<T> {
    const url = this.buildUrl(path, query);
    const urlString = url.toString();
    const cacheKey = `${method}:${urlString}`;
    const isCacheable = method === 'GET' && Boolean(cacheTtlMs);

    // Check cache first (only when TTL is set)
    if (isCacheable) {
      const cached = cache.get(cacheKey) as CacheEntry<T> | undefined;
      if (cached && cached.expiry > Date.now()) {
        return cached.data;
      }

      // Deduplicate concurrent identical requests
      const pending = inflight.get(cacheKey) as Promise<T> | undefined;
      if (pending) {
        return pending;
      }
    }

    const request = this.doFetch<T>(urlString, {
      method,
      cacheKey,
      cacheTtlMs,
      acceptStatusCodes,
      headers,
      timeoutMs,
    });

    if (isCacheable) {
      inflight.set(cacheKey, request);
      // Swallow rejection on the cleanup chain to prevent unhandled-rejection crashes.
      // The caller still receives the original rejection from `request`.
      request.finally(() => inflight.delete(cacheKey)).catch(() => {});
    }

    return request;
  }

  private async doFetch<T>(
    urlString: string,
    options: {
      method: 'GET' | 'POST';
      cacheKey: string;
      cacheTtlMs?: number;
      acceptStatusCodes?: number[];
      headers?: Record<string, string>;
      timeoutMs?: number;
    },
  ): Promise<T> {
    const {
      method,
      cacheKey,
      cacheTtlMs,
      acceptStatusCodes,
      headers: extraHeaders,
      timeoutMs,
    } = options;
    const response = await fetch(urlString, {
      method,
      signal: AbortSignal.timeout(timeoutMs ?? 30_000),
      headers: { ...extraHeaders, Accept: 'application/json' },
    });

    if (!response.ok && !(acceptStatusCodes ?? []).includes(response.status)) {
      const body = await response.text().catch(() => '');
      throw new Error(`REST API error ${response.status}: ${response.statusText} - ${body}`);
    }

    const data = (await response.json()) as T;

    if (method === 'GET' && cacheTtlMs) {
      cache.set(cacheKey, { data, expiry: Date.now() + cacheTtlMs });
    }

    return data;
  }

  // ── Health ──────────────────────────────────────────

  async getHealth() {
    return this.fetch<{ status: string; version: string }>({ path: '/health' });
  }

  async getReady() {
    return this.fetch<{ status: string; database?: string; version?: string }>({
      path: '/ready',
      timeoutMs: 2_000,
    });
  }

  // ── Locations ───────────────────────────────────────

  async getLocations(
    params?: Nullable<{
      device_id?: string;
      date_from?: string;
      date_to?: string;
      limit?: number;
      offset?: number;
      sort?: string;
      order?: string;
    }>,
  ) {
    return this.fetch<Schemas['PaginatedResponse_Location_']>({
      path: '/api/v1/locations',
      query: params,
    });
  }

  async getLocation(id: number) {
    return this.fetch<Schemas['LocationDetail']>({ path: `/api/v1/locations/${id}` });
  }

  async getDevices() {
    return this.fetch<Schemas['DeviceInfo'][]>({
      path: '/api/v1/locations/devices',
      cacheTtlMs: 60_000,
    });
  }

  async getLocationCount(params?: Nullable<{ date?: string; device_id?: string }>) {
    return this.fetch<Schemas['LocationCount']>({
      path: '/api/v1/locations/count',
      query: params,
      cacheTtlMs: 15_000,
    });
  }

  async getLocationDateRange() {
    return this.fetch<{ min_date: string; max_date: string }>({
      path: '/api/v1/locations/date-range',
      cacheTtlMs: 60_000,
    });
  }

  // ── Garmin ──────────────────────────────────────────

  async getGarminDateRange() {
    return this.fetch<{ min_date: string; max_date: string }>({
      path: '/api/v1/garmin/date-range',
      cacheTtlMs: 60_000,
    });
  }

  async getGarminActivities(
    params?: Nullable<{
      sport?: string;
      date_from?: string;
      date_to?: string;
      limit?: number;
      offset?: number;
      sort?: string;
      order?: string;
    }>,
  ) {
    return this.fetch<Schemas['PaginatedResponse_GarminActivity_']>({
      path: '/api/v1/garmin/activities',
      query: params,
      cacheTtlMs: 30_000,
    });
  }

  async getGarminActivity(activityId: string) {
    return this.fetch<Schemas['GarminActivity']>({
      path: `/api/v1/garmin/activities/${activityId}`,
      cacheTtlMs: 30_000,
    });
  }

  async getGarminTrackPoints(
    activityId: string,
    params?: Nullable<{
      limit?: number;
      offset?: number;
      sort?: string;
      order?: string;
      simplify?: number;
    }>,
  ) {
    return this.fetch<Schemas['PaginatedResponse_GarminTrackPoint_']>({
      path: `/api/v1/garmin/activities/${activityId}/tracks`,
      query: params,
    });
  }

  async getGarminSports() {
    return this.fetch<Schemas['SportInfo'][]>({
      path: '/api/v1/garmin/sports',
      cacheTtlMs: 60_000,
    });
  }

  async getGarminDeviceCounts(): Promise<GarminDeviceCount[]> {
    return this.fetch<GarminDeviceCount[]>({
      path: '/api/v1/garmin/device-counts',
      cacheTtlMs: 60_000,
    });
  }

  async getGarminChartData(activityId: string) {
    return this.fetch<Schemas['GarminChartPoint'][]>({
      path: `/api/v1/garmin/activities/${activityId}/chart-data`,
      cacheTtlMs: 30_000,
    });
  }

  async getGarminActivityClimbs(activityId: string): Promise<GarminActivityClimb[]> {
    return this.fetch<GarminActivityClimb[]>({
      path: `/api/v1/garmin/activities/${activityId}/climbs`,
      cacheTtlMs: 30_000,
    });
  }

  async getGarminActivityLaps(activityId: string): Promise<GarminActivityLap[]> {
    return this.fetch<GarminActivityLap[]>({
      path: `/api/v1/garmin/activities/${activityId}/laps`,
      cacheTtlMs: 30_000,
    });
  }

  async getGarminActivityAddresses(activityId: string) {
    return this.fetch<
      {
        track_point_id: number;
        activity_id: string;
        waypoint_kind: string;
        timestamp: string;
        latitude: number;
        longitude: number;
        display_address: string | null;
        street: string | null;
        housenumber: string | null;
        neighbourhood: string | null;
        locality: string | null;
        region: string | null;
        country: string | null;
        postalcode: string | null;
        confidence: number | null;
        status: string;
        geocoded_at: string | null;
      }[]
    >({
      path: `/api/v1/garmin/activities/${activityId}/addresses`,
      cacheTtlMs: 30_000,
    });
  }

  async getGarminActivityTotals(
    params: Nullable<{
      period: string;
      sport?: string;
      date_from?: string;
      date_to?: string;
    }>,
  ) {
    return this.fetch<
      {
        period_start: string;
        activity_count: number;
        total_distance_km: number | null;
        total_duration_seconds: number | null;
        total_ascent_m: number | null;
        total_calories: number | null;
      }[]
    >({
      path: '/api/v1/garmin/activity-totals',
      query: params,
      cacheTtlMs: 30_000,
    });
  }

  async triggerGarminSync(
    params?: Nullable<{
      window_hours?: number;
      lookback?: number;
    }>,
  ): Promise<GarminSyncTriggerResult> {
    const syncId = randomUUID();

    const response = await this.fetch<GarminSyncUpstreamResponse>({
      path: '/api/v1/garmin/sync',
      method: 'POST',
      query: params,
      acceptStatusCodes: [400, 409],
      headers: { 'X-Garmin-Sync-Id': syncId },
    });

    return {
      ...response,
      accepted: response.accepted ?? response.status === 'accepted',
    };
  }

  // ── Unified GPS ─────────────────────────────────────

  async getUnifiedGps(
    params?: Nullable<{
      source?: string;
      date_from?: string;
      date_to?: string;
      limit?: number;
      offset?: number;
      order?: string;
      exclude_stationary?: boolean;
      deduplicate?: boolean;
    }>,
  ) {
    return this.fetch<Schemas['PaginatedResponse_UnifiedGpsPoint_']>({
      path: '/api/v1/gps/unified',
      query: params,
    });
  }

  async getDailySummary(
    params?: Nullable<{
      date_from?: string;
      date_to?: string;
      limit?: number;
      offset?: number;
    }>,
  ) {
    return this.fetch<{
      items: Schemas['DailyActivitySummary'][];
      total: number;
      limit: number;
      offset: number;
    }>({
      path: '/api/v1/gps/daily-summary',
      query: params,
      cacheTtlMs: 60_000,
    });
  }

  async getDailySummaryDateRange() {
    return this.fetch<{ min_date: string; max_date: string }>({
      path: '/api/v1/gps/daily-summary/date-range',
      cacheTtlMs: 60_000,
    });
  }

  // ── Reference Locations ─────────────────────────────

  async getReferenceLocations() {
    return this.fetch<Schemas['ReferenceLocation'][]>({
      path: '/api/v1/reference-locations',
      cacheTtlMs: 60_000,
    });
  }

  async getReferenceLocation(id: number) {
    return this.fetch<Schemas['ReferenceLocation']>({
      path: `/api/v1/reference-locations/${id}`,
    });
  }

  // ── Spatial ─────────────────────────────────────────

  async getNearbyPoints(
    params: Nullable<{
      lat: number;
      lon: number;
      radius_meters?: number;
      source?: string;
      limit?: number;
    }>,
  ) {
    return this.fetch<Schemas['NearbyPoint'][]>({ path: '/api/v1/spatial/nearby', query: params });
  }

  async getDistance(params: {
    from_lat: number;
    from_lon: number;
    to_lat: number;
    to_lon: number;
  }) {
    return this.fetch<Schemas['DistanceResult']>({
      path: '/api/v1/spatial/distance',
      query: params,
    });
  }

  async getWithinReference(name: string, params?: Nullable<{ source?: string; limit?: number }>) {
    return this.fetch<Schemas['WithinReferenceResult']>({
      path: `/api/v1/spatial/within-reference/${encodeURIComponent(name)}`,
      query: params,
    });
  }

  // ── Geocoding ───────────────────────────────────────

  async getGeocodingStatus() {
    return this.fetch<{
      total_locations: number;
      geocoded: number;
      success: number;
      pending: number;
      no_coverage: number;
      errors: number;
      coverage_percent: number;
      by_source: {
        owntracks: {
          success: number;
          pending: number;
          no_coverage: number;
          errors: number;
          total: number;
        };
        garmin: {
          success: number;
          pending: number;
          no_coverage: number;
          errors: number;
          total: number;
        };
        garmin_activities_total: number;
        garmin_activities_geocoded: number;
        garmin_coverage_percent: number;
      };
    }>({ path: '/api/v1/geocoding/status', cacheTtlMs: 15_000 });
  }

  async triggerGeocoding(
    params?: Nullable<{ batch_size?: number; retry_failed?: boolean }>,
    token?: string,
  ) {
    const query: Record<string, string | number | undefined | null> = {};
    if (params?.batch_size != null) query.batch_size = params.batch_size;
    if (params?.retry_failed != null) query.retry_failed = String(params.retry_failed);
    return this.fetch<{
      processed: number;
      remaining: number;
      skipped_dedup: number;
    }>({
      path: '/api/v1/geocoding/trigger',
      method: 'POST',
      query,
      timeoutMs: 120_000,
      ...(token ? { headers: { Authorization: token } } : {}),
    });
  }
}
