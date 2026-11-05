---
name: telemetry-spec
description: Write a tracking plan for a game feature or launch, with metric definitions, an event schema, consent notes, an optional experiment plan and a QA checklist.
owner: analytics-engineer
disable-model-invocation: true
argument-hint: "[feature or launch name, plus the decision the data must inform]"
---

# Telemetry spec

A repeatable procedure for turning a feature into a tracking plan that engineers can build and QA can verify.

## Inputs

- Feature or launch name and a short description.
- The decision the data must inform. If missing, ask: "What will you do differently depending on the result?"
- Platforms, regions and age range of players. If missing, ask, because they set consent and time zone rules.
- Existing event taxonomy or envelope, if any. If missing, use the default envelope in step 4.
- Whether an A/B test is planned, and the baseline value of the primary metric if known.

## Steps

1. Write one to three decision questions. Drop any metric that does not map to one.
2. Define each metric: name, numerator, denominator, cohort anchor (for example first successful launch), window (for example 24 to 48 hours after anchor), time basis (server UTC or player local) and exclusions (bots, test accounts, refunds).
3. For retention, state classic or rolling. For funnels, list ordered steps and a time box.
4. Confirm the shared envelope: `event_name`, `event_version`, `event_id`, `client_ts`, `server_ts`, `session_id`, `player_id` (pseudonymous), `build_version`, `platform`, `consent_state`.
5. Derive the minimum events. Name them `object_action` in past tense. Put variation in properties. For every property, give type, allowed values or range, and whether it can be null.
6. Check each property for personal data. Remove or hash anything that is not needed. Note retention period and deletion path.
7. Write the consent rule: which events fire before consent (only strictly necessary ones), and what happens to players who decline. Flag open legal questions for game-legal-advisor.
8. If an experiment is planned: hypothesis, randomization unit (player), split, assignment event, primary metric, guardrails, minimum detectable effect, sample size from a power calculation, duration in full weeks, stopping rule, and the sample ratio mismatch check.
9. Write the QA checklist: one line per event with how to trigger it and what to check in the payload.
10. Write expected volumes per event per DAU so day-one data can be checked against them.

## Output

```markdown
# Telemetry spec: <feature>

## Decision questions
1. ...

## Metrics
| Metric | Formula | Cohort anchor | Window | Time basis | Exclusions |
|---|---|---|---|---|---|

## Events
| Event | Version | Fires when | Properties (type, allowed values, nullable) | Expected per DAU |
|---|---|---|---|---|

## Privacy and consent
- Pre-consent events:
- Personal data removed or hashed:
- Retention period and deletion path:
- Open questions for game-legal-advisor:

## Experiment plan (if any)
- Hypothesis:
- Unit and split:
- Primary metric / guardrails:
- MDE, sample size, duration:
- Stopping rule:
- SRM check:

## QA checklist
- [ ] <event>: trigger by ..., check ...

## Open questions
- ...
```

## Done when

- [ ] Every metric maps to a decision question.
- [ ] Every metric has numerator, denominator, anchor, window, time basis and exclusions.
- [ ] Retention is labeled classic or rolling.
- [ ] Every event uses the shared envelope and `object_action` naming.
- [ ] Every property has a type and allowed values.
- [ ] No raw personal data in any property.
- [ ] Consent rule is written and legal questions are flagged.
- [ ] Experiment plan, if present, has sample size, duration and stopping rule set before launch.
- [ ] QA checklist covers every event.
