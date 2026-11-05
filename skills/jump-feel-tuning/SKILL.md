---
name: jump-feel-tuning
description: Sets and tests jump and movement feel values (buffer, coyote time, gravity, dead zones) in frames. Use when a platformer or action game feels floaty or eats inputs.
owner: controls-designer
disable-model-invocation: true
argument-hint: "[tick rate and the complaint, e.g. '60 Hz, jumps get eaten']"
---

# Jump feel tuning

## Inputs

- Fixed simulation rate (Hz), current jump code or values, the complaint, input devices.
- If the tick rate is unknown, ask; every value here is in frames at that rate.

## Steps

1. Measure first: record button-to-screen latency if possible, and log presses with timestamps to see whether inputs are dropped or merely late.
2. Check input reading: presses must be latched between render frames and consumed in the fixed update.
3. Add a jump buffer timer (set on press, consumed when a jump becomes legal). Start around 4 to 8 frames at 60 Hz and tune.
4. Add coyote time (refilled while grounded, counts down in the air). Start in the same range; zero it when a jump fires.
5. Variable height: on release while rising, multiply vertical velocity by a cut factor (start 0.5).
6. Optional apex hang: reduce gravity near the peak while jump is held (Celeste halves it).
7. Optional corner correction: nudge the player a few pixels around a ceiling corner instead of stopping the jump.
8. Pads: radial inner dead zone, rescaled output, outer dead zone so full deflection is reachable on worn sticks.
9. Test each knob with a scripted room and three players; record drops per 20 attempts and a fair/unfair rating.
10. Expose all values in data, not code.

## Output

```markdown
# Feel sheet: <game> @ <Hz>
| Knob | Value (frames/factor) | Range | Test | Result |
|---|---|---|---|---|
| Jump buffer | | | | |
| Coyote time | | | | |
| Release cut | | | | |
| Apex gravity | | | | |
| Corner correction (px) | | | | |
| Dead zone inner/outer | | | | |
## Rules (pseudo-code)
<buffer/coyote logic with reset conditions>
## Measured latency
<ms or "not measured">
```

## Done when

- [ ] Every value is stated in frames at a named tick rate (or as a factor).
- [ ] Coyote timer resets when a jump fires.
- [ ] Dropped-press count is 0 in the buffer test.
- [ ] Values live in data files.
