---
name: visual-reference-board
description: Collect verified visual references and turn them into an annotated direction board.
owner: moodboard-curator
disable-model-invocation: true
argument-hint: "[decision and intended use]"
---

# Visual Reference Board

## Inputs

- Decision, subject, intended audience and use, camera/format, style constraints, rights needs and whether synthetic studies are wanted. Ask once; state assumptions.

## Steps

1. Write a design question and select contrasting reference categories, including a counterexample.
2. Search and open original creator or institutional pages. Inspect each actual image; if inaccessible, mark UNVERIFIED and do not describe unseen features.
3. Record work, creator, source URL, date if available, access date, observable visual feature and how it informs the decision. Check the item-specific rights evidence for the intended use; mark unknown rights UNVERIFIED.
4. Group images by purpose. Describe principles to adapt and specific elements to avoid copying; do not distribute restricted art without permission.
5. Where image generation is available and appropriate, produce labelled synthetic studies and record the actual prompt and settings known. Otherwise provide prompts and clearly label them ungenerated.
6. Compare value, silhouette, palette, materials and density at gameplay scale. Recommend a direction, an alternative, a test and ownership.

## Output

```markdown
# Board: <decision>
Use / scale / assumptions: <...>
| Work and creator | Original page | Date / accessed | Observed feature | Apply / avoid | Rights evidence / status |
|---|---|---|---|---|---|
Synthetic studies (label, prompt, tool/settings if known): <...>
Direction / alternatives / counterexample: <...>
Scale test / open rights / handoffs: <...>
```

## Done when

- [ ] Each claimed observation comes from an inspected image, or is UNVERIFIED.
- [ ] Original links, access dates and rights status are recorded per item.
- [ ] Synthetic content is separate from actual references and generation is not claimed when unavailable.
- [ ] The board supports a specific decision and a scale test.
