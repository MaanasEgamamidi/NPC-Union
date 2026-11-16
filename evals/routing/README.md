# Routing evals

These check one thing: given a request, are the right specialists picked?

`cases.json` holds the requests and who should handle them. `scripts/eval-routing.mjs` scores a router against them.

## Run

```bash
node scripts/eval-routing.mjs                    # keyword shortlist (scripts/route.mjs). Free; CI runs it.
node scripts/eval-routing.mjs --router claude    # asks Claude, on the Shop Steward's model. Uses quota.
node scripts/eval-routing.mjs --router codex     # asks Codex. Uses quota.
```

Useful flags: `--case s13` runs one case, `--model sonnet` changes the model, `--batch 10` sets cases per model call, `--out results.json` saves every pick, `--min-pass 0.8` exits 1 below that pass rate.

## What a case says

| Field | Meaning |
|---|---|
| `must` | Every one of these has to be picked. |
| `any` | At least one of these has to be picked. Use it when several agents fairly own the request. |
| `accept` | Fine to pick, not required. Keeps precision honest. |
| `avoid` | A wrong pick, usually an agent with a similar name or subject. |
| `via` | Optional. Who the request is handed to first. Left out, it is worked out from the `must` agents by step 3 of `skills/route/SKILL.md`: `direct`, a division lead, or `shop-steward`. |

Case ids: `s` one specialist, `a` several fair answers, `m` several departments in one division, `x` several divisions, `n` a confusable agent to avoid, `h` worded the way players and new developers talk instead of the way the catalog does.

## What is scored

- **Pass:** every `must` picked, the `any` group satisfied, nothing from `avoid`.
- **Recall:** share of required picks found. **Precision:** share of picks that were `must`, `any` or `accept`.
- **Hand-off:** whether `via` matches. Scored only for model routers and only where the case has no `any` group.

The keyword shortlist always returns its top 8, so only pass and recall mean anything for it, and `avoid` is not applied.

## Limits

- The model routers are given the route skill's steps and the catalog in one prompt. That measures the routing rules and the catalog descriptions. It does not run the full Shop Steward agent, so it will not catch a fault in the Steward's own prompt.
- Most `s`, `m`, `x` and `n` cases were written with the catalog open, so they share its vocabulary and flatter the keyword router. The `h` cases are the fairer test. Add more of those.
- Expected answers are one person's judgement. If a router's different pick is defensible, add it to `accept` or `any` and say why in `note`.

## Adding a case

Add an object to `cases.json`, then run `node --test tests/routing-eval.test.mjs`. The test rejects unknown agent names and repeated ids.
