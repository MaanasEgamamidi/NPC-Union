---
name: hand-drawn-style-guide
description: Produce a hand-drawn 2D style sheet for a project with line, palette, shape, timing, and memory rules plus an image prompt recipe.
owner: hand-drawn-stylist
disable-model-invocation: true
argument-hint: "[project name, platforms, lowest resolution, reference games]"
---

# Hand-drawn style guide

A repeatable procedure that turns a project brief into a hand-drawn 2D style sheet.

## Inputs

- Project name and genre.
- Target platforms and the lowest supported output resolution.
- Camera zoom: how tall a main character is on screen in pixels.
- Character count and moves per character.
- Production capacity: drawings per week the team can finish.
- 2 to 3 reference games the team likes and 1 to avoid.
- Engine, and whether it supports separate line and fill layers.

If resolution, character height, or a reference is missing, ask for it. Do not guess these three.

## Steps

1. Read `knowledge/art-styles/hand-drawn.md`. Pick the 2 closest reference games from it and note what to borrow from each.
2. Set the source scale: 2x or 4x the final size. Compute brush sizes so each line weight is a whole number of pixels at the lowest resolution.
3. Define line rules: outer contour, inner detail, and background line weight (background lighter or thinner than characters). Choose line color: pure ink, colored line, or textured pencil.
4. Build the palette: paper or base tone, ink tone, 1 shadow tone per material, accents. Give hex values and a role for each. Reserve the highest saturation for the player and hazards.
5. Define shape language: primary shapes per character type, silhouette test at gameplay size (fill solid black, it must still read).
6. Write the timing table: for each move type, ones or twos, drawings count, and where smears go. Default to twos.
7. Compute memory: drawings per character x frame size x 4 bytes uncompressed, then note the compressed format to confirm with `technical-artist`. Flag any character over budget.
8. Write the image prompt recipe from the knowledge file template, filled with this project's traits. Describe visual traits only, never name living artists.
9. List 5 or more do and don't rules drawn from the pitfalls section.
10. Mark any number or source you could not check as `UNVERIFIED`.

## Output

```markdown
# <Project> hand-drawn style sheet

## References
- <Game>: borrow <trait>. Avoid <trait>.

## Lines
| Use | Final px | Source px | Color | Notes |
|---|---|---|---|---|

## Palette
| Role | Hex | Notes |
|---|---|---|

## Shapes
- Hero: <shapes>. Silhouette test: <pass/fail notes>.
- Enemies: <shapes>.
- Backgrounds: <shapes, contrast rule>.

## Timing
| Move | Ones/twos | Drawings | Smears | Boil |
|---|---|---|---|---|

## Memory budget
| Character | Drawings | Frame size | Uncompressed MB | Target format |
|---|---|---|---|---|

## Image prompt recipe
<filled prompt>

## Do and don't
- Do: ...
- Don't: ...

## Open questions / UNVERIFIED
- ...
```

## Done when

- [ ] Every line weight is a whole pixel value at the lowest resolution.
- [ ] Every palette entry has a hex value and a role.
- [ ] The timing table covers idle, move, attack, hit, and death (or the project's equivalents).
- [ ] Memory budget is computed per character with the formula shown.
- [ ] The prompt recipe names no living artists.
- [ ] At least 2 reference games from the knowledge file are cited.
- [ ] Unchecked facts are marked `UNVERIFIED`.
