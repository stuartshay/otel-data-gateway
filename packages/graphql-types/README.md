# @stuartshay/otel-graphql-types

TypeScript types auto-generated from the otel-data-gateway GraphQL schema.

## Installation

```bash
npm install @stuartshay/otel-graphql-types
```

## Usage

### Import Types

```typescript
import type { Location, GarminActivity, LocationConnection } from '@stuartshay/otel-graphql-types';
```

### Use Schema for Client Codegen

The package includes `schema.graphql` for use with `@graphql-codegen/cli` in
client applications:

```typescript
// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'node_modules/@stuartshay/otel-graphql-types/schema.graphql',
  documents: 'src/graphql/**/*.ts',
  generates: {
    'src/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
```

## Generation

Types are auto-generated from the GraphQL SDL schema using
`@graphql-codegen/typescript`. Do not edit `index.d.ts` manually.

## Related Packages

- [`@stuartshay/otel-data-types`](https://www.npmjs.com/package/@stuartshay/otel-data-types) —
  REST API types (OpenAPI-generated)
