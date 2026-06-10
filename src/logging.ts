type LogLevel = 'info' | 'warning' | 'error';

type LogFields = Record<string, unknown>;

const serviceName = process.env.OTEL_SERVICE_NAME ?? 'otel-data-gateway';
const serviceNamespace = process.env.SERVICE_NAMESPACE ?? 'otel-data-gateway';
const environment = process.env.NODE_ENV ?? 'production';

function emit(level: LogLevel, event: string, fields: LogFields = {}): void {
  const payload = {
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

  const line = JSON.stringify(payload);
  if (level === 'error') {
    process.stderr.write(`${line}\n`);
    return;
  }
  process.stdout.write(`${line}\n`);
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
