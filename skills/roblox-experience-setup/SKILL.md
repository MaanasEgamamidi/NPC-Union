---
name: roblox-experience-setup
description: Set up a Roblox experience: Rojo or Studio-only, service folder layout, strict Luau, and a DataStore wrapper with retries, autosave and session locking.
owner: roblox-specialist
disable-model-invocation: true
argument-hint: "[experience name] [rojo|studio] [sells items: yes|no]"
---

# Roblox experience setup

## Inputs

- Experience name, Rojo or Studio-only, whether it sells Passes or Developer Products, target audience age.
- If workflow is not given: ask whether more than one person edits code or whether Git review is wanted. Yes means Rojo.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/technical/engines/roblox.md` and open the DataStore limits page it links to confirm the budgets are unchanged.
2. Rojo path: install Rojo (check https://rojo.space/docs/ for the current install method), run `rojo init`, and map `src/server` to `ServerScriptService`, `src/client` to `StarterPlayer.StarterPlayerScripts`, `src/shared` to `ReplicatedStorage.Shared`. Add Wally (`wally init`) if packages are needed and map `Packages` into `ReplicatedStorage`.
   Studio-only path: create the same folders by hand in Explorer.
3. Create `ReplicatedStorage.Remotes` and add remotes by name only from the server at startup (or in the Rojo tree). Write each remote's contract into `src/shared/Remotes.luau` as exported types.
4. Put `--!strict` at the top of every script and module. Fix every type error before the first playtest.
5. Write `src/server/PlayerData.luau`, a DataStore wrapper:
   - `retry(fn, attempts = 5)` using `pcall`, backoff 1, 2, 4, 8 seconds.
   - `load(player)`: `UpdateAsync` on key `"u_" .. player.UserId` that reads the value, refuses if `lock.jobId ~= game.JobId` and `os.time() - lock.time < 1800`, else writes `lock = { jobId = game.JobId, time = os.time() }` and returns data. On a held lock, retry for up to 30 seconds, then kick with a friendly message.
   - Schema version field `v` and a `migrate(data)` step.
   - `save(player, release)`: `UpdateAsync` that writes data, refreshes lock time, clears the lock when `release` is true.
   - Autosave loop every 90 seconds with `task.wait`, plus save-and-release on `Players.PlayerRemoving` and in `game:BindToClose` (with `task.spawn` per player and a wait for all).
6. If selling items: write `src/server/Receipts.luau` with `MarketplaceService.ProcessReceipt` that stores processed `PurchaseId`s in the profile and returns `PurchaseGranted` only after `save` succeeds.
7. Check the audience and policy pages (content maturity link in the knowledge file); filter all player text with `TextService`.
8. Playtest with Studio's API access for DataStores enabled in Game Settings, using a test place, not the live one.

## Output

```
Experience: <name>   Workflow: <Rojo + Wally | Studio-only>
Folders: ServerScriptService/<...>  ReplicatedStorage/Shared, Remotes  StarterPlayerScripts/<...>
Strict Luau: all scripts (<n> type errors fixed)
DataStore: key u_<UserId>, schema v<k>, autosave 90 s, lock timeout 1800 s, retries 5
Limits checked: <date> against error-codes-and-limits page
Receipts: <none | ProcessReceipt with PurchaseId dedupe>
Remotes: see Remotes.luau contracts
Open items: <UNVERIFIED items>
```

## Done when

- [ ] Every script starts with `--!strict` and type-checks clean.
- [ ] Two Studio test servers joining the same account shows the lock working.
- [ ] Stopping the server in Studio saves via `BindToClose`.
- [ ] No `wait(`, `spawn(` or `delay(` calls remain.
- [ ] `ProcessReceipt` (if present) is idempotent by `PurchaseId`.
