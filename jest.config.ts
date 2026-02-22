import type { Config } from 'jest';

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    ],
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts', '!src/__generated__/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'json-summary', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
  clearMocks: true,
};

export default config;
