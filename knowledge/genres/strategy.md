---
topic: strategy
owner: strategy-expert
last_verified: 2026-11-05
---

# Strategy

Covers real-time strategy (RTS), 4X, turn-based tactics, and grand strategy.

## Core loop

Observe the state (map, resources, enemy), decide on a plan with trade-offs, act (build, move, research, negotiate), then resolve and read the outcome. The loop repeats per turn in turn-based games and continuously in real time. Around it sits a longer loop: grow an economy, convert it into power, and spend that power to reach a win condition.

## Design pillars

- Meaningful decisions: each turn or minute offers at least two viable choices with different costs.
- Readable information: the player can see enough to plan, and hidden information is a deliberate tool.
- Counterplay: every strong option has an answer, ideally a soft counter rather than a hard one.
- Pacing across phases: early, mid, and late game each have their own main decision and pressure.
- Consequence: choices stick, so the player can trace a win or loss back to decisions.

## Reference games

| Name | What to study | Link |
|---|---|---|
| StarCraft II: Wings of Liberty | Three asymmetric factions, build orders, scouting under fog of war, competitive balance patching | https://en.wikipedia.org/wiki/StarCraft_II:_Wings_of_Liberty |
| Age of Empires II | Age-up phases as pacing gates, many civilizations from a shared unit base, long-term community balance | https://en.wikipedia.org/wiki/Age_of_Empires_II |
| Civilization VI | Districts that make city placement a map puzzle, multiple victory types, late-game turn length | https://en.wikipedia.org/wiki/Civilization_VI |
| XCOM: Enemy Unknown | Percent-to-hit tension, permadeath attachment, strategic layer feeding tactical missions | https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown |
| Total War: Warhammer II | Turn-based campaign joined to real-time battles, highly asymmetric races, campaign objective race | https://en.wikipedia.org/wiki/Total_War:_Warhammer_II |
| Into the Breach | Telegraphed enemy intent, small 8x8 maps, puzzle-like tactics with near-zero randomness in combat | https://en.wikipedia.org/wiki/Into_the_Breach |
| Crusader Kings III | Character-driven grand strategy, emergent stories from traits and succession, real time with pause | https://en.wikipedia.org/wiki/Crusader_Kings_III |

## Common failures

- Dominant strategy: one build, unit, or policy wins in most cases, so the decision space collapses.
- Late-game snowball: the leader's advantage compounds and the final third of a match is a formality.
- Micromanagement growth: turn time or required actions grow with empire size until players stop finishing games.
- Hard counters: matches become guessing at the opponent's composition instead of reacting to it.
- Opaque numbers: players cannot see why combat or diplomacy resolved the way it did.
- Resource sprawl: resources without clear sinks clutter the HUD and slow onboarding.
- AI that is strong but unreadable: players feel cheated rather than outplayed.
- Randomness without mitigation: high-percent misses feel like betrayal when no backup plan exists.

## Scope traps

- Asymmetric factions: each one multiplies balance, AI, art, voice, and tutorial work. Start with two.
- Competitive multiplayer: needs netcode (often deterministic lockstep for RTS), matchmaking, replays, anti-cheat, and ongoing balance patches.
- Strategy AI: a competent opponent across many map types is a long project. Budget it like a feature, not a task.
- Random map generation: needs fairness checks for starting positions and resources.
- Diplomacy systems: hard to make readable and hard for AI to play well.
- Campaign plus skirmish plus multiplayer: three modes, three sets of content and testing.
- Large unit counts in real time: pathfinding and performance costs rise quickly.

## Sources

- English Wikipedia pages listed in the reference table. The Total War: Warhammer II page was fetched on 2026-11-05; other page contents were not rechecked.
- Check the publisher's or developer's official game page before citing release dates or developer credits.
- Into the Breach combat uses an [8x8 grid](https://www.gameinformer.com/games/into_the_breach/b/pc/archive/2018/02/26/game-informer-review-into-the-breach).
