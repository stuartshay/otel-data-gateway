import type { QueryResolvers } from '../__generated__/resolvers-types.js';
import { config } from '../config.js';

export const healthResolvers: { Query: Pick<QueryResolvers, 'health' | 'ready'> } = {
  Query: {
    health: async (_parent, _args, { dataSources }) => {
      try {
        return await dataSources.otelAPI.getHealth();
      } catch {
        return { status: 'healthy', version: config.version };
      }
    },

    ready: async (_parent, _args, { dataSources }) => {
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
