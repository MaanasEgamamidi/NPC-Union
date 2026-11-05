---
name: input-map
description: Builds a per-device control map with remapping, hold/toggle alternatives and prompt rules. Use when defining or auditing a control scheme.
owner: controls-designer
disable-model-invocation: true
argument-hint: "[game/genre and target devices]"
---

# Input map

## Inputs

- Action list (or the design doc to extract it from), target devices (keyboard/mouse, gamepad, touch), genre.
- If the action list is missing, extract verbs from the design doc and confirm them.

## Steps

1. List every player action. Rate frequency (constant, often, rare) and urgency (under time pressure or not).
2. Assign the easiest-reach inputs to constant and urgent actions: face buttons and triggers on pads; WASD-adjacent keys and mouse buttons on PC; thumb zones on touch.
3. Check genre conventions (e.g. south face button jumps in most platformers) and break them only with a reason.
4. Mark every held action. Add a toggle or automatic alternative as a setting, unless holding is the mechanic (e.g. charge).
5. Remove critical actions from stick clicks; give chords a single-input alternative.
6. Make every action remappable, per device, at the action level. Note conflicts the remap screen must catch.
7. Touch: targets at least 48 x 48 dp (Android guidance); floating virtual stick; nothing essential under the thumbs.
8. Define prompt rules: glyphs follow the last device used, switching on first input.
9. Add settings: stick dead zones (inner/outer), invert Y per stick, sensitivity, vibration on/off.

## Output

```markdown
# Input map: <game>
| Action | Freq/Urgency | KB/M | Gamepad | Touch | Hold→Toggle? | Remappable | Notes |
|---|---|---|---|---|---|---|---|
## Settings
- Dead zone inner/outer: <defaults, ranges>; Invert Y (per stick); Sensitivity; Vibration
## Prompt rule
- <glyph switching rule>
## Conflicts to catch on remap
- <pairs>
```

## Done when

- [ ] Every action has a binding on every target device.
- [ ] Every held action has a toggle/auto option or a stated reason it cannot.
- [ ] No critical action is only on a stick click.
- [ ] All actions are remappable in-game.
- [ ] Touch targets meet 48 dp minimum.
