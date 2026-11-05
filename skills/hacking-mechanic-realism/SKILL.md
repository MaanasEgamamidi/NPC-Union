---
name: hacking-mechanic-realism
description: Maps a game hacking mechanic to real MITRE ATT&CK steps, picks an abstraction level, runs a safety scrub, and writes fiction-vs-real notes.
owner: cybersecurity-expert
disable-model-invocation: true
argument-hint: "[hacking mechanic or level description]"
---

# Hacking mechanic realism

Turns a hacking mechanic into a step table grounded in ATT&CK, safe to ship.

## Inputs

- The mechanic or level (what the player does, what they see).
- Player role: attacker, defender, or both. If missing, assume attacker.
- Audience: entertainment, students, or corporate training. If missing, assume entertainment.
- Realism dial: stylized, grounded, or training-accurate. If missing, assume grounded and say so.

## Steps

1. Check the current ATT&CK version on https://attack.mitre.org/resources/versions/ and the tactic names on https://attack.mitre.org/tactics/enterprise/ (TA0005 is "Stealth" in recent versions, not "Defense Evasion").
2. Break the mechanic into player actions. For each action, find the closest tactic and technique ID on the live technique page. If none fits, mark it "fiction only".
3. Pick an abstraction per step: symbolic (button or timer), procedural (choose the right tool for the observed state), or literal (type commands in a sandboxed fake shell). Prefer procedural for learning.
4. Add the defender view: what log line or alert each step would produce, written in a Sigma-like shape (log source, selection, condition).
5. Safety scrub every on-screen string:
   - IPv4 only from 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24 (RFC 5737); IPv6 only 2001:db8::/32 (RFC 3849).
   - Domains only example.com/.net/.org or .test, .example, .invalid (RFC 2606).
   - No working exploit code, no real credentials, no real company or person as a target.
   - Commands must not work against real systems outside the sandbox.
6. If any real vulnerability is referenced, look it up in CISA KEV or NVD and describe it at headline level only (name, product class, CWE), never steps.
7. Write fiction-vs-real notes: each deliberate liberty and why it is kept.
8. Flag anything needing `game-legal-advisor` (real brands, real breaches, training claims).

## Output

```
## Mechanic: <name>
Role / audience / realism dial: <...> (defaults stated)
ATT&CK version checked: <vXX, date>
| # | Player action | Tactic (ID) | Technique (ID) | Abstraction | Defender log/alert |
Safety scrub:
- Reserved IPs only: pass/fail
- Reserved domains only: pass/fail
- No live exploit or credentials: pass/fail
- Fictional targets only: pass/fail
Fiction vs real:
- <liberty>: <why it stays>
Handoffs: <agent>: <what they need>
```

## Done when

- [ ] Every player action has a tactic and technique ID or is marked "fiction only".
- [ ] ATT&CK version and date are recorded.
- [ ] Every step has a defender view.
- [ ] All four safety scrub items pass.
- [ ] Fiction-vs-real notes exist for every liberty.
- [ ] Legal handoff flagged if real names appear.
