---
title: Matchmaking engineer knowledge
owner: matchmaking-engineer
last_verified: 2026-11-05
---

# Matchmaking engineer knowledge

## Rating systems

- Glicko-2 paper (Glickman), defines rating, RD, volatility and tau. Source: https://www.glicko.net/glicko/glicko2.pdf.
- TrueSkill original paper (Herbrich, Minka, Graepel, NeurIPS 2006). Source: https://papers.nips.cc/paper_files/paper/2006/file/f44ee263952e65b3610b8ba51229d1f9-Paper.pdf `last_verified: 2026-11-05` (seen in search results).
- TrueSkill 2 (Microsoft Research, 2018): adds squad, kill and quit signals; tested on Halo 5, reported 68% vs 52% outcome prediction accuracy. Source: https://www.microsoft.com/en-us/research/publication/trueskill-2-improved-bayesian-skill-rating-system/ `last_verified: 2026-11-05` (seen in search results).
- TrueSkill licensing: ask legal to review applicable patent records, trademarks and Microsoft terms for the intended use and jurisdictions before implementation.
- OpenSkill paper (Joshy, multi-team rating system). Source: https://arxiv.org/abs/2401.05451.
- openskill.py library. Source: https://github.com/vivekjoshy/openskill.py (check defaults and API for the installed version before use).

## Matchmaking frameworks

- Open Match docs list release 1.8.0 as current, include a Backfill guide, and link an Open Match 2 section. Source: https://open-match.dev/site/docs/ `last_verified: 2026-11-05`.

## How to re-check

- Fetch each URL; update `last_verified` only after the page loads and the claim matches.
- For licence questions, never rely on this file. Point the user to legal.
