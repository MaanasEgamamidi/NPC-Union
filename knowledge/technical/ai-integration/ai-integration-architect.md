---
owner: ai-integration-architect
topic: AI feature placement, store disclosure, provider facts
---

# AI integration architect knowledge

Facts that can go stale. Re-check before relying on them. Provider model names, prices, rate limits, and context sizes are deliberately not stored here: look them up live from each provider's documentation every time.

## Store and platform rules

### Steam content survey: AI disclosure
- Source: https://partner.steamgames.com/doc/gettingstarted/contentsurvey
- last_verified: 2026-11-05
- What it says: the survey covers AI used in content that ships with the game, not AI used only as a development efficiency tool. Two categories:
  - Pre-Generated: content created with AI tools during development. Reviewed like other content, including legality and consistency with marketing.
  - Live-Generated: content created with AI tools while the game runs. Same rules, plus the developer must describe the guardrails that stop the AI producing illegal content.
- Check current Steamworks documentation for player reporting and disclosure requirements before submission.

### Valve announcement on AI content on Steam (January 2024)
- Consult the Steamworks news feed for the announcement and compare it with current disclosure requirements before relying on it.

### Console and mobile platform rules on generated content
- For Nintendo, Sony, Microsoft, Apple App Store and Google Play, check each platform's current developer documentation and applicable portal before submission.

## Provider facts

- Model identifiers, pricing, regions, rate limits: fetch each provider's live docs at decision time and record the date in the feature plan, not here.
- Status: intentionally not stored.

## Needs local verification

- Console platform rules on runtime generated content.
