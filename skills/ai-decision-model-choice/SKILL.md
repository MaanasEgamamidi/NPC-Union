---
name: ai-decision-model-choice
description: Pick FSM, behavior tree, utility, GOAP, HTN, or a hybrid for an NPC type, with frame budget and readability checks. Use before building any NPC brain.
owner: game-ai-engineer
disable-model-invocation: true
argument-hint: "[NPC type, agent count, engine]"
---

# AI decision model choice

Choose a decision architecture for one NPC type and record the reasons, so the team does not rebuild it halfway through production.

## Inputs

- NPC type and its role (enemy grunt, boss, companion, villager, crowd).
- Maximum agents active at once and the AI frame budget in ms. If missing, ask; if still unknown, assume 1 to 2 ms total and say so.
- Engine and version (Unity, Unreal, custom).
- Who authors the behavior: designers in a visual tool, or programmers in code.
- The behaviors the player must notice, and the one failure that would feel unfair.

## Steps

1. List every action the NPC can take. Count them and note which depend on continuous values (health, distance, ammo) versus discrete events.
2. Score each model 1 to 5 on: authoring cost for this team, debuggability, reactivity, emergent variety, runtime cost at the stated agent count.
   - FSM: fewer than about 10 states and clear transitions.
   - Behavior tree or StateTree: reactive priority lists, designer-owned, reusable subtrees.
   - Utility: many options competing on continuous inputs.
   - GOAP: actions that recombine to reach goals; needs a small world-state symbol set.
   - HTN: designer-authored plans with variation; predictable but flexible.
3. Consider a hybrid: one model to pick the goal, another to execute it. Write down which layer owns which decision.
4. Check the engine: which model has native tooling and a debugger in the target version. Look it up in current docs; mark anything unchecked UNVERIFIED.
5. Estimate runtime cost: ticks per second, replanning triggers, and time-slicing across agents.
6. Define the readability tells for the three player-visible behaviors and confirm the chosen model can expose its current state and last decision to a debug view.
7. Write the decision record below.

## Output

```markdown
# Decision model: <NPC type>
Engine/version: <...>   Agents max: <n>   AI budget: <ms> (assumed? yes/no)
## Chosen model
<model or hybrid>, goal layer: <...>, execution layer: <...>
## Scores (1-5)
| Model | Authoring | Debug | Reactivity | Variety | Runtime | Total |
## Why the others lost
- <model>: <one concrete reason>
## Runtime plan
Tick rate: <...>  Replan triggers: <...>  Time-slicing: <...>
## Readability tells
| Player-visible behavior | Tell (bark/anim/UI) | Exposed in debug view as |
## UNVERIFIED engine details
- <...>
```

## Done when

- [ ] Every candidate model has a score and a one-line reason it won or lost.
- [ ] Agent count and frame budget are stated, with assumptions marked.
- [ ] Hybrid layers, if any, have a clear owner per decision.
- [ ] Each player-visible behavior has a tell and a debug view entry.
- [ ] Engine-specific claims are linked to docs or marked UNVERIFIED.
