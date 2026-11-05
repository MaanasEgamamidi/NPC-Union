---
name: decision-log
description: Records a design decision as a short ADR-style entry, or supersedes or reopens one. Use after any call that settles a design argument.
owner: brief-keeper
disable-model-invocation: true
argument-hint: "[decision in one line, or 'reopen D-###']"
---

# Decision log

Keeps `design/decisions.md` as numbered, append-only records in the shape Michael Nygard proposed for architecture decisions, adapted to game design.

## Inputs

- The decision in one sentence, the options considered, and who decided.
- If the context or the rejected options are missing, ask: "What else was on the table, and why not that?"
- For a reopen: the record number and what changed.

## Steps

1. Read `design/decisions.md`; create it with a header if missing. Find the next number (D-001, D-002...).
2. Search the log for earlier records on the same topic. If one exists, this record supersedes it: set the old record's status to `SUPERSEDED by D-###`. Never delete it.
3. Write Context neutrally: the forces (time, team, platform, pillar, playtest data).
4. Write Decision in active voice: "We will ...".
5. List rejected options with one reason each.
6. Write Consequences: what gets easier, what gets harder, which agents or tasks it affects.
7. Name the pillar it serves. If it serves none, flag it.
8. Set Status (`PROPOSED`, `ACCEPTED`, `SUPERSEDED`, `REOPENED`), Owner, Date (YYYY-MM-DD), and a revisit trigger (a metric or milestone).
9. Read the decision back in one sentence to the user.

## Output

```markdown
### D-<###>: <short noun phrase>
- **Status:** ACCEPTED | PROPOSED | SUPERSEDED by D-### | REOPENED
- **Date / Owner:** <YYYY-MM-DD> / <role>
- **Pillar:** <pillar served>
- **Context:** <forces, neutral>
- **Decision:** We will <...>.
- **Rejected:** <option>: <reason>; <option>: <reason>
- **Consequences:** <+ easier>, <- harder>, affects <agents/tasks>
- **Revisit if:** <metric or milestone>
```

## Done when

- [ ] Record is numbered and dated, with an owner.
- [ ] At least one rejected option is listed with a reason.
- [ ] Any earlier record on the topic is marked superseded, not removed.
- [ ] A revisit trigger is set.
