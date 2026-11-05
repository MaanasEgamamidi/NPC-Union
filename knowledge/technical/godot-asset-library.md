---
title: Godot Asset Library and Asset Store
owner: godot-asset-scout
last_verified: 2026-11-05
---

# Godot Asset Library and Asset Store

last_verified: 2026-11-05

## Godot Asset Library

- URL: https://godotengine.org/asset-library/asset
- Free assets only. Each entry declares one licence from a fixed list.
- Licence options seen in the filter on 2026-11-05: MIT, MPL-2.0, GPLv3, GPLv2, LGPLv3, LGPLv2.1, LGPLv2, AGPLv3, EUPL-1.2, Apache-2.0, CC0, CC-BY-4.0, CC-BY-3.0, CC-BY-SA-4.0, CC-BY-SA-3.0, BSD-2-Clause, BSD-3-Clause, BSL-1.0, ISC, Unlicense, Zlib, Proprietary (see LICENSE file).
- The licence filter's form field is named `cost`. The "License" sort option is `sort=cost`.
- Godot version filter: 2.0, 2.1, 2.2, 3.0 to 3.6, 4.0 to 4.7, Unknown, Custom build.
- Categories: 2D Tools, 3D Tools, Shaders, Materials, Tools, Scripts, Misc, Templates, Projects, Demos.
- Support level checkboxes on the web page: Featured, Community, Testing.
- "Official" support level: not shown as a web filter on 2026-11-05. UNVERIFIED.
- Sort options: Updated, Name, License, with a reverse toggle.

## Godot Asset Store

- URL: https://store.godotengine.org
- Live on 2026-11-05, labelled Beta. Shows publisher, price and licence per asset.
- All prices on the front page on 2026-11-05 were FREE. Paid listings and checkout: UNVERIFIED.

## Licence pitfalls

- GPL and AGPL are copyleft. Shipping GPL code in an exported game can require releasing the game's source under GPL. Send to `asset-license-auditor`.
- LGPL and MPL-2.0 carry weaker copyleft duties. Send to `asset-license-auditor` for commercial use.
- CC-BY needs attribution. CC-BY-SA passes share-alike to derived work.
- The listing licence is self-declared. Read the LICENSE file in the repo at the release tag, and check vendored files.

## Version and language

- Godot 3.x to 4.x broke the API. 3.x addons need porting for 4.x. See https://docs.godotengine.org/en/stable/tutorials/migrating/upgrading_to_godot_4.html (not fetched on 2026-11-05, UNVERIFIED path).
- C# addons need the .NET build of Godot. C# web export support in 4.x: check current docs, UNVERIFIED.
- GDExtension addons ship native binaries per platform; check which platforms have builds.
