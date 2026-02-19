# Copilot Rules for otel-data-gateway Repo

These rules ensure Copilot/assistants follow best practices for Apollo Server
GraphQL BFF development.

## Always Read First

- **README**: Read `README.md` for project overview and queries
- **env**: Load `.env` for API URL configuration (gitignored)
- **pre-commit**: ALWAYS run `npm run lint:all` before commit/PR

## Project Overview

Apollo Server GraphQL BFF (Backend-for-Frontend) gateway that maps REST
endpoints from otel-data-api to a unified GraphQL API for otel-ui consumption.

## Target Infrastructure

| Property     | Value                           |
| ------------ | ------------------------------- |
| Language     | Node.js 24 / TypeScript 5.9     |
| Framework    | Apollo Server 5                 |
| REST Backend | otel-data-api (FastAPI)         |
| K8s Cluster  | k8s-pi5-cluster                 |
| Namespace    | otel-data-gateway               |
| DNS          | gateway.lab.informationcart.com |
| Docker Image | stuartshay/otel-data-gateway    |

## Development Workflow

### Branch Strategy

⚠️ **CRITICAL RULE**: NEVER commit directly to `master` branch. All changes
MUST go through `develop` or `feature/*` branches.

- **master**: Protected branch, production-only (PR required, direct commits
  FORBIDDEN)
- **develop**: Primary development branch (work here by default)
- **feature/\***: Feature branches (use for isolated features, PR to `master`)

### Before Starting Any Work

**ALWAYS sync your working branch with the remote before making changes:**

```bash
# If working on develop:
git checkout develop && git fetch origin && git pull origin develop

# If creating a new feature branch:
git checkout master && git fetch origin && git pull origin master
git checkout -b feature/my-feature
```

**ALWAYS rebase onto the latest protected branch before creating a PR:**

```bash
git fetch origin master && git rebase origin/master
```

### Before Creating a PR

⚠️ **ALWAYS check for and resolve conflicts before creating a PR:**

1. Rebase onto the latest protected branch:
   `git fetch origin master && git rebase origin/master`
2. Resolve any conflicts during rebase
3. Force-push the rebased branch: `git push origin <branch> --force-with-lease`
4. Verify the PR shows no conflicts on GitHub before requesting review

This is especially important after squash merges, which cause develop to
diverge from master.

### Daily Workflow

1. **ALWAYS** start from `develop` or create a feature branch
2. **Sync with remote** before making any changes (see above)
3. Run `npm install` to install dependencies
4. Run `npm run dev` for development server
5. Run `npm run lint:all` before commit
6. Commit and push to `develop` or `feature/*` branch
7. **For feature branches**: rebase onto latest `master` before PR:
   `git fetch origin master && git rebase origin/master`
8. Create PR to `master` when ready for deployment
9. **NEVER**: `git push origin master` or commit directly to master

## Writing Code

### GraphQL Schema

- Define types in `src/schema/typeDefs.ts`
- Use SDL (Schema Definition Language) format
- Match REST API response shapes exactly
- Use `Connection` suffix for paginated types

### Resolvers

- One file per domain in `src/resolvers/`
- All resolvers delegate to `OtelDataAPI` data source
- Use `GatewayContext` type for context parameter
- Merge all resolvers in `src/resolvers/index.ts`

### Data Source

- `OtelDataAPI` class in `src/datasources/OtelDataAPI.ts`
- Uses native `fetch` for HTTP requests
- Pass query parameters as-is from GraphQL args to REST API
- Handle errors with descriptive messages

## Safety Rules (Do Not)

- ⛔ **NEVER commit directly to master branch**
- Do not commit secrets or `.env` files
- Do not use `latest` Docker tags in deployments
- Do not skip `npm run lint:all` before commits
- Do not hardcode API URLs (use environment variables)

## Quick Commands

```bash
npm run dev           # Start dev server (watch mode)
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
npm run lint:all      # Run all linters
npm run format        # Format code
npm run type-check    # TypeScript check
npm run test          # Run tests
```

## Related Repositories

- [otel-data-api](https://github.com/stuartshay/otel-data-api) — REST API backend
- [otel-ui](https://github.com/stuartshay/otel-ui) — React frontend
- [k8s-gitops](https://github.com/stuartshay/k8s-gitops) — Kubernetes deployment
