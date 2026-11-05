---
title: QA tester version and policy notes
tags: [qa, testing, certification, locale, save-load]
sources: [https://partner.steamgames.com/doc/home, https://cldr.unicode.org/, https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo.invariantculture]
last_verified: 2026-11-05
---

# QA tester notes

Facts here change with platform versions or policies. Check each against the source before relying on it.

- Console certification (Xbox Requirements, Sony TRC, Nintendo lotcheck) includes rules on controller disconnect, suspend/resume and save data handling. Exact wording and numbering are under NDA. UNVERIFIED.
- Steam Deck Verified criteria include default controller support and a controller-accessible way to enter text. Check the current [compatibility checklist](https://partner.steamgames.com/doc/steamhardware/compat).
- Unity exposes `OnApplicationFocus` and `OnApplicationPause` for focus and suspend handling; behavior differs per platform and version. UNVERIFIED for the project's engine version.
- .NET `ToUpper()` and `ToLower()` without a culture use the current culture, so tr-TR maps "i" to "İ". Use invariant culture or ordinal comparison for identifiers. Behavior confirmed in .NET docs as of training; recheck: UNVERIFIED.
- Number parsing with the current culture reads "1,5" as 1.5 in de-DE and fails or misreads in en-US. UNVERIFIED for each engine's default.
- German and Finnish text expansion of 30 to 40 percent over English is an industry rule of thumb, not a standard. UNVERIFIED.
