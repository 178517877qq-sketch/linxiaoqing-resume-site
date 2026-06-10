# Commit and push source code to main branch
# Usage: right-click -> Run with PowerShell, or run from any PowerShell window.

$ErrorActionPreference = "Stop"

try {

$projectDir = $PSScriptRoot
if (-not $projectDir) { $projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
Set-Location -LiteralPath $projectDir
Write-Host "Project dir: $projectDir"

Write-Host "[1/3] Staging changes..." -ForegroundColor Cyan
git add .

Write-Host "[2/3] Committing..." -ForegroundColor Cyan
git commit -m "Update resume site $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
if ($LASTEXITCODE -ne 0) { Write-Host "Nothing to commit (no changes)." -ForegroundColor Yellow }

Write-Host "[3/3] Pushing to main..." -ForegroundColor Cyan
git push
if ($LASTEXITCODE -ne 0) { throw "Push failed. Check network or credentials." }

Write-Host "Done. Source pushed to main." -ForegroundColor Green

} catch {
    Write-Host ""
    Write-Host "ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to close"
