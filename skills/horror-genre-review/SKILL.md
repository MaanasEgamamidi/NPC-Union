---
name: horror-genre-review
description: Audit a horror game design against the genre's loop, pillars, failure modes, and scope traps, and return ranked risks with owners.
owner: horror-expert
disable-model-invocation: true
argument-hint: "[design doc path or short pitch of the horror game]"
---

# Horror genre review

A repeatable audit of a horror design. Uses `knowledge/genres/horror.md` as the reference.

## Inputs

- A design doc, pitch, or level description.
- If missing, ask: What fear should the player feel? Can the player fight back? How long is a session and the whole game? What is the platform and team size?

## Steps

1. Read `knowledge/genres/horror.md` and pick the two or three closest reference games.
2. Write the fear target in one line (dread, panic, disgust, unease, or a mix).
3. Map the core loop as verbs: explore, notice, evade or fight, recover. Flag any missing verb.
4. Sketch the tension curve for one session: build, spike, release, with rough minutes for each. Flag stretches over 15 minutes with no release or no spike.
5. Audit the threat: first sighting, how often it is seen, how its rules change over the game, and the player's counter. Flag over-exposure.
6. Audit scarcity: ammo, healing, light, and save access. Check failure cost (time lost on death).
7. Count jump scares and check each is a payoff for built dread, not a filler.
8. Check sound and vision limits: what the player can hear but not see.
9. Check each item in the Common failures and Scope traps sections of the knowledge file.
10. Rank the risks by impact and assign each fix to one NPC Union agent.

## Output

```
# Horror review: <project>
Assumptions: <list>
Fear target: <one line>
Closest references: <game: what to copy or avoid>
Core loop: <verbs> | Missing: <verbs or none>
Tension curve (one session): <build min> / <spike> / <release min>
Threat notes: <first sighting, exposure, rule changes, counter>
Scarcity and failure cost: <notes>
Risks (ranked):
1. <risk> | Fix: <fix> | Owner: <agent>
2. ...
Scope traps hit: <list or none>
```

## Done when

- [ ] Fear target is one line.
- [ ] At least two reference games from the knowledge file are named.
- [ ] Tension curve has build, spike, and release.
- [ ] Threat exposure and rule changes are covered.
- [ ] Every risk has a fix and a named owner agent.
- [ ] Common failures and scope traps were checked.
