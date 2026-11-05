---
name: roblox-remote-audit
description: Audit every RemoteEvent and RemoteFunction in a Roblox experience for server-side validation, rate limits and exploit paths, with a findings table.
owner: roblox-specialist
disable-model-invocation: true
argument-hint: "[path to Rojo src or exported scripts]"
---

# Roblox remote audit

## Inputs

- Source tree (Rojo `src/` or scripts exported from Studio). If Studio-only, ask the user to export ServerScriptService and ReplicatedStorage scripts.

## Steps

1. Inventory remotes: grep for `RemoteEvent`, `RemoteFunction`, `UnreliableRemoteEvent`, `Instance.new("Remote`, `FireServer`, `InvokeServer`, `OnServerEvent`, `OnServerInvoke`, `InvokeClient`. List each remote with every fire site and handler.
2. For each server handler, check and record:
   a. Every argument after `player` is type-checked with `typeof` before use.
   b. Numbers are clamped, finite, and NaN-checked (`x ~= x`).
   c. Strings have a max length; tables are not trusted for shape or size.
   d. Instance arguments are checked for ancestry (belongs to this player or workspace region) and distance from the player's character.
   e. Prices, damage, cooldowns, and rewards are computed on the server, never read from args.
   f. A per-player rate limit exists and state is cleared on `PlayerRemoving`.
   g. No `pcall`-less yields that an attacker can stall.
3. Flag every `InvokeClient` as High: the server can hang on a client that never returns.
4. For `OnServerInvoke`, check it always returns and cannot throw on bad input.
5. Look for exploit paths across remotes: sequencing (claim reward before quest done), replay (fire purchase twice), and teleport (position from client).
6. Check client-only checks: anything enforced only in LocalScripts is unenforced.
7. Write fixes as code for each High and Medium finding.

## Output

```
Remote audit: <experience>   Date: <date>
Remotes found: <list>

| Remote | Handler file:line | Finding | Exploit in one sentence | Severity | Fix |
|--------|-------------------|---------|-------------------------|----------|-----|

Rate limits: <present/missing per remote>
InvokeClient uses: <list>
Client-only checks: <list>
Fix code: <snippets>
```

Severity: High = free items, currency, damage or teleport; Medium = spam or server cost; Low = noisy logs.

## Done when

- [ ] Every remote in the inventory has a row, including ones with no findings.
- [ ] Every High finding has fix code.
- [ ] No server handler trusts a price, amount, position or target without a server check.
- [ ] Every remote has a rate limit or a written reason it does not need one.
