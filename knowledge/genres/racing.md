---
topic: racing
owner: racing-expert
last_verified: 2026-11-05
---

# Racing

## Core loop

Corner: brake, turn in, hit the apex, exit fast. Lap: string corners together and find time. Race: beat rivals or the clock. Session: earn cars, upgrades, or ranks, then pick the next race. Arcade and kart racers add a resource loop (boost, drift charge, items) on top of the racing line.

## Design pillars

- Readable handling: the player can feel grip loss before it happens.
- Speed feel: camera, audio, and near-field objects sell velocity.
- Fair competition: catch-up systems stay out of sight or are tied to visible rules.
- Fast retry: restart and rematch with almost no wait.
- Mastery depth: a second skill line beyond the racing line (drift boost, slipstream, items).

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Mario Kart 8 Deluxe | 2017 | Nintendo EPD | Position-weighted items, mini-turbo drifts, assists for new players | https://en.wikipedia.org/wiki/Mario_Kart_8_Deluxe |
| Gran Turismo 7 | 2022 | Polyphony Digital | Sim handling with assists, licence tests as tutorials, car collection | https://en.wikipedia.org/wiki/Gran_Turismo_7 |
| Forza Horizon 5 | 2021 | Playground Games | Open-world event density, festival progression | https://en.wikipedia.org/wiki/Forza_Horizon_5 |
| Burnout 3: Takedown | 2004 | Criterion Games | Boost earned by risk, takedowns as reward | https://en.wikipedia.org/wiki/Burnout_3:_Takedown |
| F-Zero GX | 2003 | Amusement Vision | Extreme speed feel, large fields of racers | https://en.wikipedia.org/wiki/F-Zero_GX |
| Trackmania | 2020 | Nadeo | Instant restart, ghosts, time-attack loop, track editor | https://en.wikipedia.org/wiki/Trackmania_(2020_video_game) |
| Need for Speed: Most Wanted | 2005 | EA Black Box | Police heat levels, rival list progression | https://en.wikipedia.org/wiki/Need_for_Speed:_Most_Wanted_(2005_video_game) |

## Common failures

- Speed feels low because the camera FOV is fixed and nothing passes close to the camera.
- Rubber banding the player can see on straights.
- Grip loss with no warning, so crashes feel random.
- Slow restarts that punish practice.
- Long empty drives between open-world events.
- Boost that is too weak or too short to feel like a reward.

## Scope traps

- Real car and brand licensing (cost, approval time, damage limits).
- Too many tracks at launch; fewer tracks with reverse and mirror variants go further.
- Online netcode for close, physics-heavy racing.
- Split-screen performance budget.
- Building a sim tire model when the game is an arcade racer.

## Sources

- English Wikipedia pages listed in the table (each URL returned HTTP 200 on 2026-11-05).
- Design notes in `agents/knowledge/genres/racing-expert.md`.
