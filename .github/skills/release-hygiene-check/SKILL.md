---
name: release-hygiene-check
description: Run a repeatable post-deploy hygiene check for otel-data-gateway. Validates issue acceptance criteria, clears stale blocked status, and confirms upstream types update context before setting Done.
---

# Release Hygiene Check (otel-data-gateway)

Use this skill whenever a gateway code PR and deployment PR have merged, or
when a gateway PR is auto-created from `@stuartshay/otel-data-types`.

## Required Outputs

- Final acceptance-validation comment on the linked issue
- Evidence links for each acceptance criterion
- Confirmation that stale "blocked" validation state is superseded
- Types update PR version/merge status documented when relevant
- Project item moved to `Done` only after all items above are complete

## Workflow

### 1. Collect Linked Artifacts

Identify and record:

- Implementation issue (`otel-data-gateway`)
- Code PR (`otel-data-gateway`)
- Deployment PR (`k8s-gitops`)
- Types update PR context (if auto-created from publish event)

Suggested commands:

```bash
gh issue view <issue_number> --repo stuartshay/otel-data-gateway \
  --json number,title,state,body,comments,projectItems
gh pr view <pr_number> --repo stuartshay/otel-data-gateway \
  --json number,title,state,mergedAt,url
gh pr view <pr_number> --repo stuartshay/k8s-gitops \
  --json number,title,state,mergedAt,url
```

### 2. Validate Deployed Behavior

Validate against the live cluster/service:

```bash
curl -s https://gateway.lab.informationcart.com/ \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ health { status version } }"}'
```

Add issue-specific GraphQL queries that match each acceptance criterion.

### 3. Validate Each Acceptance Criterion

Create a criterion-by-criterion mapping from issue text to evidence:

- `PASS`: criterion is satisfied in deployed environment
- `FAIL`: criterion not met; open follow-up and do not move to `Done`

If issue body checkboxes are not updated, post a final checklist comment with
all criteria statuses.

### 4. Validate Types PR Context (When Applicable)

For auto-created dependency PRs:

```bash
gh pr list --repo stuartshay/otel-data-gateway --state all \
  --search "Update @stuartshay/otel-data-types in:title" --limit 5
```

Confirm:

- Version bump matches the published package
- Required checks passed
- Merge status or blocker is documented in the linked issue/PR

### 5. Post Final Superseding Comment

If earlier comments reported blocked validation, post a new final comment that
supersedes that state and links the resolving PR/run.

Template:

```text
Final acceptance validation (YYYY-MM-DD):
- Criterion 1: PASS — <evidence link/command output>
- Criterion 2: PASS — <evidence link/command output>
- Deployment PR: <link>
- Types PR context (if applicable): <link>
- Prior blocker status: Resolved (<link>)
```

### 6. Project Board Hygiene

Move the project item to `Done` only after Step 5 is posted and all criteria
pass.

## Completion Checklist

- [ ] Acceptance criteria validated in deployed environment
- [ ] Final validation comment posted with evidence links
- [ ] Prior blocked status explicitly superseded
- [ ] Types update PR context documented (if applicable)
- [ ] Project item status updated after evidence is posted
