---
name: city-builder-genre-review
description: Audit a city-builder or colony-sim design against the genre's loop, demand signals, coverage, flow, failure modes, and scope traps.
owner: city-builder-expert
disable-model-invocation: true
argument-hint: "[design doc path or a short pitch of the city-builder]"
---

# City-builder genre review

A repeatable audit of a city-builder, colony-sim, or settlement design.

## Inputs

- The design doc or pitch.
- Target platform, target population or map size, and session length.
- If missing, ask: What does the player place? How does the player see what the city wants? What ends a session or a run? Is there a fail state? If no answer comes, state an assumption and continue.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/genres/city-builder.md`.
2. Write the loop as place, simulate, read feedback, adjust. For each step, name the signal the player sees. Mark any step with no visible signal.
3. Identify the demand signal (meter, bubbles, needs panel). If none exists, flag it as the top risk.
4. List every resource, service, and need. For each, note the decision it creates. Mark ones that only add bookkeeping as cut candidates.
5. Classify service coverage as radius or walker. Check that an overlay shows it.
6. Check flow: traffic, logistics, or carriers. Note whether movement uses agents, and what breaks at the target size.
7. Check population dynamics: arrival waves, aging, tier upgrades, and what happens when a need is unmet.
8. Check pacing: what new pressure arrives once the first layout stabilises (new tier, disaster, deadline, new region).
9. Check rebuild support: bulldoze refunds, undo, pause with build access.
10. Run the Common failures and Scope traps lists from the knowledge file against the design. Mark each as present, absent, or unclear.
11. Pick one reference game per major finding from the knowledge file table.
12. Name the hand-off agent for each fix.

## Output

```
# City-builder review: <title>

**Verdict:** <one paragraph>

## Loop map
| Step | What the player does | Signal shown | Gap |
|---|---|---|---|

## Demand and feedback
- Demand signal: <present/absent, what it is>
- Overlays: <list, missing ones>

## Resources and needs
| Item | Decision it creates | Keep / cut |
|---|---|---|

## Top risks
1. <risk>: <fix>. Study: <game>. Owner: <agent>

## Scope traps
- <trap>: <cut or limit>

## Hand-offs
- <agent>: <what they get>

## Unverified
- <anything not checked>
```

## Done when

- [ ] Every loop step has a named signal or a marked gap.
- [ ] The demand signal is identified or flagged.
- [ ] Every resource has a decision or a cut recommendation.
- [ ] Coverage type and flow system are named, with behaviour at target size.
- [ ] Every common failure and scope trap from the knowledge file is marked.
- [ ] Each top risk has a fix, a reference game, and an owner agent.
- [ ] Unchecked claims are listed as UNVERIFIED.
