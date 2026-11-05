---
name: ai-cost-model
description: Builds a cost per player-hour model for one runtime AI feature, with caching, model tiering, quotas, and a spend ceiling. Uses current prices only.
owner: ai-cost-safety-engineer
disable-model-invocation: true
argument-hint: "[feature name, provider and model, expected concurrency]"
---

# AI cost model

A repeatable procedure for pricing one runtime AI feature per player-hour and setting the limits that keep it inside budget.

## Inputs

- Feature description and which moments call the model.
- Provider and model for each call type.
- Current per-million-token prices (input, output, cached input) copied from the provider's pricing page today, with the URL. If the user cannot supply them, use placeholders and mark every price UNVERIFIED. Never fill prices from memory.
- Session length, median and p95 calls per player-hour, peak and average concurrent players.
- Business model and revenue per player-hour if known.

Ask for anything missing once. If traffic numbers are still missing, assume conservative values and label them as assumptions.

## Steps

1. Split each call into components: static prefix (system prompt, lore), history, player input, output. Count tokens with the provider's tokenizer or count endpoint where available; otherwise estimate and label it.
2. Mark which components are cacheable (byte-identical prefix at the start of the prompt). Check the provider's current docs for minimum cache length and cache lifetime.
3. Compute cost per call: (uncached input x P_in + cached input x P_cached + output x P_out) / 1,000,000.
4. Compute CPH = cost per call x calls per player-hour, for median and p95.
5. Compute monthly cost = CPH x player-hours per month (average concurrency x hours in month). Show the p95 row as the planning number.
6. Rerun with each lever: caching on, history cap, smaller model for classification or short lines, pre-generated content. Record the saving of each.
7. Set limits: per-player quota (calls per window, tokens per day), global monthly ceiling, alert threshold, kill-switch fallback behavior.
8. Compare CPH with revenue per player-hour or the team's stated budget and give a go, go-with-limits, or redesign call.

## Output

```
# AI cost model: <feature>
Prices: <provider/model>, source <URL>, checked <YYYY-MM-DD> (or UNVERIFIED)

| Component | Tokens | Cached? |
|---|---|---|

| Scenario | Cost per call | Calls/hr | CPH | Monthly |
|---|---|---|---|---|
| p95, no levers | | | | |
| median, no levers | | | | |
| p95, all levers | | | | |

Levers and savings: <list>
Limits: per-player <quota>; global ceiling <amount>; alert at <percent>; kill switch -> <fallback>
Verdict: <go | go with limits | redesign>, because <reason>
Assumptions and UNVERIFIED items: <list>
```

## Done when

- [ ] Every price has a source URL and date, or is marked UNVERIFIED.
- [ ] Token counts are split by component and labeled measured or estimated.
- [ ] Median and p95 CPH are both shown, and monthly cost uses p95.
- [ ] At least caching, history cap, and model tiering were tested as levers.
- [ ] Per-player quota, global ceiling, alert threshold, and kill-switch fallback are all set.
- [ ] The model calls go through a backend proxy in the design; no key ships in a client.
