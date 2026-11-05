---
title: Unreal Engine release and game licence
tags: [unreal, ue5, licensing, replication]
sources: [https://forums.unrealengine.com/tag/released/11396, https://www.unrealengine.com/license, https://dev.epicgames.com/documentation/unreal-engine/actors-in-unreal-engine]
last_verified: 2026-11-05
---

# Unreal Engine 5

- Epic's release listing shows 5.8.4 hotfix on 3 November 2026: [official release list](https://forums.unrealengine.com/tag/released/11396). Major release: [5.8 announcement](https://www.unrealengine.com/news/unreal-engine-5-8-is-now-available). Checked 2026-11-05; verify launcher and project plugins before choosing a patch.
- Unreal is source-accessible under Epic's proprietary EULA, not an open-source licence. Epic's [licensing page](https://www.unrealengine.com/license) describes game royalties of 5% on applicable lifetime gross product revenue above $1 million, with stated exclusions including Epic Games Store sales. Check the current EULA, exclusions, reporting and any custom terms; non-game uses may have seat fees. Checked 2026-11-05.
- [Actors](https://dev.epicgames.com/documentation/unreal-engine/actors-in-unreal-engine) describe components, ticking, destruction and replication. [Component replication](https://dev.epicgames.com/documentation/unreal-engine/replicating-actor-components-in-unreal-engine) requires replication enabled for both owner and component. [Replication flow](https://dev.epicgames.com/documentation/unreal-engine/detailed-actor-replication-flow-in-unreal-engine?lang=en-US) and [ordering](https://dev.epicgames.com/documentation/en-us/unreal-engine/replicated-object-execution-order-in-unreal-engine) describe relevancy and delivery constraints. Checked 2026-11-05; use the project's documentation version selector.
