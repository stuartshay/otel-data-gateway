import express from 'express';
import cors from 'cors';
import http from 'node:http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import typeDefs from './schema/typeDefs.js';
import resolvers from './resolvers/index.js';
import { OtelDataAPI } from './datasources/OtelDataAPI.js';
import { config } from './config.js';
import type { GatewayContext } from './resolvers/types.js';

const app = express();
const httpServer = http.createServer(app);

// ── Health endpoints (REST) ─────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', version: config.version });
});

app.get('/ready', async (_req, res) => {
  try {
    const api = new OtelDataAPI();
    const result = await api.getHealth();
    res.json({ status: 'ready', backend: result.status, version: config.version });
  } catch {
    res.status(503).json({ status: 'not_ready', version: config.version });
  }
});

// ── Apollo GraphQL ──────────────────────────────────────
const server = new ApolloServer<GatewayContext>({
  typeDefs,
  resolvers,
  introspection: true,
});

await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async (): Promise<GatewayContext> => ({
      dataSources: {
        otelAPI: new OtelDataAPI(),
      },
    }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: config.port }, resolve));

console.log(`🚀 otel-data-gateway v${config.version} ready at http://localhost:${config.port}/`);
