---
title: Cybersecurity as game subject matter
tags: [cybersecurity, hacking-games, mitre-attack, ctf, soc, incident-response, cve, cwe, owasp]
sources:
  - "https://attack.mitre.org/"
  - "https://attack.mitre.org/tactics/enterprise/"
  - "https://attack.mitre.org/resources/versions/"
  - "https://attack.mitre.org/resources/updates/updates-october-2026/"
  - "https://attack.mitre.org/resources/legal-and-branding/terms-of-use/"
  - "https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/README.md"
  - "https://en.wikipedia.org/wiki/Cyber_kill_chain"
  - "https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html"
  - "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
  - "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf"
  - "https://pages.nist.gov/800-63-4/sp800-63b.html"
  - "https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2021-44228"
  - "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
  - "https://raw.githubusercontent.com/cisagov/kev-data/develop/README.md"
  - "https://cwe.mitre.org/about/termsofuse.html"
  - "https://owasp.org/Top10/2025/"
  - "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
  - "https://www.first.org/cvss/v4-0/"
  - "https://raw.githubusercontent.com/SigmaHQ/sigma/master/README.md"
  - "https://picoctf.org/"
  - "https://overthewire.org/wargames/"
  - "https://overthewire.org/rules/"
  - "https://www.rfc-editor.org/rfc/rfc5737"
  - "https://www.rfc-editor.org/rfc/rfc3849"
  - "https://www.rfc-editor.org/rfc/rfc2606"
  - "https://www.law.cornell.edu/uscode/text/18/1030"
  - "https://www.legislation.gov.uk/ukpga/1990/18/contents"
last_verified: 2026-11-05
---

# Cybersecurity as game subject matter

For making hacking, defense, and security-training content believable and safe. Protecting the game itself is out of scope (see `game-security-engineer`, `anti-cheat-engineer`).

## Datasets and APIs

| Name | Publisher | URL | Access | Licence / terms | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|---|
| ATT&CK STIX data | MITRE | https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/README.md | Download from GitHub, no key | ATT&CK Terms of Use: non-exclusive, royalty-free licence for research, development, commercial use; reproduce MITRE's copyright designation and licence | STIX 2.1 JSON collections (enterprise, mobile, ics) | Two releases a year (v17.1 Apr 2025, v18.1 Oct 2025, v19.2 Apr 2026, v20.0 13 Oct 2026) | Tactic names change between versions (TA0005 is "Stealth" in v20; older data says "Defense Evasion"). Pin a versioned file such as enterprise-attack-<ver>.json |
| NVD CVE API 2.0 | NIST | https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2021-44228 | REST; check current authentication requirements | Check NVD terms before use | JSON | Check NVD for current update cadence | Check the [NVD developer guidance](https://nvd.nist.gov/developers/start-here) for current rate limits and key handling; cache locally |
| Known Exploited Vulnerabilities (KEV) | CISA | https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json | Download, no key | Creative Commons 0 1.0 (per cisagov/kev-data README); no use of CISA logo or DHS seal | JSON and CSV (GitHub mirror cisagov/kev-data) | Updated when entries change, typically US weekdays | Catalog 2026.11.04 had 1,768 entries. Only lists exploited CVEs, not all CVEs. The cisa.gov HTML page returned 403 to curl; the JSON feed loaded |
| CWE | MITRE (sponsored by CISA) | https://cwe.mitre.org/about/termsofuse.html | Download / browse | CWE Terms of Use: free for research, development, commercial use; reproduce MITRE copyright | XML/CSV downloads | Periodic | Weakness classes, not specific bugs; good for puzzle themes |
| OWASP Top 10:2025 | OWASP | https://owasp.org/Top10/2025/ | Web | Creative Commons Attribution 3.0 Unported | HTML | Every few years | Awareness list, not a standard. 2025 list: A01 Broken Access Control, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging and Alerting Failures, A10 Mishandling of Exceptional Conditions |
| Sigma rules | SigmaHQ | https://raw.githubusercontent.com/SigmaHQ/sigma/master/README.md | GitHub | Detection Rule License (DRL) 1.1 | YAML | Continuous | Attribution rules apply; use as a shape for in-game alerts, do not bulk-copy |

## Standards and expert sources

- MITRE ATT&CK v20 (https://attack.mitre.org/): Enterprise has 15 tactics, 227 techniques, 479 sub-techniques per the October 2026 release notes. Tactics in order: Reconnaissance, Resource Development, Initial Access, Execution, Persistence, Privilege Escalation, Stealth, Defense Impairment (TA0112), Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact.
- Useful techniques for level design (verified on attack.mitre.org): T1595 Active Scanning, T1598 Phishing for Information, T1566 Phishing, T1190 Exploit Public-Facing Application, T1078 Valid Accounts, T1110 Brute Force, T1003 OS Credential Dumping, T1068 Exploitation for Privilege Escalation, T1021 Remote Services, T1557 Adversary-in-the-Middle, T1071 Application Layer Protocol, T1048 Exfiltration Over Alternative Protocol, T1486 Data Encrypted for Impact.
- Cyber Kill Chain (Lockheed Martin): seven steps; Wikipedia lists Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command and Control, Actions on Objective. Simpler than ATT&CK; good for a campaign map with seven nodes.
- NIST SP 800-61 Rev. 3 (April 2025, supersedes Rev. 2 of 2012): incident response organised around the CSF 2.0 Functions Govern, Identify, Protect, Detect, Respond, Recover. Detect, Respond, Recover are the incident response itself; the rest is preparation.
- NIST SP 800-63B-4: single-factor passwords at least 15 characters, blocklist of compromised values, no forced composition rules, no forced periodic changes.
- OWASP Password Storage Cheat Sheet: hashing is one-way, encryption two-way; use Argon2id (minimum m=19 MiB, t=2, p=1), bcrypt, or PBKDF2.
- FIRST CVSS v4.0: Temporal group renamed Threat; new Attack Requirements metric; nomenclature CVSS-B, CVSS-BT, CVSS-BE, CVSS-BTE; a Supplemental group (including Safety) that does not change the score.
- Training platforms as models: picoCTF (Carnegie Mellon, started 2013, aimed at high schoolers) now redirects to CMU's CyLab Security Academy; logins made before 8 May 2026 carry over. OverTheWire wargames: Bandit (Unix basics) first, then Natas (web), Krypton (crypto), Leviathan (reverse engineering), Narnia and others (binary exploitation).

## Accuracy vs fun

Acceptable simplifications:
- Compressing hours or weeks of recon into a minute, as long as the order of steps is right.
- A single "trace" or "alert" meter standing in for a SOC's many signals (Hacknet uses a countdown instead of multi-hop bouncing).
- Programmable agents with a toy instruction set (Exapunks EXAs, TIS-100 nodes) to teach the thinking without real exploit code.
- Fictional tools with real-sounding categories (scanner, cracker, proxy) instead of named real tools.

Simplifications that break trust with practitioners:
- "Decrypting" a password hash, or instant cracking of any password.
- Typing fast equals hacking; no recon; no consequence in logs.
- Firewalls as walls you shoot; "I'm in" without credentials or a flaw.
- Showing real-looking public IPs or real companies as targets.
- Teaching retired advice (forced complexity, monthly password resets) as correct.

Fun hooks that are also accurate: social engineering via clues in documents; credential reuse; defenders noticing anomalies in logs; patch triage using real KEV fields (`knownRansomwareCampaignUse`, `cwes`, `dueDate`).

## What games get wrong

- Speed and visuals over process: many hacking scenes compress everything into a minigame with no sense of recon, access, and escalation. Watch Dogs (2014) lets the protagonist use a smartphone to control traffic lights, trains, and security systems and to empty bank accounts, with system hacking solved as puzzles (Wikipedia). It is a deliberate power fantasy abstraction of a city-wide "ctOS", not a model of real intrusion.
- Hacknet averts the bounce-through-many-computers trope, using a timer instead (Wikipedia), which is a good example of honest abstraction.
- Hackmud is reviewed as mimicking the "campy hacking" of 1980s and 1990s films (Wikipedia); the campiness is intentional, which is fine when the game does not claim realism.
- General pitfalls (no specific game named): hashes treated as encryption, IP addresses that belong to real networks, defenders shown as passive.

## Reference games

| Game | Year | Developer | Link | What to study |
|---|---|---|---|---|
| Hacknet | 2015 | Team Fractal Alligator (Matt Trobbiani) | https://en.wikipedia.org/wiki/Hacknet | Unix-like terminal plus GUI; scan a node, run programs matching its protections within a RAM budget, gain superuser, then explore the file system |
| Uplink | 2001 | Introversion Software | https://en.wikipedia.org/wiki/Uplink_(video_game) | Contract-based freelance hacking economy; buy gateway hardware and software to take harder targets |
| Exapunks | 2018 | Zachtronics | https://en.wikipedia.org/wiki/Exapunks | Programmable agents with a small opcode set moving through networked hosts; memory limits force multi-agent coordination |
| TIS-100 | 2015 | Zachtronics | https://en.wikipedia.org/wiki/TIS-100 | Mock assembly on parallel nodes; teaches low-level reasoning without any real exploit |
| Watch Dogs | 2014 | Ubisoft Montreal | https://en.wikipedia.org/wiki/Watch_Dogs_(video_game) | Open-world "hack the city" abstraction; player-vs-player invasions where the hacker looks like an NPC |
| Hackmud | 2016 | ComCODE | https://en.wikipedia.org/wiki/Hackmud | Multiplayer text MUD; social engineering and scripting against other players |
| Orwell | 2016 | Osmotic Studios | https://en.wikipedia.org/wiki/Orwell_(video_game) | Surveillance and OSINT: the player picks which data points to pass on, raising ethics of profiling |
| Bitburner | 2021 (Steam) | Fulcrum Games | https://store.steampowered.com/app/1812820/Bitburner/ | Open source incremental game; write real JavaScript to automate hacking loops in a sandbox |
| Else Heart.Break() | 2015 | Erik Svedäng | https://en.wikipedia.org/wiki/Else_Heart.Break() | In-world objects are reprogrammable; hacking as diegetic code editing |

## Sensitive topics and legal

- Never include working exploit code, real credentials, real malware, or step-by-step attacks on real systems. Real CVEs may be named at headline level only.
- Use reserved ranges only: IPv4 192.0.2.0/24 (TEST-NET-1), 198.51.100.0/24 (TEST-NET-2), 203.0.113.0/24 (TEST-NET-3) per RFC 5737; IPv6 2001:DB8::/32 per RFC 3849; domains example.com/.net/.org and TLDs .test, .example, .invalid per RFC 2606.
- Law: in the US, 18 U.S.C. 1030 (Computer Fraud and Abuse Act) covers access "without authorization or exceeding authorized access"; in the UK, the Computer Misuse Act 1990 covers unauthorised access to computer material. Training games must tell players to practise only on systems they own or are authorised to test.
- CTF scoping: an educational CTF needs a clearly scoped, isolated target environment and written rules; OverTheWire's rules forbid publishing credentials and reserve all challenge content.
- Real companies, real breaches, and real threat groups: fictionalise by default. Hand any use of real names, logos (including CISA/DHS marks), or claims that a game certifies skills to `game-legal-advisor`.
- Surveillance and profiling themes (as in Orwell) touch privacy; avoid real people's data.

## How to check this is current

- ATT&CK: open https://attack.mitre.org/resources/versions/ and note the current version; re-read the tactics page for renamed tactics.
- KEV: download the JSON and read `catalogVersion`, `dateReleased`, `count`.
- NVD: call the CVE API for a known ID without a key; read the developer page in a browser for current rate limits (it renders client-side).
- OWASP: check https://owasp.org/Top10/ for a newer edition than 2025.
- NIST: check CSRC pages for SP 800-61 and SP 800-63B revisions.
- picoCTF: the site rebranded in 2026; re-check where challenges live before linking.
