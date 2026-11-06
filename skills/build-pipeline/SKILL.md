---
name: build-pipeline
description: Plan which NPC Union agents run in which order to take a game idea from concept to release, as a plan the Steward can follow.
owner: shared
argument-hint: "[game idea]"
---

# Build pipeline

## Inputs

A game idea. Ask for engine, platform, and team size only if they are missing and change the plan; otherwise assume and say so.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/catalog/agents.json` and, if present, `${CLAUDE_PLUGIN_ROOT}/docs/PIPELINE.md`.
2. If the user has a team (`node ${CLAUDE_PLUGIN_ROOT}/scripts/team.mjs show`), build the pipeline from team members only and list gaps (phases nobody on the team covers) at the end as "needs your OK".
3. Pick the knowledge experts first: one genre expert, one art-style expert, and any domain expert (`knowledge/...`).
4. Lay out phases: concept, pre-production, prototype, vertical slice, production, alpha, beta, release, live. Skip phases that do not apply and say why.
5. For each phase list agents in order, with runtime, input, and output handed to the next agent.
6. Add a gate at each phase end owned by `production-lead`.
7. Save to `production/pipeline-<slug>.md` in the user's project if they want a file.

## Output

```
# Pipeline: <idea>
Assumptions: ...
## Phase: <name>
| Step | Agent (id) | Runtime | Takes | Hands to next |
Gate: <exit criteria> (production-lead)
```

## Done when

- [ ] Every agent named exists in the catalog.
- [ ] Every step names what it hands to the next.
