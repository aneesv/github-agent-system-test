# CLAUDE.md — Agent System Guidelines

This repository uses a multi-agent automation system orchestrated via GitHub Issues.
All agents MUST read and follow these guidelines.

## Architecture

Six specialized agents, each with a single responsibility:

| Agent | Role | Workflow |
|-------|------|----------|
| PM | Orchestration, triage, plan review, release | pm-intake.yml, pm-plan-review.yml, pm-release.yml |
| Research | Codebase exploration, findings documentation | research-agent.yml |
| Planner | Implementation plan + dependency graph | planner-agent.yml |
| Scheduler | Dependency evaluation, phase activation | scheduler.yml (shell, not Claude) |
| Dev | Code implementation, one phase at a time | dev-agent.yml |
| Review | Code review, quality gates | review-agent.yml |
| Human | Merges release PRs, handles `needs:human` | — |

## Communication Rules

1. ALL inter-agent communication happens via GitHub Issues and PRs — no external channels
2. ALWAYS use structured HTML comment blocks (see below) for machine-readable data
3. NEVER delete or overwrite another agent's comment — only append new comments
4. Reference issues and PRs by number (`#N`) — never by title alone
5. Every sub-issue MUST have a `<!-- SUB_ISSUE_META -->` block in its body
6. Every agent-created PR MUST have a `<!-- PR_META -->` block in its body

## Structured Comment Blocks

### ORCHESTRATION_STATE (on parent issue, managed by PM)
```
<!-- ORCHESTRATION_STATE
flow_id: <uuid>
status: <current-stage>
created: <timestamp>
phases: <count or pending>
sub_issues: [#N, #N, ...]
-->
```

### SUB_ISSUE_META (on every sub-issue body)
```
<!-- SUB_ISSUE_META
flow_id: <uuid>
parent_issue: #<number>
phase: <N>
plan_branch: plan/issue-<number>
depends_on: [#<number>, ...]
execution: serial|parallel
scope: <description>
done_criteria: <what done means>
test_requirements: <verification>
-->
```

### RESEARCH_OUTPUT (comment on research sub-issue)
```
<!-- RESEARCH_OUTPUT
flow_id: <uuid>
status: complete
-->
...findings...
<!-- /RESEARCH_OUTPUT -->
```

### PLAN_OUTPUT (comment on plan sub-issue)
```
<!-- PLAN_OUTPUT
flow_id: <uuid>
status: draft|approved
phase_count: <N>
-->
...plan with dependency graph...
<!-- /PLAN_OUTPUT -->
```

### PR_META (on agent-created PR body)
```
<!-- PR_META
flow_id: <uuid>
phase: <N>
sub_issue: #<number>
parent_issue: #<number>
-->
```

## Label Protocol

### Who can manage which labels:

| Label Category | Managed By |
|---------------|------------|
| `flow:*` on parent | PM agent only |
| `agent/*` on sub-issues | PM agent (creates), agents (self-remove on completion) |
| `lock:*` | Agent that acquires it (must release on completion) |
| `needs:human` | Any agent (add), human only (remove) |
| `type/*`, `priority/*` | PM agent |
| `phase/*` | PM agent |
| `risk:*` | PM agent |

### Rules:
- NEVER remove a `flow:*` label you didn't add
- ALWAYS remove `lock:*` labels when your work is done
- Adding `needs:human` MUST include a comment explaining why

## Sub-Issue Protocol

- Title prefixes: `[Research]`, `[Plan]`, `[Phase N]`
- Body MUST contain `<!-- SUB_ISSUE_META -->` block
- Sub-issues are closed by the agent assigned to them
- NEVER reopen a sub-issue unless PM explicitly instructs it

## Commit Message Protocol

ALL commits MUST follow Conventional Commits (required for release-please):

```
feat(scope): description    — new feature (minor bump)
fix(scope): description     — bug fix (patch bump)
docs(scope): description    — documentation only
chore(scope): description   — maintenance
refactor(scope): description — no behavior change
test(scope): description    — tests
feat(scope)!: description   — breaking change (major bump)
```

## Git Workflow

- Branch naming:
  - `plan/issue-<N>` — feature integration branch (e.g., `plan/issue-42`), created by PM on plan approval
  - `phase/<N>-<slug>` — per-phase implementation branch (e.g., `phase/1-add-auth`), branched from `plan/issue-<N>`
- Phase PRs target `plan/issue-<N>` (NOT `main`) — review agent merges them into the plan branch
- Final plan PR: `plan/issue-<N>` → `main`, created by PM release, merged by human
- NEVER commit directly to main or to the plan branch
- NEVER force push
- ALL phase PRs must link to a sub-issue (`Closes #N`)
- One PR per sub-issue — no combining

## When to Escalate

Add `flow:blocked` + `needs:human` and comment on parent issue when:
- Task is technically impossible as specified
- Required external resource is unavailable
- Plan has unresolvable conflicts
- Required secret or credential is missing
- Two consecutive failures on the same stage

## Idempotency

- Check for existing `flow_id` artifacts before creating duplicates
- Check for existing sub-issues before creating new ones
- Check for existing PRs before creating new branches
