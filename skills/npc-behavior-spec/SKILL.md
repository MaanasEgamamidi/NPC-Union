---
name: npc-behavior-spec
description: Specify an NPC routine, barks, knowledge, relationships and recovery for implementation and playtesting.
owner: npc-designer
disable-model-invocation: true
argument-hint: "[NPC role and time model]"
---

# Npc Behavior Spec

## Inputs

- Player verbs, NPC role, time model, world and canon, service and quest dependencies, observation scale. Ask once for role and time model, then label assumptions.

## Steps

1. Give the NPC a player function, independent goal, constraint, stress response and visible tells. Separate canon from suggestions.
2. Fill schedule windows with activities, locations, prerequisites and blocked-route fallbacks. Define interruption priority, resumption and offscreen reconciliation.
3. Build a bark matrix: event, eligibility, priority, cooldown, representative lines and fallback. Check competing and repeated triggers.
4. For each consequential fact define witness or report, confidence, visibility and retention; separate belief from game truth. Define relationship dimensions, event deltas, threshold effects, anti-farming and repair.
5. Trace player absence, early arrival, interruption, route blocked, time skip, save/load, unseen choice and unavailable NPC. Add a recovery path for essential services.
6. Provide tests with observable results and state invariants; assign `game-ai-engineer`, `quest-designer` and content handoffs.

## Output

```markdown
# NPC: <name>
Function / independent goal / boundary / tells: <...>
| Window | Activity | Location | Condition | Fallback |
|---|---|---|---|---|
Interruption priority / resume / offscreen: <...>
| Bark event | Eligibility | Priority | Cooldown | Line / fallback |
|---|---|---|---|---|
| Fact or belief | Source | Confidence | Visibility | Retention |
|---|---|---|---|---|
| Relationship dimension | Start | Event / delta | Threshold effect | Repair |
|---|---|---|---|---|
Service recovery / quest dependencies: <...>
| Test | Expected observation | Invariant |
|---|---|---|
Assumptions / content budget / handoffs: <...>
```

## Done when

- [ ] Each routine has an interruption and blocked-route response.
- [ ] Barks have eligibility, priority, cooldown and fallback.
- [ ] Consequential knowledge has provenance and belief is separate from world truth.
- [ ] Relationships define repeat-event handling and visible effects.
- [ ] Tests cover absence, interruption, unwitnessed events and save/load.
