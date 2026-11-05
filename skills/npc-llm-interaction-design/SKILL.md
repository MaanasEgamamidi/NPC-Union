---
name: npc-llm-interaction-design
description: Design and evaluate a bounded LLM NPC interaction with authoritative game state and fallbacks.
owner: npc-designer
disable-model-invocation: true
argument-hint: "[NPC interaction and constraints]"
---

# Npc Llm Interaction Design

## Inputs

- NPC behavior spec, desired free-language benefit, authoritative game systems, platform, privacy, budget and accessibility constraints. If LLM use is undecided, compare with an authored alternative.

## Steps

1. Choose the task the model helps with and identify all required progression routes. Keep a deterministic path for essential actions.
2. Define trusted character instructions, current world state, spoiler-gated facts, selected memories and untrusted player/retrieved text. Specify provenance, retention, deletion and allowed disclosure.
3. Enumerate proposed intents and structured fields; assign deterministic validators for identity, permissions, preconditions and state. Only authoritative game logic changes state. Reject unsupported requests.
4. Specify how candidate memories are validated, deduplicated, summarized and evicted; distinguish witnessed facts, reports and model invention.
5. Specify timeout, unavailable service, invalid output, moderation and exhausted-budget fallbacks, including player feedback and recovery. Set measured project targets with `llm-npc-engineer` and `ai-cost-safety-engineer` rather than assumed provider facts.
6. Test prompt injection, spoiler requests, invented offers, unobserved events, repetition, unsafe text, latency and offline behavior. Give `game-ai-engineer` the interaction with schedule and action arbitration; give `llm-npc-engineer` context, intent and evaluation contracts.

## Output

```markdown
# LLM NPC interaction: <name>
Player benefit / authored alternative: <...>
Trusted context / allowed facts / untrusted inputs: <...>
| Intent | Fields | Validator and authority | Rejection feedback |
|---|---|---|---|
Memory evidence / write and deletion policy: <...>
Latency, concurrency and cost targets / measurement owner: <...>
| Failure | Player-facing fallback | Progress preserved? |
|---|---|---|
| Test and input | Expected dialogue | State invariant |
|---|---|---|
Handoffs and unresolved risks: <...>
```

## Done when

- [ ] The model cannot directly commit game state or invent a memory.
- [ ] Essential progression survives service failure.
- [ ] Input trust, spoiler access and memory retention are specified.
- [ ] Adversarial and outage tests have expected state invariants.
- [ ] Both engineering handoffs and measured budget owners are named.
