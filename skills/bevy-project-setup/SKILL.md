---
name: bevy-project-setup
description: Set up a Bevy project with pinned versions, fast dev compiles, a plugin-per-feature layout and an optional WASM target.
owner: bevy-specialist
disable-model-invocation: true
argument-hint: "[game name] [2d|3d] [native|wasm|both] [physics: avian|rapier|none]"
---

# Bevy project setup

## Inputs

- Game name, 2D or 3D, targets (native, WASM, both), physics choice.
- If physics is not given, ask whether MIT/Apache dual licence matters (avian) or Apache-2.0 is fine (bevy_rapier).

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/technical/engines/bevy.md`. Then confirm the live version: `curl -s https://crates.io/api/v1/crates/bevy` and read `max_stable_version` and `rust_version`. If they differ from the knowledge file, use the live values and note it.
2. Check the toolchain: `rustc --version` must be at least the MSRV. If not, `rustup update stable`.
3. `cargo new <name>` and pin `bevy = "0.<minor>"` (minor only, so patches flow in). For physics, open the crate's crates.io Dependencies tab and pick the release whose `bevy` requirement matches.
4. Add fast-compile config to `Cargo.toml`:
   ```toml
   [features]
   dev = ["bevy/dynamic_linking"]

   [profile.dev]
   opt-level = 1

   [profile.dev.package."*"]
   opt-level = 3
   ```
   Run dev builds with `cargo run --features dev`. Never ship `dynamic_linking`.
5. Linux linker: install `lld` or `mold` and add `.cargo/config.toml` with a `[target.x86_64-unknown-linux-gnu]` `rustflags = ["-C", "link-arg=-fuse-ld=lld"]` (or `mold`). Check the current recommended snippet in the Bevy quick start before copying.
6. Lay out one plugin per feature:
   ```
   src/main.rs          App::new().add_plugins((DefaultPlugins, GamePlugin)).run()
   src/game.rs          GamePlugin adds the feature plugins and AppState
   src/player.rs        PlayerPlugin
   src/enemy.rs         EnemyPlugin
   src/ui.rs            UiPlugin
   assets/
   ```
   Each plugin registers its own systems, resources and `OnEnter`/`OnExit` handlers.
7. Add an `AppState` enum (`Loading`, `Menu`, `InGame`) and gate gameplay systems with `run_if(in_state(AppState::InGame))`.
8. WASM (if requested): `rustup target add wasm32-unknown-unknown`, then either Trunk (`trunk serve`) or `cargo build --release --target wasm32-unknown-unknown` plus `wasm-bindgen --target web`. Note: no threads by default, and audio needs a user click.
9. Build once native (and WASM if requested). Record the resolved version with `cargo tree -i bevy` and confirm a single Bevy copy.
10. Commit `Cargo.lock` (it is a binary, so the lock belongs in git).

## Output

```
Bevy project: <name>
Bevy: <version>  (verified <date> on crates.io)   MSRV: <rust version>
Physics: <crate> <version> (depends on bevy <req>)   Licence: <licence>
Targets: <native/wasm>
Fast compile: dynamic_linking via `dev` feature, opt-level 1/3, linker <lld/mold/default>
Plugins: <list>
States: <list>
Migration guide to read next upgrade: https://bevy.org/learn/migration-guides/
Open items: <anything unverified>
```

## Done when

- [ ] `cargo run --features dev` opens a window; WASM build loads in a browser if requested.
- [ ] `cargo tree -i bevy` shows one Bevy version.
- [ ] Version and MSRV were checked live on crates.io today.
- [ ] Each feature lives in its own plugin; `main.rs` stays under 20 lines.
- [ ] `dynamic_linking` is not in release builds.
