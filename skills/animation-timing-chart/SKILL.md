---
name: animation-timing-chart
description: Builds a frame timing chart for a game move or cycle: startup/active/recovery, holds, events, hit-stop, and state transitions, ready for art and code.
owner: animator
disable-model-invocation: true
argument-hint: "[move or cycle, fps, engine, 2D skeletal | frame-by-frame | 3D]"
---

# Animation timing chart

Produces one chart per move or cycle that the art side and the code side can both build from.

## Inputs

- Move name and type: player attack, enemy attack, dodge, locomotion cycle, idle, hurt, or other.
- Game frame rate (assume 60 if missing) and art rate (ones, twos, threes; assume twos for frame-by-frame, ones for skeletal).
- Pipeline: Spine, DragonBones, frame-by-frame sprites, or 3D rig. Engine if known.
- Design intent in one line (fast poke, heavy finisher, telegraphed boss swing, looping run at N units per second).
- For locomotion: move speed in world units per second and stride length per cycle.

If more than two inputs are missing, ask once in a single message, then proceed with stated assumptions.

## Steps

1. Set the gameplay budget in game frames: startup, active, recovery. Check player startup against 3 to 8 frames and enemy telegraph against 20 to 40 frames; justify any value outside.
2. Set cancel windows: the first frame each of dodge, block, next attack, and any-state can interrupt recovery.
3. Set hit-stop frames on hit (light 2 to 4, heavy 6 to 12 at 60 fps) and confirm the input buffer keeps running during it.
4. Place poses inside the budget: anticipation, smear or breakdown, contact, follow-through, settle. Mark holds and the art rate for each range.
5. For cycles: confirm the last frame does not duplicate frame 1, and compute playback rate = move speed / stride length (cycles per second). Note the pose where feet plant.
6. Decide root motion or in-place, and record why (authored distance versus designer-tuned speed, physics and network concerns).
7. Attach events to frame numbers: hitbox on/off, VFX, SFX, footstep, cancel window open.
8. Write transitions in and out: source, target, condition, interrupt priority, and blend time or hard cut on a matching pose (hard cut for frame-by-frame sprites).
9. List risks: foot sliding, loop hitch, root motion against walls, direction count and mirroring, mesh cost on mobile for Spine.

## Output

```markdown
# Timing chart: <move>
Game fps: <n> | Art rate: <ones/twos/threes> | Pipeline: <...> | Total: <n> frames (<seconds> s)
Budget: startup <n> | active <n> | recovery <n> | hit-stop on hit <n>
Motion: <root motion | in-place> because <reason>

| Frames | Pose | Hold | Window | Event |
|---|---|---|---|---|
| 1-<n> | ... | ... | startup | ... |

## Transitions
| From | To | Condition | Earliest frame | Blend / cut |
|---|---|---|---|---|

## Cycle check (cycles only)
Stride: <units> | Speed: <units/s> | Playback: <cycles/s> | Last frame duplicates first: no

## Risks
- ...

## Assumptions
- ...
```

## Done when

- [ ] Every frame from 1 to the total is covered by exactly one row.
- [ ] Startup, active, recovery, and hit-stop are given in game frames at the stated fps.
- [ ] Player startup is within 3 to 8 frames or the exception is justified.
- [ ] Every gameplay event has a frame number; no "around the middle".
- [ ] Every outgoing transition has an earliest frame and a blend or cut rule.
- [ ] Cycles pass the duplicate-frame check and the speed match check.
- [ ] Root motion choice is stated with a reason.
- [ ] Assumptions are listed.
