Status: IN PROGRESS

# Stream D: knowledge division

Branch: `build/d-knowledge`. Owner paths: `agents/knowledge/**`, skills owned by those agents, `knowledge/` (except `knowledge/README.md`, `knowledge/creative/`, `knowledge/technical/`), this file.

## Scope change (2026-11-05 07:35 UTC, from the Local session)

Stream D now covers only `agents/knowledge/domains/` plus its skills and knowledge. Genres moved to session D2, art styles to session D3. Hard stop at 07:50 UTC on 2026-11-05.

- Genre drafting subagents were stopped before they wrote any files, so nothing for genres or art styles is on this branch. D2 and D3 start clean.
- Shared drafting instructions used here (persona names, skill names, knowledge layout) are listed under Decisions so D2/D3 can avoid persona-name clashes.

## Done

- Branch created from `main`.
- Domain drafting subagents running for all 17 domain agents (NASA data, JPL/Exoplanet/PDS knowledge, space science, orbital mechanics, Space Apps, healthcare, sports science, business-finance, urban planning, education, history, climate-earth, agriculture-food, biology-ecology, law-civics, defense-strategy, cybersecurity, physics-engineering). Files are committed as they land.

## Not done

- Review pass (10 random agents read end to end), validator `--strict` PASS for domains, and verification sweep of every cited URL. See the latest commit for which files exist.

## Decisions

- Knowledge layout: `knowledge/space/`, `knowledge/domains/<domain>.md`, `knowledge/genres/<genre>.md`, `knowledge/art-styles/<style>.md`.
- Persona names reserved by stream D domains: Downlink, Parsec, Periapsis, Countdown, Triage, Margin, Scaffold, Isobar, Precedent (renamed from Quorum, which clashed with shop-steward), Palimpsest, Sandtable, Lactate, Furrow, Honeypot, Trophic, Tolerance, Setback.
- Persona names planned for genres/art styles (not used, free for D2/D3 to take or ignore): Sightline, Dropzone, Coyote, Backtrack, Questlog, Reroll, Gambit, Gridlock, Tinder, Tumbler, Apex, Footsies, Creak, Downbeat, Choicebox, Guildhall, Overtime, Chokepoint, Tickover, Couch; Subpixel, Facet, Cubit, Smudge, Speedline, Albedo, Afterglow, Bounce, Wobble, Fold, Impasto, Tilt, Shadowbox.
- Each agent owns exactly one or two skills under `skills/<skill>/SKILL.md` with `disable-model-invocation: true`.

## Needs local verification

(none yet)

## Requests to other streams

(none yet)
