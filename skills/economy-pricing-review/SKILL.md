---
name: economy-pricing-review
description: Review a game's prices, currencies, offers and random rewards for fairness, dark patterns and regional legal risk, and return a fix list.
owner: monetization-designer
disable-model-invocation: true
argument-hint: "[game name, platforms, regions, store/offer list or design doc path]"
---

# Economy pricing review

A repeatable audit of everything a player can pay for, ending in a keep / change / remove list.

## Inputs

- Game genre, core loop, modes (PvP, PvE, co-op) and planned lifetime.
- Platforms and storefronts (Steam, console stores, App Store, Google Play).
- Target regions and target age rating.
- Full list of paid items: base editions, DLC, passes, currency bundles, offers, random items, with prices.
- Store screens or flow descriptions for the first session and day 7.
- If any of these are missing, ask once, then state assumptions and proceed.

## Steps

1. Build a purchase inventory: one row per item with price, currency, what it changes in play, and whether it is random.
2. Flag any item that affects outcomes in competitive modes. Mark it remove or change unless the mode is PvE only.
3. Do the currency math: for every bundle and item price, compute leftover currency after the cheapest purchase path. Flag any item that always leaves a remainder.
4. Check that real-money equivalents are shown next to premium currency prices and at checkout.
5. For each random paid item, write odds per rarity tier, pity rules and duplicate protection in plain words. Check against each target platform's odds rule and each region's position (Belgium, Netherlands, Australia classification, China disclosure, EU currency principles). Mark each fact checked with source and date, or UNVERIFIED.
6. Walk the first-session and day-7 store. List every timer, streak, pop-up, limited offer and nudge. Sort each into keep, change or remove, with a reason.
7. Check purchase safety: confirmation step, spend history, parental or spending limits, refund path, and child defaults.
8. Review base pricing and anchors: edition ladder, launch discount, any "was" price is a real prior price, and value past the storefront refund window.
9. Build regional tiers from the storefront's recommended table, then hand-check high-risk regions for key resale and currency swings.
10. List metrics to watch: payer conversion, ARPPU, refund rate, chargebacks, day-1/7/30 retention, spend concentration.
11. Route open legal questions to game-legal-advisor and flow changes to ux-designer.

## Output

```markdown
# Economy pricing review: <game>

**Recommendation:** <model and one-paragraph reason>

## Purchase inventory
| Item | Price | Currency | Effect on play | Random? | Verdict |

## Currency math
| Bundle | Item | Leftover | Real-money shown? | Fix |

## Random rewards and regional risk
| Item | Odds / pity | Region or platform | Rule | Status (source + date or UNVERIFIED) |

## Dark-pattern sweep
| Element | Where | Keep / Change / Remove | Reason |

## Pricing and regions
| Edition / tier | Base price | Anchor | Regional notes |

## Purchase safety
- Confirmation / spend history / limits / refunds: <findings>

## Metrics to watch
- <metric>: <threshold or direction>

## Open questions
- game-legal-advisor: <question>
- ux-designer: <question>
```

## Done when

- [ ] Every paid item is in the inventory with its effect on play.
- [ ] No pay-for-power item remains in competitive modes without a stated reason.
- [ ] Currency leftovers are computed for every bundle and item pair.
- [ ] Every random paid item has odds and pity written out, checked per region and platform.
- [ ] Every timer, streak and offer has a keep / change / remove verdict.
- [ ] Every policy or legal fact has a source and date or an UNVERIFIED tag.
- [ ] Regional tiers and anchors are listed, and any reference price is a real prior price.
- [ ] Metrics and open questions are routed to named agents.
