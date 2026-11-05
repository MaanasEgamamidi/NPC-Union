---
name: game-ui-kit-slice-pass
description: Spec, build and check a game UI art kit (9-slice panels, button states, icons, font atlas, scaling) so it hands off to engine work with exact numbers.
owner: game-ui-artist
disable-model-invocation: true
argument-hint: "[engine, base resolution, style guide path, list of screens]"
---

# Game UI kit slice pass

A repeatable pass that turns a UI art request into a kit with measured slice values, a full state matrix, tested icons and a font plan.

## Inputs

- Engine and UI system, with version. If missing, ask: "Which engine and version, and which UI system (for example Unity uGUI, Godot Control, Unreal UMG)?"
- Target resolutions and aspect ratios, and the smallest screen supported.
- Pixel art or not.
- Input methods: mouse, gamepad, touch.
- Shipping languages.
- Style guide or reference frames from art-director. If none exist, ask for three reference images or stop and route to art-director.
- The list of screens and HUD elements in scope.

## Steps

1. Write the scaling rule. Pixel art: pick a base canvas that divides the main targets by whole numbers and state how leftover pixels are handled (bars or extra canvas). Non-pixel: pick the authoring size (largest shipped output or vector) and the scale mode.
2. For each panel, measure the thickest corner detail and set slice borders L/T/R/B in px to cover it plus 1-2 px of plain edge. Choose stretch, tile or tile-fit per axis based on whether the edge has a repeating pattern.
3. Set content margins separately from slice borders, so text and children clear the inner bevel.
4. Build a test sheet with each panel at its smallest and largest real size. Look for smeared ornaments, half-tiles and visible seams at 1x.
5. Set atlas padding: 2 px or more with edge extrusion for filtered UI; point filtering and no mipmaps for pixel art.
6. List every interactive control and draw five states: normal, hover, focused/selected, pressed, disabled. Confirm focus is visible in greyscale.
7. Size buttons and labels to the longest shipping language string, not English.
8. Draw icons on their display grid. Run the silhouette test (fill solid black, compare) and the greyscale test. Add a non-colour cue to any category that uses colour (rarity, buff/debuff, team).
9. Spec fonts per role: family, size, atlas type (bitmap, SDF, MSDF), character set, fallback per language, licence status.
10. Check contrast: 4.5:1 for body text, 3:1 for large text, UI components and focus indicators. For HUD over gameplay, test on the brightest and darkest scenes.
11. Look up the engine's import field names for the user's version before writing them into the spec. Mark anything not checked UNVERIFIED.
12. If running on Codex, generate the art from the spec. If not, write image prompts and mark the art as pending.

## Output

```markdown
# UI kit: <game> / <screen set>

## Scaling
- Base canvas: <w x h>, scale mode: <mode>, integer: <yes/no>
- Leftover pixels: <bars / extended canvas>
- Safe area: <rule or user slider>
- Filtering: <point / bilinear>, mipmaps: <on/off>, atlas padding: <px>, extrude: <yes/no>

## Panels
| File | Size px | Slice L/T/R/B | Content margin L/T/R/B | Axis mode H/V | Tested sizes |
|------|---------|---------------|------------------------|---------------|--------------|

## State matrix
| Control | Normal | Hover | Focused | Pressed | Disabled | Greyscale focus OK |
|---------|--------|-------|---------|---------|----------|--------------------|

## Icons
| Name | Grid px | Silhouette unique | Non-colour cue | File |
|------|---------|-------------------|----------------|------|

## Fonts
| Role | Family | Size | Atlas type | Character set | Fallback | Licence checked |
|------|--------|------|------------|---------------|----------|-----------------|

## Contrast checks
| Pair | Ratio | Target | Pass |
|------|-------|--------|------|

## Open items
- <agent>: <what they need to check>
- UNVERIFIED: <field names or facts not checked>
```

## Done when

- [ ] Every panel has slice borders, content margins and axis modes in px, and a test at smallest and largest size.
- [ ] No corner ornament crosses a slice line.
- [ ] Every interactive control has all five states, and focus reads in greyscale.
- [ ] Buttons fit the longest shipping string.
- [ ] Every icon passes the silhouette test at its display size.
- [ ] No meaning is carried by hue alone.
- [ ] Contrast pairs are listed with ratios that meet the targets.
- [ ] Font atlas type, character set and fallback are set for every language.
- [ ] Engine field names were checked against docs for the stated version, or marked UNVERIFIED.
- [ ] Open items name the agent who owns them.
