---
name: itch-asset-search
description: Search itch.io game assets with filter URLs and report each hit's price, licence and commercial-use terms quoted from its page.
owner: itch-scout
disable-model-invocation: true
argument-hint: "[asset need, style, budget, commercial or not]"
last_verified: 2026-11-05
---

# itch asset search

## Inputs

- What asset is needed (type, style, size, format, engine).
- Budget: free only, a cap ($5, $15), or any.
- Is the project commercial? Will assets be modified, redistributed, or used in a game jam only?
- Attribution tolerance: can the credits screen list creators?

If the commercial question is unanswered, ask it. If the rest is missing, assume free or under $15, commercial, and say so.

## Steps

1. Read `knowledge/technical/itch-io-assets.md` for current filter URLs.
2. Build browse URLs from verified segments, for example https://itch.io/game-assets/free and https://itch.io/game-assets/tag-pixel-art. The combined [free pixel-art filter](https://itch.io/game-assets/free/tag-pixel-art) was checked on 2026-11-05; fetch other combinations to confirm results match.
3. Fetch the listing (WebFetch, or Codex live search when running on Codex). Take up to 10 candidates that match the brief.
4. Open each candidate's own page. Record the exact URL, the price shown on the buy button, and the licence text in the creator's words. Check the description, any "License" heading, and comments for later changes.
5. If the licence is only inside the download, write "Licence in download, not read" and mark it UNVERIFIED.
6. Classify commercial use as Yes, No, Unclear, quoting the line that decides it.
7. Send every Unclear row, custom licence, or AI-disclosure question to `asset-license-auditor`.
8. Drop anything you could not open. Never fill a row from memory.

## Output

| Asset | URL | Price | Licence | Commercial use | Attribution | Notes |
|---|---|---|---|---|---|---|
| Title as shown | Exact page URL | $0 / $X / PWYW | Quote or name, plus where found | Yes / No / Unclear + quote | Required / Not required / Unclear | Format, size, AI tag, UNVERIFIED flags |

Below the table: search URLs used, date checked, and items sent to `asset-license-auditor`.

## Done when

- [ ] Every row has a URL that was opened this session.
- [ ] Every row has price, licence and commercial-use filled, with a quote or UNVERIFIED.
- [ ] No licence was inferred from a tag alone.
- [ ] Unclear rows are listed for `asset-license-auditor`.
- [ ] Search URLs and the check date are listed.
