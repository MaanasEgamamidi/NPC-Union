---
title: Western cartoon / toon 3D art style
tags: [art-style, toon, stylized-3d, cartoon, shading, palette]
sources: [https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_The_Wind_Waker, https://en.wikipedia.org/wiki/Fortnite, https://en.wikipedia.org/wiki/Overwatch_(video_game), https://en.wikipedia.org/wiki/Team_Fortress_2, https://en.wikipedia.org/wiki/Ratchet_%26_Clank:_Rift_Apart, https://en.wikipedia.org/wiki/Sea_of_Thieves, https://en.wikipedia.org/wiki/Psychonauts_2, https://en.wikipedia.org/wiki/Fall_Guys, https://en.wikipedia.org/wiki/Squash_and_stretch]
last_verified: 2026-11-05
---

# Western cartoon / toon 3D

Stylized, chunky, saturated 3D with exaggerated anatomy, soft rounded volumes, and readable silhouettes. It is distinct from anime cel shading: toon 3D keeps soft gradients and pushed proportions, while anime cel relies on hard two-tone shadows and thin linework.

All links below returned HTTP 200 on 2026-11-05. Descriptions of what to study are observations for art direction, not claims from the linked pages.

## Reference games

| Game | Link | What to study |
|---|---|---|
| The Legend of Zelda: The Wind Waker | https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_The_Wind_Waker | Huge heads and eyes on small bodies; flat color blocks; stylized effects (smoke, water) drawn as graphic shapes. Sits on the border with cel shading, so take its shapes, not its hard shadows. |
| Team Fortress 2 | https://en.wikipedia.org/wiki/Team_Fortress_2 | Class silhouettes readable at distance; warm vs cool team colors; painted, illustrative look with rim lighting. Valve published the NPAR 2007 paper [Illustrative Rendering in Team Fortress 2](https://steamcdn-a.akamaihd.net/apps/valve/2007/NPAR07_IllustrativeRenderingInTeamFortress2.pdf). |
| Overwatch | https://en.wikipedia.org/wiki/Overwatch_(video_game) | Hero silhouettes each with one dominant shape; hand-painted-feeling PBR with high saturation; clean, uncluttered environments that frame characters. |
| Fortnite | https://en.wikipedia.org/wiki/Fortnite | Stylized proportions that survive many skins; saturated biomes; soft, chunky building pieces readable mid-fight. |
| Ratchet & Clank: Rift Apart | https://en.wikipedia.org/wiki/Ratchet_%26_Clank:_Rift_Apart | Feature-animation-style toon at high fidelity: fur, rounded forms, exaggerated faces, squash and stretch in animation. |
| Sea of Thieves | https://en.wikipedia.org/wiki/Sea_of_Thieves | Exaggerated, slightly lopsided character proportions; painterly water and skies; chunky props with oversized details. |
| Psychonauts 2 | https://en.wikipedia.org/wiki/Psychonauts_2 | Extreme, asymmetric caricature proportions; each world with its own palette rule; shapes that tell personality. |
| Fall Guys | https://en.wikipedia.org/wiki/Fall_Guys | Simple bean silhouette with toy-like materials; candy palette; physics-driven squash and stretch. |

Principle reference: squash and stretch, https://en.wikipedia.org/wiki/Squash_and_stretch

## Palette rules

- Pick 4 to 6 world base hues at medium saturation, then reserve 2 to 4 fully saturated hues for players, enemies, or interactables only.
- Shadows shift hue (toward violet, blue, or teal) instead of darkening toward grey or black.
- Highlights shift warm and slightly desaturated; avoid pure white except for specular pings.
- Keep value contrast between character and background at least one clear step; check in greyscale.
- Limit each character to 3 main colors plus one accent.
- Team or faction colors should differ in both hue and value so they read for colorblind players.

## Shape rules

- Choose a heads-tall number per character class (often 3 to 5 for heroes) and keep it consistent.
- Exaggerate one or two traits per character; keep the rest calm.
- Shape language: circles friendly, squares sturdy, triangles dangerous; aim for roughly 70/30 dominant/secondary.
- Wide, soft bevels on all edges so forms catch a highlight and read as toys.
- Big, simple forms first; add detail only where the eye should land (face, hands, weapon).
- Silhouette test: solid black fill at about 64 px tall must still show identity and pose.
- Squash and stretch keeps volume: if height drops, width rises.

## Technical constraints

- Choose one owner of lighting: hand-painted albedo (light painted in) or shading ramps (dynamic). Both together cause double shadows.
- Hand-painted textures suit mobile and low lighting budgets; ramps suit day/night cycles and dynamic lights.
- Inverted-hull outlines roughly double vertex cost for outlined meshes and break on hard-edged normals; use smoothed normals stored in a vertex channel or skip outlines.
- Post-process edge detection outlines are cheaper on geometry but can flicker on thin detail and foliage.
- Low texel density is fine with large color blocks; avoid high-frequency noise that shimmers at distance.
- Rim light is a cheap, effective separator from background; budget it as a shader term rather than an extra light.
- Engine specifics (Unity URP, Unreal) change across versions; check current official docs before giving settings.

## Image prompt recipe

Describe visual traits only. Never name living artists.

```
chunky stylized 3D [subject], [N] heads tall, oversized [trait], rounded soft-beveled forms,
saturated flat colors with soft painted gradients, hue-shifted [color] shadows, warm rim light,
toy-like matte materials, simple readable silhouette, clean [background], three-quarter view
```

Negative cues: photorealistic skin, pores, film grain, grey shadows, thin anime linework, hard two-tone cel shadows, cluttered background.

## Common pitfalls

- Realistic micro-detail (pores, scratches, noise) on cartoon forms; it reads as uncanny.
- Grey or black-multiplied shadows that make saturated colors look dirty.
- Exaggerating every feature equally, which flattens contrast.
- Mixing proportion systems between heroes and NPCs.
- Painted lighting plus dynamic ramp lighting together (double shadows).
- Outlines everywhere, raising cost and visual noise.
- Reserved player hues leaking into the environment.
- Drifting into anime cel (hard shadows, thin lines) when the brief is western toon.
