type LogLevel = 'info' | 'warning' | 'error';

type LogFields = Record<string, unknown>;

const serviceName = process.env.OTEL_SERVICE_NAME ?? 'otel-data-gateway';
const serviceNamespace = process.env.SERVICE_NAMESPACE ?? 'otel-data-gateway';
const environment = process.env.NODE_ENV ?? 'production';

function basePayload(level: LogLevel, event: string, fields: LogFields = {}): LogFields {
  return {
    ...fields,
    event,
    message: event,
    level,
    logger: 'otel-data-gateway',
    timestamp: new Date().toISOString(),
    'service.name': serviceName,
    'service.namespace': serviceNamespace,
    environment,
  };
}

function writeLine(level: LogLevel, line: string): void {
  try {
    if (level === 'error') {
      process.stderr.write(`${line}\n`);
      return;
    }
    process.stdout.write(`${line}\n`);
  } catch {
    // Logging must never crash the process.
  }
}

function emit(level: LogLevel, event: string, fields: LogFields = {}): void {
  try {
    writeLine(level, JSON.stringify(basePayload(level, event, fields)));
  } catch (error) {
    const serializationError = error instanceof Error ? error.message : String(error);
    const fallback = basePayload('error', 'Log serialization failed', {
      original_event: event,
      serialization_error: serializationError,
    });
    writeLine('error', JSON.stringify(fallback));
  }
}

export const logger = {
  info(event: string, fields?: LogFields): void {
    emit('info', event, fields);
  },
  warn(event: string, fields?: LogFields): void {
    emit('warning', event, fields);
  },
  error(event: string, fields?: LogFields): void {
    emit('error', event, fields);
  },
};
