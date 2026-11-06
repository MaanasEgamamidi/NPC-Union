---
name: usage-check
description: Reads Claude and Codex usage from local logs, adds the /usage bars, and reports green, yellow or red with the next move. Use before heavy plans and on a timer.
owner: budget-keeper
disable-model-invocation: true
argument-hint: "[hours to look back, default 5]"
---

# Usage check

A numbers-first snapshot of where both quotas stand. The script costs no model tokens, so run it freely.

## Inputs

- Hours to look back (default 5, which matches the Claude and Codex short windows).
- The Claude plan bars from `/usage`. The logs do not contain them. If the user has not pasted them, ask once: "Run `/usage` and paste the plan bars, or say skip."
- In the Claude desktop app a session usage tool may exist. Use it if it is listed, and do not depend on it.

## Steps

1. Run `node ${CLAUDE_PLUGIN_ROOT}/scripts/usage-check.mjs --hours <n>` (add `--json` if you need the numbers exactly).
2. If it prints "No Codex rate-limit data found", say Codex usage is unknown. Do not guess.
3. If a Codex window says "already reset", treat its percentage as stale and report the reset time instead.
4. Grade each quota with these thresholds. They are the budget keeper's policy, not vendor numbers: green under 60% used, yellow 60 to 84%, red 85% or more, and red if a limit was reached.
5. Compare the window used against the time left. 70% used with 20 minutes left is fine. 70% used with 4 hours left is not.
6. Read the Claude cache hit figure. Under about 80% on a long session points to cache misses (model or effort switches, idle gaps, tool-set changes). Name the likely cause only if `/usage` states it.
7. Name the largest consumer. Claude: the model with the most cache-read and output tokens, and the subagent share. Codex: whether the burn matches image generation or fast mode.
8. Pick at most three moves, each tied to a number. Pull candidates from `${CLAUDE_PLUGIN_ROOT}/knowledge/leadership/claude-usage-and-savings.md` and `${CLAUDE_PLUGIN_ROOT}/knowledge/leadership/codex-usage-and-savings.md`.
9. If either quota is red, say which runtime can take the work instead, and give the `run-agent.mjs --runtime` command.
10. For a periodic watch, suggest a session loop only at 30 minutes or longer, and say each fire re-sends the whole context. Better: tell the user to run the script in a terminal, which costs nothing.

## Output

```
## Budget snapshot (<local time>)
| Quota | Used | Resets | Grade |
|-------|------|--------|-------|
| Claude 5-hour | <from /usage, or "not provided"> | | |
| Claude weekly | <from /usage, or "not provided"> | | |
| Codex 5-hour | <n>% | <time> | |
| Codex weekly | <n>% | <time> | |

Claude local: <requests>, cache hit <n>%, subagent requests <n>
Biggest consumer: <what>
Moves (max 3): 1. <move> - saves <what>, quality risk <none/low/check>
Unknown: <what the logs could not show>
```

## Done when

- [ ] The script ran, or its failure is quoted.
- [ ] Every number is from the script or the user's `/usage`, and each is labelled with its source.
- [ ] Stale and unknown values are marked, not filled in.
- [ ] Each move names its quality risk.
