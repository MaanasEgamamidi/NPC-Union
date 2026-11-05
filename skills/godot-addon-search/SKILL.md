---
name: godot-addon-search
description: Search the Godot Asset Library, Asset Store and GitHub for addons and return a licence, price and version checked shortlist table.
owner: godot-asset-scout
disable-model-invocation: true
argument-hint: "[what the addon must do] [Godot version] [GDScript|C#] [commercial?]"
---

# Godot addon search

A repeatable procedure for finding Godot addons and checking licence, price, commercial use and version fit.

## Inputs

- What the addon must do, in one sentence.
- Exact Godot version (for example 4.3), and whether it is the standard or .NET build.
- Language: GDScript, C#, or either. GDExtension acceptable?
- Target platforms (desktop, web, mobile, console).
- Commercial or not, closed or open source, and budget (free only, or paid allowed).
If any are missing, ask once. If still missing, assume Godot 4.x stable, GDScript, desktop, commercial closed source, free only, and write the assumptions at the top.

## Steps

1. Read `knowledge/technical/godot-asset-library.md` for filters and pitfalls.
2. Search the Asset Library (https://godotengine.org/asset-library/asset) with the text query, Godot version, category, and support levels Featured and Community; sort by Updated. Note the licence filter is the `cost` field.
3. Search the Asset Store (https://store.godotengine.org). Record the listed price and licence.
4. Search GitHub for the feature plus "godot" or topics `godot-addon` and `godot-plugin`.
5. For each candidate open the repo and read the LICENSE file at the latest release tag. Compare it to the listing licence. Check for vendored files with other licences.
6. Record the latest commit or release date, the language (GDScript, C#, GDExtension), and whether the code targets 3.x or 4.x APIs.
7. Set Commercial use: Yes (permissive), Yes with attribution (CC-BY, MIT notice), Conditional (LGPL, MPL-2.0), No for closed source (GPL, AGPL, CC-BY-SA for code), or Ask auditor.
8. Cut 3.x-only addons for 4.x projects, C# addons for non-.NET projects, and repos with no LICENSE file.
9. Mark every field you did not check live as UNVERIFIED. If no live web search is available, say so and stop at knowledge-file facts.
10. Send licence doubts to `asset-license-auditor` and engine fit questions to `godot-specialist`.

## Output

Assumptions: ...
Checked on: YYYY-MM-DD

| Asset | URL | Price | Licence | Commercial use | Godot version | Language | Last update | Notes |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

Recommendation: one to three picks with one reason each.
Hand-offs: `asset-license-auditor`: ... / `godot-specialist`: ...

## Done when

- [ ] Every row has a real URL that was opened, or is marked UNVERIFIED.
- [ ] Licence comes from the repo LICENSE file, not only the listing.
- [ ] Price is stated for every row (Free, or the listed price).
- [ ] Commercial use is filled for every row.
- [ ] Godot version and language are checked against the project.
- [ ] Last update is a repo commit or release date where available.
- [ ] Copyleft and unclear licences are flagged and handed off.
- [ ] Assumptions and check date are written at the top.
