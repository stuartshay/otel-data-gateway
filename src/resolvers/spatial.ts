import type { QueryResolvers } from '../__generated__/resolvers-types.js';

export const spatialResolvers: {
  Query: Pick<QueryResolvers, 'nearbyPoints' | 'calculateDistance' | 'withinReference'>;
} = {
  Query: {
    nearbyPoints: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getNearbyPoints(args);
    },

    calculateDistance: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getDistance(args);
    },

    withinReference: async (_parent, args, { dataSources }) => {
      const { name, ...params } = args;
      return dataSources.otelAPI.getWithinReference(name, params);
    },
  },
};
