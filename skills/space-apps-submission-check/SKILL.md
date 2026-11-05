---
name: space-apps-submission-check
description: Pre-submission checklist for a NASA Space Apps project, checked against the year's official submission rules and judging criteria, each item sourced.
owner: space-apps-specialist
disable-model-invocation: true
argument-hint: "<project page URL or draft text> [event year]"
---

# Space Apps submission check

Run this in the last hours before the deadline. Every item cites its source; if the current year's guide says something different, the current guide wins and you note the change.

## Inputs

- The team's project page draft (or URL) with all links.
- Event year and the team's registered location (local event or Universal Event).
- The current year's Participant Guides from https://www.spaceappschallenge.org/ (Resources menu). If you cannot open them, use the 2022 guides below as a baseline and mark each item "2022 rule, confirm".

## Steps

1. Open the current Project Submission Guide and Judging & Awards Guide. Note any rule that differs from the list below.
2. Deadline: confirm the close time in the registered location's time zone. 2022: 11:59 PM local on day two; Universal Event teams use the team creator's local time. [2022 Project Submission Guide]
3. Team: every member registered and listed; one to six members; nobody can be added after close. [2022 Project Submission Guide]
4. Challenge: project is attached to an official challenge, not "Invent Your Own Challenge" (not eligible for Global Judging in 2022). [2022 Judging & Awards Guide]
5. Required fields filled: title, high-level summary, link to final project, link to Demo, detailed description, space agency data, hackathon journey, references. [2022 Project Submission Guide]
6. Data: at least some open data from NASA or a Space Agency Partner is used, and the Space Agency Data field says what, how, and where. [2022 Project Submission Guide]
7. Demo: one link only; within the limit (2022: 30-second video or 7 slides; judges stop at the limit); separate from the Final Project link. [2022 Project Submission Guide]
8. Links: open each link in a private browser window. No login, no access request. [2022 Project Submission Guide]
9. Language: page and linked material in English; a non-English video has English subtitles. No profanity. [2022 guides]
10. References: every dataset, library, image, font, sound, and AI tool used is listed; no copyrighted material without permission. [2022 Project Submission Guide checkbox text]
11. Both confirmation checkboxes ticked, then Submit; confirm the success banner. Resubmits are allowed until close. [2022 Project Submission Guide]
12. Judging read-through: score the page yourself 1-5 on Impact, Creativity, Validity, Relevance, Presentation, and fix the lowest one first. [2022 Judging & Awards Guide]
13. Demo beats: team and challenge (0:00), solution name and problem (0:05), how it works with the data (0:10), what it could change (0:20). ["30 Seconds of Glory", appended to the 2022 Project Submission Guide]

## Output

```
# Submission check: <team> / <challenge> (<year>)
Guide versions used: <current year | 2022 baseline>
| # | Item | Status (OK / FIX / UNVERIFIED) | Note | Source |
|---|------|------|------|--------|
| 1 | Deadline <time, tz> | | | |
...
Self-score: Impact _/5, Creativity _/5, Validity _/5, Relevance _/5, Presentation _/5
Fix first: <item>
Rules that changed since 2022: <list>
```

## Done when

- [ ] Every row has a status and a source.
- [ ] All links were opened logged out.
- [ ] The Demo was timed or slides counted against this year's limit.
- [ ] Any rule taken from the 2022 baseline is flagged for confirmation.

Sources: https://spaceapps-prod.s3.amazonaws.com/media/documents/Space_Apps_2022_Project_Submission_Guide.pdf and https://spaceapps-prod.s3.amazonaws.com/media/documents/Space_Apps_2022_Judging_and_Awards_Guide.pdf
