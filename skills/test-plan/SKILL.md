---
name: test-plan
description: Writes a risk-based game test plan with a platform regression matrix, entry and exit criteria, and owners for a build, milestone or patch.
owner: qa-lead
disable-model-invocation: true
argument-hint: "[build or milestone, platforms, change list or feature scope]"
---

# Test plan

A repeatable procedure for turning a change list into a scoped, risk-ranked test plan with a clear ship bar.

## Inputs

- Build or milestone name, and the previous tested build to compare against.
- Target platforms and stores, including min-spec hardware.
- Change list, patch notes or feature scope.
- Ship or submission date, and testers available.
- Open bug list, or at least the counts by severity.

If any of these are missing, ask once. If still missing, write the assumption at the top of the plan and continue.

## Steps

1. Classify the release: full milestone, content update, or hotfix. Full milestones get full regression; hotfixes get smoke plus impacted areas.
2. List every changed system from the change list. For each one, name the test areas it touches (save, input, UI, network, rendering, audio, economy, platform services).
3. Score each area for impact (data loss, crash, blocker, major, minor) and likelihood (how much code changed, past bug density). Rank high, medium, low.
4. Build the matrix: rows are test areas, columns are platforms and hardware tiers. Mark each cell full, targeted, smoke, or skip, with a reason for any skip.
5. Add the always-on passes: save compatibility with the previous build, suspend and resume, controller disconnect, sign-out, network loss, and a soak test of at least 2 hours (8 or more for milestones).
6. Write entry criteria (what must be true before testing starts) and exit criteria (open counts by severity, crash repro rates, soak result, platform checks).
7. Estimate effort per row in tester-hours, compare to available time, and cut from the low-risk rows first. Record what was cut.
8. Assign an owner to every row and a triage cadence.
9. Flag anything that needs another specialist: accessibility, ratings, submission rules, telemetry.

## Output

```
# Test plan: <build> (<release type>)
Assumptions: <list or "none">
Compared against: <previous build>
Platforms: <list>

## Risk table
| Area | Change | Impact | Likelihood | Rank |

## Matrix
| Area | <Platform 1> | <Platform 2> | ... | Owner | Hours |
(cells: full / targeted / smoke / skip + reason)

## Always-on passes
- Save compatibility: ...
- Suspend/resume, disconnect, sign-out, network loss: ...
- Soak: <duration>, <scene>, memory logged every <n> min

## Entry criteria
- ...

## Exit criteria
- 0 open S1; <n> open S2 with approved waivers
- Fixed crashes at 0/10 on all platforms
- ...

## Cut from scope
- <row>: <reason>

## Triage
Cadence: <daily / twice weekly>. Attendees: <roles>.

## Handoffs
- <agent>: <what>
```

## Done when

- [ ] Every changed system maps to at least one matrix row.
- [ ] Every matrix cell has a depth or a skip reason.
- [ ] Save compatibility and platform interruption passes are included.
- [ ] Exit criteria are numeric and checkable.
- [ ] Effort fits the available tester-hours, and cuts are written down.
- [ ] Every row has an owner.
- [ ] Assumptions and UNVERIFIED items are listed at the top.
