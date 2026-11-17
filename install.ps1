# NPC Union installer for Windows PowerShell, for people not using the Claude Code plugin system.
# Usage: .\install.ps1 [-Project DIR | -User] [-NoHook] [-Uninstall]
#   -Project DIR  install into DIR\.claude (default: current directory)
#   -User         install into ~\.claude
#   -NoHook       do not register the team-rule hook
#   -Uninstall    remove everything this installer added, including the hook
# Copies agents into <target>\agents\npc-union\, skills into <target>\skills\<name>\,
# and support files into <target>\npc-union\, rewriting ${CLAUDE_PLUGIN_ROOT} to that path.
# Registers the team-rule hook (a PreToolUse hook on Agent|Task running npc-union/scripts/team-guard.mjs) through
# scripts/install-hook.mjs, keeping every other setting. Needs node. The entry holds an absolute path, so a project
# install puts it in <project>\.claude\settings.local.json (personal, not committed); -User uses ~\.claude\settings.json.
param([string]$Project = (Get-Location).Path, [switch]$User, [switch]$NoHook, [switch]$Uninstall)
$ErrorActionPreference = "Stop"
$Src = $PSScriptRoot
$Target = if ($User) { Join-Path $HOME ".claude" } else { Join-Path (Resolve-Path $Project).Path ".claude" }
$Root = Join-Path $Target "npc-union"
$Manifest = Join-Path $Root ".installed-skills"
# The hook goes in settings.json only for ~\.claude; a project gets the uncommitted settings.local.json.
# $Other is the file that must not hold our entry (older installs wrote to settings.json); it is cleaned too.
if ($Target.TrimEnd('\','/') -eq (Join-Path $HOME ".claude")) { $Settings = Join-Path $Target "settings.json"; $Other = Join-Path $Target "settings.local.json" }
else { $Settings = Join-Path $Target "settings.local.json"; $Other = Join-Path $Target "settings.json" }
# Runs install-hook.mjs; a failure (no node, a settings file not valid JSON) warns and does not stop the installer.
# The checkout's copy comes first, so an uninstall uses the current script rather than an older installed one.
function Invoke-Hook([string]$What) {
  $script = Join-Path $Src "scripts/install-hook.mjs"
  if (-not (Test-Path $script)) { $script = Join-Path $Root "scripts/install-hook.mjs" }
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Write-Warning "node not found, team hook not $What in $Settings"; return }
  $guard = Join-Path $Root "scripts/team-guard.mjs"
  if ($What -eq "registered") { & node $script $Settings --also $Other --script $guard }
  else { & node $script $Settings --also $Other --remove --script $guard }
  if ($LASTEXITCODE -ne 0) { Write-Warning "team hook not $What" }
}
if ($Uninstall) {
  Invoke-Hook "removed"
  if (Test-Path $Manifest) { Get-Content $Manifest | Where-Object { $_ } | ForEach-Object { Remove-Item -Recurse -Force (Join-Path $Target "skills/$_") -ErrorAction SilentlyContinue } }
  Remove-Item -Recurse -Force (Join-Path $Target "agents/npc-union"), $Root -ErrorAction SilentlyContinue
  Write-Host "NPC Union removed from $Target"; exit 0
}
if (-not (Test-Path (Join-Path $Src ".claude-plugin/plugin.json"))) { throw "Run this from an NPC Union checkout." }
New-Item -ItemType Directory -Force -Path $Root, (Join-Path $Target "agents"), (Join-Path $Target "skills") | Out-Null
foreach ($d in "agents","skills","knowledge","catalog","scripts","templates") {
  $from = Join-Path $Src $d
  if (Test-Path $from) { Remove-Item -Recurse -Force (Join-Path $Root $d) -ErrorAction SilentlyContinue; Copy-Item -Recurse $from (Join-Path $Root $d) }
}
$rootFwd = $Root -replace '\\','/'
Get-ChildItem -Path $Root -Recurse -Filter *.md | ForEach-Object {
  $t = [IO.File]::ReadAllText($_.FullName); [IO.File]::WriteAllText($_.FullName, $t.Replace('${CLAUDE_PLUGIN_ROOT}', $rootFwd))
}
$agentsDest = Join-Path $Target "agents/npc-union"
Remove-Item -Recurse -Force $agentsDest -ErrorAction SilentlyContinue
Copy-Item -Recurse (Join-Path $Root "agents") $agentsDest
Set-Content -Path $Manifest -Value $null
Get-ChildItem -Directory (Join-Path $Root "skills") | ForEach-Object {
  $dest = Join-Path $Target "skills/$($_.Name)"
  if ((Test-Path $dest) -and -not (Test-Path (Join-Path $dest ".npc-union"))) { Write-Warning "Skipping skill $($_.Name): not from NPC Union"; return }
  Remove-Item -Recurse -Force $dest -ErrorAction SilentlyContinue
  Copy-Item -Recurse $_.FullName $dest
  New-Item -ItemType File -Force (Join-Path $dest ".npc-union") | Out-Null
  Add-Content -Path $Manifest -Value $_.Name
}
if (-not $NoHook) { Invoke-Hook "registered" }
Write-Host "NPC Union installed into $Target. Start with: claude --agent shop-steward"
