---
title: Level design metrics, structure and teaching by layout
tags: [level-design, metrics, blockout, greybox, beat-chart, kishotenketsu, portal, gating]
sources: [https://book.leveldesignbook.com/process/blockout/metrics, https://www.gamedeveloper.com/design/the-secret-to-i-mario-i-level-design, https://theportalwiki.com/wiki/Portal_developer_commentary, https://developer.valvesoftware.com/wiki/Dimensions_(Half-Life_2_and_Counter-Strike:_Source), https://gdcvault.com/play/1024562/Change-and-Constant-Breaking-Conventions]
last_verified: 2026-11-05
---

# Level design metrics, structure and teaching by layout

## Player and building metrics by engine

From The Level Design Book, metrics chapter (fetched 2026-11-05). Starting points only; measure your own controller.

| Engine | Units | Player box (W x H) | Eye height | Interior wall (D x H) | Min hall width | Door (W x H) | Step (H x D) |
|---|---|---|---|---|---|---|---|
| Unity | metres (convention) | 1.0 x 1.8 m | 1.5-1.7 m | 0.1 x 3.0 m | 2.0 m | 1.25 x 2.5 m | 0.1 x 0.15 m |
| Unreal | centimetres | 60 x 176 cm | 152 cm | 20 x 300 cm | 150 cm | 110 x 220 cm | 15 x 25 cm |
| Quake / Half-Life / Source | units (about inches) | 32 x 72 | 64 | 16 x 128 | 64 | 56 x 112 | 8 x 12 |
| US real life | inches | 20 x 69 | 66 | 6 x 96 | 48 | 36 x 80 | 7 x 11 |

Also from the same chapter:
- Minimum hall width at least twice player width, and it will still feel tight.
- Stair landings every 12-16 steps; realistic stairs 30-35 degrees (7/11 rise to run is about 32 degrees).
- Use world-aligned grid or checker textures in blockout; avoid flat colours and busy textures.
- Lock camera height early; horizontal FOV sliders of 60-90 degrees are common; Quake's default was 90.
- Team Fortress 2 ranges cited: close about 256 units, medium about 1024, long about 2048; max fall without damage 256.
- Build a "metrics zoo" developer map: rooms, halls, varied floor heights; playtest usability, then feel; revise.

Source engine: max step height 18 units, player collision height 72 standing (Valve Developer Community dimensions page; the page returned 403 to automated fetch on 2026-11-05, figures confirmed via search result snippets and consistent with The Level Design Book). Crouch and jump heights differ between page revisions and games: UNVERIFIED, measure in your build.

## Gap rule of thumb (house heuristic, not sourced)

| Gap type | Share of max jump distance | Use |
|---|---|---|
| Safe | 70-80% | teaching, traversal |
| Skill | 85-95% | challenge |
| Impossible | over 100% | deliberate barrier |

## Kishōtenketsu (four-panel structure)

Koichi Hayashida, director of Super Mario 3D Land, Game Developer interview by Christian Nutt, 13 April 2012: levels resemble four-panel comics: introduce a concept, develop it, a change-up in the third panel, then a conclusion. Use for one-gimmick levels.

## Teaching by layout: Portal developer commentary

Fan-compiled transcripts at theportalwiki.com (wording may differ slightly from game files):
- Without serious prompting, players rarely look up; a ladder prompts them to investigate upward.
- Chamber 10: exit portal surfaces were first static in their final position, but playtesters did not look up to find them; putting them on moving pistons started them where players would see them.
- Early versions let players stumble through without understanding, which compromised teaching; early training puzzles generally have one correct solution.
- Playtesting found fatigue set in unless deliberate puzzles were broken up with simpler tasks under time pressure.

## Half-Life 2 (care with claims)

Ravenholm is built around the gravity gun with scarce ammunition and saw blades as improvised weapons (Wikipedia, Ravenholm). [Transcribed developer commentary](https://www.combineoverwiki.net/wiki/Developer_commentary/Half-Life_2) describes gravity-gun physics as central to Ravenholm and identifies saw blades among its objects.

## Breath of the Wild systemic layout

GDC 2017 session "Change and Constant: Breaking Conventions with The Legend of Zelda: Breath of the Wild" (Dohta, Fujibayashi, Takizawa). Press coverage reports the chemistry engine as a rule-based state calculator for elements (fire, water, ice) and materials. Relevant to levels: spaces built for multiple solutions rather than a single key.

## Beat chart columns

beat, location, intended emotion, new thing learned, threat 1-5, minutes, reward. Cut rows with no learning and no reward.
