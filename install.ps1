# NPC Union installer for Windows PowerShell, for people not using the Claude Code plugin system.
# Usage: .\install.ps1 [-Project DIR | -User] [-Uninstall]
param([string]$Project = (Get-Location).Path, [switch]$User, [switch]$Uninstall)
$ErrorActionPreference = "Stop"
$Src = $PSScriptRoot
$Target = if ($User) { Join-Path $HOME ".claude" } else { Join-Path (Resolve-Path $Project).Path ".claude" }
$Root = Join-Path $Target "npc-union"
$Manifest = Join-Path $Root ".installed-skills"
if ($Uninstall) {
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
Write-Host "NPC Union installed into $Target. Start with: claude --agent shop-steward"
