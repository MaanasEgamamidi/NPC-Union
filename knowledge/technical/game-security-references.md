# Game security references

Owner: game-security-engineer
last_verified: 2026-11-05

Verification method: each link marked "verified" returned HTTP 200 on 2026-11-05. Content was not re-read in full; check the live page before quoting a ranking, version, or API field. Links marked UNVERIFIED were not checked.

## Web, API, and mobile

- OWASP Top 10: https://owasp.org/www-project-top-ten/ (verified, last_verified: 2026-11-05). Baseline web application risk list. Use for backend and web store reviews.
- OWASP API Security Project: https://owasp.org/www-project-api-security/ (verified, last_verified: 2026-11-05). API-specific risks, including broken object-level authorization. Use for game service endpoints.
- OWASP Mobile Top 10: https://owasp.org/www-project-mobile-top-10/ (verified, last_verified: 2026-11-05). Mobile client risks, including insecure storage and hardcoded secrets.
- OWASP Secrets Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html (verified, last_verified: 2026-11-05). Storage, rotation, and CI handling of secrets.
- OWASP Threat Modeling Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html (UNVERIFIED). Process reference for the `game-threat-model` skill.

## AI agents and MCP tools

- OWASP Top 10 for LLM Applications: https://genai.owasp.org/llm-top-10/ (verified, last_verified: 2026-11-05). Prompt injection, excessive agency, and related risks for AI features and agent tools.
- Model Context Protocol security best practices (spec version 2025-06-18): https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices (verified, last_verified: 2026-11-05). Check whether a newer spec version exists before citing.

## In-app purchases and receipts

- Apple App Store Server API: https://developer.apple.com/documentation/appstoreserverapi (verified, last_verified: 2026-11-05). Server-side transaction lookup and history for receipt validation.
- Google Play billing security: https://developer.android.com/google/play/billing/security (verified, last_verified: 2026-11-05). Guidance on verifying purchases on a backend.
- Google Play Developer API, purchases.products.get: https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.products/get (verified, last_verified: 2026-11-05). Server-side purchase state lookup for one-time products.

## Serialization and save files

- Microsoft BinaryFormatter security guide: https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-security-guide (verified, last_verified: 2026-11-05). Why BinaryFormatter is unsafe for untrusted data such as save files, replays, and mods.

## How to re-verify

1. Open each link and confirm it loads and still covers the topic described.
2. Update `last_verified` on the line and at the top of this file.
3. Mark any dead or moved link UNVERIFIED until a replacement is found. Do not guess a new URL.
