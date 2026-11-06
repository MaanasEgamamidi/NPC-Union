---
title: Effort levels and model fit
tags: [leadership, budget, effort, reasoning, models, claude, codex]
sources:
  - https://code.claude.com/docs/en/model-config
  - https://code.claude.com/docs/en/sub-agents
  - https://code.claude.com/docs/en/prompt-caching
  - https://learn.chatgpt.com/docs/config-file/config-reference
last_verified: 2026-11-05
---

How to set effort and model per task. The settings are facts from the linked pages, read on 2026-11-05. The "good fit" rules at the end are the budget keeper's own judgment, not vendor guidance, and are labelled that way.

## Claude Code effort settings

- Five levels: `low`, `medium`, `high`, `xhigh`, `max`. Fable 5.1, Fable 5, Opus 5.5, Sonnet 5.5, Haiku 5.5, Opus 5, Sonnet 5, Opus 4.8 and Opus 4.7 support all five. Opus 4.6 and Sonnet 4.6 support `low`, `medium`, `high` and `max`. An unsupported level falls back to the highest supported level at or below it.
- Defaults: `medium` on Opus 5.5, Sonnet 5.5 and Haiku 5.5, `xhigh` on Opus 4.7, and `high` on every other model that supports effort.
- Ways to set it: `/effort <level>`, the `/model` picker, `claude --effort <level>`, the `CLAUDE_CODE_EFFORT_LEVEL` environment variable, the `effortLevel` setting, or an `effort` field in a skill or subagent file. `effortLevel` accepts `low`, `medium`, `high` and `xhigh`, not `max`.
- Resolution order: the environment variable, then a level picked in the session, then `--effort`, then saved settings, then the model default. A subagent's or skill's `effort` frontmatter is overridden by the environment variable.
- `max` applies to the current session only unless set through the environment variable.
- In `/effort`, `Enter` saves the level as your default and `s` applies it to this session only (v2.1.257 or later).
- A subagent's `effort` applies only while it runs. A skill's `effort` applies until the end of the turn it runs in.

## Models

- On the Anthropic API, `opus` resolves to Opus 5.5, `sonnet` to Sonnet 5.5, `haiku` to Haiku 5.5, and `fable` to Fable 5.1. Other providers can resolve to earlier versions.
- A subagent's model comes from, in order: the per-call `model` parameter (aliases only), the file's `model` field, `CLAUDE_CODE_SUBAGENT_MODEL`, then the main conversation's model. `inherit` means the main model.
- Subagent requests count toward the same usage limits as the main conversation.

## Cache cost of changing your mind

- A model switch rebuilds the whole cache. An effort change does too on most models, but on Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1 with an API key or a Claude subscription the cache stays intact. So change effort freely on those, and change model only at a task boundary.

## Codex

- `model_reasoning_effort` takes a level that the chosen model and client support. `plan_mode_reasoning_effort` sets it for Plan mode. The repo's `reasoning` field maps to the first one and only uses `low`, `medium` and `high`.
- Fast mode costs 2.5x the included usage. It buys speed, not quality, so use it only when someone is waiting.

## Good-fit rules (budget keeper's judgment)

These are starting points. Raise the level when a first attempt fails or the task has no easy check, and lower it when output is routine and easy to verify.

| Task shape | Effort | Model |
|---|---|---|
| Rename, reformat, boilerplate, lookups, file listing | low | haiku or sonnet |
| Routine code or copy with a clear spec and a test or checklist | medium | sonnet |
| Multi-file change, debugging with a known repro, a design review | high | sonnet, or opus if sonnet missed once |
| Ambiguous architecture, security review, a subtle bug nobody can reproduce | xhigh | opus or fable |
| Final check of work that is expensive or hard to reverse | max for that one turn | strongest available |

- Over-setting looks like: `max` on a rename, Opus for file search, a long plan for a one-line fix.
- Under-setting looks like: `low` on a bug that needs hypotheses, a haiku subagent asked to make a judgment call, rework after a wrong first pass. Rework costs more than the saving, so count it.
- A cheap tier is safe when the output can be checked mechanically (tests, validators, diffs). It is not safe for facts that nobody will re-check.
