---
title: QA tester version and policy notes
tags: [qa, testing, certification, locale, save-load]
sources: ["https://partner.steamgames.com/doc/home", "https://cldr.unicode.org/", "https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture"]
last_verified: 2026-11-05
---

# QA tester notes

Facts here change with platform versions or policies. Check each against the source before relying on it.

- For console certification, check the current platform requirements for controller disconnect, suspend/resume and save data handling in the developer portal.
- Steam Deck Verified criteria include default controller support and a controller-accessible way to enter text. Check the current [compatibility checklist](https://partner.steamgames.com/doc/steamhardware/compat).
- For focus and suspend tests, check the documentation for `OnApplicationFocus` and `OnApplicationPause` in the project's Unity version and test each target platform.
- .NET `ToUpper()` and `ToLower()` without a culture use the current culture, so tr-TR maps "i" to "İ". Use invariant culture or ordinal comparison for identifiers. [Microsoft documents current-culture casing and ordinal comparisons](https://learn.microsoft.com/en-us/dotnet/api/system.string.toupper).
- Test number parsing with representative decimal separators under each target locale and verify the engine's configured culture.
- Measure localized text expansion using representative German, Finnish and other target-language strings in the actual UI.
