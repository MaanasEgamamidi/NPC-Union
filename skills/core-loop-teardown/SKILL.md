---
name: core-loop-teardown
description: Takes apart a shipped or in-progress game's core loop at three timescales, with MDA aesthetics and failure points. Use for reference studies or "why isn't this fun".
owner: game-designer
disable-model-invocation: true
argument-hint: "[game name, or path to your build notes]"
---

# Core loop teardown

## Inputs

- The game (real, shipped, or your own build) and what the user wants to learn from it.
- For a shipped game, a source to check facts against (official site, store page, patch notes). Do not describe mechanics you cannot confirm; mark them `UNVERIFIED`.

## Steps

1. List the verbs the player uses in the first 10 minutes and the objects each verb acts on.
2. Draw the moment loop (seconds): input → system response → feedback. Note the feedback channels (visual, audio, haptic).
3. Draw the encounter loop (tens of seconds to minutes): goal → actions → resolution → reward.
4. Draw the session loop: what is carried between sessions, the natural stopping point, the reason to return.
5. For each loop, mark what the player gives (time, risk, resource) and gets (resource, knowledge, status).
6. Name the two or three primary MDA aesthetics, with the mechanic that produces each.
7. Find where the pattern is fully learned and what the game does next (new pattern, new combination, or nothing).
8. Separate the fun loop from any reward schedule: remove the reward in your head; is the action still wanted?
9. Write three lessons the user can steal and one thing not to copy, with the reason.

## Output

```markdown
# Teardown: <game>
**Sources checked:** <links>
**Verbs:** <verb → objects>
| Loop | Timescale | Give | Get | Feedback |
|---|---|---|---|---|
| Moment | ~<s> | | | |
| Encounter | ~<s/min> | | | |
| Session | ~<min> | | | |
**Primary aesthetics:** <aesthetic>: <mechanic>
**Pattern learned at:** <point>; **game then:** <response>
**Fun without the reward?** <yes/no + why>
**Steal:** 1. 2. 3.  **Don't copy:** <thing + reason>
```

## Done when

- [ ] All three timescales are filled, or a missing one is flagged as a finding.
- [ ] Every claim about a shipped game has a source or is marked UNVERIFIED.
- [ ] Aesthetics are tied to specific mechanics.
- [ ] Lessons are concrete enough to act on.
