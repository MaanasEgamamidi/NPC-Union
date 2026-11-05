# Security policy

## What counts

- `scripts/` (for example `run-agent.mjs`, the installers) running commands it should not, or building shell strings from user input.
- Agent or skill text that tells a model to leak secrets, disable safety checks, or run destructive commands.
- Secrets, tokens, or personal data committed to the repository.
- Knowledge files linking to malicious downloads.

Wrong facts in an agent are not security issues. Open a normal issue for those.

## Reporting

Use GitHub's private vulnerability reporting on this repository (Security tab, "Report a vulnerability"). Please do not open a public issue for a vulnerability.

Include what you found, how to reproduce it, and what an attacker could do with it. Expect an acknowledgement within 7 days.

## Supported versions

Only the latest release on the default branch gets fixes.
