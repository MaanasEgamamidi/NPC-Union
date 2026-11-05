---
name: onboarding-plan
description: "Plan a game's first session: which skill is taught when, in what context, how it is practised, and how a five-tester round checks it."
owner: ux-designer
disable-model-invocation: true
argument-hint: "[game] [first-session length]"
---

# Onboarding plan

## Inputs

- Core verbs and systems, in the order the game needs them.
- Target audience experience (new to genre or veteran).
- First-session length and any existing tutorial.
- If unclear, ask once; otherwise assume a 30-minute first session for genre newcomers.

## Steps

1. List every skill the player needs in the first session. Mark each must-know, should-know, or later.
2. Move every "later" item out of the first session.
3. For each must-know skill, choose the moment of need: the first time the game requires it.
4. Choose the teaching method per skill: safe-space practice in level layout (hand to `level-designer`), contextual prompt, or demonstration by an NPC. Avoid text screens before the moment of need.
5. Order: one new skill at a time, each practised at least twice before the next arrives.
6. Write prompt text: verb first, button glyph, under 8 words; prompt disappears once the action is done twice.
7. Add a reminder rule: if the player has not used a skill for N minutes or fails twice, re-show the prompt.
8. Add skip and replay: experienced players can skip; tutorials can be replayed from a menu.
9. Write the test: five newcomers, tasks per skill, pass criteria.

## Output

```
# Onboarding: <game>
Audience:   First session: <min>
| Minute | Skill | Priority | Moment of need | Method | Prompt text | Practice count |
Reminder rule:
Skip / replay:
## Test round
| Task | Observe | Pass if |
Hand-offs: level-designer (practice spaces), ui-programmer (prompt system), localization-lead (prompt length)
```

## Done when

- [ ] No "later" skill taught in the first session.
- [ ] Each must-know skill has a moment of need and a practice count of at least 2.
- [ ] No text-only tutorial before the moment of need.
- [ ] Skip and replay defined.
- [ ] Test round has numeric pass criteria.
