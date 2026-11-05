# Pipeline: idea to release

This is the order the Shop Steward (`npc-union:leadership:shop-steward`) follows when someone asks for a whole game rather than a single answer. Each phase names the agents to run, what they need as input, and what they hand to the next phase. The Steward can skip phases a project does not need, but it should not reorder the gates (end of phases 1, 3, 5 and 7).

Agent IDs follow the plugin format `npc-union:<folder with : separators>:<name>`, taken from `catalog/roster.json`. Agents with runtime `codex` are run through `scripts/run-agent.mjs` and fall back to Claude when Codex is not installed.

## How the Steward uses this file

1. Read the request and fill in the **project card** below. Ask only for fields it cannot infer.
2. Pick the matching knowledge agents (genre, art style, domain) and the engine specialist. They join every phase as reviewers.
3. Run phases in order. Within a phase, agents in the same step can run in parallel.
4. At each gate, the named lead signs off on the hand-off. If the lead rejects it, rerun the step it names, not the whole phase.
5. Report to the user after each gate with what was decided and who decided it.

### Project card

```
title:          working title
pitch:          one sentence
genre:          -> knowledge/genres agent
art style:      -> knowledge/art-styles agent
domain:         -> knowledge/domains agent (optional)
engine:         -> technical/engines agent
platforms:      web | desktop | mobile | console
players:        single | local co-op | online (n players)
ai features:    none | LLM NPCs | other
scope:          jam (days) | prototype (weeks) | release (months)
monetization:   premium | free | ads | IAP | none
```

## Phase 0: intake and routing

| Step | Agent | Takes | Hands on |
|---|---|---|---|
| 0.1 | `npc-union:leadership:shop-steward` | user request | draft project card, list of chosen knowledge and engine agents |
| 0.2 | `npc-union:creative:design:brief-keeper` | draft card | locked brief: pitch, pillars (3 max), non-goals, constraints |
| 0.3 | `npc-union:production:producer` | brief, scope | milestone plan with phase dates and a cut list |

## Phase 1: concept

| Step | Agent | Takes | Hands on |
|---|---|---|---|
| 1.1 | `npc-union:creative:design:game-designer` | brief, genre agent notes | core loop, 30-second / 5-minute / session loops, win and fail states |
| 1.1 | genre agent, e.g. `npc-union:knowledge:genres:metroidvania-expert` | brief | reference games to study, genre conventions, scope traps |
| 1.1 | domain agent, e.g. `npc-union:knowledge:domains:healthcare-expert` | brief | sources, accuracy rules, sensitive-topic cautions |
| 1.2 | `npc-union:creative:design:moodboard-curator` | brief, art style agent notes | moodboard with links and palette notes |
| 1.2 | `npc-union:creative:art:art-director` | moodboard, style notes | art direction sheet: palette, shape language, resolution, camera |
| 1.3 | `npc-union:production:game-legal-advisor` | brief, domain notes | IP, data licence and content rating flags (not legal advice) |

**Gate 1, `npc-union:leadership:creative-lead`:** one-page concept (loop + art direction + risks). Rejected concepts go back to 1.1.

## Phase 2: prototype

| Step | Agent | Takes | Hands on |
|---|---|---|---|
| 2.1 | `npc-union:technical:programming:technical-director` | concept, platforms, engine | tech plan: engine version, project layout, risks to prove first |
| 2.1 | engine agent, e.g. `npc-union:technical:engines:godot-specialist` | tech plan | checked engine version and setup steps from official docs |
| 2.2 | `npc-union:production:prototyper` | core loop, tech plan | playable greybox that answers the riskiest question |
| 2.2 | `npc-union:creative:design:controls-designer` | core loop, platforms | input map, feel targets (coyote time, buffers, dead zones) |
| 2.3 | `npc-union:production:playtest-analyst` | prototype build | playtest plan and findings: keep, change, cut |

## Phase 3: pre-production

| Step | Agent | Takes | Hands on |
|---|---|---|---|
| 3.1 | `npc-union:creative:design:systems-designer` | loop, playtest findings | system specs with tunable numbers |
| 3.1 | `npc-union:creative:design:economy-designer` | system specs | currency sources, sinks, pacing tables |
| 3.2 | `npc-union:creative:design:world-builder` | brief, art direction | world bible: places, factions, rules |
| 3.2 | `npc-union:creative:narrative:narrative-director` | world bible | story outline, character arcs, tone guide |
| 3.2 | `npc-union:creative:design:npc-designer` | world bible, outline | NPC roster: goals, routines, behaviour rules |
| 3.3 | `npc-union:creative:design:level-designer` | systems, world bible | level beat charts and greybox layouts |
| 3.3 | `npc-union:creative:design:ux-designer` | systems | screen flow, HUD info hierarchy |
| 3.4 | `npc-union:production:accessibility-specialist` | controls, UX flow | accessibility checklist applied to each spec |

**Gate 3, `npc-union:leadership:production-lead`:** vertical-slice plan with owners for each item. Specs without numbers go back to 3.1.

## Phase 4: production

Work splits into tracks that run in parallel. The Steward asks `npc-union:leadership:creative-lead` and `npc-union:leadership:technical-lead` to run their own tracks and report back.

**Art track**
- `npc-union:creative:art:concept-artist`: key art and character sheets (codex, image generation).
- `npc-union:creative:design:character-designer`: character specs the artists draw from.
- `npc-union:creative:art:sprite-artist` or `npc-union:creative:art:modeler-3d`: production assets to the art direction sheet.
- `npc-union:creative:art:animator`, `npc-union:creative:art:environment-artist`, `npc-union:creative:art:texture-artist`.
- `npc-union:creative:screens-effects:game-ui-artist`, `npc-union:creative:screens-effects:vfx-artist`, `npc-union:creative:screens-effects:shader-artist`.
- Hand on: assets in the formats the engine agent specified, with an asset list.

**Sound track**
- `npc-union:creative:sound:audio-director`: audio direction and mix targets.
- `npc-union:creative:sound:composer`, `npc-union:creative:sound:sfx-designer`, `npc-union:creative:sound:voice-director`.
- Hand on: audio asset list with loudness targets and trigger events.

**Narrative track**
- `npc-union:creative:narrative:dialogue-writer`, `npc-union:creative:narrative:lore-keeper`, `npc-union:creative:design:quest-designer`.
- Hand on: dialogue files and quest specs in the format the UI programmer expects.

**Code track**
- `npc-union:technical:programming:gameplay-programmer`, `npc-union:technical:programming:ui-programmer`, `npc-union:technical:programming:save-systems-engineer`.
- `npc-union:technical:programming:graphics-programmer` and `npc-union:technical:programming:physics-programmer` as needed.
- `npc-union:technical:programming:tools-programmer` and `npc-union:technical:programming:technical-artist` for the art pipeline.
- Hand on: features merged behind the milestone plan, each with a test note for QA.

**Optional tracks**
- Online play: `npc-union:technical:multiplayer:netcode-architect`, then `npc-union:technical:multiplayer:multiplayer-backend-engineer`, `npc-union:technical:multiplayer:web-realtime-engineer` (browser), `npc-union:technical:multiplayer:matchmaking-engineer`, `npc-union:technical:multiplayer:anti-cheat-engineer`.
- AI features: `npc-union:technical:ai-integration:ai-integration-architect`, then `npc-union:technical:ai-integration:llm-npc-engineer`, `npc-union:technical:ai-integration:prompt-engineer`, `npc-union:technical:ai-integration:rag-engineer`, `npc-union:technical:ai-integration:ai-cost-safety-engineer`. Classic AI: `npc-union:technical:ai-integration:game-ai-engineer`.
- Assets to buy or reuse: the matching scout (`npc-union:technical:asset-scouts:itch-scout`, `npc-union:technical:asset-scouts:unity-store-scout`, `npc-union:technical:asset-scouts:godot-asset-scout`, `npc-union:technical:asset-scouts:open-asset-scout`, `npc-union:technical:asset-scouts:audio-asset-scout`), always followed by `npc-union:technical:asset-scouts:asset-license-auditor`.

## Phase 5: alpha and QA

| Step | Agent | Takes | Hands on |
|---|---|---|---|
| 5.1 | `npc-union:production:qa-lead` | feature list, test notes | test plan and severity scale |
| 5.2 | `npc-union:production:qa-tester` | test plan, build | bug reports with repro steps |
| 5.2 | `npc-union:technical:programming:performance-engineer` | build, target hardware | frame-time and memory report, fixes ranked |
| 5.2 | `npc-union:technical:platform-tools:game-security-engineer` | build, backend | security findings |
| 5.3 | `npc-union:production:playtest-analyst` | build | playtest findings tied to the pillars |
| 5.4 | `npc-union:creative:narrative:localization-lead` | text files | localization plan and string freeze date |

**Gate 5, `npc-union:leadership:technical-lead`:** no open blocker bugs, performance within target.

## Phase 6: launch preparation

| Step | Agent | Takes | Hands on |
|---|---|---|---|
| 6.1 | `npc-union:creative:screens-effects:logo-designer`, `npc-union:creative:screens-effects:title-screen-designer` | art direction | logo, title screen, capsule art brief |
| 6.1 | `npc-union:creative:screens-effects:video-director` | build, key art | trailer shot list |
| 6.2 | `npc-union:production:store-page-marketer` | pitch, key art, trailer | store page copy, tags, screenshot list |
| 6.2 | `npc-union:production:monetization-designer` | economy, platforms | pricing and offer plan |
| 6.2 | `npc-union:production:analytics-engineer` | systems | event schema and dashboards |
| 6.3 | `npc-union:production:community-manager` | store page | launch community plan |
| 6.3 | `npc-union:production:game-legal-advisor` | final content, data sources | licence and attribution checklist, rating flags |

## Phase 7: release

| Step | Agent | Takes | Hands on |
|---|---|---|---|
| 7.1 | `npc-union:technical:programming:build-engineer` | repo, platforms | reproducible release builds |
| 7.2 | `npc-union:production:release-manager` | builds, checklist | release checklist signed off, rollback plan |

**Gate 7, `npc-union:production:release-manager` with `npc-union:leadership:production-lead`:** ship or hold.

## Phase 8: live

- `npc-union:production:live-ops-designer`: update cadence and events.
- `npc-union:production:analytics-engineer`: reports on the events defined in 6.2.
- `npc-union:production:community-manager`: feedback summaries back to the Steward, who opens the next loop at Phase 1 or 3.

## Worked runs

### Run 1: web-based multiplayer game using NASA data with AI NPCs

Card: browser game, 2 to 8 players online, players crew a probe mission planned from real asteroid data, an AI mission-control NPC answers questions.

| Phase | Agents (in order) | Key hand-off |
|---|---|---|
| 0 | `npc-union:leadership:shop-steward` → `npc-union:creative:design:brief-keeper` → `npc-union:production:producer` | brief with pillar "real data, readable in 10 seconds" |
| 1 | `npc-union:creative:design:game-designer` + `npc-union:knowledge:domains:nasa-data-specialist` + `npc-union:knowledge:domains:orbital-mechanics-expert` + `npc-union:knowledge:domains:space-apps-specialist` | loop built on data the nasa-data-specialist confirmed is reachable (e.g. JPL SBDB), with access limits listed |
| 1 | `npc-union:creative:art:art-director` + `npc-union:knowledge:art-styles:neon-vector-stylist` | art direction sheet sized for canvas rendering |
| 1 | `npc-union:production:game-legal-advisor` | NASA media usage notes and attribution list |
| 2 | `npc-union:technical:programming:technical-director` + `npc-union:technical:engines:web-engine-specialist` | engine choice and version for the browser |
| 2 | `npc-union:technical:multiplayer:netcode-architect` → `npc-union:technical:multiplayer:web-realtime-engineer` | authority model and transport (WebSocket or WebRTC) |
| 2 | `npc-union:production:prototyper` | two browsers sharing one mission state |
| 3 | `npc-union:creative:design:systems-designer`, `npc-union:creative:design:npc-designer` | mission-control NPC spec: what it knows, what it refuses |
| 4 | `npc-union:technical:ai-integration:ai-integration-architect` → `npc-union:technical:ai-integration:llm-npc-engineer` → `npc-union:technical:ai-integration:rag-engineer` → `npc-union:technical:ai-integration:ai-cost-safety-engineer` | NPC grounded on cached NASA data, per-session cost cap, moderation |
| 4 | `npc-union:technical:multiplayer:multiplayer-backend-engineer`, `npc-union:technical:programming:gameplay-programmer` | rooms, data cache that respects API rate limits |
| 5 | `npc-union:production:qa-lead`, `npc-union:technical:platform-tools:game-security-engineer`, `npc-union:technical:programming:performance-engineer` | load test, prompt-injection test on the NPC |
| 6-7 | `npc-union:production:store-page-marketer` (itch.io page), `npc-union:technical:programming:build-engineer`, `npc-union:production:release-manager` | static build plus backend deploy checklist |

### Run 2: pixel-art metroidvania in Godot

Card: single player, desktop, Godot, hand-made map, premium.

| Phase | Agents (in order) | Key hand-off |
|---|---|---|
| 0 | `npc-union:leadership:shop-steward` → `npc-union:creative:design:brief-keeper` → `npc-union:production:producer` | brief with a hard cap on map size and ability count |
| 1 | `npc-union:creative:design:game-designer` + `npc-union:knowledge:genres:metroidvania-expert` | ability-gate graph: which ability opens which region |
| 1 | `npc-union:creative:art:art-director` + `npc-union:knowledge:art-styles:pixel-art-stylist` | base resolution, tile size, palette count, integer scaling rule |
| 2 | `npc-union:technical:engines:godot-specialist` + `npc-union:technical:programming:technical-director` | checked Godot version, pixel-perfect project settings |
| 2 | `npc-union:creative:design:controls-designer` → `npc-union:production:prototyper` | movement prototype with jump buffer and coyote time values |
| 3 | `npc-union:creative:design:level-designer`, `npc-union:creative:design:world-builder`, `npc-union:creative:narrative:narrative-director` | map with room list, backtracking routes, save points |
| 4 | `npc-union:creative:art:sprite-artist`, `npc-union:creative:art:animator`, `npc-union:creative:art:environment-artist` | sprite sheets and tilesets at the agreed tile size |
| 4 | `npc-union:creative:sound:audio-director` → `npc-union:creative:sound:chiptune-synthesist`, `npc-union:creative:sound:sfx-designer` | music per region, SFX list |
| 4 | `npc-union:technical:programming:gameplay-programmer`, `npc-union:technical:programming:save-systems-engineer` | abilities, map state, save format with versioning |
| 4 | `npc-union:technical:asset-scouts:godot-asset-scout` → `npc-union:technical:asset-scouts:asset-license-auditor` | any reused addons, with licences checked |
| 5 | `npc-union:production:qa-lead` → `npc-union:production:qa-tester`, `npc-union:production:accessibility-specialist` | sequence-break report, remapping and assist options |
| 6-7 | `npc-union:creative:screens-effects:title-screen-designer`, `npc-union:production:store-page-marketer`, `npc-union:technical:programming:build-engineer`, `npc-union:production:release-manager` | store page and export presets per platform |

### Run 3: healthcare management sim in Unity

Card: single player, desktop and tablet, Unity, players run a small clinic. The game is not medical advice and says so.

| Phase | Agents (in order) | Key hand-off |
|---|---|---|
| 0 | `npc-union:leadership:shop-steward` → `npc-union:creative:design:brief-keeper` → `npc-union:production:producer` | brief with non-goal "no diagnosis advice" |
| 1 | `npc-union:creative:design:game-designer` + `npc-union:knowledge:genres:city-builder-expert` + `npc-union:knowledge:domains:healthcare-expert` | loop (staff, patients, queues, budget) with accuracy rules and sensitive-topic list |
| 1 | `npc-union:knowledge:domains:business-finance-expert` | cost model the economy can borrow from |
| 1 | `npc-union:production:game-legal-advisor` | disclaimer wording, data and trademark flags |
| 1 | `npc-union:creative:art:art-director` + `npc-union:knowledge:art-styles:isometric-stylist` | isometric grid size and readability rules |
| 2 | `npc-union:technical:engines:unity-specialist` + `npc-union:technical:programming:technical-director` | checked Unity version, render pipeline choice |
| 2 | `npc-union:production:prototyper` | queue simulation with placeholder art |
| 3 | `npc-union:creative:design:systems-designer` → `npc-union:creative:design:economy-designer` | patient flow model and budget tables |
| 3 | `npc-union:creative:design:ux-designer` + `npc-union:production:accessibility-specialist` | dashboards readable on tablet, colour-blind safe status colours |
| 4 | `npc-union:technical:ai-integration:game-ai-engineer`, `npc-union:technical:programming:gameplay-programmer`, `npc-union:technical:programming:ui-programmer` | agent-based patients and staff, UI bound to the sim |
| 4 | `npc-union:technical:asset-scouts:unity-store-scout` → `npc-union:technical:asset-scouts:asset-license-auditor` | asset packs with commercial-use terms listed |
| 5 | `npc-union:production:playtest-analyst`, `npc-union:production:qa-lead`, `npc-union:technical:programming:performance-engineer` | balance findings, tablet frame-time report |
| 6-8 | `npc-union:production:analytics-engineer`, `npc-union:production:store-page-marketer`, `npc-union:production:release-manager`, `npc-union:production:live-ops-designer` | event schema, store page, release checklist, update plan |
