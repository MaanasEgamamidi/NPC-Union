---
title: Controls, input accessibility and movement feel
tags: [controls, input, remapping, accessibility, coyote-time, jump-buffer, dead-zone, touch, gamepad]
sources: [https://maddymakesgames.com/articles/celeste_and_forgiveness/index.html, https://gameaccessibilityguidelines.com/allow-controls-to-be-remapped-reconfigured/, https://gameaccessibilityguidelines.com/avoid-provide-alternatives-to-requiring-buttons-to-be-held-down/, https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/107, https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API, https://developer.android.com/guide/topics/ui/accessibility/apps]
last_verified: 2026-11-05
---

# Controls, input accessibility and movement feel

## Celeste forgiveness techniques (Maddy Thorson)
Source: https://maddymakesgames.com/articles/celeste_and_forgiveness/index.html
| Technique | Number given |
|---|---|
| Coyote time | none ("a short time after leaving a ledge") |
| Jump buffering | none ("a short time before landing") |
| Halved gravity at peak of held jump | half gravity |
| Jump / dash corner correction | none |
| Semi-solid popping | none |
| Lift momentum storage | "a few frames" |
| Wall jump window | 2 pixels from wall |
| Super wall jump window | "I think it's 5 pixels" (author unsure) |
| Stamina refunds | grace window, no duration |
Community frame counts (e.g. 5 frames) are not from the developer: UNVERIFIED.

## Accessibility guidelines
- GAG "Allow controls to be remapped / reconfigured": Basic, motor. Platform remapping is a backup only. https://gameaccessibilityguidelines.com/allow-controls-to-be-remapped-reconfigured/
- GAG "Avoid / provide alternatives to requiring buttons to be held down": Intermediate, motor. Toggle or automatic options as a setting; L3/R3 called out as hard to hold. https://gameaccessibilityguidelines.com/avoid-provide-alternatives-to-requiring-buttons-to-be-held-down/
- Xbox Accessibility Guideline 107 (Input): remap all in-game controls independent of platform remapping; toggle for long holds. https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/107 (from search summary; read the page for exact wording)

## Web Gamepad API (MDN)
- Poll `navigator.getGamepads()` each frame. `gamepadconnected` fires on connect, or on first input if already connected at load.
- `mapping === "standard"` only when the browser maps to the standard layout.
- Axes -1.0 to 1.0; `GamepadButton.pressed` boolean, `value` 0.0 to 1.0.
https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

## Touch targets
- Android: at least 48dp x 48dp. https://developer.android.com/guide/topics/ui/accessibility/apps
- Apple HIG 44 x 44 pt: widely cited by secondary sources; primary page not checked here. UNVERIFIED.

## Dead zone maths
- Axial: zero each axis below threshold; causes snapping to cardinals.
- Radial: `m = |v|; if m < inner: 0 else v/m * min(1, (m - inner)/(outer - inner))`. Keeps direction, rescales magnitude to 0..1.
