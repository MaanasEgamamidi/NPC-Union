---
name: dialogue-line-pass
description: Turn a scene or bark brief into a tagged Ink/Yarn script, a line table for VO and localization, and length and choice checks.
owner: dialogue-writer
disable-model-invocation: true
argument-hint: "[scene brief or bark brief, plus format and display limit]"
---

# Dialogue line pass

A repeatable procedure for producing ship-ready dialogue or bark sets from a brief.

## Inputs

- Brief: who speaks, what the scene or bark concept must achieve, where it plays.
- Script format: Ink, Yarn Spinner, CSV, or engine-specific.
- Display surface and limit: characters per line and lines per event at the largest supported font size.
- Voiced or text only.
- Shipping languages.
- Voice sheets for named speakers, if they exist.

If the limit is missing, assume 42 characters by 2 lines and say so. If the format is missing, ask once, then default to Yarn Spinner. If there is no voice sheet, write a five-line one (sentence length, contractions, address form, a word they never use, one tic) and include it in the output.

## Steps

1. Write a beat list: one line per beat, stating what changes. Mark where a player choice changes state.
2. Pick the ID scheme: `<scene>_<nnn>` for lines, `<scene>_c<nn>` for choices, `<concept>_<nn>` for barks. IDs are never reused or renumbered after handoff.
3. Draft lines in the target format. Every line gets a speaker and an ID tag (Yarn: `#line:<id>`; Ink: the project's tag convention, for example `#id:<id>`).
4. For each choice, write the label and the spoken line together. The label states intent and tone. Mark options that end the conversation or start hostility.
5. For barks, list concepts with how often each can fire. Set variant counts by frequency (frequent concepts get more variants and plainer lines). Fill the four cooldowns: per line, per concept, per speaker, global.
6. If characters can be interrupted (walk-and-talk, combat), add a pick-up line for each beat that can be cut, and state the rule: resume, restart, or drop.
7. Read every line out loud. Cut lines that repeat what the player saw or already knows.
8. Count characters per line. Flag anything over 80 percent of the limit when non-English languages ship, since expansion will push it over.
9. Check every proper noun against lore notes. List unknowns as questions.
10. Produce the output below.

## Output

```
### Script
<script in target format, all lines tagged>

### Voice sheet (if written here)
<speaker>: <sentence length> | <contractions> | <address form> | never says <x> | tic: <y>

### Line table
| id | speaker | text | chars | context note | VO | max chars |
|----|---------|------|-------|--------------|----|-----------|

### Choices
| choice id | label | spoken line id | tone | ends convo / hostile |
|-----------|-------|----------------|------|----------------------|

### Bark concepts (if any)
| concept | priority | variants | per-line cd | per-concept cd | per-speaker cd | global cd |
|---------|----------|----------|-------------|----------------|----------------|-----------|

### Checks
- Over limit: <ids or none>
- Near limit (>80%) with localization: <ids or none>
- Assumptions: <list>
- Questions for narrative-director / lore-keeper: <list>
```

## Done when

- [ ] Every line and choice has a unique, stable ID and a speaker.
- [ ] No line exceeds the stated character and line limit.
- [ ] Lines over 80 percent of the limit are flagged when other languages ship.
- [ ] Every choice label matches the intent and tone of its spoken line.
- [ ] Every bark concept has a variant count and all four cooldowns filled.
- [ ] Interruptible beats have a pick-up line and a stated rule.
- [ ] Each named speaker's lines match their voice sheet.
- [ ] Proper nouns are checked or listed as questions.
- [ ] The script parses in the target format, or the output says it was not test-compiled.
