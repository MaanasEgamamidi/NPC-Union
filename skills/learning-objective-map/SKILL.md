---
name: learning-objective-map
description: Maps a curriculum topic to measurable objectives, a mechanic that is the skill, in-game evidence, and a teacher report. Use when designing or auditing a learning game.
owner: education-expert
disable-model-invocation: true
argument-hint: "<topic or standard code> [grade/ages] [setting]"
---

# Learning objective map

Turns a topic into a design where playing well requires the skill, and where the game can show a teacher who has it.

## Inputs

- Topic or standard code (Common Core, NGSS, or a national curriculum code).
- Ages or grade band.
- Setting: classroom, homework, or home; device; session length.
- Whether a teacher must see results.
If setting is missing, assume a US middle-school classroom, Chromebooks, browser only, 45-minute period, and state the assumption.

## Steps

1. Look up the standard text on the official site (thecorestandards.org, nextgenscience.org) and quote the code. Do not paraphrase from memory.
2. Write 2 to 5 objectives as verb + condition + criterion, each tagged with a revised Bloom level (Remember, Understand, Apply, Analyze, Evaluate, Create). Reject verbs you cannot observe ("know", "understand", "appreciate").
3. For each objective, list the common misconceptions (one or two each). These become fail states.
4. Choose one player action per objective that is the skill. Test it: can a player win by guessing, by trial and error with no cost, or by skipping the content? If yes, redesign.
5. Check for quiz gates (questions placed between rounds of unrelated play). Replace each with an integrated action or justify it in writing.
6. Write the evidence model: indicator event name, fields logged, which competency it updates, which misconception a wrong move reveals.
7. Plan spacing and fading: list where each skill returns in later levels and the rule for removing hints (based on N correct first attempts, not on level number).
8. Fit the session: core loop length, save points, what happens when the bell rings mid-level.
9. Privacy pass: data fields needed vs nice to have, under-13 status, chat and profile defaults, retention, third-party SDKs. Mark items for `game-legal-advisor`.
10. Design the teacher view: one screen, readable in 30 seconds, grouped by misconception.
11. Label every design choice as research-backed (cite) or assumption (to playtest).

## Output

```
## Learning objective map: <topic>
Assumptions: <ages, setting, device, period length>
Standards: <code - quoted text - URL>
| # | Objective (verb + condition + criterion) | Bloom level | Misconceptions |
| # | Player action that is the skill | Why guessing fails |
Quiz gates removed or justified: <list>
Evidence model:
| Event | Fields | Competency updated | Misconception revealed |
Spacing: <skill -> levels where it returns>
Hint fade rule: <rule>
Session fit: <loop length, save behaviour>
Teacher view: <fields and grouping>
Privacy flags for game-legal-advisor: <list>
Evidence status: <choice - research / assumption>
```

## Done when

- [ ] Every objective has an observable verb and a Bloom level.
- [ ] Every objective maps to an in-game action, and guessing cannot win.
- [ ] Every indicator event has named fields and a competency it updates.
- [ ] Spacing and hint fading are specified.
- [ ] Session fits the stated class period.
- [ ] Privacy flags are listed, including under-13 handling.
- [ ] Standard codes are quoted from the official site with a URL.
- [ ] Each design choice is labelled research or assumption.
