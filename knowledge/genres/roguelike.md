---
topic: roguelike
owner: roguelike-expert
last_verified: 2026-11-05
---

# Roguelike

## Core loop

1. Start a run with a small, mostly fixed kit.
2. Move through procedurally assembled rooms or floors.
3. Make frequent choices that shape a build (items, cards, upgrades, routes).
4. Die (permadeath ends the run) or win.
5. Carry back knowledge, and in roguelites some unlocks, then start again.

The player's skill and knowledge should be the main thing that grows across runs. Meta-progression supports that; it should not replace it.

## Design pillars

- **Readable death:** the player can name why they died.
- **Meaningful variety:** each run asks for different decisions, not just different numbers.
- **Build expression:** choices combine into a recognizable strategy within one run.
- **Short restart cost:** getting back into a new run is fast and the opening is not a chore.
- **Fair randomness:** procedural content is built from authored pieces with guarantees (a reachable exit, a fair start).
- **Death that advances something:** knowledge, story, or sideways unlocks.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Rogue | 1980 | Michael Toy, Glenn Wichman (later Ken Arnold) | The origin of the genre's name: random dungeons, permadeath, turn-based grid play | https://en.wikipedia.org/wiki/Rogue_(video_game) |
| The Binding of Isaac | 2011 | Edmund McMillen, Florian Himsl | Large item pools with stacking effects; room-based procedural floors | https://en.wikipedia.org/wiki/The_Binding_of_Isaac_(video_game) |
| Spelunky | 2008 (freeware; HD remake 2012) | Derek Yu / Mossmouth | Room-template level generation with a guaranteed path; systemic interactions; daily challenge seed (HD) | https://en.wikipedia.org/wiki/Spelunky |
| FTL: Faster Than Light | 2012 | Subset Games | Pausable real-time combat; resource tension between fuel, scrap and crew; sector map routing | https://en.wikipedia.org/wiki/FTL:_Faster_Than_Light |
| Slay the Spire | 2019 (early access 2017) | Mega Crit | Card rewards with a skip option; visible enemy intent; three-act structure; Ascension difficulty steps | https://en.wikipedia.org/wiki/Slay_the_Spire |
| Hades | 2020 | Supergiant Games | Story delivered through death; sideways meta-progression (weapons, keepsakes) plus the Mirror upgrades; Heat difficulty modifiers | https://en.wikipedia.org/wiki/Hades_(video_game) |
| Vampire Survivors | 2022 | poncle | Auto-firing weapons, movement-only input; weapon evolutions as build goals; timed runs | https://en.wikipedia.org/wiki/Vampire_Survivors |

## Common failures

- **Upward-only meta-progression:** permanent stat boosts become the real reason to play, and players cannot tell whether they improved.
- **Unreadable deaths:** off-screen hits, hidden damage, or unclear enemy telegraphs make deaths feel random.
- **Same opening every run:** a long, low-risk first section taxes every restart.
- **Stat-bump offers:** reward choices that only change numbers do not create builds.
- **Pure-noise generation:** rooms with no authored structure produce unfair or dull layouts.
- **Dominant strategy:** one build or item wins most runs, so variety collapses. Watch pick-rate and win-rate data with playtest-analyst.
- **Runs too long for the death rate:** a loss late in a long run costs too much time.
- **No seed tooling:** bugs from random runs cannot be reproduced.

## Scope traps

- **Item count as a goal:** hundreds of items multiply balance and art work. Start with a small pool where each item changes play, then grow.
- **Multiple characters too early:** each character roughly multiplies balance testing. Ship one strong character before adding more.
- **Bespoke procedural systems:** a custom generator for every biome. Reuse one template-based generator with per-biome content.
- **Narrative per death:** reactive dialogue like Hades needs a large script and many conditions. Budget writing and voice before promising it.
- **Daily runs and leaderboards:** need deterministic seeds, server work and anti-cheat. Plan them as a later milestone.
- **Synergy testing explosion:** item pairs grow roughly with the square of item count. Test by tags or categories, not every pair.

## Sources

- English Wikipedia pages linked in the table above (years and developers). Links are standard Wikipedia URLs; not fetched in this session, so treat each as UNVERIFIED until checked.
- Berlin Interpretation (2008), RogueBasin: https://www.roguebasin.com/index.php/Berlin_Interpretation UNVERIFIED.
- Specific numbers in the agent file (Slay the Spire's 20 Ascension levels, Vampire Survivors' 30-minute standard stage) are from memory of the games; recheck against current patch notes.
