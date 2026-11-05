---
name: mcp-server-scaffold
description: Scaffold a minimal MCP server against the current spec revision, with one tool, a transport choice, and a smoke test. Use when starting a new MCP server.
owner: mcp-specialist
disable-model-invocation: true
argument-hint: "[server name] [language: ts|python] [transport: stdio|http] [first tool idea]"
---

# MCP server scaffold

A repeatable procedure for standing up a new MCP server that matches the current spec revision and passes a smoke test before anyone adds features.

## Inputs

- Server name (kebab-case). Ask if missing.
- Language: TypeScript or Python. Ask if missing; default to the language of the host repo.
- Transport: stdio (local, client-launched subprocess) or Streamable HTTP (remote, shared). Ask "Will this run on the user's machine or as a shared service?" if missing.
- First tool: name, one-line purpose, input fields, and whether it reads or writes. Ask if missing.
- Target clients (Claude Code, desktop app, other) and which spec revision they support. If unknown, record UNVERIFIED.

## Steps

1. Fetch https://modelcontextprotocol.io/specification and record the current dated revision and schema link. Compare with `knowledge/technical/mcp-spec.md`; if they differ, flag it in the output and update the knowledge file.
2. Check the official SDK for the chosen language on its package registry and pin an exact version. Confirm in the SDK changelog which spec revision it implements. If it lags the current spec, note the gap.
3. Create the layout: `src/` (server entry, one file per tool), `tests/`, `README.md`, and a lockfile. No secrets in the repo; read credentials from environment variables.
4. Implement the transport. stdio: newline-delimited JSON-RPC on stdout, all logging to stderr. Streamable HTTP: a single MCP endpoint that accepts POST and replies with JSON or a request-scoped SSE stream; validate that mirrored headers match body metadata.
5. Implement the first tool with a JSON Schema for inputs, a short description written for the model, and explicit error results for bad input. Mark write tools so the host can ask for consent.
6. Handle cancellation: `notifications/cancelled` on stdio, closed response stream on HTTP. Stop work and release resources.
7. If any target client speaks an older revision, add the era-detection fallback from the spec's Versioning page, or document that older clients are unsupported.
8. Write a smoke test that lists tools, calls the first tool with valid and invalid input, and checks the error shape. Run it.
9. Run the server through an inspector or a real client once and record the result.
10. Write the README: install, run, client config snippet, environment variables, spec revision targeted.

## Output

```
## MCP server: <name>
Spec revision: <dated version> (checked <date>, source URL)
SDK: <package>@<exact version>, implements <revision or UNVERIFIED>
Transport: <stdio | Streamable HTTP> because <reason>
Tools:
- <tool>: <purpose>, inputs <fields>, <read | write>
Files: <list of paths created>
Smoke test: <command> -> <pass/fail, notes>
Client check: <client and result, or not run>
Open risks: <version gaps, UNVERIFIED items, security notes>
Hand-off: <agent and what they need>
```

## Done when

- [ ] Current spec revision fetched and recorded with source URL and date.
- [ ] SDK pinned to an exact version and its supported revision noted.
- [ ] stdio servers write nothing but protocol messages to stdout.
- [ ] Every tool has an input schema and returns structured errors for bad input.
- [ ] Write tools are marked so the host can request consent.
- [ ] Cancellation path tested or explicitly listed as a gap.
- [ ] Smoke test runs and passes.
- [ ] README has a working client config snippet.
- [ ] No secrets committed; all UNVERIFIED items listed in Open risks.
