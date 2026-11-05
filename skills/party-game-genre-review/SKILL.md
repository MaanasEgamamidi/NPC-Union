---
name: party-game-genre-review
description: Audit a party game design against the genre loop, pillars, failure modes and scope traps, and return ranked fixes with owners.
owner: party-game-expert
disable-model-invocation: true
argument-hint: "[design doc path or short pitch, player count, local or online]"
---

# Party game genre review

A repeatable audit of a party game design. It does not restate the agent.

## Inputs

- The design: a doc path, a pitch, or a minigame list.
- Player count range and whether play is local, online or both.
- Input method: shared controllers, one controller each, phones, or mixed.
- Target audience and target session length.

If any are missing, ask once. If still missing, state an assumption and continue.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/genres/party-game.md` for the loop, pillars and failure list.
2. Map the design onto the party loop: join, learn, play round, results, play again. Note the time each step takes and any step that is missing.
3. Join-in audit: count the steps from "someone walks in" to "they are playing". Flag anything that needs an account, a download, or more controllers than the group likely owns.
4. Rule clarity audit: for each minigame or mode, check that the rules fit on one instruction screen and can be taught by one verb or one sentence.
5. Skill balance audit: describe how a first-time player and a skilled player fare. Check scoring for winner-take-all rounds, comeback or luck systems, and whether luck decides too much.
6. Spectator audit: what do waiting, eliminated or watching people see and do? Flag any stretch over about a minute with nothing to watch or do.
7. Readability audit: player colors, character silhouettes, text size and contrast at couch distance.
8. Social audit: does the design create talk, teasing, cooperation or betrayal? For online play, check kick, mute, private rooms and content filters.
9. Compare with at least two reference games from the knowledge file and name what each does better or worse.
10. Scope audit: count minigames, modes and online features against team size. Flag the scope traps listed in the knowledge file.
11. Rank the risks by impact on the room's fun and give one concrete fix each, with an owning NPC Union agent.

## Output

```
# Party game review: <title>

## Verdict
<one paragraph>

## Assumptions
- <assumption>

## Loop map
| Step | What happens | Time | Issue |
|---|---|---|---|
| Join | | | |
| Learn | | | |
| Play round | | | |
| Results | | | |
| Play again | | | |

## Pillar scorecard (1 to 5)
| Pillar | Score | Note |
|---|---|---|
| Fast to join | | |
| Rules on one screen | | |
| Fair across skill levels | | |
| Fun to watch | | |
| Readable from the couch | | |
| Creates social moments | | |

## Top risks
1. <risk>: <why it hurts> -> Fix: <change> (owner: <agent>)

## Scope traps
- <trap>: <cut or defer>

## Reference comparison
- <game>: <lesson>

## Next steps
- <agent>: <task>
```

## Done when

- [ ] Every loop step is filled in or marked missing.
- [ ] Every pillar has a score and a note.
- [ ] At least three risks, each with a fix and an owning agent.
- [ ] At least two real reference games compared.
- [ ] Assumptions are listed for any missing input.
- [ ] No unchecked fact is stated without an UNVERIFIED mark.
