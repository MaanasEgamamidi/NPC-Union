---
title: Claude Code usage limits and token savings
tags: [leadership, budget, claude, limits, tokens, cache, usage]
sources:
  - https://code.claude.com/docs/en/costs
  - https://code.claude.com/docs/en/prompt-caching
  - https://code.claude.com/docs/en/model-config
  - https://code.claude.com/docs/en/sub-agents
  - https://support.claude.com/en/articles/15910845
last_verified: 2026-11-05
---

Facts the budget keeper relies on for Claude Code. Each line was read from the linked page on 2026-11-05. Limits and prices change, so re-open the source before quoting a number.

## What the limits are

- Subscription plans (Pro, Max, Ultra, Team, Enterprise) have two limits: a rolling 5-hour window and a weekly window. The support article gives no absolute figures for either. Source: https://support.claude.com/en/articles/15910845.
- Weekly Claude Code limits were 50% higher from 2026-05-13 to 2026-09-13, then settled at 25% above the pre-promotion level from 2026-09-14 on Pro, Max, Ultra, Team and seat-based Enterprise. The 5-hour limit was not changed by the promotion.
- "You've hit your session limit" and "weekly limit" apply across all models, so `/model` does not restore access. The model-specific "Opus limit" or "Sonnet limit" messages do: switching to another model family keeps you working. Source: https://code.claude.com/docs/en/costs.
- `/usage-credits` opens the claude.ai page for usage credits, which pay for work past the plan allowance. Claude Code v2.1.234 or later can wait for the reset and continue the interrupted task automatically.
- Third-party blog posts quote per-plan message counts. Treat those as UNVERIFIED, since Anthropic does not publish them.

## How to read current usage

- `/usage` shows the plan bars, a breakdown of recent usage by skill, subagent, plugin and MCP server, and recommendations. The attribution is computed from local history on that machine, so other devices and claude.ai are not included.
- A recommendation row that ends in `/effort <level>` can be applied with `f` in `/usage` (v2.1.305 or later). Rows that say `run /compact` must be run by hand.
- `/usage` also shows `Prompt cache (main)`: request count, share of input tokens from cache, misses with a likely cause, and whether the cache is warm. It covers the main conversation only, not subagents.
- `/context` shows what is filling the window. `/insights` writes an HTML report about how you work; it uses tokens itself.
- Local transcripts under `~/.claude/projects/` hold per-request token counts but not plan percentages. `scripts/usage-check.mjs` sums them.

## What makes usage climb

- Every request re-sends the whole conversation. Cached input is billed at the cached rate, but a long session still draws on the plan for the full history on every turn.
- A cache miss after a break longer than the cache lifetime reprocesses the full context. On a subscription within plan usage, the main conversation gets a one-hour lifetime. Subagents, workflows, compaction and teammates get five minutes unless `subagentPromptCacheTtl` or `CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL` is set. Source: https://code.claude.com/docs/en/prompt-caching.
- Session-scoped scheduled tasks, `/loop`, cross-session messages and goal check-ins each start a turn that sends the full context, even when you are idle. `crossSessionInbound: hold` stops inbound cross-session turns. `CLAUDE_CODE_GOAL_CHECKIN_MINUTES=0` turns goal check-ins off.
- Every subagent and workflow agent sends its own requests on top of the main conversation's. Agent teams use about 7x the tokens of a standard session when teammates run in plan mode.
- `/compact` is itself a large request, because it reads the conversation it summarizes. It costs most after a break longer than the cache lifetime. `/clear` costs nothing.

## Savings that keep quality

- Clear between unrelated tasks with `/clear`. Run `/rename` first if you want to resume it.
- Pick the model and effort at the start of a session and compact at natural breaks. Switching model invalidates the cache. Changing effort invalidates it on most models, but not on Opus 5.5, Sonnet 5.5, Haiku 5.5 and Fable 5.1 with an API key or a Claude subscription.
- `opusplan` uses Opus in plan mode and Sonnet to execute, but every plan-mode toggle is a model switch, so it rebuilds the cache each time.
- Send verbose work to subagents so only a summary returns. Give read-only exploration subagents `model: haiku`. A user or project subagent named `Explore` with `model: haiku` overrides the built-in. `CLAUDE_CODE_SUBAGENT_MODEL` with `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` caps every subagent at one model.
- Prefer CLI tools such as `gh` over MCP servers, and disable unused MCP servers with `/mcp`. MCP tool definitions are deferred by default, so only names enter context until a tool is used.
- Keep `CLAUDE.md` under about 200 lines and move workflow-specific instructions into skills, which load only when invoked. A PreToolUse hook can filter test or log output before Claude sees it.
- Specific prompts cost fewer tokens than "improve this codebase". Plan mode before a big change avoids expensive re-work. Give verification targets so the model can check its own work.
- Idle compaction and prompt suggestions use tokens in the background. `idleCompaction: false` (v2.1.290 or later) and turning prompt suggestions off stop them.
- Thinking cannot be turned off on Opus 5.5, Sonnet 5.5, Haiku 5.5 or the Fable models. Lower the effort level instead. `MAX_THINKING_TOKENS` only applies to models with a fixed thinking budget.

## Prompt cache prices

Read from https://platform.claude.com/docs/en/about-claude/pricing on 2026-11-05, relative to the base input price:

- 5-minute cache write: 1.25x. 1-hour cache write: 2x (for example Sonnet 5.5 is $2 base, $2.50 for a 5-minute write and $4 for a 1-hour write per million tokens).
- Cache read: 0.1x on most models, 0.05x on Opus 5.5 and Sonnet 5.5, 0.025x on Fable 5.1 and Mythos 5.1.
- So a cache miss that re-writes a large context costs 12.5x to 50x more per token than reading it from cache, depending on the model. This is why model switches and idle gaps matter more than prompt length.
- Per million tokens on the Anthropic API: Opus 5.5 $4 input and $20 output, Sonnet 5.5 $2 and $10, Haiku 5.5 $0.10 and $0.50 for prompts up to 100,000 tokens. Output costs 5x input on all three, so long thinking is the expensive part of a turn.
- Those are API list prices. Subscription plans do not bill per token, so use them only to compare options against each other.

## Not published

- The absolute weekly or 5-hour allowance per plan. Anthropic's support article gives no figures, so the answer is always `/usage`, not a number from memory.
