---
name: lore-canon-audit
description: Sweep scripts, codex or item text against the canon table and output a tiered conflict report plus retcon log lines. Run before a content lock or after a batch of new writing.
owner: lore-keeper
disable-model-invocation: true
argument-hint: "[path to text under review] [path to canon table]"
---

# Lore canon audit

A repeatable sweep that finds contradictions between new or changed text and established canon, then records the fixes.

## Inputs

- The text under review: script files, codex entries, item descriptions, loading tips, UI strings. String IDs if they exist.
- The canon table (CSV or Markdown) with ID, subject, claim, value, source, tier, status, spoiler gate. If there is none, build a minimal one from the bible in step 2.
- The tier order. If missing, ask once: "Which wins, shipped text or the bible?" Default if no answer: shipped text, then approved bible, then dev notes, then marketing.
- The current story point (act, chapter, DLC) for spoiler checks.

## Steps

1. List every proper noun in the text under review (capitalized words not at sentence start, plus terms in the glossary). Grep for each spelling variant across the whole text set, not just the new batch.
2. Extract checkable claims: numbers, dates and "X years ago" phrases, ages, family and political relations, locations and travel times, deaths, and titles. Give each a temporary ID.
3. Convert every relative date to an absolute year on the project epoch. Recompute ages from birth year. Flag any claim you cannot convert.
4. Match each claim to a canon entry. Mark it as agrees, conflicts, new (no entry), or ambiguous.
5. For each conflict, record both quotes, both sources, and both tiers. The higher tier wins unless narrative-director rules otherwise.
6. Check spoiler gates: any claim matching an entry gated to a later story point than this text's position is a leak.
7. Check names against the naming rules for their culture and against similar existing names (same first three letters and same length is a warning).
8. Propose the smallest fix for each conflict: one-word edit, date change in the lower tier, or a reliability tag on an in-world author. Name the owner agent.
9. Write retcon log lines for every fix that changes an approved or shipped value, with affected string IDs.
10. Add new claims as proposed entries in the canon table.

## Output

```
# Canon audit: <batch name>, <date>
Tier order used: <list>
Story point: <act/chapter>

## Conflicts
| # | Claim | Text quote + source | Canon quote + source | Tiers | Proposed fix | Owner |

## Spoiler leaks
| # | String ID | Entry ID | Gate | Found at |

## Naming issues
| # | Name | Rule or near-collision | Suggestion |

## New entries (proposed)
| ID | Subject | Claim | Value | Source | Tier | Spoiler gate |

## Retcon log
date | entry ID | old | new | reason | approved by | affected strings
```

## Done when

- [ ] Every proper noun in the batch was searched across the full text set.
- [ ] Every relative date was converted to an absolute year or flagged.
- [ ] Every conflict lists both sources, both tiers, a fix, and an owner.
- [ ] Spoiler gates were checked against the batch's story point.
- [ ] Every value change has a retcon log line with affected string IDs.
- [ ] New claims are in the canon table as proposed, not approved.
