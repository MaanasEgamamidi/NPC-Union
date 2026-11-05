---
name: game-brief
description: Writes or tightens a one-page game brief with pitch, pillars, loop, MVP, out-of-scope list and build order. Use at project start or when scope drifts.
owner: brief-keeper
disable-model-invocation: true
argument-hint: "[rough idea, or path to an existing brief]"
adapted_from: Claude-Code-Game-Studios/.claude/skills/brainstorm/SKILL.md
---

# Game brief

Produces a brief that fits one screen. If a field needs a second paragraph, it belongs in a design doc, not here.

## Inputs

- The idea (a sentence is enough) or an existing `design/game-brief.md` to refine.
- Constraints: team size, time, platform. If missing, ask once; if still missing, assume and mark `ASSUMED`.
- Any reference game the user loves or wants to avoid.

## Steps

1. If a brief exists, read it and refine it; do not start over.
2. If the idea is vague, offer 2 or 3 one-line concepts (verb first) and ask the user to pick or combine.
3. Write the pitch in one sentence. Count words; cut until under 25.
4. Write 3 to 5 pillars. For each, add "therefore we will not ..." naming something real it excludes. Delete any pillar that excludes nothing.
5. Write the core loop as 2 to 4 steps: do, get, spend or learn, return.
6. Write goal and fail state in one or two testable lines.
7. List every feature mentioned. Sort with MoSCoW on estimated effort: Must at or below about 60% of effort, Could around 20% as contingency. Anything in Won't goes to Out of scope by name.
8. If the MVP (Musts) exceeds 7 items, propose cuts of items the loop works without, and say so.
9. Order the build: riskiest unproven item first.
10. Add the three one-liners: audience and feeling, art and audio direction, reference game plus the slice kept.
11. Show the brief in full and ask before writing the file.

## Output

```markdown
# Game Brief: <Working title>
**Pitch:** <one sentence, under 25 words>
## Pillars
1. <Pillar>: therefore we will not <excluded thing>.
## Core loop
- <step> → <step> → <step>
## Goal and fail state
- <win/session-complete condition>; <how a run or night ends>
## MVP (Must, ~<N>% of effort)
- <item>
## Should / Could
- Should: <items> | Could: <items>
## Out of scope (Won't this time)
- <item>
## Build order
1. <riskiest item>
**Who it's for / what they feel:** <line>
**Art and audio direction:** <line>
**Reference game:** <game>: <the slice kept>
**Assumptions:** <ASSUMED items>
```

## Done when

- [ ] Pitch is one sentence under 25 words.
- [ ] Every pillar names something it excludes.
- [ ] MVP has 7 items or fewer, with an effort share stated.
- [ ] Out-of-scope list is not empty.
- [ ] Build order starts with the riskiest item.
- [ ] Assumptions are marked, and the user approved the file write.
