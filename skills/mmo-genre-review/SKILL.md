---
name: mmo-genre-review
description: Audit an MMO design against its loops, social structure, economy sinks, server model, and live-ops scope. Use before greenlighting an MMO pitch.
owner: mmo-expert
disable-model-invocation: true
argument-hint: "[MMO design doc, pitch, or feature list]"
---

# MMO genre review

A repeatable audit of an MMO or MMO-lite design. It checks whether the game has a reason to return every day, every week, and every season, and whether the team can keep feeding it.

## Inputs

- The design doc, pitch, or feature list.
- Team size and expected patch cadence.
- Business model: subscription, buy-to-play, or free-to-play.
- Type: themepark, sandbox, or hybrid.
- Target population per server or shard.

If any are missing, ask once. If still missing, state an assumption and continue.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/genres/mmo.md` for the pillars and failure list.
2. Write the loop map at three scales: session (one evening), weekly (reset cycle), seasonal (tier or expansion). Mark any scale that is empty.
3. Check social structure: what forces or rewards grouping, what a guild is for, and what a solo player does. Flag role shortages if the design uses tank, healer, damage roles.
4. Build a faucet and sink table for every currency and tradeable item. Flag any faucet without a sink.
5. Check risk and loss: PvP rules, item loss, safe zones. Compare with one reference game from the knowledge file.
6. Check the server model: single shard, realms, or instanced layers. Note what happens when population falls by half.
7. Check new player experience at month twelve, when most players are at the level cap.
8. Count scope: zones, classes, dungeons, raid tiers, PvP modes, crafting professions. Estimate what each patch must add and compare with the stated team and cadence.
9. Check abuse surfaces: botting on gather loops, gold selling, multi-boxing, exploits in trade.
10. Rank risks by severity (blocker, major, minor) and assign each to a named NPC Union agent.

## Output

```
# MMO review: <game name>
Assumptions: <list>

## Loop map
| Scale | Loop | Status (ok / thin / missing) |
|---|---|---|
| Session | | |
| Weekly | | |
| Seasonal | | |

## Social check
- Reason to group:
- What a guild is for:
- Solo path:
- Role shortage risk:

## Faucets and sinks
| Currency or item | Faucets | Sinks | Risk |
|---|---|---|---|

## Risk and server model
- PvP and loss rules:
- Server structure and low-population plan:
- Month-twelve new player:

## Scope count
| Content type | Launch count | Per patch | Feasible for team? |
|---|---|---|---|

## Risks
| # | Risk | Severity | Owner agent |
|---|---|---|---|

## Open questions
- 
```

## Done when

- [ ] All three loop scales are filled or marked missing.
- [ ] Every currency and tradeable item has a row in the faucet and sink table.
- [ ] At least one reference game from the knowledge file is cited for comparison.
- [ ] Scope counts are numbers, not adjectives.
- [ ] Every risk has a severity and an owner agent.
- [ ] Assumptions are stated at the top.
