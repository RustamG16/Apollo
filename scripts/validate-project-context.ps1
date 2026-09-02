[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectPath
)

$ErrorActionPreference = 'Stop'
$resolved = (Resolve-Path -LiteralPath $ProjectPath).Path
$required = @(
    'PRD.md',
    'ARCHITECTURE.md',
    'ARCHITECTURE-ESSENTIALS.md',
    'AGENTS.md',
    'CODEX.md',
    'PROGRESS-AND-DECISIONS.md'
)
$failures = [System.Collections.Generic.List[string]]::new()

foreach ($name in $required) {
    $path = Join-Path $resolved $name
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        $failures.Add("Missing project context file: $name")
        continue
    }
    $content = Get-Content -LiteralPath $path -Raw -Encoding utf8
    if ([string]::IsNullOrWhiteSpace($content)) {
        $failures.Add("Empty project context file: $name")
    }
}

$router = Join-Path $resolved 'CODEX.md'
if (Test-Path -LiteralPath $router -PathType Leaf) {
    $lines = (Get-Content -LiteralPath $router).Count
    if ($lines -gt 120) {
        $failures.Add("CODEX.md is $lines lines; keep the router at or below 120 lines.")
    }
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Output "Project context validation passed: $resolved"

