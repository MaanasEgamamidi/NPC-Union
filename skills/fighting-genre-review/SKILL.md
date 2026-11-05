---
name: fighting-genre-review
description: Audit a fighting game design against the genre's loop, pillars, frame data, failure modes and scope traps, and return a scored review.
owner: fighting-expert
disable-model-invocation: true
argument-hint: "[path to design doc or move list, or a short pitch]"
---

# Fighting genre review

A repeatable audit of a fighting game design.

## Inputs

- The design doc, pitch or move list.
- Subgenre: 2D, 3D or platform fighter. Ask if missing.
- Launch roster size, button count, team size and timeline. Ask if missing.
- Whether online play ships at launch.

## Steps

1. Read `knowledge/genres/fighting.md` for the loop, pillars and failures.
2. Name the subgenre and the closest two reference games from that file.
3. Map the core loop: neutral, hit confirm, combo, knockdown, okizeme (wake-up pressure), back to neutral. Note any step that is missing.
4. Build a frame data table for at least three moves per character shown. Mark guessed values "estimate."
5. Check the punish baseline: fastest normal startup, and which moves are punishable on block.
6. Check the defensive triangle: high, low, overhead and throw. Each option needs a counter.
7. Check combo limits: damage scaling, hitstun decay or a burst system. Flag any touch-of-death risk.
8. Check controls: input buffer, link windows, and whether a simple scheme has a cost.
9. Check online: rollback or delay. Rollback needs deterministic game logic from the start.
10. Count scope: characters, matchups (n(n+1)/2), animations per character, stages, training mode features.
11. List the top three risks and the named agents to hand off to.

## Output

```
# Fighting review: <game name>
Verdict: <ready / needs work / rethink>
Subgenre: <2D / 3D / platform>  Closest references: <game>, <game>

## Core loop
<neutral -> confirm -> combo -> knockdown -> okizeme -> neutral, gaps noted>

## Frame data
| Character | Move | Startup | Active | Recovery | On block | Note |

## Defense check
- High/low/overhead/throw: <ok or gap>
- Punish baseline: <fastest normal, frames>
- Combo limits: <scaling / decay / burst>

## Controls and online
- Buffer and links: <...>
- Simple scheme cost: <...>
- Netcode: <rollback / delay, determinism notes>

## Scope
- Characters: <n>  Matchups: <n(n+1)/2>
- Stages: <n>  Training mode: <features>

## Top risks
1. <...>
2. <...>
3. <...>

## Handoffs
- <agent>: <what>
```

## Done when

- [ ] Subgenre and two reference games named.
- [ ] Every loop step checked.
- [ ] Frame table filled, estimates marked.
- [ ] Defensive triangle and combo limits checked.
- [ ] Netcode choice stated.
- [ ] Matchup count calculated.
- [ ] Three risks and named handoffs listed.
