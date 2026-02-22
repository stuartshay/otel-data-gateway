import type { CodegenConfig } from '@graphql-codegen/cli';

const scalarConfig = {
  DateTime: 'string',
  JSON: 'Record<string, unknown>',
};

const config: CodegenConfig = {
  schema: 'src/schema/schema.graphql',
  generates: {
    // Internal resolver types (used by gateway source code)
    'src/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../resolvers/types.js#GatewayContext',
        useIndexSignature: true,
        scalars: scalarConfig,
      },
    },
    // Publishable base types (shipped as @stuartshay/otel-graphql-types)
    'packages/graphql-types/index.d.ts': {
      plugins: ['typescript'],
      config: {
        enumsAsTypes: true,
        declarationKind: 'interface',
        scalars: scalarConfig,
      },
    },
  },
};

export default config;
