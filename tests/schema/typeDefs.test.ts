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
  });

  it('exposes respiration rate on Garmin chart points', async () => {
    const schema = buildSchema(typeDefs);
    const result = await graphql({
      schema,
      source: `
        query {
          garminChartData(activity_id: "activity-1") {
            timestamp
            latitude
            longitude
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
          respiration_rate: 27,
        },
      ],
    });
  });
});
