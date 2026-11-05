---
name: isometric-style-guide
description: Builds an isometric or dimetric style sheet for a project: angle, tile size, height unit, lighting, sorting, occlusion, facings and a prompt block.
owner: isometric-stylist
disable-model-invocation: true
argument-hint: "[project name, 2D or 3D, target resolution, genre]"
---

# Isometric style guide

A repeatable procedure that turns a project brief into one isometric or dimetric style sheet the art and engine teams can share.

## Inputs

- Project name and genre.
- 2D sprites or 3D models with an orthographic camera.
- Pixel art or high-resolution art.
- Target screen resolution and any existing tile size.
- Whether the camera rotates, and in what steps.
- Character facing count wanted (4 or 8) and whether characters are asymmetric.
- Whether characters walk behind walls or tall props.

If any are missing, ask them in one message. If the user does not answer, assume: 2D pixel art, 640x360, fixed camera, 4 facings, characters do go behind walls. State every assumption at the top of the sheet.

## Steps

1. Choose the projection. Pixel art: 2:1 dimetric (26.565 degree lines). Vector or high-resolution 2D: 2:1 dimetric or true isometric (30 degree lines). 3D: write the camera as yaw 45 degrees plus pitch 35.264 degrees (true isometric) or pitch 30 degrees (2:1 look), orthographic.
2. Set the footprint. Pick a power-of-two width (32, 64 or 128) with height half of it. Decide the edge convention (overlap or abut) and the 1 px trim if any. Check how many tiles fit across the target width.
3. Set the height unit. Choose one pixel height per level (commonly half the footprint width) and list the heights of a step, a wall, a door and a character in levels.
4. Fix the light. Choose the corner, then assign value steps for top, left and right faces (for example top base, left minus 1 step, right minus 2 steps).
5. Write outline and shape rules: outline color policy, which edges get highlights, allowed line angles (2:1 only, plus vertical).
6. Write the sorting rule: foot point for characters, per-tile slicing or (x + y) back-tile key for large objects, and a z term for stacked levels.
7. Choose the occlusion approach: cutaway walls, fade, or silhouette. Note what art it requires (split roofs, half-height wall variants).
8. Set facings and mirroring: 4 or 8, which are mirrored, which must be drawn because of asymmetric details.
9. List camera rotation needs: none, or 4 views per prop, or 3D only.
10. Write the image-prompt block from `knowledge/art-styles/isometric.md` with the project's numbers and palette words filled in.
11. List test tiles and a 6x6 seam test to build before production.

## Output

```markdown
# <Project> isometric style sheet

Assumptions: <list or "none">

## Projection
- Type: <2:1 dimetric | true isometric>
- Line angle: <26.565 | 30> degrees
- 3D camera (if any): orthographic, yaw <45>, pitch <30 | 35.264>

## Grid
- Footprint: <W>x<H> px, edge convention: <overlap | abut>, trim: <none | 1 px>
- Tiles across screen: <n> at <resolution>
- Height unit: <px> per level
- Heights in levels: step <n>, wall <n>, door <n>, character <n>

## Light and value
- Light corner: <upper-left | upper-right>
- Face steps: top <base>, left <-n>, right <-n>
- Outline: <rule>

## Shapes
- Allowed lines: <rule>
- Silhouette rules: <rule>

## Sorting and occlusion
- Sorting: <rule>
- Occlusion: <cutaway | fade <opacity> | silhouette>, art needed: <list>

## Characters
- Facings: <4 | 8>, mirrored: <list>, drawn: <list>
- Camera rotation: <none | 4 views | 3D only>

## Image prompt
<filled recipe>

## Test before production
- [ ] <tile list>
- [ ] 6x6 seam test
- [ ] character walks behind tallest wall

## Handoffs
- sprite-artist: footprint, height unit, facings
- technical-artist: camera numbers, sorting rule, occlusion
- level-designer: max wall height, occlusion approach
```

## Done when

- [ ] Projection type and exact angle are stated, with camera numbers if 3D.
- [ ] Footprint, edge convention and height unit are numbers, not ranges.
- [ ] Light corner and face value steps are set.
- [ ] Sorting rule covers characters, large objects and stacked levels.
- [ ] Occlusion approach is chosen and its art needs are listed.
- [ ] Facing count and mirroring are decided.
- [ ] Image-prompt block names visual traits only, no living artists.
- [ ] Assumptions are listed at the top.
- [ ] Handoff lines name the receiving agents.
