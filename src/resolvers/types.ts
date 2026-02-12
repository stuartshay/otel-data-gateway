import type { OtelDataAPI } from '../datasources/OtelDataAPI.js';

export interface GatewayContext {
  dataSources: {
    otelAPI: OtelDataAPI;
  };
}
