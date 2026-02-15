# Agent Operating Guide

All automation, assistants, and developers must follow
`.github/copilot-instructions.md` for workflow, safety, and environment rules.

## How to Use

- Read `.github/copilot-instructions.md` before making changes
- Apply every rule in that file as-is; do not redefine or override them here
- If updates are needed, edit `.github/copilot-instructions.md` and keep this
  file pointing to it

## Quick Reference

- **Language**: Node.js 24 / TypeScript 5.9 / Apollo Server 4
- **Development branch**: `develop` (default working branch)
- **Production branch**: `master` (releases only, PR-only)
- **Lint before commit**: `npm run lint:all`
- **Format code**: `npm run format`
- **Type check**: `npm run type-check`
- **Build**: `npm run build`
- **Run dev**: `npm run dev`
- **GraphQL Playground**: <http://localhost:4000>

## Development Workflow

1. Switch to develop: `git checkout develop && git pull origin develop`
2. **Rebase from master**: `git fetch origin master && git rebase origin/master`
3. Make changes to source in `src/`
4. Run `npm run lint:all`
5. Run `npm run type-check`
6. Test locally: `npm run dev`
7. Commit and push to `develop` or `feature/*` branch
8. Create PR to `master` when ready for production

## Project Structure

```text
otel-data-gateway/
├── src/
│   ├── index.ts              # Server entry point
│   ├── config.ts             # Configuration
│   ├── schema/
│   │   └── typeDefs.ts       # GraphQL type definitions
│   ├── resolvers/
│   │   ├── index.ts          # Merged resolvers
│   │   ├── health.ts         # Health queries
│   │   ├── location.ts       # Location queries
│   │   ├── garmin.ts         # Garmin queries
│   │   ├── gps.ts            # Unified GPS queries
│   │   ├── reference.ts      # Reference location queries
│   │   └── spatial.ts        # Spatial queries
│   └── datasources/
│       └── OtelDataAPI.ts    # REST API client
├── Dockerfile                # Multi-stage build
├── .github/workflows/        # CI/CD pipelines
└── VERSION                   # Release version
```
