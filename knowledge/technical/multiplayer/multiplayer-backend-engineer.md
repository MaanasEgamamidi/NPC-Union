---
title: Multiplayer backend and fleet hosting sources
owner: multiplayer-backend-engineer
last_verified: 2026-11-05
---

# Multiplayer backend and fleet hosting sources

Facts here can go stale. Re-check the linked page before quoting behavior, versions, or prices.

## Agones (Kubernetes game server orchestration)

- Fleet autoscaling quickstart: https://agones.dev/site/docs/getting-started/create-fleetautoscaler/
  - Buffer policy keeps a number or percentage of Ready GameServers; the autoscaler changes the Fleet's desired replicas. last_verified: 2026-11-05 (via search results of versioned copies of this page, for example https://1-59-0.agones.dev/site/docs/getting-started/create-fleetautoscaler/index.md)
  - For an autoscaled Fleet using RollingUpdate, omit `replicas` from the Fleet spec before re-applying. last_verified: 2026-11-05
- Agones CRD API reference (lists Buffer and Webhook policy types in 1.32): https://1-32-0.agones.dev/site/docs/reference/agones_crd_api_reference/ last_verified: 2026-11-05
- Example FleetAutoscaler YAML: https://github.com/googleforgames/agones/blob/release-1.33.0/examples/fleetautoscaler.yaml last_verified: 2026-11-05
- Scheduling strategies (Packed vs Distributed) and GameServerAllocation reference: [Scheduling and Autoscaling](https://agones.dev/site/docs/advanced/scheduling-and-autoscaling/) and [GameServerAllocation](https://agones.dev/site/docs/reference/gameserverallocation/)

## Amazon GameLift Servers

- CreateGameSessionQueue API reference: https://docs.aws.amazon.com/gamelift/latest/apireference/API_CreateGameSessionQueue.html
  - Queues place sessions using location, cost, and player latency; latency policies are a cap that relaxes over time, evaluated from lowest maximum latency; policies apply only when requests include player latency data; requests past the queue time limit become TIMED_OUT. last_verified: 2026-11-05 (via search summary of the AWS page)
  - Priority configuration options include LATENCY, COST, and LOCATION. last_verified: 2026-11-05
- boto3/botocore create_game_session_queue reference: https://botocore.readthedocs.io/reference/services/gamelift/client/create_game_session_queue.html last_verified: 2026-11-05
- Spot fleet behavior and pricing: https://aws.amazon.com/gamelift/servers/pricing/ (load prices on the day)

## Edgegap

- Documentation home: https://docs.edgegap.com/

## PlayFab Multiplayer Servers

- Documentation: https://learn.microsoft.com/en-us/xbox/playfab/multiplayer/servers/

## Nakama (Heroic Labs)

- Documentation home: https://heroiclabs.com/docs/nakama/
- Authoritative multiplayer guide: https://heroiclabs.com/docs/nakama/concepts/multiplayer/authoritative/

## Heuristics (not version-sensitive, from engineering practice)

- Warm buffer per region = match starts per minute x boot-to-ready minutes x margin.
- Egress estimate = players x send rate x average packet size x session hours.
- Write match results with an idempotency key; servers retry after crashes.
