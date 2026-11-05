---
title: Anime artist reference
tags: [anime, cel-shading, expression-sheet, visual-novel, model-sheet, character-art]
sources: ["https://www.renpy.org/doc/html/ (UNVERIFIED)", "https://www.renpy.org/doc/html/layeredimage.html (UNVERIFIED)"]
last_verified: 2026-11-05
---

# Anime artist reference

Working heuristics for anime-style characters, VN sprites and backgrounds. Numbers are practical ranges, not fixed rules; adjust to the project's art bible. Engine-specific facts are UNVERIFIED until checked against the linked docs.

## Cel shading tones

| Zone | Tones | Notes |
|---|---|---|
| Base | 1 | Flat local color |
| Form shadow | 1 | Hue-shifted, not grayed |
| Occlusion shadow | 0 or 1 | Under chin, inside hair mass, under bangs, armpits |
| Highlight | 0 or 1 | Hair band, eye catchlight, glossy materials only |

Pitfall: a third shadow tone or soft gradients on characters drift toward a painted look.

## Line weight

| Line type | Relative weight |
|---|---|
| Outer silhouette | 3 |
| Interior form | 2 |
| Detail (lashes, creases, strand splits) | 1 |

Colored lines (tinted toward the fill) read softer; black lines read harder. Choose one per project.

## Proportions by register (approximate)

| Register | Head heights |
|---|---|
| Chibi | 2 to 3 |
| Younger teen | 5 to 6 |
| Standard adult | 7 to 7.5 |
| Stylized tall adult | 8+ |

Face: eye line at or just below head midpoint; eye gap about one eye width; nose as a small mark or shadow wedge.

## Starter expression set

neutral, happy, sad, angry, surprised, embarrassed, thinking, one character-specific face. Overlays as separate layers: blush, sweat drop, tears, shadow-over-eyes.

## VN sprite checklist

- [ ] One fixed canvas size for every variant of a character
- [ ] Same head anchor and baseline across all files
- [ ] Knee-up or mid-thigh crop for dialogue sprites; head in the upper third of the screen
- [ ] Expressions as face layers or full variants, named `<char>_<outfit>_<expression>`
- [ ] Overlays separate, with a stated layer order
- [ ] Engine layering approach confirmed in the engine docs (Ren'Py layered images: UNVERIFIED)

## On-model checklist (per generation)

- [ ] Eye color and height-to-width ratio match the sheet
- [ ] Hair part side and accessory side not mirrored
- [ ] Hair clump count and ahoge direction match
- [ ] Head heights match the register
- [ ] Shadow tone count matches the style rule
- [ ] Outfit closures and colors match the hex chart

## Backgrounds

- Painted finish with more value range than characters
- Lower contrast than the character's line art at the sprite's depth
- Keep the light direction consistent with the character lighting
