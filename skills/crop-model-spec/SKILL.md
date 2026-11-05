---
name: crop-model-spec
description: Build a crop growth, soil and yield table for a farming or cooking game, scaled from real agronomy and marked with sources.
owner: agriculture-food-expert
disable-model-invocation: true
argument-hint: "<crop list> [season length] [biome or region] [cozy or sim]"
---

# Crop model spec

Produces a crop table and soil rules a designer can drop into a farming game.

## Inputs

- Crop list (and livestock, if any).
- Season length and what one game day represents.
- Biome or real region.
- Tone: cozy (forgiving) or simulation (realistic).
If the region is missing, assume temperate mid-latitude with four seasons and say so.

## Steps

1. For each crop, note its real season (warm-season or cool-season, autumn-sown or spring-sown) and family (cereal, legume, brassica, root, nightshade).
2. Choose a growth clock: days (cozy) or growing degree days with a base temperature (sim). Write the base temperature per crop and label values you could not source UNVERIFIED.
3. Split growth into 3-5 stages (seed, sprout, vegetative, flowering, ripe) with stage lengths scaled to the season.
4. Set inputs as caps: water factor, nitrogen factor, temperature factor; yield multiplier = the minimum of them.
5. Soil: per-plot nitrogen 0-100. Cereals draw most, leafy crops less, legumes add. Add a slow soil-health stat that changes over seasons.
6. Pest pressure: +1 per consecutive season of the same family on a plot, reset by rotating; define the yield penalty.
7. Harvest window: days ripe before quality drops, and how fast.
8. Yields: take real relative yields from FAOSTAT or USDA NASS for the region, convert to game units, and record the scale factor. Never quote one global yield as universal.
9. Livestock (if any): feed in, product out, care needs; meat costs more feed than grain.
10. Cautions: animal welfare and slaughter depiction, food safety, allergy or diet claims, real brand names.

## Output

```
## Crop spec: <game>
Assumptions: <day length, region, tone>
| Crop | Family | Season | Clock (days/GDD, base °C) | Stages | Water | N change | Window | Yield (game units) |
|------|--------|--------|---------------------------|--------|-------|----------|--------|--------------------|
Soil rules: <N draw/add, soil health rate>
Pest rule: <increment, penalty, reset>
Livestock: | Animal | Feed in | Product out | Care |
Sources and scale factors: <dataset, URL, value, factor>
Safe simplifications: <list>
Trust breakers: <list>
Cautions / hand-offs: <list>
UNVERIFIED: <items>
```

## Done when

- [ ] Every crop is in the right season and family.
- [ ] Inputs are caps (minimum), not additive bonuses.
- [ ] Rotation changes the soil and pest numbers.
- [ ] Yields cite a dataset and scale factor, or are marked UNVERIFIED.
- [ ] Food-safety and allergy text is flavour, not advice.
- [ ] No unlicensed real brand names.
