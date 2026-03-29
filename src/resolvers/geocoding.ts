import type { MutationResolvers, QueryResolvers } from '../__generated__/resolvers-types.js';

export const geocodingResolvers: {
  Query: Pick<QueryResolvers, 'geocodingStatus'>;
  Mutation: Pick<MutationResolvers, 'triggerGeocoding'>;
} = {
  Query: {
    geocodingStatus: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getGeocodingStatus();
    },
  },

  Mutation: {
    triggerGeocoding: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.triggerGeocoding(args);
    },
  },
};
