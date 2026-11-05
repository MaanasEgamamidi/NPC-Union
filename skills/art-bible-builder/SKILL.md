---
name: art-bible-builder
description: Builds or revises a game art bible with value bands, palette ramps, shape rules, and a per-platform art budget. Use at preproduction or after a style drift review.
owner: art-director
disable-model-invocation: true
argument-hint: "[project name, platforms, camera, references or current bible path]"
---

# Art bible builder

A repeatable procedure for producing an art bible that other art agents can check their work against.

## Inputs

- Target platforms and the lowest-spec device.
- Camera type and the player's on-screen size at the target resolution.
- Genre and the elements the player must always read (player, threats, pickups, hazards, interactables).
- References: a current build, screenshots, or a moodboard from moodboard-curator.
- Existing bible, if revising, and the list of locked decisions.

If any are missing, ask once in a single list. If still missing, write the assumption into the Assumptions section and continue.

## Steps

1. Write at most 3 visual pillars, each tied to a gameplay or tone goal. Cut any pillar that does not change a decision.
2. Define value bands: split 0 to 100 lightness into bands and assign each gameplay layer to one. Reserve the extreme bands for gameplay-critical elements.
3. Build palette ramps: for each material family, list 4 to 7 hex steps, the hue shift direction for shadows and highlights, and the max steps an asset may use.
4. Set saturation rank: list which layers may use the highest saturation. Environment never outranks threats.
5. Write shape language: primary shapes per faction or role, and one silhouette test rule (solid fill on mid grey at gameplay size).
6. Write edge, line, and lighting rules: outline weight in screen pixels at target resolution, key light direction, rim light use.
7. Set technical art rules with technical-lead: texel density per asset class, max texture size, compression format per platform, draw call or batch target, triangle budget per character class, material variant cap. Mark any engine-specific value UNVERIFIED until checked against the engine version docs.
8. Add a do and a don't reference for every rule, with the reason.
9. Run the bible against 3 existing assets. Any rule that cannot be checked yes or no gets rewritten.
10. Add the dated change log entry and the owner for each section.

## Output

```markdown
# <Project> art bible v<N> (<YYYY-MM-DD>)

## Assumptions
- ...

## Pillars
1. <pillar>: <gameplay reason>

## Value bands
| Band | Lightness range | Layer | Notes |

## Palette ramps
| Family | Steps (hex, dark to light) | Shadow shift | Highlight shift | Max steps per asset |

## Saturation rank
1. <layer, highest>

## Shape language
| Role | Primary shape | Silhouette rule |

## Edges, lines, lighting
- Outline: <px at resolution>
- Key light: <direction>

## Platform budget
| Item | <Platform A> | <Platform B> | Source or UNVERIFIED |
| Texture memory per scene | | | |
| Max texture size by class | | | |
| Texel density by class | | | |
| Draw calls or batches per frame | | | |
| Triangles per character class | | | |
| Material variants cap | | | |

## Rules
| ID | Rule | Do | Don't | Reason | Checker |

## Change log
| Date | Rule ID | Change | Decided by |
```

## Done when

- [ ] Every rule has an ID, a do and don't reference, a reason, and can be checked yes or no.
- [ ] Value bands assign every gameplay-critical layer to a reserved band.
- [ ] Every ramp has hex values and hue shift directions.
- [ ] The platform budget table has a value or UNVERIFIED for every cell, for the lowest-spec target included.
- [ ] The bible was tested against at least 3 real assets and the results recorded.
- [ ] technical-lead has signed off the budget section, or the open questions are listed.
- [ ] The change log has today's entry.
