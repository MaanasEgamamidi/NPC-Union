---
title: Game AI engineer knowledge
owner: game-ai-engineer
last_reviewed: 2026-11-05
---

# Game AI engineer: sources and facts

Facts here can go stale or were recalled from talks. Each item has a source and either `last_verified: 2026-11-05` (found by web search in this session) or `UNVERIFIED` (not checked here; check before quoting).

## Decision models

- **F.E.A.R. GOAP.** Jeff Orkin, "Three States and a Plan: The AI of F.E.A.R.", GDC 2006. Soldiers use an FSM with three states (Goto, Animate, UseSmartObject) and A* plans sequences of actions as well as paths. Planner resembles STRIPS with added action costs.
  - GDC Vault: https://gdcvault.com/play/1013282/Three-States-and-a-Plan (last_verified: 2026-11-05)
  - Paper copy: https://pages.cs.wisc.edu/~dyer/cs540/handouts/gdc2006_orkin_jeff_fear.pdf (last_verified: 2026-11-05)
- **Utility AI and response curves.** Dave Mark and Kevin Dill, "Improving AI Decision Modeling Through Utility Theory", GDC 2010; Dave Mark, Infinite Axis Utility System (GDC 2015 AI Summit). UNVERIFIED: no URL checked in this session; search GDC Vault by title.
- **Game AI Pro books.** Free chapters on BTs, utility, HTN, GOAP, navigation at http://www.gameaipro.com/ UNVERIFIED (site not returned by search in this session).
- **HTN in Killzone 2 and Horizon Zero Dawn (Guerrilla Games).** Recalled from Guerrilla talks and Game AI Pro chapters. UNVERIFIED.
- **Halo 2 behavior trees.** Damian Isla, "Handling Complexity in the Halo 2 AI", GDC 2005. UNVERIFIED.

## Pacing and director AI

- **Left 4 Dead AI Director.** Michael Booth (Valve), "The AI Systems of Left 4 Dead", AIIDE 2009 keynote. Goals include generating dramatic pacing. The build-up / sustained peak / peak fade / relax cycle is from these slides.
  - Mirror of slides: https://www.readkong.com/page/the-ai-systems-of-left-4-dead-michael-booth-valve-9664541 (last_verified: 2026-11-05, existence of the mirror only)
  - Valve-hosted PDF: exact URL not confirmed. UNVERIFIED.
  - Related: Booth, "Replayable Cooperative Game Design: Left 4 Dead", GDC 2009: https://cdn.fastly.steamstatic.com/apps/valve/2009/GDC2009_ReplayableCooperativeGameDesign_Left4Dead.pdf (last_verified: 2026-11-05)

## Pathfinding and movement

- **A*, navmesh, flow fields.** Amit Patel, Red Blob Games: https://www.redblobgames.com/pathfinding/a-star/introduction.html UNVERIFIED.
- **RVO/ORCA local avoidance.** UNC GAMMA RVO2 library: https://gamma.cs.unc.edu/RVO2/ UNVERIFIED.

## Engine documentation

- **Unreal StateTree.** API reference for the StateTree module (conditions, evaluators, tasks; UStateTree asset holds editor and baked runtime formats):
  - https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Plugins/StateTreeModule/UStateTree (last_verified: 2026-11-05)
  - The conceptual StateTree overview page URL was not confirmed. UNVERIFIED.
- **Unreal Behavior Trees, EQS, Mass Entity.** On dev.epicgames.com/documentation. Exact page URLs not checked. UNVERIFIED. Check the page for the user's engine version.
- **Unity Behavior package (com.unity.behavior) and AI Navigation package (com.unity.ai.navigation).** On docs.unity3d.com/Packages. Exact URLs and current versions not checked. UNVERIFIED.

## How to check

1. Search GDC Vault by talk title; prefer the vault page over mirrors.
2. For engine features, open the doc page for the user's engine version and confirm node and class names before quoting them.
3. Update `last_verified` when a link is re-checked; keep UNVERIFIED until then.
