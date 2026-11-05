---
title: Orbital mechanics for games
tags: [orbital-mechanics, space, physics, integrators, floating-point, kepler, hohmann, delta-v, time-warp, patched-conics, n-body]
sources:
  - https://ssd.jpl.nasa.gov/astro_par.html
  - https://ssd.jpl.nasa.gov/planets/phys_par.html
  - https://ssd.jpl.nasa.gov/planets/approx_pos.html
  - https://ssd.jpl.nasa.gov/sats/phys_par/
  - https://ssd.jpl.nasa.gov/sats/elem/
  - https://ssd-api.jpl.nasa.gov/doc/horizons.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html
  - https://science.nasa.gov/learn/basics-of-space-flight/
  - https://science.nasa.gov/learn/basics-of-space-flight/chapter3-1/
  - https://science.nasa.gov/learn/basics-of-space-flight/chapter4-1/
  - http://www.braeunig.us/space/orbmech.htm
  - https://en.wikipedia.org/wiki/Vis-viva_equation
  - https://en.wikipedia.org/wiki/Hohmann_transfer_orbit
  - https://en.wikipedia.org/wiki/Tsiolkovsky_rocket_equation
  - https://en.wikipedia.org/wiki/Standard_gravity
  - https://en.wikipedia.org/wiki/Kepler%27s_equation
  - https://en.wikipedia.org/wiki/Lambert%27s_problem
  - https://en.wikipedia.org/wiki/Patched_conic_approximation
  - https://en.wikipedia.org/wiki/Sphere_of_influence_(astrodynamics)
  - https://en.wikipedia.org/wiki/Leapfrog_integration
  - https://en.wikipedia.org/wiki/Gravity_assist
  - https://en.wikipedia.org/wiki/Single-precision_floating-point_format
  - https://wiki.kerbalspaceprogram.com/wiki/Sphere_of_influence
  - https://wiki.kerbalspaceprogram.com/wiki/Time_warp
  - https://wiki.kerbalspaceprogram.com/wiki/Deep_Space_Kraken
  - https://wiki.kerbalspaceprogram.com/wiki/Maneuver_node
  - https://en.wikipedia.org/wiki/Kerbal_Space_Program
  - https://en.wikipedia.org/wiki/Outer_Wilds
  - https://en.wikipedia.org/wiki/Universe_Sandbox
  - https://store.steampowered.com/app/476530/
  - https://store.steampowered.com/app/870200/
last_verified: 2026-11-05
---

# Orbital mechanics for games

Formulas, checked constants, and numbers computed for this file (Python 3, double precision) so a game team can build and test an orbit simulation. Every worked number below was produced by a script from the constants in the table, not copied from elsewhere. Re-run the numbers if you change a constant.

## Formulas

Notation: `mu = GM` of the central body, `r` = distance from the body's centre (not altitude), `a` = semi-major axis, `v` = speed relative to the central body.

| Quantity | Formula | Notes |
|---|---|---|
| Vis-viva | `v^2 = mu (2/r - 1/a)` | Gives speed anywhere on a conic from `r` and `a`. For hyperbolas `a < 0`. |
| Specific orbital energy | `eps = v^2/2 - mu/r = -mu/(2a)` | The quantity to track when testing an integrator. |
| Circular speed | `v_c = sqrt(mu/r)` | |
| Escape speed | `v_esc = sqrt(2 mu / r) = sqrt(2) v_c` | |
| Period | `T = 2 pi sqrt(a^3 / mu)` | Depends only on `a`, not on `e`. |
| Hohmann burn 1 | `dv1 = sqrt(mu/r1) (sqrt(2 r2/(r1+r2)) - 1)` | Tangential, at periapsis of transfer. |
| Hohmann burn 2 | `dv2 = sqrt(mu/r2) (1 - sqrt(2 r1/(r1+r2)))` | Tangential, at apoapsis of transfer. |
| Hohmann transfer time | `t = pi sqrt(((r1+r2)/2)^3 / mu)` | Half the transfer ellipse's period. |
| Burn from parking orbit to a hyperbolic excess speed | `dv = sqrt(v_inf^2 + 2 mu/r) - sqrt(mu/r)` | The Oberth effect is why this is cheaper than adding `v_inf` directly. `C3 = v_inf^2`. |
| Tsiolkovsky | `dv = Isp g0 ln(m0/mf)`, `g0 = 9.80665 m/s^2` | `g0` is the defined standard gravity, not local gravity. |
| Kepler equation (ellipse) | `M = E - e sin E` | Solve for `E` given mean anomaly `M = n (t - tp)`, `n = sqrt(mu/a^3)`. |
| Kepler equation (hyperbola) | `M = e sinh H - H` | `n = sqrt(mu/(-a)^3)`. |
| Sphere of influence | `r_SOI = a (m/M)^(2/5)` | Laplace definition used by patched conics. |
| Gravity-assist turn angle | `delta = 2 asin(1 / (1 + r_p v_inf^2 / mu))` | Max speed change in the planet frame is `2 v_inf sin(delta/2)`. |
| Combined plane change | `dv = sqrt(v1^2 + v2^2 - 2 v1 v2 cos(di))` | Do plane changes where speed is lowest (apoapsis). |

## Checked constants

From the JPL Solar System Dynamics "Astrodynamic Parameters" page (planetary GM values from ephemeris DE440), fetched 2026-11-05: https://ssd.jpl.nasa.gov/astro_par.html

| Constant | Value | Source |
|---|---|---|
| GM Sun | 1.32712440041279419e20 m^3/s^2 | JPL astro_par |
| GM Earth | 398600.435507 km^3/s^2 | JPL astro_par (DE440) |
| GM Moon | 4902.800118 km^3/s^2 | JPL astro_par (DE440) |
| GM Mars system | 42828.375816 km^3/s^2 | JPL astro_par (DE440). This is the Mars system value (includes Phobos and Deimos, whose share is negligible for games). |
| GM Jupiter system | 126712764.1 km^3/s^2 | JPL astro_par (DE440) |
| Astronomical unit | 149597870700 m (exact) | JPL astro_par, IAU 2012 Resolution B1 |
| Mean sidereal day | 86164.09054 s | JPL astro_par |
| G | 6.67430e-11 m^3 kg^-1 s^-2 (± 0.00015e-11) | JPL astro_par (CODATA 2018) |
| Earth equatorial radius | 6378.1366 km | https://ssd.jpl.nasa.gov/planets/phys_par.html |
| Mars equatorial radius | 3396.19 km | JPL planets phys_par |
| Jupiter equatorial radius | 71492 km | JPL planets phys_par |
| Moon mean radius | 1737.4 km | https://ssd.jpl.nasa.gov/sats/phys_par/ |
| Moon semi-major axis about Earth | 384400 km | https://ssd.jpl.nasa.gov/sats/elem/ |
| Earth-Moon barycentre semi-major axis | 1.00000261 au | https://ssd.jpl.nasa.gov/planets/approx_pos.html (J2000 Keplerian elements, valid 1800-2050) |
| Mars semi-major axis | 1.52371034 au | JPL approx_pos |
| Standard gravity g0 | 9.80665 m/s^2 | https://en.wikipedia.org/wiki/Standard_gravity |
| Earth atmosphere scale height | 8.5 km (surface density 1.217 kg/m^3) | NSSDC Earth fact sheet |
| Mars atmosphere scale height | 11.0 km (surface density about 0.016 kg/m^3, variable) | NSSDC Mars fact sheet |

Use GM directly. G times a mass is known far less precisely than GM itself (G carries a relative uncertainty of about 2e-5 per the table above), so computing `G * M` throws away accuracy.

## Worked numbers (computed for this file)

Script: double precision Python with the constants above. Altitudes are above the equatorial radius unless noted.

### Earth orbit

| Case | Result |
|---|---|
| Circular 200 km | v = 7.7843 km/s, T = 88.494 min |
| Circular 300 km | v = 7.7258 km/s, T = 90.520 min |
| Circular 400 km | v = 7.6686 km/s, T = 92.560 min (92.414 min if you measure altitude from the 6371.0084 km mean radius) |
| Escape speed at the surface (equatorial radius) | 11.1799 km/s |
| Escape speed at 400 km | 10.8450 km/s |
| Geostationary radius from the sidereal day | 42164.169 km (altitude 35786.033 km), v = 3.0747 km/s |
| Hohmann 200 km to GEO, coplanar | 2.4546 + 1.4773 = 3.9319 km/s, 5.259 h |
| Hohmann 300 km to GEO, coplanar | 2.4257 + 1.4668 = 3.8926 km/s, 5.275 h |
| Hohmann 400 km to GEO, coplanar | 2.3975 + 1.4565 = 3.8540 km/s, 5.291 h |
| 300 km at 28.5 deg inclination to equatorial GEO, plane change folded into the apogee burn | 2.4257 + 1.8302 = 4.2560 km/s |

The last row is why "LEO to GEO is 3.9 km/s" is only true for an equatorial start. Tell players which one your game models.

### Moon and Mars

| Case | Result |
|---|---|
| Low lunar orbit, 100 km | v = 1.6335 km/s, T = 117.79 min |
| Lunar surface escape speed | 2.3757 km/s |
| Mars surface escape speed (equatorial) | 5.0221 km/s |
| Low Mars orbit, 300 km | v = 3.4040 km/s, T = 113.71 min |

### Earth to Mars, Hohmann (circular, coplanar approximation)

| Case | Result |
|---|---|
| Transfer time | 258.87 days |
| Hyperbolic excess speed at departure | 2.9448 km/s (C3 = 8.672 km^2/s^2) |
| Hyperbolic excess speed at arrival | 2.6490 km/s |
| Departure burn from a 400 km circular Earth orbit | 3.5691 km/s |
| Capture burn into a 300 km circular Mars orbit | 2.0907 km/s |
| Mars lead angle at departure | 44.35 deg |
| Earth and Mars sidereal periods (from `a`) | 365.26 d and 686.99 d |
| Synodic period (launch window spacing) | 779.9 d = 2.135 yr = 25.6 months |

NASA's Basics of Space Flight chapter 4 gives "about every 25 months" for minimum-energy Mars windows, which matches. Real windows vary because Mars's orbit has e = 0.0934 and 1.85 deg inclination (JPL approx_pos); a porkchop plot from a Lambert solver over real ephemerides is how a game shows that variation.

### Spheres of influence (Laplace, `a (m/M)^0.4`)

| Body | r_SOI |
|---|---|
| Earth (Earth + Moon GM, about the Sun) | 929,182 km |
| Moon (about Earth) | 66,183 km |
| Mars (about the Sun) | 577,239 km |

These agree with the table on the Wikipedia sphere of influence page (Earth + Moon 0.929 million km).

### Rocket equation, 3.9 km/s burn

| Isp (s) | Mass ratio m0/mf | Propellant share of starting mass |
|---|---|---|
| 300 | 3.765 | 73.4% |
| 350 | 3.115 | 67.9% |
| 450 | 2.420 | 58.7% |

### Gravity assists (maximum turn, planet frame)

| Flyby | Turn angle | Max speed change |
|---|---|---|
| Jupiter, periapsis 2 R_J, v_inf 5 km/s | 153.10 deg | 9.726 km/s |
| Jupiter, periapsis 2 R_J, v_inf 10 km/s | 127.95 deg | 17.972 km/s |
| Earth, periapsis 300 km altitude, v_inf 5 km/s | 89.63 deg | 7.048 km/s |
| Earth, periapsis 300 km altitude, v_inf 10 km/s | 43.90 deg | 7.476 km/s |

A flyby does not change speed relative to the planet; it rotates the velocity vector. The heliocentric gain comes from adding the planet's own orbital velocity back in.

### Rendezvous: why prograde makes you fall behind

A +1 m/s prograde burn from a 400 km circular orbit raises the far side by 3,536.7 m and lengthens the period by 2.173 s, so the ship ends one orbit about 16.67 km behind a target that did nothing. The Clohessy-Wiltshire linear estimate `3 T dv` gives 16.66 km. To catch a target ahead of you on the same orbit, burn retrograde, drop into a faster lower orbit, then burn prograde to rise back. Show this in the tutorial; players will not guess it.

## Integrator comparison (computed for this file)

Test: Earth point mass, start at 400 km periapsis, 10 orbits, fixed step, 2D. "Energy error" is relative error in specific energy; "position error" is distance from the exact Kepler solution at the end.

| Orbit, step | Method | End energy error | Max energy error | Position error after 10 orbits |
|---|---|---|---|---|
| Circular, dt 10 s | Explicit Euler | -4.25e-1 | 4.25e-1 | 5,880 km |
| Circular, dt 10 s | Semi-implicit (symplectic) Euler | -1.04e-11 | 1.28e-4 | 38.6 km |
| Circular, dt 10 s | Velocity Verlet | -2.13e-14 | 4.10e-9 | 18.2 km |
| Circular, dt 10 s | RK4 | +3.24e-10 | 3.24e-10 | 0.26 m |
| Circular, dt 60 s | Explicit Euler | -6.70e-1 | 6.70e-1 | 12,200 km |
| Circular, dt 60 s | Velocity Verlet | -8.98e-12 | 5.27e-6 | 653 km |
| Circular, dt 60 s | RK4 | +2.52e-6 | 2.52e-6 | 1.01 km |
| e = 0.7, dt 10 s | Velocity Verlet | -6.22e-7 | 8.94e-5 | 434 km |
| e = 0.7, dt 10 s | RK4 | +6.03e-10 | 1.24e-9 | 4.9 m |
| e = 0.7, dt 60 s | Velocity Verlet | -3.22e-3 | 3.22e-3 | 13,300 km |
| e = 0.7, dt 60 s | RK4 | +4.68e-6 | 5.31e-6 | 16.3 km |

Long run, circular orbit, 1,000 orbits, equal cost (4 force evaluations per 60 s of game time):

| Method | End energy error | Max energy error | Position error |
|---|---|---|---|
| Velocity Verlet, dt 15 s | -1.07e-10 | 2.07e-8 | 4,030 km |
| RK4, dt 60 s | +2.52e-4 | 2.52e-4 | 7,600 km |

RK4 at dt 60 s over 10, 100, 1,000 orbits: energy error +2.52e-6, +2.52e-5, +2.52e-4. It grows linearly and never comes back.
Velocity Verlet at dt 60 s over the same spans: max energy error stays at 5.27e-6.

What the numbers say:
- Explicit Euler always gains energy on an orbit, so ships spiral outward. Never ship it for orbits.
- Symplectic methods (semi-implicit Euler, leapfrog/velocity Verlet) keep energy bounded forever but accumulate phase error: the ship is on the right orbit at the wrong place. That suits a sandbox where orbits must not decay or grow; it does not suit a game that must hit a rendezvous to the metre.
- RK4 is far more accurate over a short span but its energy drifts secularly. Fine for a few orbits or with small steps; poor for "leave it running for a game year".
- Eccentric orbits punish fixed steps at periapsis (Verlet's error at e = 0.7 is about 600 times worse than at e = 0 for the same dt). Use adaptive steps, or stop integrating and go analytic (see below).
- For anything coasting with no thrust, the best integrator is none: propagate with the Kepler equation. That is exact, step-size independent, and is how "on-rails" time warp works.

## Kepler equation solving (computed for this file)

Newton iteration on `f(E) = E - e sin E - M`, `f'(E) = 1 - e cos E`, 10,000 evenly spaced `M` per eccentricity, stopping when the step is below 1e-12 rad:

| e | Start E0 | Max iterations | Mean |
|---|---|---|---|
| 0.0167 | M | 4 | 3.4 |
| 0.5 | M | 6 | 5.0 |
| 0.9 | pi | 9 | 5.6 |
| 0.99 | M (naive) | did not converge in 100 for some M | |
| 0.99 | pi | 12 | 5.3 |
| 0.999 | pi | 14 | 5.3 |

- Start from `E0 = pi` when `e > 0.8`. Starting from `E0 = M` at e = 0.99 failed to converge for some `M` within 100 iterations in this test.
- Do not ask for a step below about 1e-14 rad in double precision. At e = 0.999 a 1e-14 tolerance stalled at round-off and hit the 50-iteration cap; 1e-12 converged in at most 14.
- Always cap iterations and fall back to bisection if the cap is hit.
- Hyperbolic case `M = e sinh H - H`, start `H0 = asinh(M/e)`, `M` in [-50, 50]: max 15 iterations at e = 1.01, 9 at e = 1.1, 6 at e = 2, 5 at e = 5. Near-parabolic orbits (e close to 1) are the slow cases for both forms; universal-variable formulations avoid the switch.

## Floating-point precision (computed for this file)

Value is the spacing between adjacent representable numbers (one ULP) at that magnitude, with positions stored in metres. The worst rounding error is half the spacing. Float32 has a 24-bit significand (https://en.wikipedia.org/wiki/Single-precision_floating-point_format).

| Distance from origin | float32 spacing | float64 spacing |
|---|---|---|
| 1 km | 6.1e-5 m | 1.1e-13 m |
| Earth radius (6378 km) | 0.5 m | 9.3e-10 m |
| GEO radius (42,164 km) | 4 m | 7.5e-9 m |
| Moon distance (384,400 km) | 32 m | 6.0e-8 m |
| 1 au | 16,384 m | 3.1e-5 m |
| Mars, 1.524 au | 16,384 m | 3.1e-5 m |
| Jupiter, 5.2 au | 65,536 m | 1.2e-4 m |
| Neptune, 30.07 au | 524,288 m | 9.8e-4 m |

Game time stored in seconds has the same problem:

| Elapsed | float32 spacing | float64 spacing |
|---|---|---|
| 1 hour | 0.00024 s | 4.5e-13 s |
| 1 day | 0.0078 s | 1.5e-11 s |
| 1 year | 2 s | 3.7e-9 s |
| 10 years | 32 s | 6.0e-8 s |
| 100 years | 256 s | 4.8e-7 s |

Consequences:
- Changing units does not help. Storing kilometres instead of metres gives the same relative precision (16 km spacing at 1 au instead of 16,384 m).
- A float32 world position is unusable for a spacecraft anywhere near a planet if the origin is the Sun: at 1 au the grid is 16 km. Keep simulation state in float64, then render relative to the camera (floating origin) in float32.
- A float32 clock is unusable for orbits after about a year: at 2 s spacing a LEO ship (7.67 km/s) jumps about 15 km per tick. Store time as float64 seconds or as an integer tick count plus a fraction.
- Engines with float32 transforms (Unity's default, for example) need a floating origin: re-centre the world on the active vessel whenever it moves past a threshold. Kerbal Space Program's pre-0.17 "Deep Space Kraken" was this failure: the wiki says the game moved the ship through space instead of moving space around the ship, and floating-point errors at high velocity made parts misalign and break apart. The fix offset velocity to the universe around the vessel ("Krakensbane") (https://wiki.kerbalspaceprogram.com/wiki/Deep_Space_Kraken).

## Model choice: rails, patched conics, n-body

- **On rails (Kepler propagation):** each body or coasting ship follows a fixed conic computed from orbital elements. Exact for two-body, cheap at any warp. Kerbal Space Program puts celestial bodies on predefined paths and applies no physics to them (KSP wiki, Sphere of influence page).
- **Patched conics:** one gravity source at a time, switching at the SOI boundary. The KSP wiki lists consequences: no Lagrange points, an orbit can be mathematically elliptical but treated as escaping because its apoapsis is outside the SOI, and a fast ship can skip an SOI change if the check is not frequent enough. Wikipedia's KSP article says the stock game uses patched conics instead of full n-body, so it has no Lagrange points, perturbations, halo orbits or tidal forces.
- **N-body:** every ship feels every body; needed for Lagrange points, halo orbits, perturbation, and orbit decay from third bodies. Costs integration of every ship every step, and predictions must be computed by integrating ahead.

KSP time warp (from the KSP wiki Time warp page): on-rails warp goes up to 100,000x in steps of 1x, 5x, 10x, 50x, 100x, 1,000x, 10,000x and 100,000x, and is unavailable under thrust, in atmosphere, or on a surface; physical warp is limited to 1x to 4x and the wiki warns it can damage complex vessels. Each body has altitude limits per warp level (above 4x is not allowed under 70 km at Kerbin), and dropping out of high warp is not instant, so a ship can cross into atmosphere while time is still accelerated.

## Atmosphere, drag, reentry (game simplifications)

- Exponential density model: `rho(h) = rho0 exp(-h/H)`. Earth: rho0 = 1.217 kg/m^3, H = 8.5 km. Mars: rho0 about 0.016 kg/m^3 (variable), H = 11.0 km (NSSDC fact sheets). This is a single-scale-height approximation; real profiles diverge with altitude.
- Drag acceleration `a = 0.5 rho v^2 Cd A / m` opposite to velocity relative to the rotating atmosphere, not inertial velocity.
- Drag forbids on-rails propagation. Define an atmosphere ceiling where you switch from rails to integration, and refuse high warp below it (KSP's approach).
- Integrate reentry with a small fixed step or adaptive step: density changes by a factor e every 8.5 km of descent on Earth, and a ship descending steeply crosses that in a second or two.

## Maneuver UI notes

- KSP's maneuver node exposes three axis pairs: prograde/retrograde, normal/anti-normal, radial/anti-radial (KSP wiki, Maneuver node). Use the same frame; players from KSP expect it.
- Plot the predicted orbit with the same propagator the simulation uses, or the prediction and reality diverge.
- Show the burn as a duration centred on the node, since finite burns are not impulses. Split long burns.

## Reference games

| Game | Year | Developer | Link | What to study |
|---|---|---|---|---|
| Kerbal Space Program | 2015 (1.0) | Squad | https://en.wikipedia.org/wiki/Kerbal_Space_Program | Patched conics with bodies on rails; maneuver nodes in the prograde/normal/radial frame; on-rails warp to 100,000x with altitude gates; floating-origin history (Kraken). |
| Children of a Dead Earth | 2016 | Q Switched Productions, LLC | https://store.steampowered.com/app/476530/ | Store page states an n-body simulator at 1:1 solar-system scale, with hyperbolic orbits, Lagrange points and perturbation simulated, and delta-v computed from ship design. Study how combat is planned around transfer windows instead of dogfighting. |
| Juno: New Origins (formerly SimpleRockets 2) | Steam lists 26 Jan 2023 | Jundroo, LLC | https://store.steampowered.com/app/870200/ | Store page confirms the rename from SimpleRockets 2, orbits with time warp and a map view for planning burns, adjustable engine Isp, and the Vizzy block language for automating craft. |
| Outer Wilds | 2019 | Mobius Digital | https://en.wikipedia.org/wiki/Outer_Wilds | Wikipedia describes an "exaggerated system of Newtonian physics" where planets swiftly orbit the sun and exert variable gravity fields, and the player must cancel their own momentum to slow down. A small, fast system scaled for a 22-minute loop. Do not claim more about its implementation without a developer source. |
| Universe Sandbox | 2008 (first game); remake public alpha 2014 | Giant Army | https://en.wikipedia.org/wiki/Universe_Sandbox | Steam page describes Newtonian n-body gravity "at almost any speed" plus collisions; study how it lets the user change time step and what that does to stability. |

## References

- JPL SSD astrodynamic parameters: https://ssd.jpl.nasa.gov/astro_par.html
- JPL planetary physical parameters: https://ssd.jpl.nasa.gov/planets/phys_par.html
- JPL approximate planetary positions (Keplerian elements and error table): https://ssd.jpl.nasa.gov/planets/approx_pos.html
- JPL satellite physical parameters and mean elements: https://ssd.jpl.nasa.gov/sats/phys_par/ and https://ssd.jpl.nasa.gov/sats/elem/
- JPL Horizons API (state vectors with `EPHEM_TYPE='VECTORS'`): https://ssd-api.jpl.nasa.gov/doc/horizons.html. A test query for Mars (`COMMAND='499'`, `CENTER='500@10'`, `OUT_UNITS='KM-S'`) returned heliocentric vectors on 2026-11-05. More in `knowledge/space/jpl-ssd-apis.md`.
- NASA Basics of Space Flight (index, chapter 3 Gravity and Mechanics, chapter 4 Trajectories): https://science.nasa.gov/learn/basics-of-space-flight/
- Braeunig, Rocket and Space Technology, Orbital Mechanics (Hohmann, one-tangent burn, plane changes, perturbations; linked from the NASA chapter 4 page): http://www.braeunig.us/space/orbmech.htm
- Lambert's problem overview; it lists Izzo's "Revisiting Lambert's Problem" and Gooding's method: https://en.wikipedia.org/wiki/Lambert%27s_problem
- Leapfrog integration (second order, time-reversible, symplectic): https://en.wikipedia.org/wiki/Leapfrog_integration
- Kepler's equation (Newton's method, hyperbolic form): https://en.wikipedia.org/wiki/Kepler%27s_equation
- KSP wiki pages: Sphere of influence, Time warp, Deep Space Kraken, Maneuver node (URLs in frontmatter).
- Sibling files: `knowledge/space/jpl-ssd-apis.md`, `knowledge/space/space-missions-and-science.md`, `knowledge/space/nasa-apis.md`.
