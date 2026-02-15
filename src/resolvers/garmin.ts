import type { GatewayContext } from './types.js';

export const garminResolvers = {
  Query: {
    garminActivities: async (
      _: unknown,
      args: {
        sport?: string;
        date_from?: string;
        date_to?: string;
        limit?: number;
        offset?: number;
        sort?: string;
        order?: string;
      },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getGarminActivities(args);
    },

    garminActivity: async (
      _: unknown,
      args: { activity_id: string },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getGarminActivity(args.activity_id);
    },

    garminTrackPoints: async (
      _: unknown,
      args: {
        activity_id: string;
        limit?: number;
        offset?: number;
        sort?: string;
        order?: string;
        simplify?: number;
      },
      { dataSources }: GatewayContext,
    ) => {
      const { activity_id, ...params } = args;
      return dataSources.otelAPI.getGarminTrackPoints(activity_id, params);
    },

    garminSports: async (_: unknown, __: unknown, { dataSources }: GatewayContext) => {
      return dataSources.otelAPI.getGarminSports();
    },
  },
};
