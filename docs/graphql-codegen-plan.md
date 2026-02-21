# GraphQL Codegen + Published Types Package

End-to-end type safety from GraphQL schema to React components. The gateway
generates resolver types internally and publishes `@stuartshay/otel-graphql-types`
to npm. The UI consumes this package and generates fully-typed Apollo hooks.
Eliminates all `Record<string, any>` and `unknown[]` usage.

**Existing infrastructure**: `@stuartshay/otel-data-types` is already published
to public npm from `otel-data-api/packages/otel-data-types/` — generated from
the FastAPI OpenAPI spec via `openapi-typescript`. The gateway will also consume
this package to type its REST data source layer.

---

## Phase 1: Gateway — Internal Codegen for Resolver Types

**Goal**: Type-safe resolvers and data source in the gateway.

- [x] **1.1** Install codegen devDependencies
  - `@graphql-codegen/cli`
  - `@graphql-codegen/typescript`
  - `@graphql-codegen/typescript-resolvers`

- [x] **1.2** Extract standalone `schema.graphql` from SDL template
  - Create `src/schema/schema.graphql` with raw SDL (no `gql` wrapper)
  - Update `src/schema/typeDefs.ts` to read from `.graphql` file via
    `readFileSync` instead of inline template
  - This file becomes the single source of truth for codegen and runtime

- [x] **1.3** Create `codegen.ts` config at project root
  - Input: `src/schema/schema.graphql`
  - Output: `src/__generated__/resolvers-types.ts`
  - Context type: `GatewayContext` from `src/resolvers/types.ts`
  - Scalars: `DateTime → string`, `JSON → Record<string, unknown>`

- [x] **1.4** Add npm scripts
  - `"codegen"` → `graphql-codegen`
  - `"codegen:watch"` → `graphql-codegen --watch`
  - Wire codegen as pre-step in `"build"` script

- [x] **1.5** Install `@stuartshay/otel-data-types` as a dependency
  - Type the REST data source layer with OpenAPI-generated types

- [x] **1.6** Refactor `src/datasources/OtelDataAPI.ts`
  - Replace `unknown[]` and `Record<string, unknown>` returns with types
    from `@stuartshay/otel-data-types` (`Location`, `GarminActivity`, etc.)

- [x] **1.7** Refactor resolvers to use generated types
  - `src/resolvers/location.ts` → `QueryLocationsArgs`, `QueryLocationArgs`
  - `src/resolvers/garmin.ts` → `QueryGarminActivitiesArgs`, etc.
  - `src/resolvers/gps.ts` → `QueryUnifiedGpsArgs`, `QueryDailySummaryArgs`
  - `src/resolvers/spatial.ts` → `QueryNearbyPointsArgs`, etc.
  - `src/resolvers/reference.ts` → `QueryReferenceLocationArgs`
  - `src/resolvers/types.ts` → integrate generated `Resolvers` type

- [x] **1.8** Verify Phase 1
  - `npm run codegen` produces `src/__generated__/resolvers-types.ts` ✅
  - `npm run type-check` passes with zero errors ✅
  - `npm run build` succeeds ✅
  - `npm run lint` passes ✅
  - `npm run format:check` passes ✅

**Files modified/created**:

| File                                   | Action                                 |
| -------------------------------------- | -------------------------------------- |
| `package.json`                         | Add devDeps + deps + scripts           |
| `codegen.ts`                           | New — codegen configuration            |
| `src/schema/schema.graphql`            | New — extracted SDL schema             |
| `src/schema/typeDefs.ts`               | Modify — read from .graphql file       |
| `src/__generated__/resolvers-types.ts` | Generated — resolver types             |
| `src/resolvers/types.ts`               | Modify — integrate generated Resolvers |
| `src/resolvers/location.ts`            | Modify — use generated arg types       |
| `src/resolvers/garmin.ts`              | Modify — use generated arg types       |
| `src/resolvers/gps.ts`                 | Modify — use generated arg types       |
| `src/resolvers/spatial.ts`             | Modify — use generated arg types       |
| `src/resolvers/reference.ts`           | Modify — use generated arg types       |
| `src/resolvers/health.ts`              | Modify — use generated arg types       |
| `src/datasources/OtelDataAPI.ts`       | Modify — typed return values           |
| `eslint.config.js`                     | Modify — ignore `src/__generated__/`   |
| `.prettierignore`                      | Modify — ignore `src/__generated__/`   |

---

## Phase 2: Gateway — Publishable GraphQL Types Package

**Goal**: Publish schema + base GraphQL types as
`@stuartshay/otel-graphql-types` to public npm (matching the existing
`@stuartshay/otel-data-types` publishing pattern from `otel-data-api`).

- [x] **2.1** Create `packages/graphql-types/` directory
  - `package.json` with name `@stuartshay/otel-graphql-types`
  - `"type": "module"`, `"exports"`, `"files": ["dist/", "schema.graphql"]`
  - `"publishConfig": { "access": "public" }` (public npm, same as
    otel-data-types)

- [x] **2.2** Create `packages/graphql-types/tsconfig.json`
  - Skipped — types-only package (no JS emit needed), matching
    `@stuartshay/otel-data-types` pattern

- [x] **2.3** Add second codegen output target in `codegen.ts`
  - Output: `packages/graphql-types/dist/types.ts`
  - Base types only (`@graphql-codegen/typescript`), NOT resolver types
  - Copy `schema.graphql` into the package during build

- [x] **2.4** Add `"build:types-package"` npm script
  - Runs codegen → copies schema → compiles TypeScript declarations

- [x] **2.5** Verify Phase 2
  - `npm run build:types-package` produces `packages/graphql-types/`
    with `index.d.ts` and `schema.graphql` ✅
  - `cd packages/graphql-types && npm pack --dry-run` shows 4 files
    (index.d.ts, schema.graphql, README.md, package.json) ✅

**Files modified/created**:

| File                                   | Action                                  |
| -------------------------------------- | --------------------------------------- |
| `packages/graphql-types/package.json`  | New                                     |
| `packages/graphql-types/tsconfig.json` | New                                     |
| `packages/graphql-types/dist/`         | Generated output                        |
| `codegen.ts`                           | Modify — add second output target       |
| `package.json`                         | Modify — add build:types-package script |

---

## Phase 3: CI — Publish Types Package on Release

**Goal**: Auto-publish the GraphQL types package when gateway pushes to master.
Follows the same pattern as `otel-data-api`'s publish-types workflow.

- [x] **3.1** Add publish-types job to `.github/workflows/publish-types.yml`
  - Separate workflow (not in docker.yml), triggered on `release: [published]`
  - `npm ci` → `npm run build:types-package` → `npm publish`
  - Version from release tag: `v1.0.8` → `1.0.8`
  - Uses `NPM_TOKEN` secret for auth

- [x] **3.2** `NPM_TOKEN` secret must be configured as a repo secret
      (same token already used by otel-data-api)

- [ ] **3.3** Verify Phase 3 (after first release)
  - Create a GitHub Release with tag `v1.0.0`
  - Workflow triggers and publishes to npm
  - Package appears: `npm view @stuartshay/otel-graphql-types`

**Files modified**:

| File                                  | Action |
| ------------------------------------- | ------ |
| `.github/workflows/publish-types.yml` | New    |

---

## Phase 4: UI — Consume Types Package + Generate Typed Hooks

**Goal**: Replace all `Record<string, any>` with auto-generated typed Apollo
hooks.

- [x] **4.1** Install dependencies
  - `@graphql-codegen/cli` (dev)
  - `@graphql-codegen/typescript` (dev)
  - `@graphql-codegen/typescript-operations` (dev)
  - `@graphql-codegen/typescript-react-apollo@4.4.0` (dev)
  - Schema sourced from `../otel-data-gateway/src/schema/schema.graphql`
    (local cross-repo reference until `@stuartshay/otel-graphql-types`
    is published to npm)

- [x] **4.2** Create `codegen.ts` config at UI project root
  - Schema: `../otel-data-gateway/src/schema/schema.graphql`
    (TODO: switch to `node_modules/@stuartshay/otel-graphql-types/schema.graphql`
    after first npm publish)
  - Documents: `src/graphql/**/*.ts`
  - Output: `src/__generated__/graphql.ts`
  - Plugins: `add` (prepends `/* eslint-disable */\n// @ts-nocheck`),
    `typescript`, `typescript-operations`, `typescript-react-apollo`
  - Config: `withHooks: true`, `withComponent: false`, `withHOC: false`,
    `useTypeImports: true`, `enumsAsTypes: true`,
    `apolloReactHooksImportFrom: '@apollo/client/react'`,
    `apolloReactCommonImportFrom: '@apollo/client/react'`
  - Scalars: `DateTime → string`, `JSON → Record<string, unknown>`
  - **Key decisions**:
    - `enumsAsTypes: true` generates `SortOrder = 'asc' | 'desc'` union
      type instead of TypeScript enum (compatible with string literals)
    - `apolloReactHooksImportFrom` / `apolloReactCommonImportFrom` needed
      because Apollo Client 4 root export doesn't resolve React hooks in
      `tsc -b` mode
    - `@ts-nocheck` via `add` plugin suppresses suspense hook overload
      incompatibilities between codegen 4.4.0 and Apollo Client 4

- [x] **4.3** Add npm scripts
  - `"codegen"` → `graphql-codegen`
  - `"codegen:watch"` → `graphql-codegen --watch`

- [x] **4.4** Run codegen and commit generated `src/__generated__/graphql.ts`
  - Generated 17 query hooks (regular + lazy + suspense variants)
  - Added `src/__generated__/` to `eslint.config.js` ignores
  - Created `.prettierignore` with `src/__generated__/`

- [x] **4.5** Refactor page components to use generated hooks
  - `src/pages/DashboardPage.tsx` ✅
  - `src/pages/LocationsPage.tsx` ✅
  - `src/pages/LocationDetailPage.tsx` ✅
  - `src/pages/GarminPage.tsx` ✅
  - `src/pages/GarminDetailPage.tsx` ✅
  - `src/pages/MapPage.tsx` ✅
  - `src/pages/DailySummaryPage.tsx` ✅
  - `src/pages/ReferencesPage.tsx` ✅
  - `src/pages/SpatialPage.tsx` ✅

  For each page:
  - Replaced `useQuery<Record<string, any>>(XXX_QUERY, ...)` with generated
    `useXxxQuery(...)`
  - Removed all inline `as Array<{...}>` type casts
  - Removed manual type definitions that duplicate schema types

- [ ] **4.6** Update component prop interfaces to reference generated types
  - `src/components/garmin/*.tsx` — use generated `GarminActivity`,
    `GarminTrackPoint`, etc.
  - **Deferred**: All 5 garmin components (ActivityHeader, ActivityStatsBar,
    ActivityRouteMap, ActivityCharts, ActivityStatsPanel) have self-contained
    inline prop interfaces with no `useQuery` calls — functional as-is

- [x] **4.7** Verify Phase 4
  - `npm run codegen` produces `src/__generated__/graphql.ts` with typed
    hooks for all 17 queries ✅
  - `npm run type-check` passes ✅
  - `npx eslint src/` passes with 0 errors ✅
  - `npm run format:check` passes ✅
  - `npm run build` (`tsc -b && vite build`): `tsc -b` has 2 pre-existing
    `ActivityCharts.tsx` Recharts tooltip type errors (confirmed pre-existing
    via `git stash` test — not caused by codegen changes)

**Files modified/created**:

| File                               | Action                                   |
| ---------------------------------- | ---------------------------------------- |
| `package.json`                     | Modify — new devDeps + scripts           |
| `codegen.ts`                       | New — codegen config                     |
| `src/__generated__/graphql.ts`     | Generated — types + 17 typed hooks       |
| `eslint.config.js`                 | Modify — ignore `src/__generated__/`     |
| `.prettierignore`                  | New — ignore `src/__generated__/`        |
| `src/pages/DashboardPage.tsx`      | Modify — use generated hooks             |
| `src/pages/LocationsPage.tsx`      | Modify — use generated hooks             |
| `src/pages/LocationDetailPage.tsx` | Modify — use generated hooks             |
| `src/pages/GarminPage.tsx`         | Modify — use generated hooks             |
| `src/pages/GarminDetailPage.tsx`   | Modify — use generated hooks             |
| `src/pages/MapPage.tsx`            | Modify — use generated hooks             |
| `src/pages/DailySummaryPage.tsx`   | Modify — use generated hooks             |
| `src/pages/ReferencesPage.tsx`     | Modify — use generated hooks             |
| `src/pages/SpatialPage.tsx`        | Modify — use generated hooks             |
| `src/components/garmin/*.tsx`      | Deferred — inline props functional as-is |

---

## Decisions

| Decision                                           | Rationale                                                      |
| -------------------------------------------------- | -------------------------------------------------------------- |
| Schema extraction to `.graphql` file               | Required for codegen; standard practice                        |
| Generated files committed to git                   | Reviewable in PRs; avoids codegen in CI                        |
| Public npm registry (not GitHub Packages)          | Matches existing `otel-data-types` pattern; no `.npmrc` needed |
| `NPM_TOKEN` for publishing                         | Same secret already used by `otel-data-api`                    |
| Gateway consumes `@stuartshay/otel-data-types`     | Types REST data source layer with OpenAPI-generated types      |
| Gateway publishes `@stuartshay/otel-graphql-types` | UI consumes schema + base GraphQL types                        |
| Version = `VERSION` + run number                   | Matches Docker tag versioning pattern                          |
| Read-only schema (no mutations)                    | If mutations added later, codegen auto-generates types         |
| No changes to `otel-data-api`                      | Python backend unchanged; purely a type safety improvement     |

## Notes

- Renovate (already in UI repo) will auto-create PRs when new types package
  versions are published
- The 5 Garmin temperature/time fields in the GraphQL schema are not in the
  current OpenAPI spec — these will need `@stuartshay/otel-data-types` updated
  or manual override types in the gateway
