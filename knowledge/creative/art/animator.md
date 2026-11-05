---
title: Game animation timing reference
tags: [animation, timing, game-feel, hit-stop, root-motion, state-machine, spine, dragonbones]
sources: [http://esotericsoftware.com/spine-user-guide, https://github.com/DragonBones, https://docs.unity3d.com/Manual/RootMotion.html, https://docs.godotengine.org/en/stable/tutorials/animation/animation_tree.html]
last_verified: 2026-11-05
---

# Game animation timing reference

Owner: `animator`. Numbers below are working heuristics from common practice, not engine rules. Tune by playtest.

## Frame conversions

| Game fps | 1 frame | On twos | On threes | 0.5 s |
|---|---|---|---|---|
| 60 | 16.7 ms | 30 drawings/s | 20 drawings/s | 30 frames |
| 30 | 33.3 ms | 15 drawings/s | 10 drawings/s | 15 frames |
| 24 (film reference) | 41.7 ms | 12 drawings/s | 8 drawings/s | 12 frames |

## Attack budgets (60 fps, heuristic)

| Move | Startup | Active | Recovery | Hit-stop on hit |
|---|---|---|---|---|
| Player light | 3-8 | 2-4 | 8-16 | 2-4 |
| Player heavy | 10-20 | 3-6 | 16-30 | 6-12 |
| Enemy telegraphed | 20-40 | 3-8 | 15-40 (punish window) | 3-8 |
| Dodge / roll | 1-3 | i-frames 6-15 | 6-12 | none |

Pitfalls: freezing input during hit-stop; recovery with no cancel window; enemy telegraph that shares its first frames with a different attack.

## Loop checklist

- [ ] Last frame does not duplicate frame 1.
- [ ] Contact or passing pose lands on a frame the engine will actually show at runtime rate.
- [ ] Playback rate = move speed / stride length; feet do not slide at min and max speed.
- [ ] Secondary motion (hair, cloth, tails) completes a whole number of cycles per loop, or is simulated.
- [ ] Idle loops are long enough (or randomized) that the repeat is not obvious.

## Root motion vs in-place

| Use root motion when | Use in-place when |
|---|---|
| Distance is part of the move (lunge, vault, climb) | Designers tune speed often (walk, run) |
| Foot plant must be exact | Physics or character controller owns movement |
| Single-player or animation is replicated | Networked movement needs server authority |

Engine settings differ by version (for Unity, the Animator "Apply Root Motion" option; for Godot, AnimationTree root motion track). UNVERIFIED for current versions, check the linked docs.

## State machine transition rules

| Rule | Default |
|---|---|
| 3D locomotion crossfade | 0.1-0.2 s |
| 2D frame-by-frame | Hard cut on a matching pose |
| Spine / DragonBones mix | Short mix, a few frames; verify per runtime |
| Interrupt priority | hurt > dodge > attack recovery > locomotion |
| Every transition has | Condition, earliest frame, blend or cut |

## Skeletal 2D vs frame-by-frame

| Factor | Skeletal (Spine, DragonBones) | Frame-by-frame |
|---|---|---|
| Cost per new animation | Low after rig | One drawing per frame per direction |
| Runtime blending | Yes | No (hard cuts) |
| Turnarounds, big squash, smears | Weak; needs attachment swaps | Strong |
| Memory | Small atlas plus data | Grows with frames |
| Risk | Puppet look, mesh cost on mobile | Scope blowout with directions |

Hybrid: skeletal body with swapped image attachments for hands, faces, and smear frames.

## Sources

All UNVERIFIED (not fetched in this session):
- Spine user guide: http://esotericsoftware.com/spine-user-guide
- DragonBones GitHub organization: https://github.com/DragonBones
- Unity Manual, root motion: https://docs.unity3d.com/Manual/RootMotion.html
- Godot AnimationTree: https://docs.godotengine.org/en/stable/tutorials/animation/animation_tree.html
