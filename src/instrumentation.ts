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
    instrumentations: [
      getNodeAutoInstrumentations({
        // Wraps every fs call process-wide, including the fs reads Node's
        // own module loader does on every require() -- generates a large
        // volume of low-value spans and was a contributor to the gateway
        // OOM-aborting under production traffic (contained heap ceiling
        // from the container memory limit, exhausted by instrumentation
        // overhead). Not needed: this app's own fs usage is a couple of
        // one-shot reads at startup (schema/version files), before any
        // request traffic exists to want a trace for.
        '@opentelemetry/instrumentation-fs': { enabled: false },
        // Default behavior creates one span per resolved field, including
        // every scalar field GraphQL resolves via its default resolver
        // (plain property lookup, no custom logic -- none of this codebase's
        // resolver maps define anything below Query/Mutation, so every field
        // on every returned object, at any depth, is a trivial lookup).
        // Verified live via New Relic: a single garminChartData request for
        // ~200 points produced 2,215 spans (2,199 of them these per-field
        // ones) and took 6.5s, of which only ~1.9s was the actual DB query +
        // HTTP call -- the rest was GraphQL/OTel per-field overhead, scaling
        // linearly with point count (tens of thousands for a large
        // activity). `ignoreTrivialResolveSpans` looks like the documented
        // fix but doesn't apply here -- it only affects graphql-js's global
        // execute() fieldResolver fallback, not resolvers already attached
        // to the schema by makeExecutableSchema (i.e. every field in any
        // Apollo/codegen setup, including this one), so it measured zero
        // reduction in a local before/after span-count comparison. `depth`
        // works as intended: 1 keeps a span for each root Query/Mutation
        // field's own resolution (real work: the datasource fetch) while
        // collapsing everything resolved beneath it onto that same span
        // instead of creating a new one per field per array item. Confirmed
        // locally on the same request: 2,560+ spans / 2.5s -> 12 spans /
        // 0.9s, byte-identical response.
        '@opentelemetry/instrumentation-graphql': { depth: 1 },
      }),
    ],
  });

  sdk.start();

  for (const signal of ['SIGTERM', 'SIGINT'] as const) {
    // Registering a listener at all overrides Node's default
    // terminate-on-signal behavior, so this handler now owns exiting the
    // process -- without an explicit process.exit(), the HTTP server keeps
    // the event loop alive and the container hangs until Kubernetes
    // force-kills it after the termination grace period.
    process.on(signal, () => {
      sdk
        .shutdown()
        .catch(() => {
          // best-effort flush; exit regardless of whether it succeeded
        })
        .finally(() => {
          process.exit(0);
        });
    });
  }
}
