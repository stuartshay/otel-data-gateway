import { config } from '../config.js';

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

  async getLocations(params?: {
    device_id?: string;
    date_from?: string;
    date_to?: string;
    limit?: number;
    offset?: number;
    sort?: string;
    order?: string;
  }) {
    return this.fetch<{ items: unknown[]; total: number; limit: number; offset: number }>({
      path: '/api/v1/locations',
      query: params,
    });
  }

  async getLocation(id: number) {
    return this.fetch<Record<string, unknown>>({ path: `/api/v1/locations/${id}` });
  }

  async getDevices() {
    return this.fetch<{ device_id: string }[]>({ path: '/api/v1/locations/devices' });
  }

  async getLocationCount(params?: { date?: string; device_id?: string }) {
    return this.fetch<{ count: number; date?: string; device_id?: string }>({
      path: '/api/v1/locations/count',
      query: params,
    });
  }

  // ── Garmin ──────────────────────────────────────────

  async getGarminActivities(params?: {
    sport?: string;
    date_from?: string;
    date_to?: string;
    limit?: number;
    offset?: number;
    sort?: string;
    order?: string;
  }) {
    return this.fetch<{ items: unknown[]; total: number; limit: number; offset: number }>({
      path: '/api/v1/garmin/activities',
      query: params,
    });
  }

  async getGarminActivity(activityId: string) {
    return this.fetch<Record<string, unknown>>({ path: `/api/v1/garmin/activities/${activityId}` });
  }

  async getGarminTrackPoints(
    activityId: string,
    params?: {
      limit?: number;
      offset?: number;
      sort?: string;
      order?: string;
    },
  ) {
    return this.fetch<{ items: unknown[]; total: number; limit: number; offset: number }>({
      path: `/api/v1/garmin/activities/${activityId}/tracks`,
      query: params,
    });
  }

  async getGarminSports() {
    return this.fetch<{ sport: string; activity_count: number }[]>({
      path: '/api/v1/garmin/sports',
    });
  }

  // ── Unified GPS ─────────────────────────────────────

  async getUnifiedGps(params?: {
    source?: string;
    date_from?: string;
    date_to?: string;
    limit?: number;
    offset?: number;
    order?: string;
  }) {
    return this.fetch<{ items: unknown[]; total: number; limit: number; offset: number }>({
      path: '/api/v1/gps/unified',
      query: params,
    });
  }

  async getDailySummary(params?: { date_from?: string; date_to?: string; limit?: number }) {
    return this.fetch<unknown[]>({ path: '/api/v1/gps/daily-summary', query: params });
  }

  // ── Reference Locations ─────────────────────────────

  async getReferenceLocations() {
    return this.fetch<unknown[]>({ path: '/api/v1/reference-locations' });
  }

  async getReferenceLocation(id: number) {
    return this.fetch<Record<string, unknown>>({
      path: `/api/v1/reference-locations/${id}`,
    });
  }

  // ── Spatial ─────────────────────────────────────────

  async getNearbyPoints(params: {
    lat: number;
    lon: number;
    radius_meters?: number;
    source?: string;
    limit?: number;
  }) {
    return this.fetch<unknown[]>({ path: '/api/v1/spatial/nearby', query: params });
  }

  async getDistance(params: {
    from_lat: number;
    from_lon: number;
    to_lat: number;
    to_lon: number;
  }) {
    return this.fetch<{
      distance_meters: number;
      from_lat: number;
      from_lon: number;
      to_lat: number;
      to_lon: number;
    }>({
      path: '/api/v1/spatial/distance',
      query: params,
    });
  }

  async getWithinReference(name: string, params?: { source?: string; limit?: number }) {
    return this.fetch<{
      reference_name: string;
      radius_meters: number;
      total_points: number;
      points: unknown[];
    }>({
      path: `/api/v1/spatial/within-reference/${encodeURIComponent(name)}`,
      query: params,
    });
  }
}
