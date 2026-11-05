---
name: anime-character-sheet
description: Builds a locked anime model sheet, color chart and expression set for one character so later generations stay on-model.
owner: anime-artist
disable-model-invocation: true
argument-hint: "[character name, use (VN sprite, portrait, key art), outfit, number of expressions]"
---

# Anime character sheet

Produces one character's reference packet: identity list, color chart, turnaround, expression set and drift check. Run it before any batch generation of a character.

## Inputs

- Character name, role, age register, and personality in 2 to 3 lines. If missing, ask the character-designer or ask the user for these.
- Target use: VN sprite, game portrait, key art. If missing, ask.
- Screen resolution and engine (for VN sprites). Default assumption: 1920x1080.
- Outfit list. Default: one outfit.
- Expression count. Default: 8.
- Any existing references or art bible. Ask whether one exists before starting.

## Steps

1. Write the identity list: 5 to 8 traits that must never change (eye color and shape ratio, hair part side, accessory side, scars or marks, outfit closures). Mark each asymmetric trait with its side, seen from the character's own left or right.
2. Draw or describe a filled black silhouette test: the hair shape alone must separate this character from the rest of the cast. Redesign if not.
3. Build the color chart: per material, base, shadow (hue-shifted), optional occlusion, optional highlight. Record hex values.
4. Set the line style: colored or black lines, and the weight ratio (outer, interior, detail).
5. Set proportions: total head heights, eye line position, eye gap in eye widths.
6. Produce the turnaround: front, three-quarter, side, back, on one canvas, same scale, lit from one direction.
7. Get approval on the turnaround before making expressions.
8. Produce expressions on the approved front or three-quarter base: same canvas, same head anchor, only the face (and hands if listed) changing. Export overlays (blush, sweat, tears) as separate layers.
9. Run the drift check on every output against the identity list. Regenerate failures from the approved base. Log each rejection.

## Output

```
# <Character> model sheet
Use: <VN sprite | portrait | key art>   Canvas: <w x h>   Anchor: <head x,y>
Line style: <colored | black>, weight ratio <outer:interior:detail>
Proportions: <n> heads, eye line <position>, eye gap <n> eye widths

## Identity list
1. ...

## Color chart
| Material | Base | Shadow | Occlusion | Highlight |
|---|---|---|---|---|

## Turnaround
front: <file>  three-quarter: <file>  side: <file>  back: <file>

## Expressions
| Tag | File | Notes |
|---|---|---|

## Overlays
| Overlay | File | Layer order |
|---|---|---|

## Drift log
| File | Failed trait | Action |
|---|---|---|
```

## Done when

- [ ] Identity list has 5 to 8 traits, with sides marked for asymmetric ones.
- [ ] Silhouette test passed.
- [ ] Every material has hex values for base and shadow, and shadows are hue-shifted.
- [ ] Turnaround approved before expressions were made.
- [ ] All expression files share one canvas size and head anchor.
- [ ] Overlays are separate layers with a stated order.
- [ ] Every output passed the drift check, and rejections are logged.
