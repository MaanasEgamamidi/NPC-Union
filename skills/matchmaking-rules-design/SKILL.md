---
name: matchmaking-rules-design
description: "Writes a rating model and queue ruleset for one game mode: widening schedule, party, backfill and low-population rules, plus telemetry thresholds."
owner: matchmaking-engineer
disable-model-invocation: true
argument-hint: "[mode name, team format, concurrent players at peak and trough]"
---

# Matchmaking rules design

A repeatable procedure for producing one mode's matchmaking spec. It does not restate the agent.

## Inputs

- Mode name, team format (1v1, NvN, free-for-all) and match length.
- Concurrent players in the queue per region at peak and at trough. If unknown, ask; if still unknown, assume trough is 15% of peak and say so.
- Ranked or casual, party sizes allowed, and whether join-in-progress exists.
- Existing rating data or none (cold start).
- Licence constraints: has legal cleared TrueSkill? If not asked, assume no.

## Steps

1. Pick the rating model: Elo only for 1v1 with lots of games per player; Glicko-2 for 1v1 needing confidence; OpenSkill (or TrueSkill if cleared) for teams and free-for-all. Record initial values and the inactivity rule.
2. Define the match quality function (predicted win probability for 2 teams, or rating spread for free-for-all).
3. Estimate players in queue at trough: concurrent players times average queue seconds divided by average session seconds between queues. If fewer than 4 full matches' worth, plan merges first.
4. Write the widening table with at least 3 steps and a hard ceiling. Mark which steps ranked may use.
5. Write party rules: party skill formula, maximum spread, premade vs premade preference window.
6. Write backfill rules: which modes allow it, state checks on the match, rating handling for the joiner.
7. Write low-population fallbacks in order: region merge, mode merge, wider ceiling for casual, bots.
8. List smurf signals with numeric thresholds and the response (rating acceleration), and who receives the flag list.
9. Define telemetry with alert thresholds.

## Output

```markdown
# Matchmaking spec: <mode>
Assumptions: <list>
## Rating
Model: <name> | Initial: <values> | Inactivity: <rule> | Visible rank: <formula>
## Match quality
<function>
## Widening
| Seconds waited | Allowed range | Ranked? |
## Parties
Skill formula: <> | Max spread: <> | Premade window: <seconds>
## Backfill
<rules>
## Low population
1. <fallback> (trigger: <concurrent players>)
## Smurf signals
| Signal | Threshold | Response |
## Telemetry
| Metric | Alert threshold |
## Open questions
```

## Done when

- [ ] Every widening table has a hard ceiling.
- [ ] Party skill is not a plain mean.
- [ ] Queue time at trough has been estimated, not just peak.
- [ ] Rating model choice states the licence position.
- [ ] Every smurf signal has a number and a response.
- [ ] Telemetry includes calibration, stomp rate and p90 queue time per skill band.
- [ ] Assumptions are listed at the top.
