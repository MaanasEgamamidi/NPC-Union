---
title: Release management platform notes
tags: [release, steam, console-certification, rollback, hotfix]
sources: [https://partner.steamgames.com/doc/sdk/uploading, https://partner.steamgames.com/doc/store/application/branches]
last_verified: UNVERIFIED
---

# Release management platform notes

Facts here change with platform policy. Each is UNVERIFIED until checked against the current official docs.

- UNVERIFIED: Steam lets a partner set an earlier build live on the default branch from the SteamPipe builds page, which works as a file rollback.
- UNVERIFIED: Steam beta branches can be password protected; branch names may be visible to players with access.
- UNVERIFIED: Steam reviews the store page and the first build before an app's initial release; allow several business days and check the current Steamworks guidance.
- UNVERIFIED: SteamPipe computes patches from content chunks, so reordering packed archive contents can inflate patch size.
- UNVERIFIED: PlayStation (TRC), Xbox (XR) and Nintendo (Lotcheck) certification requirements and turnaround times are published in NDA partner portals and change per revision.
- UNVERIFIED: Console patches cannot be rolled back by the developer; a fix requires a new patch submission.
