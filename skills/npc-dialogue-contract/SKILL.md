---
name: npc-dialogue-contract
description: "Writes the contract between an LLM-driven NPC and game code: persona, memory tiers, tool schema, latency budget, fallbacks and injection tests."
owner: llm-npc-engineer
disable-model-invocation: true
argument-hint: "[NPC name and role, engine, inference location]"
---

# NPC dialogue contract

A repeatable procedure for specifying one LLM-driven NPC so that the game stays authoritative.

## Inputs

- NPC name, role, location and what the player can do with them.
- Engine, platform, cloud or on-device inference, voice input yes or no.
- Content rating and any forbidden topics.
- List of game state the NPC can read and act on.
If any is missing, ask once, then state a default and continue.

## Steps

1. List every state variable the conversation may read or change. Mark owner as game for all of them.
2. Write the persona sheet: voice, knowledge limits (what this NPC does not know), and 3 example lines.
3. Define memory tiers: static persona, short-term transcript cap in tokens, long-term facts as game events with an accept rule.
4. Write the tool schema in JSON. Each tool gets enum or ID parameters, numeric clamps, and the game validation rule. No tool may directly set quest completion.
5. Fix the output format: speech text channel plus tool calls. Name the filter that strips non-speech text before TTS.
6. Build the latency budget table: ASR, model first token, first sentence, TTS first chunk, with the bark or animation covering each gap.
7. Write at least 10 fallback lines for refusals, rejected tool calls, timeouts and off-world questions.
8. Write at least 8 adversarial tests with the expected outcome (in-world reply, no tool call).
9. List what must be looked up in current vendor docs and mark it UNVERIFIED until checked.

## Output

```
# <NPC> dialogue contract
## Authority table
| State | Owner | Read by model | Change via tool |
## Persona sheet
## Memory tiers
## Tool schema (JSON)
## Output format and TTS filter
## Latency budget
| Stage | Target ms | Hidden by |
## Fallback lines
## Adversarial tests
| Input | Expected |
## Open questions and UNVERIFIED items
```

## Done when

- [ ] Every state variable has the game as owner.
- [ ] No tool can complete a quest or grant an item without game validation.
- [ ] Each latency stage has a target and a hiding technique.
- [ ] At least 10 fallback lines and 8 adversarial tests are written.
- [ ] Vendor-specific claims have a source or are marked UNVERIFIED.
