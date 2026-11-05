---
name: layer-split-plan
description: Plans how to split one flat image into game layers: depth bands, cut types, inpaint margins, alpha settings and a JSON export manifest.
owner: layer-compositor
disable-model-invocation: true
argument-hint: "[image path or description, engine, camera travel in px]"
---

# Layer split plan

Turns one flat picture into a buildable list of layers that an artist or image tool can cut, and an engine can import without hand alignment.

## Inputs

- The source image, or a precise description with its pixel size.
- Target engine and version. Ask if missing.
- Camera: type (side scroll, vertical, fixed, top down) and total travel in px. Ask if missing; if the user does not know, assume one screen width and say so.
- Art style: pixel art (binary alpha) or painted/rendered (soft alpha).
- What moves independently: animated characters, props, UI elements.
- Output resolution and whether layers go into an atlas.

## Steps

1. List every visual element and mark it as static, scrolling or animated.
2. Group static elements that never move relative to each other into one layer. Give every independently moving element its own layer.
3. Assign each layer a depth band (sky, far, mid, play, fg, ui) and a scroll factor. Gameplay plane is 1.0.
4. For each pair of layers in front and behind, compute hidden-region margin: `abs(scroll_front - scroll_back) x camera_travel_px`, plus 8 px for filtering. Record it on the back layer.
5. Choose cut type per layer: hard edge, soft matte with trimap (note unknown band width in px), or binary pixel edge.
6. Find shadows, AO and colour spill cast by each cut-out object. Assign each to the object, a separate shadow layer, or paint-out on the background.
7. Write the inpaint list: region, layer, margin, what should be there (continue texture, extend horizon, rebuild trunk base).
8. Decide per layer: alpha convention (straight unless the engine requires premultiplied), colour space (sRGB for colour, linear for masks and depth), file format, RGB bleed under transparency in px.
9. Name layers `NN_band_object_variant`, two-digit z first.
10. For tiling planes, mark them as wrap and schedule a seam check.
11. For UI pieces, record nine-slice margins.
12. Write the manifest and the QA checks.

## Output

```markdown
# Layer split: <scene name>
Source: <file, WxH>  Engine: <name version>  Camera: <type, travel px>  Style: <pixel|painted>
Assumptions: <one line each>

## Depth table
| z | Layer | Contents | Band | Scroll | Cut | Unknown band px | Inpaint margin px | Tiles |
|---|---|---|---|---|---|---|---|---|

## Shadows and spill
| Source object | Effect | Goes to |
|---|---|---|

## Inpaint list
| Layer | Region | Margin px | Fill with |
|---|---|---|---|

## Export settings
| Layer | Format | Alpha | Colour space | RGB bleed px | Nine-slice L,R,T,B |
|---|---|---|---|---|---|

## Manifest
{"canvas":[W,H],"layers":[{"name":"","file":"","offset":[x,y],"size":[w,h],"z":0,"scroll":1.0,"blend":"normal","tile":false,"nine_slice":null}]}

## QA
- [ ] Each layer composited over magenta and black at 100 and 200 percent: no fringe
- [ ] Full camera travel scrubbed: no unpainted holes
- [ ] Tiling seams checked at 1:1
- [ ] Re-assembled from manifest matches source within 1 px
```

## Done when

- [ ] Every element in the source belongs to exactly one layer.
- [ ] Every layer has a scroll factor, cut type and z order.
- [ ] Every occluded region has an inpaint entry with a computed margin.
- [ ] Shadows and spill are assigned, none left orphaned on the background.
- [ ] Alpha convention and colour space are stated per layer.
- [ ] Names sort in draw order.
- [ ] Manifest has offset and size for every layer and parses as JSON.
- [ ] Assumptions and any UNVERIFIED engine setting names are listed.
