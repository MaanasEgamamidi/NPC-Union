---
name: tech-stack-decision
description: Write an ADR choosing engine, language or backend using weighted criteria, sourced facts and reversal cost. Use before committing to a stack or when revisiting one.
owner: technical-director
disable-model-invocation: true
argument-hint: "[decision title, e.g. 'engine for 2D co-op roguelite']"
---

# Tech stack decision

Produces one Architecture Decision Record with a weighted matrix and a reversal-cost estimate. Format reference: `${CLAUDE_PLUGIN_ROOT}/knowledge/technical/programming/architecture-decisions.md`.

## Inputs

- The decision in one line (engine, language, backend, middleware).
- Target platforms, marking each as committed or hoped-for.
- Team size and languages already known.
- Schedule (months to launch) and current phase (pre-production, slice, production).
- Any hard constraints (licence, budget, existing code).

If more than two are missing, ask once in a single list. Otherwise write assumptions at the top and proceed.

## Steps

1. Restate the decision as a question that has two to four concrete options. Reject "one option plus straw men".
2. List 5-7 criteria. Include at least: team skill fit, platform export path, licence/cost at the expected revenue, iteration speed, and one genre-specific criterion (for example netcode, entity count, 2D tooling).
3. Assign weights summing to 100. At least one weight must be 25 or more. If you cannot justify that, the decision is cheap: timebox it to one day and say so.
4. For every version, licence or platform claim, open the official page (release page, licence, pricing, platform docs) and record URL plus today's date. Anything not confirmed is marked UNVERIFIED in the cell.
5. Score each option 1-5 per criterion with a one-phrase reason in the cell. Compute weighted totals (sum of weight x score / 100) and show two decimals. Recompute by hand once.
6. Sensitivity check: drop the heaviest criterion to 0 and renormalise. If the winner changes, say so in the Decision section.
7. Estimate reversal cost in engineer-weeks at three points: now, after vertical slice, after content lock.
8. Name one spike (2-5 days) whose result could change the decision, written as a yes/no question with a measurable threshold.
9. Write the ADR with status Proposed. Do not mark it Accepted; the user does.
10. List handoffs: which specialist confirms engine facts, who owns the spike.

## Output

```markdown
# ADR-NNNN: <title>
Status: Proposed  |  Date: YYYY-MM-DD  |  Supersedes: <ADR or none>

## Context
<problem, constraints, assumptions marked as such>

## Options
1. <option> 2. <option> 3. <option>

## Criteria matrix
| Criterion (weight) | Option A | Option B |
|---|---|---|
| ... | score (reason) | score (reason) |
| Weighted total | x.xx | x.xx |

Sensitivity: without <heaviest criterion>: A x.xx, B x.xx.

## Decision
<option> because <the one or two criteria that decided it>. We give up: <...>.

## Reversal cost
| When | Engineer-weeks | What has to be redone |
|---|---|---|
| Now | | |
| After vertical slice | | |
| After content lock | | |

## Spike that could change this
Question: <yes/no with threshold>. Timebox: <days>. Owner: <agent or person>.

## Consequences
- Positive: ...
- Negative: ...

## Sources (checked YYYY-MM-DD)
- <url>: <fact taken from it>
```

## Done when

- [ ] Two to four real options, weights sum to 100, one weight is 25 or more.
- [ ] Weighted totals are arithmetically correct.
- [ ] Sensitivity check done and reported.
- [ ] Reversal cost given at three points in engineer-weeks.
- [ ] Every version or licence claim has a URL and date, or says UNVERIFIED.
- [ ] Status is Proposed and one spike is named with owner and timebox.
