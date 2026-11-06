---
title: Trailer and cutscene direction
tags: [trailer, cutscene, store-video, capture, steam, app-store, flash-safety]
sources:
  - https://partner.steamgames.com/doc/store/trailer
  - https://developer.apple.com/app-store/app-previews/
  - https://developer.apple.com/help/app-store-connect/reference/app-information/app-preview-specifications
  - https://support.google.com/googleplay/android-developer/answer/9866151
  - https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html
last_verified: 2026-11-05
---

# Trailer and cutscene direction

Reference for video-director. Items checked against a source on 2026-11-05 say so. Everything else is marked UNVERIFIED and must be checked before it is quoted to a user.

## Steam trailers (checked 2026-11-05)

Source: https://partner.steamgames.com/doc/store/trailer

- Containers: .mov, .wmv or .mp4. H.264 video with AAC audio preferred. Other formats can be transcoded.
- Resolution up to 1920x1080. 16:9 preferred, 4:3 accepted.
- Frame rate 30/29.97 or 60/59.94 fps.
- Bitrate: high, 5,000+ Kbps. Valve's Adobe Media Encoder preset is H.264 at 20 Mbps with AAC stereo at 192 Kbps.
- Audio at 44 kHz or 48 kHz. Audio is reduced to stereo in transcoding.
- Upload the highest quality version available.
- Steam generates a 600x380 poster and a 232x130 thumbnail. A custom image must be a 1920x1080 JPG or PNG frame from the video. Avoid text in it.
- The first two valid trailers show before screenshots, the rest after. Trailers can be reordered, assigned to languages or limited to countries. The base video should be the English trailer.
- Viewers in the Discovery Queue may give a trailer under 10 seconds. Lead with gameplay, ideally with the HUD visible, and make it understandable without sound.
- Steam builds a 6-second looping microtrailer from clips of the first visible trailer. It cannot be customised.
- The page does not state a maximum length, a trailer count limit, HDR support or autoplay behaviour.

## Apple App Store app previews (UNVERIFIED)

Sources: [Apple app previews](https://developer.apple.com/app-store/app-previews/) and [App Store Connect specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/app-preview-specifications).

- Previews run 15 to 30 seconds, with up to three per supported language. They autoplay when enabled; a poster frame appears if autoplay is off.
- Footage must be captured from the app itself; accepted resolutions depend on the display size.
- Check the page and App Store Connect help before giving numbers.

## Google Play and console stores (UNVERIFIED)

- Google Play uses a [YouTube URL](https://support.google.com/googleplay/android-developer/answer/9866151) for the store listing preview video.
- Console store video specs (PlayStation, Xbox, Nintendo) sit behind partner portals. Ask the user to check their partner documentation. Do not quote from memory.

## Flash safety (checked 2026-11-05)

Source: https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html

- WCAG 2.3.1: content must not flash more than three times in any one-second period, unless the flash is below the general flash and red flash thresholds.
- Trailer risks: hit flashes, lightning, white-out transitions, strobing UI, rapid cuts between very dark and very bright shots.

## Pacing rules of thumb (working heuristics, not sourced)

- Hook by 0:05 with gameplay. Logos at the end.
- Text card hold: about 3 words per second plus 0.5 s.
- Music grid: seconds per beat = 60 / BPM. Frames per beat = seconds per beat x fps.
- Cuts 2 to 3 frames ahead of a beat read as on time.
- UNVERIFIED: YouTube normalises playback loudness to roughly -14 LUFS integrated. Confirm with audio-director before mixing to it.

## Capture setup

- Capture at 60 fps, even for 30 fps delivery, for clean slow motion and frame choice.
- Capture above delivery resolution when frame rate holds, for downsampled sharpness and room to reframe.
- Capture build: debug UI off, fixed seeds, invulnerability, dynamic resolution off, deliberate motion blur and shake settings, free camera or photo mode, save file per shot.
- Offline frame-by-frame capture: Unity Recorder (Unity) and Movie Render Queue (Unreal Engine). Check the engine version's documentation for current settings (UNVERIFIED for any specific version).

## In-engine versus pre-rendered cutscenes

| | In-engine | Pre-rendered |
|---|---|---|
| Player costume, gear, lighting state | Matches | Fixed at render time |
| Disk cost | Low | High, grows with length and bitrate |
| Visual consistency across hardware | Varies with settings | Identical |
| Resolution | Native to the display | Locked to the file (1080p looks soft at 4K) |
| Main risk | Streaming hitches at camera cuts; pre-load the next shot | Visible quality jump between gameplay and video |

## Cutscene requirements

- Skip with hold or confirm. Repeat viewings skip without a prompt.
- Pause works during the cutscene.
- Subtitles on by default or offered at first launch; style comes from game-ui-artist and accessibility-specialist.
