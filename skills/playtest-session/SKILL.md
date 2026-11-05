---
name: playtest-session
description: Plan, run and synthesize one playtest round, from research questions to a ranked findings report that keeps observations, quotes and inferences apart.
owner: playtest-analyst
disable-model-invocation: true
argument-hint: "[build, goal of the test, player profile, number of sessions]"
---

# Playtest session

A repeatable procedure for one round of playtesting.

## Inputs

- The build and the part of it under test.
- The decision this test will inform.
- Target player profile and how many participants are available.
- Session length and whether sessions are in person or remote.

If the decision is missing, ask once: "What will you do differently depending on the result?" If there is still no answer, propose three default questions (can they learn the core verb, do they know their goal, do they want to continue) and proceed.

## Steps

1. Write 3 to 5 research questions. Each must name an observable behaviour and a success marker (for example, "uses dash to cross the gap within 5 minutes, unprompted").
2. Pick the method. Moderated think-aloud for comprehension. Silent play plus retrospective review for timing, difficulty and flow. Survey only for attitudes, after play.
3. Set the sample. 4 to 6 per round for usability-type questions; plan at least two rounds with fixes between. Flag preference or balance questions as needing a larger sample and route them to analytics-engineer.
4. Write the screener. Exclude team members, friends, and anyone who has seen this build. Record genre experience and platform.
5. Write the script: welcome, consent and recording note, "we test the game not you", tasks as goals, neutral stuck prompt with a time threshold, debrief questions, thank-you.
6. Check the script for leading words. Remove any name of a mechanic, system or UI element the player has not named first.
7. Write the survey: overall item first, then specific items, one idea each, labelled 5 or 7 point scale, one open question.
8. Prepare the observation log with columns: time, participant, task, Observation, Quote, Inference. Assign a note-taker who is not the moderator.
9. Run sessions. Moderator does not help. Note-taker timestamps first unprompted use of each core verb, deaths, stalls over 30 seconds, and menu exits.
10. Code within 24 hours. Tag every line O, Q or I. Cluster observations into issues.
11. Rate each issue for frequency (n of N), impact (blocks, slows, annoys), and persistence (recovered or not). Rank by the combination.
12. Write the report and assign an owner agent per issue.

## Output

```
# Playtest report: <build> <date>
Decision this informs: <one line>
Method: <method>, N = <n>, profile: <profile>
Research questions: <list>

## Findings (ranked)
### 1. <problem statement, not a fix> | Severity: <high/med/low>
- Frequency: <n of N>
- Observed: <behaviour with timestamps>
- Quotes: "<quote>" (P#)
- Inference: <what we think is happening>
- Owner: <agent>

## Survey summary
<item: raw responses or median, with N>

## What went well
<observed successes with counts>

## Open questions for next round
<list>
```

## Done when

- [ ] Every research question has an answer or is listed as open.
- [ ] Every finding has a count written as n of N.
- [ ] Observations, quotes and inferences are on separate lines.
- [ ] No finding is phrased as a solution.
- [ ] Every finding has a severity and an owner.
- [ ] Testers used are logged so they are not reused for first-time questions.
