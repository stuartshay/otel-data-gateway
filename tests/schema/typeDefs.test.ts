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
});
