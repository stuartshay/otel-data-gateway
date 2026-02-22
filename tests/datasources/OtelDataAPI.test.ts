import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { OtelDataAPI } from '../../src/datasources/OtelDataAPI.js';

const jsonResponse = (data: unknown, status = 200): Promise<Response> =>
  Promise.resolve(
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

describe('OtelDataAPI', () => {
  const originalFetch = globalThis.fetch;
  let fetchMock: jest.Mock<Promise<Response>, [string | URL, RequestInit?]>;

  beforeEach(() => {
    fetchMock = jest
      .fn<Promise<Response>, [string | URL, RequestInit?]>()
      .mockImplementation(() => jsonResponse({ ok: true }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    if (originalFetch) {
      globalThis.fetch = originalFetch;
    } else {
      // @ts-expect-error allow cleanup when fetch was undefined
      delete globalThis.fetch;
    }
  });

  it('uses provided base URL and default headers', async () => {
    const api = new OtelDataAPI('https://example.test');

    await api.getLocation(123);

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://example.test/api/v1/locations/123');
    expect(options).toMatchObject({ headers: { Accept: 'application/json' } });
  });

  it('omits null and undefined query parameters', async () => {
    const api = new OtelDataAPI('https://example.test');

    await api.getGarminTrackPoints('activity-1', {
      limit: 10,
      offset: null,
      sort: 'timestamp',
      order: undefined,
      simplify: 0,
    });

    const [url] = fetchMock.mock.calls[0] as [string];
    const parsed = new URL(url);

    expect(parsed.pathname).toBe('/api/v1/garmin/activities/activity-1/tracks');
    expect(parsed.searchParams.get('limit')).toBe('10');
    expect(parsed.searchParams.get('sort')).toBe('timestamp');
    expect(parsed.searchParams.has('offset')).toBe(false);
    expect(parsed.searchParams.get('simplify')).toBe('0');
  });

  it('encodes path segments and forwards optional params', async () => {
    const api = new OtelDataAPI('https://example.test');

    await api.getWithinReference('Main Square/1', { source: 'owntracks', limit: 5 });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('/api/v1/spatial/within-reference/Main%20Square%2F1');

    const parsed = new URL(url);
    expect(parsed.searchParams.get('source')).toBe('owntracks');
    expect(parsed.searchParams.get('limit')).toBe('5');
  });

  it('throws informative errors when REST API responds with failure', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response('backend failed', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/plain' },
      }),
    );
    const api = new OtelDataAPI('https://example.test');

    await expect(api.getReady()).rejects.toThrow(
      'REST API error 503: Service Unavailable - backend failed',
    );
  });

  it('routes every gateway method to the expected endpoint', async () => {
    const api = new OtelDataAPI('https://example.test');

    await api.getHealth();
    await api.getReady();
    await api.getLocations({ limit: 10 });
    await api.getLocation(123);
    await api.getDevices();
    await api.getLocationCount({ device_id: 'iphone' });
    await api.getGarminActivities({ sport: 'cycling' });
    await api.getGarminActivity('ga-1');
    await api.getGarminTrackPoints('ga-1', { limit: 2 });
    await api.getGarminSports();
    await api.getGarminChartData('ga-1');
    await api.getUnifiedGps({ source: 'gps' });
    await api.getDailySummary({ limit: 3 });
    await api.getReferenceLocations();
    await api.getReferenceLocation(77);
    await api.getNearbyPoints({ lat: 1, lon: 2, radius_meters: 50, limit: 1, source: 'gps' });
    await api.getDistance({ from_lat: 1, from_lon: 2, to_lat: 3, to_lon: 4 });
    await api.getWithinReference('Home', { source: 'gps', limit: 2 });

    const paths = fetchMock.mock.calls.map(([url]) => new URL(url as string).pathname);

    expect(paths).toEqual([
      '/health',
      '/ready',
      '/api/v1/locations',
      '/api/v1/locations/123',
      '/api/v1/locations/devices',
      '/api/v1/locations/count',
      '/api/v1/garmin/activities',
      '/api/v1/garmin/activities/ga-1',
      '/api/v1/garmin/activities/ga-1/tracks',
      '/api/v1/garmin/sports',
      '/api/v1/garmin/activities/ga-1/chart-data',
      '/api/v1/gps/unified',
      '/api/v1/gps/daily-summary',
      '/api/v1/reference-locations',
      '/api/v1/reference-locations/77',
      '/api/v1/spatial/nearby',
      '/api/v1/spatial/distance',
      '/api/v1/spatial/within-reference/Home',
    ]);
  });
});
