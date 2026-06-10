import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { logger } from '../src/logging.js';

describe('logger', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('writes info logs to stdout with event and message fields', () => {
    const stdoutSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true as never);
    const stderrSpy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true as never);

    logger.info('Gateway started', { port: 4000 });

    expect(stdoutSpy).toHaveBeenCalledTimes(1);
    expect(stderrSpy).not.toHaveBeenCalled();

    const output = String(stdoutSpy.mock.calls[0]?.[0] ?? '').trim();
    const payload = JSON.parse(output) as Record<string, unknown>;

    expect(payload.event).toBe('Gateway started');
    expect(payload.message).toBe('Gateway started');
    expect(payload.level).toBe('info');
    expect(payload.logger).toBe('otel-data-gateway');
    expect(payload.port).toBe(4000);
    expect(payload['service.name']).toBe(process.env.OTEL_SERVICE_NAME ?? 'otel-data-gateway');
    expect(payload['service.namespace']).toBe(
      process.env.SERVICE_NAMESPACE ?? 'otel-data-gateway',
    );
    expect(payload.environment).toBe(process.env.NODE_ENV ?? 'production');
    expect(typeof payload.timestamp).toBe('string');
  });

  it('writes warn logs to stdout', () => {
    const stdoutSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true as never);

    logger.warn('Readiness check failed');

    const output = String(stdoutSpy.mock.calls[0]?.[0] ?? '').trim();
    const payload = JSON.parse(output) as Record<string, unknown>;
    expect(payload.level).toBe('warning');
  });

  it('writes error logs to stderr', () => {
    const stdoutSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true as never);
    const stderrSpy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true as never);

    logger.error('Unhandled rejection', { reason: 'boom' });

    expect(stderrSpy).toHaveBeenCalledTimes(1);
    expect(stdoutSpy).not.toHaveBeenCalled();

    const output = String(stderrSpy.mock.calls[0]?.[0] ?? '').trim();
    const payload = JSON.parse(output) as Record<string, unknown>;
    expect(payload.level).toBe('error');
    expect(payload.reason).toBe('boom');
  });

  it('falls back to a minimal error log when fields are not serializable', () => {
    const stderrSpy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true as never);

    expect(() => logger.info('Bad payload', { value: 1n })).not.toThrow();

    expect(stderrSpy).toHaveBeenCalledTimes(1);
    const output = String(stderrSpy.mock.calls[0]?.[0] ?? '').trim();
    const payload = JSON.parse(output) as Record<string, unknown>;

    expect(payload.event).toBe('Log serialization failed');
    expect(payload.message).toBe('Log serialization failed');
    expect(payload.level).toBe('error');
    expect(payload.original_event).toBe('Bad payload');
    expect(String(payload.serialization_error)).toContain('serialize');
  });
});
