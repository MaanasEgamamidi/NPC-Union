---
name: ecosystem-model-spec
description: Specify a food web or population model (logistic, predator-prey, SIR, genetics) with stable parameters and a species table for a game.
owner: biology-ecology-expert
disable-model-invocation: true
argument-hint: "<species or roles> [tick length] [real or invented species]"
---

# Ecosystem model spec

Turns a list of creatures into a stable, readable simulation.

## Inputs

- Species or roles (producer, herbivore, predator, decomposer, pathogen).
- What one tick represents (day, season, generation).
- Real or invented species; teaching goal or pure play.
If the tick is missing, assume one day for ecosystems and one generation for evolution, and say so.

## Steps

1. Draw the food web: list who eats whom. Keep it to the links the player can see; cut the rest.
2. Pick the smallest model that shows the idea:
   - one population: logistic, dN/dt = rN(1 - N/K);
   - predator and prey: Lotka-Volterra with prey carrying capacity and a saturating feeding rate (never raw Lotka-Volterra);
   - disease: SIR compartments with a transmission and recovery rate;
   - traits: Mendelian genes for discrete traits, additive scores for polygenic stats.
3. Set parameters per species: growth rate r, carrying capacity K, feeding cap, death rate. Biomass at each trophic level should be a fraction of the level below; vary it by biome (roughly 5-20 percent) rather than fixing 10.
4. Run the model by hand or in a spreadsheet for 100 ticks. Record failure modes (extinction, explosion, flat line) and the parameter ranges that avoid them.
5. Add a floor rule (small immigration or seed bank) so extinction is possible but recoverable if the design wants that.
6. Plan one visible cascade or cycle the player can cause and notice.
7. Evolution or breeding: selection acts on populations over generations; no goal-directed or use-and-inherit change.
8. Real species: check names in Catalogue of Life or GBIF and status in IUCN; never show precise locations of sensitive species; read each dataset's licence.
9. Note sensitive content: real diseases, endangered species, animal harm.

## Output

```
## Ecosystem spec: <game>
Assumptions: <tick, real/invented, goal>
Food web: <A -> B links>
| Species | Trophic level | r | K | Feeds on | Feeding cap | Death rate |
|---------|---------------|---|---|----------|-------------|------------|
Equations: <per model>
Stable ranges: <parameter: min-max>
Failure modes seen in test run: <list>
Player-visible cascade or cycle: <description>
Misconceptions avoided: <list>
Data sources and licences: <dataset, URL, licence>
Sensitive content / hand-offs: <list>
UNVERIFIED: <items>
```

## Done when

- [ ] No raw, unbounded Lotka-Volterra.
- [ ] A 100-tick test run is recorded with stable ranges.
- [ ] Each level's biomass is below the level it eats.
- [ ] Evolution, if present, has no goal and acts on populations.
- [ ] Real species data has licences checked and no precise sensitive locations.
- [ ] Hand-offs are named.
