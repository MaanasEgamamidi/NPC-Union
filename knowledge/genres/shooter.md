---
topic: shooter
owner: shooter-expert
last_verified: 2026-11-05
---

# Shooter genre

Covers first-person and third-person shooters: arena, military, tactical round-based, hero, looter, and campaign shooters. Battle royale has its own file owned by battle-royale-expert.

## Core loop

1. Spawn or start an encounter.
2. Move and read the space (cover, sightlines, objectives).
3. Find a target, aim, shoot.
4. Win or lose the exchange (kill, death, or disengage).
5. Get a reward (score, ammo, health, loot, objective progress, currency).
6. Reposition or respawn and repeat.

Outer loops sit on top: rounds and buy phases (Counter-Strike, Valorant), match progression and loadout unlocks (Call of Duty 4), loot and gear (Destiny), seasons (Fortnite, Destiny).

## Design pillars

- **Gunfeel:** layered feedback (visuals, recoil, sound, hit markers, enemy reaction) makes each shot readable.
- **Pace set by time-to-kill:** TTK and movement speed together decide whether the game rewards positioning, tracking, or ability use.
- **Readable spaces:** sightlines match weapon ranges, cover is spaced for the movement speed, and spawns are safe.
- **Fair exchanges:** hit registration, lag compensation, and aim assist must feel fair to both shooter and target.
- **Mastery headroom:** recoil control, movement tech, map knowledge, and economy or ability decisions give long-term skill growth.
- **Clear role of each weapon:** every gun has a range or situation where it is the best pick.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Halo: Combat Evolved | 2001 | Bungie | Regenerating shields over health, two-weapon limit, grenades and melee as a combat triangle, vehicle sandbox | https://en.wikipedia.org/wiki/Halo:_Combat_Evolved |
| Counter-Strike | 2000 (mod from 1999) | Valve (created by Minh Le and Jess Cliffe) | Round-based objectives, buy economy, first-shot accuracy and movement inaccuracy, no respawn within a round | https://en.wikipedia.org/wiki/Counter-Strike_(video_game) |
| Call of Duty 4: Modern Warfare | 2007 | Infinity Ward | Fast TTK, killstreaks, class creation, perks, XP unlocks that shaped later multiplayer progression | https://en.wikipedia.org/wiki/Call_of_Duty_4:_Modern_Warfare |
| Destiny | 2014 | Bungie | Shooter combined with loot and gear progression, PvE activities, raids, expansions as a live-service model | https://en.wikipedia.org/wiki/Destiny_(video_game) |
| Doom | 2016 | id Software | Push-forward combat: Glory Kills give health, chainsaw gives ammo; fast movement; arena encounters | https://en.wikipedia.org/wiki/Doom_(2016_video_game) |
| Titanfall 2 | 2016 | Respawn Entertainment | Wall-running and pilot movement, Titan mode switch, campaign that adds a new mechanic per level | https://en.wikipedia.org/wiki/Titanfall_2 |
| Fortnite | 2017 | Epic Games | Third-person shooting plus building, seasons and battle pass, cross-platform live service | https://en.wikipedia.org/wiki/Fortnite |
| Valorant | 2020 | Riot Games | Tactical round-based shooting combined with hero abilities and anti-cheat design | https://en.wikipedia.org/wiki/Valorant |

Link check: all eight Wikipedia links returned HTTP 200 on 2026-11-05. Game details in the table were written from knowledge and not re-read against each page.

## Common failures

- **Weak gunfeel:** missing hit sounds, flinch, or recoil, so guns feel like they do nothing even when damage is right.
- **TTK mismatch:** TTK too low for the movement speed (no time to react) or too high for the map size (fights drag).
- **Sightlines longer than weapon ranges:** one weapon class owns the map.
- **Unsafe spawns:** spawning into live fire or behind enemies breaks trust.
- **Netcode surprises:** dying behind cover, unregistered hits, or desync blamed on "bad guns."
- **Dominant weapon:** one gun is best at every range, so the sandbox collapses to one pick.
- **No controller plan:** shipping on console without tuned aim assist, or with aim assist so strong that cross-play becomes unfair.
- **Unreadable enemies:** silhouettes and team colors that blend into the environment.
- **Cheating:** competitive PvP without an anti-cheat and reporting plan.

## Scope traps

- Shipping a campaign and competitive multiplayer at the same time: each is a full game.
- Live-service plans (seasons, battle pass, ranked) before the core loop is fun.
- Large weapon counts: balance cost grows with every pair of weapons. Start with a few clearly different guns.
- Big open maps that need vehicles, streaming, and many players to fill.
- Dedicated servers, matchmaking, ranked play, and anti-cheat are each large backend jobs. Prototype with local or bot play first.
- Many modes at launch splits a small player base across queues.

## Sources

- Wikipedia pages listed in the table, all fetched (HTTP 200) on 2026-11-05.
- For a Halo combat design reference, locate the original developer talk and check its wording before attributing a quotation.
- Check Riot's current technical announcements before citing Valorant server tick rates.
- Patch-dependent numbers (weapon damage, fire rates, aim assist values) change often. Check publisher patch notes before citing.
