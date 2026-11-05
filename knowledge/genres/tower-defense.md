---
topic: tower-defense
owner: tower-defense-expert
last_verified: 2026-11-05
---

# Tower defense

## Core loop

Read the incoming wave and path, spend currency to place or upgrade defenses, watch the wave resolve, earn currency from kills and waves, then adjust. The decision is where and what to build under a budget, and the feedback is which enemies leaked and why.

## Design pillars

- Changing questions: each new enemy property (armor, flying, camo, speed, splitting) asks for a new answer.
- Placement as commitment: range, path bends, and sell penalties make where you build matter.
- Readable threat: range previews, clear enemy silhouettes, and a visible path before the wave.
- Pacing control: build time between waves, and early-call or speed-up options for skilled players.
- Roster distinctness: every tower has an enemy or situation where it is the best answer.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Desktop Tower Defense | 2007 | Paul Preece | Open-field mazing, path-blocking rules, flyers that ignore the maze | https://en.wikipedia.org/wiki/Desktop_Tower_Defense |
| Defense Grid: The Awakening | 2008 | Hidden Path Entertainment | Enemies carry cores out, so leaks are partial and recoverable | https://en.wikipedia.org/wiki/Defense_Grid:_The_Awakening |
| Plants vs. Zombies | 2009 | PopCap Games | Lanes instead of paths, sun economy, teaching one new idea per level | https://en.wikipedia.org/wiki/Plants_vs._Zombies |
| Kingdom Rush | 2011 | Ironhide Game Studio | Four tower types with late branching upgrades, call-early bonus, hero and reinforcements | https://en.wikipedia.org/wiki/Kingdom_Rush |
| Orcs Must Die! | 2011 | Robot Entertainment | Third-person hero plus traps, choke design around doors | https://en.wikipedia.org/wiki/Orcs_Must_Die! |
| Dungeon Defenders | 2011 | Trendy Entertainment | Co-op hero classes that place defenses, loot layer on top of TD | https://en.wikipedia.org/wiki/Dungeon_Defenders |
| Bloons TD 6 | 2018 | Ninja Kiwi | Three upgrade paths per tower, enemy properties (camo, lead), round-based scaling | https://en.wikipedia.org/wiki/Bloons_TD_6 |

## Common failures

- One dominant tower: wins DPS per gold against every enemy, so the roster collapses.
- Health-only scaling: later waves add hit points but no new properties, so the puzzle stops changing.
- Unreadable threats: enemy types look alike, or range is hidden until after placement.
- Snowballing income: interest plus kill bonus plus end-of-wave pay makes an early lead permanent.
- Dead downtime: long waves with nothing to decide, and no speed-up or early call.
- Overpowered hero: in hybrid designs, the hero replaces the towers instead of covering leaks.
- Mazing exploits: players find a pattern that blocks or loops enemies forever, or juggling exploits from sell and rebuild.

## Scope traps

- Upgrade trees multiply content: 3 paths of 5 tiers per tower across 20 towers is 300 upgrades to balance and draw.
- Each new enemy property touches every tower's targeting rules.
- Open-field mazing needs pathfinding on every placement and testing for blocked states.
- Endless or freeplay modes need a scaling curve and a reason to stop.
- Co-op and hero hybrids add netcode, classes, and loot on top of the TD core.
- Many maps with few distinct path ideas; ten maps that play the same cost as much as ten that do not.

## Sources

- Wikipedia pages linked in the Reference games table.
