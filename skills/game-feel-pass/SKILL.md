---
name: game-feel-pass
description: "Measured game-feel pass: input buffering, coyote time, hit-stop, camera shake and latency, with values in ms and frames. Use before playtests or when controls feel off."
owner: gameplay-programmer
disable-model-invocation: true
argument-hint: "[mechanic or build to tune, e.g. 'player jump and melee']"
---

# Game feel pass

Change one value at a time, measure it, write it down.

## Inputs

- The mechanic(s) and the complaint, in players' words if available ("floaty", "eats inputs").
- Engine, fixed step rate, display rates players use.
- A build that can expose tuning values at runtime.

## Steps

1. Record a baseline: capture 30 seconds of play with an on-screen frame counter and input display. Note current values for every item in the table below.
2. Check sampling first: confirm input is read every rendered frame and consumed in the fixed step. Fix this before tuning anything else.
3. Measure input-to-photon latency if a high-speed camera (240 fps phone is enough) is available: count frames from button press LED or finger contact to first visible motion. Record vsync and buffering mode.
4. Walk the checklist, one change at a time, replaying the same input sequence:
   - Jump buffer: start 120 ms, range 80-150 ms.
   - Coyote time: start 100 ms, range 80-150 ms.
   - Variable jump cut: start 0.45, range 0.3-0.6.
   - Apex hang gravity multiplier: start 0.5 while |vy| under ~10% of jump velocity.
   - Hit-stop: light 30-50 ms, heavy 80-120 ms; freeze attacker and target, keep buffering on.
   - Camera shake: trauma model (shake = trauma squared, trauma decays about 1.0 per second), max offset 4-8% of screen height for heavy hits, max rotation 2-3 degrees; respect a reduce-motion setting.
   - Attack input buffer: 100-200 ms for combo follow-ups.
5. Convert every value to frames at 60 Hz and the highest display rate in the table, to check no value is shorter than one frame.
6. Run a 5-minute blind A/B with at least two people if possible: old vs new values, ask which felt more responsive.
7. Write the final values into the data asset, not the code.
8. Flag anything that changes difficulty (bigger coyote makes gaps easier) to level-designer and game-designer.

## Output

```markdown
## Game feel pass: <mechanic>, <date>
Latency (press to motion): before <ms>, after <ms>, method <camera/tool>

| Parameter | Before | After | Frames @60 | Frames @<max Hz> | Why |
|---|---|---|---|---|---|

A/B result: <n testers, preference>
Difficulty side effects: <list, who was told>
Accessibility: reduce-motion disables/scales: <list>
```

## Done when

- [ ] Input sampling verified before tuning.
- [ ] Every changed value recorded with before/after and frame counts.
- [ ] No timing window shorter than one frame at the lowest supported rate.
- [ ] Camera shake respects a reduce-motion option.
- [ ] Values live in data, not code.
