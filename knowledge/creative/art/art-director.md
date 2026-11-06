---
title: Art direction reference
tags: [art-direction, art-bible, readability, palette, value, art-budget, review]
sources: ["https://docs.unity3d.com/Manual/class-TextureImporterOverride.html", "https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine", "https://www.khronos.org/opengl/wiki/ASTC_Texture_Compression"]
last_verified: 2026-11-05
---

# Art direction reference

Check the sources above and the project's exact engine version before quoting a format or limit.

## Readability checks (run in this order)

| # | Check | How | Fails when |
|---|---|---|---|
| 1 | Scale | View at on-screen size, native target resolution, on device if possible | Detail under about 2 screen px, or key shapes merge |
| 2 | Squint | Blur the screenshot | Player, threats, and pickups do not stand apart |
| 3 | Grayscale | Desaturate fully | Gameplay layers share a value band |
| 4 | Silhouette | Fill characters solid black on mid grey | Two roles share an outline |
| 5 | Colorblind | Simulate deuteranopia, protanopia, tritanopia | A state or team is shown by hue only |
| 6 | Motion | Watch in play at target frame rate | Effects or backgrounds hide threats |
| 7 | Compression | Review after platform compression | Banding, hue shift in gradients, lost fine detail |

## Value band template

| Band | Lightness | Default owner |
|---|---|---|
| A | 0 to 15 | Threat accents, player outline (dark ground games) |
| B | 15 to 40 | Foreground props, shadows |
| C | 40 to 70 | Background, ground planes |
| D | 70 to 85 | Midground highlights |
| E | 85 to 100 | Pickups, player highlights, UI-critical VFX |

Adjust per project; the rule is that background stays compressed in the middle and critical layers own the extremes.

## Palette ramp rules

- 4 to 7 steps per material family; more steps usually means muddier sprites.
- State shadow and highlight hue shift direction per ramp.
- Saturation rank: threats and interactables first, player second or first, environment last.
- Name off-palette colors in reviews and either add them to a ramp with a change log entry or remove them.

## Color vision deficiency

- Account for red-green colour-vision deficiencies; check current accessibility research for any prevalence figure used in a report.
- Pair hue with shape, icon, pattern, or value. Never signal team or state by red versus green alone.

## Texture compression families (check engine docs per version)

| Platform family | Common formats | Review note |
|---|---|---|
| PC and console | BC1 to BC7 | BC7 for high-quality color, BC5 for normal maps; check gradient banding |
| Mobile | ASTC, ETC2 | ASTC block size trades quality for memory; review on device |
| Web | Depends on browser and GPU support | Check the engine's web build docs |

## Platform art budget table template

| Item | Lowest target | Mid target | High target |
|---|---|---|---|
| Texture memory per scene | | | |
| Max texture size by asset class | | | |
| Texel density by asset class | | | |
| Draw calls or batches per frame | | | |
| Triangles per character class | | | |
| Bones per character | | | |
| Material variants cap | | | |
| Transparent overdraw limit | | | |

Fill with technical-lead from profiling on the lowest device. Do not copy numbers from another project.

## Review severity scale

| Severity | Meaning | Ship rule |
|---|---|---|
| Blocking | Breaks readability, the bible, or the budget | Must fix before merge |
| Should-fix | Weakens consistency, fix this milestone | Track in backlog |
| Taste | Opinion, no rule cited | Artist's choice |

## Reference

- Mitchell, Francke, Eng, "Stylization with a Purpose: The Illustrative World of Team Fortress 2", NPAR 2007 (Valve). Silhouette and value-led character readability. URL not cited here; look it up before linking.
