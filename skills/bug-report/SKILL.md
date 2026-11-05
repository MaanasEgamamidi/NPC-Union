---
name: bug-report
description: Turn an observed game bug into a reproducible ticket with build, minimal steps, repro rate, severity suggestion and evidence. Use after testing or for vague player reports.
owner: qa-tester
disable-model-invocation: true
argument-hint: "[what happened, build, platform]"
---

# Bug report

A repeatable procedure for writing one bug ticket a developer can reproduce on the first try.

## Inputs

- What was observed, in the reporter's words.
- Build number or hash, branch, debug or release.
- Platform, OS version, hardware, input device.
- Any evidence already captured: video, screenshot, log, save file.

If the build is missing, ask for it before anything else. If the platform is missing, ask. If there is no evidence, write the ticket anyway and list what to capture next.

## Steps

1. Record the build, platform and hardware at the top. Do not continue without a build identifier.
2. Reproduce once following the reporter's path. Note the result.
3. Find a clean starting state: fresh profile or a named save, from the title screen or a named checkpoint.
4. Cut steps one at a time. Keep a step only if removing it stops the bug.
5. Run the minimal steps at least 5 times. Record the repro rate as "N/M attempts".
6. If the rate is under 100 percent, change one variable per run (timing, input device, focus, locale, disk space, network) and note which one moves the rate.
7. Check the edge-case list that fits: save/load interrupted, alt-tab or focus loss, controller disconnect and reconnect, suspend/resume, OS locale change, system clock change, numeric boundaries.
8. Capture evidence from a single failing run: video with build visible, the log file, the save file, and a timestamp of the failure.
9. Write expected and actual as observable facts. No guesses in "Actual".
10. Suggest severity using the scale below. Leave priority to the qa-lead.
11. Search existing tickets for the same title words and the first failing step. Link a duplicate instead of filing a new one.
12. Put hypotheses in Notes, labeled as hypotheses.

Severity scale: Critical (crash, progress or data loss, cert failure, blocker), Major (feature broken, no workaround), Minor (feature broken, workaround exists), Trivial (cosmetic).

## Output

```
Title: <what breaks> when <trigger>
Build: <version #hash>, <debug|release>
Platform: <OS/console, version, hardware, input device, locale>
Preconditions: <starting state>
Steps:
  1. ...
  2. ...
Expected: <observable result>
Actual: <observable result>
Repro rate: <N/M attempts>; variable that changes it: <or "none found">
Severity suggestion: <Critical|Major|Minor|Trivial> because <reason>
Evidence: <video, log, save, screenshot, with file names>
Related: <ticket IDs or "none found">
Notes: <hypotheses, labeled; what was not tried>
```

## Done when

- [ ] Build identifier and platform are filled in.
- [ ] Steps start from a named, reproducible state.
- [ ] Every step is needed; removing any one stops the bug.
- [ ] Repro rate is written as N/M with at least 5 attempts.
- [ ] Expected and Actual are observable, not guesses.
- [ ] At least one piece of evidence is attached or listed as missing.
- [ ] Duplicate search done and result recorded.
- [ ] One bug per ticket.
