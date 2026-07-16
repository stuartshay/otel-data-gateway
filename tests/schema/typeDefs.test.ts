import { describe, expect, it } from '@jest/globals';
import { buildSchema, graphql } from 'graphql';
import typeDefs from '../../src/schema/typeDefs.js';

describe('typeDefs', () => {
  it('exposes gateway schema SDL', () => {
    expect(typeDefs).toContain('type Query');
    expect(typeDefs).toContain('type Mutation');
    expect(typeDefs).toContain('health');
    expect(typeDefs).toContain('garminActivities');
    expect(typeDefs).toContain('triggerGarminSync');
    expect(typeDefs).toContain('total_strokes: Int');
  });

  it('exposes structured readiness database status', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          ready {
            status
            version
            database
          }
        }
      `,
      rootValue: {
        ready: () => ({
          status: 'ready',
          version: '1.0.501',
          database: {
            status: 'healthy',
            version: 'PostgreSQL 15.3',
            server_time: '2026-07-04 02:38:48.710129+00:00',
            pool_size: 2,
            pool_free: 2,
          },
        }),
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      ready: {
        status: 'ready',
        version: '1.0.501',
        database: {
          status: 'healthy',
          version: 'PostgreSQL 15.3',
          server_time: '2026-07-04 02:38:48.710129+00:00',
          pool_size: 2,
          pool_free: 2,
        },
      },
    });
  });

  it('exposes heart-rate zone and respiration rate on Garmin chart points', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminChartData(activity_id: "activity-1") {
            timestamp
            latitude
            longitude
            hr_zone
            respiration_rate
          }
        }
      `,
      rootValue: {
        garminChartData: () => [
          {
            timestamp: '2026-06-19T12:00:00Z',
            latitude: 40.7,
            longitude: -74,
            hr_zone: 3,
            respiration_rate: 27,
          },
        ],
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      garminChartData: [
        {
          timestamp: '2026-06-19T12:00:00Z',
          latitude: 40.7,
          longitude: -74,
          hr_zone: 3,
          respiration_rate: 27,
        },
      ],
    });
  });

  it('exposes extended metrics on Garmin track points', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminTrackPoints(activity_id: "activity-1") {
            items {
              hr_zone
              respiration_rate
              surface_type
              effort_level
            }
          }
        }
      `,
      rootValue: {
        garminTrackPoints: () => ({
          items: [
            {
              hr_zone: 3,
              respiration_rate: 27,
              surface_type: 'paved',
              effort_level: 'steady',
            },
          ],
        }),
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      garminTrackPoints: {
        items: [
          {
            hr_zone: 3,
            respiration_rate: 27,
            surface_type: 'paved',
            effort_level: 'steady',
          },
        ],
      },
    });
  });

  it('exposes recording device metadata on a Garmin activity', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminActivity(activity_id: "activity-1") {
            activity_id
            device {
              device_id
              manufacturer
              garmin_product
              model
              software_version
            }
          }
        }
      `,
      rootValue: {
        garminActivity: () => ({
          activity_id: 'activity-1',
          device: {
            device_id: 3444454776,
            manufacturer: 'garmin',
            garmin_product: 4061,
            model: 'Edge 540 Solar',
            software_version: '31.30',
          },
        }),
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      garminActivity: {
        activity_id: 'activity-1',
        device: {
          device_id: 3444454776,
          manufacturer: 'garmin',
          garmin_product: 4061,
          model: 'Edge 540 Solar',
          software_version: '31.30',
        },
      },
    });
  });

  it('exposes Garmin device activity counts', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminDeviceCounts {
            label
            activity_count
          }
        }
      `,
      rootValue: {
        garminDeviceCounts: () => [
          { label: 'Edge 500', activity_count: 1237 },
          { label: 'Edge 540 Solar', activity_count: 194 },
          { label: 'Manual', activity_count: 5 },
        ],
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      garminDeviceCounts: [
        { label: 'Edge 500', activity_count: 1237 },
        { label: 'Edge 540 Solar', activity_count: 194 },
        { label: 'Manual', activity_count: 5 },
      ],
    });
  });

  it('exposes Garmin activity laps', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminActivityLaps(activity_id: "activity-1") {
            activity_id
            lap_index
            duration_seconds
            distance_meters
            paved_distance_meters
            unpaved_distance_meters
            avg_speed_mps
            avg_heart_rate
            max_heart_rate
            total_ascent_meters
          }
        }
      `,
      rootValue: {
        garminActivityLaps: () => [
          {
            activity_id: 'activity-1',
            lap_index: 1,
            duration_seconds: 1637.3,
            distance_meters: 8046.72,
            paved_distance_meters: 7805.32,
            unpaved_distance_meters: 241.4,
            avg_speed_mps: 4.915,
            avg_heart_rate: 130,
            max_heart_rate: 150,
            total_ascent_meters: 30,
          },
        ],
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      garminActivityLaps: [
        {
          activity_id: 'activity-1',
          lap_index: 1,
          duration_seconds: 1637.3,
          distance_meters: 8046.72,
          paved_distance_meters: 7805.32,
          unpaved_distance_meters: 241.4,
          avg_speed_mps: 4.915,
          avg_heart_rate: 130,
          max_heart_rate: 150,
          total_ascent_meters: 30,
        },
      ],
    });
  });

  it('exposes Garmin activity weather', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminActivityWeather(activity_id: "activity-1") {
            activity_id
            observed_at
            latitude
            longitude
            temperature_c
            wind_speed_kmh
            weather_code
            source
            is_provisional
          }
        }
      `,
      rootValue: {
        garminActivityWeather: () => ({
          activity_id: 'activity-1',
          observed_at: '2026-03-08T20:00:00+00:00',
          latitude: 40.7937,
          longitude: -73.961,
          temperature_c: 18.4,
          wind_speed_kmh: 12.0,
          weather_code: 1,
          source: 'archive',
          is_provisional: false,
        }),
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      garminActivityWeather: {
        activity_id: 'activity-1',
        observed_at: '2026-03-08T20:00:00+00:00',
        latitude: 40.7937,
        longitude: -73.961,
        temperature_c: 18.4,
        wind_speed_kmh: 12.0,
        weather_code: 1,
        source: 'archive',
        is_provisional: false,
      },
    });
  });

  it('returns null Garmin activity weather when not backfilled yet', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminActivityWeather(activity_id: "activity-1") {
            activity_id
          }
        }
      `,
      rootValue: {
        garminActivityWeather: () => null,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({ garminActivityWeather: null });
  });

  it('exposes Garmin laps comparison across activities', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminLapsComparison(sport: "cycling", limit: 1) {
            total
            limit
            offset
            items {
              activity {
                activity_id
                sport
                start_time
                distance_km
                avg_speed_kmh
                avg_heart_rate
              }
              laps {
                lap_index
                avg_speed_mps
                avg_heart_rate
              }
            }
          }
        }
      `,
      rootValue: {
        garminLapsComparison: () => ({
          total: 1,
          limit: 1,
          offset: 0,
          items: [
            {
              activity: {
                activity_id: 'activity-1',
                sport: 'cycling',
                start_time: '2026-07-05T19:30:44Z',
                distance_km: 52.36,
                avg_speed_kmh: 17.07,
                avg_heart_rate: 118,
              },
              laps: [
                { lap_index: 1, avg_speed_mps: 5.035, avg_heart_rate: 120 },
                { lap_index: 2, avg_speed_mps: 4.9, avg_heart_rate: 125 },
              ],
            },
          ],
        }),
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      garminLapsComparison: {
        total: 1,
        limit: 1,
        offset: 0,
        items: [
          {
            activity: {
              activity_id: 'activity-1',
              sport: 'cycling',
              start_time: '2026-07-05T19:30:44Z',
              distance_km: 52.36,
              avg_speed_kmh: 17.07,
              avg_heart_rate: 118,
            },
            laps: [
              { lap_index: 1, avg_speed_mps: 5.035, avg_heart_rate: 120 },
              { lap_index: 2, avg_speed_mps: 4.9, avg_heart_rate: 125 },
            ],
          },
        ],
      },
    });
  });
});
