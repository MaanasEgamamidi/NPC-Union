---
name: game-server-fleet-plan
description: Builds a per-region dedicated server fleet plan with buffer sizing, hosting choice, session flow, and a sourced monthly cost model.
owner: multiplayer-backend-engineer
disable-model-invocation: true
argument-hint: "[game type, peak CCU, regions, match length, players per match]"
---

# Game server fleet plan

A repeatable procedure for sizing and hosting a dedicated server fleet.

## Inputs

- Peak and average CCU, per region if known. If missing, ask; if nobody knows, model soft launch, launch week, and steady state.
- Players per match, match length, and whether sessions are short matches or persistent shards.
- Engine, server OS target, and tick rate.
- Measured sessions per server and boot-to-ready time. If not measured, ask for a bot load test; until then use clearly labelled placeholders.
- Team constraints: Kubernetes experience, existing cloud provider, credits or contracts.

## Steps

1. Convert CCU to concurrent matches: CCU divided by players per match, per region.
2. Compute match starts per minute per region: concurrent matches divided by match length in minutes.
3. Size the warm buffer per region: match starts per minute times boot-to-ready time in minutes, times a 1.5 margin to start. Set min, buffer, and max.
4. Compute servers needed: concurrent matches divided by sessions per server, plus buffer. Convert to vCPU and instance count.
5. Choose hosting (managed fleet service, Agones on Kubernetes, edge orchestrator, or bare metal) against team skills and switching cost. Write the reason and what would make you switch.
6. Define the session flow: region ping, match request with latencies, allocation or placement, connect, result write-back with idempotency key, shutdown. Define behavior when allocation fails.
7. Define persistence: what lives in the session or lobby service, what lives on the server, what is written to the player store, and when.
8. Fetch current compute and egress prices from the provider's pricing page. Record the URL and date. Mark anything not loaded as UNVERIFIED.
9. Build the cost model: server-hours per month plus egress GB per month, per region, for each CCU scenario.
10. List alerts: allocation failure rate, time to allocate, buffer depletion, crash rate per build.

## Output

```markdown
# Fleet plan: <game>

## Assumptions
| Item | Value | Source (measured / placeholder) |

## Regions
| Region | Concurrent matches | Starts/min | Buffer | Min | Max | Instance type |

## Hosting choice
Choice, reasons, switching cost, what would change the decision.

## Session flow
Numbered sequence, including allocation failure behavior.

## Persistence
| Data | Owner service | Write timing | Idempotency rule |

## Cost model
| Scenario | Server-hours/month | Egress GB/month | Price source and date | Monthly total |

## Alerts
## Open questions
```

## Done when

- [ ] Every region has buffer, min, and max with the formula shown.
- [ ] Every price has a source URL and date, or is marked UNVERIFIED.
- [ ] Placeholder numbers are labelled and a load test is requested to replace them.
- [ ] Allocation failure behavior is defined for the client.
- [ ] Result write-back has an idempotency rule.
- [ ] Hand-off notes for `matchmaking-engineer` and `netcode-architect` name regions, placement time budget, and per-server player limits.
