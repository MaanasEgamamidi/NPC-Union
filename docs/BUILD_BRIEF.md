# NPC Union: build brief

This file is the source of truth for the build. It is for the sessions building the repo and gets deleted before the repo goes public. Where it conflicts with a session prompt, the prompt only narrows your scope. Everything else here still applies.

## 1. What we are building

NPC Union is an open-source, installable library of specialist AI agents for game development. It covers every part of making a game: design, art, 3D, screens and effects, sound, narrative, code, engines, multiplayer, AI integration, MCP, asset hunting, production, genres, art styles, and real-world subject domains.

Someone installs it once and gets the whole crew. They normally talk to one orchestrator, the **Shop Steward**, who works out who should handle a request, runs them on the right runtime, and reports back. They can also talk directly to any specialist.

The main goal is **accuracy**. A specialist should give a better answer, and give it faster, than a general assistant. Quality beats speed, length limits, and agent count. If you have to choose, ship fewer finished agents and say so in your progress file.

## 2. Non-negotiable rules

### Originality and licensing
- The concept was inspired by Phaser AE's Crew and tools, but **Phaser AE is source-available (PolyForm Shield 1.0.0), not open source, and its Crew characters are rights-reserved.** Do not copy its portraits, character names, personalities, or marketing text.
- Never use these names as a persona: Chief, Draft, Mood, Casting, Easel, Pixel, Sakura, Gesture, Marquee, Glint, Bevel, Beam, Tessa, Peel, Clay, Prism, Score, Foley, Chip, Reel, Popcorn, Buzz.
- `research/tool-taxonomy.md` lists the tool areas we need to cover. It describes scope only, so write your own wording.
- [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) is MIT. Read it and adapt what is good from its 49 agents, 72 skills, and workflow. Any file substantially based on it gets `adapted_from: Claude-Code-Game-Studios/<path>` in its frontmatter. Add personality, sharper expertise, and our schema instead of copying it unchanged.
- Do not commit screenshots or art from commercial games. Use links and your own written analysis instead.
- Do not put secrets, personal data, or local machine paths in the repo.

### Public tone
- Do not write about the repo owner: no statements about their interests, skills, or passion. The README describes the project and how to use it, nothing else.
- Write plainly. No hype words (revolutionary, seamless, cutting-edge, unleash, supercharge), no filler intros, no em-dash habit. Specific claims only.
- Do not state counts in prose unless they are generated. Read them from the catalog.

### Accuracy
- Every factual claim that can go stale (API, version, price, licence, dataset location) needs a source link and a `last_verified: YYYY-MM-DD` date in the knowledge file holding it. Try WebFetch or WebSearch on every link you cite.
- Mark anything you could not check as `UNVERIFIED`. Never invent a URL, dataset, game, quote, or statistic. Example games must be real, and the details you give about them must be correct.
- If this environment blocks a site, list the link in `progress/<stream>.md` under `## Needs local verification` and mark it `UNVERIFIED`. Do not guess. The Local session will check it.
- Agents must tell users when they are unsure, and must look things up instead of recalling version-specific facts.

## 3. Verified platform facts

Checked against code.claude.com on 2026-11-04. Re-read the docs if you depend on something not listed here.

- Plugin `agents/` is scanned recursively, and subfolders become part of the ID: `agents/creative/art/sprite-artist.md` registers as `npc-union:creative:art:sprite-artist`.
- A subagent can spawn subagents up to three layers below the main conversation, so Steward → division lead → specialist is valid.
- Plugin agents ignore `hooks`, `mcpServers`, and `permissionMode`.
- Unknown frontmatter fields are silently ignored, so our custom fields are safe. Use a flow-style list on one line for lists.
- `model` accepts `sonnet`, `opus`, `haiku`, `fable`, a full Claude ID, or `inherit`. It only names Claude models. **Codex routing goes in our own `runtime` field.**
- `tools: Agent(a, b), Read` allowlists which subagents an agent can spawn.
- All subagent descriptions cost context on every turn, and Claude Code warns above 15,000 tokens combined. **Keep agent descriptions to 200 characters or fewer. The validator enforces this.**
- Skill descriptions cost context every turn unless `disable-model-invocation: true` is set. That setting also blocks preloading through an agent's `skills:` field.
- Plugin skills live in `skills/<name>/SKILL.md` and are invoked as `/npc-union:<name>`. A `CLAUDE.md` at the plugin root is not loaded.
- `${CLAUDE_PLUGIN_ROOT}` is substituted in agent and skill Markdown bodies.
- Plugin names cannot start with `claude-`. Run `claude plugin validate .` if the CLI is available.

**Skill design that follows from this:**
- About 8 **shared** skills stay model-invocable, with short descriptions.
- Every **agent-owned** skill sets `disable-model-invocation: true` and `owner: <agent-name>`. It stays out of per-turn context, and a user can still run it with `/npc-union:<skill>`.
- The owning agent's `## Skills` section tells it to `Read ${CLAUDE_PLUGIN_ROOT}/skills/<skill>/SKILL.md` and follow it when relevant. Do not list these in the agent's `skills:` frontmatter.

## 4. Agent schema

Use `templates/agent.md`. Roster names, paths, and runtimes in `catalog/roster.json` are fixed. **Do not rename or move a roster agent.** Add a new one only if it fills a real gap, and record it in your progress file. Stream A adds it to the roster at integration.

```yaml
---
name: sprite-artist              # must match roster and filename
description: Specs and generates game-ready sprite sheets. Use for characters, frame timing, atlases.   # max 200 chars
tools: Read, Glob, Grep, Write, Edit, WebSearch, WebFetch
model: sonnet                    # Claude model used when run by Claude, or as the fallback
color: orange
# NPC Union fields
persona_name: Dithers            # unique, original, memorable
division: creative
department: art
runtime: codex                   # claude | codex
capabilities: [image-gen, web-search]   # see below
reasoning: medium                # low | medium | high, Codex effort
---
```

**Capabilities**, list what the agent really needs: `web-search`, `image-gen`, `research`, `long-form-text`, `code`, `quick-decisions`, `data-analysis`, `audio-gen`, `video-gen`, `3d-gen`.

**Runtime rule:** use `codex` when the agent's main output depends on live web search or image generation (asset scouts, image-making artists, database hunters). Use `claude` for code, writing, design reasoning, and review. Every Codex agent must still work as a Claude subagent as a fallback, and must say what it can't do without Codex.

**Required body sections, in this order (exact headings):**

1. `## Who I am`: persona name, robot appearance, personality, a mood that changes with the situation (what excites them, what makes them grumpy), quirks, a catchphrase. Agents should feel like different people. **Personality goes in the opening and closing lines of a reply. It never replaces, softens, or delays facts.**
2. `## What I know`: real expertise, at least 8 specific, non-obvious heuristics, numbers, pitfalls, or techniques unique to this niche. If a line could appear in another agent's file unchanged, it doesn't count.
3. `## When to call me`: what they take and what they send elsewhere, naming the other agents by name.
4. `## How I work`: step by step, including the questions they ask first, and when they stop asking and act.
5. `## Knowledge and sources`: named files in `knowledge/`, real databases and docs, and how to check them.
6. `## Skills`: the agent's 1-3 skills, each with a one-line use and the instruction to Read its file. Knowledge-only agents (genre, art style, domain) must still have at least 1.
7. `## What I hand back`: exact deliverable format, plus what the next agent in the pipeline needs.
8. `## Worked example`: one realistic request and a condensed but real answer, showing the depth expected.

**The test for every agent:** would a working professional in this niche learn something from its file? Vague, swappable text is a failure even if the validator passes.

**Skill schema:** see `templates/skill.md`. A skill is a repeatable procedure with inputs, steps, an output template, and a done check, not a restatement of the agent.

**Robot look:** chunky, friendly 3D-toy robots under one studio lighting setup, each with a body that shows its job (a sprite artist has a pixel-grid face and paint arm, an audio designer has dish ears and a waveform chest). Each wears a small round enamel union pin. The pin colour shows the division: creative = coral, technical = teal, production = amber, knowledge = violet, leadership = gold. The `## Who I am` section must describe the robot well enough to generate a portrait. Portraits are generated later by the Local session to `assets/avatars/<name>.png`, so **do not create images yourself.**

**The union theme** is seasoning. Departments are "locals", and the odd joke about breaks and grievances is fine. Don't let it make anything harder to read.

## 5. Repo layout

```
.claude-plugin/plugin.json, marketplace.json     A
agents/leadership/                               A
agents/production/                               A
agents/creative/{design,art,screens-effects,sound,narrative}/   B
agents/technical/{programming,engines,multiplayer,ai-integration,platform-tools,asset-scouts}/   C
agents/knowledge/{genres,art-styles,domains}/    D
skills/<skill>/SKILL.md                          each stream, for its own agents; shared skills: A
knowledge/<topic>/*.md                           each stream, for its own agents; D holds most
knowledge/README.md, scripts/, docs/, README.md, CONTRIBUTING.md, install scripts, .github/   A
catalog/roster.json                              fixed; A only
catalog/agents.json, catalog/CATALOG.md          generated; A only
progress/<stream>.md                             each stream's own file
assets/avatars/                                  Local only
```

**A stream never edits a path it does not own.** If you need a change elsewhere, write it in your progress file.

## 6. Workstreams

### Stream A: foundation, leadership, production (`build/a-foundation`)
- **Plugin packaging:** `plugin.json` and `marketplace.json` for `/plugin marketplace add` and `/plugin install`. Also `install.sh` and `install.ps1` for people not using the plugin system, which copy into `.claude/` of a project or `~/.claude/` and rewrite `${CLAUDE_PLUGIN_ROOT}` paths. Include an uninstall path. Installing must take one or two commands.
- **Shop Steward (`agents/leadership/shop-steward.md`):**
  - Reads `catalog/agents.json` and picks specialists itself instead of relying on the agent listing.
  - Reads each chosen agent's `runtime`. For `claude` it spawns the subagent. For `codex` it runs `scripts/run-agent.mjs`.
  - Consolidates what comes back into one answer and credits who said what.
  - Asks a division lead when the request crosses departments.
  - Also usable as a main-thread agent: `claude --agent npc-union:leadership:shop-steward`.
- **Division leads:** the leads receive a cross-department request, return a plan, or run their specialists and report to the Steward.
- **`scripts/run-agent.mjs <agent> "<task>"`:** Node with no dependencies. It reads the frontmatter and uses the agent body as instructions, then:
  - if runtime is `codex` and Codex is installed, runs it with an argument array, never a shell string. This invocation is verified: `codex --search exec -m <model> -c model_reasoning_effort="<reasoning>" -s workspace-write --skip-git-repo-check -o <file> <prompt>`
  - takes the model from `NPC_UNION_CODEX_MODEL`, default `gpt-6.1-terra`
  - falls back to `claude -p` with a clear notice if Codex is absent
  - supports `--dry-run`, and has tests that use a stub Codex on PATH
- **Shared skills (about 8, short descriptions):**
  - `/npc-union:steward`: bring in the Steward.
  - `/npc-union:talk <agent>`: direct conversation in character.
  - `/npc-union:route`: who should handle this?
  - `/npc-union:roster`: browse by folder, capability, runtime.
  - `/npc-union:build-pipeline <game idea>`: plan which agents run in which order, as a written plan the Steward can follow.
  - `/npc-union:kb <query>`: search the knowledge base.
  - `/npc-union:new-specialist <rough topic>`: **the flagship contributor skill.** Given something as vague as "MCP", it asks narrowing questions, researches with citations, then generates the complete agent, its owned skills, knowledge files, and roster entry in the correct folder, runs the validator, and fixes failures until it passes. Must work end to end. Test it for real on a topic not in the roster, then remove the test output.
- **Knowledge retrieval, deliberately simple:** labelled Markdown in `knowledge/` with frontmatter (`title`, `tags`, `sources`, `last_verified`), `scripts/build-index.mjs` producing `knowledge/index.json`, and `scripts/kb-search.mjs` for BM25-style keyword search. Node, no dependencies, no vector DB. Explain the choice in `docs/decisions/`.
- **Tooling:** `scripts/build-catalog.mjs` (generates `catalog/agents.json` and `catalog/CATALOG.md`), `scripts/check-links.mjs`, GitHub Actions running validator, tests, catalog freshness, and `claude plugin validate` if available.
- **Docs:**
  - `docs/PIPELINE.md`: the full phase-by-phase pipeline from idea to release, with the exact agent IDs for each phase and what each hands to the next, in a form the Steward can follow. Include at least three worked runs: a web-based multiplayer game using NASA data with AI NPCs, a pixel-art metroidvania in Godot, and a business or healthcare sim in Unity.
  - `docs/HOW-IT-WORKS.md`: hierarchy, routing, runtimes, and reporting.
  - `docs/AGENT-CAPABILITIES.md`: generated table of capabilities, runtime, and model for every agent.
- **README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, LICENSE (MIT), `THIRD_PARTY_NOTICES.md` (Claude-Code-Game-Studios MIT notice, not-affiliated note for inspirations), issue and PR templates.** The README leads with what it is, a 30-second install, one example conversation, then the roster by folder, with a gallery that reads from `assets/avatars/` and has a text fallback. Must be easy to scan and good enough to be a public repo people want to star, without saying so.
- Do not wait for other streams. Reference agents by their roster IDs.

### Stream B: creative division (`build/b-creative`)
All of `agents/creative/**` plus their skills and knowledge. Covers design, art, 3D, screens and effects, sound, and narrative, including NPC design.

### Stream C: technical division (`build/c-technical`)
All of `agents/technical/**` plus their skills and knowledge. Covers code, engines (web, Godot, Unity, Unreal, and others), multiplayer, AI integration, MCP, and asset scouts. Engine agents must check current versions from official docs. Asset scouts must report licence, price, and commercial-use terms for anything they recommend, and know the real search features of their store.

### Stream D: knowledge division (`build/d-knowledge`)
All of `agents/knowledge/**` plus their skills and most of `knowledge/`.
- **Genres:** at least 6 real reference games each (e.g. shooter: Call of Duty, Fortnite, Valorant), each with what to study and a link. Cover core loop, design pillars, common failures, and scope traps.
- **Art styles:** at least 6 real reference games each, with a link to an official page, press kit, or Wikipedia, plus palette and shape rules, technical constraints, and an image-prompt recipe that describes visual traits rather than naming living artists.
- **Domains:** each one contains real datasets, APIs, standards, and expert sources a game can build on, and explains how to make the subject accurate and fun, what games get wrong, and sensitive-topic and legal cautions (for example, medical or legal content is not advice).
- **NASA and space:** the deepest area. Real, checked data sources with access method, key requirements, and limits (for example api.nasa.gov, Earthdata, NASA Exoplanet Archive, JPL Horizons and SBDB, PDS, NASA Image and Video Library). Check NASA media usage guidelines.
- **Space Apps:** `space-apps-specialist` holds a checked history of the NASA International Space Apps Challenge, including structure, judging, past challenges and winners, resources, and how a game fits. Everything sourced.

## 7. How to work

- Use subagents in parallel for your agents and skills, and give each one this brief and `templates/agent.md`. Review what they return. Parallel drafting is not an excuse for sameness: **read a sample of your own output side by side and rewrite anything that sounds alike.** Voices, structure of the persona, and jokes must vary.
- Research first. Look up the specifics, then write.
- Check your work with `node scripts/validate.mjs --stream <a|b|c|d>`. Use `--strict` before you call a stream done.
- Commit in small batches (every 5-10 agents) and push to your own branch often. Cloud sessions cannot message back, so the branch and your progress file are how the Local session sees your work.
- Keep `progress/<stream>.md` current: what is done, what is next, decisions, `## Needs local verification`, `## Requests to other streams`. Set `Status: DONE` at the top only when the definition of done is met.
- Do not merge to `main`, open PRs, change repo settings, or make the repo public. Local reviews and merges.
- End commit messages with the attribution line your environment specifies.

## 8. Definition of done (each stream)

1. Every roster agent for your stream exists and passes `node scripts/validate.mjs --stream <x> --strict`.
2. Every skill exists, has an owner, and is a real procedure.
3. Knowledge files carry sources and `last_verified`. Every unchecked item is marked and listed.
4. You read at least 10 random agents from your stream end to end and fixed what was generic.
5. Branch pushed, `progress/<stream>.md` says `Status: DONE`.

Stream A also needs the installer, runner, Steward routing, `/new-specialist`, tests, and CI working, and all of them exercised for real.

Keep going until this is met. Do not stop to ask for confirmation. If something truly can't be done, write down why in your progress file and carry on with the rest.
