---
name: space-apps-challenge-pitch
description: Turn a NASA Space Apps challenge statement into a game concept built on the challenge's own data, with a two-day scope cut and a judging-criteria map.
owner: space-apps-specialist
disable-model-invocation: true
argument-hint: "<challenge URL or text> [team size] [engine]"
---

# Space Apps challenge pitch

Takes one challenge statement and produces a one-page game pitch a team can start building at kickoff.

## Inputs

- The challenge statement (URL on spaceappschallenge.org, or pasted text including its Resources list).
- Event year. If missing, assume the current year and check the dates on https://www.spaceappschallenge.org/ (2026: Nov 14-15).
- Team size (1-6) and skills; engine or framework the team already knows.
- Ask once for anything missing; if still missing, assume a team of 4 in a browser stack and say so.

## Steps

1. Open the challenge page and copy the Summary, Objectives, and every item in its Resources tab (name, owner agency, URL, format). Mark any you cannot open as UNVERIFIED.
2. For each resource, note: size, format (CSV, JSON API, imagery tiles), whether it needs a key or login, and how long one request takes. Drop anything that needs an account the team does not have.
3. Pick the one resource that can drive a mechanic. Valid links: data sets a resource amount, a hazard timer, a map, a spawn table, or the scoring truth. Write: "The player <does X>; the real <Y data> decides <Z>." If no resource can do this, stop and recommend a different challenge.
4. Check the statement's own wording for a format request (some ask for "an educational game" or a learning tool for an age group) and match it exactly.
5. Write the core loop for one level in 3-5 lines. Remove anything the data does not touch.
6. Scope cut for the submission window (about 39 hours from 9:00 AM day one to 11:59 PM day two local in 2022; confirm this year). IN: one loop, one level, one dataset cached as a static file. OUT: accounts, multiplayer, mobile builds, extra datasets. A clickable prototype is acceptable: 2021 Best Storytelling (Space Travelers) was an Adobe XD prototype.
7. Map to the judging criteria (2022 guide: Impact, Creativity, Validity, Relevance, Presentation). One line each on how the build earns it. Re-check the current year's Judging & Awards guide.
8. Choose 1-2 target awards from the current list and say why.
9. Note science claims that need checking and hand them to `space-science-expert` or `orbital-mechanics-expert`.
10. Draft a T-minus schedule: concept locked T-36, data loaded T-30, loop playable T-18, Demo recorded by T-6, submit by T-2.

## Output

```
# <Game title> for "<Challenge name>" (<year>)
Challenge: <url>
Data used (from the challenge Resources): <name, agency, url, format>
Concept: The player <X>; real <Y> decides <Z>.
Core loop: <3-5 lines>
IN scope: <list>    OUT (post-hackathon): <list>
Judging map:
- Impact: <line>
- Creativity: <line>
- Validity: <line>
- Relevance: <line>
- Presentation: <line>
Target awards: <award: reason>
Schedule (T-minus): <milestones>
Science checks needed: <claims -> agent>
UNVERIFIED: <items>
```

## Done when

- [ ] Every dataset named comes from the challenge's own Resources tab and has a working URL, or is marked UNVERIFIED.
- [ ] The concept sentence names a mechanic the data changes.
- [ ] The OUT list exists and is longer than the IN list.
- [ ] All five criteria have a concrete line.
- [ ] Event dates and award names were checked on the current official site, not recalled.
