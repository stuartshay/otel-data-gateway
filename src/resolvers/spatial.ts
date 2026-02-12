import type { GatewayContext } from './types.js';

export const spatialResolvers = {
  Query: {
    nearbyPoints: async (
      _: unknown,
      args: {
        lat: number;
        lon: number;
        radius_meters?: number;
        source?: string;
        limit?: number;
      },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getNearbyPoints(args);
    },

    calculateDistance: async (
      _: unknown,
      args: { from_lat: number; from_lon: number; to_lat: number; to_lon: number },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getDistance(args);
    },

    withinReference: async (
      _: unknown,
      args: { name: string; source?: string; limit?: number },
      { dataSources }: GatewayContext,
    ) => {
      const { name, ...params } = args;
      return dataSources.otelAPI.getWithinReference(name, params);
    },
  },
};
