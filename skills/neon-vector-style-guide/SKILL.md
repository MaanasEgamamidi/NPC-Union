---
name: neon-vector-style-guide
description: Produce a neon vector and glowing wireframe style sheet for a project, covering palette roles, line and glow settings, shapes, motion limits, and image prompts.
owner: neon-vector-stylist
disable-model-invocation: true
argument-hint: "[project name, platforms, camera type, short game description]"
---

# Neon vector style guide

Builds a one-page style sheet for a game using a neon vector or glowing wireframe look.

## Inputs

- Project name and a one-line game description.
- Target platforms and output resolutions (for example 1080p PC, 800p handheld, 4K TV).
- Camera: 2D, 2.5D, or 3D.
- Peak on-screen object count during the busiest moment.
- Gameplay roles that need color coding (player, enemy, hazard, pickup, UI).
- Accessibility requirements, especially flashing and color vision.

If any input is missing, ask for it in one message. If platforms are unknown, assume 1080p and 4K and say so.

## Steps

1. Read `knowledge/art-styles/neon-vector.md`. Pick two or three reference games that match the camera and density, and note what to study in each.
2. Assign palette roles. Choose 3 to 5 hues, give each one role, reserve white for the hottest events. Set the background value (near black, faint grid at 2 to 5 percent).
3. Check palette separation: each pair of gameplay hues must differ in hue by a clear margin and in luminance, and must still be tellable under deuteranopia and protanopia simulation. Swap hues that fail.
4. Set line rules: core width at 1080p, the scaling rule by output height, halo width, and whether corners and endpoints get extra brightness.
5. Set glow rules: HDR on, bloom threshold above 1.0 linear, bloom radius cap as a share of screen height, additive blending for lines and particles.
6. Set shape rules: silhouette families per role (for example, player uses curves, enemies use sharp polygons), whether wireframes hide back edges, and particle form (velocity-stretched segments).
7. Set motion and flash limits: no more than three full-screen flashes per second, small saturated red flashes only, and a reduce-flashing option plus a bloom intensity slider.
8. Set UI rules: HUD text excluded from bloom or rendered below the threshold, one UI hue, minimum text size at the smallest target resolution.
9. Write two to four image prompts that describe visual traits only. Never name living artists or copy a specific game's assets.
10. Mark any fact you could not check as `UNVERIFIED`.

## Output

```markdown
# <Project> neon vector style sheet

## References
- <Game> (<link>): study <one thing>.

## Palette
| Role | Hex | Notes |
|---|---|---|
| Background | #0A0A12 | faint grid at <n>% |
| Player | | |
| Enemy | | |
| Hazard | | |
| Pickup | | |
| UI | | |
| Hot event | #FFFFFF | explosions only |

## Lines and glow
- Core width: <n> px at 1080p, scaled by output height.
- Halo width: <n> px. Corner and endpoint boost: <yes/no>.
- Blending: additive. HDR: on. Bloom threshold: <value>. Bloom radius cap: <n>% of screen height.
- Anti-aliasing: <method>.

## Shapes
- Player: <silhouette rule>. Enemies: <rule>. Particles: <rule>.
- Wireframe edges: <all edges / hidden-line>.

## Motion and flashing
- Flash limit: 3 per second. Options: reduce flashing, bloom slider.

## UI
- <rules>

## Image prompts
1. <prompt>

## Open questions and UNVERIFIED items
- <item>
```

## Done when

- [ ] Every gameplay role has one hue, and the palette has no more than five gameplay hues.
- [ ] Line width is given at 1080p with a scaling rule for other resolutions.
- [ ] Bloom threshold, radius cap, and blending mode are stated.
- [ ] Flash limits and accessibility options are listed.
- [ ] At least two real reference games are cited with links from the knowledge file.
- [ ] Image prompts describe traits only and name no living artists.
- [ ] Unchecked facts are marked `UNVERIFIED`.
