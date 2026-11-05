---
name: economy-flow-model
description: Build a currency source/sink model with stock projections, a time-to-afford price table and loot odds percentiles, then list live metrics and knobs.
owner: economy-designer
disable-model-invocation: true
argument-hint: "[game or currency name]"
---

# Economy flow model

## Inputs

- Currencies, how each is earned and spent, whether any is paid or tradable.
- Earn and spend rates per activity per hour (or per session plus session length).
- Shop catalogue with prices; loot tables with weights or chances.
- If rates are missing, ask once; then assume and mark ASSUMED.

## Steps

1. Table every source and sink per active hour for a median player and a heavy player.
2. Split sinks into repeatable and finite; for finite sinks, record total capacity.
3. Mark transfers (player-to-player trades) separately; they are not sinks.
4. Project stock at 1, 10, 50, 200 hours: stock = sum(sources - repeatable sinks) x hours, minus finite sinks bought. Note the hour each finite sink is exhausted.
5. Time-to-afford: for each item, price / net earn per hour. Sort; flag clumps (many items within 1 hour) and gaps (nothing between 5 and 30 hours).
6. Loot: for each entry, p = weight / total weight. Expected tries 1/p; P50 = ln(0.5)/ln(1-p); P90 = ln(0.1)/ln(1-p); P99 = ln(0.01)/ln(1-p). Apply pity caps.
7. If any randomness is paid, stop and flag for `game-legal-advisor` with target markets.
8. List live metrics (median and P90 balance, faucet and sink totals per day) and the knob for each risk.

## Output

```
# Economy flow: <name>
| Currency | Earned by | Spent on | Paid | Tradable |
## Flow per active hour
| Activity | Source | Repeatable sink | Finite sink (capacity) |
Net per hour: median <v>, heavy <v>
## Projection
| Hours | Median stock | Heavy stock | Finite sinks exhausted |
## Time-to-afford
| Item | Price | Hours (median) | Flag |
## Loot odds
| Item | p | Expected | P50 | P90 | P99 | Pity |
## Risks and knobs
| Risk | Metric | Threshold | Knob |
Assumptions:
```

## Done when

- [ ] Every currency has at least one repeatable sink.
- [ ] Transfers are not counted as sinks.
- [ ] Finite sink exhaustion hours are stated.
- [ ] Loot percentiles computed from p, with pity applied.
- [ ] Paid randomness flagged to legal with markets named.
