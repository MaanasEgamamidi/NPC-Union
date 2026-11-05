---
name: medical-content-safety-review
description: Review a game's medical content for accuracy, harm and regulatory-claim risk. Outputs a findings table and required disclaimers.
owner: healthcare-expert
disable-model-invocation: true
argument-hint: "<game pitch, script, store copy, or folder of medical text>"
---

# Medical content safety review

A repeatable pass over everything medical a player will see or read. It finds inaccurate facts, harmful depictions and claims that could make the game look like a medical device.

## Inputs

- The content: script, item descriptions, tooltips, store page, trailer script, marketing copy.
- Realism stance: comic, stylised or procedural. If missing, ask once; otherwise assume stylised and say so.
- Audience and age rating target, and the sale regions.
- Whether any real patient data, real drug names or real device names appear.

## Steps

1. Inventory: list every medical statement, depiction and claim with its location (file, line, screen).
2. Classify each item: Fact (presented as real), Fiction (clearly invented), Claim (benefit to the player's health), Sensitive (self-harm, suicide, overdose, eating disorders, child harm, death).
3. Fact check: verify each Fact item against a primary source (WHO, CDC, FDA label, current clinical guideline). Record the URL. If you cannot check it, mark UNVERIFIED.
4. Fiction check: make sure invented conditions or cures cannot be mistaken for real ones (no real disease name with a fake cure, no real drug with a fake effect).
5. Claim check: flag any wording that says the game treats, cures, diagnoses, prevents or mitigates a condition, or improves a named condition. These can trigger device regulation (FDA, EU MDR); EndeavorRx needed De Novo authorization. Rewrite to non-medical wording or escalate.
6. Sensitive check: for self-harm and suicide, no method detail, no glorification, include help signposting; for eating disorders, no calorie or weight targets that reward restriction; for death, give players an opt-out or warning where it is graphic.
7. Data check: confirm no real patient records (HIPAA, GDPR). Synthetic data (Synthea) is acceptable; credentialed research data (MIMIC) is not shippable.
8. Terminology licence check: ICD-11 (code, title and URI together, CC BY-ND 3.0 IGO), SNOMED CT (member country or affiliate licence), drug names via RxNorm or openFDA.
9. Score each finding: severity High (harm or regulatory), Medium (trust-breaking inaccuracy), Low (nitpick), and give a fix.
10. Write the required disclaimers and route High items to `game-legal-advisor`.

## Output

```
# Medical content review: <game> (<date>)
Stance: <comic|stylised|procedural>   Audience: <rating, regions>

| # | Location | Item (quoted) | Type | Issue | Source checked | Severity | Fix |
|---|----------|---------------|------|-------|----------------|----------|-----|

Required disclaimers
- In-game (first launch / settings): "This game is fiction and is not medical advice. If you need help, contact a health professional."
- Content warning (if Sensitive items): <topics>, plus help-line signposting for sale regions
- Store page: <no treatment or diagnosis claims; wording approved by game-legal-advisor>
- Data credits: <WHO / ICD-11 / Synthea / openFDA attributions>

Escalations to game-legal-advisor: <High items>
UNVERIFIED: <items and why>
```

## Done when

- [ ] Every medical item has a row with location and type.
- [ ] Every Fact row has a source URL or is marked UNVERIFIED.
- [ ] No Claim wording remains that implies treatment, cure or diagnosis, or it is escalated.
- [ ] Sensitive items have depiction rules and signposting.
- [ ] No real patient data ships.
- [ ] Disclaimers and data credits are written out in full.
