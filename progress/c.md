Status: STOPPED AT DEADLINE (not DONE)

# Stream C: technical division

Branch `build/c-technical`. Started 2026-11-05.

## Scope change (2026-11-05, from the Local session)

This session (C) now owns only `agents/technical/programming/` and `agents/technical/engines/`, plus their skills and knowledge under `knowledge/technical/programming/` and `knowledge/technical/engines/`.
- C2 owns `multiplayer/` and `ai-integration/`.
- C3 owns `platform-tools/` and `asset-scouts/`.
- Hard stop at 07:56 UTC. The six drafting batches for the C2/C3 departments were stopped before writing any files, so nothing for those departments is on this branch.

## Persona names assigned (to avoid collisions; C2/C3 may reuse them)

programming: technical-director Keystone, gameplay-programmer Juke, engine-programmer Crankshaft, graphics-programmer Fresnel, physics-programmer Inertia, ui-programmer Ninepatch, tools-programmer Jig, technical-artist Swizzle, performance-engineer Sixteen, build-engineer Gantry, save-systems-engineer Keepsake
engines: web-engine-specialist Tabby, godot-specialist Arbor, unity-specialist Awake, unreal-specialist Kismet, gamemaker-specialist Stepper, roblox-specialist Studs, bevy-specialist Archie
multiplayer (C2): netcode-architect Jitter, multiplayer-backend-engineer Shard, web-realtime-engineer Handshake, matchmaking-engineer Pairwise, anti-cheat-engineer Honeypot
ai-integration (C2): ai-integration-architect Switchyard, llm-npc-engineer Murmur, game-ai-engineer Blackboard, on-device-ai-engineer Pocket, prompt-engineer Fewshot, rag-engineer Shelfmark, ai-cost-safety-engineer Tollgate, procedural-generation-engineer Fractal
platform-tools (C3): mcp-specialist Stdio, agent-tooling-engineer Harness, game-security-engineer Deadbolt
asset-scouts (C3): itch-scout Rummage, unity-store-scout Haggle, unreal-fab-scout Dowser, godot-asset-scout Forage, open-asset-scout Gleaner, audio-asset-scout Earwig, asset-license-auditor Notary

## Done (exists and passes the validator, 2026-11-05T11:04Z)

- agents/technical/programming/technical-director.md
- agents/technical/programming/gameplay-programmer.md
- agents/technical/programming/engine-programmer.md
- agents/technical/programming/graphics-programmer.md
- agents/technical/programming/tools-programmer.md
- agents/technical/programming/technical-artist.md
- agents/technical/programming/performance-engineer.md
- agents/technical/programming/build-engineer.md
- agents/technical/programming/save-systems-engineer.md
- agents/technical/engines/godot-specialist.md
- agents/technical/engines/unity-specialist.md
- agents/technical/engines/roblox-specialist.md
- agents/technical/engines/bevy-specialist.md

## Written but failing validation

- none


## Not done (in this session's scope)

- agents/technical/programming/physics-programmer.md
- agents/technical/programming/ui-programmer.md
- agents/technical/engines/web-engine-specialist.md
- agents/technical/engines/unreal-specialist.md
- agents/technical/engines/gamemaker-specialist.md

## Not done (moved to other sessions)

- technical/multiplayer: 5 agents, reassigned (C2: multiplayer, ai-integration; C3: platform-tools, asset-scouts). None written here.
- technical/ai-integration: 8 agents, reassigned (C2: multiplayer, ai-integration; C3: platform-tools, asset-scouts). None written here.
- technical/platform-tools: 3 agents, reassigned (C2: multiplayer, ai-integration; C3: platform-tools, asset-scouts). None written here.
- technical/asset-scouts: 7 agents, reassigned (C2: multiplayer, ai-integration; C3: platform-tools, asset-scouts). None written here.

## Validator (stream c, non-strict, at stop)

` / Node.js v22.23.4`

Strict mode fails until C2 and C3 add their departments. This session's goal (strict PASS for all of stream C) cannot be met by this session alone after the scope change.

## Not done: review step

Section 8 item 4 (read 10 random agents end to end and fix generic text) was only partly done: performance-engineer and godot-specialist read in full, bevy knowledge checked. Next session should do the side-by-side voice review across programming and engines.

## Decisions

- Reference repo Claude-Code-Game-Studios (MIT) used for adaptation; files based on it carry `adapted_from`.
- Persona names above were assigned up front to avoid collisions inside stream C.

## Needs local verification

- knowledge/technical/engines/bevy.md: 4 UNVERIFIED item(s); search the file for UNVERIFIED.
- knowledge/technical/engines/godot.md: 4 UNVERIFIED item(s); search the file for UNVERIFIED.
- knowledge/technical/engines/roblox.md: 6 UNVERIFIED item(s); search the file for UNVERIFIED.
- knowledge/technical/engines/unity.md: 5 UNVERIFIED item(s); search the file for UNVERIFIED.

- Batch drafting reports (if written) were in the session scratchpad and are not in the repo.

## Requests to other streams

- Stream A: no roster changes requested.
