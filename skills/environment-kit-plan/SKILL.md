---
name: environment-kit-plan
description: Plan a tileset, parallax stack, or 3D modular kit with grid, piece list, value key, dressing, and budget. Use before building a level environment.
owner: environment-artist
disable-model-invocation: true
argument-hint: "[zone, engine, 2D or 3D, camera, platform]"
---

# Environment kit plan

A repeatable procedure for turning a level brief into a buildable environment kit.

## Inputs

- Zone or biome name and one-line mood.
- Engine and version (Unity, Godot, Unreal, other).
- 2D or 3D, and camera type (side, top-down, isometric, third person).
- Target platform and frame budget (for example 60 fps on Switch).
- Base resolution and tile size (2D), or base grid unit in metres (3D).
- Player character's dominant value and colour.

If any are missing, ask once. If still missing, use defaults: 1080p target, 640x360 base, 32 px tiles, 2 m grid, 60 fps, and state them in the Summary.

## Steps

1. Write the Summary line with all inputs and any defaults used.
2. Build a value key in greyscale: foreground, playfield, near background, far background, sky. Keep at least 20 L* between player and immediate background.
3. Choose the structure:
   - 2D tiles: pick 16-tile (edges only) or 47-tile blob (edges plus corners) per terrain type. Confirm the engine's terrain or rule-tile mode.
   - 2D parallax: list layers with scroll factors on a falloff (1.0, 0.5, 0.25, 0.1, 0.0), plus optional foreground above 1.0.
   - 3D kit: list pieces as whole multiples of the grid unit, with pivot at a grid corner and connection rules.
4. Plan dressing: hero props per screen or room, cluster types of 3 to 5, decal list, clear-lane width (at least player collision width).
5. Set the budget: atlas count and size, materials, estimated draw calls, overdraw target, transparent layer count.
6. Run the checklist in `${CLAUDE_PLUGIN_ROOT}/knowledge/creative/art/environment-artist.md` and mark any unchecked engine-specific item UNVERIFIED.
7. List handoffs by agent name.

## Output

```markdown
# Environment kit: <zone>

**Summary:** <engine/version>, <2D|3D>, <camera>, <platform @ fps>, <tile px | grid m>. Defaults used: <list or none>.

## Value key
| Band | Target L* | Hue shift | Notes |
|---|---|---|---|
| Foreground | | | |
| Playfield | | | |
| Near BG | | | |
| Far BG | | | |
| Sky | | | |

## Structure
| ID | Piece or layer | Size or scroll factor | Bitmask or pivot | Notes |
|---|---|---|---|---|

## Dressing
- Hero props: <count per screen/room, list>
- Clusters: <types, 3 to 5 items>
- Decals/blends: <list>
- Clear lane: <width>

## Budget
| Item | Target | Estimate |
|---|---|---|
| Atlases | | |
| Materials | | |
| Draw calls | | |
| Overdraw | | |
| Transparent layers | | |

## Handoffs
- <agent>: <what they need>

## UNVERIFIED
- <items>
```

## Done when

- [ ] Every input is stated or a default is named.
- [ ] Value key has five bands and the player-to-background gap is at least 20 L*.
- [ ] Every tile set names its scheme (16 or 47) and engine mode.
- [ ] Every 3D piece is a whole multiple of the grid unit with a corner pivot.
- [ ] Parallax factors decrease with distance and foreground coverage is noted.
- [ ] Budget table has a target and an estimate on every row.
- [ ] Handoffs name real roster agents.
- [ ] Engine-specific claims not checked are marked UNVERIFIED.
