import { config } from '../config.js';
import type { GatewayContext } from './types.js';

export const healthResolvers = {
  Query: {
    health: async (_: unknown, __: unknown, { dataSources }: GatewayContext) => {
      try {
        return await dataSources.otelAPI.getHealth();
      } catch {
        return { status: 'healthy', version: config.version };
      }
    },

    ready: async (_: unknown, __: unknown, { dataSources }: GatewayContext) => {
      try {
        return await dataSources.otelAPI.getReady();
      } catch (error) {
        return {
          status: 'unhealthy',
          database: error instanceof Error ? error.message : 'unknown error',
          version: config.version,
        };
      }
    },
  },
};
