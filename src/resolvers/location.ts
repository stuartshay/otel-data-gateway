import type { GatewayContext } from './types.js';

export const locationResolvers = {
  Query: {
    locations: async (
      _: unknown,
      args: {
        device_id?: string;
        date_from?: string;
        date_to?: string;
        limit?: number;
        offset?: number;
        sort?: string;
        order?: string;
      },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getLocations(args);
    },

    location: async (_: unknown, args: { id: number }, { dataSources }: GatewayContext) => {
      return dataSources.otelAPI.getLocation(args.id);
    },

    devices: async (_: unknown, __: unknown, { dataSources }: GatewayContext) => {
      return dataSources.otelAPI.getDevices();
    },

    locationCount: async (
      _: unknown,
      args: { date?: string; device_id?: string },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getLocationCount(args);
    },
  },
};
