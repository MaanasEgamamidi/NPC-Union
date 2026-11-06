---
title: Monochrome and noir art style
tags: [art-style, monochrome, noir, black-and-white, high-contrast, accent-colour, 1-bit, dithering]
sources: [https://en.wikipedia.org/wiki/Limbo_(video_game), https://en.wikipedia.org/wiki/Inside_(video_game), https://en.wikipedia.org/wiki/MadWorld, https://en.wikipedia.org/wiki/Return_of_the_Obra_Dinn, https://en.wikipedia.org/wiki/Ghost_of_Tsushima, https://en.wikipedia.org/wiki/The_Saboteur, https://en.wikipedia.org/wiki/World_of_Horror, https://en.wikipedia.org/wiki/Minit_(video_game), https://en.wikipedia.org/wiki/Rec._709]
last_verified: 2026-11-05
---

# Monochrome and noir art style

Black and white, high contrast, and at most one accent colour. Value does all the work that hue does in other styles. Facts about each game below were checked against its Wikipedia page on 2026-11-05 unless marked UNVERIFIED.

## Reference games

| Game | Link | What to study |
|------|------|---------------|
| Limbo (Playdead, 2010) | https://en.wikipedia.org/wiki/Limbo_(video_game) | Greyscale side-on world with film grain and lighting. Study how black silhouettes on a lighter, foggy background carry all gameplay reads, and how depth comes from atmospheric lightening of far layers. |
| Inside (Playdead, 2016) | https://en.wikipedia.org/wiki/Inside_(video_game) | Mostly monochromatic environment. Study restrained near-greys with soft volumetric light. The player character wears a [red shirt](https://media.gdcvault.com/gdc2017/GameNarrativeReview/John%20Myres_GDCNarrativeContest2016.pdf), a prominent colour cue. |
| MadWorld (PlatinumGames, 2009) | https://en.wikipedia.org/wiki/MadWorld | High-contrast black and white with red, used for blood. Study the hard ink look and how one accent with one meaning (violence) stays legible in fast combat. |
| Return of the Obra Dinn (Lucas Pope, 2018) | https://en.wikipedia.org/wiki/Return_of_the_Obra_Dinn | First-person 3D in a 1-bit dithered style that mimics early Macintosh games. Study dither stability under camera motion and edge lines for readability at 1 bit. |
| Ghost of Tsushima (Sucker Punch, 2020) | https://en.wikipedia.org/wiki/Ghost_of_Tsushima | Kurosawa mode: a black-and-white filter with film grain and adjusted audio. Study what breaks when a colour game is desaturated after the fact, such as cues that relied on hue. |
| The Saboteur (Pandemic Studios, 2009) | https://en.wikipedia.org/wiki/The_Saboteur | Occupied areas are black and white, with exceptions such as irises, city lights, blood and resistance symbols. Study colour as a gameplay state (occupied versus liberated) rather than decoration. |
| World of Horror (Paweł Koźmiński, 2020 early access) | https://en.wikipedia.org/wiki/World_of_Horror | 1-bit pixel art made in Microsoft Paint. Study how hatching and pattern fills replace tone at very low resolution. [Steam](https://store.steampowered.com/app/913740/WORLD_OF_HORROR/) lists its early access release as February 20, 2020. |
| Minit (2018) | https://en.wikipedia.org/wiki/Minit_(video_game) | Small black-and-white pixel adventure. The [developers describe](https://store.steampowered.com/app/1503530/minit_fun_racer) the black-and-white aesthetic. Study pure 2-tone sprites with no dither. |

## Palette rules

- Work on a 0 to 100 lightness scale. Assign bands: background, play space, characters, interactives, UI. Keep at least 20 points between bands that gameplay must separate.
- Convert to greyscale with Rec. 709 luminance weights (0.2126 R, 0.7152 G, 0.0722 B), not an RGB average.
- Pure black and pure white are the strongest tools; reserve them. Using 0 and 100 everywhere removes the room for emphasis.
- One accent hue, one meaning, a small share of the frame (roughly under 10 percent in normal play). The accent needs a lightness jump from its surroundings as well as a hue change.
- Pair the accent with a non-colour cue (shape, pattern, motion), since the accent is the only colour channel and fails completely for players who cannot see that hue.
- Optional tint (sepia, blue-black, green phosphor) is applied to the whole frame after greyscale, never per object, or it becomes a second accent.

## Shape rules

- Silhouette first. Characters, enemies and hazards must be identifiable as flat black shapes at gameplay distance.
- Large, simple shadow shapes. Noir reads from big blocks of black, not from many small shadows.
- Hard light edges: venetian blinds, window frames, door gaps and street lamps give graphic shapes that also guide the eye.
- Fine surface texture collapses to mid-grey at small sizes; keep detail inside a band and away from gameplay outlines.
- In 1-bit, use outlines or a contrasting rim on any object that sits against a dithered field of similar density.

## Technical constraints

- Post-process order: grade and tonemap, then greyscale, then grain, then dither. Converting before tonemapping crushes shadows.
- Use a filmic or ACES-style tonemapping curve with a defined toe to keep shadow gradients.
- Film grain: luminance-only, scaled to output resolution, strongest in mid-tones.
- Dithering: ordered (Bayer) is temporally stable; error diffusion is finer in stills but shimmers in motion. Stabilise screen-space patterns for moving cameras.
- Lock 1-bit and pixel looks to integer scaling to avoid moire and uneven pixels.
- Lighting: one dominant key, key-to-fill around 1:8 for noir, no flatter than about 1:4. Use rim light to separate dark shapes from dark backgrounds.
- Compression: banding in smooth grey gradients is more visible than in colour. Add grain or dither before encoding video and test streamed captures.

## Image-prompt recipe

Describe visual traits only. Do not name living artists.

`[subject], black and white, high contrast, single [accent colour] accent on [one element only], hard single key light from [direction], deep black shadows in large shapes, rim light separating silhouette from background, [film grain | 1-bit ordered dither pattern | clean flat tones], [camera: side-on | top-down | low angle], simple readable silhouette, no other colours`

Example: `a detective standing in a rain-soaked alley, black and white, high contrast, single red accent on a neon sign only, hard key light from the upper left through venetian blinds, deep black shadows in large shapes, rim light on the coat, fine luminance film grain, low angle, simple readable silhouette, no other colours`

## Common pitfalls

- Mid-grey on mid-grey: enemies and floors sharing a band.
- Accent creep: the accent spreads to UI, pickups and effects until it means nothing.
- Accent with no value jump: invisible for players with red-green colour blindness.
- Desaturating a colour game late and finding that cues relied on hue (see Ghost of Tsushima Kurosawa mode as a study case).
- Error-diffusion dither shimmer on moving 3D cameras.
- Grain applied before greyscale, giving coloured noise, or grain that is the same at every resolution.
- White HUD over bright scenes with no keyline or backing plate.
