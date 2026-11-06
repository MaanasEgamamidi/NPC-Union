---
title: Game AI engineer knowledge
owner: game-ai-engineer
last_reviewed: 2026-11-05
last_verified: 2026-11-05
---

# Game AI engineer: sources and facts

Facts here can go stale or were recalled from talks. Each item has a source and either `last_verified: 2026-11-05` (found by web search in this session) or `UNVERIFIED` (not checked here; check before quoting).

## Decision models

- **F.E.A.R. GOAP.** Jeff Orkin, "Three States and a Plan: The AI of F.E.A.R.", GDC 2006. Soldiers use an FSM with three states (Goto, Animate, UseSmartObject) and A* plans sequences of actions as well as paths. Planner resembles STRIPS with added action costs.
  - GDC Vault: https://gdcvault.com/play/1013282/Three-States-and-a-Plan (last_verified: 2026-11-05)
  - Paper copy: https://pages.cs.wisc.edu/~dyer/cs540/handouts/gdc2006_orkin_jeff_fear.pdf (last_verified: 2026-11-05)
- **Utility AI and response curves.** Kevin Dill and Dave Mark, [Improving AI Decision Modeling Through Utility Theory](https://gdcvault.com/play/1012747/Improving-AI-Decision-Modeling-Through), GDC 2010. Mark also presented his [infinite-axis utility system](https://www.gdcvault.com/play/1018040/Architecture-Tricks-Managing-Behaviors-in) at GDC 2013.
- **Game AI Pro books.** [Free chapters](https://www.gameaipro.com/) cover a range of game AI techniques.
- **HTN in Killzone 2.** Guerrilla describes its multiplayer bot planner in [Killzone 2 Multiplayer Bots](https://www.guerrilla-games.com/read/killzone-2-multiplayer-bots). **Horizon Zero Dawn HTN:** UNVERIFIED.
- **Halo 2 behavior trees.** Damian Isla, [Handling Complexity in the Halo 2 AI](https://www.gamedeveloper.com/programming/gdc-2005-proceeding-handling-complexity-in-the-i-halo-2-i-ai), GDC 2005; the implementation is a behavior DAG with shared subtrees.

## Pacing and director AI

- **Left 4 Dead AI Director.** Michael Booth (Valve), "The AI Systems of Left 4 Dead", AIIDE 2009 keynote. Goals include generating dramatic pacing. The build-up / sustained peak / peak fade / relax cycle is from these slides.
  - Mirror of slides: https://www.readkong.com/page/the-ai-systems-of-left-4-dead-michael-booth-valve-9664541 (last_verified: 2026-11-05, existence of the mirror only)
  - Valve-hosted PDF: exact URL not confirmed. UNVERIFIED.
  - Related: Booth, "Replayable Cooperative Game Design: Left 4 Dead", GDC 2009: https://cdn.fastly.steamstatic.com/apps/valve/2009/GDC2009_ReplayableCooperativeGameDesign_Left4Dead.pdf (last_verified: 2026-11-05)

## Pathfinding and movement

- **A*.** Amit Patel, Red Blob Games: https://www.redblobgames.com/pathfinding/a-star/introduction.html.
- **RVO/ORCA local avoidance.** UNC GAMMA RVO2 library: https://gamma.cs.unc.edu/RVO2/.

## Engine documentation

- **Unreal StateTree.** API reference for the StateTree module (conditions, evaluators, tasks; UStateTree asset holds editor and baked runtime formats):
  - https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Plugins/StateTreeModule/UStateTree (last_verified: 2026-11-05)
  - [StateTree overview](https://dev.epicgames.com/documentation/unreal-engine/overview-of-state-tree-in-unreal-engine).
- **Unreal Behavior Trees, EQS, Mass Entity.** See Epic's [Behavior Tree guide](https://dev.epicgames.com/documentation/unreal-engine/behavior-tree-in-unreal-engine---user-guide), [EQS quick start](https://dev.epicgames.com/documentation/unreal-engine/environment-query-system-quick-start-in-unreal-engine), and [MassEntity overview](https://dev.epicgames.com/documentation/unreal-engine/overview-of-mass-entity-in-unreal-engine). Check the documentation for the user's engine version.
- **Unity Behavior and AI Navigation.** Unity 6.0 documents [com.unity.behavior](https://docs.unity3d.com/cn/6000.0/Manual/com.unity.behavior.html) and [com.unity.ai.navigation](https://docs.unity3d.com/cn/current/Manual/com.unity.ai.navigation.html). Check the package version for the project.

## How to check

1. Search GDC Vault by talk title; prefer the vault page over mirrors.
2. For engine features, open the doc page for the user's engine version and confirm node and class names before quoting them.
3. Update `last_verified` when a link is re-checked; keep UNVERIFIED until then.
