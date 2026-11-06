---
title: Analytics engineer reference notes
tags: [telemetry, retention, ab-testing, privacy, consent]
sources: ["https://eur-lex.europa.eu/eli/reg/2016/679/oj", "https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa", "https://developer.apple.com/documentation/apptrackingtransparency"]
last_verified: 2026-11-05
---

# Analytics engineer reference notes

Version and policy-sensitive facts. Check each against the live source before relying on it.

- For game analytics, map the identifiers and processing to the GDPR and ask qualified counsel to assess the applicable obligations, including whether identifiers are personal data.
- Ask qualified counsel to check device-access and consent requirements under the applicable national ePrivacy implementation, alongside the GDPR legal basis.
- COPPA covers operators of child-directed online services that collect personal information and operators with actual knowledge that they collect personal information from children under 13. The FTC amended the rule in 2025; see the [FTC guidance](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions) and [amendment announcement](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-changes-childrens-privacy-rule-limiting-companies-ability-monetize-kids-data).
- Apple requires App Tracking Transparency permission for tracking as defined in its policy, including linking data across companies for targeted advertising or measurement, or sharing it with data brokers. Analytics using IDFV across the same provider's apps does not itself require ATT. [Apple](https://developer.apple.com/app-store/user-privacy-and-data-use/).
- Google Play's [Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469) requires declarations to reflect relevant data collection and sharing by third-party SDKs. Check the current form and applicable exceptions.
- Check event name, property and event-volume limits in the vendor documentation for the SDK version being shipped.
