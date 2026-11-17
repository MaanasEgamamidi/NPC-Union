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
| `via` | Optional. Who the request must be handed to first, whatever the router picks. Left out, the hand-off is judged from the router's own picks (see below). |

Case ids: `s` one specialist, `a` several fair answers, `m` several departments in one division (with the `must` agents alone), `x` several divisions, `n` a confusable agent to avoid, `h` worded the way players and new developers talk instead of the way the catalog does, often naming a symptom rather than a discipline, `t` a trap: the obvious keyword points at the wrong agent, or the request looks multi-part but is one specialist's job.

## What is scored

- **Pass:** every `must` picked, the `any` group satisfied, nothing from `avoid`.
- **Recall:** share of required picks found. **Precision:** share of picks that were `must`, `any` or `accept`.
- **Hand-off:** whether the router's `via` matches step 3 of `skills/route/SKILL.md` applied to the router's own valid picks, scored only for model routers. Valid picks are those in `must`, `any` or `accept`; extras and avoided picks are ignored. If they sit in one department (or all in leadership) the answer is `direct`, in two or more departments of one division it is that division's lead, and across divisions it is `shop-steward`. So a router that picks `build-engineer` alone for s16 should say `direct`, and one that also picks the accepted `godot-specialist` should say `technical-lead`. When a `must` is missing or the `any` group is not met, the hand-off is not scored for that case. A case that sets `via` is always scored against it, whatever was picked.

The keyword shortlist always returns its top 8, so only pass and recall mean anything for it, and `avoid` is not applied. It knows words, not meaning, so it is expected to be weak on the `h` and `t` cases. CI fails if its pass rate drops below the floor set in `.github/workflows/ci.yml` and `tests/routing-eval.test.mjs`.

## Limits

- The model routers are given the route skill's steps and the catalog in one prompt. That measures the routing rules and the catalog descriptions. It does not run the full Shop Steward agent, so it will not catch a fault in the Steward's own prompt.
- Most `s`, `m`, `x` and `n` cases were written with the catalog open, so they share its vocabulary and flatter the keyword router. The `h` and `t` cases are the fairer test. Add more of those.
- Expected answers are one person's judgement. If a router's different pick is defensible, add it to `accept` or `any` and say why in `note`.

## Adding a case

Add an object to `cases.json`, then run `node --test tests/routing-eval.test.mjs`. The test rejects unknown agent names and repeated ids.
