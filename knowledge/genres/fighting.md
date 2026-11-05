---
topic: fighting
owner: fighting-expert
last_verified: 2026-11-05
---

# Fighting games

## Core loop

1. Neutral: both players move, space and poke, looking for an opening.
2. Hit or block: one player lands a hit, or gets blocked and has to deal with frame advantage.
3. Confirm and combo: the attacker checks the hit and turns it into a combo.
4. Knockdown and okizeme: the attacker sets up pressure as the defender gets up.
5. Back to neutral, until a round ends. Rounds add up to a match.

The meta loop is learn, lose, lab (training mode), and come back with an answer.

## Design pillars

- Readability: every move has a clear startup, a clear hitbox and a clear recovery players can see.
- Every option has an answer: high, low, overhead and throw, plus a punish for unsafe moves.
- Fair inputs: a consistent buffer and reasonable link windows, so losses feel like decisions, not execution accidents.
- Character identity: each fighter has a game plan (zoner, grappler, rushdown) that changes how the matchup plays.
- Good online: rollback netcode, so remote matches feel close to offline.
- Room to learn: a training mode with frame data display, recording and playback.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Street Fighter II | 1991 | Capcom | The six-button layout, special move motions, and combos that came from cancel timing. | https://en.wikipedia.org/wiki/Street_Fighter_II |
| Street Fighter 6 | 2023 | Capcom | Drive gauge as a shared resource for offense and defense; Modern controls as a simpler scheme with a damage cost. | https://en.wikipedia.org/wiki/Street_Fighter_6 |
| Tekken 7 | 2015 | Bandai Namco | 3D movement with sidesteps, punish baselines, and Rage Arts as a comeback tool. | https://en.wikipedia.org/wiki/Tekken_7 |
| Super Smash Bros. Ultimate | 2018 | Bandai Namco Studios, Sora Ltd. | Percent damage and ring-outs; huge roster scope; simple directional special inputs. | https://en.wikipedia.org/wiki/Super_Smash_Bros._Ultimate |
| Guilty Gear Strive | 2021 | Arc System Works | Rollback netcode in an anime fighter; wall break as a reset to neutral; onboarding for new players. | https://en.wikipedia.org/wiki/Guilty_Gear_Strive |
| Mortal Kombat 11 | 2019 | NetherRealm Studios | Cinematic story mode, Fatal Blows as comeback moves, and character customization. | https://en.wikipedia.org/wiki/Mortal_Kombat_11 |
| Skullgirls | 2012 | Reverge Labs | Automatic infinite prevention, a detailed tutorial, and variable team size (1 to 3 characters). | https://en.wikipedia.org/wiki/Skullgirls |

## Common failures

- Delay-based netcode at launch. Online play feels bad and players leave.
- Touch-of-death combos with no scaling or escape.
- One dominant option (a fast safe move, an unreactable overhead) that makes the game about one button.
- Throws with no counterplay, or throws so weak that blocking always wins.
- Tutorials that teach inputs but not why to use a move.
- Simple control schemes with no trade-off, so the classic scheme becomes pointless.
- A roster where several characters share the same game plan.

## Scope traps

- Roster size: matchups grow as n(n+1)/2. 10 characters is 55 matchups; 24 is 300.
- Animation count: each character needs dozens of unique animations (normals, specials, hit reactions, throws, intros, wins).
- Rollback retrofits: rollback needs deterministic, rewindable game state. Adding it late is very costly.
- Story modes and cinematics can cost as much as the fighting itself.
- Post-launch balance: patches, frame data updates and character DLC are an ongoing commitment.

## Sources

- English Wikipedia pages for each game in the table above (links listed in the table).
- GGPO rollback library by Tony Cannon: https://en.wikipedia.org/wiki/GGPO UNVERIFIED
- Official patch notes from each publisher for version-specific frame data and balance changes.
