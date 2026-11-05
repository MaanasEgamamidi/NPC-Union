---
name: netcode-model-selection
description: Choose a netcode model, timing and bandwidth budget, and library for a multiplayer game, and write it up as a decision record.
owner: netcode-architect
disable-model-invocation: true
argument-hint: "[genre, players per match, engine, target regions]"
---

# Netcode model selection

A repeatable procedure for turning a game's constraints into a netcode decision with numbers.

## Inputs

- Genre and core verb (shooting, melee, building, turn taking).
- Players per match and number of simulated entities.
- Engine and exact version.
- Target regions and worst-case round-trip time to support.
- Hosting budget: dedicated servers, relay only, or none.
- Whether competitive integrity matters (ranked play, money, esports).

If genre, player count, or engine is missing, ask for it. For anything else, assume a default (150 ms worst RTT, no dedicated servers, casual) and write the assumption into the record.

## Steps

1. Classify the game: input-dense and small (2 to 8 players, deterministic sim possible), action with many entities, or slow and turn-based.
2. Choose the authority model. Input-dense and small: deterministic lockstep or rollback. Action: server-authoritative snapshots with client prediction for the local player and interpolation for remote entities. Slow: server or host-authoritative state sync without prediction. Write one rejected alternative and why.
3. Choose the topology: dedicated server, listen server, peer-to-peer, or relay. If competitive integrity matters and the model is not deterministic, require a dedicated server.
4. Set the timing table: sim tick rate, snapshot send rate, input delay, interpolation delay (about 2 send intervals plus jitter), and rollback or lag-compensation rewind window. Show the arithmetic in milliseconds.
5. For rollback, check the sim cost: rollback window in frames times sim step cost must fit inside one frame. If it does not, shrink the window, raise input delay, or switch model.
6. Estimate bandwidth: list the fields of the main replicated entity with bits after quantisation, multiply by entities visible per client and by send rate, add packet header overhead, and compare against the per-client budget.
7. Choose the library or engine system. WebFetch its current documentation for each feature you rely on (prediction, interest management, host migration) and record the URL and date. Mark anything unchecked UNVERIFIED.
8. Write the test plan: latency, jitter, and loss profiles to run, plus a desync or misprediction detector (state checksums per tick for deterministic games, correction-distance logging for predicted games).

## Output

```markdown
# Netcode decision: <game>

## Context
Genre: | Players per match: | Engine and version: | Worst RTT: | Hosting: | Competitive:
Assumptions:

## Authority and topology
Chosen: <model>, <topology>. Reason:
Rejected: <alternative>. Reason:

## Timing budget
| Item | Value | Arithmetic |
|---|---|---|
| Sim tick rate | | |
| Send rate | | |
| Input delay | | |
| Interpolation delay | | |
| Rollback or rewind window | | |

## Bandwidth budget
| Field | Bits | Notes (quantisation, delta) |
|---|---|---|
Per entity: | Entities per client: | Per client per second: | Budget:

## Library choice
Library and version: | Docs checked (URL, date): | UNVERIFIED items:

## Risks and test plan
| Condition | Profile | Expected behaviour | Detector |
|---|---|---|---|

## Open questions
```

## Done when

- [ ] Authority model, topology, and one rejected alternative are named with reasons.
- [ ] Every row of the timing table has a number and its arithmetic.
- [ ] Rollback designs show sim step cost times window fits in one frame, or flag it as unmeasured.
- [ ] Bandwidth is estimated per client per second at the maximum player count.
- [ ] Every library claim has a doc URL and date, or is marked UNVERIFIED.
- [ ] The test plan includes at least one loss, one jitter, and one high-latency profile.
- [ ] Assumptions made for missing inputs are written down.
