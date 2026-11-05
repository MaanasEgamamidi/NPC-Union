---
title: Concept art for game screens and key art
tags: [concept-art, key-art, title-screen, image-generation, prompts, thumbnails]
sources: [https://partner.steamgames.com/doc/store/assets, https://www.w3.org/TR/WCAG21/]
last_verified: 2026-11-05
---

# Concept art reference

Used by `concept-artist`. Check current store sizes and project-specific requirements against the linked sources before use.

## Formats to plan for

| Use | Typical aspect | Notes |
|---|---|---|
| Title screen background | 16:9 (1920x1080 common) | Also check a 4:3 and 16:10 safe crop if the game supports them |
| Menu background | 16:9 | Low detail behind menu column; loops for minutes |
| Store capsules and key art | Several sizes, wide and vertical | Get exact sizes from [Steamworks graphical assets docs](https://partner.steamgames.com/doc/store/assets); sizes change |
| Character portrait | Fixed per project | Same crop line, eye height, light direction across the cast |
| Parallax background | Wide, per plane | Generate or plan separable sky, far, mid, near planes |

## Prompt order

1. Subject
2. Action or pose
3. Setting
4. Composition and camera (shot size, lens, angle, which third)
5. Lighting (time of day, key direction)
6. Style
7. Constraints (no text, no logo, empty area for UI)

Model parameters (aspect ratio flags, seed, negative prompt support, reference image weight) differ by provider and version. Check the model's own docs each time.

## Iteration rounds

| Round | Goal | Count | Rule |
|---|---|---|---|
| 1 Explore | Find compositions | 12 to 24 | Grayscale or low detail; judge at thumbnail size |
| 2 Narrow | Pick a direction | 3 kept | Change one variable per variant |
| 3 Refine | Final candidates | 1 or 2 | Target aspect, crop check for every format |
| 4+ | Usually a brief problem | | Stop and rewrite the brief |

## Readability checks

- [ ] Silhouette reads as solid black at about 64 px tall.
- [ ] 3 or 4 value groups; focal point has the highest contrast.
- [ ] Logo and UI zones are low detail and one middle value.
- [ ] Text over the image can reach 4.5:1 contrast ([WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/#contrast-minimum) for normal text, subject to its exceptions).
- [ ] Image still works when cropped to the smallest required format.
- [ ] No tangents (edges touching) at the focal point.

## Common generation failures

| Failure | Fix |
|---|---|
| Model ignores subject | Move subject to the front; cut style tags |
| Garbled text or logo | Never request text; leave space and overlay later |
| Bad hands | Hide or simplify hands in pose; fix in paintover |
| Cast looks inconsistent | Lock crop, eye height, light direction, seed, and style line |
| Busy area behind UI | Ask for "empty sky" or "soft fog" in that third |
| Cannot repeat a good result | Record model, version, seed, and settings every round |

## Licence check

Image model terms of use and output rights differ by provider and change over time. Check the current terms before shipping any generated image. Mark as UNVERIFIED until checked.
