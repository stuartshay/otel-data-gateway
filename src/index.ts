import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema/typeDefs.js';
import resolvers from './resolvers/index.js';
import { OtelDataAPI } from './datasources/OtelDataAPI.js';
import { config } from './config.js';
import type { GatewayContext } from './resolvers/types.js';

const server = new ApolloServer<GatewayContext>({
  typeDefs,
  resolvers,
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: config.port },
  context: async (): Promise<GatewayContext> => ({
    dataSources: {
      otelAPI: new OtelDataAPI(),
    },
  }),
});

console.log(`🚀 otel-data-gateway v${config.version} ready at ${url}`);
