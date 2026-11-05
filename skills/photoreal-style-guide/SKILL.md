---
name: photoreal-style-guide
description: Builds a photorealistic PBR style sheet for a project, with albedo ranges, map rules, texel density, lookdev setup, and prompts.
owner: photoreal-stylist
disable-model-invocation: true
argument-hint: "[project name, engine and version, camera type, reference folder]"
---

# Photoreal style guide

Produces one style sheet that art, tech art, and concept work can all check against.

## Inputs

- Project name and a one-line setting description.
- Engine and version, target platforms, and frame budget. If missing, ask; if still unknown, write "engine TBD" and skip engine-specific rows.
- Camera type and typical distance to props (first-person, third-person, top-down).
- Grade: documentary grounded, cinematic graded, or product clean. Ask if not given.
- At least three reference photos, ideally shot with a gray card or color checker. If none exist, ask `moodboard-curator` for a board first.

## Steps

1. Read `knowledge/art-styles/photoreal.md` and pick two or three reference games closest to the setting and grade.
2. Write a look statement of three sentences: setting, light, and grade.
3. Sample the reference photos for key materials (ground, walls, foliage, skin, metal). Record measured albedo in sRGB, then clamp every value to the 30 to 240 range for dielectrics and 180 to 255 for raw metals.
4. Set roughness ranges per material family and name the wear pattern for each (edge wear, crevice grime, contact polish).
5. Fix metalness at 0 or 1 and list the only places mid values are allowed.
6. Choose texel density per distance band and write it as a table. Note the debug view the team will use to check it.
7. Look up the engine's normal map convention, light units, and default tonemapper in current docs. Mark anything you could not confirm as UNVERIFIED.
8. Specify the lookdev scene: gray ball, chrome ball, color checker, one overcast HDRI, one hard sun at a stated lux value.
9. If scans are planned, write the capture and delighting protocol.
10. Write three image prompts with the recipe from the knowledge file: visual traits only, no living artist names.
11. If the runtime has Codex image generation, render the three prompts and one swatch sheet. If not, say so in the sheet and leave the prompts ready.
12. Write the pass/fail checklist and save the sheet as `docs/style/<project>-photoreal.md`.

## Output

```markdown
# <Project> photoreal style sheet

## Look statement
<3 sentences>

## References
| Game | What to take | Link |

## Material values
| Family | Albedo sRGB | Roughness | Metalness | Wear pattern |

## Texel density
| Distance band | px/cm | Max texture size |

## Engine conventions
- Normal map green: <DirectX or OpenGL> (<verified or UNVERIFIED>)
- Light units: <...>
- Tonemapper: <...>

## Lookdev scene
<objects, HDRI, sun lux>

## Scan protocol
<capture, color reference, delighting, cleanup>

## Prompts
1. <prompt>
2. <prompt>
3. <prompt>

## Checklist
- [ ] Albedo within range, no baked light
- [ ] Metalness 0 or 1 except allowed blends
- [ ] Roughness varies with wear
- [ ] Texel density matches table
- [ ] Passes lookdev under both lights
```

## Done when

- [ ] Every material family has albedo, roughness, metalness, and a wear pattern.
- [ ] Texel density table covers every camera distance band in the game.
- [ ] Engine facts are either sourced or marked UNVERIFIED.
- [ ] Prompts describe visual traits only and name no living artist.
- [ ] The sheet says whether images were generated or only prompts were written.
- [ ] The file is saved under `docs/style/`.
