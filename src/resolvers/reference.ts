import type { QueryResolvers } from '../__generated__/resolvers-types.js';

export const referenceResolvers: {
  Query: Pick<QueryResolvers, 'referenceLocations' | 'referenceLocation'>;
} = {
  Query: {
    referenceLocations: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getReferenceLocations();
    },

    referenceLocation: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getReferenceLocation(args.id);
    },
  },
};
