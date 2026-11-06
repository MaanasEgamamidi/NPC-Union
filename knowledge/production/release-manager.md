---
title: Release management platform notes
tags: [release, steam, console-certification, rollback, hotfix]
sources: ["https://partner.steamgames.com/doc/sdk/uploading", "https://partner.steamgames.com/doc/store/application/branches"]
last_verified: 2026-11-05
---

# Release management platform notes

Platform policies change. Check each against current official documentation before relying on it.

- Steam supports rolling back to a previous build through its build management interface. [SteamPipe](https://partner.steamgames.com/doc/sdk/uploading).
- Steam beta branches can be password protected; the password is required to access the branch, including its name. [Branches](https://partner.steamgames.com/doc/store/application/branches).
- Steam reviews the store presence and build before release. Valve says each review typically takes 3 to 5 business days and asks developers to plan at least 7 business days. [Review process](https://partner.steamgames.com/doc/store/Review_Process).
- SteamPipe computes updates from content chunks; changes to packed-file offsets can inflate update sizes. [SteamPipe](https://partner.steamgames.com/doc/sdk/uploading).
- Check each console partner portal for the current certification requirements, submission process and turnaround estimates.
- Confirm rollback and emergency patch options with each console platform before making a release recovery plan.
