---
name: battle-royale-genre-review
description: Audit a battle royale design against the genre loop, pillars, common failures, and scope traps, and return a ranked risk list with next steps.
owner: battle-royale-expert
disable-model-invocation: true
argument-hint: "[design doc path or short pitch]"
---

# Battle royale genre review

## Inputs

- A design doc, pitch, or build notes.
- Lobby size, team size, target match length, platform, and expected player population.
- If missing, ask once. If still missing, state assumptions and continue.

## Steps

1. Read `knowledge/genres/battle-royale.md` for the loop, pillars, failures, and scope traps.
2. Write the match as phases: drop, loot, rotate, mid-game fights, final circles, post-death.
3. For each phase, note the target duration and what the player is doing. Flag any phase with no decisions or contact.
4. Check the zone schedule: wait, shrink time, damage, and final size per phase. Flag missing values.
5. Check end-zone rules: can the final circle land on terrain with no cover or one dominant spot?
6. Check post-death: is there a redeploy, spectate, or fast requeue? Estimate how long a player waits after an early death.
7. Check loot: can a solo lander find a working kit fast? Are there pickups nobody uses?
8. Check lobby size against map size and the expected concurrent population. Flag bot backfill risk.
9. Score each pillar 1 to 5 with one line of evidence.
10. List scope traps found, then rank the top risks and assign each to a named agent.

## Output

```
# BR review: <project>
Assumptions: <lobby, team size, match length, platform>
## Match map
| Phase | Target time | Player activity | Issue |
## Pillar scorecard
| Pillar | Score 1-5 | Evidence |
## Top risks (ranked)
1. <risk> -> <agent>
## Scope traps
- <trap>
## Next steps
- <step>
```

## Done when

- [ ] Every match phase has a time and activity, or a flag.
- [ ] Zone schedule and end-zone rules are checked.
- [ ] Post-death experience is described.
- [ ] Each pillar has a score and evidence.
- [ ] At least three ranked risks, each with an owner agent.
- [ ] All numbers are labeled sourced or assumed.
