---
title: Design briefs, pillars, scope cuts and decision records
tags: [design, brief, pillars, moscow, scope, adr, decision-log]
sources: ["https://www.agilebusiness.org/?p=1907", "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html", "https://adr.github.io/", "https://www.gamedeveloper.com/design/video-one-page-designs", "https://gdcvault.com/play/1024176/Finding-Duskers-Innovation-Through-Better"]
last_verified: 2026-11-05
---

# Design briefs, pillars, scope cuts and decision records

## One-page designs
- Stone Librande, "One-Page Designs", GDC 2010 (then at EA/Maxis). Premise: most people do not read long design docs; a single annotated page with diagrams and white space gets read and forces the designer to cut to what matters. Examples covered include Spore and a Simpsons game. Summary: https://www.gamedeveloper.com/design/video-one-page-designs

## Brief fields (NPC Union house format)
| Field | Rule |
|---|---|
| Pitch | One sentence, under 25 words, verb + setting + twist |
| Pillars | 3 to 5, each with "therefore we will not ..." |
| Core loop | 2 to 4 steps |
| Goal and fail state | Testable; traces to acceptance criteria |
| MVP | 7 items or fewer |
| Out of scope | Named items, never empty |
| Build order | Riskiest unproven item first |
| Reference game | Real shipped game plus the slice kept |

## Pillars
- Tim Keenan (Misfits Attic), "Finding 'Duskers': Innovation Through Better Design Pillars", GDC 2017 Independent Games Summit. Session description: pillars centred on emotions rather than features, refined through experimentation, focused on player fantasy. https://gdcvault.com/play/1024176/Finding-Duskers-Innovation-Through-Better
- Test: a pillar earns its place only if it has excluded a feature.

## MoSCoW (DSDM, Agile Business Consortium)
- Must: the Minimum Usable SubseT the project guarantees.
- Should: important but not vital. Could: wanted, less important. Won't have this time: agreed not delivered in this timeframe.
- Guidance: Must effort typically no more than 60%; Could pool typically around 20% of effort, acting as contingency. Split by estimated effort, not by item count. https://www.agilebusiness.org/?p=1907

## Decision records
- Michael Nygard, "Documenting Architecture Decisions" (2011): sections Title, Context, Decision, Status, Consequences; status proposed / accepted / deprecated / superseded; reversed decisions are kept and marked superseded; one or two pages long. https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html
- ADR community resources: https://adr.github.io/ (notes ADRs extend to design decisions).
- NPC Union adaptation adds: Pillar served, Rejected options, Owner, Revisit trigger.
