[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$systemRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path

$requiredFiles = @(
    'README.md',
    'START-HERE.md',
    'PROMPT.md',
    'CLAUDE.md',
    'USAGE.md',
    'AGENTS.md',
    'ARCHITECTURE.md',
    'ARCHITECTURE-ESSENTIALS.md',
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
    'library/README.md'
    'library/registry/skills.registry.json'
    'library/registry/ROUTING-DIGEST.md'
    'library/tools/project.py'
    'library/tools/verify.py'
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
    if ($content -notmatch "(?m)^name:\s*""?$([regex]::Escape($skill.Name))""?\s*$") {
        $failures.Add("Frontmatter name does not match folder: $($skill.Name)")
    }
    if ($content -notmatch '(?m)^description:\s*\S') {
        $failures.Add("Missing description: $($skill.Name)")
    }
}

$customAgents = Get-ChildItem -LiteralPath (Join-Path $systemRoot '.codex/agents') -Filter '*.toml' -File
if ($customAgents.Count -ne 6) {
    $failures.Add("Expected 6 custom agents (5 specialists + design-director); found $($customAgents.Count).")
}
foreach ($agent in $customAgents) {
    $content = Get-Content -LiteralPath $agent.FullName -Raw -Encoding utf8
    foreach ($key in @('name', 'description', 'developer_instructions')) {
        if ($content -notmatch "(?m)^$key\s*=") {
            $failures.Add("Agent $($agent.Name) is missing $key.")
        }
    }
}

# --- unification checks --------------------------------------------------

# scope the TODO scan to system-authored files; generated + vendored skill trees are excluded
$excludeRe = '\\third-party\\|\\.validation-libs\\|\\.git\\|\\node_modules\\|\\test_projects\\|\\.skill-backups\\|\\.olympus\\|\\.impeccable\\|\\library\\skills\\|\\library\\knowledge\\|\\.claude\\skills\\|\\.agents\\skills\\|\\apollo-studio\\knowledge\\skills\\'
$unfinishedMarkers = @('\[' + 'TODO', 'TODO' + ':')
$todoHits = Get-ChildItem -LiteralPath $systemRoot -Recurse -File |
    Where-Object { $_.FullName -notmatch $excludeRe } |
    Select-String -Pattern $unfinishedMarkers
if ($todoHits) {
    $failures.Add("Unresolved TODO markers found in system-authored files: " + (($todoHits | ForEach-Object { $_.Path }) -join '; '))
}

# registry <-> host folder parity
$registryPath = Join-Path $systemRoot 'library/registry/skills.registry.json'
if (Test-Path -LiteralPath $registryPath) {
    $registry = Get-Content -LiteralPath $registryPath -Raw -Encoding utf8 | ConvertFrom-Json
    $claudeSkillDir = Join-Path $systemRoot '.claude/skills'
    $codexSkillDir  = Join-Path $systemRoot '.agents/skills'
    $claudeHave = @{}; if (Test-Path $claudeSkillDir) { Get-ChildItem $claudeSkillDir -Directory | ForEach-Object { $claudeHave[$_.Name] = $true } }
    $codexHave  = @{}; if (Test-Path $codexSkillDir)  { Get-ChildItem $codexSkillDir  -Directory | ForEach-Object { $codexHave[$_.Name]  = $true } }
    $regIds = @{}
    foreach ($rec in $registry) {
        $regIds[$rec.id] = $true
        if (($rec.hosts -contains 'claude') -and ($rec.status -ne 'stub') -and -not $claudeHave[$rec.id]) {
            $failures.Add("Registry id '$($rec.id)' (claude host) has no .claude/skills folder.")
        }
        if (($rec.hosts -contains 'codex') -and ($rec.status -ne 'stub') -and -not $codexHave[$rec.id]) {
            $failures.Add("Registry id '$($rec.id)' (codex host) has no .agents/skills folder.")
        }
    }
    foreach ($name in $claudeHave.Keys) { if (-not $regIds[$name]) { $failures.Add(".claude/skills/$name has no registry record.") } }
    foreach ($name in $codexHave.Keys)  { if (-not $regIds[$name])  { $failures.Add(".agents/skills/$name has no registry record.") } }
} else {
    $failures.Add("Missing library/registry/skills.registry.json")
}

# every agent exists in both host formats
$agentDir = Join-Path $systemRoot 'library/agents'
if (Test-Path $agentDir) {
    Get-ChildItem $agentDir -Filter '*.md' -File | Where-Object { $_.Name -ne 'README.md' } | ForEach-Object {
        $n = [IO.Path]::GetFileNameWithoutExtension($_.Name)
        if (-not (Test-Path (Join-Path $systemRoot ".claude/agents/$n.md")))   { $failures.Add("Agent '$n' missing .claude/agents/$n.md") }
        if (-not (Test-Path (Join-Path $systemRoot ".codex/agents/$n.toml")))  { $failures.Add("Agent '$n' missing .codex/agents/$n.toml") }
    }
}

# generated trees must match a fresh projection
$projectPy = Join-Path $systemRoot 'library/tools/project.py'
if (Test-Path $projectPy) {
    $dry = & python $projectPy all --dry-run 2>&1 | Out-String
    if ($dry -match '(?m)^\s*HALT' -or $dry -notmatch '(?m)OK\s*$') {
        $failures.Add("project.py all --dry-run did not report OK:`n$dry")
    }
    $pending = [regex]::Matches($dry, '(\d+)\s+write\(s\)') | ForEach-Object { [int]$_.Groups[1].Value } | Measure-Object -Sum
    if ($pending.Sum -gt 0) {
        $failures.Add("Generated trees are stale - project.py all --dry-run plans $($pending.Sum) write(s). Run the projectors and commit.")
    }
}

$verifyPy = Join-Path $systemRoot 'library/tools/verify.py'
if (Test-Path $verifyPy) {
    & python $verifyPy | Out-Null
    if ($LASTEXITCODE -ne 0) { $failures.Add("library/tools/verify.py exited $LASTEXITCODE") }
}

# line-length caps
function Test-LineCap($rel, $cap) {
    $p = Join-Path $systemRoot $rel
    if (Test-Path -LiteralPath $p -PathType Leaf) {
        $n = (Get-Content -LiteralPath $p).Count
        if ($n -gt $cap) { $script:failures.Add("$rel is $n lines (cap $cap).") }
    }
}
Test-LineCap 'library/registry/ROUTING-DIGEST.md' 200
Test-LineCap 'CLAUDE.md' 120
Test-LineCap 'CODEX.md' 120
Test-LineCap 'PROMPT.md' 120

# CLAUDE.md must not duplicate doctrine sentences from AGENTS.md (>15 words shared verbatim)
$claudePath = Join-Path $systemRoot 'CLAUDE.md'
$agentsPath = Join-Path $systemRoot 'AGENTS.md'
if ((Test-Path $claudePath) -and (Test-Path $agentsPath)) {
    $norm = { param($t) ($t -replace '[^a-zA-Z0-9 ]', ' ') -replace '\s+', ' ' }
    $agentsWords = (& $norm (Get-Content $agentsPath -Raw)).ToLower()
    foreach ($line in Get-Content $claudePath) {
        $s = (& $norm $line).ToLower().Trim()
        $w = $s -split ' ' | Where-Object { $_ }
        for ($i = 0; $i -le $w.Count - 16; $i++) {
            $window = ($w[$i..($i + 15)] -join ' ')
            if ($agentsWords.Contains($window)) {
                $failures.Add("CLAUDE.md shares a 16-word run with AGENTS.md: '$window'")
                break
            }
        }
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Output "Olympus validation passed: $($skills.Count) skills, $($customAgents.Count) agents, $($requiredFiles.Count) required files, registry parity OK."
