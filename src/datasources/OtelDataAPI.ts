import type { components } from '@stuartshay/otel-data-types';
import { config } from '../config.js';

type Schemas = components['schemas'];

/** Accept null from GraphQL InputMaybe<T> args. buildUrl already skips null/undefined. */
type Nullable<T> = { [K in keyof T]: T[K] | null };

interface FetchParams {
  path: string;
  query?: Record<string, string | number | undefined | null>;
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

  private async fetch<T>({ path, query }: FetchParams): Promise<T> {
    const url = this.buildUrl(path, query);
    const response = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`REST API error ${response.status}: ${response.statusText} - ${body}`);
    }

    return (await response.json()) as T;
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
    return this.fetch<Schemas['DeviceInfo'][]>({ path: '/api/v1/locations/devices' });
  }

  async getLocationCount(params?: Nullable<{ date?: string; device_id?: string }>) {
    return this.fetch<Schemas['LocationCount']>({
      path: '/api/v1/locations/count',
      query: params,
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
    });
  }

  async getGarminChartData(activityId: string) {
    return this.fetch<
      {
        timestamp: string;
        altitude: number | null;
        distance_from_start_km: number | null;
        speed_kmh: number | null;
        heart_rate: number | null;
        cadence: number | null;
        temperature_c: number | null;
        latitude: number;
        longitude: number;
      }[]
    >({
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
    return this.fetch<Schemas['ReferenceLocation'][]>({ path: '/api/v1/reference-locations' });
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
