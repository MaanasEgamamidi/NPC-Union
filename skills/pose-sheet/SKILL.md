---
name: pose-sheet
description: Builds an on-model multi-pose sheet for an existing character, with skeleton specs, conditioning settings, and identity checks per pose.
owner: pose-artist
disable-model-invocation: true
argument-hint: "[character sheet path] [list of poses or acting beats]"
---

# Pose sheet

Produce a set of poses for one existing character where every pose reads clearly and the character stays recognisably the same.

## Inputs

- Character reference: turnaround or approved image. If missing, stop and ask; do not invent the design.
- Pose list: 1 to 8 poses or acting beats ("idle", "victory, exhausted").
- Use: key art, sprite base, animation keys, or marketing. This sets camera and framing rules.
- Locks: what must not change (face, palette, props, which hand holds what).

Ask if missing: What is the camera height? Which hand holds the prop? Same scale and framing for all poses, or per-pose framing?

## Steps

1. Extract identity locks from the reference: head count (height in heads), face shapes, hair or ear silhouette, palette swatches, the 3 most recognisable costume shapes, prop and hand.
2. For each pose, write a one-line acting intent, then the line of action (C, S, or straight diagonal), weight side, and hip and shoulder tilt.
3. Scale a skeleton to the character's head count. Note the keypoint format the control model expects (for example 18-keypoint body, 21 per hand) and confirm left and right sides.
4. Set one camera height and lens feel for the sheet unless the use requires otherwise. Record it.
5. Write the generation input per pose: identity references, pose skeleton, extra control (depth for foreshortened limbs, hand keypoints for gestures), prompt, control strength and end step. Keep seeds and references fixed; change only the pose.
6. Generate (Codex) or hand off the specs (Claude fallback).
7. Run checks per pose: black-fill silhouette at about 80 px tall, balance (neck pit over the support base), finger count, prop hand, identity locks.
8. Fix failures with targeted inpaints or a hand pass. Reroll the whole image only if the pose itself is wrong.

## Output

```
# Pose sheet: <character>
Reference: <path>   Head count: <n>   Camera: <height, angle>
Identity locks: <face>, <silhouette>, <palette>, <costume shapes x3>, <prop + hand>

## Pose <n>: <name>
Intent: <one line>
Line of action: <C | S | diagonal>, weight on <left | right | split>
Hips / shoulders: <tilt directions>
Skeleton: <format>, notes: <key joints, side check>
Extra control: <depth | hand | none>
Prompt: <text>
Settings: strength <x>, end at <y>% of steps, seed <s>
Image: <path or "not generated: Claude fallback">
Checks: silhouette <pass/fail>, balance <pass/fail>, hands <pass/fail>, prop hand <pass/fail>, identity <pass/fail>

## Open issues
- <pose>: <problem> -> <suggested fix or agent to route to>
```

## Done when

- [ ] Every pose has intent, line of action, weight side, and camera recorded.
- [ ] Skeleton proportions match the character's head count.
- [ ] Prop is in the correct hand in every pose.
- [ ] Every pose passes the black silhouette test, or the failure is listed in Open issues.
- [ ] Identity locks pass in every pose, or the failure is listed.
- [ ] Settings are noted as starting values where they were not tuned.
