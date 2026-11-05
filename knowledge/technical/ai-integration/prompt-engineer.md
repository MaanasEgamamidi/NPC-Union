---
owner: prompt-engineer
topic: Prompt structure, caching, structured outputs, injection, and evals for game LLM features
---

# Prompt engineering knowledge

Facts here go stale. Re-fetch the source before quoting a number, and update the date.

## Claude prompt caching

Source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching (redirected from https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
last_verified: 2026-11-05

- Cache prefix order is tools, then system, then messages. The cache covers everything up to and including the block marked with `cache_control`.
- Up to 4 explicit `cache_control` breakpoints per request. Automatic caching uses one of these slots.
- Default TTL is 5 minutes, refreshed at no extra cost on each use. A 1-hour TTL is set with `"cache_control": {"type": "ephemeral", "ttl": "1h"}`.
- Minimum cacheable prompt length varies by model, from 512 to 4,096 tokens at the time of checking. Prompts below the minimum are processed without caching and no error is returned. Check the table on the page for the pinned model.
- Price multipliers relative to base input price: 5-minute cache write 1.25x, 1-hour cache write 2x, cache read 0.1x for most models, with lower read multipliers listed for some newer models. Check the page for the pinned model before computing cost.

## OpenAI structured outputs

Source: https://developers.openai.com/api/docs/guides/structured-outputs (redirected from https://platform.openai.com/docs/guides/structured-outputs)
last_verified: 2026-11-05

- Strict mode is enabled with `"strict": true` in the `json_schema` response format.
- Examples set `additionalProperties: false` on every object and list every property in `required`.
- Fields that may be empty stay in `required` and allow `null` in the type, for example `"type": ["string", "null"]`.
- The page has a supported-schemas section with nesting and property-count limits. UNVERIFIED: those limits were not read in this check. Fetch the section before relying on a specific number.

## Prompt injection

- OWASP Top 10 for Large Language Model Applications, LLM01 Prompt Injection: https://genai.owasp.org/llmrisk/llm01-prompt-injection/ UNVERIFIED (not fetched in this session).
- Anthropic guidance on mitigating jailbreaks and prompt injections: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks UNVERIFIED (not fetched in this session; path may have moved).

## Evals

- Anthropic guide to defining success criteria and building evaluations: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests UNVERIFIED (not fetched in this session; path may have moved).
- OpenAI evals guide: https://developers.openai.com/api/docs/guides/evals UNVERIFIED (not fetched in this session).

## House practice (not externally sourced)

- Prompts live in `prompts/<feature>/vN.md` with the pinned model ID in the header. Eval cases live in `evals/<feature>/cases.jsonl`. Results per version live in `evals/<feature>/results/`.
- Case-count guidance (30 to 60 per feature) and judge calibration size (10 to 20 hand labels) are working heuristics, not sourced figures.
