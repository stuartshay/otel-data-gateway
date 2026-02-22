import { describe, expect, it, jest } from '@jest/globals';
import { config } from '../../src/config.js';
import { garminResolvers } from '../../src/resolvers/garmin.js';
import { gpsResolvers } from '../../src/resolvers/gps.js';
import { healthResolvers } from '../../src/resolvers/health.js';
import resolvers from '../../src/resolvers/index.js';
import { locationResolvers } from '../../src/resolvers/location.js';
import { referenceResolvers } from '../../src/resolvers/reference.js';
import { spatialResolvers } from '../../src/resolvers/spatial.js';
import type { GatewayContext } from '../../src/resolvers/types.js';

type OtelApiMocks = Record<string, jest.Mock>;

const contextWith = (otelAPI: OtelApiMocks): GatewayContext =>
  ({
    dataSources: {
      otelAPI,
    },
  }) as unknown as GatewayContext;

const mockAsync = <T>(value: T) => jest.fn<Promise<T>, unknown[]>().mockResolvedValue(value);
const mockReject = (error: unknown) =>
  jest.fn<Promise<never>, unknown[]>().mockRejectedValue(error);

const runResolver = async <TArgs extends object, TResult>(
  resolver: unknown,
  args: TArgs,
  ctx: GatewayContext,
): Promise<TResult> => {
  const fn = resolver as (
    parent: unknown,
    args: TArgs,
    context: GatewayContext,
  ) => Promise<TResult>;
  return fn({}, args, ctx);
};

describe('health resolvers', () => {
  it('returns backend health when available', async () => {
    const result = { status: 'healthy', version: '1.2.3' };
    const ctx = contextWith({ getHealth: mockAsync(result) });

    const response = await runResolver(healthResolvers.Query.health, {}, ctx);

    expect(ctx.dataSources.otelAPI.getHealth).toHaveBeenCalled();
    expect(response).toEqual(result);
  });

  it('falls back to service version when backend health fails', async () => {
    const ctx = contextWith({ getHealth: mockReject(new Error('offline')) });

    const response = await runResolver(healthResolvers.Query.health, {}, ctx);

    expect(response).toEqual({ status: 'healthy', version: config.version });
  });

  it('returns readiness result when backend responds', async () => {
    const result = { status: 'ready', database: 'ok', version: '1.2.3' };
    const ctx = contextWith({ getReady: mockAsync(result) });

    const response = await runResolver(healthResolvers.Query.ready, {}, ctx);

    expect(ctx.dataSources.otelAPI.getReady).toHaveBeenCalled();
    expect(response).toEqual(result);
  });

  it('returns detailed error when readiness check fails', async () => {
    const ctx = contextWith({ getReady: mockReject(new Error('database down')) });

    const response = await runResolver(healthResolvers.Query.ready, {}, ctx);

    expect(response).toEqual({
      status: 'unhealthy',
      database: 'database down',
      version: config.version,
    });
  });
});

describe('location resolvers', () => {
  it('delegates list query with provided args', async () => {
    const args = { device_id: 'iphone', limit: 5, offset: 1, sort: 'timestamp', order: 'desc' };
    const result = { items: [], total: 0, limit: 5, offset: 1 };
    const ctx = contextWith({ getLocations: mockAsync(result) });

    const response = await runResolver(locationResolvers.Query.locations, args, ctx);

    expect(ctx.dataSources.otelAPI.getLocations).toHaveBeenCalledWith(args);
    expect(response).toBe(result);
  });

  it('delegates detail, devices, and count queries', async () => {
    const ctx = contextWith({
      getLocation: mockAsync({ id: 10 }),
      getDevices: mockAsync([{ device_id: 'iphone' }]),
      getLocationCount: mockAsync({ total: 4 }),
    });

    const location = await runResolver(locationResolvers.Query.location, { id: 10 }, ctx);
    const devices = await runResolver(locationResolvers.Query.devices, {}, ctx);
    const count = await runResolver(
      locationResolvers.Query.locationCount,
      { device_id: 'iphone' },
      ctx,
    );

    expect(ctx.dataSources.otelAPI.getLocation).toHaveBeenCalledWith(10);
    expect(location).toEqual({ id: 10 });
    expect(devices).toEqual([{ device_id: 'iphone' }]);
    expect(count).toEqual({ total: 4 });
  });
});

describe('garmin resolvers', () => {
  it('passes filter args to garminActivities', async () => {
    const args = { sport: 'cycling', limit: 10, offset: 0 };
    const ctx = contextWith({ getGarminActivities: mockAsync({ items: [] }) });

    await runResolver(garminResolvers.Query.garminActivities, args, ctx);

    expect(ctx.dataSources.otelAPI.getGarminActivities).toHaveBeenCalledWith(args);
  });

  it('extracts activity_id before calling track point resolver', async () => {
    const args = {
      activity_id: 'abc',
      limit: 5,
      simplify: 1,
      offset: 0,
      sort: 'timestamp',
      order: 'asc',
    };
    const ctx = contextWith({
      getGarminTrackPoints: mockAsync({ items: [] }),
      getGarminActivity: mockAsync({}),
      getGarminSports: mockAsync([]),
      getGarminChartData: mockAsync([]),
    });

    await runResolver(garminResolvers.Query.garminTrackPoints, args, ctx);

    expect(ctx.dataSources.otelAPI.getGarminTrackPoints).toHaveBeenCalledWith('abc', {
      limit: 5,
      simplify: 1,
      offset: 0,
      sort: 'timestamp',
      order: 'asc',
    });
  });

  it('delegates other garmin lookups', async () => {
    const ctx = contextWith({
      getGarminActivity: mockAsync({ activity_id: 'abc' }),
      getGarminSports: mockAsync(['cycling']),
      getGarminChartData: mockAsync([{ timestamp: 'now' }]),
    });

    await runResolver(garminResolvers.Query.garminActivity, { activity_id: 'abc' }, ctx);
    await runResolver(garminResolvers.Query.garminSports, {}, ctx);
    await runResolver(garminResolvers.Query.garminChartData, { activity_id: 'abc' }, ctx);

    expect(ctx.dataSources.otelAPI.getGarminActivity).toHaveBeenCalledWith('abc');
    expect(ctx.dataSources.otelAPI.getGarminSports).toHaveBeenCalled();
    expect(ctx.dataSources.otelAPI.getGarminChartData).toHaveBeenCalledWith('abc');
  });
});

describe('gps resolvers', () => {
  it('delegates unifiedGps and dailySummary queries', async () => {
    const ctx = contextWith({
      getUnifiedGps: mockAsync({ items: [] }),
      getDailySummary: mockAsync([]),
    });

    await runResolver(gpsResolvers.Query.unifiedGps, { limit: 2, source: 'gps' }, ctx);
    await runResolver(gpsResolvers.Query.dailySummary, { limit: 1 }, ctx);

    expect(ctx.dataSources.otelAPI.getUnifiedGps).toHaveBeenCalledWith({ limit: 2, source: 'gps' });
    expect(ctx.dataSources.otelAPI.getDailySummary).toHaveBeenCalledWith({ limit: 1 });
  });
});

describe('reference resolvers', () => {
  it('delegates reference location queries', async () => {
    const ctx = contextWith({
      getReferenceLocations: mockAsync([{ id: 1 }]),
      getReferenceLocation: mockAsync({ id: 2 }),
    });

    await runResolver(referenceResolvers.Query.referenceLocations, {}, ctx);
    await runResolver(referenceResolvers.Query.referenceLocation, { id: 2 }, ctx);

    expect(ctx.dataSources.otelAPI.getReferenceLocations).toHaveBeenCalled();
    expect(ctx.dataSources.otelAPI.getReferenceLocation).toHaveBeenCalledWith(2);
  });
});

describe('spatial resolvers', () => {
  it('passes args for nearby and distance queries', async () => {
    const ctx = contextWith({
      getNearbyPoints: mockAsync([]),
      getDistance: mockAsync({ distance_meters: 10 }),
      getWithinReference: mockAsync([]),
    });

    await runResolver(
      spatialResolvers.Query.nearbyPoints,
      { lat: 1, lon: 2, radius_meters: 50 },
      ctx,
    );
    await runResolver(
      spatialResolvers.Query.calculateDistance,
      { from_lat: 1, from_lon: 2, to_lat: 3, to_lon: 4 },
      ctx,
    );
    await runResolver(
      spatialResolvers.Query.withinReference,
      { name: 'Home', source: 'gps', limit: 5 },
      ctx,
    );

    expect(ctx.dataSources.otelAPI.getNearbyPoints).toHaveBeenCalledWith({
      lat: 1,
      lon: 2,
      radius_meters: 50,
    });
    expect(ctx.dataSources.otelAPI.getDistance).toHaveBeenCalledWith({
      from_lat: 1,
      from_lon: 2,
      to_lat: 3,
      to_lon: 4,
    });
    expect(ctx.dataSources.otelAPI.getWithinReference).toHaveBeenCalledWith('Home', {
      source: 'gps',
      limit: 5,
    });
  });
});

describe('resolver index', () => {
  it('merges all resolver query fields', () => {
    const keys = Object.keys(resolvers.Query);

    expect(keys).toEqual(
      expect.arrayContaining([
        'health',
        'ready',
        'locations',
        'location',
        'devices',
        'locationCount',
        'garminActivities',
        'garminActivity',
        'garminTrackPoints',
        'garminSports',
        'garminChartData',
        'unifiedGps',
        'dailySummary',
        'referenceLocations',
        'referenceLocation',
        'nearbyPoints',
        'calculateDistance',
        'withinReference',
      ]),
    );
  });
});
