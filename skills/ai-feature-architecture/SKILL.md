---
name: ai-feature-architecture
description: Turns an AI feature idea into a plan covering placement, latency and token budgets, fallbacks, provider interface, store disclosure, and specialist owners.
owner: ai-integration-architect
disable-model-invocation: true
argument-hint: "[feature idea, target platforms]"
---

# AI feature architecture

A repeatable procedure for deciding where and how a generative or classical AI feature fits in a game, before anyone writes integration code.

## Inputs

- The feature as the player experiences it. If missing, ask: "What does the player see, hear, or do?"
- Target platforms and stores. If missing, ask which, and whether offline play is required.
- Expected call frequency: calls per player per session, and concurrent players.
- Who reviews generated output before players see it, if anyone.
- Business model (premium, free-to-play, subscription), since it sets the cost ceiling per player.

If the user says to assume, write each assumption at the top of the output and continue.

## Steps

1. List every touchpoint where AI is proposed. Split compound features (for example "AI villagers" becomes dialogue, schedule, and gift reactions).
2. Classify each touchpoint: dev-time tool, runtime generative, runtime classical AI, or no AI needed (table, template, seeded generator). Move anything on the frame loop or inside a 100 ms input response to classical AI or no AI.
3. For each runtime generative touchpoint, set placement: cloud via your own backend, server-side batch with stored results, or on-device. Reject any design that puts a provider key in the client build.
4. Set a latency budget (time to first visible output at p95) and a token budget (input and output per call, calls per player per day).
5. Write the degraded mode for each touchpoint: what happens on timeout, provider outage, quota hit, moderation block, and offline play.
6. Define the provider abstraction: one internal request and response shape, timeout, retry policy, cache key, and logging fields (prompt, model identifier, parameters, output). Look up current provider docs for model identifiers, regions, rate limits, and prices; record the date checked. Do not recall them.
7. Check store and platform rules. Fetch the Steam content survey page and classify each touchpoint as Pre-Generated, Live-Generated, or development efficiency only. For other platforms, check their developer docs or mark UNVERIFIED.
8. Assign each touchpoint an owner from the ai-integration local: llm-npc-engineer, game-ai-engineer, on-device-ai-engineer, prompt-engineer, rag-engineer, ai-cost-safety-engineer, procedural-generation-engineer.
9. List open questions and anything UNVERIFIED.

## Output

```markdown
# AI feature plan: <feature>

## Assumptions
- ...

## Touchpoints
| Touchpoint | Class | Placement | Latency p95 | Tokens per call / per player per day | Degraded mode | Owner |
|---|---|---|---|---|---|---|

## Provider interface
- Request fields:
- Response schema and validation:
- Timeout and retry:
- Cache key:
- Logged fields:
- Provider facts checked on <date>: <links>

## Store disclosure
| Store | Category | Guardrails described | Source | Checked |
|---|---|---|---|---|

## Open questions and UNVERIFIED items
- ...
```

## Done when

- [ ] Every touchpoint is classified, and none on the frame loop calls a remote model.
- [ ] Every runtime touchpoint has a latency budget, a token budget, and a degraded mode.
- [ ] No design puts a provider key in a client build.
- [ ] Provider facts have links and a check date, or are marked UNVERIFIED.
- [ ] Every target store has a disclosure row with a source or an UNVERIFIED mark.
- [ ] Every touchpoint has a named owner agent.
