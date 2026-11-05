---
name: release-checklist
description: Run a game release candidate through a repeatable go/no-go checklist covering build identity, testing, platform gates, store readiness and a rollback plan.
owner: release-manager
disable-model-invocation: true
argument-hint: "[version, platforms, target date]"
---

# Release checklist

A repeatable go/no-go procedure for one release candidate. Run it once per candidate and keep the filled copy.

## Inputs

- Version number and the release candidate build ID per platform.
- Target platforms and launch date and time, with time zone.
- Whether this is a first release, a content patch or a hotfix.
- List of save format, server, or backend changes in this build.
- Name of the person with final go/no-go authority.

If any of these are missing, ask for them before starting. Do not guess build IDs.

## Steps

1. Record build identity: build ID, commit hash, branch or tag, and where debug symbols are archived, for each platform.
2. Confirm the tested build is the shipping build. Compare the build ID QA signed off with the one uploaded. Any mismatch is an automatic no-go until retested.
3. Check bugs: count open blockers and critical bugs with qa-lead. Any open blocker is a no-go unless the decision owner waives it in writing.
4. Check stability: get crash rate and top crashes for the candidate from analytics-engineer or the crash reporting service. Compare with the previous release.
5. Check data compatibility: test loading saves from the previous live version. State whether the previous build can read saves made by this one.
6. Check platform gates: Steam build on a private beta branch with predicted patch size noted; console builds submitted or passed cert, with dates. Mark any timing you could not confirm as UNVERIFIED.
7. Check store and comms: store page, price, release time, patch notes and known issues list approved by store-page-marketer and community-manager.
8. Write the rollback plan per platform: what can be rolled back, how, who does it, and what cannot be undone (saves, server data, console patches).
9. Confirm the hotfix branch exists from the release tag and on-call people are named for the first 48 hours.
10. Make the call: go, conditional go (list conditions), or no-go (list what must change), and record who decided.

## Output

```
Release: <version>  Platforms: <list>  Target: <date time TZ>
Decision: GO | CONDITIONAL GO | NO-GO   Decided by: <name>  Date: <date>

| Gate | Steam | <Console> | Notes |
|---|---|---|---|
| Build ID / commit | | | |
| Tested build = shipping build | | | |
| Open blockers | | | |
| Crash rate vs previous | | | |
| Old saves load | | | |
| Previous build reads new saves | | | |
| Platform gate (branch / cert) | | | |
| Store and patch notes approved | | | |
| Rollback plan written | | | |
| Hotfix branch and on-call | | | |

Cannot be rolled back: <list>
Conditions or blockers: <list>
Open risks: <list>
```

## Done when

- [ ] Every gate has a pass, fail, or waived entry per platform.
- [ ] Build IDs and commit hashes are recorded and match QA sign-off.
- [ ] The rollback plan names what cannot be undone.
- [ ] Any unconfirmed platform timing is marked UNVERIFIED.
- [ ] The decision and decision owner are recorded.
