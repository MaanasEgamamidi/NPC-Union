---
title: Game UI art production (9-slice, states, icons, font atlases, scaling)
tags: [ui, hud, 9-slice, icons, fonts, sdf, scaling, accessibility]
sources:
  - https://docs.godotengine.org/en/stable/classes/class_ninepatchrect.html
  - https://docs.godotengine.org/en/stable/classes/class_styleboxtexture.html
  - https://docs.godotengine.org/en/stable/tutorials/ui/gui_using_fonts.html
  - https://docs.unity3d.com/Manual/9SliceSprites.html
  - https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
  - https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
  - https://learn.microsoft.com/en-us/gaming/accessibility/guidelines
  - https://gameaccessibilityguidelines.com/
last_verified: 2026-11-05
---

# Game UI art production

Working notes for game-ui-artist. The links above were not fetched in the session that wrote this file; every claim tied to an engine or platform below is marked UNVERIFIED until someone checks it against the linked page.

## 9-slice panels

- A 9-slice splits a texture into 4 fixed corners, 4 edges that scale on one axis, and a center that scales on both.
- Godot: `NinePatchRect` has `patch_margin_left/top/right/bottom` and horizontal and vertical axis stretch modes (stretch, tile, tile fit). `StyleBoxTexture` has texture margins plus separate content margins. UNVERIFIED for the current stable version's exact property names.
- Unity: sprite borders are set in the Sprite Editor; a UI Image set to Sliced or Tiled uses them. UNVERIFIED for the current manual page location (the Unity manual has been reorganised; the 9SliceSprites URL may redirect).
- Unreal: Slate brushes support Box and Border draw modes with margins. UNVERIFIED whether margins are given as UV fractions in the current version.
- Rule of thumb: slice border = thickest corner detail + 1-2 px of plain edge. Patterned edges tile; plain edges stretch.

## Atlas and filtering

- Bilinear filtering samples neighbouring texels, so packed UI sprites bleed at seams without padding. Use 2 px or more padding and extrude edges.
- Pixel art: point (nearest) filtering, no mipmaps, integer scaling.

## Integer scaling table for a 640x360 base

| Output | Scale |
|--------|-------|
| 1280x720 | 2x |
| 1920x1080 | 3x |
| 2560x1440 | 4x |
| 3840x2160 | 6x |

Other resolutions (for example 1280x800, 1366x768) need bars or extra canvas.

## State variants

- Minimum set: normal, hover, focused/selected, pressed, disabled.
- Unity's Selectable transitions use Normal, Highlighted, Pressed, Selected and Disabled states. UNVERIFIED against the current uGUI manual.
- Godot buttons use theme styleboxes for normal, hover, pressed, disabled and focus, with focus drawn on top. UNVERIFIED for 4.x additions such as hover-pressed.

## Fonts

- SDF atlases render one glyph texture at many sizes; outline and shadow thickness are limited by atlas padding.
- Godot 4 supports multichannel SDF (MSDF) font rendering. UNVERIFIED for the import option name in the current version.
- Large character sets (CJK) need dynamic or fallback atlases per language.
- Font embedding licences vary by foundry; route to game-legal-advisor.

## Contrast and accessibility

- WCAG 2.1 SC 1.4.3: 4.5:1 for normal text, 3:1 for large text.
- WCAG 2.1 SC 1.4.11: 3:1 for UI components and graphical objects needed to understand them.
- Do not carry meaning by colour alone (Game Accessibility Guidelines and Xbox Accessibility Guidelines both cover this).
- Text expansion: German and French often run about 30% longer than English. UNVERIFIED as a fixed figure; get real limits from localization-lead.
- Touch targets: Apple HIG 44x44 pt, Android 48x48 dp. UNVERIFIED against the current pages (not in the sources list).
- TV safe areas: console requirements change; look them up per platform. No figure recorded here.
