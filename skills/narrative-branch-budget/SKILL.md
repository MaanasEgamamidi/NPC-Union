---
name: narrative-branch-budget
description: Map a story's choice points and price them in paths, words and test cases before writing starts. Use when scoping branching narrative.
owner: narrative-director
disable-model-invocation: true
argument-hint: "[play time, choice list, word budget, voiced or not]"
---

# Narrative branch budget

A repeatable way to turn a list of intended choices into a costed structure the team can commit to.

## Inputs

- Target play time for one playthrough.
- Words per hour of play for this project. If missing, measure it from an existing scene or prototype. If nothing exists, state an assumption and label it.
- The list of choices the team wants to "matter", in order.
- Total word budget, and whether lines are voiced (voiced lines cost recording and pickups; ask for a line budget too).
- Number of endings wanted.

Ask for anything missing once. If play time and the choice list are known, proceed with labelled assumptions for the rest.

## Steps

1. **Compute the spine.** Spine words = play time x words per hour. This is what a single player reads.
2. **Classify each choice** as one of: *flavour* (changes a few lines, no state), *state* (writes a variable read later), *fork* (separate scenes until a bottleneck), or *ending fork* (never rejoins).
3. **For each state choice**, record variable name, type (bool, counter with range, or enumerated LIST), every place it's read, and the payoff location. Add a reminder method (notice, or echoing the choice's wording).
4. **For each fork**, estimate the words of the divergent section per option. Extra words = (options - 1) x divergent section words.
5. **Count endings** as the product of ending forks and any state values that select an ending. Price each ending coda.
6. **Total written words** = spine + all fork extras + flavour variants + codas + state-driven line variants.
7. **Coverage** = spine words / total written words. Flag below 0.4 as high-cost for small teams (house heuristic, not an industry rule).
8. **Test cases per convergence** = product of the value counts of every variable read at that scene. Flag any scene above 24 combinations and propose collapsing counters into bands.
9. **Compare to budget.** If over, cut in this order: turn forks into state choices, collapse endings into state-varied codas, reduce variables read at convergences.
10. **Write the register** in the output format below.

## Output

```markdown
# Branch budget: <project>

Assumptions: <words per hour, source of the figure, voiced or not>

| ID | Choice | Type | Writes | Read at | Payoff | Reminder | Extra words |
|----|--------|------|--------|---------|--------|----------|-------------|
| C1 | ... | state | trust_sister (-2..+2) | ch3, ch5 | ch5 coda | echo wording | 2,000 |

| Item | Words |
|------|-------|
| Spine | |
| Fork extras | |
| Flavour and state variants | |
| Ending codas (n x words) | |
| **Total written** | |
| **Coverage** | spine / total |

Convergence test load:
- <scene>: <variables> = <combinations>

Over/under budget by: <n words>
Cuts proposed (in order): <list>
Open questions: <list>
```

## Done when

- [ ] Every choice has a type, and every state choice names its variable, its reads and its payoff.
- [ ] Totals add up and coverage is stated as a number.
- [ ] Every scene that reads two or more variables has a combination count.
- [ ] The result is within budget, or the proposed cuts bring it within budget.
- [ ] All assumptions are labelled as assumptions.
