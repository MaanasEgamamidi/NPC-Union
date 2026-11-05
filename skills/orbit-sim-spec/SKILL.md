---
name: orbit-sim-spec
description: Turns a space game concept into an orbit simulation spec: model, scale, integrator, precision, time warp, constants, test numbers, performance budget.
owner: orbital-mechanics-expert
disable-model-invocation: true
argument-hint: "<game concept, engine, real or invented system>"
---

# Orbit sim spec

A repeatable procedure for writing the physics spec a programmer can build and test against. Numbers come from a script you run, never from memory.

## Inputs

- Game concept in a sentence or two, and the engine.
- Real solar system or invented? Real scale or scaled?
- Must-have phenomena: Lagrange points, halo orbits, perturbation, atmosphere, multiple ships at once.
- Maximum time warp and maximum ship count.
If any are missing, assume: invented system, patched conics, warp to 100,000x, 50 ships, PC, engine transforms in float32. State each assumption in the spec.

## Steps

1. **Pick the model.** Rails (Kepler only) if nothing thrusts while warped; patched conics if ships travel between bodies and no Lagrange points are needed; n-body if any must-have needs a third body; hybrid (n-body for bodies on rails, ships integrated) when ship counts are small. Write one paragraph naming which must-have forced the choice.
2. **Fix scale and units.** SI internally (m, s, kg). For real systems take GM from https://ssd.jpl.nasa.gov/astro_par.html and radii from https://ssd.jpl.nasa.gov/planets/phys_par.html, and re-fetch rather than recall. For scaled systems state three factors: distance, GM, time. Show what the scaling preserves (surface gravity, orbit period, or orbital speed) and what it breaks.
3. **Choose ephemerides.** Real system: JPL approximate Keplerian elements (https://ssd.jpl.nasa.gov/planets/approx_pos.html, valid 1800-2050 with its listed error) for on-rails bodies, or Horizons state vectors (`EPHEM_TYPE='VECTORS'`) via `nasa-data-specialist` if accuracy matters. Invented: list elements per body.
4. **Choose propagation per state.** Coasting: Kepler equation, Newton iteration, E0 = pi when e > 0.8, tolerance about 1e-12 rad, iteration cap with bisection fallback, hyperbolic sinh form with H0 = asinh(M/e). Thrusting: velocity Verlet or RK4 with dt stated; adaptive or sub-stepped near periapsis for e > 0.5. In atmosphere: integrate with drag relative to the rotating atmosphere; exponential density with stated rho0 and scale height.
5. **Set the precision strategy.** Sim state in float64. Rendering relative to a floating origin; give the re-centre threshold in metres. Game clock as float64 seconds or integer ticks. Quote the float32 spacing at the largest distance in the game (16,384 m at 1 au) to justify it.
6. **Write time-warp rules.** Warp levels, which conditions disable rails warp (thrust, atmosphere, surface), altitude gates per body, how SOI crossings are found during warp (solve for crossing time, never sample per frame), and how warp ramps down.
7. **Compute test cases with a script.** At least five, each with inputs, expected value and tolerance. Use the real-Earth checks if the game has Earth: 400 km circular period 92.56 min (equatorial radius 6378.1366 km), escape speed at the surface 11.18 km/s, GEO radius 42,164 km, LEO 200 km to GEO Hohmann 3.93 km/s. Add one energy-conservation test (relative energy drift over 1,000 orbits) and one Kepler round-trip test (elements to state to elements). For scaled systems compute the equivalents.
8. **Set the performance budget.** Ms per frame for propagation and for prediction lines, ship count, Kepler solves per frame, n-body force evaluations per step.
9. **List open questions and anything UNVERIFIED.** Name who answers each (`game-designer` for fun-versus-realism, `nasa-data-specialist` for data, `performance-engineer` for budgets).

## Output

```
# Orbit sim spec: <game>
## Model
<rails | patched conics | n-body | hybrid>: <reason tied to must-haves>
## Scale and units
<real | scaled>; factors: distance <x>, GM <x>, time <x>; preserves <...>; breaks <...>
## Constants and ephemerides
| Body | GM | Radius | Orbit source | Source URL, fetched date |
## Propagation
Coast: <...>  Thrust: <integrator, dt>  Atmosphere: <rho0, H, Cd*A rules>
## Precision
Sim <float64>; render <float32, floating origin at N m>; clock <...>
## Time warp
Levels <...>; disabled when <...>; gates <...>; SOI crossing <...>
## Test cases
| # | Case | Inputs | Expected | Tolerance |
## Performance budget
<ships, ms/frame, solves/frame>
## Open questions and UNVERIFIED
- <question> -> <agent>
```

## Done when

- [ ] The model choice names the must-have that forced it.
- [ ] Every constant has a source URL fetched this session, or is marked UNVERIFIED.
- [ ] Scaled systems state all three factors and what they break.
- [ ] Coast, thrust and atmosphere propagation are each specified, with dt or tolerance.
- [ ] State, render and clock precision are each specified.
- [ ] Warp rules cover disabling conditions and SOI crossing during warp.
- [ ] At least five test cases with numbers produced by a script that was actually run.
- [ ] Performance budget has numbers, not adjectives.
