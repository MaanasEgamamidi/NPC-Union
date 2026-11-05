---
title: Neon vector and glowing wireframe
tags: [art-style, neon, vector, wireframe, bloom, arcade, hdr]
sources: [https://en.wikipedia.org/wiki/Vector_monitor, https://en.wikipedia.org/wiki/Asteroids_(video_game), https://en.wikipedia.org/wiki/Battlezone_(1980_video_game), https://en.wikipedia.org/wiki/Tempest_(video_game), https://en.wikipedia.org/wiki/Star_Wars_(1983_video_game), https://en.wikipedia.org/wiki/Vectrex, https://en.wikipedia.org/wiki/Geometry_Wars:_Retro_Evolved, https://en.wikipedia.org/wiki/Rez_(video_game), https://en.wikipedia.org/wiki/Thumper_(video_game), https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html]
last_verified: 2026-11-05
---

# Neon vector and glowing wireframe

Thin bright lines on a dark field. The look comes from vector displays, where an electron beam drew lines directly instead of scanning a raster. Modern games recreate it with emissive lines, additive blending, and bloom.

Link status: all Wikipedia and W3C links below returned HTTP 200 on 2026-11-05 except Tempest, which was rate limited and is marked `UNVERIFIED`. Page contents were not read in full; game facts here are limited to widely documented basics.

## Reference games

| Game | Link | What to study |
|---|---|---|
| Asteroids (Atari, 1979) | https://en.wikipedia.org/wiki/Asteroids_(video_game) | Monochrome vector outlines. How few line segments a readable ship, rock, and saucer need. |
| Battlezone (Atari, 1980) | https://en.wikipedia.org/wiki/Battlezone_(1980_video_game) | First-person 3D wireframe. Horizon silhouettes and radar as depth and orientation cues with very few lines. |
| Tempest (Atari, 1981) | https://en.wikipedia.org/wiki/Tempest_(video_game) `UNVERIFIED` (link rate limited during check) | Color vector display. Lanes converging toward a vanishing point give depth; level color changes signal progress. |
| Star Wars (Atari, 1983) | https://en.wikipedia.org/wiki/Star_Wars_(1983_video_game) | Color 3D wireframe at speed. Trench sequences show how parallel lines sell motion. |
| Vectrex (home console, 1982) | https://en.wikipedia.org/wiki/Vectrex | Built-in monochrome vector screen with plastic screen overlays to add color. A model for tinting by screen region. |
| Geometry Wars: Retro Evolved (Bizarre Creations, 2005) | https://en.wikipedia.org/wiki/Geometry_Wars:_Retro_Evolved | Modern glow and particle density. Deforming background grid as feedback. How to keep a player readable among many enemies. |
| Rez (United Game Artists / Sega, 2001) | https://en.wikipedia.org/wiki/Rez_(video_game) | Wireframe and abstract shapes tied to music. Visual feedback synced to player input. |
| Thumper (Drool, 2016) | https://en.wikipedia.org/wiki/Thumper_(video_game) | High-speed track with glowing surfaces and rhythm hits. How motion and flashes are paced to a beat. Not a pure vector game; study pacing and contrast. |

Background on the hardware: https://en.wikipedia.org/wiki/Vector_monitor

## Palette rules

- Background near black (around #05050A to #0A0A14). A faint grid or dust layer at 2 to 5 percent brightness adds depth.
- 3 to 5 gameplay hues, one role each. Common set: cyan, magenta, yellow-green, orange. Keep red for danger only.
- Every line has a near-white core and a colored halo. Saturation lives in the halo.
- White is reserved for the hottest events: explosions, hits, beat accents.
- Check gameplay hues under color-vision-deficiency simulation. Pair hue differences with shape differences so color is never the only cue.

## Shape rules

- Outlines only, or outlines with very dark fills. Large bright fills break the look and bloom badly.
- Give each role a silhouette family: curves for the player, sharp polygons for enemies, small diamonds or stars for pickups.
- Brighten vertices and endpoints slightly to mimic beam dwell on vector hardware.
- Particles are short segments stretched along velocity, not round dots.
- Decide once whether wireframes hide back edges. All edges visible reads retro; hidden-line reads solid. Do not mix in one scene.

## Technical constraints

- Additive blending for lines, halos, and particles.
- HDR render target. Bloom threshold above 1.0 in linear space so only emissive lines bloom.
- Cap bloom radius at about 1 percent of screen height in dense scenes, then test at peak enemy count.
- Core line width about 1 to 2 px at 1080p, scaled by output height. Fixed pixel widths fail across 800p handhelds and 4K.
- Thin lines alias under motion. Prefer MSAA or analytic line anti-aliasing. TAA can smear lines into trails.
- HUD text should be excluded from bloom or kept below the threshold.
- Additive overdraw is the main cost. Budget particle counts against fill rate on the weakest target.

## Image-prompt recipe

Describe traits, never people. Template:

"[subject] drawn as thin glowing outline strokes on a near-black background, near-white line cores with [cyan / magenta / yellow-green] halos, additive light where lines cross, brighter vertices at corners, faint perspective grid at low brightness, no filled surfaces, soft bloom limited to the lines, sharp clean geometry, [camera angle]."

Add for 3D: "wireframe mesh with [all edges visible / back edges hidden], lines converging toward a vanishing point."
Add for action: "short spark segments stretched along motion direction."
Avoid in prompts: "photoreal", "film grain", heavy "lens flare", and any living artist's name.

## Common pitfalls

- Bloom on everything. A low threshold turns the frame into haze and makes UI unreadable.
- Too many hues. Every object glowing a different color removes role coding.
- Saturated lines with no white core look dim and flat.
- Alpha blending instead of additive makes crossings dark and muddy.
- Hairline lines at 4K and blobs on handhelds from fixed pixel widths.
- Full-screen flashes above three per second, or large saturated red flashes. See WCAG 2.3.1: https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html
- Round particle sprites that break the line-drawn illusion.
- Testing only in empty scenes. Readability fails at peak density.
