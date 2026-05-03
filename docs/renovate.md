# Renovate Configuration & Label Taxonomy

This repo uses [Renovate](https://docs.renovatebot.com/) to keep dependencies
up to date. The configuration lives in [`renovate.json`](../renovate.json) at
the repo root.

This document describes the label taxonomy, grouping strategy, and auto-merge
rules so that PRs are easy to triage at a glance.

---

## Schedule & Limits

| Setting               | Value                  |
| --------------------- | ---------------------- |
| Timezone              | `America/New_York`     |
| Schedule              | `before 6am on Monday` |
| `prHourlyLimit`       | `2`                    |
| `prConcurrentLimit`   | `5`                    |
| `dependencyDashboard` | `true`                 |

A single **Dependency Dashboard** issue is maintained automatically — look for
the issue titled _"🤖 Renovate Dependency Dashboard"_ in the Issues tab for a
top-down view of all pending, blocked, and rate-limited updates.

## Enabled Managers

- `npm`
- `dockerfile`
- `github-actions`

Other managers (e.g. `nvm`, `helm-values`) are intentionally disabled.

---

## Label Taxonomy

Every Renovate PR receives the two base labels `dependencies` and `renovate`.
Additional labels are added automatically based on **what is being updated** and
**how risky the update is**.

### Base labels (always applied)

| Label          | Meaning                             |
| -------------- | ----------------------------------- |
| `dependencies` | PR updates one or more dependencies |
| `renovate`     | PR was opened by the Renovate bot   |

### Severity labels (by update type)

| Label          | When applied                             | Auto-merge?             |
| -------------- | ---------------------------------------- | ----------------------- |
| `patch`        | SemVer patch bump (e.g. `1.2.3 → 1.2.4`) | ✅ npm, docker, actions |
| `minor`        | SemVer minor bump (e.g. `1.2.3 → 1.3.0`) | ✅ docker, actions only |
| `major`        | SemVer major bump (e.g. `1.x → 2.x`)     | ❌ never                |
| `breaking`     | Added together with `major`              | ❌                      |
| `needs-review` | Added to any major / vulnerability PR    | ❌                      |
| `security`     | Added to vulnerability-alert PRs         | ❌ (prioritized)        |

### Manager labels

| Label            | Source                      |
| ---------------- | --------------------------- |
| `npm`            | `package.json` dependencies |
| `docker`         | `Dockerfile` base image     |
| `ci`             | `.github/workflows/*`       |
| `github-actions` | `.github/workflows/*`       |

### Ecosystem / scope labels (by package group)

Each group adds context labels and a semantic-commit scope. Packages not
listed here fall through to the default manager label only.

- **`apollo-server`** — labels: `graphql`, `apollo`, `runtime` · scope:
  `deps/apollo`
  - `@apollo/server`, `@as-integrations/express5`, `graphql`, `graphql-tag`
- **`graphql-codegen`** — labels: `graphql`, `codegen`, `dev-deps` · scope:
  `deps/codegen`
  - `@graphql-codegen/cli`, `@graphql-codegen/typescript`,
    `@graphql-codegen/typescript-resolvers`
- **`eslint`** — labels: `linting`, `dev-deps` · scope: `deps/eslint`
  - `eslint`, `@eslint/js`, `typescript-eslint`, `globals`
- **`jest`** — labels: `testing`, `dev-deps` · scope: `deps/testing`
  - `jest`, `@jest/globals`, `ts-jest`
- **`formatting-tools`** — labels: `formatting`, `dev-deps` · scope:
  `deps/formatting`
  - `cspell`, `prettier`, `markdownlint-cli2`, `husky`, `lint-staged`
- **`typescript`** — labels: `typescript`, `dev-deps` · scope:
  `deps/typescript`
  - `typescript`, `tsx`, `@types/**`
- **`newrelic`** — labels: `observability`, `runtime` · scope:
  `deps/newrelic`
  - `newrelic`, `@types/newrelic`
- **`express`** — labels: `runtime` · scope: `deps/express`
  - `express`, `cors`, `@types/express`, `@types/cors`
- **`github-actions-*`** — labels: `ci`, `github-actions` · scope: `deps/ci`
  - any action referenced in `.github/workflows/*`
- **Docker** — labels: `docker` · scope: `deps/docker`
  - `Dockerfile` base image updates

---

## Auto-merge Matrix

| Manager        | Patch | Minor | Major |
| -------------- | :---: | :---: | :---: |
| npm            |  ✅   |  ❌   |  ❌   |
| Dockerfile     |  ✅   |  ✅   |  ❌   |
| GitHub Actions |  ✅   |  ✅   |  ❌   |

Major updates **always** require a human review and carry the `needs-review`
label. Vulnerability-driven updates carry `security` and are prioritized on the
dashboard.

---

## Excluded Packages

The `@stuartshay/*` packages (notably `@stuartshay/otel-data-types`) are
**excluded from Renovate** because they are managed by the dedicated
[`update-types.yml`](../.github/workflows/update-types.yml) workflow, which
opens its own tagged PRs (`automated`, `types-update`, `otel-data-types`).

---

## Triage Cheat Sheet

- **Quick merge candidates** — look for PRs labeled `patch` that auto-merged
  themselves. If one sits unmerged, check CI.
- **Needs attention this week** — filter by `needs-review` or `major`.
- **Security-first** — filter by `security`; these jump the queue.
- **Breaking but intentional** — `major` + `breaking` combined signals a
  deliberate manual-review update.

## Updating the Config

1. Edit [`renovate.json`](../renovate.json).
2. Validate locally (optional):

   ```bash
   npx --yes --package=renovate -- renovate-config-validator renovate.json
   ```

3. Open a PR; Renovate will re-read the config on the next run.

## References

- [Renovate configuration options](https://docs.renovatebot.com/configuration-options/)
- [Renovate preset `config:recommended`](https://docs.renovatebot.com/presets-config/#configrecommended)
- [Dependency Dashboard](https://docs.renovatebot.com/key-concepts/dashboard/)
