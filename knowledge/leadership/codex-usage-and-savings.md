---
title: Codex usage limits and token savings
tags: [leadership, budget, codex, limits, tokens, reasoning]
sources:
  - https://learn.chatgpt.com/docs/pricing
  - https://learn.chatgpt.com/docs/config-file/config-reference
last_verified: 2026-11-05
---

Facts the budget keeper relies on for Codex CLI. Both pages were read on 2026-11-05. The old addresses `developers.openai.com/codex/pricing` and `developers.openai.com/codex/config-reference` redirected to the `learn.chatgpt.com` pages above. The pricing page shows no date, so re-open it before quoting a number.

## Limits

- Plus and Standard Business plans have a 5-hour window, and weekly limits may also apply. The page gives no weekly figures, and says its numbers are estimates, not fixed limits.
- "Pro plans currently have no five-hour limit." Pro starts at $100 per month.
- Local messages and cloud chats share one allowance. Cloud tasks may use more of it than local messages.
- Estimated local messages per 5-hour window on Plus and Standard Business: GPT-6.1 Terra 35 to 285, GPT-6.1 Sol 15 to 160, GPT-6 Sol 15 to 150, GPT-6 Astra 5 to 45, GPT-6 Luna 350 to 3,000. NPC Union's default Codex model is `gpt-6.1-terra`, set in `scripts/run-agent.mjs`.
- Fast mode uses 2.5x the included usage. Ultrafast (GPT-6 Astra and GPT-6.1 Sol, Pro $500 only) uses 8x. Image generation uses the included limits about 3 to 5 times faster than a similar text turn on average.
- Credits pay for usage after the included limits run out. Credits per 1M tokens (input, cached input, output) for GPT-6.1 Terra: 25, 1.25, 125. Cached input is 20x cheaper than fresh input, and output is 5x the price of fresh input.

## Reading current usage

- Codex writes the plan windows into each session log under `~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`. A `token_count` event carries `rate_limits.primary` (300 minutes) and `rate_limits.secondary` (10080 minutes), each with `used_percent` and `resets_at`, plus `plan_type` and `credits`. This was observed in this machine's logs on 2026-11-05, and is not documented on the pages above, so treat the field names as UNVERIFIED for other versions. `scripts/usage-check.mjs` reads them.
- A `resets_at` in the past means that window has already reset and the percentage is stale.
- The pricing page points to the usage dashboard for current limits and reset times.

## Reasoning and context settings

- `model_reasoning_effort` accepts a level such as `low`, `medium`, `high`, `xhigh`, `max` or `ultra`, depending on the model and client. `plan_mode_reasoning_effort` overrides it in Plan mode. `model_reasoning_summary` takes `auto`, `concise`, `detailed` or `none`.
- NPC Union's `reasoning` field is `low`, `medium` or `high` only. `scripts/run-agent.mjs` passes it as `model_reasoning_effort`.
- `model_auto_compact_token_limit` sets when history is compacted. `tool_output_token_limit` caps how much of each tool output is stored in history, and `mcp_servers.<id>.tools.<tool>.output_token_limit` does the same for one MCP tool.
- `skills.max_context_tokens` caps the skills catalog, 2% of the context window by default and 10000 at most.

## Savings that keep quality

- Keep prompts precise and pass only the relevant files. State the audience, format and length of the output.
- Nest `AGENTS.md` files so each folder only injects its own context.
- Disable MCP servers you are not using.
- Keep Codex for work where it is the better tool: live web search, fact-checking and image generation. Do text and code that Claude does equally well on Claude, so the two quotas are spent in parallel. `run-agent.mjs --runtime claude` or `--runtime codex` moves a single agent between them.
- Image generation burns the window fastest. Batch the brief into one well-specified request, instead of several vague retries.

## UNVERIFIED

- Weekly Codex limits per plan.
- Whether `used_percent` fields appear the same way in other Codex versions.
