import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { OtelDataAPI, __resetCacheForTests } from '../../src/datasources/OtelDataAPI.js';

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
    __resetCacheForTests();
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

  it('posts garmin sync trigger with optional params', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          status: 'accepted',
          message: 'Sync started',
          window_hours: 48,
        }),
        {
          status: 202,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );
    const api = new OtelDataAPI('https://example.test');

    const response = await api.triggerGarminSync({ window_hours: 48, lookback: null });

    expect(response).toEqual({
      status: 'accepted',
      message: 'Sync started',
      window_hours: 48,
      accepted: true,
    });

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://example.test/api/v1/garmin/sync?window_hours=48');
    expect(options.method).toBe('POST');
  });

  it('returns structured response for 409 garmin sync conflicts', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          status: 'conflict',
          message: 'Sync already in progress',
          started_at: '2026-03-12T01:24:58.102924+00:00',
        }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );
    const api = new OtelDataAPI('https://example.test');

    await expect(api.triggerGarminSync({ lookback: 7 })).resolves.toEqual({
      status: 'conflict',
      message: 'Sync already in progress',
      started_at: '2026-03-12T01:24:58.102924+00:00',
      accepted: false,
    });
  });

  it('returns structured response for 400 garmin sync validation errors', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          status: 'bad_request',
          message: 'lookback and window_hours cannot be combined',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );
    const api = new OtelDataAPI('https://example.test');

    await expect(api.triggerGarminSync({ lookback: 7, window_hours: 24 })).resolves.toEqual({
      status: 'bad_request',
      message: 'lookback and window_hours cannot be combined',
      accepted: false,
    });
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
    await api.triggerGarminSync({ window_hours: 24 });
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
      '/api/v1/garmin/sync',
      '/api/v1/gps/unified',
      '/api/v1/gps/daily-summary',
      '/api/v1/reference-locations',
      '/api/v1/reference-locations/77',
      '/api/v1/spatial/nearby',
      '/api/v1/spatial/distance',
      '/api/v1/spatial/within-reference/Home',
    ]);
  });

  it('returns cached data on second call within TTL', async () => {
    fetchMock.mockImplementation(() => jsonResponse({ devices: ['a'] }));
    const api = new OtelDataAPI('https://example.test');

    const first = await api.getDevices();
    const second = await api.getDevices();

    expect(first).toEqual(second);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('deduplicates concurrent identical requests', async () => {
    fetchMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(jsonResponse({ n: 1 })), 50)),
    );
    const api = new OtelDataAPI('https://example.test');

    const [r1, r2] = await Promise.all([api.getDevices(), api.getDevices()]);

    expect(r1).toEqual(r2);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not cache endpoints without cacheTtlMs', async () => {
    fetchMock.mockImplementation(() => jsonResponse({ status: 'healthy', version: '1.0.0' }));
    const api = new OtelDataAPI('https://example.test');

    await api.getHealth();
    await api.getHealth();

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('caches garminActivities responses for 30s', async () => {
    fetchMock.mockImplementation(() => jsonResponse({ items: [], total: 0 }));
    const api = new OtelDataAPI('https://example.test');
    const nowSpy = jest.spyOn(Date, 'now');

    nowSpy.mockReturnValue(0);
    await api.getGarminActivities({ sport: 'cycling' });
    await api.getGarminActivities({ sport: 'cycling' });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    nowSpy.mockReturnValue(31_000);
    await api.getGarminActivities({ sport: 'cycling' });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    nowSpy.mockRestore();
  });

  it('caches garminActivity responses for 30s', async () => {
    fetchMock.mockImplementation(() => jsonResponse({ activity_id: 'ga-1' }));
    const api = new OtelDataAPI('https://example.test');
    const nowSpy = jest.spyOn(Date, 'now');

    nowSpy.mockReturnValue(0);
    await api.getGarminActivity('ga-1');
    await api.getGarminActivity('ga-1');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    nowSpy.mockReturnValue(31_000);
    await api.getGarminActivity('ga-1');
    expect(fetchMock).toHaveBeenCalledTimes(2);

    nowSpy.mockRestore();
  });

  it('caches garminChartData responses for 30s', async () => {
    fetchMock.mockImplementation(() => jsonResponse([{ hr: 120 }]));
    const api = new OtelDataAPI('https://example.test');
    const nowSpy = jest.spyOn(Date, 'now');

    nowSpy.mockReturnValue(0);
    await api.getGarminChartData('ga-1');
    await api.getGarminChartData('ga-1');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    nowSpy.mockReturnValue(31_000);
    await api.getGarminChartData('ga-1');
    expect(fetchMock).toHaveBeenCalledTimes(2);

    nowSpy.mockRestore();
  });

  it('caches dailySummary responses for 60s', async () => {
    fetchMock.mockImplementation(() => jsonResponse([{ date: '2026-01-01' }]));
    const api = new OtelDataAPI('https://example.test');
    const nowSpy = jest.spyOn(Date, 'now');

    nowSpy.mockReturnValue(0);
    await api.getDailySummary({ limit: 7 });
    await api.getDailySummary({ limit: 7 });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    nowSpy.mockReturnValue(61_000);
    await api.getDailySummary({ limit: 7 });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    nowSpy.mockRestore();
  });
});
