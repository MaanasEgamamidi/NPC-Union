# NPC Union

<p align="center"><img src="assets/banner.png" alt="Twelve of the NPC Union crew: cartoon robots whose bodies show their jobs" width="720"></p>

NPC Union is a Claude Code plugin that adds a crew of game-development specialist agents: design, art, 3D, UI and effects, sound, narrative, programming, engines, multiplayer, AI integration, MCP, asset scouting, production, genres, art styles, and subject domains such as space science and healthcare.

You talk to one orchestrator, the **Shop Steward**. It picks the specialists a request needs, runs them, and returns one answer that credits who said what. You can also talk to any specialist directly.

## Install

In Claude Code:

```
/plugin marketplace add MaanasEgamamidi/npc-union
/plugin install npc-union@npc-union
```

Then start a session with the Steward:

```bash
claude --agent npc-union:leadership:shop-steward
```

Not using the plugin system? `install.sh` (macOS, Linux) and `install.ps1` (Windows) copy the agents into a project's `.claude/` or your `~/.claude/`. See [CONTRIBUTING.md](CONTRIBUTING.md) for running from a clone.

## Example

```
> /npc-union:steward I want a pixel-art metroidvania in Godot. Where do I start?

Shop Steward: Three people on this one. Summary first, then who said what.

1. Lock the ability-gate graph before drawing a single room. (metroidvania-expert)
2. Pick a base resolution and tile size now; changing them later means redrawing
   every tileset. Scale by whole numbers only. (pixel-art-stylist)
3. Check the current Godot release before setting up the project, and turn on
   pixel snapping in project settings. (godot-specialist, version looked up
   from the official docs)

Next step: game-designer drafts the core loop. Want me to run it?
```

Useful commands:

| Command | What it does |
|---|---|
| `/npc-union:steward` | Bring in the Shop Steward |
| `/npc-union:talk <agent>` | Talk to one specialist in character |
| `/npc-union:route` | Ask who should handle a request |
| `/npc-union:roster` | Browse agents by folder, capability, or runtime |
| `/npc-union:build-pipeline <idea>` | Get a written plan of which agents run in which order |
| `/npc-union:kb <query>` | Search the knowledge base |
| `/npc-union:new-specialist <topic>` | Generate a new specialist agent |

## How it works

- Agents live in `agents/<division>/<department>/<name>.md` and register as `npc-union:<division>:<department>:<name>`.
- The Steward hands cross-department work to a division lead, who runs their specialists and reports back.
- Each agent has a `runtime`. `claude` agents run as Claude Code subagents. `codex` agents (those that depend on live web search or image generation) run through `scripts/run-agent.mjs` and fall back to Claude if Codex is not installed.
- Knowledge files in `knowledge/` carry sources and a `last_verified` date. Agents look up version-specific facts instead of recalling them.

More detail: [docs/HOW-IT-WORKS.md](docs/HOW-IT-WORKS.md) and [docs/PIPELINE.md](docs/PIPELINE.md).

## Roster

Generated from `catalog/roster.json`.


### leadership

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| shop-steward | `npc-union:leadership:shop-steward` | claude | opus |
| creative-lead | `npc-union:leadership:creative-lead` | claude | opus |
| technical-lead | `npc-union:leadership:technical-lead` | claude | opus |
| production-lead | `npc-union:leadership:production-lead` | claude | opus |
| knowledge-lead | `npc-union:leadership:knowledge-lead` | claude | sonnet |

### production

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| producer | `npc-union:production:producer` | claude | sonnet |
| prototyper | `npc-union:production:prototyper` | claude | sonnet |
| qa-lead | `npc-union:production:qa-lead` | claude | sonnet |
| qa-tester | `npc-union:production:qa-tester` | claude | sonnet |
| playtest-analyst | `npc-union:production:playtest-analyst` | claude | sonnet |
| accessibility-specialist | `npc-union:production:accessibility-specialist` | claude | sonnet |
| release-manager | `npc-union:production:release-manager` | claude | sonnet |
| live-ops-designer | `npc-union:production:live-ops-designer` | claude | sonnet |
| analytics-engineer | `npc-union:production:analytics-engineer` | claude | sonnet |
| community-manager | `npc-union:production:community-manager` | codex | sonnet |
| store-page-marketer | `npc-union:production:store-page-marketer` | codex | sonnet |
| monetization-designer | `npc-union:production:monetization-designer` | claude | sonnet |
| game-legal-advisor | `npc-union:production:game-legal-advisor` | codex | opus |

### creative/design

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| brief-keeper | `npc-union:creative:design:brief-keeper` | claude | sonnet |
| game-designer | `npc-union:creative:design:game-designer` | claude | opus |
| controls-designer | `npc-union:creative:design:controls-designer` | claude | sonnet |
| world-builder | `npc-union:creative:design:world-builder` | claude | opus |
| character-designer | `npc-union:creative:design:character-designer` | claude | sonnet |
| moodboard-curator | `npc-union:creative:design:moodboard-curator` | codex | sonnet |
| level-designer | `npc-union:creative:design:level-designer` | claude | sonnet |
| systems-designer | `npc-union:creative:design:systems-designer` | claude | opus |
| economy-designer | `npc-union:creative:design:economy-designer` | claude | sonnet |
| ux-designer | `npc-union:creative:design:ux-designer` | claude | sonnet |
| npc-designer | `npc-union:creative:design:npc-designer` | claude | opus |
| quest-designer | `npc-union:creative:design:quest-designer` | claude | sonnet |

### creative/art

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| art-director | `npc-union:creative:art:art-director` | claude | opus |
| concept-artist | `npc-union:creative:art:concept-artist` | codex | sonnet |
| sprite-artist | `npc-union:creative:art:sprite-artist` | codex | sonnet |
| anime-artist | `npc-union:creative:art:anime-artist` | codex | sonnet |
| pose-artist | `npc-union:creative:art:pose-artist` | codex | sonnet |
| animator | `npc-union:creative:art:animator` | claude | sonnet |
| vector-artist | `npc-union:creative:art:vector-artist` | codex | sonnet |
| texture-artist | `npc-union:creative:art:texture-artist` | codex | sonnet |
| layer-compositor | `npc-union:creative:art:layer-compositor` | codex | sonnet |
| environment-artist | `npc-union:creative:art:environment-artist` | codex | sonnet |
| modeler-3d | `npc-union:creative:art:modeler-3d` | codex | sonnet |

### creative/screens-effects

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| logo-designer | `npc-union:creative:screens-effects:logo-designer` | codex | sonnet |
| title-screen-designer | `npc-union:creative:screens-effects:title-screen-designer` | codex | sonnet |
| game-ui-artist | `npc-union:creative:screens-effects:game-ui-artist` | codex | sonnet |
| shader-artist | `npc-union:creative:screens-effects:shader-artist` | claude | opus |
| vfx-artist | `npc-union:creative:screens-effects:vfx-artist` | claude | sonnet |
| video-director | `npc-union:creative:screens-effects:video-director` | codex | sonnet |

### creative/sound

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| audio-director | `npc-union:creative:sound:audio-director` | claude | sonnet |
| composer | `npc-union:creative:sound:composer` | claude | sonnet |
| sfx-designer | `npc-union:creative:sound:sfx-designer` | claude | sonnet |
| chiptune-synthesist | `npc-union:creative:sound:chiptune-synthesist` | claude | sonnet |
| voice-director | `npc-union:creative:sound:voice-director` | claude | sonnet |

### creative/narrative

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| narrative-director | `npc-union:creative:narrative:narrative-director` | claude | opus |
| dialogue-writer | `npc-union:creative:narrative:dialogue-writer` | claude | opus |
| lore-keeper | `npc-union:creative:narrative:lore-keeper` | claude | sonnet |
| localization-lead | `npc-union:creative:narrative:localization-lead` | claude | sonnet |

### technical/programming

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| technical-director | `npc-union:technical:programming:technical-director` | claude | opus |
| gameplay-programmer | `npc-union:technical:programming:gameplay-programmer` | claude | opus |
| engine-programmer | `npc-union:technical:programming:engine-programmer` | claude | opus |
| graphics-programmer | `npc-union:technical:programming:graphics-programmer` | claude | opus |
| physics-programmer | `npc-union:technical:programming:physics-programmer` | claude | opus |
| ui-programmer | `npc-union:technical:programming:ui-programmer` | claude | sonnet |
| tools-programmer | `npc-union:technical:programming:tools-programmer` | claude | sonnet |
| technical-artist | `npc-union:technical:programming:technical-artist` | claude | sonnet |
| performance-engineer | `npc-union:technical:programming:performance-engineer` | claude | opus |
| build-engineer | `npc-union:technical:programming:build-engineer` | claude | sonnet |
| save-systems-engineer | `npc-union:technical:programming:save-systems-engineer` | claude | sonnet |

### technical/engines

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| web-engine-specialist | `npc-union:technical:engines:web-engine-specialist` | claude | opus |
| godot-specialist | `npc-union:technical:engines:godot-specialist` | claude | opus |
| unity-specialist | `npc-union:technical:engines:unity-specialist` | claude | opus |
| unreal-specialist | `npc-union:technical:engines:unreal-specialist` | claude | opus |
| gamemaker-specialist | `npc-union:technical:engines:gamemaker-specialist` | claude | sonnet |
| roblox-specialist | `npc-union:technical:engines:roblox-specialist` | claude | sonnet |
| bevy-specialist | `npc-union:technical:engines:bevy-specialist` | claude | sonnet |

### technical/multiplayer

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| netcode-architect | `npc-union:technical:multiplayer:netcode-architect` | claude | opus |
| multiplayer-backend-engineer | `npc-union:technical:multiplayer:multiplayer-backend-engineer` | claude | opus |
| web-realtime-engineer | `npc-union:technical:multiplayer:web-realtime-engineer` | claude | opus |
| matchmaking-engineer | `npc-union:technical:multiplayer:matchmaking-engineer` | claude | sonnet |
| anti-cheat-engineer | `npc-union:technical:multiplayer:anti-cheat-engineer` | claude | opus |

### technical/ai-integration

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| ai-integration-architect | `npc-union:technical:ai-integration:ai-integration-architect` | claude | opus |
| llm-npc-engineer | `npc-union:technical:ai-integration:llm-npc-engineer` | claude | opus |
| game-ai-engineer | `npc-union:technical:ai-integration:game-ai-engineer` | claude | opus |
| on-device-ai-engineer | `npc-union:technical:ai-integration:on-device-ai-engineer` | claude | opus |
| prompt-engineer | `npc-union:technical:ai-integration:prompt-engineer` | claude | opus |
| rag-engineer | `npc-union:technical:ai-integration:rag-engineer` | claude | sonnet |
| ai-cost-safety-engineer | `npc-union:technical:ai-integration:ai-cost-safety-engineer` | claude | opus |
| procedural-generation-engineer | `npc-union:technical:ai-integration:procedural-generation-engineer` | claude | opus |

### technical/platform-tools

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| mcp-specialist | `npc-union:technical:platform-tools:mcp-specialist` | claude | opus |
| agent-tooling-engineer | `npc-union:technical:platform-tools:agent-tooling-engineer` | claude | sonnet |
| game-security-engineer | `npc-union:technical:platform-tools:game-security-engineer` | claude | opus |

### technical/asset-scouts

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| itch-scout | `npc-union:technical:asset-scouts:itch-scout` | codex | sonnet |
| unity-store-scout | `npc-union:technical:asset-scouts:unity-store-scout` | codex | sonnet |
| unreal-fab-scout | `npc-union:technical:asset-scouts:unreal-fab-scout` | codex | sonnet |
| godot-asset-scout | `npc-union:technical:asset-scouts:godot-asset-scout` | codex | sonnet |
| open-asset-scout | `npc-union:technical:asset-scouts:open-asset-scout` | codex | sonnet |
| audio-asset-scout | `npc-union:technical:asset-scouts:audio-asset-scout` | codex | sonnet |
| asset-license-auditor | `npc-union:technical:asset-scouts:asset-license-auditor` | codex | opus |

### knowledge/genres

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| shooter-expert | `npc-union:knowledge:genres:shooter-expert` | claude | sonnet |
| battle-royale-expert | `npc-union:knowledge:genres:battle-royale-expert` | claude | sonnet |
| platformer-expert | `npc-union:knowledge:genres:platformer-expert` | claude | sonnet |
| metroidvania-expert | `npc-union:knowledge:genres:metroidvania-expert` | claude | sonnet |
| rpg-expert | `npc-union:knowledge:genres:rpg-expert` | claude | sonnet |
| roguelike-expert | `npc-union:knowledge:genres:roguelike-expert` | claude | sonnet |
| strategy-expert | `npc-union:knowledge:genres:strategy-expert` | claude | sonnet |
| city-builder-expert | `npc-union:knowledge:genres:city-builder-expert` | claude | sonnet |
| survival-crafting-expert | `npc-union:knowledge:genres:survival-crafting-expert` | claude | sonnet |
| puzzle-expert | `npc-union:knowledge:genres:puzzle-expert` | claude | sonnet |
| racing-expert | `npc-union:knowledge:genres:racing-expert` | claude | sonnet |
| fighting-expert | `npc-union:knowledge:genres:fighting-expert` | claude | sonnet |
| horror-expert | `npc-union:knowledge:genres:horror-expert` | claude | sonnet |
| rhythm-expert | `npc-union:knowledge:genres:rhythm-expert` | claude | sonnet |
| visual-novel-expert | `npc-union:knowledge:genres:visual-novel-expert` | claude | sonnet |
| mmo-expert | `npc-union:knowledge:genres:mmo-expert` | claude | sonnet |
| sports-game-expert | `npc-union:knowledge:genres:sports-game-expert` | claude | sonnet |
| tower-defense-expert | `npc-union:knowledge:genres:tower-defense-expert` | claude | sonnet |
| idle-incremental-expert | `npc-union:knowledge:genres:idle-incremental-expert` | claude | sonnet |
| party-game-expert | `npc-union:knowledge:genres:party-game-expert` | claude | sonnet |

### knowledge/art-styles

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| pixel-art-stylist | `npc-union:knowledge:art-styles:pixel-art-stylist` | codex | sonnet |
| low-poly-stylist | `npc-union:knowledge:art-styles:low-poly-stylist` | codex | sonnet |
| voxel-stylist | `npc-union:knowledge:art-styles:voxel-stylist` | codex | sonnet |
| hand-drawn-stylist | `npc-union:knowledge:art-styles:hand-drawn-stylist` | codex | sonnet |
| anime-cel-stylist | `npc-union:knowledge:art-styles:anime-cel-stylist` | codex | sonnet |
| photoreal-stylist | `npc-union:knowledge:art-styles:photoreal-stylist` | codex | sonnet |
| neon-vector-stylist | `npc-union:knowledge:art-styles:neon-vector-stylist` | codex | sonnet |
| toon-stylist | `npc-union:knowledge:art-styles:toon-stylist` | codex | sonnet |
| ps1-retro-stylist | `npc-union:knowledge:art-styles:ps1-retro-stylist` | codex | sonnet |
| paper-craft-stylist | `npc-union:knowledge:art-styles:paper-craft-stylist` | codex | sonnet |
| painterly-stylist | `npc-union:knowledge:art-styles:painterly-stylist` | codex | sonnet |
| isometric-stylist | `npc-union:knowledge:art-styles:isometric-stylist` | codex | sonnet |
| monochrome-noir-stylist | `npc-union:knowledge:art-styles:monochrome-noir-stylist` | codex | sonnet |

### knowledge/domains

| Agent | Plugin ID | Runtime | Model |
|---|---|---|---|
| nasa-data-specialist | `npc-union:knowledge:domains:nasa-data-specialist` | codex | opus |
| space-science-expert | `npc-union:knowledge:domains:space-science-expert` | codex | opus |
| orbital-mechanics-expert | `npc-union:knowledge:domains:orbital-mechanics-expert` | claude | opus |
| space-apps-specialist | `npc-union:knowledge:domains:space-apps-specialist` | codex | opus |
| healthcare-expert | `npc-union:knowledge:domains:healthcare-expert` | codex | opus |
| business-finance-expert | `npc-union:knowledge:domains:business-finance-expert` | codex | opus |
| education-expert | `npc-union:knowledge:domains:education-expert` | codex | opus |
| climate-earth-expert | `npc-union:knowledge:domains:climate-earth-expert` | codex | opus |
| law-civics-expert | `npc-union:knowledge:domains:law-civics-expert` | codex | opus |
| history-expert | `npc-union:knowledge:domains:history-expert` | codex | opus |
| defense-strategy-expert | `npc-union:knowledge:domains:defense-strategy-expert` | codex | opus |
| sports-science-expert | `npc-union:knowledge:domains:sports-science-expert` | codex | sonnet |
| agriculture-food-expert | `npc-union:knowledge:domains:agriculture-food-expert` | codex | sonnet |
| cybersecurity-expert | `npc-union:knowledge:domains:cybersecurity-expert` | codex | opus |
| biology-ecology-expert | `npc-union:knowledge:domains:biology-ecology-expert` | codex | opus |
| physics-engineering-expert | `npc-union:knowledge:domains:physics-engineering-expert` | codex | opus |
| urban-planning-expert | `npc-union:knowledge:domains:urban-planning-expert` | codex | sonnet |

## Gallery

Every agent has a cartoon portrait in `assets/avatars/<name>.png`. New agents start without one, and their name below the picture works as the fallback.


**leadership**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/shop-steward.png" width="96" alt="shop-steward"><br>`shop-steward` | <img src="assets/avatars/creative-lead.png" width="96" alt="creative-lead"><br>`creative-lead` | <img src="assets/avatars/technical-lead.png" width="96" alt="technical-lead"><br>`technical-lead` | <img src="assets/avatars/production-lead.png" width="96" alt="production-lead"><br>`production-lead` |
| <img src="assets/avatars/knowledge-lead.png" width="96" alt="knowledge-lead"><br>`knowledge-lead` |

**production**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/producer.png" width="96" alt="producer"><br>`producer` | <img src="assets/avatars/prototyper.png" width="96" alt="prototyper"><br>`prototyper` | <img src="assets/avatars/qa-lead.png" width="96" alt="qa-lead"><br>`qa-lead` | <img src="assets/avatars/qa-tester.png" width="96" alt="qa-tester"><br>`qa-tester` |
| <img src="assets/avatars/playtest-analyst.png" width="96" alt="playtest-analyst"><br>`playtest-analyst` | <img src="assets/avatars/accessibility-specialist.png" width="96" alt="accessibility-specialist"><br>`accessibility-specialist` | <img src="assets/avatars/release-manager.png" width="96" alt="release-manager"><br>`release-manager` | <img src="assets/avatars/live-ops-designer.png" width="96" alt="live-ops-designer"><br>`live-ops-designer` |
| <img src="assets/avatars/analytics-engineer.png" width="96" alt="analytics-engineer"><br>`analytics-engineer` | <img src="assets/avatars/community-manager.png" width="96" alt="community-manager"><br>`community-manager` | <img src="assets/avatars/store-page-marketer.png" width="96" alt="store-page-marketer"><br>`store-page-marketer` | <img src="assets/avatars/monetization-designer.png" width="96" alt="monetization-designer"><br>`monetization-designer` |
| <img src="assets/avatars/game-legal-advisor.png" width="96" alt="game-legal-advisor"><br>`game-legal-advisor` |

**creative/design**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/brief-keeper.png" width="96" alt="brief-keeper"><br>`brief-keeper` | <img src="assets/avatars/game-designer.png" width="96" alt="game-designer"><br>`game-designer` | <img src="assets/avatars/controls-designer.png" width="96" alt="controls-designer"><br>`controls-designer` | <img src="assets/avatars/world-builder.png" width="96" alt="world-builder"><br>`world-builder` |
| <img src="assets/avatars/character-designer.png" width="96" alt="character-designer"><br>`character-designer` | <img src="assets/avatars/moodboard-curator.png" width="96" alt="moodboard-curator"><br>`moodboard-curator` | <img src="assets/avatars/level-designer.png" width="96" alt="level-designer"><br>`level-designer` | <img src="assets/avatars/systems-designer.png" width="96" alt="systems-designer"><br>`systems-designer` |
| <img src="assets/avatars/economy-designer.png" width="96" alt="economy-designer"><br>`economy-designer` | <img src="assets/avatars/ux-designer.png" width="96" alt="ux-designer"><br>`ux-designer` | <img src="assets/avatars/npc-designer.png" width="96" alt="npc-designer"><br>`npc-designer` | <img src="assets/avatars/quest-designer.png" width="96" alt="quest-designer"><br>`quest-designer` |

**creative/art**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/art-director.png" width="96" alt="art-director"><br>`art-director` | <img src="assets/avatars/concept-artist.png" width="96" alt="concept-artist"><br>`concept-artist` | <img src="assets/avatars/sprite-artist.png" width="96" alt="sprite-artist"><br>`sprite-artist` | <img src="assets/avatars/anime-artist.png" width="96" alt="anime-artist"><br>`anime-artist` |
| <img src="assets/avatars/pose-artist.png" width="96" alt="pose-artist"><br>`pose-artist` | <img src="assets/avatars/animator.png" width="96" alt="animator"><br>`animator` | <img src="assets/avatars/vector-artist.png" width="96" alt="vector-artist"><br>`vector-artist` | <img src="assets/avatars/texture-artist.png" width="96" alt="texture-artist"><br>`texture-artist` |
| <img src="assets/avatars/layer-compositor.png" width="96" alt="layer-compositor"><br>`layer-compositor` | <img src="assets/avatars/environment-artist.png" width="96" alt="environment-artist"><br>`environment-artist` | <img src="assets/avatars/modeler-3d.png" width="96" alt="modeler-3d"><br>`modeler-3d` |

**creative/screens-effects**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/logo-designer.png" width="96" alt="logo-designer"><br>`logo-designer` | <img src="assets/avatars/title-screen-designer.png" width="96" alt="title-screen-designer"><br>`title-screen-designer` | <img src="assets/avatars/game-ui-artist.png" width="96" alt="game-ui-artist"><br>`game-ui-artist` | <img src="assets/avatars/shader-artist.png" width="96" alt="shader-artist"><br>`shader-artist` |
| <img src="assets/avatars/vfx-artist.png" width="96" alt="vfx-artist"><br>`vfx-artist` | <img src="assets/avatars/video-director.png" width="96" alt="video-director"><br>`video-director` |

**creative/sound**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/audio-director.png" width="96" alt="audio-director"><br>`audio-director` | <img src="assets/avatars/composer.png" width="96" alt="composer"><br>`composer` | <img src="assets/avatars/sfx-designer.png" width="96" alt="sfx-designer"><br>`sfx-designer` | <img src="assets/avatars/chiptune-synthesist.png" width="96" alt="chiptune-synthesist"><br>`chiptune-synthesist` |
| <img src="assets/avatars/voice-director.png" width="96" alt="voice-director"><br>`voice-director` |

**creative/narrative**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/narrative-director.png" width="96" alt="narrative-director"><br>`narrative-director` | <img src="assets/avatars/dialogue-writer.png" width="96" alt="dialogue-writer"><br>`dialogue-writer` | <img src="assets/avatars/lore-keeper.png" width="96" alt="lore-keeper"><br>`lore-keeper` | <img src="assets/avatars/localization-lead.png" width="96" alt="localization-lead"><br>`localization-lead` |

**technical/programming**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/technical-director.png" width="96" alt="technical-director"><br>`technical-director` | <img src="assets/avatars/gameplay-programmer.png" width="96" alt="gameplay-programmer"><br>`gameplay-programmer` | <img src="assets/avatars/engine-programmer.png" width="96" alt="engine-programmer"><br>`engine-programmer` | <img src="assets/avatars/graphics-programmer.png" width="96" alt="graphics-programmer"><br>`graphics-programmer` |
| <img src="assets/avatars/physics-programmer.png" width="96" alt="physics-programmer"><br>`physics-programmer` | <img src="assets/avatars/ui-programmer.png" width="96" alt="ui-programmer"><br>`ui-programmer` | <img src="assets/avatars/tools-programmer.png" width="96" alt="tools-programmer"><br>`tools-programmer` | <img src="assets/avatars/technical-artist.png" width="96" alt="technical-artist"><br>`technical-artist` |
| <img src="assets/avatars/performance-engineer.png" width="96" alt="performance-engineer"><br>`performance-engineer` | <img src="assets/avatars/build-engineer.png" width="96" alt="build-engineer"><br>`build-engineer` | <img src="assets/avatars/save-systems-engineer.png" width="96" alt="save-systems-engineer"><br>`save-systems-engineer` |

**technical/engines**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/web-engine-specialist.png" width="96" alt="web-engine-specialist"><br>`web-engine-specialist` | <img src="assets/avatars/godot-specialist.png" width="96" alt="godot-specialist"><br>`godot-specialist` | <img src="assets/avatars/unity-specialist.png" width="96" alt="unity-specialist"><br>`unity-specialist` | <img src="assets/avatars/unreal-specialist.png" width="96" alt="unreal-specialist"><br>`unreal-specialist` |
| <img src="assets/avatars/gamemaker-specialist.png" width="96" alt="gamemaker-specialist"><br>`gamemaker-specialist` | <img src="assets/avatars/roblox-specialist.png" width="96" alt="roblox-specialist"><br>`roblox-specialist` | <img src="assets/avatars/bevy-specialist.png" width="96" alt="bevy-specialist"><br>`bevy-specialist` |

**technical/multiplayer**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/netcode-architect.png" width="96" alt="netcode-architect"><br>`netcode-architect` | <img src="assets/avatars/multiplayer-backend-engineer.png" width="96" alt="multiplayer-backend-engineer"><br>`multiplayer-backend-engineer` | <img src="assets/avatars/web-realtime-engineer.png" width="96" alt="web-realtime-engineer"><br>`web-realtime-engineer` | <img src="assets/avatars/matchmaking-engineer.png" width="96" alt="matchmaking-engineer"><br>`matchmaking-engineer` |
| <img src="assets/avatars/anti-cheat-engineer.png" width="96" alt="anti-cheat-engineer"><br>`anti-cheat-engineer` |

**technical/ai-integration**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/ai-integration-architect.png" width="96" alt="ai-integration-architect"><br>`ai-integration-architect` | <img src="assets/avatars/llm-npc-engineer.png" width="96" alt="llm-npc-engineer"><br>`llm-npc-engineer` | <img src="assets/avatars/game-ai-engineer.png" width="96" alt="game-ai-engineer"><br>`game-ai-engineer` | <img src="assets/avatars/on-device-ai-engineer.png" width="96" alt="on-device-ai-engineer"><br>`on-device-ai-engineer` |
| <img src="assets/avatars/prompt-engineer.png" width="96" alt="prompt-engineer"><br>`prompt-engineer` | <img src="assets/avatars/rag-engineer.png" width="96" alt="rag-engineer"><br>`rag-engineer` | <img src="assets/avatars/ai-cost-safety-engineer.png" width="96" alt="ai-cost-safety-engineer"><br>`ai-cost-safety-engineer` | <img src="assets/avatars/procedural-generation-engineer.png" width="96" alt="procedural-generation-engineer"><br>`procedural-generation-engineer` |

**technical/platform-tools**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/mcp-specialist.png" width="96" alt="mcp-specialist"><br>`mcp-specialist` | <img src="assets/avatars/agent-tooling-engineer.png" width="96" alt="agent-tooling-engineer"><br>`agent-tooling-engineer` | <img src="assets/avatars/game-security-engineer.png" width="96" alt="game-security-engineer"><br>`game-security-engineer` |

**technical/asset-scouts**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/itch-scout.png" width="96" alt="itch-scout"><br>`itch-scout` | <img src="assets/avatars/unity-store-scout.png" width="96" alt="unity-store-scout"><br>`unity-store-scout` | <img src="assets/avatars/unreal-fab-scout.png" width="96" alt="unreal-fab-scout"><br>`unreal-fab-scout` | <img src="assets/avatars/godot-asset-scout.png" width="96" alt="godot-asset-scout"><br>`godot-asset-scout` |
| <img src="assets/avatars/open-asset-scout.png" width="96" alt="open-asset-scout"><br>`open-asset-scout` | <img src="assets/avatars/audio-asset-scout.png" width="96" alt="audio-asset-scout"><br>`audio-asset-scout` | <img src="assets/avatars/asset-license-auditor.png" width="96" alt="asset-license-auditor"><br>`asset-license-auditor` |

**knowledge/genres**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/shooter-expert.png" width="96" alt="shooter-expert"><br>`shooter-expert` | <img src="assets/avatars/battle-royale-expert.png" width="96" alt="battle-royale-expert"><br>`battle-royale-expert` | <img src="assets/avatars/platformer-expert.png" width="96" alt="platformer-expert"><br>`platformer-expert` | <img src="assets/avatars/metroidvania-expert.png" width="96" alt="metroidvania-expert"><br>`metroidvania-expert` |
| <img src="assets/avatars/rpg-expert.png" width="96" alt="rpg-expert"><br>`rpg-expert` | <img src="assets/avatars/roguelike-expert.png" width="96" alt="roguelike-expert"><br>`roguelike-expert` | <img src="assets/avatars/strategy-expert.png" width="96" alt="strategy-expert"><br>`strategy-expert` | <img src="assets/avatars/city-builder-expert.png" width="96" alt="city-builder-expert"><br>`city-builder-expert` |
| <img src="assets/avatars/survival-crafting-expert.png" width="96" alt="survival-crafting-expert"><br>`survival-crafting-expert` | <img src="assets/avatars/puzzle-expert.png" width="96" alt="puzzle-expert"><br>`puzzle-expert` | <img src="assets/avatars/racing-expert.png" width="96" alt="racing-expert"><br>`racing-expert` | <img src="assets/avatars/fighting-expert.png" width="96" alt="fighting-expert"><br>`fighting-expert` |
| <img src="assets/avatars/horror-expert.png" width="96" alt="horror-expert"><br>`horror-expert` | <img src="assets/avatars/rhythm-expert.png" width="96" alt="rhythm-expert"><br>`rhythm-expert` | <img src="assets/avatars/visual-novel-expert.png" width="96" alt="visual-novel-expert"><br>`visual-novel-expert` | <img src="assets/avatars/mmo-expert.png" width="96" alt="mmo-expert"><br>`mmo-expert` |
| <img src="assets/avatars/sports-game-expert.png" width="96" alt="sports-game-expert"><br>`sports-game-expert` | <img src="assets/avatars/tower-defense-expert.png" width="96" alt="tower-defense-expert"><br>`tower-defense-expert` | <img src="assets/avatars/idle-incremental-expert.png" width="96" alt="idle-incremental-expert"><br>`idle-incremental-expert` | <img src="assets/avatars/party-game-expert.png" width="96" alt="party-game-expert"><br>`party-game-expert` |

**knowledge/art-styles**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/pixel-art-stylist.png" width="96" alt="pixel-art-stylist"><br>`pixel-art-stylist` | <img src="assets/avatars/low-poly-stylist.png" width="96" alt="low-poly-stylist"><br>`low-poly-stylist` | <img src="assets/avatars/voxel-stylist.png" width="96" alt="voxel-stylist"><br>`voxel-stylist` | <img src="assets/avatars/hand-drawn-stylist.png" width="96" alt="hand-drawn-stylist"><br>`hand-drawn-stylist` |
| <img src="assets/avatars/anime-cel-stylist.png" width="96" alt="anime-cel-stylist"><br>`anime-cel-stylist` | <img src="assets/avatars/photoreal-stylist.png" width="96" alt="photoreal-stylist"><br>`photoreal-stylist` | <img src="assets/avatars/neon-vector-stylist.png" width="96" alt="neon-vector-stylist"><br>`neon-vector-stylist` | <img src="assets/avatars/toon-stylist.png" width="96" alt="toon-stylist"><br>`toon-stylist` |
| <img src="assets/avatars/ps1-retro-stylist.png" width="96" alt="ps1-retro-stylist"><br>`ps1-retro-stylist` | <img src="assets/avatars/paper-craft-stylist.png" width="96" alt="paper-craft-stylist"><br>`paper-craft-stylist` | <img src="assets/avatars/painterly-stylist.png" width="96" alt="painterly-stylist"><br>`painterly-stylist` | <img src="assets/avatars/isometric-stylist.png" width="96" alt="isometric-stylist"><br>`isometric-stylist` |
| <img src="assets/avatars/monochrome-noir-stylist.png" width="96" alt="monochrome-noir-stylist"><br>`monochrome-noir-stylist` |

**knowledge/domains**

| | | | |
|---|---|---|---|
| <img src="assets/avatars/nasa-data-specialist.png" width="96" alt="nasa-data-specialist"><br>`nasa-data-specialist` | <img src="assets/avatars/space-science-expert.png" width="96" alt="space-science-expert"><br>`space-science-expert` | <img src="assets/avatars/orbital-mechanics-expert.png" width="96" alt="orbital-mechanics-expert"><br>`orbital-mechanics-expert` | <img src="assets/avatars/space-apps-specialist.png" width="96" alt="space-apps-specialist"><br>`space-apps-specialist` |
| <img src="assets/avatars/healthcare-expert.png" width="96" alt="healthcare-expert"><br>`healthcare-expert` | <img src="assets/avatars/business-finance-expert.png" width="96" alt="business-finance-expert"><br>`business-finance-expert` | <img src="assets/avatars/education-expert.png" width="96" alt="education-expert"><br>`education-expert` | <img src="assets/avatars/climate-earth-expert.png" width="96" alt="climate-earth-expert"><br>`climate-earth-expert` |
| <img src="assets/avatars/law-civics-expert.png" width="96" alt="law-civics-expert"><br>`law-civics-expert` | <img src="assets/avatars/history-expert.png" width="96" alt="history-expert"><br>`history-expert` | <img src="assets/avatars/defense-strategy-expert.png" width="96" alt="defense-strategy-expert"><br>`defense-strategy-expert` | <img src="assets/avatars/sports-science-expert.png" width="96" alt="sports-science-expert"><br>`sports-science-expert` |
| <img src="assets/avatars/agriculture-food-expert.png" width="96" alt="agriculture-food-expert"><br>`agriculture-food-expert` | <img src="assets/avatars/cybersecurity-expert.png" width="96" alt="cybersecurity-expert"><br>`cybersecurity-expert` | <img src="assets/avatars/biology-ecology-expert.png" width="96" alt="biology-ecology-expert"><br>`biology-ecology-expert` | <img src="assets/avatars/physics-engineering-expert.png" width="96" alt="physics-engineering-expert"><br>`physics-engineering-expert` |
| <img src="assets/avatars/urban-planning-expert.png" width="96" alt="urban-planning-expert"><br>`urban-planning-expert` |

## Contributing

New specialists are welcome. Run `/npc-union:new-specialist <topic>` to draft one, then follow [CONTRIBUTING.md](CONTRIBUTING.md). Please read the [Code of Conduct](CODE_OF_CONDUCT.md) and report security issues as described in [SECURITY.md](SECURITY.md).

## Licence

MIT. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
