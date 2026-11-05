---
name: store-upload-checklist
description: Prepare and run a release upload to Steam (SteamPipe, SteamCMD), itch.io (butler) or signed and notarized macOS, ending on a test branch, not live.
owner: build-engineer
disable-model-invocation: true
argument-hint: "[store(s), platforms, version]"
---

# Store upload checklist

## Inputs

- Stores: Steam, itch.io, or both. App ID and depot IDs for Steam; user/game slug for itch.io.
- Platforms and the built folders for each.
- Version string (from the CI tag).
- For macOS: Developer ID certificate available in CI and an App Store Connect API key or app-specific password for notarytool.

## Steps

1. Check current docs for each store via `knowledge/technical/programming/build-ci.md` (SteamPipe, butler, notarytool). Note any change since the file's last_verified date.
2. Steam: write `app_build_<appid>.vdf` with `Desc` set to the version string, `SetLive` set to a beta branch (never `default`), and one depot VDF per platform with FileMapping and FileExclusion (exclude `*.pdb` from the depot; archive them separately).
3. Steam: run `steamcmd +login <builder> +run_app_build <path to app_build vdf> +quit` with a dedicated builder account. Confirm the BuildID in the output.
4. itch.io: `butler push <dir> <user>/<game>:<channel> --userversion <version>` per platform; channel names carry the platform. Run `butler status <user>/<game>` to confirm.
5. macOS: sign with the hardened runtime, zip with `ditto -c -k --keepParent`, `xcrun notarytool submit <zip> --wait`, then `xcrun stapler staple <app>`. Read the notarytool log on rejection.
6. Android (if in scope): upload an AAB, check targetSdkVersion against the current Google Play target API rule.
7. Install the uploaded build from the store client on a clean machine and launch it.
8. Hand the release-manager the branch name and BuildID for go-live.

## Output

```
## Upload: <game> <version>
| Store | Platform | Target (branch/channel) | Build ID / status | Verified on clean install |
|-------|----------|-------------------------|-------------------|---------------------------|
Symbols archived at: <location>
Notarization: <submission ID, status>
Docs rechecked: <pages and date>
Go-live owner: release-manager
```

## Done when

- [ ] Each upload landed on a test branch or channel, not live.
- [ ] A clean install launched on each platform.
- [ ] Symbols are archived under the same version string.
- [ ] Notarization accepted and stapled (macOS).
