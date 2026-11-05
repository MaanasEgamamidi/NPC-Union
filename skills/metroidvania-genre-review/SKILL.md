---
name: metroidvania-genre-review
description: Audits a metroidvania design for gate visibility, ability order, backtracking cost, map tools, and scope traps, then returns a ranked fix list.
owner: metroidvania-expert
disable-model-invocation: true
argument-hint: "[design doc path or a short world and ability list]"
---

# Metroidvania genre review

## Inputs

- A region list, an ability list in acquisition order, and target playtime.
- Ask if missing: Are sequence breaks allowed? Is there fast travel? Does death cost anything? Is there a roguelite layer?

## Steps

1. Build the world graph: one node per region, one edge per gate, labeled with the ability that opens it.
2. For each gate, note where the player first sees it and when they get its key. Flag any gate whose key comes before the gate is seen.
3. Estimate backtrack cost per gate in rooms or minutes from the key pickup to the gate. Flag trips over about 2 minutes with no shortcut or new threat.
4. Check ability order: core movement (dash, double jump, wall jump) should not all arrive in the last third.
5. For each new ability, list earlier rooms it could skip. Mark them as intended break or bug.
6. Review map tools: is explored space recorded, can gates be marked, and when does fast travel unlock.
7. Check death cost and corpse-run length against the save or bench spacing.
8. Compare against 2 references from `knowledge/genres/metroidvania.md` and note one lesson from each.
9. List scope traps (abilities times rooms to test, mirrored or remixed maps, boss count).
10. Rank issues by player impact and assign each to an NPC Union agent.

## Output

```
# Metroidvania review: <project>
## World graph
| Region | Gate | Key ability | First seen | Key gained | Backtrack cost |
## Gate audit
- <gate>: PASS / FIX - <reason>
## Ability order
## Skip risks
## Map and travel
## Death and saves
## Reference lessons
- <game>: <lesson>
## Scope traps
## Ranked fixes
1. <fix> -> <agent>
```

## Done when

- [ ] Every gate has a row in the world graph table.
- [ ] Every gate is marked PASS or FIX.
- [ ] Backtrack cost is estimated for each gate.
- [ ] Skip risks are listed per ability.
- [ ] Two reference lessons cite games from the knowledge file.
- [ ] Every fix names a receiving agent.
