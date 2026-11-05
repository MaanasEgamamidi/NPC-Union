---
name: platformer-genre-review
description: Audit a platformer design against the genre's loop, movement feel, level teaching, death cost, and scope, and return a ranked fix list.
owner: platformer-expert
disable-model-invocation: true
argument-hint: "[path to design doc or a short platformer pitch]"
---

# Platformer genre review

A repeatable audit of a platformer design. It checks feel, teaching, failure cost, and scope, in that order.

## Inputs

- A design doc, pitch, or build notes. If missing, ask for a one-paragraph pitch.
- 2D or 3D, and focus: precision, flow (speed), or exploration. Ask if not stated.
- Movement values if they exist: jump height, rise and fall gravity, max fall speed, coyote and buffer windows, respawn time.
- Planned mechanic count, level count, and number of distinct art sets.
- Target platforms and input devices.

## Steps

1. Read `knowledge/genres/platformer.md` and pick the 2 or 3 closest reference games from its table.
2. Write the core loop in one line (for example: read gap, jump, land or die, retry fast). Flag the design if it cannot be stated this way.
3. Feel audit. For each item mark present, missing, or unknown: coyote time, jump buffer, variable jump height, separate rise and fall gravity, fall speed cap, corner correction, hurtbox smaller than sprite, input to takeoff delay. Suggest starting values only as starting points to tune.
4. Camera audit: lead in direction of travel, vertical lock until landing, landing spot visible before the jump, no blind leaps of faith.
5. Teaching audit. For each mechanic, find where it is introduced safely, developed, twisted, and concluded. List mechanics shown once and dropped.
6. Death cost audit: respawn time, distance from checkpoint to failure point, and anything lost on death. Flag any retry that replays solved content.
7. Difficulty and access: check for a difficulty ramp, optional hard content, and assist options. Note which tuning values assist options would touch.
8. Scope audit: compute levels per mechanic and art sets per world. Flag more than about 8 core mechanics for a small team, unique art per level, and procedural generation without a guaranteed critical path.
9. Rank all issues: feel first, then death cost, then teaching, then scope.
10. Assign each open item to the next agent (controls-designer, level-designer, prototyper, playtest-analyst, systems-designer, art-director).

## Output

```
# Platformer review: <game name>

Verdict: <one line>
Core loop: <one line>
Closest references: <game>, <game>

## Feel
| Item | Status | Note / starting value |
|---|---|---|

## Camera
- ...

## Teaching
| Mechanic | Introduce | Develop | Twist | Conclude | Gap |
|---|---|---|---|---|---|

## Death cost
- Respawn time:
- Retry distance:
- Loss on death:

## Scope
- Mechanics / levels / art sets:
- Risks and cuts:

## Ranked fixes
1. ...

## Hand-offs
- <agent>: <task>
```

## Done when

- [ ] Core loop stated in one line.
- [ ] Every feel item marked present, missing, or unknown.
- [ ] Every mechanic has a teaching row.
- [ ] Death cost has respawn time and retry distance, or says unknown.
- [ ] Scope numbers computed and at least one cut proposed if over budget.
- [ ] At least two reference games from `knowledge/genres/platformer.md` cited.
- [ ] Every open item has a named agent.
