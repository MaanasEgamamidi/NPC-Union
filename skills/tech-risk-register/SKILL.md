---
name: tech-risk-register
description: Identify, score and rank technical risks, each with a timeboxed spike to retire it and a react-by date. Use before milestones or after a scope change.
owner: technical-director
disable-model-invocation: true
argument-hint: "[project or milestone name]"
---

# Technical risk register

Builds or updates a ranked list of technical risks. A risk without a spike or an owner is not finished.

## Inputs

- Game concept, target platforms, current milestone and its date.
- Existing ADRs and budgets, if any.
- Known unknowns from the team ("we have never shipped online", "nobody has done consoles").

## Steps

1. Sweep these categories and write at least one candidate per category, or state "none found": platform/export, performance budget, networking, third-party dependency, data/save compatibility, tooling/pipeline, team knowledge, licence/legal-technical.
2. Write each risk as "If <cause>, then <effect on the game or schedule>". Reject vague entries like "performance".
3. Score likelihood 1-5 and impact 1-5. Score = L x I.
4. Set a react-by date: the last date the risk can be retired cheaply (for example before content lock, before cert submission, before the save format ships).
5. Rank by score, then break ties by earliest react-by date.
6. For every risk scoring 9 or more, write a spike: a yes/no question, a measurable threshold, a 2-5 day timebox, and an owner from the roster (for example performance-engineer for frame budget, netcode-architect for rollback feasibility).
7. For risks under 9, write either "accept" with a reason, or a cheap mitigation.
8. Compare against the previous register if one exists: mark Retired, New, Changed score.
9. Name the top three for the producer with their react-by dates.

## Output

```markdown
# Technical risk register: <project>, <date>
Milestone: <name, date>

| ID | Risk (if..., then...) | L | I | Score | React by | Response | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| R1 | | | | | | Spike: <question, threshold, days> | | Open |

## Top three for production
1. R? by <date>: <one line>

## Changes since last register
- Retired: ...
- New: ...
```

## Done when

- [ ] All eight categories swept.
- [ ] Every risk is phrased "If..., then...".
- [ ] Every risk with score 9+ has a spike with threshold, timebox and owner.
- [ ] Ranking uses score, then react-by date.
- [ ] Top three listed for the producer.
