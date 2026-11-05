---
name: space-fact-check
description: Check a game's space content (script, codex, level premise) claim by claim and return verdicts, real values, sources, and fixes that keep the fun.
owner: space-science-expert
disable-model-invocation: true
argument-hint: "<pasted script/codex text or file path> [realism: hard|grounded|fantasy]"
---

# Space fact check

Turns a block of space content into a table a writer or designer can act on. Every number is checked against a source fetched during this run.

## Inputs

- The content: pasted text, a file path, or a level premise.
- Realism target: hard, grounded, or fantasy. If missing, assume "grounded" and state it in the output.
- Audience: general, students, or sim fans. If missing, assume general.
- Ship date, if known (decides which mission-status lines need a recheck note).

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/space/space-missions-and-science.md` first. Use its numbers as the first lookup, but note its `last_verified` date.
2. Split the content into atomic claims. One claim = one number, one fact, or one cause. Quote each claim exactly. Include implied claims (a radio scene with no delay implies instant comms; a sound effect on an explosion in vacuum implies sound in space).
3. Tag each claim: `number` (gravity, distance, temperature), `cause` (why something happens), `status` (a mission or agency fact that can change), or `depiction` (sound, light, motion on screen).
4. For each `number`, fetch the NASA Planetary Fact Sheet table (https://nssdc.gsfc.nasa.gov/planetary/factsheet/) or the per-body page (for example `marsfact.html`). Copy the value and unit exactly. For light delay, divide distance in km by 299,792 km/s and show the result in seconds or minutes.
5. For each `status` claim, fetch the mission's NASA page, record the page's "last updated" date and the date you read it, and quote the status line.
6. For each `cause` or `depiction`, find an agency, peer-reviewed, or agency-education source. If you cannot fetch one, mark the row `UNVERIFIED` and say what you searched.
7. Assign a verdict:
   - `correct`: matches the source within the precision the text uses.
   - `simplification acceptable`: rounded or simplified, and a player who learns the real value later will not feel misled (for example "a third of Earth's gravity" for 0.38 g).
   - `wrong`: contradicts the source, or the simplification changes the cause.
8. Write a fix for every `wrong` row that keeps the same story beat or mechanic and swaps in the real cause. If the fun depends on the error and the realism target allows it, keep it and write a one-line label for the codex or settings instead.
9. For the realism target "hard", downgrade any `simplification acceptable` row that a sim player would catch (for example rounding Mars gravity to 1/3 in a physics readout).
10. List every `status` row under "Recheck before release" with its read date.
11. Note anything that needs another agent: orbit and transfer questions to `orbital-mechanics-expert`, data pulls to `nasa-data-specialist`, story restructuring to `narrative-director`.

## Output

```
# Space fact check: <content name>
Realism target: <hard|grounded|fantasy> (assumed: yes/no)
Audience: <...>  Read date: YYYY-MM-DD

| # | Claim (quoted) | Type | Verdict | Real value | Source (URL) | Fix that keeps the fun |
|---|----------------|------|---------|------------|--------------|------------------------|
| 1 |                |      |         |            |              |                        |

## Labels for deliberate inaccuracies
- "<claim>": <label text, one sentence>

## Recheck before release
- <claim>: <URL>, page updated <date>, read <date>

## UNVERIFIED
- <claim>: <what was searched, why it could not be confirmed>

## Hand-offs
- `<agent>`: <question>
```

## Done when

- [ ] Every sentence of the input was read and every factual claim (stated or implied) has a row.
- [ ] Every `Real value` has a unit and a URL that was fetched in this run.
- [ ] Every `wrong` row has a fix or a label, and no fix removes the beat it replaces.
- [ ] Every mission-status row has a read date and appears under "Recheck before release".
- [ ] Assumptions (realism target, audience) are stated at the top.
- [ ] Nothing is marked `correct` from memory alone.
