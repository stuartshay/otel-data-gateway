import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface AppConfig {
  port: number;
  otelDataApiUrl: string;
  nodeEnv: string;
  version: string;
}

function readVersion(): string {
  if (process.env.APP_VERSION) {
    return process.env.APP_VERSION;
  }
  try {
    const versionPath = resolve(__dirname, '..', 'VERSION');
    return readFileSync(versionPath, 'utf-8').trim();
  } catch {
    return 'unknown';
  }
}

export const config: AppConfig = {
  port: parseInt(process.env.PORT ?? '4000', 10),
  otelDataApiUrl: process.env.OTEL_DATA_API_URL ?? 'https://api.lab.informationcart.com',
  nodeEnv: process.env.NODE_ENV ?? 'production',
  version: readVersion(),
};
