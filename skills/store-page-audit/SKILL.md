---
name: store-page-audit
description: Run a prioritized audit of a Steam, itch.io or console store page: assets, tags, copy, trailer opening, wishlist and Next Fest plan.
owner: store-page-marketer
disable-model-invocation: true
argument-hint: "[store page URL or asset folder, store, launch date]"
---

# Store page audit

A repeatable audit that turns a store page (live or planned) into a ranked fix list.

## Inputs

- Store(s): Steam, itch.io, console (which).
- Store page URL or local folder with capsules, screenshots, trailer, description text.
- Launch date or window, demo status, current wishlist count and 30-day trend.
- Two or three comparable games the team considers peers.
- If any are missing, ask once, then proceed with stated assumptions.

## Steps

1. Pull current specs. With web search, open the Steamworks graphical assets, tags and Next Fest pages and note today's sizes, limits and dates. Without web search, use `knowledge/production/store-page-marketer.md` and mark every spec UNVERIFIED.
2. Asset check. For each capsule, confirm size, confirm it contains only art, logo and title, and view it at its smallest display size and in grayscale. Note logo legibility pass or fail.
3. Screenshot check. Confirm the first four are gameplay with readable UI. List reorder moves.
4. Trailer check. Write down what happens in seconds 0-2, 2-5 and 5-10 with sound off. Flag logo openers, cutscene openers and anything needing audio.
5. Copy check. Count short description characters. Confirm the first sentence names genre and hook. Rewrite if not. Scan long description for claims needing game-legal-advisor review.
6. Tag check. List current tags in order. Compare to peers. Propose an ordered list with a reason per top-five tag. Drop tags the game does not deliver.
7. Timeline check. Map Coming Soon date, Next Fest eligibility, demo date, launch date and discount rules. Flag gaps.
8. Rank findings: blockers (policy, missing or wrong-size assets), conversion fixes, polish. Assign owner agent and effort S/M/L.
9. List every spec you could not verify.

## Output

```
# Store page audit: <game> (<store>), <date>
Verdict: <one paragraph>
## Blockers
1. <issue> | owner | effort
## Conversion fixes (ranked)
1. <issue> -> <fix> | owner | effort
## Short description
Current (<n> chars): ...
Proposed (<n> chars): ...
## Tags (ordered)
1. <tag>: <reason>
## Trailer first 10 seconds
0-2s: ... | 2-5s: ... | 5-10s: ...
## Timeline
<Coming Soon> -> <Next Fest> -> <launch>
## To verify (UNVERIFIED)
- <spec>: <where to check>
```

## Done when

- [ ] Every capsule checked for size, allowed content and thumbnail legibility.
- [ ] First four screenshots reviewed.
- [ ] Trailer first 10 seconds written out with sound off.
- [ ] Short description has a character count and a genre-first first sentence.
- [ ] Ordered tag list with reasons for the top five.
- [ ] Every finding has an owner and effort.
- [ ] Unverified specs listed with where to check them.
