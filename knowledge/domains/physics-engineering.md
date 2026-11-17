---
title: Physics and engineering plausibility for games
tags: [physics, engineering, structures, materials, aerodynamics, drag, units, bridge-builder, vehicle-sim, plausibility]
sources:
  - "https://physics.nist.gov/cgi-bin/cuu/Value?gn"
  - "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/"
  - "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/termvel/"
  - "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/earth-atmosphere-equation-metric/"
  - "https://www.engineeringtoolbox.com/young-modulus-d_417.html"
  - "https://www.engineeringtoolbox.com/concrete-properties-d_1223.html"
  - "https://www.engineeringtoolbox.com/friction-coefficients-d_778.html"
  - "https://webbook.nist.gov/chemistry/fluid/"
  - "https://ocw.mit.edu/pages/privacy-and-terms-of-use/"
  - "https://en.wikipedia.org/wiki/Deflection_(engineering)"
  - "https://en.wikipedia.org/wiki/Square%E2%80%93cube_law"
  - "https://en.wikipedia.org/wiki/Tacoma_Narrows_Bridge_(1940)"
  - "https://box2d.org/documentation/md_faq.html"
  - "https://en.wikipedia.org/wiki/Poly_Bridge"
  - "https://en.wikipedia.org/wiki/Bridge_Constructor"
  - "https://en.wikipedia.org/wiki/BeamNG.drive"
  - "https://en.wikipedia.org/wiki/Besiege_(video_game)"
  - "https://en.wikipedia.org/wiki/Oxygen_Not_Included"
last_verified: 2026-11-16
---

# Physics and engineering plausibility for games

For bridge and structure builders, vehicle and machine sims, heat and fluid flavour, and unit audits of any mechanic. Owner: `physics-engineering-expert`. Orbits and launch belong to `knowledge/space/orbital-mechanics-for-games.md`; solver code belongs to `physics-programmer`.

## Datasets and APIs

| Name | Publisher | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|
| CODATA constants (https://physics.nist.gov/cgi-bin/cuu/Value?gn) | NIST | Web pages per constant | Not stated on the value page | HTML | CODATA editions (2022 is current on the page) | Standard gravity g_n = 9.806 65 m/s^2, listed as exact (a defined value) |
| Beginner's Guide to Aeronautics (https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/drag-equation/) | NASA Glenn | Web | NASA web content | HTML | Rare | Old `www.grc.nasa.gov/www/k-12/...` URLs now redirect to `www1.grc.nasa.gov/beginners-guide-to-aeronautics/` |
| Thermophysical Properties of Fluid Systems (https://webbook.nist.gov/chemistry/fluid/) | NIST Chemistry WebBook | Web query, no key | "All rights reserved" under the Standard Reference Data Act | HTML tables | Rare | Water, air gases, CO2, hydrocarbons, refrigerants: density, Cp, Cv, viscosity, thermal conductivity, speed of sound. Look values up; do not bulk-copy into a shipped product without checking SRD terms |
| Engineering ToolBox (https://www.engineeringtoolbox.com/young-modulus-d_417.html) | Engineering ToolBox | Web | The value page footer says the content "is copyrighted but can be used with NO WARRANTY or LIABILITY" (checked 2026-11-16 in a browser, https://www.engineeringtoolbox.com/young-modulus-d_417.html). Reuse terms beyond that UNVERIFIED: the footer's terms link (COPYRIGHTS-NO-WARRANTY-LIABILITY-d_2231.html) returned HTTP 404 on 2026-11-16, so whether tables may be copied into a shipped product is not stated. The page gives a "This page can be cited as" format ("The Engineering ToolBox (2003)", title, URL, access date). Cite per value, do not copy whole tables | HTML | Unknown | Values are typical, not design values; grade and condition matter. Some columns on the friction page are unlabelled |
| MIT OpenCourseWare (https://ocw.mit.edu/pages/privacy-and-terms-of-use/) | MIT | Web, downloads | CC BY-NC-SA 4.0; "may not sell, profit from, or commercialize" | PDF, video | Per course | Fine for learning the theory; do not ship OCW text or figures in a paid game |

## Standards and expert sources

Material values (Engineering ToolBox, Young's modulus page; typical values):

| Material | Young's modulus E | Strength given on the page |
|---|---|---|
| Structural steel ASTM A36 | 200 GPa | Ultimate tensile 400 MPa, yield 250 MPa |
| Aluminium | 69 GPa (alloys about 70) | Ultimate tensile 110 MPa, yield 95 MPa |
| Titanium alloy | 105-120 GPa | Ultimate tensile 900 MPa, yield 730 MPa |
| Concrete | 17 GPa (high strength 30) | See concrete row below |
| Douglas fir | 13 GPa | 50 MPa (compression) |
| Oak, along grain | 11 GPa | - |
| Pine, along grain | 9 GPa | - |
| Glass | 50-90 GPa | 50 MPa (compression) |
| Carbon fibre reinforced plastic | 150 GPa | - |
| Nylon-6 | 2-4 GPa | Tensile 45-90 MPa |
| Rubber, small strain | 0.01-0.1 GPa | - |

- Concrete (Engineering ToolBox concrete page): compressive strength about 20-40 MPa, tensile about 2-5 MPa, density about 2,240-2,400 kg/m^3. Roughly ten times stronger in compression than tension.
- Friction (Engineering ToolBox, clean and dry): rubber on dry asphalt static 0.9, kinetic 0.5-0.8; steel on steel static 0.5-0.8, kinetic 0.42; Teflon on Teflon 0.04; ice on ice at 0 °C static 0.1, kinetic 0.02 (rising with colder ice: 0.3 / 0.035 at -12 °C).
- Drag (NASA Glenn): D = Cd x rho x V^2 x A / 2. Cd folds in shape, inclination, viscosity and compressibility, and is "almost always determined experimentally using a wind tunnel". State the reference area you used; Cd changes with it.
- Terminal velocity (NASA Glenn): V = sqrt(2W / (Cd x rho x A)). Near or above the speed of sound Cd rises sharply, so high-speed results need a compressibility-aware Cd.
- Air density (NASA Glenn metric model, h in metres, troposphere to 11,000 m): T = 15.04 - 0.00649h (°C); p = 101.29 x ((T + 273.1)/288.08)^5.256 (kPa); rho = p / (0.2869 x (T + 273.1)). Use it for altitude effects on drag and lift.
- Beam deflection (Wikipedia, small-deflection linear-elastic beams): simply supported, centre load F: FL^3/(48EI); simply supported, uniform load q: 5qL^4/(384EI); cantilever, end load: FL^3/(3EI); cantilever, uniform load: qL^4/(8EI). Doubling the span gives 8x the sag for a point load and 16x for a uniform load.
- Square-cube law (Galileo, 1638): scale size by k and volume (mass) grows by k^3 while cross-section grows by k^2, so big creatures and machines need disproportionately thick supports (Wikipedia).
- Engine units: the Box2D FAQ says Box2D "is tuned for meters-kilograms-seconds (MKS)", moving objects should be 0.1-10 m with 1 m "the sweet spot", and using pixels for length is a common mistake. It also says constraints are not perfectly rigid. Check your own engine's equivalent guidance.

## Accuracy vs fun

Acceptable simplifications:
- Round g to 9.8 or 10 m/s^2, if physics and animation timing agree.
- Compress stiffness ratios between materials (steel is about 15x stiffer than Douglas fir on the table above) when the solver cannot handle the real ratio; keep the order right.
- One "stress" value per member instead of separate tension, compression and bending, if the colour scale is honest about which members fail first.
- Show a "rated load" below the failure load to teach safety margins.

Trust breakers for engineers:
- Numbers with no units, or units that change between screens.
- Concrete or masonry working as a tension cable.
- Wood equally strong in every direction (published values are "along grain").
- Top speed rising linearly with power; drag goes as V^2, so power needed goes as V^3.
- Scaled-up robots or creatures with the same leg thickness as small ones.

## What games get wrong

- Tacoma Narrows (1940) told as simple forced resonance. The accepted cause is aeroelastic flutter, a wind-fed twisting oscillation; Billah and Scanlan (1991) argued textbooks "wrongly explain" it as resonance (Wikipedia). Don't build a "resonance destroys bridge" puzzle on that story without care.
- Squares treated as rigid frames in builders; only triangulated trusses resist shape change without stiff joints.
- Engine artefacts presented as physics: jitter, explosive joints and slow stacking collapse come from solver limits, not from the material. Check your engine's solver documentation and test at the real mass and size ranges before blaming the design.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Poly Bridge | 2016 | Dry Cactus | Steel, wood, rope and cable materials plus hydraulics; failure as feedback | https://en.wikipedia.org/wiki/Poly_Bridge |
| Bridge Constructor | 2011 | ClockStone (publisher Headup Games) | Build within space and budget limits, then test with vehicles | https://en.wikipedia.org/wiki/Bridge_Constructor |
| BeamNG.drive | 2015 (early access) | BeamNG GmbH | Soft-body node-beam vehicles defined in JBeam; crashes as a structural sim | https://en.wikipedia.org/wiki/BeamNG.drive |
| Besiege | 2020 (full; early access 2015) | Spiderling Studios | Physics-based machines from blocks; failure is part of the comedy | https://en.wikipedia.org/wiki/Besiege_(video_game) |
| Oxygen Not Included | 2019 | Klei Entertainment | Gas diffusion and liquid flow as base-building constraints | https://en.wikipedia.org/wiki/Oxygen_Not_Included |

## Sensitive topics and legal

- Unsafe real-world lessons: keep electrical work, improvised structures, pressure vessels and hazardous materials non-instructional; no step-by-step real procedures.
- Real products and brands (cars, aircraft, bridges by name): trademark and likeness questions go to `game-legal-advisor`.
- Claims that a game teaches engineering or certifies skills: route wording to `game-legal-advisor` and `education-expert`.
- Licences: NIST WebBook is "All rights reserved"; MIT OCW is non-commercial; Engineering ToolBox reuse terms are unchecked. Cite values, write your own tables.

## How to check this is current

- NIST: open the g_n page and note the CODATA edition.
- NASA Glenn: confirm the Beginner's Guide URLs still resolve on www1.grc.nasa.gov.
- Engineering ToolBox: re-read the row and grade you cite; values can be edited.
- Engine guidance: re-read the Box2D FAQ (or your engine's) for unit and size recommendations.
- Games: Wikipedia infoboxes and developer sites.
