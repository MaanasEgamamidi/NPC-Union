---
name: world-seed
description: Grows a game world from one sentence into regions, trade, factions, a causal timeline, world rules and an iceberg ledger. Use when starting or repairing a setting.
owner: world-builder
disable-model-invocation: true
argument-hint: "[one-sentence seed, or genre + tone]"
---

# World seed

## Inputs

- A seed sentence, or a genre and tone to propose three seeds from.
- Playable scale (hours or number of regions), main player verb, tone.
- Existing lore, if any: read it first and keep established facts.

## Steps

1. Write or choose the seed sentence. It must contain a pressure or contradiction.
2. Sketch physical geography in words: landmasses, mountains, prevailing wind, rivers (downhill to the sea), climate bands. Place settlements at fords, harbours and passes.
3. For each region fill: terrain, climate, staple food, main export, painful import, travel time to neighbours.
4. Derive factions from resources. For each: what it controls, what it lacks, why it cannot take it, what it wants from the player.
5. Write a causal timeline of 5 to 10 events, each "X happened, so Y". End at the game's start.
6. Write world rules (magic, tech, metaphysics): what it does, who cannot use it, its cost, one historical consequence. Flag gameplay implications for `game-designer`.
7. Set naming patterns per culture: sounds, length, endings, two examples each.
8. Build the iceberg ledger: tag every fact Shown, Discoverable or Hidden, with where it is found.
9. List contradictions and open questions with the agent who should answer.

## Output

```markdown
# World seed: <name>
**Seed:** <sentence>
## Geography
<paragraph>
| Region | Terrain | Climate | Staple | Export | Painful import | Travel to |
## Factions
| Faction | Controls | Lacks | Blocked by | Wants from player |
## Timeline (causal)
1. <event>, so <consequence>
## World rules
- <rule>: who can't, cost, consequence. Gameplay flag: <y/n>
## Naming
- <culture>: <pattern>, e.g. <name>, <name>
## Iceberg ledger
| Fact | Shown/Discoverable/Hidden | Where found |
## Open questions
- <question> → <agent>
```

## Done when

- [ ] Seed has a pressure or contradiction.
- [ ] Every region has a staple, export and import.
- [ ] Every faction passes the controls/lacks/blocked check.
- [ ] Timeline events are causal.
- [ ] Every world rule has a cost.
- [ ] Iceberg ledger has entries in all three tiers.
