# Changelog

All notable changes to NPC Union are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- 33 harder routing eval cases (103 in all): plain-language and symptom-only requests, confusable agents, keyword traps (new `t` prefix), forgotten production, legal and accessibility specialists, and domain experts paired with designers. On 2026-11-16 the keyword shortlist passed 83/103, Claude Opus 103/103 and Codex 102/103.

### Changed

- The routing eval judges the hand-off against the router's own valid picks (those in `must`, `any` or `accept`) instead of the `must` agents alone, so picking an accepted agent from another department no longer counts as a wrong hand-off, and cases with an `any` group are scored too. A case's explicit `via` still wins.

- The worked example in `docs/EXAMPLE.md` is a new run with web and shell access, so the specialists checked their Godot settings and one of them ran on Codex.

### Fixed

- Twelve claims in the law, history, defense and climate experts were checked against sources. Five were corrected, including Japan's 2018 agreement system, the daily walking distance, and the link between climate and earthquakes.
- Seventeen `UNVERIFIED` markers in the knowledge base were resolved against sources, several with corrections (Unity's Pixel Perfect camera in URP, Godot's third-party licence list, Tempest, Guacamelee, Lumino City).

## [0.1.0] - 2026-11-16

First release. The plugin manifest is `.claude-plugin/plugin.json`.

### Added

- Roster of 148 specialist agents in five divisions: creative (38), technical (41), knowledge (50), production (13) and leadership (6). Each has a persona, a model, a runtime, owned skills and a cartoon portrait. The generated roster and catalog are in `docs/ROSTER.md` and `catalog/`.
- Specialists cover design, art, 3D, sound, narrative, engines, multiplayer and AI integration, programming, asset scouting, game genres, art styles and real-world domains such as space science.
- Shop Steward, the orchestrator in the leadership division. It decomposes a request, routes it to specialists and reports back. Division leads sit under it. Documented in `docs/HOW-IT-WORKS.md` and `docs/PIPELINE.md`.
- Shared skills: `new-specialist`, `route`, `steward`, `talk`, `roster`, `kb`, `build-pipeline`, `team` and `effort-fit-check`, plus skills owned by individual agents.
- Two runtimes. 95 agents run as Claude Code subagents. 53 run through `scripts/run-agent.mjs` on Codex CLI, which falls back to `claude -p` with a notice when Codex is missing. The runner has tests that use a stub Codex.
- Budget Keeper agent and `scripts/usage-check.mjs`. The script prints a numbers-only usage snapshot from local Claude and Codex logs and has a `--watch` mode. The agent uses it to advise on effort and model fit.
- Knowledge base under `knowledge/` with cited, dated files, a BM25 search index and `scripts/kb-search.mjs`. Every domain expert has a knowledge file listing open datasets, their licences and numbers useful for simulation.
- A worked example in `docs/EXAMPLE.md`: one real request run through the Shop Steward, with the reply unedited.
- Knowledge freshness check, `scripts/kb-stale.mjs`. It lists files past their `last_verified` age limit and can check source links. A monthly workflow runs it and opens an issue.
- Teams. `/npc-union:team` and `scripts/team.mjs` keep a team in `.npc-union/team.json`, with nine starter presets in `catalog/teams.json`. With a team active, the Steward uses only its members and asks before using anyone else.
- Team rule enforcement. A `PreToolUse` hook (`hooks/hooks.json`, `scripts/team-guard.mjs`) blocks spawning an NPC Union agent outside the team. `team.mjs allow <agent>` records a one-time approval that expires after an hour. `run-agent.mjs` applies the same gate and exits 3 when it refuses. The script installers register the same hook in `settings.json` and remove it on uninstall; `--no-hook` or `-NoHook` skips it.
- Routing evals. `evals/routing/cases.json` holds 70 requests with the agents that should handle them. `scripts/eval-routing.mjs` scores the keyword shortlist, Claude or Codex. `scripts/route.mjs` is a BM25 shortlist over the catalog. Recorded baselines at release: keyword 61/70, Claude Opus 70/70.
- 3D specialist office in `office3d/`: a Three.js office, a specialist gallery, turntable previews, an Assemble Team tab and an Employee of the Month hall of fame.
- Installers, `install.sh` and `install.ps1`, with `--uninstall` support, for use without the plugin marketplace.
- Plugin and marketplace manifests, plugin icon and README banner.
- Project files: `LICENSE`, `THIRD_PARTY_NOTICES.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CONTRIBUTING.md`, issue templates and a pull request template.
- Public agent schema in `docs/AGENT-SCHEMA.md` and a validator, `scripts/validate.mjs`, with a `--strict` mode.
- CI in `.github/workflows/ci.yml`: strict validation, tests, the routing eval keyword baseline with a 0.8 pass-rate floor, catalog and knowledge index freshness checks, installer round trips on Linux and Windows, and an optional `claude plugin validate` step.

### Changed

- Routing, lookup and checkable-code Opus agents no longer set `effort: high`. Agents with low or high reasoning carry an `effort` field, which the validator checks.
- The `route` skill now includes the engine's specialist when a request names an engine.
- CI runs the validator in strict mode, as `CONTRIBUTING.md` asks, and validates the plugin manifest so the hook file is checked.
- The Steward and division leads get a shell on Windows so they can run Codex agents.
- Repository URLs point at the renamed NPC-Union repository.
- Robot personas are described in the cartoon portrait style.
- The `godot-specialist`, `modeler-3d`, `save-systems-engineer` and `shop-steward` agents gained notes on Godot headless tests, Blender to Godot export, Windows save swaps and phase gates.

### Fixed

- Frontmatter values that broke YAML parsing are quoted, and the validator now checks for it.
- Two fact-check passes resolved flagged claims across the divisions, including the remaining factual `UNVERIFIED` markers.
- The persona `Quorum` for the law and civics expert clashed with the Shop Steward and was renamed to `Precedent`.
- `llm-npc-engineer` referred to agent names outside the roster and used an invalid agent colour. Both were corrected.
- A stray `onStats` call threw on every finished job in the 3D office.
- The knowledge freshness check reported live sources as dead when a server refused HEAD. It now retries with GET on any failed HEAD except 429.
- The `ai-integration-architect` file gained `sources` and `last_verified` and its Steam survey section was rechecked.
- The `run-agent` test reads the expected Codex effort from the agent frontmatter.
- `/new-specialist` documentation explains how to run it from a clone.
