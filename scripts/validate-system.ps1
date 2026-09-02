[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$systemRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path

$requiredFiles = @(
    'README.md',
    'START-HERE.md',
    'PROMPT.md',
    'AGENTS.md',
    'ARCHITECTURE.md',
    '.codex/config.toml',
    'config/MCP-SETUP.md',
    'templates/run.json',
    'templates/00-brief.md',
    'templates/01-audit.md',
    'templates/02-concepts.md',
    'templates/03-critique.md',
    'templates/04-decision.md',
    'templates/05-asset-manifest.md',
    'templates/06-build-plan.md',
    'templates/07-qa.md',
    'templates/08-metrics.md',
    'templates/09-handoff.md'
    'templates/project-context/PRD.md'
    'templates/project-context/ARCHITECTURE.md'
    'templates/project-context/ARCHITECTURE-ESSENTIALS.md'
    'templates/project-context/AGENTS.md'
    'templates/project-context/CODEX.md'
    'templates/project-context/PROGRESS-AND-DECISIONS.md'
    'scripts/validate-project-context.ps1'
)

$failures = [System.Collections.Generic.List[string]]::new()

foreach ($relativePath in $requiredFiles) {
    $path = Join-Path $systemRoot $relativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        $failures.Add("Missing required file: $relativePath")
    }
}

try {
    Get-Content -LiteralPath (Join-Path $systemRoot 'templates/run.json') -Raw | ConvertFrom-Json | Out-Null
} catch {
    $failures.Add("templates/run.json is invalid JSON: $($_.Exception.Message)")
}

$skillRoot = Join-Path $systemRoot '.agents/skills'
$skills = Get-ChildItem -LiteralPath $skillRoot -Directory
if ($skills.Count -lt 10) {
    $failures.Add("Expected at least 10 skills; found $($skills.Count).")
}

foreach ($skill in $skills) {
    $skillFile = Join-Path $skill.FullName 'SKILL.md'
    if (-not (Test-Path -LiteralPath $skillFile -PathType Leaf)) {
        $failures.Add("Missing SKILL.md: $($skill.Name)")
        continue
    }

    $content = Get-Content -LiteralPath $skillFile -Raw -Encoding utf8
    if ($content -notmatch '(?s)^---\s*\r?\n.*?\r?\n---') {
        $failures.Add("Invalid frontmatter boundary: $($skill.Name)")
    }
    if ($content -notmatch "(?m)^name:\s*$([regex]::Escape($skill.Name))\s*$") {
        $failures.Add("Frontmatter name does not match folder: $($skill.Name)")
    }
    if ($content -notmatch '(?m)^description:\s*\S') {
        $failures.Add("Missing description: $($skill.Name)")
    }
}

$customAgents = Get-ChildItem -LiteralPath (Join-Path $systemRoot '.codex/agents') -Filter '*.toml' -File
if ($customAgents.Count -ne 5) {
    $failures.Add("Expected 5 optional custom agents; found $($customAgents.Count).")
}
foreach ($agent in $customAgents) {
    $content = Get-Content -LiteralPath $agent.FullName -Raw -Encoding utf8
    foreach ($key in @('name', 'description', 'developer_instructions')) {
        if ($content -notmatch "(?m)^$key\s*=") {
            $failures.Add("Agent $($agent.Name) is missing $key.")
        }
    }
}

$unfinishedMarkers = @('\[' + 'TODO', 'TODO' + ':')
$todoHits = Get-ChildItem -LiteralPath $systemRoot -Recurse -File |
    Where-Object { $_.FullName -notmatch '\\third-party\\|\\.validation-libs\\|\\.git\\' } |
    Select-String -Pattern $unfinishedMarkers
if ($todoHits) {
    $failures.Add("Unresolved TODO markers found in system-authored files.")
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Output "Olympus validation passed: $($skills.Count) skills, $($customAgents.Count) optional agents, and $($requiredFiles.Count) required files."
