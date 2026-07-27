import { trace } from '@opentelemetry/api';
import type { ApolloServerPlugin } from '@apollo/server';
import type { GraphQLError } from 'graphql';
import { logger } from '../logging.js';
import type { GatewayContext } from '../resolvers/types.js';

const LOG_MESSAGE = 'GraphQL request';

function severity(errors: readonly GraphQLError[] | undefined): 'info' | 'warn' | 'error' {
  if (!errors || errors.length === 0) return 'info';
  const hasInternalError = errors.some(
    (error) => error.extensions?.code === 'INTERNAL_SERVER_ERROR',
  );
  return hasInternalError ? 'error' : 'warn';
}

function currentTraceIds(): { 'trace.id'?: string; 'span.id'?: string } {
  const spanContext = trace.getActiveSpan()?.spanContext();
  if (!spanContext) return {};
  return { 'trace.id': spanContext.traceId, 'span.id': spanContext.spanId };
}

/**
 * Logs one line per GraphQL operation (name, type, duration, error count) so
 * request activity is visible in the same structured-log pipeline as
 * startup/readiness events, mirroring otel-data-api's HTTP request logging
 * (app/middleware.py: same duration_ms/trace.id/span.id fields, severity
 * keyed off error presence rather than HTTP status since GraphQL always
 * returns 200).
 */
export const requestLoggingPlugin: ApolloServerPlugin<GatewayContext> = {
  async requestDidStart() {
    const startedAt = process.hrtime.bigint();

    return {
      async willSendResponse(requestContext) {
        const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
        const { operationName, operation, errors } = requestContext;
        const level = severity(errors);

        const fields = {
          'graphql.operation.name': operationName ?? 'anonymous',
          'graphql.operation.type': operation?.operation ?? 'unknown',
          duration_ms: Math.round(durationMs * 100) / 100,
          'graphql.error_count': errors?.length ?? 0,
          ...currentTraceIds(),
        };

        if (level === 'error') {
          logger.error(LOG_MESSAGE, { ...fields, errors: errors?.map((error) => error.message) });
        } else if (level === 'warn') {
          logger.warn(LOG_MESSAGE, { ...fields, errors: errors?.map((error) => error.message) });
        } else {
          logger.info(LOG_MESSAGE, fields);
        }
      },
    };
  },
};
