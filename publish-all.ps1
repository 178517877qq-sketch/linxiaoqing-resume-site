# One-click publish: push source to main, then build and deploy to gh-pages
# Usage: right-click -> Run with PowerShell, or run from any PowerShell window.

$ErrorActionPreference = "Stop"

try {

$projectDir = $PSScriptRoot
if (-not $projectDir) { $projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
Set-Location -LiteralPath $projectDir
Write-Host "Project dir: $projectDir"

# ---------- Step 1: push source to main ----------
Write-Host ""
Write-Host "===== STEP 1/2: Push source to main =====" -ForegroundColor Magenta

Write-Host "[1/3] Staging changes..." -ForegroundColor Cyan
git add .

Write-Host "[2/3] Committing..." -ForegroundColor Cyan
git commit -m "Update resume site $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
if ($LASTEXITCODE -ne 0) { Write-Host "Nothing to commit (no changes)." -ForegroundColor Yellow }

Write-Host "[3/3] Pushing to main..." -ForegroundColor Cyan
git push
if ($LASTEXITCODE -ne 0) { throw "Push to main failed. Check network or credentials." }

# ---------- Step 2: build and deploy to gh-pages ----------
Write-Host ""
Write-Host "===== STEP 2/2: Build and deploy to gh-pages =====" -ForegroundColor Magenta

Write-Host "[1/3] Building GitHub Pages bundle..." -ForegroundColor Cyan
npm.cmd run build:github
if ($LASTEXITCODE -ne 0) { throw "Build failed. Aborting (main already pushed, gh-pages NOT updated)." }

Write-Host "[2/3] Preparing deploy folder..." -ForegroundColor Cyan
$deployDir = "C:\tmp\linxiaoqing-gh-pages"
if (Test-Path $deployDir) { Remove-Item -LiteralPath $deployDir -Recurse -Force }
New-Item -ItemType Directory -Path $deployDir -Force | Out-Null
Copy-Item -Path ".\dist\*" -Destination $deployDir -Recurse -Force
New-Item -ItemType File -Path "$deployDir\.nojekyll" -Force | Out-Null

Write-Host "[3/3] Pushing gh-pages branch..." -ForegroundColor Cyan
git -C $deployDir init
git -C $deployDir branch -M gh-pages
git -C $deployDir config user.name "178517877qq-sketch"
git -C $deployDir config user.email "178517877qq-sketch@users.noreply.github.com"
git -C $deployDir add .
git -C $deployDir commit -m "Deploy resume site $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git -C $deployDir remote add origin "https://github.com/178517877qq-sketch/linxiaoqing-resume-site.git"
git -C $deployDir push --force origin gh-pages
if ($LASTEXITCODE -ne 0) { throw "Push to gh-pages failed." }

Write-Host ""
Write-Host "ALL DONE. Source on main, site deployed." -ForegroundColor Green
Write-Host "Check: https://178517877qq-sketch.github.io/linxiaoqing-resume-site/"

} catch {
    Write-Host ""
    Write-Host "ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to close"
