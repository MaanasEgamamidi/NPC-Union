---
name: vfx-impact-spec-sheet
description: Turns a gameplay VFX request into a timed, layered, budgeted and accessibility-checked spec sheet. Use before building any hit, telegraph or burst effect.
owner: vfx-artist
disable-model-invocation: true
argument-hint: "[effect name, engine, frame rate, camera]"
---

# VFX impact spec sheet

A repeatable procedure for specifying one gameplay effect so an artist or engineer can build it and others can sync to it.

## Inputs

- Effect name and what triggers it.
- Engine, render pipeline and version. Ask if missing.
- Target frame rate and platforms. Ask if missing; assume 60 fps and say so.
- Camera type (2D side view, top-down, third person, first person).
- Background brightness range where the effect appears.
- Expected worst case: how many instances on screen at once.
- What the effect must communicate (source, target, strength, threat or not).

## Steps

1. Write one purpose line: who caused it, what it means, and whether it is a threat.
2. Classify priority: critical (threat, telegraph), feedback (player hit confirm), or ambient. Ambient gets the lowest budget and opacity.
3. Build the timing table in frames at the target frame rate. Split anticipation, impact and dissipation. Put the peak in the first 1 to 3 impact frames. Make dissipation longer than the peak.
4. For telegraphs, set the fill duration equal to the gameplay wind-up and the shape equal to the hitbox. Get both numbers from the game designer, do not invent them.
5. List layers (core, sparks, debris, smoke, decal, light, camera). For each, choose blend mode based on background brightness: additive only on dark backgrounds, alpha or premultiplied with a dark rim on bright ones.
6. Set counts, sizes and lifetimes per layer. Check flipbook sizes: frame resolution should be close to the largest on-screen size, not above it.
7. Write the budget: particles per instance, max instances, replacement rule when the cap is reached, estimated overdraw layers at the closest camera distance, distance cull or LOD rule, and bounds for GPU systems.
8. Run a desaturated check: describe how the effect reads in greyscale. If it relies only on hue, add a value or shape difference.
9. Write accessibility variants: shake amplitude scale (0 to 100%), flash rule (no more than three flashes per second, no full-screen flashes, avoid saturated red flashes), and a reduced-clutter version.
10. Add engine notes using the engine's own module or node names. Mark any name not checked against current docs as UNVERIFIED.
11. List hand-offs: impact frame for animator and sfx-designer, custom materials for shader-artist, hit-stop decision for game-designer.

## Output

```markdown
# VFX spec: <effect name>

Purpose: <one line>. Priority: <critical | feedback | ambient>.
Engine: <engine, pipeline, version>. Frame rate: <fps>. Camera: <type>.

## Timing (frames)
| Phase | Start | End | What happens |
|---|---|---|---|
| Anticipation | | | |
| Impact | | | |
| Dissipation | | | |

## Layers
| Layer | Blend | Count | Size | Lifetime (f) | Value/colour note |
|---|---|---|---|---|---|

## Budget
- Particles per instance:
- Max instances / replacement rule:
- Overdraw estimate at closest distance:
- Cull / LOD rule:
- GPU bounds:

## Readability
- Greyscale check:
- Shape language (threat vs friendly):

## Accessibility
- Shake: <trauma per event>, scaled by player setting.
- Flash: <rule>.
- Reduced clutter: <variant>.

## Engine notes
- <notes, UNVERIFIED where unchecked>

## Hand-offs
- animator: impact frame <n>
- sfx-designer: sync frame <n>, tail <n> frames
- shader-artist: <material requests or none>
- game-designer: <hit-stop / telegraph values needed>
```

## Done when

- [ ] Timing table is in frames at a stated frame rate, and dissipation is longer than the peak.
- [ ] Every layer has a blend mode justified by background brightness.
- [ ] Budget states a per-instance cap, an instance cap and a replacement rule.
- [ ] The greyscale check is written and the effect does not rely on hue alone.
- [ ] Flash rule keeps under three flashes per second and has no full-screen flash on routine events.
- [ ] Shake is scaled by a player setting.
- [ ] Telegraph duration and shape came from gameplay values, not guesses.
- [ ] Unchecked engine names are marked UNVERIFIED.
