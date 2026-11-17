#!/usr/bin/env bash
# NPC Union installer for people not using the Claude Code plugin system.
# Usage: ./install.sh [--project DIR | --user] [--no-hook] [--uninstall]
#   --project DIR  install into DIR/.claude (default: current directory)
#   --user         install into ~/.claude
#   --no-hook      do not register the team-rule hook in <target>/settings.json
#   --uninstall    remove everything this installer added, including the hook
# Copies agents into <target>/agents/npc-union/, skills into <target>/skills/<name>/,
# and support files into <target>/npc-union/, rewriting ${CLAUDE_PLUGIN_ROOT} to that path.
# Registers the team-rule hook (a PreToolUse hook on Agent|Task running npc-union/scripts/team-guard.mjs)
# in <target>/settings.json through scripts/install-hook.mjs, keeping every other setting. Needs node.
set -euo pipefail
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="$(pwd)/.claude"; UNINSTALL=0; HOOK=1
while [ $# -gt 0 ]; do
  case "$1" in
    --project) TARGET="$(cd "$2" && pwd)/.claude"; shift 2 ;;
    --user) TARGET="$HOME/.claude"; shift ;;
    --uninstall) UNINSTALL=1; shift ;;
    --no-hook) HOOK=0; shift ;;
    -h|--help) sed -n 2,11p "$0"; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done
ROOT="$TARGET/npc-union"; MANIFEST="$ROOT/.installed-skills"; SETTINGS="$TARGET/settings.json"
# Runs install-hook.mjs; a failure (no node, settings.json not valid JSON) warns and does not stop the installer.
hook() {
  local script="$ROOT/scripts/install-hook.mjs"
  [ -f "$script" ] || script="$SRC/scripts/install-hook.mjs"
  if ! command -v node >/dev/null 2>&1; then echo "Warning: node not found, team hook not $1 in $SETTINGS" >&2; return 0; fi
  if [ "$1" = registered ]; then node "$script" "$SETTINGS" --script "$ROOT/scripts/team-guard.mjs" || echo "Warning: team hook not registered" >&2
  else [ -f "$SETTINGS" ] || return 0; node "$script" "$SETTINGS" --remove --script "$ROOT/scripts/team-guard.mjs" || echo "Warning: team hook not removed" >&2; fi
}
if [ "$UNINSTALL" = 1 ]; then
  hook removed
  if [ -f "$MANIFEST" ]; then while read -r s; do [ -n "$s" ] && rm -rf "$TARGET/skills/$s"; done < "$MANIFEST"; fi
  rm -rf "$TARGET/agents/npc-union" "$ROOT"
  echo "NPC Union removed from $TARGET"; exit 0
fi
[ -f "$SRC/.claude-plugin/plugin.json" ] || { echo "Run this from an NPC Union checkout." >&2; exit 1; }
mkdir -p "$ROOT" "$TARGET/agents" "$TARGET/skills"
for d in agents skills knowledge catalog scripts templates; do
  [ -d "$SRC/$d" ] && { rm -rf "$ROOT/$d"; cp -R "$SRC/$d" "$ROOT/$d"; }
done
rewrite() { find "$1" -name '*.md' -type f | while read -r f; do
  sed "s#\${CLAUDE_PLUGIN_ROOT}#$ROOT#g" "$f" > "$f.tmp" && mv "$f.tmp" "$f"; done; }
rewrite "$ROOT"
rm -rf "$TARGET/agents/npc-union"; cp -R "$ROOT/agents" "$TARGET/agents/npc-union"
: > "$MANIFEST"
for s in "$ROOT"/skills/*/; do
  n="$(basename "$s")"
  if [ -d "$TARGET/skills/$n" ] && ! grep -qx "$n" "$MANIFEST" && [ ! -f "$TARGET/skills/$n/.npc-union" ]; then
    echo "Skipping skill $n: $TARGET/skills/$n already exists and is not from NPC Union" >&2; continue
  fi
  rm -rf "$TARGET/skills/$n"; cp -R "$s" "$TARGET/skills/$n"; touch "$TARGET/skills/$n/.npc-union"; echo "$n" >> "$MANIFEST"
done
if [ "$HOOK" = 1 ]; then hook registered; fi
echo "NPC Union installed into $TARGET"
echo "Start with: claude --agent shop-steward    (uninstall: $0 --uninstall $( [ "$TARGET" = "$HOME/.claude" ] && echo --user || echo --project "$(dirname "$TARGET")"))"
