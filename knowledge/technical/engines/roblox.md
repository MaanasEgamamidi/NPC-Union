---
title: Roblox platform limits, DevEx and creator policy pointers
tags: [roblox, luau, datastore, devex, monetization, engine]
sources:
  - https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits
  - https://create.roblox.com/docs/production/monetization/developer-exchange
  - https://create.roblox.com/docs/cloud-services/memory-stores
  - https://create.roblox.com/docs/luau/type-checking
  - https://create.roblox.com/docs/production/promotion/content-maturity
last_verified: 2026-11-05
---

# Roblox platform limits, DevEx and creator policy pointers

## Luau

Roblox Studio ships Luau continuously; there is no project-pinned version. Type checking modes are set per script with `--!strict`, `--!nonstrict`, `--!nocheck` (https://create.roblox.com/docs/luau/type-checking, page reachable 2026-11-05). Status of the new type solver rollout: UNVERIFIED. Language reference: https://luau.org/.

## DataStoreService limits (fetched 2026-11-05)

Source: https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits

| Limit | Value |
|---|---|
| Key name, store name, scope | 50 characters each |
| Value size per key | 4,194,304 (4 MB) serialized |
| Metadata | key 50 chars, value 250 chars, 300 chars total |
| Per-server read / write / remove (standard) | 60 + numPlayers x 40 per minute each |
| Per-server list (standard) | 5 + numPlayers x 2 per minute |
| Per-server ordered write / remove | 30 + numPlayers x 5 per minute |
| Per-experience standard read/remove | 300 + concurrentUsers x 40 per minute |
| Per-experience writes | 300 + concurrentUsers x 20 per minute |
| Per-experience list | 300 + concurrentUsers x 2 per minute |
| Per-key throughput (all servers, rolling 60 s) | reads 25 MB/min, writes 4 MB/min; each request rounded up to 1 KB |
| Request queue | 30 per queue type; overflow fails with error codes 301-306 |
| Storage | 500 MB + 1 MB x lifetime user count (latest versions, compressed) |
| Budget tuning | `SetRateLimitForRequestType()` per the page |

A same-key write cooldown is not stated on this page: UNVERIFIED (older docs cited 6 seconds).

## MemoryStoreService

[Memory stores limits](https://create.roblox.com/docs/cloud-services/memory-stores): game-level memory quota is 64 KB + 1.2 KB per user; request quota is 1,000 + 120 per concurrent user per minute. Some operations consume multiple units; check the current page for exceptions and additional limits.

## Developer Exchange (fetched 2026-11-05)

Source: https://create.roblox.com/docs/production/monetization/developer-exchange

| Item | Value |
|---|---|
| Standard rate | USD 0.0038 per Earned Robux (30,000 = USD 114) |
| Higher rate | USD 0.0054 for certain Earned Robux from developer products, passes, subscriptions and private servers in eligible games, bought by U.S. players age-verified 18+ |
| Legacy rate | USD 0.0035 for Robux earned before 2025-09-05 10am PT; cashed out first |
| Minimum | 30,000 Earned Robux |
| Eligibility | 13+, verified email, DevEx portal account, W-9 or W-8 on file, agree to DevEx Terms, comply with Terms of Use and Community Standards |

## Policy pointers

- Maturity and compliance questionnaire, content labels: https://create.roblox.com/docs/production/promotion/content-maturity (reachable; current label names and rules UNVERIFIED, read before advising).
- Monetization products: Developer Products (repeatable, `MarketplaceService.ProcessReceipt`), Passes (one-time, `UserOwnsGamePassAsync`). Fee percentages: UNVERIFIED.

## Tooling

- Rojo (file sync to Studio): https://rojo.space/docs/ (reachable). Wally (package manager): https://wally.run/ (reachable). Versions: UNVERIFIED.

## How to re-check

1. DataStore numbers: open the limits page above and compare every row.
2. DevEx: open the DevEx page above; rates changed on 2025-09-05 and may change again.
3. Policy: open the content maturity page and https://create.roblox.com/docs (search "policy service" for `PolicyService:GetPolicyInfoForPlayerAsync`).
