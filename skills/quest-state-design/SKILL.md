---
name: quest-state-design
description: Design a quest state graph with choices, recovery, content scope and test cases.
owner: quest-designer
disable-model-invocation: true
argument-hint: "[conflict and player verbs]"
---

# Quest State Design

## Inputs

- Player verbs, conflict, canon, intended duration, intended choice and constraints. Ask once for missing verbs and conflict; assume and label the remainder.

## Steps

1. State the dramatic question and player action, trigger, prerequisites, required knowledge and desired world response.
2. Draw states and transitions with authoritative events, guards and effects. Specify whether flags and items persist and how rewards are granted once.
3. Define each decision's information available before commitment, routes, costs, observable consequences and reconvergence. Count unique content per branch.
4. Walk object-first, refusal, giver unavailable, item lost, interruption, repeat event and save/load cases. Add recovery or explicitly signaled irreversible failure.
5. Write objective feedback and acceptance tests; assign dialogue, space, code and playtest handoffs.

## Output

```markdown
# Quest: <name>
Premise / player verb / assumptions: <...>
| State | Entry event and guard | Objective feedback | Transition and effect |
|---|---|---|---|
Choices / known information / cost / consequences: <...>
Flags, item ownership, reward and save rules: <...>
Recovery and alternate giver: <...>
Branch content and reconvergence: <...>
| Test setup | Action | Expected result |
|---|---|---|
Handoffs / open decisions: <...>
```

## Done when

- [ ] Every reachable state has a valid exit or clearly communicated terminal outcome.
- [ ] Object-first and unavailable-giver cases are resolved.
- [ ] Repeated events and reloads cannot duplicate rewards.
- [ ] Choice information and consequences are explicit and testable.
