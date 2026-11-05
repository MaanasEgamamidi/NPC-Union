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
- The page as fetched did not describe a player reporting mechanism. Earlier Valve announcements described one; that is UNVERIFIED here.

### Valve announcement on AI content on Steam (January 2024)
- Source: UNVERIFIED (not fetched in this session; find it via the Steamworks news feed and add the link once checked)
- Status: UNVERIFIED

### Console and mobile platform rules on generated content
- Nintendo, Sony, Microsoft, Apple App Store, Google Play: rules sit behind developer portals or change often.
- Status: UNVERIFIED. Check each platform's current developer documentation before submission.

## Provider facts

- Model identifiers, pricing, regions, rate limits: fetch each provider's live docs at decision time and record the date in the feature plan, not here.
- Status: intentionally not stored.

## Needs local verification

- Valve January 2024 AI content announcement link.
- Console platform rules on runtime generated content.
