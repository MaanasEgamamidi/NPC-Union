---
title: Anime cel-shaded art style
tags: [art-style, anime, cel-shading, toon, npr, 2d-look-3d]
sources: [https://en.wikipedia.org/wiki/Cel_shading, https://en.wikipedia.org/wiki/Limited_animation, https://en.wikipedia.org/wiki/Guilty_Gear_Xrd, https://en.wikipedia.org/wiki/Dragon_Ball_FighterZ, https://en.wikipedia.org/wiki/Genshin_Impact, https://en.wikipedia.org/wiki/Ni_no_Kuni:_Wrath_of_the_White_Witch, https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_The_Wind_Waker, https://en.wikipedia.org/wiki/Hi-Fi_Rush, https://www.gdcvault.com/play/1022031/GuiltyGearXrd-s-Art-Style-The]
last_verified: 2026-11-05
---

# Anime cel-shaded art style

Flat bands of light and shadow, controlled ink lines, and motion timed like hand-drawn animation. Applies to 2D sprites and to 3D rendered to look 2D. All links below returned HTTP 200 on 2026-11-05; details about each game come from general knowledge and should be checked against the linked page before quoting in public docs.

## Reference games

| Game | Link | What to study |
|---|---|---|
| Guilty Gear Xrd (Arc System Works, 2014) | https://en.wikipedia.org/wiki/Guilty_Gear_Xrd | The benchmark for 3D that reads as 2D: edited face normals, per-vertex shadow thresholds, stepped animation with no interpolation, per-shot model cheats. |
| Dragon Ball FighterZ (Arc System Works, 2018) | https://en.wikipedia.org/wiki/Dragon_Ball_FighterZ | Matching a specific TV anime model sheet in 3D; dramatic camera supers; line weight on large muscular shapes. |
| Genshin Impact (miHoYo, 2020) | https://en.wikipedia.org/wiki/Genshin_Impact | Anime characters under a free orbit camera in an open world; how character shading is kept separate from more painterly environments; hair highlight bands. |
| Ni no Kuni: Wrath of the White Witch (Level-5, with Studio Ghibli animation) | https://en.wikipedia.org/wiki/Ni_no_Kuni:_Wrath_of_the_White_Witch | Film-anime softness: fewer hard outlines, painted backgrounds, warm palette; how in-engine scenes sit next to hand-drawn cutscenes. |
| The Legend of Zelda: The Wind Waker (Nintendo, 2002) | https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_The_Wind_Waker | Early cel-shading on limited hardware; big readable shapes, expressive oversized eyes, stylized VFX shapes (smoke, water) drawn as flat forms. |
| Hi-Fi Rush (Tango Gameworks, 2023) | https://en.wikipedia.org/wiki/Hi-Fi_Rush | Cel look with comic-style accents at action game frame rates; animation and VFX synced to music beats; halftone and speed-line accents. |

Talk: "GuiltyGearXrd's Art Style: The X Factor Between 2D and 3D", GDC 2015. The [presentation slides](https://www.ggxrd.com/Motomura_Junya_GuiltyGearXrd.pdf) document vertex-normal editing and per-vertex shading thresholds.

## Palette rules

- Every material gets a lit color and a hand-picked shadow color. Shadows shift hue (skin toward rose or mauve, whites toward cool lavender or blue), not toward grey or black.
- Keep shadow value contrast moderate: shadows read as a second flat color, not darkness. Very dark shadows look like a horror or noir style instead.
- Saturated accent colors on characters, slightly lower saturation on backgrounds so characters pop.
- Highlights are few and hard-edged: one eye highlight shape, one hair band, small metal glints.
- Outline color can be a darkened version of the local fill rather than pure black for a softer TV-anime feel; pure black reads harder, closer to comics.

## Shape rules

- Large, simple shapes with clear silhouettes. Hair as grouped clumps, not strands.
- Faces: large eyes, small nose (often a single line or tiny shadow), small mouth that changes shape a lot. Nose and mouth shapes change by view angle.
- Hands and feet slightly enlarged in action poses. Perspective is exaggerated on purpose in attacks.
- Clothing folds as a few decisive shadow shapes, not many small wrinkles.

## Technical constraints

- 3D: shading via a 1D ramp or step function on N·L; two tones baseline, three at most.
- Face normals must be edited or transferred from a proxy shape, or shadows will form blotches.
- Per-vertex shadow threshold (vertex color channel) lets artists force areas into light or shadow.
- Outlines: inverted hull (cheap, per-vertex width, fails on split normals unless smoothed normals are stored separately) or screen-space edges on depth and normals (any mesh, but less artistic control and more shimmer at low resolution). Scale hull width by camera distance.
- Inner lines painted into textures with axis-aligned UVs stay crisp.
- Animation: anime timing is 24 fps with drawings on twos (12 per second) or threes (8). Step key poses in 3D; keep gameplay-critical motion at full rate when input feel matters.
- Anti-aliasing and post effects (bloom, depth of field, motion blur) soften lines; test them early and restrict or tune them.
- 2D sprites: keep line weight consistent across scaled sprites by drawing at final display size or using a separate line layer.

## Image-prompt recipe

Describe visual traits only. Do not name living artists or studio staff.

```
<subject and pose>, anime cel-shaded style, flat two-tone shading with a sharp shadow edge,
hand-picked colored shadows (rose skin shadows, cool lavender cloth shadows), clean dark outline of
consistent weight, slightly thicker outer silhouette, large expressive eyes with a single hard white
highlight, hair in simple grouped clumps with one glossy highlight band, simple painted background
with lower saturation, no gradients on characters, no photorealistic texture, no film grain, <camera angle>, <aspect ratio>
```

Variants: add "softer painted backgrounds, warm afternoon light, minimal outlines" for a film-anime look; add "dramatic perspective, speed lines, impact frames" for fighting-game action.

## Common pitfalls

- Default face normals: blotchy shadows on cheeks and nose under rotation.
- Soft ramps or wide terminator bands: reads as posterized 3D, not cel.
- PBR specular and roughness on skin or cloth: plastic look.
- Grey or black shadows: muddy, lifeless palette.
- Outlines that do not scale with distance: thick blobs on far characters, hairlines on close-ups.
- Full 60 fps interpolation on everything: reads as CG; stepped holds only where they suit the moment.
- Scene lights hitting faces from bad angles: give characters their own light direction.
- Environments shaded with the same hard ramp as characters: busy and noisy; simplify or paint them.
- Copying a specific show's character designs: study the rules, not the characters.
