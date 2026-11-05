---
name: tower-defense-genre-review
description: Audit a tower-defense design against the genre loop, pillars, counter matrix, wave pacing, failure modes, and scope traps.
owner: tower-defense-expert
disable-model-invocation: true
argument-hint: "[design doc path or TD pitch]"
---

# Tower-defense genre review

## Inputs

- The design doc, pitch, or spreadsheet. Ask for it if missing.
- Path type: fixed path, lanes, or open mazing. Ask if unclear.
- Tower list (cost, DPS, range, targeting) and enemy list (health, armor, speed, property).
- Wave list, economy (start gold, kill reward, income), platform, and team size.

## Steps

1. Classify the design: fixed path, lane, mazing, or hybrid with a hero. Name the closest reference from `knowledge/genres/tower-defense.md`.
2. Write the core loop in one line (build, watch wave, earn, upgrade) and note what the player decides each step.
3. Compute DPS per gold for each tower. Flag any tower that beats all others on every enemy type.
4. Build the counter matrix (enemies by towers). Flag empty rows and empty columns.
5. Walk the waves. Mark the wave where each enemy property first appears. Flag stretches of 3 or more waves with no new property.
6. Check the economy: can the player afford a counter before the first wave that requires it? Flag stacked income levers.
7. Check mazing rules if relevant: path-blocking prevention, flyers, and pathfinding cost on placement.
8. Check readability: range preview, enemy identification, path preview, wave preview.
9. Check against the common failures and scope traps in the knowledge file.
10. Write the top three fixes and the handoffs.

## Output

```
# TD review: <game name>
Verdict: <one line>
Type: <fixed path | lanes | mazing | hybrid>  Closest reference: <game>
Core loop: <one line>

## Counter matrix
| Enemy | <tower 1> | <tower 2> | ... |

## DPS per gold
| Tower | Cost | DPS | DPS/gold | Note |

## Wave flags
- Wave <n>: <issue>

## Top three problems
1. <problem> -> <fix>
2.
3.

## Scope warnings
- <trap>

## Handoffs
- level-designer: <ask>
- economy-designer: <ask>
- systems-designer: <ask>
```

## Done when

- [ ] Path type and closest reference named.
- [ ] Counter matrix has no unexplained empty row or column.
- [ ] DPS per gold table filled for every tower.
- [ ] Every new enemy property is mapped to a wave.
- [ ] Three problems each have a concrete fix.
- [ ] Scope warnings checked against the knowledge file.
- [ ] Handoffs name the agent and the exact ask.
