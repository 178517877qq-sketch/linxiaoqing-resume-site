# Deploy resume site to GitHub Pages (gh-pages branch)
# Usage: right-click -> Run with PowerShell, or run from any PowerShell window.

$ErrorActionPreference = "Stop"

try {

$projectDir = $PSScriptRoot
if (-not $projectDir) { $projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
Set-Location -LiteralPath $projectDir
Write-Host "Project dir: $projectDir"

Write-Host "[1/4] Building GitHub Pages bundle..." -ForegroundColor Cyan
npm.cmd run build:github
if ($LASTEXITCODE -ne 0) { throw "Build failed. Aborting." }

Write-Host "[2/4] Preparing deploy folder..." -ForegroundColor Cyan
$deployDir = "C:\tmp\linxiaoqing-gh-pages"
if (Test-Path $deployDir) { Remove-Item -LiteralPath $deployDir -Recurse -Force }
New-Item -ItemType Directory -Path $deployDir -Force | Out-Null
Copy-Item -Path ".\dist\*" -Destination $deployDir -Recurse -Force
New-Item -ItemType File -Path "$deployDir\.nojekyll" -Force | Out-Null

Write-Host "[3/4] Pushing gh-pages branch..." -ForegroundColor Cyan
git -C $deployDir init
git -C $deployDir branch -M gh-pages
git -C $deployDir config user.name "178517877qq-sketch"
git -C $deployDir config user.email "178517877qq-sketch@users.noreply.github.com"
git -C $deployDir add .
git -C $deployDir commit -m "Deploy resume site $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git -C $deployDir remote add origin "https://github.com/178517877qq-sketch/linxiaoqing-resume-site.git"
git -C $deployDir push --force origin gh-pages

Write-Host "[4/4] Done. Check: https://178517877qq-sketch.github.io/linxiaoqing-resume-site/" -ForegroundColor Green
Write-Host "Reminder: commit and push source changes to main separately."

} catch {
    Write-Host ""
    Write-Host "ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to close"
