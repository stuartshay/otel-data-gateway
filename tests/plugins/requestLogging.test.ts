import { afterEach, describe, expect, it, jest } from '@jest/globals';
import type { GraphQLError } from 'graphql';
import { requestLoggingPlugin } from '../../src/plugins/requestLogging.js';

function readLastLog(
  spy: jest.SpiedFunction<typeof process.stdout.write>,
): Record<string, unknown> {
  const output = String(spy.mock.calls.at(-1)?.[0] ?? '').trim();
  return JSON.parse(output) as Record<string, unknown>;
}

async function willSendResponse(requestContext: Record<string, unknown>): Promise<void> {
  const handlers = await requestLoggingPlugin.requestDidStart?.(
    // Only willSendResponse is exercised, so a minimal stub is enough.
    {} as never,
  );
  await handlers?.willSendResponse?.(requestContext as never);
}

describe('requestLoggingPlugin', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('logs a successful query at info level with operation name/type and duration', async () => {
    const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true as never);

    await willSendResponse({
      operationName: 'Health',
      operation: { operation: 'query' },
      errors: undefined,
    });

    expect(stdoutSpy).toHaveBeenCalledTimes(1);
    const payload = readLastLog(stdoutSpy);
    expect(payload.event).toBe('GraphQL request');
    expect(payload.level).toBe('info');
    expect(payload['graphql.operation.name']).toBe('Health');
    expect(payload['graphql.operation.type']).toBe('query');
    expect(payload['graphql.error_count']).toBe(0);
    expect(typeof payload.duration_ms).toBe('number');
  });

  it('falls back to "anonymous" when the operation has no name', async () => {
    const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true as never);

    await willSendResponse({
      operationName: null,
      operation: { operation: 'query' },
      errors: undefined,
    });

    const payload = readLastLog(stdoutSpy);
    expect(payload['graphql.operation.name']).toBe('anonymous');
  });

  it('logs validation/user errors at warn level with the error messages', async () => {
    const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true as never);
    const errors = [
      { message: 'Cannot query field "bogus"', extensions: { code: 'GRAPHQL_VALIDATION_FAILED' } },
    ] as unknown as GraphQLError[];

    await willSendResponse({ operationName: 'Bogus', operation: { operation: 'query' }, errors });

    const payload = readLastLog(stdoutSpy);
    expect(payload.level).toBe('warning');
    expect(payload['graphql.error_count']).toBe(1);
    expect(payload.errors).toEqual(['Cannot query field "bogus"']);
  });

  it('logs internal server errors to stderr at error level', async () => {
    const stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true as never);
    const stderrSpy = jest.spyOn(process.stderr, 'write').mockImplementation(() => true as never);
    const errors = [
      { message: 'Unexpected error', extensions: { code: 'INTERNAL_SERVER_ERROR' } },
    ] as unknown as GraphQLError[];

    await willSendResponse({
      operationName: 'GarminActivities',
      operation: { operation: 'query' },
      errors,
    });

    expect(stdoutSpy).not.toHaveBeenCalled();
    expect(stderrSpy).toHaveBeenCalledTimes(1);
    const payload = readLastLog(stderrSpy);
    expect(payload.level).toBe('error');
  });
});
