---
title: Game UI art production (9-slice, states, icons, font atlases, scaling)
tags: [ui, hud, 9-slice, icons, fonts, sdf, scaling, accessibility]
sources:
  - "https://docs.godotengine.org/en/stable/classes/class_ninepatchrect.html"
  - "https://docs.godotengine.org/en/stable/classes/class_styleboxtexture.html"
  - "https://docs.godotengine.org/en/stable/tutorials/ui/gui_using_fonts.html"
  - "https://docs.unity3d.com/Manual/9SliceSprites.html"
  - "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
  - "https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html"
  - "https://learn.microsoft.com/en-us/gaming/accessibility/guidelines"
  - "https://gameaccessibilityguidelines.com/"
last_verified: 2026-11-05
---

# Game UI art production

Working notes for game-ui-artist. Check the linked documentation for the target engine version.

## 9-slice panels

- A 9-slice splits a texture into 4 fixed corners, 4 edges that scale on one axis, and a center that scales on both.
- Godot: `NinePatchRect` has `patch_margin_left/top/right/bottom` and horizontal and vertical axis stretch modes (stretch, tile, tile fit). `StyleBoxTexture` has texture margins plus separate content margins. See [Godot 4.4 NinePatchRect](https://docs.godotengine.org/en/4.4/classes/class_ninepatchrect.html) and [StyleBoxTexture](https://docs.godotengine.org/en/4.5/classes/class_styleboxtexture.html); check the target version.
- Unity: sprite borders are set in the Sprite Editor; a UI Image set to Sliced or Tiled uses them. See the [Unity 2018.4 manual](https://docs.unity3d.com/2018.4/Documentation/Manual/9SliceSprites.html); check the target version.
- Unreal: Slate brushes support Box and Border draw modes with margins. [Unreal's FSlateBrush](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Runtime/SlateCore/FSlateBrush) uses UV-space margins for Box and Border; [FSlateBoxBrush](https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/SlateCore/FSlateBoxBrush/__ctor?lang=en-US) describes normalized texture UV space.
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
- For Unity Selectable states, check the uGUI documentation for the project's package version before preparing variants.
- Godot buttons use theme styleboxes for normal, hover, pressed, disabled and focus, with focus drawn on top. The [stable Button documentation](https://docs.godotengine.org/en/stable/classes/class_button.html) also lists hover-pressed.

## Fonts

- SDF atlases render one glyph texture at many sizes; outline and shadow thickness are limited by atlas padding.
- Godot 4 supports MSDF font rendering; the import option is [Multichannel Signed Distance Field](https://docs.godotengine.org/en/4.x/tutorials/ui/gui_using_fonts.html).
- Large character sets (CJK) need dynamic or fallback atlases per language.
- Font embedding licences vary by foundry; route to game-legal-advisor.

## Contrast and accessibility

- WCAG 2.1 SC 1.4.3: 4.5:1 for normal text, 3:1 for large text.
- WCAG 2.1 SC 1.4.11: 3:1 for UI components and graphical objects needed to understand them.
- Do not carry meaning by colour alone (Game Accessibility Guidelines and Xbox Accessibility Guidelines both cover this).
- Text expansion varies by string and language; ask localization-lead for representative translations and test them in the actual layouts.
- Touch targets: [Apple recommends a 44x44 pt default for iOS and iPadOS](https://developer.apple.com/design/human-interface-guidelines/accessibility), with a 28x28 pt minimum; [Android guidance](https://developer.android.com/develop/ui/compose/accessibility/api-defaults) recommends at least 48x48 dp.
- TV safe areas: console requirements change; look them up per platform. No figure recorded here.
