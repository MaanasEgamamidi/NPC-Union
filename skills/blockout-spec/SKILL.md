---
name: blockout-spec
description: "Turn a beat chart into a measured greybox spec: metrics sheet, per-space dimensions, gates, loops, sightline checks and a playtest plan."
owner: level-designer
disable-model-invocation: true
argument-hint: "[beat chart path or level name] [engine]"
---

# Blockout spec

## Inputs

- A beat chart (from `level-beat-chart`) or a list of spaces.
- Engine and unit convention (Unreal cm, Unity m by convention, Godot m, Source units).
- Measured player values: capsule width and height, eye height, walk and run speed, jump height, jump distance, max step height. If not measured, take them from the project's controller asset; if that is unavailable, mark each value ASSUMED.

## Steps

1. Write the metrics sheet. Derive: minimum corridor width (2x capsule width), standard door (narrower than corridor), safe gap (70-80% of max jump distance), skill gap (85-95%), impossible gap (over 100%), low and high cover heights relative to crouched and standing capsule.
2. For each beat, specify the space: footprint (W x L x H), floor heights, entrances and exits, cover pieces, gaps, hazards, pickups. Give every travel distance also in seconds at walk speed.
3. Mark the critical path, optional paths, loops and shortcuts. Every dead end either has a reward or opens a shortcut back.
4. List gates: type (hard or soft), what opens it, and where the player first sees it. The gate must be visible before the key.
5. Sightline checks: from each entrance, what the player sees first; confirm the landmark is visible from the hub and each rest space. Note anything above eye level that needs a lure.
6. Specify greybox materials: world-aligned grid texture, one colour for walkable, one for climbable or interactive, one for hazard.
7. Write the playtest plan: 3-5 questions, what to observe (where players look, where they stop, deaths per beat), and pass criteria with numbers.
8. List what must be re-measured in-engine before art.

## Output

```
# Blockout: <level>  Engine: <engine>  Units: <unit>
## Metrics sheet
| Metric | Value | Source (measured / asset / ASSUMED) |
## Spaces
### <beat #> <space name>
Footprint: <W x L x H>   Walk time across: <s>
Entrances/exits: ...   Cover: low <n>, high <n>   Gaps: <size, type>
Hazards / pickups: ...   First view from entrance: ...
## Paths
Critical path: A > B > C   Optional: ...   Loops/shortcuts: ...
## Gates
| Gate | Type | Opened by | First seen at |
## Greybox colour key
## Playtest plan
| Question | Observe | Pass if |
## Re-measure before art
```

## Done when

- [ ] Every metric states its source; ASSUMED values are flagged.
- [ ] Every space has dimensions and walk time.
- [ ] Every gap is labelled safe, skill or impossible against the measured jump.
- [ ] Every gate is seen before its key.
- [ ] No dead end without a reward or shortcut.
- [ ] Playtest plan has numeric pass criteria.
