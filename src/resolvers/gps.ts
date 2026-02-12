import type { GatewayContext } from './types.js';

export const gpsResolvers = {
  Query: {
    unifiedGps: async (
      _: unknown,
      args: {
        source?: string;
        date_from?: string;
        date_to?: string;
        limit?: number;
        offset?: number;
        order?: string;
      },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getUnifiedGps(args);
    },

    dailySummary: async (
      _: unknown,
      args: { date_from?: string; date_to?: string; limit?: number },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getDailySummary(args);
    },
  },
};
