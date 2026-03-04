# GitHub Agent System

A multi-agent automation system that takes GitHub issues from idea to release using Claude-powered agents, GitHub Actions, and a label-based state machine.

## How It Works

1. Create an issue using the **Feature Request** template
2. Add the `agent:run` label
3. Agents handle everything — research, plan, implement, review, release

```
Issue + agent:run
  │
  ▼
PM Agent (triage)
  → classifies issue, generates flow_id
  → creates [Research] sub-issue
  │
  ▼
Research Agent
  → explores codebase (files, patterns, architecture)
  → looks up latest library versions (npm view, pip index, WebSearch)
  → checks official docs and changelogs
  → posts RESEARCH_OUTPUT findings
  → creates [Plan] sub-issue
  │
  ▼
Planner Agent
  → synthesizes requirements + research into phased plan
  → produces dependency graph (which phases can run in parallel)
  → posts PLAN_OUTPUT
  │
  ▼
PM Agent (plan review)
  → evaluates completeness, feasibility, phase granularity
  → if changes needed: adds needs:revision → planner revises → loop
  → if approved: creates plan/issue-N branch, creates [Phase N] sub-issues
  │
  ▼
Scheduler (shell, not Claude)
  → evaluates dependency graph
  → activates all runnable phases in parallel (respects depends_on)
  → risk:high label forces serial execution
  │
  ▼ (per phase, potentially parallel)
Dev Agent
  → branches from plan/issue-N
  → implements exactly one phase
  → creates PR targeting plan/issue-N
  │
  ▼
Review Agent
  → reviews diff against acceptance criteria
  → requests changes if needed (dev pushes fixes, review re-triggers)
  → approves + merges PR into plan/issue-N with --merge
  → closes sub-issue manually
  │
  ▼ (scheduler fires on each sub-issue close)
  → if more phases ready: activates next runnable phases
  → if all phases done: adds flow:ready-release
  │
  ▼
PM Agent (release)
  → verifies all sub-issues closed, all PRs merged into plan branch
  → creates plan/issue-N → main PR
  → adds needs:human
  │
  ▼ Human merges plan PR
  │
  ▼
Release Please
  → detects conventional commits, creates release PR + changelog
  │
  ▼ Human merges release PR
  │
  ▼
release-human-gate.yml
  → validates human merge, adds flow:released, closes parent issue
```

## Branch Model

Each feature lives on its own integration branch until fully complete:

```
main ──────────────────────────────────────────────────► main
      │                                       ▲
      │ PM creates plan/issue-N               │ human merges plan PR
      ▼                                       │
plan/issue-N ──[phase/1-slug]──[phase/2-slug]─┤
                  ▲                ▲          │
                  │ dev creates    │          └── release-please fires
                  │ branches from  │              human merges release PR
                  │ plan branch    │              parent issue closed
```

Phase PRs merge into the plan branch (not main). Main stays clean until an entire feature is complete.

## Agents

| Agent | Workflow | Role |
|-------|----------|------|
| PM | `pm-intake.yml`, `pm-plan-review.yml`, `pm-release.yml` | Orchestration, triage, plan review, release |
| Research | `research-agent.yml` | Codebase + web research, library version discovery |
| Planner | `planner-agent.yml` | Phased implementation plan + dependency graph |
| Scheduler | `scheduler.yml` | Dependency-aware parallel phase activation (shell, not Claude) |
| Dev | `dev-agent.yml` | Code implementation, one PR per phase |
| Review | `review-agent.yml` | Code review with iterative feedback loop |

## Labels

### Flow State (on parent issue)
```
flow:triage → flow:research → flow:planning → flow:pm-review
  → flow:planned → flow:phase-N → flow:implementing → flow:ready-release → flow:released
```

### Control Labels
| Label | Meaning |
|-------|---------|
| `agent:run` | Intake trigger — add to start the system |
| `needs:human` | Requires human intervention |
| `needs:revision` | PM requested plan revision (on plan sub-issue) |
| `flow:blocked` | Manually or automatically blocked |
| `risk:high` | Forces serial phase execution |
| `lock:<stage>` | Concurrency lock (added/removed by agents) |

### Type / Priority / Phase
`type/feature`, `type/bug`, `type/enhancement`, `type/docs`
`priority/critical`, `priority/high`, `priority/medium`, `priority/low`
`phase/1`, `phase/2`, … (on phase sub-issues)

## Commands

Comment on any issue with @claude:

| Command | Effect |
|---------|--------|
| `/agent-run` | Start the agent system on this issue |
| `/agent-status` | Get current pipeline status |
| `/agent-retry <stage>` | Retry a failed stage |
| `/agent-replan` | Restart from research phase |
| `/agent-block <reason>` | Manually block pipeline |
| `/agent-unblock` | Resume a blocked pipeline |

## Setup

### Required Secret
`CLAUDE_CODE_OAUTH_TOKEN` — OAuth token for Claude Code (in repository Settings → Secrets)

### Required Labels
Create these labels in your repo before running:

```bash
# Flow labels
gh label create "agent:run"          --color "0075ca"
gh label create "flow:triage"        --color "e4e669"
gh label create "flow:research"      --color "e4e669"
gh label create "flow:planning"      --color "e4e669"
gh label create "flow:pm-review"     --color "e4e669"
gh label create "flow:planned"       --color "e4e669"
gh label create "flow:implementing"  --color "fbca04"
gh label create "flow:ready-release" --color "0e8a16"
gh label create "flow:released"      --color "0e8a16"
gh label create "flow:blocked"       --color "d93f0b"
gh label create "flow:failed"        --color "d93f0b"

# Control labels
gh label create "needs:human"        --color "d93f0b"
gh label create "needs:revision"     --color "0075ca"
gh label create "risk:high"          --color "d93f0b"

# Agent labels
gh label create "agent/research"     --color "5319e7"
gh label create "agent/plan"         --color "5319e7"
gh label create "agent/dev"          --color "5319e7"

# Type labels
gh label create "type/feature"       --color "a2eeef"
gh label create "type/bug"           --color "d73a4a"
gh label create "type/enhancement"   --color "84b6eb"
gh label create "type/docs"          --color "0075ca"

# Priority labels
gh label create "priority/critical"  --color "d93f0b"
gh label create "priority/high"      --color "e11d48"
gh label create "priority/medium"    --color "fbca04"
gh label create "priority/low"       --color "c2e0c6"

# Phase labels (create as needed)
gh label create "phase/1"            --color "5319e7"
gh label create "phase/2"            --color "5319e7"
gh label create "phase/3"            --color "5319e7"
```

### Required Settings
In repository **Settings → Actions → General**:
- Enable: "Allow GitHub Actions to create and approve pull requests"
