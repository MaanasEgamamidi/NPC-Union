---
name: unreal-production-slice
description: Plan and verify an Unreal gameplay slice from project inspection to packaged target.
owner: unreal-specialist
disable-model-invocation: true
argument-hint: "[feature, UE version, platforms]"
---

# Unreal Production Slice

## Inputs

- Feature and acceptance criteria, UE build, target platforms, plugins, source-control system and networking needs.
- Existing project and reproduction or desired behaviour. Ask for missing blockers; state assumptions if drafting only.

## Steps

1. Inspect `.uproject`, engine association, actual editor build, plugins, target configuration and logs. Check current release and licensing sources in `knowledge/technical/engines/unreal.md`.
2. Draw Actor/component and Blueprint/C++ ownership; define persistent versus streamed state, asset references and lifecycle. Identify content requiring exclusive edits.
3. For multiplayer, list server authority, owned request path, replicated state, relevancy, late-join behaviour and visual response. Check version-matched documentation before naming APIs.
4. Implement or specify one vertical slice with clear designer parameters and validation. Keep a baseline and avoid upgrading unrelated plugins.
5. Run editor and packaged target tests. For multiplayer, exercise a dedicated server, two clients, late join and relevancy transitions; collect logs. Record unrun target and hardware checks.
6. Hand `build-engineer` the exact editor build, target/configuration, plugins, SDK requirements and reproducible packaging steps.

## Output

```
Engine/build and verification date: <value>
Feature and acceptance criteria: <value>
Actor/component and asset ownership: <diagram>
Authority and replication: <contract or single-player>
Changes: <files or editor steps>
Package and multiplayer evidence: <results>
Risks / UNVERIFIED: <list>
```

## Done when

- [ ] Project and plugin compatibility are checked before changing engine version.
- [ ] Lifetime, authority and late-join state are explicit where relevant.
- [ ] Packaged target results are recorded or marked UNVERIFIED.
