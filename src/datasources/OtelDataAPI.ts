import type { components } from '@stuartshay/otel-data-types';
import { config } from '../config.js';

type Schemas = components['schemas'];

/** Accept null from GraphQL InputMaybe<T> args. buildUrl already skips null/undefined. */
type Nullable<T> = { [K in keyof T]: T[K] | null };

interface FetchParams {
  path: string;
  query?: Record<string, string | number | undefined | null>;
  /** TTL in milliseconds. When set, responses are cached and deduplicated. */
  cacheTtlMs?: number;
}

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

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

  private buildUrl(path: string, query?: Record<string, string | number | undefined | null>): URL {
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

  private async fetch<T>({ path, query, cacheTtlMs }: FetchParams): Promise<T> {
    const url = this.buildUrl(path, query);
    const cacheKey = url.toString();

    // Check cache first (only when TTL is set)
    if (cacheTtlMs) {
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

    const request = this.doFetch<T>(cacheKey, cacheTtlMs);

    if (cacheTtlMs) {
      inflight.set(cacheKey, request);
      request.finally(() => inflight.delete(cacheKey));
    }

    return request;
  }

  private async doFetch<T>(urlString: string, cacheTtlMs?: number): Promise<T> {
    const response = await fetch(urlString, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`REST API error ${response.status}: ${response.statusText} - ${body}`);
    }

    const data = (await response.json()) as T;

    if (cacheTtlMs) {
      cache.set(urlString, { data, expiry: Date.now() + cacheTtlMs });
    }

    return data;
  }

  // ── Health ──────────────────────────────────────────

  async getHealth() {
    return this.fetch<{ status: string; version: string }>({ path: '/health' });
  }

  async getReady() {
    return this.fetch<{ status: string; database?: string; version?: string }>({ path: '/ready' });
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

  // ── Garmin ──────────────────────────────────────────

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
    });
  }

  async getGarminActivity(activityId: string) {
    return this.fetch<Schemas['GarminActivity']>({
      path: `/api/v1/garmin/activities/${activityId}`,
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

  async getGarminChartData(activityId: string) {
    return this.fetch<Schemas['GarminChartPoint'][]>({
      path: `/api/v1/garmin/activities/${activityId}/chart-data`,
    });
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
    }>,
  ) {
    return this.fetch<Schemas['PaginatedResponse_UnifiedGpsPoint_']>({
      path: '/api/v1/gps/unified',
      query: params,
    });
  }

  async getDailySummary(
    params?: Nullable<{ date_from?: string; date_to?: string; limit?: number }>,
  ) {
    return this.fetch<Schemas['DailyActivitySummary'][]>({
      path: '/api/v1/gps/daily-summary',
      query: params,
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
}
