'use strict';

/**
 * New Relic agent configuration (CJS format for ESM compatibility).
 *
 * Loaded via: node --require ./newrelic.cjs dist/index.js
 *
 * All sensitive values (NEW_RELIC_LICENSE_KEY) come from environment
 * variables injected by Kubernetes secrets.
 *
 * @see https://docs.newrelic.com/docs/apm/agents/nodejs-agent/installation-configuration/nodejs-agent-configuration/
 */
exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || 'otel-data-gateway'],
  logging: {
    level: process.env.NEW_RELIC_LOG_LEVEL || 'info',
  },
  distributed_tracing: {
    enabled: true,
  },
  application_logging: {
    enabled: true,
    forwarding: {
      enabled: true,
    },
  },
  allow_all_headers: true,
};
