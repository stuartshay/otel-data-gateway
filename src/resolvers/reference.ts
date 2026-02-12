import type { GatewayContext } from './types.js';

export const referenceResolvers = {
  Query: {
    referenceLocations: async (_: unknown, __: unknown, { dataSources }: GatewayContext) => {
      return dataSources.otelAPI.getReferenceLocations();
    },

    referenceLocation: async (
      _: unknown,
      args: { id: number },
      { dataSources }: GatewayContext,
    ) => {
      return dataSources.otelAPI.getReferenceLocation(args.id);
    },
  },
};
