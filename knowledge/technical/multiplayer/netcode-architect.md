---
owner: netcode-architect
topic: Netcode models, libraries, and reference material
---

# Netcode architect knowledge

Version-sensitive facts for netcode decisions. Re-check each link before quoting a feature to a user, and update the date.

## Unreal Engine replication and Iris

- Iris is an opt-in replication system that runs alongside Unreal's existing (generic) replication system. It manages connections, groups, prioritisation, filtering, and RPCs, and keeps a quantised copy of replicated state. Source: https://dev.epicgames.com/documentation/en-us/unreal-engine/iris-replication-system-in-unreal-engine `last_verified: 2026-11-05` (via search result summary; check the version selector for the engine version in use)
- Iris components (replication system, replication bridge, net ref handles). Source: https://dev.epicgames.com/documentation/en-us/unreal-engine/components-of-iris-in-unreal-engine `last_verified: 2026-11-05`
- Migrating to Iris: Iris network object filters and prioritizers replace Replication Graph functionality; some gameplay code changes may be needed. Source: https://dev.epicgames.com/documentation/en-us/unreal-engine/migrate-to-iris-in-unreal-engine `last_verified: 2026-11-05`

## Fish-Net (Unity)

- Fish-Net lists built-in client-side prediction, with components for desync smoothing and rigidbody prediction. Source: https://fish-networking.gitbook.io/docs/overview/readme/features `last_verified: 2026-11-05`
- PredictionManager exposes client and server interpolation buffer settings; larger buffers tolerate worse networks but run states later. Source: https://fish-networking.gitbook.io/docs/fishnet-building-blocks/components/managers/predictionmanager `last_verified: 2026-11-05`
- NetworkObject docs: predicted objects keep their graphics on a child object. Source: https://fish-networking.gitbook.io/docs/fishnet-building-blocks/components/network-object `last_verified: 2026-11-05`

## Unity Netcode for GameObjects

- Official documentation home. Source: https://docs-multiplayer.unity3d.com/ UNVERIFIED (not fetched this session; current version and prediction support must be checked before quoting)

## Mirror (Unity)

- Official documentation. Source: https://mirror-networking.gitbook.io/docs UNVERIFIED (not fetched this session)

## Godot high-level multiplayer

- High-level multiplayer API (RPCs, MultiplayerSpawner, MultiplayerSynchronizer). Source: https://docs.godotengine.org/en/stable/tutorials/networking/high_level_multiplayer.html UNVERIFIED (not fetched this session; confirm node names and whether any prediction support exists for the 4.x minor version in use)

## Rollback

- GGPO rollback networking SDK, MIT licensed source on GitHub. Source: https://github.com/pond3r/ggpo UNVERIFIED (not fetched this session; licence stated from memory)

## Reference articles on prediction, interpolation, lag compensation

- Valve, Source Multiplayer Networking (interpolation delay, input prediction, lag compensation). Source: https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking UNVERIFIED (not fetched this session)
- Glenn Fiedler, Gaffer On Games articles on snapshot interpolation and state synchronisation. Source: https://gafferongames.com/ UNVERIFIED (not fetched this session)

## How to check

1. WebFetch the exact page for the feature, not the docs home.
2. Note the engine or library version the page applies to.
3. Replace UNVERIFIED with `last_verified: YYYY-MM-DD` only after the page loads and states the fact.
