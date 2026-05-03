import type { QueryResolvers } from '../__generated__/resolvers-types.js';

export const gpsResolvers: {
  Query: Pick<QueryResolvers, 'unifiedGps' | 'dailySummary' | 'dailySummaryDateRange'>;
} = {
  Query: {
    unifiedGps: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getUnifiedGps(args);
    },

    dailySummary: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getDailySummary(args);
    },

    dailySummaryDateRange: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getDailySummaryDateRange();
    },
  },
};
