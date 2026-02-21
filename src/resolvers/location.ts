import type { QueryResolvers } from '../__generated__/resolvers-types.js';

export const locationResolvers: {
  Query: Pick<QueryResolvers, 'locations' | 'location' | 'devices' | 'locationCount'>;
} = {
  Query: {
    locations: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getLocations(args);
    },

    location: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getLocation(args.id);
    },

    devices: async (_parent, _args, { dataSources }) => {
      return dataSources.otelAPI.getDevices();
    },

    locationCount: async (_parent, args, { dataSources }) => {
      return dataSources.otelAPI.getLocationCount(args);
    },
  },
};
