'use strict';

/**
 * New Relic agent configuration (CJS format for ESM compatibility).
 *
 * Usage (recommended):
 *   NEW_RELIC_CONFIG_FILE=./newrelic.cjs node --require newrelic dist/index.js
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
  // Disable blanket header capture to avoid sending sensitive headers (e.g. Authorization, cookies) to New Relic.
  allow_all_headers: false,
};
