---
topic: city-builder
owner: city-builder-expert
last_verified: 2026-11-05
---

# City-builder

Covers city-builders, settlement builders, and colony-survival builders where the player places structures and a simulation responds.

## Core loop

1. Place: zone land, lay roads, or place buildings and services.
2. Simulate: citizens or workers arrive, move, produce, and consume.
3. Read feedback: demand meters, overlays, needs panels, and money show what the city wants and where it is failing.
4. Adjust: rebuild, reroute, upgrade, or expand to meet new needs.
5. Escalate: growth unlocks higher tiers or new pressure (disasters, deadlines, new regions), and the loop starts again at a larger scale.

## Design pillars

- Readable demand: the player can always see what the city wants next.
- Visible simulation: overlays and agents make cause and effect traceable.
- Placement as the main skill: where things go matters more than how fast the player clicks.
- Growing pressure: each stable layout meets a new problem.
- Safe experimentation: pause, undo, and fair bulldoze rules invite rebuilding.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| SimCity | 1989 | Maxis | RCI demand meter; zoning instead of placing single buildings; disasters as pressure | https://en.wikipedia.org/wiki/SimCity_(1989_video_game) |
| Pharaoh | 1999 | Impressions Games | Walker-based service coverage; housing that evolves by desirability; flood-cycle farming | https://en.wikipedia.org/wiki/Pharaoh_(video_game) |
| Banished | 2014 | Shining Rock Software | Survival from internal systems only; aging and birth rates; seasonal food stores | https://en.wikipedia.org/wiki/Banished_(video_game) |
| Cities: Skylines | 2015 | Colossal Order | Agent traffic and lane choice; info overlays; districts and policies; mod support | https://en.wikipedia.org/wiki/Cities:_Skylines |
| Frostpunk | 2018 | 11 bit studios | Heat as the central resource; Book of Laws trade-offs; story deadlines as structure | https://en.wikipedia.org/wiki/Frostpunk |
| Anno 1800 | 2019 | Ubisoft Blue Byte | Population tiers tied to needs; long production chains; cross-island logistics | https://en.wikipedia.org/wiki/Anno_1800 |
| Townscaper | 2020 | Oskar Stålberg | No goals or fail state; tactile placement; automatic shape rules on an irregular grid | https://en.wikipedia.org/wiki/Townscaper |

## Common failures

- No demand signal: players guess what to build and churn.
- Invisible simulation: problems exist but no overlay shows the cause.
- Traffic or logistics collapse at scale with no tools to diagnose or fix junctions.
- Cohort death waves: residents arrive together, age together, and die together, crashing workforce.
- One missing service silently blocks housing upgrades across a district.
- Bookkeeping resources that create no decisions, only more chains to babysit.
- Flat midgame: the first layout stabilises and nothing new arrives.
- Punishing rebuilds: low or no bulldoze refunds discourage fixing early mistakes.
- Opaque production ratios that push players to outside spreadsheets.

## Scope traps

- Agent-based traffic and pathfinding: expensive to build and to keep fast at large populations. Consider aggregate flow or scheduled routes.
- Map size and population targets set late: performance and save size grow with the city. Fix a target early and test at it.
- Too many resources and tiers at launch: start with a short chain and add tiers after the loop works.
- Free-form roads and terrain editing: curves, slopes, and intersections multiply edge cases. A grid is cheaper.
- Day-night, seasons, and weather all at once: each touches every production building.
- Mod support and save compatibility promised before systems settle.

## Sources

- English Wikipedia pages listed in the reference table, fetched 2026-11-05 (HTTP 200; developer and year checked against page text). Mechanic descriptions are the agent's analysis and were not checked line by line against each page.
- Design observations above are the agent's own analysis of the listed games. Version-specific numbers (population caps, map tile counts, DLC features) are left out on purpose; look them up before citing.
