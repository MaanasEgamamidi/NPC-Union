---
topic: platformer
owner: platformer-expert
last_verified: 2026-11-05
---

# Platformer

## Core loop

Read the next obstacle, move and jump to answer it, land or fail, retry quickly, and reach the next safe point. Movement is the main verb, so the feel of running and jumping carries the whole game.

## Design pillars

- Responsive control: forgiveness windows (coyote time, jump buffering), variable jump height, low input latency.
- Readable space: the player can see where they will land, and hazards stand out from the background.
- Teaching through levels: each mechanic is introduced safely, developed, twisted, and tested.
- Cheap failure: fast respawn near the failure point, so difficulty feels fair.
- One idea at a time: levels built around a single mechanic, explored fully.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Super Mario Bros. | 1985 | Nintendo | World 1-1 teaching without text; momentum and run-jump | https://en.wikipedia.org/wiki/Super_Mario_Bros. |
| Super Meat Boy | 2010 | Team Meat | Instant respawn; death replay at level end; short levels | https://en.wikipedia.org/wiki/Super_Meat_Boy |
| Spelunky | 2008 | Derek Yu (Mossmouth) | Procedural levels from room templates with a guaranteed path | https://en.wikipedia.org/wiki/Spelunky |
| Rayman Legends | 2013 | Ubisoft Montpellier | Music levels synced to jumps; co-op flow | https://en.wikipedia.org/wiki/Rayman_Legends |
| Ori and the Blind Forest | 2015 | Moon Studios | Bash ability; player-placed save points (Soul Link); escape sequences | https://en.wikipedia.org/wiki/Ori_and_the_Blind_Forest |
| Super Mario Odyssey | 2017 | Nintendo EPD | Capture mechanic; dense 3D sandboxes; many small goals | https://en.wikipedia.org/wiki/Super_Mario_Odyssey |
| Celeste | 2018 | Maddy Makes Games (credited at release as Matt Makes Games) | Coyote time, jump buffer, corner correction; Assist Mode; dash refills | https://en.wikipedia.org/wiki/Celeste_(video_game) |

All seven Wikipedia links returned HTTP 200 on 2026-11-05.

## Common failures

- Floaty jumps from a single gravity value for rise and fall.
- No coyote time or jump buffer, so players feel cheated at edges and landings.
- Hurtbox the size of the sprite, so hits look unfair.
- Camera that hides the landing spot, forcing leaps of faith.
- Long respawn or checkpoints far from hard sections, so players replay solved content.
- Mechanics shown once and dropped, or many mechanics introduced in one level.
- Hazards that blend into background art.
- Anticipation animation that delays takeoff and adds input latency.

## Scope traps

- Too many mechanics: each one needs several levels to teach and test.
- Unique art per level instead of per world.
- 3D platforming: camera control and depth reading cost far more than in 2D.
- Procedural levels without a guaranteed critical path.
- Co-op added late: camera, respawn, and level width all change.
- Physics-based movement that cannot be tuned per value.

## Sources

- English Wikipedia pages for each reference game (links above, checked 2026-11-05).
- Itay Keren, "Scroll Back: The Theory and Practice of Cameras in Side-Scrollers", GDC 2015 (GDC Vault, URL UNVERIFIED).
- Derek Yu, "Spelunky" (Boss Fight Books, 2016), on room-template generation.
- Maddy Thorson's public notes on Celeste's forgiveness mechanics (coyote time, jump buffering, corner correction); exact post URL UNVERIFIED.
- Koichi Hayashida's interview on kishotenketsu level structure in Super Mario 3D Land (Game Developer / Gamasutra, 2012; URL UNVERIFIED).
