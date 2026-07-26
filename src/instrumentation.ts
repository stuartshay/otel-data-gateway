/**
 * OpenTelemetry SDK bootstrap. Loaded via `node --import ./dist/instrumentation.js`
 * (see Dockerfile) so it registers before any other module -- including the
 * `http`/`undici` (fetch) and Express instrumentation targets -- is imported.
 * Mirrors otel-data-api's app/tracing.py: same resource attribute keys
 * (service.name, service.namespace, deployment.environment), same in-cluster
 * OTLP gRPC endpoint, so spans from both services land in the same trace with
 * consistent attribution.
 *
 * Gated on OTEL_TRACES_ENABLED so local `npm run dev` doesn't need a
 * collector running.
 */
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';

if ((process.env.OTEL_TRACES_ENABLED ?? 'false').toLowerCase() === 'true') {
  // OTEL_EXPORTER_OTLP_ENDPOINT is a bare "host:port" (matching the format
  // otel-data-api's Python config already uses for the same collector), but
  // the JS gRPC exporter defaults to TLS unless the URL scheme is explicitly
  // "http://" -- Python's client expresses this via a separate `insecure=True`
  // flag instead, so there's no scheme to carry over as-is.
  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'localhost:4317';
  const otlpUrl = endpoint.includes('://') ? endpoint : `http://${endpoint}`;

  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      'service.name': process.env.OTEL_SERVICE_NAME ?? 'otel-data-gateway',
      'service.namespace': process.env.OTEL_SERVICE_NAMESPACE ?? 'otel-data-gateway',
      'deployment.environment': process.env.OTEL_ENVIRONMENT ?? 'development',
    }),
    traceExporter: new OTLPTraceExporter({ url: otlpUrl }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();

  for (const signal of ['SIGTERM', 'SIGINT'] as const) {
    process.on(signal, () => {
      sdk.shutdown().catch(() => {
        // best-effort flush on shutdown; never block process exit on it
      });
    });
  }
}
