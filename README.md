# GitHub Agent System

A multi-agent automation system that takes feature requests from idea to release using GitHub Issues, PRs, and Actions.

## How It Works

1. Create an issue using the Feature Request template
2. Add the `agent:run` label
3. Agents handle the rest:

```
Issue Created + agent:run
  → PM Agent: triage, classify, label
    → Research Agent: explore codebase, document findings
      → Planner Agent: create phased implementation plan
  → PM Agent: review plan (approve or request changes)
  → Scheduler: activate phases based on dependency graph
    → Dev Agent: implement each phase (one PR per phase)
    → Review Agent: review PR, iterate until approved
  → PM Agent: verify all phases, trigger release
  → Release Please: create release PR
  → Human: merge release PR
```

## Agents

| Agent | Workflow | Role |
|-------|----------|------|
| PM | `pm-intake.yml`, `pm-plan-review.yml`, `pm-release.yml` | Orchestration, triage, plan review, release |
| Research | `research-agent.yml` | Codebase exploration |
| Planner | `planner-agent.yml` | Implementation plan + dependency graph |
| Scheduler | `scheduler.yml` | Dependency-aware phase activation |
| Dev | `dev-agent.yml` | Code implementation (one PR per sub-issue) |
| Review | `review-agent.yml` | Code review with iterative feedback |

## Commands

Comment on any issue to trigger:

| Command | Effect |
|---------|--------|
| `/agent-run` | Start the agent system on this issue |
| `/agent-status` | Get current pipeline status |
| `/agent-retry <stage>` | Retry a failed stage |
| `/agent-replan` | Restart from research |
| `/agent-block <reason>` | Manually block pipeline |
| `/agent-unblock` | Resume blocked pipeline |

## Labels

### Flow State
`flow:queued` → `flow:triage` → `flow:research` → `flow:planning` → `flow:pm-review` → `flow:planned` → `flow:phase-N` → `flow:ready-release` → `flow:released`

### Control
- `agent:run` — Intake trigger
- `needs:human` — Requires human intervention
- `risk:high` — Forces serial execution

## Setup

Requires `CLAUDE_CODE_OAUTH_TOKEN` secret in repository settings.
