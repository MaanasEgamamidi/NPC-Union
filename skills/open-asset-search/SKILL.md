---
name: open-asset-search
description: Search free and open art and 3D asset sites and return a shortlist with price, licence, commercial-use verdict and TASL attribution lines.
owner: open-asset-scout
disable-model-invocation: true
argument-hint: "[asset type, style, commercial yes/no]"
---

# Open asset search

A repeatable procedure for building a licence-checked shortlist of free or open assets.

## Inputs

- Asset type (sprite, tileset, UI, texture, PBR material, HDRI, 3D model).
- Style and technical limits (pixel size, resolution, poly count, file format, engine).
- Commercial or not. If missing, ask; if still unknown, assume commercial.
- Whether share-alike (CC-BY-SA) is acceptable to the client.

## Steps

1. Read `knowledge/technical/open-asset-sources.md` and pick sites that match the asset type.
2. Search CC0 sources first: Kenney (https://kenney.nl/assets), Poly Haven (https://polyhaven.com), ambientCG (https://ambientcg.com). Then OpenGameArt.org (https://opengameart.org) using its Art search with art type and licence filters.
3. Open each candidate's asset page. Read the licence on that page, including version, and any credits or readme file.
4. Record the price shown. Note donation or pay-what-you-want options.
5. Set the commercial-use verdict: CC0 yes; CC-BY yes with credit; CC-BY-SA yes but derivatives share-alike (flag); any NC no (reject for commercial); GPL art flag and route to `asset-license-auditor`.
6. For multi-licensed OpenGameArt entries, list every licence and recommend the least restrictive one that fits.
7. Write a TASL attribution line: "Title" by Author, Source URL, licensed under Licence name and version (licence URL). Write "Not required" for CC0.
8. If live search is not available, give sites and search terms only, and mark every row UNVERIFIED. Never invent asset names or URLs.
9. Send audio requests to `audio-asset-scout` and licence doubts to `asset-license-auditor`.

## Output

| Asset | URL | Price | Licence | Commercial use | Attribution line | Notes |
|---|---|---|---|---|---|---|
| <title> | <asset page URL> | <Free / amount> | <licence + version> | <Yes / Yes with credit / Yes, share-alike / No (NC) / Route to auditor> | <TASL line or Not required> | <author count, files, UNVERIFIED flags> |

Flags:
- Share-alike: <assets>
- Rejected (NC): <assets>
- Routed to `asset-license-auditor`: <assets and reason>
- UNVERIFIED: <rows not opened this session>

## Done when

- [ ] Every row has a URL that was opened, or is marked UNVERIFIED.
- [ ] Every row has price, licence with version, and a commercial-use verdict.
- [ ] Every CC-BY and CC-BY-SA row has a full TASL attribution line.
- [ ] No NC asset is recommended for a commercial project.
- [ ] GPL and unclear licences are routed to `asset-license-auditor`.
- [ ] Audio requests are routed to `audio-asset-scout`.
