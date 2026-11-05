Status: IN PROGRESS (stopped at the 07:56 UTC deadline set by Local; definition of done NOT met)

# Stream A progress

Scope was narrowed by Local at 07:34 UTC to: `.claude-plugin/`, `agents/leadership/`, shared skills, `scripts/`, install scripts, `.github/`, generated `catalog/` files. `agents/production/` moved to session A2. README, CONTRIBUTING, community files, THIRD_PARTY_NOTICES and `docs/` (PIPELINE, HOW-IT-WORKS) moved to session A3. I stopped my four production-drafting subagents when the scope changed; none of their files were committed.

## Done and tested
- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` (root plugin, `source: "./"`). `claude plugin validate .` prints "Validation passed". It suggests a README install line: `/plugin install npc-union --marketplace MaanasEgamamidi/studious-umbrella` (for A3).
- `agents/leadership/shop-steward.md` (Quorum). Passes the validator. Reads `catalog/agents.json`, checks each agent's runtime with `run-agent.mjs --which`, spawns claude agents by plugin id, runs codex agents through `run-agent.mjs`, merges with credits.
- `scripts/run-agent.mjs`: argument-array spawn only; verified Codex invocation; `NPC_UNION_CODEX_MODEL` (default `gpt-6.1-terra`); `claude -p` fallback with a stderr notice; `--dry-run`; `--which`; `--runtime` override. `tests/run-agent.test.mjs` uses a stub `codex` and stub `claude` on PATH: 5/5 pass.
- Shared skills (owner `shared`): `new-specialist`, `route`, `steward`, `talk`, `roster`, `kb`, `build-pipeline`.
- `install.sh` (`--project DIR`, `--user`, `--uninstall`) tested locally: copies to `<target>/.claude/{npc-union,agents/npc-union,skills/<name>}`, rewrites `${CLAUDE_PLUGIN_ROOT}` (no occurrences left), uninstall removes only NPC Union files and leaves a user's own skill in place.
- `scripts/build-catalog.mjs` (+ `--check`) writes `catalog/agents.json`, `catalog/CATALOG.md`, `docs/AGENT-CAPABILITIES.md`. Roster agents not yet written are listed with `status: "planned"`.
- `scripts/build-index.mjs` (+ `--check`), `scripts/kb-search.mjs`, `scripts/lib/kb.mjs`: BM25 over `##` sections of `knowledge/**/*.md`, parses flow and block lists. `tests/kb.test.mjs` 2/2 pass. `knowledge/README.md`.
- `.github/workflows/ci.yml`: validator, tests, catalog and index freshness, installer round trip on Linux and Windows (PowerShell), `claude plugin validate` (continue-on-error).

## Not done
- `creative-lead`, `technical-lead`, `production-lead`, `knowledge-lead`: two drafting subagents were still writing these at the deadline. Anything present under `agents/leadership/` besides `shop-steward.md` in the final commit is unreviewed.
- `scripts/check-links.mjs`, `scripts/route.mjs` (the Steward and `route` skill mention route.mjs as optional "if present"), `scripts/roster.mjs`.
- `docs/decisions/` note on the keyword-search choice (now A3's `docs/`, but the content is mine: BM25, no deps, no vector DB, because the corpus is small labelled Markdown and must run anywhere Node runs).
- `--strict` validation for stream A cannot pass until A2 lands `agents/production/`.

## Untested
- `install.ps1`: written, never run (no PowerShell here). CI's `windows-installer` job will be its first run.
- CI workflow: pushed but I did not confirm a run result on GitHub.
- `run-agent.mjs` on Windows: `.cmd` shims for codex/claude cannot be spawned without a shell by recent Node; the runner does not yet handle that. Long prompts on Windows may also exceed the 32k command-line limit (consider `codex exec -` with stdin; UNVERIFIED that Codex accepts `-`).
- Real Codex: not signed in here. Local should run `node scripts/run-agent.mjs <codex-agent> "<task>"` once production agents exist.
- Live runs of the Steward and `/new-specialist` were started at 07:39 UTC with `claude -p --plugin-dir .`; results are recorded below if they finished before the deadline.

## Live run results
(see below)

## Needs local verification
- `codex exec -` reads the prompt from stdin (planned Windows path): UNVERIFIED.

## Requests to other streams
- A2: production agents should point at the shared skills by `skills/<name>/SKILL.md` only when they really use them; run `node scripts/build-catalog.mjs` after adding agents, since CI checks catalog freshness.
- A3: README install lines are `/plugin marketplace add <owner>/<repo>` then `/plugin install npc-union@npc-union`, or `./install.sh --project .`; the Steward runs as `claude --agent npc-union:leadership:shop-steward`.
- All streams: CI runs `node scripts/build-catalog.mjs --check` and `node scripts/build-index.mjs --check`; regenerate both before pushing new agents or knowledge files.
