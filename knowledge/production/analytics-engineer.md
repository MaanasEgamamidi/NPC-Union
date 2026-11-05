---
title: Analytics engineer reference notes
tags: [telemetry, retention, ab-testing, privacy, consent]
sources: [https://eur-lex.europa.eu/eli/reg/2016/679/oj, https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa, https://developer.apple.com/documentation/apptrackingtransparency]
last_verified: UNVERIFIED
---

# Analytics engineer reference notes

Version and policy-sensitive facts. Check each against the live source before relying on it.

- GDPR (Regulation (EU) 2016/679) applies to processing personal data of people in the EU. Pseudonymous IDs are still personal data. UNVERIFIED for any specific guidance on game analytics.
- The ePrivacy rules on storing or reading data on a device are why analytics often needs opt-in consent in the EU, separate from GDPR legal basis. UNVERIFIED as to current national implementations.
- COPPA covers online services directed to children under 13 in the US, or with actual knowledge of collecting from them. The FTC amended the rule in 2025. UNVERIFIED as to effective dates and details.
- Apple App Tracking Transparency requires permission before tracking users across apps and websites owned by other companies. First-party analytics alone is treated differently. UNVERIFIED for current policy wording.
- Google Play requires a Data safety form declaring data collected and shared, including analytics SDK data. UNVERIFIED for current form fields.
- Vendor SDK limits (event name length, properties per event, daily event caps) vary by SDK and version. UNVERIFIED; read the vendor docs for the version you ship.
