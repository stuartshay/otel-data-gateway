import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { readFileSync } from 'node:fs';

const ORIGINAL_ENV = { ...process.env };

async function loadConfig() {
  const module = await import('../src/config.js');
  return module.config;
}

const readVersionFile = () => readFileSync(new URL('../VERSION', import.meta.url), 'utf-8').trim();

describe('config', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    jest.restoreAllMocks();
  });

  it('uses defaults when environment variables are not provided', async () => {
    delete process.env.PORT;
    delete process.env.OTEL_DATA_API_URL;
    delete process.env.NODE_ENV;
    delete process.env.APP_VERSION;

    const config = await loadConfig();

    expect(config.port).toBe(4000);
    expect(config.otelDataApiUrl).toBe('https://api.lab.informationcart.com');
    expect(config.nodeEnv).toBe('production');
    expect(config.version).toBe(readVersionFile());
  });

  it('respects environment overrides for all fields', async () => {
    process.env.PORT = '5050';
    process.env.OTEL_DATA_API_URL = 'https://example.test';
    process.env.NODE_ENV = 'development';
    process.env.APP_VERSION = '9.9.9';

    const config = await loadConfig();

    expect(config.port).toBe(5050);
    expect(config.otelDataApiUrl).toBe('https://example.test');
    expect(config.nodeEnv).toBe('development');
    expect(config.version).toBe('9.9.9');
  });

  // unstable_mockModule is the standard ESM mock API in Jest 30.
  // The mock is registered BEFORE loadConfig() triggers the dynamic import,
  // so config.ts sees the mocked readFileSync when it loads.
  it('falls back to "unknown" when the VERSION file cannot be read', async () => {
    await jest.unstable_mockModule('node:fs', () => ({
      readFileSync: jest.fn(() => {
        throw new Error('missing VERSION');
      }),
    }));

    const config = await loadConfig();

    expect(config.version).toBe('unknown');
  });
});
