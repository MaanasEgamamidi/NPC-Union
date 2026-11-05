---
title: Space science and missions reference for game developers
tags: [space, planets, moons, light-delay, radiation, missions, artemis, europa-clipper, jwst, perseverance, voyager, fact-check, common-errors]
sources:
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/mercuryfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/venusfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/jupiterfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturnfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/uranusfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/neptunefact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/joviansatfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/saturniansatfact.html
  - https://science.nasa.gov/moon/facts/
  - https://science.nasa.gov/saturn/moons/titan/facts/
  - https://science.nasa.gov/saturn/moons/enceladus/
  - https://science.nasa.gov/jupiter/jupiter-moons/europa/
  - https://www.jpl.nasa.gov/images/pia01144-daytime-temperatures-on-europa/
  - https://www.jpl.nasa.gov/news/nasas-juno-measures-thickness-of-europas-ice-shell/
  - https://www.swri.org/press-release/swri-scientists-publish-first-radiation-measurements-surface-mars
  - https://www.nasa.gov/humans-in-space/artemis/
  - https://en.wikipedia.org/wiki/Artemis_II
  - https://science.nasa.gov/mission/europa-clipper/
  - https://science.nasa.gov/mission/webb/
  - https://science.nasa.gov/mission/mars-2020-perseverance/
  - https://science.nasa.gov/mission/voyager/
  - https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/
  - https://www.jpl.nasa.gov/news/nasa-shuts-off-instrument-on-voyager-1-to-keep-spacecraft-operating/
  - https://www.nasa.gov/content/the-fact-and-fiction-of-martian-dust-storms
  - https://science.nasa.gov/solar-system/asteroids/facts/
  - https://www.astronomy.com/science/how-do-spacecraft-avoid-collisions-in-the-asteroid-belt/
  - https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-5-8/
  - https://assets.science.nasa.gov/content/dam/science/cds/eclips/assets/documents/nasa-spotlite-interactive-lesson-sound-waves-and-medium-teacher.pdf
last_verified: 2026-11-05
---

# Space science and missions reference for game developers

Checked numbers a game team needs for planets, moons, light delay, radiation, and real missions, plus a table of errors games commonly make. All pages were read on 2026-11-05. Physical constants of planets change only when NASA revises the fact sheet; mission status changes every few months, so **recheck every mission line before you ship**.

## 1. Planets, the Moon, and Pluto

Source: NASA Planetary Fact Sheet, https://nssdc.gsfc.nasa.gov/planetary/factsheet/ (page footer: "Last Updated: 18 March 2025"), plus the per-body pages listed in `sources` for atmosphere and temperature ranges.

| Body | Gravity (m/s²) | Gravity (g) | Solar day (h) | Rotation (h) | Mean temp (°C) | Surface pressure (bar) | Atmosphere (by volume) |
|---|---|---|---|---|---|---|---|
| Mercury | 3.7 | 0.38 | 4222.6 (176 Earth days) | 1407.6 | 167 | ~0 (exosphere, <5e-15 bar) | Exosphere: sodium, magnesium, oxygen, hydrogen, potassium |
| Venus | 8.9 (8.87) | 0.90 | 2802.0 (117 Earth days) | -5832.5 (retrograde, 243 days) | 464 | 92 | 96.5% CO2, 3.5% N2; SO2 150 ppm |
| Earth | 9.8 | 1.00 | 24.0 | 23.9 | 15 | 1 (1014 mb) | 78.08% N2, 20.95% O2, Ar 9340 ppm, CO2 420 ppm |
| Moon | 1.6 (1.62) | 0.165 | 708.7 (29.5 Earth days) | 655.7 | -20 | ~0 (3e-15 bar at night) | Exosphere: helium, neon, hydrogen, argon (poorly known) |
| Mars | 3.7 (3.73) | 0.38 | 24.7 (24.6597) | 24.6 | -65 | 0.01 (6.36 mb mean, 4.0 to 8.7 mb by season) | 95.1% CO2, 2.59% N2, 1.94% Ar, 0.16% O2, 0.06% CO |
| Jupiter | 23.1 | 2.36 | 9.9 | 9.9 | -110 | no surface | 89.8% H2, 10.2% He; CH4 3000 ppm |
| Saturn | 9.0 | 0.92 | 10.7 | 10.7 | -140 | no surface | 96.3% H2, 3.25% He; CH4 4500 ppm |
| Uranus | 8.7 | 0.89 | 17.2 | -17.2 (retrograde) | -195 | no surface | 82.5% H2, 15.2% He, 2.3% CH4 |
| Neptune | 11.0 | 1.12 | 16.1 | 16.1 | -200 | no surface | 80.0% H2, 19.0% He, 1.5% CH4 |
| Pluto | 0.7 | 0.07 | 153.3 | -153.3 (retrograde) | -225 | 0.00001 | not on the fetched pages |

Gravity in g is the fact-sheet m/s² divided by 9.8 (rounded). Giant planet "gravity" is at the 1 bar level, not a surface.

**Temperature ranges** (what you actually design day/night around):

| Body | Range | Source note |
|---|---|---|
| Mercury | 590 to 725 K (317 to 452 °C) on the sunward side; average 440 K | mercuryfact.html; nightside value not given on that page |
| Venus | Diurnal range ~0; 737 K (464 °C) everywhere | venusfact.html |
| Earth | Diurnal 10 to 20 °C (global average) | earthfact.html |
| Moon | Equator 95 to 390 K (about -178 to 117 °C) | moonfact.html; NASA Moon facts gives about 127 °C in full Sun and -173 °C in darkness |
| Mars | 184 to 242 K (-89 to -31 °C) at the Viking 1 Lander site | marsfact.html |
| Jupiter / Saturn / Uranus / Neptune | 165 K / 134 K / 76 K / 72 K at 1 bar | per-planet fact sheets |

Moon counts on the fact sheet (Jupiter 95, Saturn 274, Uranus 28, Neptune 16, Pluto 5) change as discoveries are confirmed. Read them live and quote with a date.

## 2. Key moons: Europa, Titan, Enceladus

| Moon | Gravity | Orbit / day | Surface temp | Atmosphere | Notes for games |
|---|---|---|---|---|---|
| Europa (Jupiter) | ~1.31 m/s² (0.13 g), computed | 3.55 days, synchronous | Midday equator about 130 K (-143 °C), Galileo PPR | Not on fetched pages (UNVERIFIED) | Ice shell averages about 29 km (18 mi) in the region Juno measured; ocean likely holds twice the water of Earth's ocean |
| Titan (Saturn) | ~1.35 m/s² (0.14 g), computed | 15.95 days, synchronous | About -179 °C | ~95% N2, ~5% CH4; surface pressure about 60% higher than Earth's | Rivers, lakes, and seas of liquid methane and ethane; water ice acts as rock |
| Enceladus (Saturn) | ~0.11 m/s² (0.012 g), computed | 1.37 days, synchronous | About -201 °C | Not on fetched pages | About 500 km across; jets of water vapour and ice from "tiger stripe" fractures at about 800 mph; plume holds water, CO2, methane, salts, silica, organics; global ocean; ice thinnest (about 1 to 5 km) near the south pole |

Gravity values are computed here as g = GM/r² from the NSSDC satellite fact sheets (Europa mass 480.0 × 10²⁰ kg, radius 1560.8 km; Titan 1345.5 × 10²⁰ kg, 2575 km; Enceladus 1.08 × 10²⁰ kg, mean radius about 252 km from 257 × 251 × 248 km). They are not quoted from a NASA page; label them "computed".

Sources: joviansatfact.html, saturniansatfact.html, science.nasa.gov Titan facts, Enceladus, and Europa pages, JPL PIA01144, JPL Juno ice-shell news (dated 2026-01-27).

## 3. Light-travel times

Speed of light: 299,792.458 km/s. Times computed from fact-sheet distances.

| Path | Distance | One-way light time |
|---|---|---|
| Earth to Moon, mean | 384,400 km | 1.28 s |
| Earth to Moon, perigee / apogee | 363,300 / 405,500 km | 1.21 / 1.35 s |
| Earth to Venus, min / max | 38.2 / 261.0 million km | 2.1 / 14.5 min |
| Earth to Mars, min / max | 54.6 / 401.4 million km | 3.0 / 22.3 min |
| Earth to Jupiter, min / max | 588.5 / 968.5 million km | 32.7 / 53.8 min |
| Earth to Voyager 1 | 25.902 billion km on 18 Nov 2026 | 1 light-day (NASA "Where are Voyager 1 and 2 now", read 2026-11-05) |

Round trip is double. A question and answer with Mars takes 6 to 45 minutes. NASA's April 2026 Voyager 1 shutdown note said commands would take about 23 hours to arrive.

## 4. Radiation

From the Curiosity rover's Radiation Assessment Detector (RAD), SwRI press release of 9 Dec 2013 on Hassler et al., Science (doi: 10.1126/science.1244797):

- Mars surface, Aug 2012 to Jun 2013: average galactic cosmic ray dose equivalent **0.67 mSv/day**.
- Cruise to Mars, inside the spacecraft: **1.8 mSv/day**.
- Transit for a round trip with current propulsion and similar solar activity: **about 0.66 Sv**. Adding a 500-day surface stay brings the total to **about 1 Sv**.
- The release states 1 Sv is associated with a 5% increase in fatal cancer risk; NASA's career limit for low Earth orbit was a 3% increase.

Game use: a dose budget that rises faster in transit than on the surface, with shielding and time as the levers. These figures are from 2013 and one solar-cycle phase; say so if you show them as exact.

## 5. Mission status (read 2026-11-05: recheck before release)

| Mission | Status as read | Source and page date |
|---|---|---|
| Artemis I | Uncrewed SLS/Orion test flight, Nov 2022, complete | nasa.gov/humans-in-space/artemis |
| Artemis II | Crewed lunar flyby, launched 1 Apr 2026, splashdown 11 Apr 2026 (UTC). Crew: Reid Wiseman, Victor Glover, Christina Koch, Jeremy Hansen (CSA). Closest approach about 6,545 km above the lunar surface | NASA Artemis page; Wikipedia Artemis II |
| Artemis III | Planned 2027: crewed **low Earth orbit** demonstration of rendezvous and docking with commercial landers. Crew named on the NASA page: Randy Bresnik, Frank Rubio, Andre Douglas, Luca Parmitano (ESA) | NASA Artemis page (news items dated 23 Oct 2026) |
| Artemis IV | First crewed Moon landing of the program, planned 2028 | NASA Artemis page |
| Europa Clipper | Launched 14 Oct 2024 (Falcon Heavy). Mars gravity assist 2025. Earth gravity assist 3 Dec 2026. Jupiter arrival April 2030; 49 close Europa flybys planned | science.nasa.gov/mission/europa-clipper (updated 3 Nov 2026) |
| JWST (Webb) | Launched 25 Dec 2021; orbits the Sun at L2, about 1.5 million km from Earth; active, publishing results (latest item 29 Oct 2026) | science.nasa.gov/mission/webb |
| Perseverance | Landed 18 Feb 2021 in Jezero Crater; active; odometer 45.22 km on 11 Oct 2026, passing Opportunity's off-world driving record. Ingenuity made 72 flights. "Cheyava Falls" sample shows potential biosignatures needing further study (Nature, Sept 2025) | science.nasa.gov/mission/mars-2020-perseverance (updated 14 Oct 2026) |
| Voyager 1 and 2 | Launched 1977; extended mission, active. Interstellar space: Voyager 1 in 2012, Voyager 2 in 2018. Instruments still on: magnetometer and plasma wave subsystem on both; cosmic ray subsystem on Voyager 2 only. Voyager 1 LECP shut off 17 Apr 2026. Voyager 1 reaches one light-day from Earth on 18 Nov 2026 | science.nasa.gov/mission/voyager (updated 15 Oct 2026); JPL news 17 Apr 2026 |

## 6. Common errors in games

| Error in the game | Correct fact | Source | Fun-preserving fix |
|---|---|---|---|
| Explosions and engines are audible in space | Sound does not travel in a vacuum; there is little or no matter to carry vibrations | NASA eClips sound lesson (PDF in sources) | Keep audio, but justify it: sound through the hull, suit mic, or a "cockpit audio" toggle labelled in settings |
| "Dark side of the Moon" is permanently dark | The far side is unseen, not unlit; at new moon it is in full sunlight | science.nasa.gov/moon/facts | Call it the far side; make its hazard radio blackout from Earth, not darkness |
| Asteroid belts are dense fields you dodge through | All asteroids together have less mass than the Moon; the average spacing in the main belt is about 600,000 miles (965,600 km) and spacecraft cross it as if empty | NASA asteroid facts; Astronomy magazine, Dec 2024 | Put dense fields in a fresh collision debris cloud or a ring, and say so in the codex |
| Instant voice/video with Mars or beyond | Earth-Mars one-way delay is 3.0 to 22.3 min | NASA Mars fact sheet, computed | Message queues and pre-planned command lists; delay becomes the puzzle |
| Mars storms knock over equipment | Strongest winds about 60 mph; even the largest storms likely could not tip or rip apart major equipment | NASA "The Fact and Fiction of Martian Dust Storms" (2015, updated 2026) | Keep the storm; threaten power (dust on panels), visibility, and navigation |
| Mars has a thin oxygen atmosphere | 95.1% CO2, 0.16% O2, about 6 mbar | NASA Mars fact sheet | "Thin carbon dioxide air"; oxygen is a resource players make |
| Mars gravity treated as Earth gravity, or as Moon gravity | 0.38 g on Mars vs 0.165 g on the Moon | NASA fact sheet | Use a per-planet gravity constant for jumps, falls, and thrown objects |
| "Zero gravity" on a space station | At ISS altitude gravity is about 90% of surface value; crews float because they are in free fall | NASA "What is microgravity?" | Characters can say "zero-g"; the codex says "free fall" |
| Venus is just a hot Earth | 92 bar surface pressure, 464 °C, CO2 atmosphere with SO2; day (117 Earth days) shorter than rotation (243 days, backwards) | NASA Venus fact sheet | Use the extremes: crushing pressure as a timer, a slow sunrise in the west |
| Titan is a frozen airless moon | Thick nitrogen atmosphere about 60% denser than Earth's at the surface; methane lakes; about -179 °C | science.nasa.gov Titan facts | A world where suits need heat and oxygen but not pressure |
| Ocean moons "have life" | No life found; Europa and Enceladus have conditions that might support it | NASA Europa and Enceladus pages; Europa Clipper goal statement | Frame as "could support life"; make the search the game |
| Mission status stated as fact in shipped text | Artemis III changed to a 2027 LEO test, first landing moved to Artemis IV (2028) | NASA Artemis page, read 2026-11-05 | Date mission lines in the codex, or set the game in a fictional year |

## 7. How to recheck

- Fact sheet: open https://nssdc.gsfc.nasa.gov/planetary/factsheet/ and compare the "Last Updated" footer to 18 March 2025. If it changed, re-copy the table.
- Missions: open each mission page, read its "last updated" date and newest news item, and update section 5 with the date you read it.
- Anything not confirmed on a fetched page is marked UNVERIFIED above (Europa and Enceladus atmospheres, Pluto atmosphere composition).
