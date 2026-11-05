---
name: game-threat-model
description: Builds a STRIDE threat model for a game feature, service, or AI/MCP tool surface, with trust boundaries, rated threats, and fixes. Use before build or launch.
owner: game-security-engineer
disable-model-invocation: true
argument-hint: "[feature, service, or repo path to model]"
---

# Game threat model

A repeatable procedure for modeling threats to one game feature or service.

## Inputs

- The feature or service in scope, with a diagram, design doc, or code path.
- The assets of value: currency, items, accounts, purchases, rankings, personal data, admin access.
- Where each component runs: client, game server, backend, platform store, third-party SDK, CI, AI agent or MCP tool.

If missing, ask:
1. What can a player gain or another player lose if this breaks?
2. Which parts run on the player's device?
3. Does any AI agent or tool read player-written text or take actions?

## Steps

1. Write the scope in one sentence and list what is out of scope.
2. List assets and rate each as money, competitive, personal data, or operational.
3. Draw the data flow and mark each trust boundary where data crosses from less trusted to more trusted.
4. For each boundary, walk STRIDE: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.
5. Check the game-specific list for every boundary:
   - Does the client send a result instead of an intent?
   - Are receipts validated server-side, with transaction IDs stored and reuse rejected?
   - Do signed requests carry a nonce or sequence number and a time window?
   - Is any secret shipped in the build, config, or asset bundles?
   - Can a save be edited, swapped, or rolled back to gain value?
   - Does every endpoint check that the session owns the object ID it receives?
   - Can player text reach an AI agent or MCP tool, and what can that tool do?
   - What do CI jobs hold, and can a fork pull request reach it?
6. Write each threat as: attacker, action, asset, impact.
7. Rate likelihood and impact (High, Medium, Low) and set severity from the pair.
8. Propose the smallest control for each threat and name an owner. Send client integrity and cheat detection items to `anti-cheat-engineer`.
9. List open questions that would change a rating.

## Output

```markdown
# Threat model: <feature>

Date: <YYYY-MM-DD>
Scope: <one sentence>
Out of scope: <list>

## Assets
| Asset | Type | Notes |
|-------|------|-------|

## Trust boundaries
1. <from> -> <to>: <data crossing>

## Threats
| ID | Boundary | STRIDE | Attacker / action / asset / impact | Likelihood | Impact | Severity | Control | Owner |
|----|----------|--------|------------------------------------|------------|--------|----------|---------|-------|

## Open questions
- <question> (affects <ID>)
```

## Done when

- [ ] Scope and out of scope are written.
- [ ] Every asset of value is listed.
- [ ] Every trust boundary has a STRIDE pass.
- [ ] The game-specific checklist was applied to every boundary.
- [ ] Each threat has a severity, a control, and an owner.
- [ ] Cheat detection items are routed to `anti-cheat-engineer`.
- [ ] Open questions are listed with the threat IDs they affect.
