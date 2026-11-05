---
name: menu-focus-audit
description: Map and test focus and navigation through game menus, modals and device switches. Use for missing selection and inaccessible controls.
owner: ui-programmer
disable-model-invocation: true
argument-hint: "[screen or menu flow]"
---

# Menu focus audit

## Inputs

Screen hierarchy, controls and states, engine/version, supported input devices, viewport and text-scale range. Ask once for missing critical context; use a proposed flow and label untested behavior if no build is available.

## Steps

1. Inventory each focusable control with a stable ID, visibility and enabled conditions. Note initial focus and screen entry/exit.
2. Draw directional and sequential navigation paths for each supported layout. Verify every enabled control is reachable and there is a way back.
3. For each modal define focus capture, default control, cancel behavior, saved invoker and fallback if the invoker disappears. Ensure a closing input is consumed only once.
4. Specify pointer, keyboard and controller ownership transitions, visible focus, scrolling into view and reconnection behavior.
5. Test at smallest and largest viewports, safe-area limits, increased text scale and long localized strings; include empty and changing lists.
6. Record actual versus expected results, classify blocked paths, fix the cause and retest. Consult official docs for any version-dependent API and platform requirement.

## Output

```markdown
## Focus audit: <screen>
Inputs and layouts: ...
| State | Entry focus | Navigation | Exit / restore | Fallback |
|---|---|---|---|---|
| Test and device | Expected | Actual / not run | Issue |
|---|---|---|---|
Fixes, source checks and outstanding decisions: ...
```

## Done when

- [ ] All enabled controls have a reachable route and visible focus, or failures are recorded.
- [ ] Modal close and missing-invoker fallback are specified.
- [ ] Device changes and layout extremes are tested or marked not run.
