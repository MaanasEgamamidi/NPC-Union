---
name: cheat-threat-model
description: Builds a ranked cheat threat model and defensive mitigation plan for a multiplayer game. Defence only.
owner: anti-cheat-engineer
disable-model-invocation: true
argument-hint: "[game, network model, platforms]"
---

# Cheat threat model

A repeatable procedure for mapping what a cheater can change or see, and how to stop it. It never produces cheat or bypass code.

## Inputs

- Game genre, match format, and whether ranked play or tradeable items exist.
- Network model: dedicated server, listen server, peer-to-peer, or relay.
- Platforms, including Steam Deck, Linux, consoles, mobile.
- The list of client-to-server messages or RPCs. If missing, ask for it before step 2.

## Steps

1. Draw the trust boundary: list every value the client sends and mark who decides it (client or server).
2. For each client-decided value, name the cheat class it enables (speed, teleport, damage, cooldown, inventory, fire rate).
3. List information cheats: what the server sends that a player should not see (enemy positions, loot, hidden stats).
4. List input cheats that stay inside legal state: aimbot, triggerbot, macros, bots.
5. Score each class 1 to 5 for harm to other players and 1 to 5 for ease, then rank by the product.
6. For each class pick the cheapest server-side fix first (re-derive, validate with a tolerance budget, interest management, rewind cap).
7. For what server checks cannot close, choose detection: telemetry features, starting thresholds, and a human replay review step.
8. Decide client anti-cheat needs last: user-mode vs kernel-mode, platform coverage (check current Proton docs), privacy notice changes.
9. Write ban policy: evidence needed, wave delay, appeal path, data retention.

## Output

```
# Cheat threat model: <game>
## Trust boundary
| Value | Decided by | Server check |
## Ranked cheat classes
| Class | Harm | Ease | Score | Mitigation | Owner |
## Detection
| Feature | Starting threshold | Action (log, review, ban) |
## Client anti-cheat
Recommendation, platforms affected, privacy changes.
## Ban and appeal policy
## Open questions
```

## Done when

- [ ] Every client-sent value appears in the trust boundary table.
- [ ] Each ranked class has a mitigation and an owner.
- [ ] No automated ban rule acts without a review or appeal path.
- [ ] Platform claims cite a source with a date or are marked UNVERIFIED.
- [ ] The document contains no cheat, injector, or bypass code.
