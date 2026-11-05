---
name: logo-wordmark-lockup
description: Build a game wordmark and lockup set from a title and chosen styles, with small-size shrink tests and a platform export list.
owner: logo-designer
disable-model-invocation: true
argument-hint: "[game title] [chosen styles] [target platforms]"
---

# Logo wordmark lockup

Turns a title and a style direction into a tested wordmark plus every lockup variant a game needs for stores and screens.

## Inputs

- Exact title and subtitle, with capitalisation. Ask if missing; do not guess spelling.
- Chosen styles (two or three), ideally a style board from art-director. Ask which style matters most if there are more than three.
- Target platforms. Default: Steam plus one mobile or console icon.
- Known constraints: existing fonts, brand colours, licence budget, localised markets.

## Steps

1. Count characters including spaces. If over about 12, plan a stacked lockup from the start.
2. Scan the title for small-size traps: "rn", "cl", "Il1", "vv", repeated round letters, and very short words that may vanish. Note each one.
3. Write the logo idea in one line and pick the hero word (the most distinctive word in the title).
4. Assign style jobs: skeleton (letter structure), surface (texture and finish), accent (one custom glyph or mark). One style per job.
5. Draft three black-only type directions: single line, stacked with hero word enlarged, and stacked with one custom glyph or ligature.
6. Shrink test each direction at 120 x 45, 184 x 69, and a 64 px square. Blur test at about 4 px radius. Record pass or fail per size. Drop failures or fix them (heavier strokes, wider tracking, all caps, removing the subtitle).
7. Apply surface and colour to the surviving direction. Keep fine texture only on variants wider than about 300 px.
8. Build the lockup set: primary, horizontal, small-capsule, icon glyph (no text unless it is one letter), single-colour light, single-colour dark, library logo with baked outline or plate.
9. If image generation is available, produce comps, then check every letter against the title for misspelling. Treat generated lettering as reference; rebuild the final in vector.
10. Re-check store sizes on the official pages listed in `knowledge/creative/screens-effects/game-logo-wordmarks.md`. Mark any size you could not check as UNVERIFIED.
11. List font licences, trademark checks, and localisation questions as open items with an owner agent.

## Output

```markdown
# Logo package: <Title>

**Logo idea:** <one line>
**Hero word:** <word>

| Job | Style | Treatment |
|---|---|---|
| Skeleton | | |
| Surface | | |
| Accent | | |

## Type spec
- Typeface(s) and licence: 
- Weight / tracking: 
- Custom glyphs: 

## Shrink tests
| Direction | 120x45 | 184x69 | 64px icon | Blur | Fix |
|---|---|---|---|---|---|

## Lockups
| Variant | Use | Aspect | Min size | File |
|---|---|---|---|---|

## Colour
- Full colour: 
- Single colour light / dark: 
- Backing plate or outline for busy art: 

## Exports
| Platform asset | Size | Format | Source checked (date) |
|---|---|---|---|

## Open items
- [ ] <item>: <owner agent>
```

## Done when

- [ ] Title spelling in every comp and export matches the input exactly.
- [ ] Hero word reads at 120 x 45 in the small-capsule lockup.
- [ ] Icon glyph works inside a rounded or circular mask with no text cut off.
- [ ] Every lockup variant in the table has a file name and minimum size.
- [ ] Single-colour versions exist and work on both light and dark.
- [ ] Every store size has a source link and check date, or is marked UNVERIFIED.
- [ ] Every typeface has a named licence, or is flagged to game-legal-advisor.
- [ ] A vector master is listed, not only PNGs.
