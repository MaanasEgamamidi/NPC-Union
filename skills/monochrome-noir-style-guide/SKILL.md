---
name: monochrome-noir-style-guide
description: Produces a monochrome or noir style sheet for a game, covering value bands, one accent colour rule, lighting ratios, grain, dither and greyscale readability checks.
owner: monochrome-noir-stylist
disable-model-invocation: true
argument-hint: "[project name, camera, accent colour or none, greyscale or 1-bit]"
---

# Monochrome noir style guide

A repeatable procedure for writing a style sheet that keeps a black-and-white game readable and consistent.

## Inputs

- Project name, genre and camera (side-on, top-down, first-person, third-person).
- Target platforms and output resolution.
- Bit depth of the look: full greyscale, high-contrast greyscale, or 1-bit dithered.
- Accent colour: none, or one hue and the single meaning it carries.
- The five to ten gameplay elements that must read at a glance (player, enemies, hazards, interactives, pickups, UI).
- Existing art or references, if any.

If camera, bit depth or accent meaning is missing, ask once. If still missing, assume side-on camera, full greyscale, no accent, and write the assumptions at the top of the sheet.

## Steps

1. Read `knowledge/art-styles/monochrome-noir.md` and pick two or three reference games that match the camera and bit depth. Note what to borrow from each.
2. Define value bands on a 0 to 100 lightness scale: background, play space, characters, interactives, UI. Keep at least 20 points between any two bands that gameplay must separate.
3. Assign every gameplay element from the inputs to a band and a silhouette rule. Flag any two elements that share both band and silhouette.
4. Write the accent rule: the hue, its one meaning, its target lightness (different from the surrounding grey), its frame budget (under about 10 percent of pixels in normal play), and the non-colour backup cue (shape, pattern, motion or icon).
5. Set lighting rules: key-to-fill ratio (start at 1:8 for noir, no flatter than 1:4), shadow colour (true black or a lifted near-black), rim light use, and how many dominant light sources per shot (usually one).
6. Set post-processing order: grade and tonemap first, then greyscale conversion with Rec. 709 luminance weights, then grain, then dither if 1-bit. Name the tonemapper type (filmic or ACES-style) and leave engine specifics to `technical-artist`.
7. Set texture rules: texture detail stays within its band, fine noise is avoided on gameplay elements, and patterns used as cues are big enough to survive the smallest target screen.
8. For 1-bit: choose ordered (Bayer) or error-diffusion dither, state how the pattern is stabilised for moving cameras, and require integer scaling.
9. Set UI rules: keylines or backing plates on every HUD element, and the accent used in UI only if it carries the same meaning as in the world.
10. Write three image prompts using the recipe in the knowledge file: one environment, one character, one gameplay moment. Describe visual traits only and name no living artists.
11. Write the readability test plan: a desaturated screenshot pass, a blur test (squint), and a colour-blind simulation of the accent.

## Output

```markdown
# <Project> monochrome style sheet

Assumptions: <any assumed inputs, or "none">
Look: <full greyscale | high contrast | 1-bit dithered>
References: <game>: <what to borrow>; <game>: <what to borrow>

## Value bands (0 = black, 100 = white)
| Band | Range | Contents |
|------|-------|----------|
| Background | <a-b> | ... |
| Play space | <a-b> | ... |
| Characters | <a-b> | ... |
| Interactives | <a-b> | ... |
| UI | <a-b> | ... |

## Gameplay elements
| Element | Band | Silhouette rule | Conflicts |
|---------|------|-----------------|-----------|

## Accent rule
Hue: <name and hex, or none> | Meaning: <one meaning> | Lightness: <value> | Budget: <percent of frame> | Backup cue: <shape/pattern/motion>
Never used for: <list>

## Lighting
Key to fill: <ratio> | Shadows: <true black or lifted value> | Rim light: <rule> | Sources per shot: <n>

## Post-processing order
1. Grade and tonemap (<type>)
2. Greyscale (Rec. 709 luminance)
3. Grain: <luminance-only, strength, size relative to output>
4. Dither: <none | Bayer | error diffusion>, stabilised by <method>

## Texture and UI rules
- ...

## Image prompts
1. Environment: ...
2. Character: ...
3. Gameplay moment: ...

## Readability tests
- [ ] Desaturated screenshot: all gameplay elements identifiable
- [ ] Blur test at 25 percent size: player and threats still separate
- [ ] Accent checked under protanopia and deuteranopia simulation

## Handoffs
- lighting-artist: ...
- technical-artist: ...
```

## Done when

- [ ] Every gameplay element from the inputs has a band and a silhouette rule.
- [ ] No two elements that must be told apart share both band and silhouette.
- [ ] The accent has exactly one meaning, a lightness different from its surroundings, and a non-colour backup cue, or the sheet says there is no accent.
- [ ] Post-processing order puts greyscale after tonemapping and grain after greyscale.
- [ ] Image prompts describe visual traits only and name no living artists.
- [ ] Assumptions are written at the top if any input was missing.
