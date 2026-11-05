---
name: business-sim-model
description: "Turn a business or tycoon game idea into a minimal, correct financial model: linked P&L, balance sheet and cash flow, 5-10 player levers, and sanity checks."
owner: business-finance-expert
disable-model-invocation: true
argument-hint: "<game idea, what the player manages, tick length>"
---

# Business sim model

Builds the smallest financial model that is correct under the hood and exposes only the decisions that make the game interesting.

## Inputs

- Game idea and what the player owns or runs.
- Tick length (day, week, month, quarter). If missing, use one month and say so.
- Audience and accuracy target: "teach real accounting" or "feel right". If missing, assume adult PC players and "feel right but never contradict real accounting".
- Any must-have mechanics (loans, stock market, staff, inventory, subscriptions).

## Steps

1. List every player decision in one line each. Delete any that do not change cash, profit, or risk.
2. Write the account list. Start from: Cash, Receivables, Inventory, Fixed assets, Accumulated depreciation, Payables, Debt, Equity, Retained earnings; P&L: Revenue, COGS, Operating costs, Depreciation, Interest, Tax. Remove what no decision touches; add only what a decision needs. Target 8-14 accounts.
3. Define each transaction as a balanced debit/credit pair (for example, sale on credit: debit Receivables, credit Revenue; and debit COGS, credit Inventory).
4. Write the per-tick update order: sales and revenue recognition, COGS, operating costs, depreciation (straight-line), interest, tax, collections and payments (working capital), then close net income to retained earnings.
5. Derive the cash flow statement: net income + depreciation - increase in receivables - increase in inventory + increase in payables +/- financing and investing flows. It must equal the change in Cash.
6. Choose 5-10 levers. For each, give a range and a real-world anchor with a source from `knowledge/domains/business-finance.md` (for example FRED interest rates, BLS price indices, World Bank GDP growth). Mark stylised ranges as stylised.
7. Pick the demand model: linear or constant-elasticity demand with a reference price; for trading, a bid/ask with depth so large orders move price.
8. Run three scripted playthroughs for 24 ticks (cautious, aggressive, idle) in a spreadsheet or script. Record end cash, retained earnings, and the worst cash point.
9. Apply the sanity rules below; fix and rerun until all pass.
10. List deliberate simplifications and legal/sensitive flags (real brands, real-money purchases, loot boxes, trading for minors) for `game-legal-advisor`.

Sanity rules:
- Assets = liabilities + equity after every tick.
- Change in Cash = cash flow statement total.
- No lever combination grows cash faster than the stated maximum return without risk.
- Idle play does not beat active play over 24 ticks unless the design wants it.
- A profitable-but-cash-negative state is reachable (if the game teaches cash vs profit).
- Interest conversion between annual rate and tick is written down and consistent.

## Output

```
## Financial model: <game>
Tick: <length> | Audience: <who> | Accuracy: <teach / feel right>
### Accounts
### Transactions (debit / credit)
### Per-tick update order
### Cash flow derivation
### Levers
| Lever | Range | Anchor | Source / stylised |
### Test runs (cautious / aggressive / idle): end cash, retained earnings, worst cash
### Sanity rules: pass/fail
### Simplifications
### Flags and hand-offs
```

## Done when

- [ ] Every account is touched by at least one decision.
- [ ] Every transaction balances.
- [ ] Cash flow derivation equals change in Cash in all three runs.
- [ ] 5-10 levers, each with a range and a source or a "stylised" label.
- [ ] All sanity rules pass.
- [ ] Legal/sensitive flags listed with the agent to hand them to.
