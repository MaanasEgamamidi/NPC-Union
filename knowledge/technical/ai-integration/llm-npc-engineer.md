---
owner: llm-npc-engineer
topic: LLM-driven NPC dialogue sources
last_verified: 2026-11-05
---

# LLM NPC engineering: sources

## Vendor platforms

- NVIDIA ACE for Games: https://developer.nvidia.com/ace
  - Claim: ACE models are packaged as NVIDIA NIM microservices or NVIDIA In-Game Inferencing (NVIGI) plugins for cloud or Windows PC deployment; Inworld AI is listed as a platform partner.
  - last_verified: 2026-11-05 (via web search result summary of the page)
- Check NVIDIA's developer documentation for current NVIGI plugins and NPC examples before choosing an integration: https://developer.nvidia.com/ace
- Inworld AI documentation: https://docs.inworld.ai/introduction
  - The documentation describes voice, inference and developer tools; check the current product scope before selecting a service.

## Practices (no external claim, team guidance)

- Game code owns quest state; the model proposes via validated tool calls.
- Latency hiding with cached barks and thinking animations; measure end of player speech to first audio.
- Prompt-injection test sets per NPC before ship.

## Needs local verification

Check the current vendor documentation before implementing an integration.
