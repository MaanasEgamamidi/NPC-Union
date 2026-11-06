---
name: effort-fit-check
description: Rates the model and effort level for each task in a plan as over, right, or under, with a reason and the setting to use. Use before a batch of tasks or when output feels wasteful or shallow.
owner: budget-keeper
disable-model-invocation: true
argument-hint: "[task list, or a plan from the Steward]"
---

# Effort fit check

A second opinion on model and effort per task. The owner of the task still decides, and the user can overrule any row.

## Inputs

- The task list, each task with its current model and effort if set. For NPC Union agents, read `model`, `runtime` and `reasoning` from `${CLAUDE_PLUGIN_ROOT}/catalog/agents.json`.
- For each task: how easy the result is to check (a test, a validator, a diff, or nothing), and how costly a wrong answer is.
- If those are missing, assume checkable and cheap to redo, say so, and continue.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/leadership/effort-and-model-fit.md` for the level names, defaults and the good-fit table.
2. Place each task on the table by its shape, not by its title. A "quick fix" that nobody can reproduce is a high-effort task.
3. Compare the current setting with the table:
   - Over: effort or model above what the task needs, and the result is easy to verify.
   - Under: effort or model below what the task needs, or a judgment call on a cheap tier.
   - Right: matches, or within one step.
4. Weigh rework. A task likely to need a second pass at low effort costs more than one pass at high effort.
5. Check availability. Confirm the level exists on the model (Opus 4.6 and Sonnet 4.6 have no `xhigh`), and that `effortLevel` cannot be `max`. For Codex, use only `low`, `medium` or `high` in `reasoning`.
6. Note the cache cost of changes. A model switch rebuilds the cache. An effort change does on most models but not on Opus 5.5, Sonnet 5.5, Haiku 5.5 or Fable 5.1 on a subscription or API key. Batch changes at task boundaries.
7. Give the exact way to apply each change: `/effort <level>`, `--effort`, an `effort` field in a subagent or skill file, or `run-agent.mjs` with the agent's `reasoning`.
8. Flag the tasks where the user should decide, because the right level depends on stakes you cannot see.

## Output

```
## Effort fit: <batch>
| Task | Now | Suggested | Verdict | Why | Apply with |
|------|-----|-----------|---------|-----|------------|
Rework risk: <tasks that may need a second pass>
Your call: <tasks where stakes decide>
```

## Done when

- [ ] Every task has a verdict and a reason tied to its shape.
- [ ] Each suggested level exists on the suggested model.
- [ ] No row lowers a level on a task that cannot be checked, without being flagged "your call".
- [ ] Cache cost of any model switch is mentioned.
