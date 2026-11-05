---
name: bevy-version-migrate
description: Upgrade a Bevy project one minor version at a time using the official migration guides, checking plugin crate compatibility first.
owner: bevy-specialist
disable-model-invocation: true
argument-hint: "[current bevy version] [target bevy version]"
---

# Bevy version migrate

## Inputs

- Current version (`cargo tree -i bevy`) and target version. If no target is given, use the latest from crates.io.
- The full list of Bevy-dependent crates in `Cargo.toml`.

## Steps

1. List every hop: 0.18 to 0.20 means two hops (0.18 to 0.19, 0.19 to 0.20). Never jump.
2. For each third-party Bevy crate, open its crates.io Dependencies tab and find the release that supports each hop's target. Any crate without one blocks the hop: stop and report it, with options (wait, fork, replace).
3. Start a branch. Make sure the project builds and tests pass on the current version first.
4. For the first hop, open `https://bevy.org/learn/migration-guides/<from>-to-<to>/` (for example `0-19-to-0-20`). Read the whole guide, not only the sections that match compile errors.
5. Grep the codebase for each renamed or removed item in the guide and record hits in the migration table.
6. Bump `bevy` and the plugin crates to the hop's versions, raise the Rust toolchain if MSRV changed, and run `cargo update`.
7. Fix compile errors, then go back through the table for silent changes (default values, schedule placement, behaviour changes) that compile cleanly.
8. Run the game and test: input, physics, UI, audio, asset loading, WASM if shipped.
9. Commit the hop. Repeat steps 4-9 for the next hop.
10. Update the project's version note and the knowledge file if the live version moved.

## Output

```
Bevy migration: <from> -> <to>
Hops: <list>
Blocking crates: <crate, needed version, status>

| Hop | Guide item | Files hit | Change made | Silent behaviour change? |
|-----|-----------|-----------|-------------|-------------------------|

Toolchain: <old> -> <new>
Tests: <pass/fail notes>
Not yet verified: <list>
```

## Done when

- [ ] Every hop has its own commit and its guide was read in full.
- [ ] Every third-party crate is on a release matching the target Bevy.
- [ ] `cargo tree -i bevy` shows one version.
- [ ] Silent behaviour changes in the table were tested in-game.
