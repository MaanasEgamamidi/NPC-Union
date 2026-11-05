---
title: Bevy versions, MSRV and physics crate compatibility
tags: [bevy, rust, ecs, engine, versions, avian, rapier]
sources:
  - https://crates.io/crates/bevy
  - https://bevy.org/news/
  - https://bevy.org/learn/migration-guides/
  - https://crates.io/crates/avian3d
  - https://crates.io/crates/bevy_rapier3d
last_verified: 2026-11-05
---

# Bevy versions, MSRV and physics crate compatibility

Versions below were read from the crates.io API on 2026-11-05.

## Bevy

| Item | Value | Source |
|---|---|---|
| Latest stable | 0.20.1 (2026-10-28) | https://crates.io/crates/bevy |
| Previous minor | 0.20.0 (2026-10-08); 0.19.1 (2026-08-13); 0.19.0 (2026-06-19) | https://crates.io/crates/bevy |
| MSRV (`rust-version` in crate metadata) | 0.20.x: Rust 1.97.1; 0.19.x: Rust 1.95.0 | crates.io API `rust_version` field |
| Licence | MIT OR Apache-2.0 | https://crates.io/crates/bevy |
| Release cadence observed | minor (breaking) release roughly every 3-4 months, with RCs 2-4 weeks before | crates.io version list |
| Migration guides index | https://bevy.org/learn/migration-guides/ | fetched 200 |
| Current guide | https://bevy.org/learn/migration-guides/0-19-to-0-20/ | fetched 200 |
| Release notes | https://bevy.org/news/ | fetched 200 |

Every 0.x minor is a breaking release. A pinned `bevy = "0.20"` gets 0.20.x patches only.

## Physics crates

| Crate | Latest | Depends on | Licence | Source |
|---|---|---|---|---|
| avian2d / avian3d | 0.8.0 (2026-10-20) | bevy ^0.20 | MIT OR Apache-2.0 | https://crates.io/crates/avian3d |
| avian2d / avian3d | 0.7.0 (2026-06-20) | bevy 0.19 (UNVERIFIED, inferred from date) | MIT OR Apache-2.0 | crates.io |
| bevy_rapier2d / bevy_rapier3d | 0.37.0 (2026-10-10) | bevy ^0.20, rapier3d ^0.36.1 | Apache-2.0 | https://crates.io/crates/bevy_rapier3d |
| bevy_rapier 0.34-0.36 | 2026-05 to 2026-08 | bevy 0.19 (UNVERIFIED, inferred from date) | Apache-2.0 | crates.io |

Rule: third-party crates pin one Bevy minor. Check the crate's `bevy` dependency on its crates.io "Dependencies" tab before adding it.

## Not verified today

- GitHub releases page (https://github.com/bevyengine/bevy/releases) returned 403 from this environment: UNVERIFIED.
- Specific API renames in 0.20: read from the 0.19 to 0.20 guide; not summarised here (UNVERIFIED).

## How to re-check

1. `curl -s https://crates.io/api/v1/crates/bevy` and read `max_stable_version` and the newest version's `rust_version`.
2. Open https://bevy.org/news/ for the release post, and https://bevy.org/learn/migration-guides/ for every guide between the project's version and the target.
3. For avian or bevy_rapier, open the crate page, Dependencies tab, and read the `bevy` requirement.
