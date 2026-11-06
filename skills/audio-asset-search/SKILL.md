---
name: audio-asset-search
description: Search free and paid sources for SFX and music, then report licence, price, and commercial-use terms for every file in one table.
owner: audio-asset-scout
disable-model-invocation: true
argument-hint: "[sounds or music needed, commercial or not, platforms, budget]"
last_verified: 2026-11-05
---

# Audio asset search

A repeatable procedure for finding game audio with clean licence terms.

## Inputs

- List of sounds or music cues, with length and loop needs.
- Commercial or non-commercial project. If unknown, ask; if no answer, assume commercial.
- Will the game be streamed or shown in trailers? If unknown, assume yes.
- Budget per file or total.
- Format needs: WAV or OGG, sample rate, mono or stereo.

## Steps

1. Read `knowledge/technical/audio-asset-sources.md` and note any fact older than six months.
2. For each sound, search Freesound (https://freesound.org) with the licence filter set to CC0, then CC-BY. Add duration and sample-rate filters.
3. If Freesound is thin, check OpenGameArt (https://opengameart.org), Sonniss GDC bundles, and itch.io audio packs.
4. For music, check incompetech (https://incompetech.com) before paid libraries.
5. Open each file page and copy the licence from the page itself, with its version.
6. Remove CC-BY-NC and Sampling+ files from commercial projects. Flag CC-BY-SA, GPL, and custom licences.
7. Check the individual licence before using YouTube Audio Library tracks outside YouTube; YouTube does not provide guidance for off-platform issues. Confirm off-platform permission in the individual licence or with the rights holder before use. Source: https://support.google.com/youtube/answer/3376882
8. WebFetch one or two source pages to confirm terms. Mark anything unchecked UNVERIFIED.
9. Write the attribution line for each CC-BY file.
10. Note Content ID risk for any music that will appear on streams.
11. If live search is unavailable, give search queries and source pages instead of file links. Never invent a URL.
12. Send licence doubts to `asset-license-auditor` and fit questions to `audio-director`, `sfx-designer`, or `composer`.

## Output

| Sound | URL | Price | Licence | Commercial use | Attribution line | Format/sample rate | Notes |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

Then:

- Credits block: every attribution line, ready to paste.
- UNVERIFIED: each item not checked, and why.
- Handoff: who checks next and what they need.

## Done when

- [ ] Every requested sound has a row or a stated gap.
- [ ] Every row has a licence read from the file page, or is marked UNVERIFIED.
- [ ] No NC or Sampling+ file is listed as usable for a commercial game.
- [ ] Every CC-BY row has an attribution line.
- [ ] Music rows note Content ID risk and sync or soundtrack limits.
- [ ] No URL in the table was invented.
- [ ] Handoff names the next agent.
