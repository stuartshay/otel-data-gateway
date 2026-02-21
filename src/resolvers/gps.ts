import type { QueryResolvers } from '../__generated__/resolvers-types.js';

export const gpsResolvers: {
  Query: Pick<QueryResolvers, 'unifiedGps' | 'dailySummary'>;
} = {
  Query: {
    unifiedGps: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getUnifiedGps(args);
    },

    dailySummary: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getDailySummary(args);
    },
  },
};
