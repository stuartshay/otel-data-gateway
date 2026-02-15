---
name: otel-data-gateway-deployment
description: Deploy and manage the otel-data-gateway Apollo Server GraphQL BFF. Covers PR merges, Docker builds, k8s-gitops manifest updates, Argo CD sync, and live deployment validation on k8s-pi5-cluster.
---

# otel-data-gateway Deployment Workflow

This skill manages the complete deployment lifecycle of the otel-data-gateway
Apollo Server GraphQL BFF, from code merge to production validation on
k8s-pi5-cluster.

## When to Use

Use this skill when you need to:

- Merge a PR and deploy a new version of otel-data-gateway
- Update Kubernetes manifests via GitOps
- Validate a live deployment (health, version, GraphQL queries)
- Troubleshoot deployment failures (Docker build, Argo CD sync, pod issues)
- Roll back to a previous version

## Architecture Overview

```text
GitHub (stuartshay/otel-data-gateway)
  → PR merge to master
    → GitHub Actions (docker.yml)
      → Docker Hub (stuartshay/otel-data-gateway:<version>)
        → k8s-gitops manifest update (deployment.yaml)
          → Argo CD auto-sync / manual sync
            → k8s-pi5-cluster (namespace: otel-data-gateway)
              → https://gateway.lab.informationcart.com
```

**Key Components**:

- **Server**: Node.js 24 / TypeScript 5.9 / Apollo Server 5 / GraphQL 16
- **Upstream API**: otel-data-api (REST) via internal K8s service URL
- **Docker**: Multi-arch (amd64/arm64) images on Docker Hub, node:24-alpine
- **Deployment**: Kubernetes (1 replica, RollingUpdate)
- **GitOps**: k8s-gitops → Argo CD auto-sync
- **Domain**: gateway.lab.informationcart.com (MetalLB 192.168.1.100)

## Versioning Scheme

| Component    | Format                   | Example          |
| ------------ | ------------------------ | ---------------- |
| VERSION file | `major.minor`            | `1.0`            |
| Docker tag   | `major.minor.run_number` | `1.0.11`         |
| SHA tag      | `sha-<7char>`            | `sha-1fa3e07`    |
| Branch build | `major.minor.run-branch` | `1.0.12-develop` |

The `run_number` is the GitHub Actions workflow run number, auto-incremented
per workflow. Master pushes produce `VERSION.run_number` tags.

## Repository References

| Repo                           | Purpose            | Key Path                                          |
| ------------------------------ | ------------------ | ------------------------------------------------- |
| `stuartshay/otel-data-gateway` | Gateway source     | `src/`, `VERSION`, `.github/workflows/docker.yml` |
| `stuartshay/k8s-gitops`        | K8s manifests      | `apps/base/otel-data-gateway/deployment.yaml`     |
| Docker Hub                     | Container registry | `stuartshay/otel-data-gateway`                    |

## Upstream & Downstream Dependencies

### Upstream (consumed by this service)

| Dependency                     | Type     | Impact                                                   |
| ------------------------------ | -------- | -------------------------------------------------------- |
| `stuartshay/otel-data-api`     | REST API | All resolvers delegate to REST endpoints via data source |
| PostgreSQL (via otel-data-api) | Database | Data served through the upstream API                     |

### Downstream (consumes this service)

| Consumer                  | Type           | Impact                                |
| ------------------------- | -------------- | ------------------------------------- |
| `stuartshay/otel-data-ui` | React frontend | Queries GraphQL API via Apollo Client |

**Before breaking changes**: Verify that modified GraphQL types/queries are not
consumed by the UI components (`src/graphql/` queries in otel-data-ui).

## Agent-Assisted Deployment Flow

When an agent executes a deployment, it **MUST pause at every PR** for user
review before proceeding. The agent never merges PRs autonomously.

### Flow Overview

```text
1. Pre-deployment checks (rebase, lint, type-check, build, tests)
2. Commit & push to develop
3. Create PR (develop → master)
   ⏸️ PAUSE — Present PR link, CI status, and diff summary to user
   → User reviews and merges PR
4. Wait for Docker build CI to complete → determine version tag
5. k8s-gitops auto-creates version update PR via repository_dispatch
   ⏸️ PAUSE — Present auto-created PR link, CI status, and diff to user
   → User reviews and merges k8s-gitops PR
6. Validate Argo CD sync and live deployment
7. If Copilot review comments exist on any PR:
   - Analyze each comment for validity
   - Fix valid suggestions, dismiss invalid ones with rationale
   - Push fixes and reply to threads
   ⏸️ PAUSE — Present updated PR for re-review if changes were made
```

### PAUSE Point Requirements

At each ⏸️ PAUSE, the agent must present:

| Item            | Details                                        |
| --------------- | ---------------------------------------------- |
| PR link         | Full GitHub URL                                |
| Branch          | Source → target (e.g., `develop` → `master`)   |
| Changes summary | Files changed and brief description            |
| CI status       | All check names with pass/fail/pending         |
| Review status   | Approved / pending / changes requested         |
| Mergeable       | Yes/No with merge state                        |
| Blocking items  | Any unresolved conversations or failing checks |

The agent **waits for the user to confirm the merge** before proceeding to
the next step. Never assume a PR is merged — verify via API after user
confirmation.

### k8s-gitops Auto-PR Mechanism

When the Docker build completes, the CI workflow dispatches a
`repository_dispatch` event (type: `otel-data-gateway-release`) to
`stuartshay/k8s-gitops`. This triggers an automated workflow that:

1. Creates a branch `update-otel-data-gateway-<version>`
2. Runs `update-version.sh <version>` to update VERSION, deployment.yaml
3. Creates a PR to `master` with title "Update otel-data-gateway to v\<version\>"
4. CI checks and Copilot review run automatically

The agent should check for this auto-created PR rather than manually creating
one. Use: `gh pr list --repo stuartshay/k8s-gitops --state open`

## Deployment Procedure

### Step 1: Pre-Deployment Checks

Before merging any PR, verify:

```bash
# 0. Always rebase develop onto master before committing/pushing
cd /home/ubuntu/git/otel-data-gateway
git fetch origin master
git rebase origin/master
# Resolve any conflicts, then: git rebase --continue
# If rebased, push with: git push origin develop --force-with-lease

# 1. Install dependencies
npm ci

# 2. ESLint
npm run lint

# 3. TypeScript check
npm run type-check

# 4. Markdown lint
npm run lint:md

# 5. Format check
npm run format:check

# 6. Build succeeds
npm run build

# 7. Tests pass
npm test

# 8. Local server starts
npm run dev
# In another terminal:
curl -s http://localhost:4000/ \
  -H 'Content-Type: application/json' \
  -d '{"query":"{health{status,version}}"}'
```

**Checklist**:

- [ ] Rebased onto master (`git fetch origin master && git rebase origin/master`)
- [ ] ESLint clean (`npm run lint`)
- [ ] TypeScript compiles (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] VERSION file contains valid `major.minor` format
- [ ] No unencrypted secrets in code
- [ ] No hardcoded API URLs (use environment variables)

### Step 2: Merge PR to Master

```bash
# Via GitHub CLI or API
# Always use squash merge to keep clean history
gh pr merge <PR_NUMBER> --squash --repo stuartshay/otel-data-gateway
```

**Rules**:

- Never commit directly to `master` — always use PRs
- Use squash merge to maintain clean commit history
- Branch protection requires 1 approving review

#### Post-Merge: Rebase develop onto master

Squash merges create a new commit on master that doesn't exist on develop,
causing branch divergence. Always rebase develop after merging:

```bash
git checkout develop
git fetch origin master
git rebase origin/master
git push origin develop --force-with-lease
```

Skipping this causes merge conflicts on the next PR.

### Step 3: Wait for Docker Build

The merge triggers `.github/workflows/docker.yml` which:

1. Reads `VERSION` file (e.g., `1.0`)
2. Computes tag: `VERSION.run_number` (e.g., `1.0.11`)
3. Builds multi-arch image (linux/amd64, linux/arm64) using QEMU
4. Pushes to Docker Hub with tags: `<version>`, `latest`, `sha-<commit>`
5. Dispatches `otel-data-gateway-release` event to k8s-gitops

**Verification**:

```bash
# Check GitHub Actions status and get run_number via CLI (preferred)
gh run list --workflow docker.yml --repo stuartshay/otel-data-gateway --limit 3
# The run_number in the output is appended to VERSION to form the Docker tag
# e.g., run_number=11 → Docker tag 1.0.11

# Or check via browser (wait ~4-5 minutes after merge)
# https://github.com/stuartshay/otel-data-gateway/actions/workflows/docker.yml

# Fallback: scan Docker Hub if run_number is unknown
for i in $(seq 10 20); do
  result=$(docker manifest inspect stuartshay/otel-data-gateway:1.0.$i 2>&1 | head -1)
  if [[ "$result" == "{" ]]; then echo "FOUND: 1.0.$i"; fi
done

# Or verify using the merge commit SHA
docker manifest inspect stuartshay/otel-data-gateway:sha-<commit_sha_7char>

# Confirm matching digests
docker manifest inspect stuartshay/otel-data-gateway:<version> | python3 -c \
  "import sys,json; print(json.load(sys.stdin)['manifests'][0]['digest'])"
```

### Step 4: Update k8s-gitops Manifests

```bash
cd /home/ubuntu/git/k8s-gitops

# 1. Sync develop branch
git checkout develop && git fetch origin && git pull origin develop

# 2. Rebase onto master if needed (squash merges cause divergence)
git fetch origin master
git rebase origin/master

# 3. Update deployment (option A: script — recommended)
cd apps/base/otel-data-gateway
./update-version.sh <NEW_VERSION>

# 3. Update deployment (option B: manual — 3 places to update)
# In deployment.yaml, update ALL THREE occurrences:
#   - metadata.labels.app.kubernetes.io/version: "<NEW_VERSION>"
#   - spec.template.spec.containers[0].image: stuartshay/otel-data-gateway:<NEW_VERSION>
#   - spec.template.spec.containers[0].env APP_VERSION: "<NEW_VERSION>"

# 4. Commit and push
cd /home/ubuntu/git/k8s-gitops
git add apps/base/otel-data-gateway/
git commit -m "chore: Update otel-data-gateway to v<NEW_VERSION>"
git push origin develop  # or --force-with-lease if rebased

# 5. Create PR to master
gh pr create --base master --head develop \
  --title "chore: Update otel-data-gateway to v<NEW_VERSION>" \
  --repo stuartshay/k8s-gitops

# 6. Wait for CI checks AND GitHub Copilot code review before merge
# CI status checks take ~60-90 seconds
# GitHub Copilot code review takes ~5+ minutes (runs automatically)
# All Copilot review comments must be resolved before merge is allowed
gh pr merge <PR_NUMBER> --squash --repo stuartshay/k8s-gitops
```

**Critical**: The deployment.yaml has THREE version references that must ALL
be updated. The `update-version.sh` script handles this atomically.

### Step 5: Argo CD Sync

After merging to k8s-gitops master:

```bash
# Option A: Wait for auto-sync (up to 3 minutes)

# Option B: Force sync via CLI
kubectl config set-context --current --namespace=argocd

# Hard refresh to detect new commit
argocd app get apps --core --hard-refresh

# If OutOfSync, trigger sync
argocd app sync apps --core --timeout 120

# If sync is stuck ("another operation in progress")
argocd app terminate-op apps --core
sleep 5
argocd app sync apps --core --force --timeout 180
```

**Verify rollout**:

```bash
kubectl rollout status deployment/otel-data-gateway -n otel-data-gateway --timeout=120s
```

### Step 6: Live Deployment Validation

Run the full validation checklist:

```bash
# 1. Health check — proxies to upstream otel-data-api
curl -s https://gateway.lab.informationcart.com/ \
  -H 'Content-Type: application/json' \
  -d '{"query":"{health{status,version}}"}' | python3 -m json.tool
# Expected: {"data":{"health":{"status":"healthy","version":"<otel-data-api-version>"}}}
# Note: version is the upstream otel-data-api version, not the gateway version

# 2. Ready check — includes database connectivity via upstream
curl -s https://gateway.lab.informationcart.com/ \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ready{status,database,version}}"}' | python3 -m json.tool

# 3. Verify gateway's own version via kubectl
kubectl exec -n otel-data-gateway \
  $(kubectl get pods -n otel-data-gateway -o jsonpath='{.items[0].metadata.name}') \
  -- printenv APP_VERSION
# Expected: <NEW_VERSION>

# 4. GraphQL query functional — locations
curl -s https://gateway.lab.informationcart.com/ \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ locations(limit: 1) { items { device_id latitude longitude } totalCount } }"}' \
  | python3 -m json.tool | head -20

# 5. GraphQL query functional — garmin activities
curl -s https://gateway.lab.informationcart.com/ \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ garminActivities(limit: 1) { items { activityId activityName } totalCount } }"}' \
  | python3 -m json.tool | head -20

# 6. Kubernetes pod status
kubectl get pods -n otel-data-gateway -o wide
kubectl get deployment otel-data-gateway -n otel-data-gateway \
  -o jsonpath='{.spec.template.spec.containers[0].image}'
```

**Important**: The gateway's `health` query proxies to the upstream
otel-data-api health endpoint. The `version` field in the health response is
the otel-data-api version, not the gateway version. Use `APP_VERSION` env var
via kubectl to verify the gateway's own deployed version.

## Implementation Checks

### Pre-Merge Checklist

| Check               | Command              | Expected                    |
| ------------------- | -------------------- | --------------------------- |
| ESLint              | `npm run lint`       | No errors                   |
| TypeScript          | `npm run type-check` | No errors                   |
| Build               | `npm run build`      | Compiles to dist/           |
| Tests               | `npm test`           | All passed                  |
| VERSION file format | `cat VERSION`        | `major.minor` (e.g., `1.0`) |
| No secrets          | `git diff --cached`  | No credentials              |

### Post-Build Checklist

| Check               | Command                                                      | Expected       |
| ------------------- | ------------------------------------------------------------ | -------------- |
| Docker image exists | `docker manifest inspect stuartshay/otel-data-gateway:<ver>` | JSON manifest  |
| Multi-arch          | Check manifest platforms                                     | amd64 + arm64  |
| SHA tag matches     | Compare digests of version and SHA tags                      | Same digest    |
| Latest tag updated  | `docker manifest inspect ...latest`                          | Updated digest |

### Post-Deploy Checklist

| Check          | Command                                                 | Expected               |
| -------------- | ------------------------------------------------------- | ---------------------- |
| Pod running    | `kubectl get pods -n otel-data-gateway`                 | 1/1 Running            |
| Correct image  | `kubectl get deploy ... -o jsonpath='{..image}'`        | New version            |
| APP_VERSION    | `kubectl exec ... -- printenv APP_VERSION`              | New version            |
| Health query   | `curl ... '{"query":"{health{status}}"}'`               | `{"status":"healthy"}` |
| Ready query    | `curl ... '{"query":"{ready{status}}"}'`                | `{"status":"ready"}`   |
| Data query     | `curl ... '{"query":"{ locations(limit:1) { ... } }"}'` | JSON with items        |
| No restarts    | `kubectl get pods`                                      | RESTARTS = 0           |
| Argo CD synced | `argocd app get apps --core`                            | Synced, Healthy        |

## Rollback Procedure

If a deployment has issues:

```bash
# 1. Find last working version
cd /home/ubuntu/git/k8s-gitops
git log --oneline apps/base/otel-data-gateway/VERSION | head -5

# 2. Update to previous version
cd apps/base/otel-data-gateway
./update-version.sh <PREVIOUS_VERSION>

# 3. Commit and push directly to develop, then PR to master
cd /home/ubuntu/git/k8s-gitops
git add -A
git commit -m "revert: Rollback otel-data-gateway to v<PREVIOUS_VERSION>"
git push origin develop

# 4. Create and merge PR
gh pr create --base master --title "revert: Rollback otel-data-gateway"
# Wait for CI, then merge

# 5. Force Argo CD sync
kubectl config set-context --current --namespace=argocd
argocd app sync apps --core --force

# 6. Verify rollback
kubectl rollout status deployment/otel-data-gateway -n otel-data-gateway
curl -s https://gateway.lab.informationcart.com/ \
  -H 'Content-Type: application/json' \
  -d '{"query":"{health{status}}"}' | python3 -m json.tool
```

## Troubleshooting

### Docker Build Fails

**Check GitHub Actions**:
`https://github.com/stuartshay/otel-data-gateway/actions/workflows/docker.yml`

**Common causes**:

- VERSION file missing or wrong format (must be `major.minor`)
- Docker Hub credentials expired (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`)
- TypeScript build error (`npm run build` fails)
- npm dependency resolution failure

### Argo CD Stuck

```bash
# Check for stuck operations
argocd app get apps --core | grep -E 'Status|Operation'

# Terminate stuck operation
argocd app terminate-op apps --core

# Force sync after termination
sleep 5
argocd app sync apps --core --force --timeout 180
```

### Pod CrashLoopBackOff

```bash
# Check logs
kubectl logs -n otel-data-gateway -l app.kubernetes.io/name=otel-data-gateway --tail=50

# Check events
kubectl describe pod -n otel-data-gateway -l app.kubernetes.io/name=otel-data-gateway

# Common causes:
# - Upstream otel-data-api unreachable (service URL misconfigured in ConfigMap)
# - Missing environment variables (OTEL_DATA_API_URL, PORT, NODE_ENV)
# - Node.js runtime error (check dist/ build output)
```

### ImagePullBackOff

```bash
# Verify image exists
docker manifest inspect stuartshay/otel-data-gateway:<version>

# Check pull secret
kubectl get secret dockerhub-registry -n otel-data-gateway

# Check events
kubectl describe pod -n otel-data-gateway -l app.kubernetes.io/name=otel-data-gateway
```

### GraphQL Queries Return Errors

```bash
# Check if upstream otel-data-api is reachable from the gateway pod
kubectl exec -n otel-data-gateway \
  $(kubectl get pods -n otel-data-gateway -o jsonpath='{.items[0].metadata.name}') \
  -- wget -qO- http://otel-data-api.otel-data-api.svc.cluster.local:80/health

# Verify ConfigMap has correct API URL
kubectl get configmap otel-data-gateway-config -n otel-data-gateway -o yaml
# Expected OTEL_DATA_API_URL: http://otel-data-api.otel-data-api.svc.cluster.local:80
```

### otel-data-gateway Branch Protection Rules

The `master` branch on `stuartshay/otel-data-gateway` enforces these protections:

| Rule                             | Setting               |
| -------------------------------- | --------------------- |
| Required status checks           | None (not configured) |
| Required approving reviews       | 1                     |
| Dismiss stale reviews            | Yes                   |
| Required conversation resolution | Yes                   |
| Enforce admins                   | Yes                   |
| Allow force pushes               | No                    |
| Allow deletions                  | No                    |

Since `enforce_admins` is enabled, the approval requirement
applies to all users including admins. All PRs require manual review.

To inspect current settings:

```bash
gh api repos/stuartshay/otel-data-gateway/branches/master/protection \
  | python3 -m json.tool
```

### k8s-gitops Branch Protection Rules

The `master` branch on `stuartshay/k8s-gitops` enforces these protections:

| Rule                             | Setting                                                     |
| -------------------------------- | ----------------------------------------------------------- |
| Required status checks           | Pre-commit, K8s Schema, K8s Best Practices, Kustomize Build |
| Strict status checks             | Yes (branch must be up-to-date)                             |
| Required approving reviews       | 1                                                           |
| GitHub Copilot code review       | **Yes** — auto review on every PR (~5+ min)                 |
| Dismiss stale reviews            | No                                                          |
| Required conversation resolution | **Yes** — all comments must be resolved                     |
| Enforce admins                   | Yes                                                         |
| Allow force pushes               | No                                                          |
| Allow deletions                  | No                                                          |

**Implications for deployments**:

- PRs must pass all 4 CI checks before merge is enabled
- At least 1 approving review is required
- **GitHub Copilot code review** runs automatically on every PR (~5+ minutes)
  — Copilot review comments must be resolved before merge
- All review comments/conversations must be marked resolved
- Even repo admins are subject to these rules (`enforce_admins: true`)
- Branch must be up-to-date with master (strict mode) — may require rebasing

To inspect current settings:

```bash
gh api repos/stuartshay/k8s-gitops/branches/master/protection \
  | python3 -m json.tool
```

### k8s-gitops PR Merge Conflict

The develop branch may diverge from master due to squash merges. Fix with:

```bash
cd /home/ubuntu/git/k8s-gitops
git checkout develop
git fetch origin master
git rebase origin/master
git push origin develop --force-with-lease
```

## Kubernetes Resources

| Resource       | Namespace         | Details                          |
| -------------- | ----------------- | -------------------------------- |
| Deployment     | otel-data-gateway | 1 replica, RollingUpdate         |
| Service        | otel-data-gateway | ClusterIP :80 → :4000            |
| Ingress        | otel-data-gateway | gateway.lab.informationcart.com  |
| ConfigMap      | otel-data-gateway | otel-data-gateway-config         |
| SealedSecret   | otel-data-gateway | dockerhub-registry               |
| TLS Secret     | otel-data-gateway | otel-data-gateway-tls (cert-mgr) |
| ServiceAccount | otel-data-gateway | otel-data-gateway                |

### ConfigMap Values

```yaml
OTEL_DATA_API_URL: 'http://otel-data-api.otel-data-api.svc.cluster.local:80'
NODE_ENV: 'production'
PORT: '4000'
```

## Quick Reference Commands

```bash
# Check deployed version
kubectl get deployment otel-data-gateway -n otel-data-gateway \
  -o jsonpath='{.spec.template.spec.containers[0].image}'

# Check APP_VERSION env
kubectl exec -n otel-data-gateway \
  $(kubectl get pods -n otel-data-gateway -o jsonpath='{.items[0].metadata.name}') \
  -- printenv APP_VERSION

# View logs
kubectl logs -n otel-data-gateway -l app.kubernetes.io/name=otel-data-gateway -f

# Restart deployment (force re-pull)
kubectl rollout restart deployment otel-data-gateway -n otel-data-gateway

# Check Argo CD sync status
kubectl config set-context --current --namespace=argocd
argocd app get apps --core | grep -E 'Sync|Health'

# Full validation one-liner
curl -s https://gateway.lab.informationcart.com/ \
  -H 'Content-Type: application/json' \
  -d '{"query":"{health{status,version}}"}' | python3 -m json.tool

# Find Docker image version
docker manifest inspect stuartshay/otel-data-gateway:<tag> 2>&1 | head -3
```

## Version History

| Version | Date       | Changes                                                       |
| ------- | ---------- | ------------------------------------------------------------- |
| 1.0.11  | 2026-02-13 | Docker workflow alignment, version scheme, @types/node update |
