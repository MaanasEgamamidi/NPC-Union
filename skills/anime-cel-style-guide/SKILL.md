---
name: anime-cel-style-guide
description: Produces an anime cel-shaded style sheet for a project: tones, outlines, face normals, palette pairs, frame holds, and image prompts.
owner: anime-cel-stylist
disable-model-invocation: true
argument-hint: "[project name, 2D or 3D, camera, platform, 1-3 reference games]"
---

# Anime cel style guide

Turns a project brief into a one-page anime cel style sheet that artists, the technical artist, and image generation can all follow.

## Inputs

- Project name and genre.
- Medium: 2D sprites, 3D, or 2D-look 3D.
- Camera: fixed side view, fixed angle, orbit, first person.
- Target platform and rough frame budget.
- 1 to 3 reference games or shows, and what the team likes about each.
- Scope: characters only, or characters plus environments.

If medium, camera, or references are missing, ask for them. If the team has no references, propose two from `knowledge/art-styles/anime-cel.md` and confirm before continuing.

## Steps

1. Read `knowledge/art-styles/anime-cel.md`. Pick the closest reference game per input reference and note one thing to copy and one thing to avoid.
2. Set tone count: 2 tones for characters by default; 3 only if a deep-occlusion tone is needed. Write the terminator band width.
3. Set the face rule. 3D: normal transfer from a proxy shape, or hand-edited normals, plus a per-vertex shadow threshold channel. 2D: list fixed shadow shapes for front, three-quarter, and profile.
4. Set outlines. Choose inverted hull, screen-space edge detection, or drawn lines. Give width in pixels at 1080p for a full-body character, the distance scaling rule, and where inner lines live (texture or geometry).
5. Build the palette table: for each key material (skin, hair, primary cloth, metal, environment ground) give a lit color and a hand-picked shadow color with a hue shift. Note the rim and highlight color.
6. Set the animation timing policy: what runs on ones, twos, or threes, and what stays at full rate for gameplay feel.
7. Set lighting: character light direction source (scene or per-character), and how the environment shading differs from characters.
8. Write the image-prompt recipe using visual traits only, no living artist or staff names.
9. Write the "do not" list from the knowledge file pitfalls that apply to this camera and medium.
10. Mark any fact you could not check `UNVERIFIED`.

## Output

```markdown
# <Project> anime cel style sheet

## Look in one line
<e.g. Two-tone TV-anime characters with ink silhouettes, softer painted backgrounds>

## References
| Game | Link | Copy | Avoid |
|---|---|---|---|

## Shading
- Tones: <2 or 3>, terminator band: <value>
- Ramp: <1D texture / step function>
- Light source: <per-character vector / scene light>

## Faces and hair
- Face normals: <method>
- Shadow threshold channel: <vertex color channel / none>
- Hair highlight: <band shape and rule>

## Outlines
- Method: <hull / screen-space / drawn>
- Width: <px at 1080p>, scaling: <rule>
- Inner lines: <texture / geometry>

## Palette
| Material | Lit | Shadow | Note |
|---|---|---|---|

## Animation timing
- Ones: <what>
- Twos: <what>
- Threes or holds: <what>

## Image-prompt recipe
<prompt text>

## Do not
- <pitfall>

## Handoffs
- technical-artist: <shader checklist>
- sprite-artist: <timing and line weight>
```

## Done when

- [ ] Every template section is filled, none left as a placeholder.
- [ ] Each reference has a real link and a copy/avoid note.
- [ ] Every palette row has a hand-picked shadow color that is not plain darkened lit color.
- [ ] Outline width is given in pixels with a scaling rule.
- [ ] Animation policy names what stays at full rate.
- [ ] The prompt names no living artist or studio staff.
- [ ] Unchecked facts are marked `UNVERIFIED`.
