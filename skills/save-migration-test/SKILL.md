---
name: save-migration-test
description: Build fixture saves for every schema version, migration chain tests, and corruption injection tests that prove old and damaged saves load or fail safely.
owner: save-systems-engineer
disable-model-invocation: true
argument-hint: "[save format spec or code path, current schema version]"
---

# Save migration test

## Inputs

- The save format spec and the migration functions.
- Current schema version and every past version that shipped to players.
- The engine's test framework (GUT or gdUnit4 for Godot, Unity Test Framework, Unreal Automation, or plain unit tests).

## Steps

1. For each shipped version, collect or generate fixtures: a fresh save, a mid-game save, an end-game save, and an edge case (empty inventory, max stack, unicode name). Commit them under `tests/fixtures/saves/v<N>/`. Never regenerate an old fixture with new code.
2. Test each migration step alone: load a vN fixture, run `migrate_N_to_N+1`, assert specific fields (counts, totals, renamed keys gone).
3. Test the full chain: every fixture from every version loads to the current version and round-trips (save then load gives an equal object).
4. Test forward safety: a save with a version higher than the build is refused without overwriting it.
5. Corruption injection on copies of fixtures: truncate at 0, 1, 50 and 99 percent; flip one random byte in the payload; zero the header; append garbage. Each case must load the `.bak`, or report an error without crashing.
6. Kill-during-save test: loop save, kill the process at random points (or simulate by stopping after the tmp write), then load. The previous good save must always load.
7. Add the suite to CI with build-engineer (Gantry).

## Output

```
## Save migration tests: <game>, current v<N>
| Fixture | Version | Migrates to current | Round-trips | Notes |
|---------|---------|---------------------|-------------|-------|
| Corruption case | Expected | Result |
|-----------------|----------|--------|
Kill-during-save: <runs>, <failures>
CI job: <name>
```

## Done when

- [ ] Every shipped version has at least 3 fixtures in the repo.
- [ ] Every migration step and the full chain have passing tests.
- [ ] Every corruption case falls back or errors cleanly, with no crash and no overwrite.
- [ ] The suite runs in CI.
