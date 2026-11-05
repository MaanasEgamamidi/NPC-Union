---
name: prompt-eval-harness
description: Builds or runs an eval set and regression gate for an LLM prompt change, with deterministic checks first and a calibrated judge second.
owner: prompt-engineer
disable-model-invocation: true
argument-hint: "[feature name] [prompt file path] [optional: baseline version]"
---

# Prompt eval harness

A repeatable procedure for scoring a prompt version against a fixed case set and deciding whether it ships.

## Inputs

- Feature name and the prompt file under test (`prompts/<feature>/vN.md`).
- The baseline version to compare against, if one exists.
- Pinned model ID and sampling settings. If missing, ask; do not guess a model ID.
- Output contract: free text, or a JSON schema path.
- Known bugs or player reports for this feature. If none, ask whether a bug tracker or playtest notes exist.
- Budget for one full run (calls times expected tokens). If unknown, ask before running more than 60 cases.

## Steps

1. Create or open `evals/<feature>/cases.jsonl`. Each line: `{"id","bucket","input","vars","checks","notes"}` where bucket is `golden`, `adversarial`, or `regression`.
2. Fill the buckets. Golden: typical requests covering each branch of the feature. Adversarial: instruction overrides inside player text, closing-delimiter injection, lore-breaking questions, requests for real-world facts the character would not know, abusive input. Regression: one case per past bug, with the bug reference in `notes`.
3. Write deterministic checks per case: output parses, schema validates, length limit, banned terms, required names present, numeric fields within game-defined bounds.
4. For checks code cannot do (tone, in-character voice), write a judge rubric with 3 to 5 anchored levels and an example for each level. Hand-label 10 to 20 outputs and confirm the judge agrees on most of them before using it as a gate. Record the agreement rate.
5. Run the baseline and the candidate on the same cases, same model ID, same sampling settings. Record per call: pass or fail per check, input tokens, cached input tokens, output tokens, latency.
6. Read every failing output by hand. Tag each failure as prompt, schema, judge error, or case error. Fix case errors in the case file, not by changing the prompt.
7. Compare: pass rate per bucket, newly failing case IDs, cost per call, cached-token share.
8. Apply the gate. Default: adversarial and regression buckets may not lose any case that passed on baseline; golden pass rate may not drop; any failure on a check that guards game state (currency, items, quest flags) blocks the ship.
9. Write results to `evals/<feature>/results/vN.md` and add one line to the prompt changelog.

## Output

```markdown
# Eval: <feature> vN vs v<baseline>
Model: <pinned ID>   Temp: <t>   Run date: YYYY-MM-DD
Judge: <model or none>, agreement with hand labels: <x/y>

| Bucket       | Cases | Baseline pass | Candidate pass |
|--------------|-------|---------------|----------------|
| golden       |       |               |                |
| adversarial  |       |               |                |
| regression   |       |               |                |

Newly failing: <case IDs or none>
Newly passing: <case IDs or none>
Cost per call (mean): input <n> (cached <n>), output <n>
Failure tags: prompt <n>, schema <n>, judge <n>, case <n>

Gate: PASS | FAIL, because <one line>
Changelog: vN: <what changed and why>
```

## Done when

- [ ] Every case has an ID, bucket, and at least one check.
- [ ] Every past bug for this feature has a regression case.
- [ ] Baseline and candidate ran on identical cases, model ID, and settings.
- [ ] The judge, if used, has a recorded agreement rate against hand labels.
- [ ] Every failure is read and tagged.
- [ ] The gate result and reason are written, and the changelog line exists.
