import {
  PointAddressSource,
  type MutationResolvers,
  type QueryResolvers,
} from '../__generated__/resolvers-types.js';

export const geocodingResolvers: {
  Query: Pick<QueryResolvers, 'geocodingStatus' | 'reverseGeocodePoint'>;
  Mutation: Pick<MutationResolvers, 'triggerGeocoding'>;
} = {
  Query: {
    geocodingStatus: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getGeocodingStatus();
    },
    reverseGeocodePoint: async (_parent, args, { dataSources, token }) => {
      const result = await dataSources.otelAPI.reverseGeocodePoint(args, token);
      return {
        ...result,
        resolution_source:
          result.resolution_source === 'database'
            ? PointAddressSource.Database
            : PointAddressSource.Pelias,
      };
    },
  },

  Mutation: {
    triggerGeocoding: async (_parent, args, { dataSources, token }) => {
      return dataSources.otelAPI.triggerGeocoding(args, token);
    },
  },
};
