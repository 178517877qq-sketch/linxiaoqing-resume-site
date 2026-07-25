# Validate, commit, and push the site source to main.
# Usage: right-click -> Run with PowerShell, or run from any PowerShell window.

$ErrorActionPreference = "Stop"

function Invoke-CheckedNative {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FilePath,
        [Parameter(Mandatory = $true)]
        [string[]]$ArgumentList,
        [Parameter(Mandatory = $true)]
        [string]$FailureMessage
    )

    & $FilePath @ArgumentList
    $exitCode = $LASTEXITCODE
    if ($exitCode -ne 0) {
        throw "$FailureMessage (exit code $exitCode)."
    }
}

function Get-CheckedNativeOutput {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FilePath,
        [Parameter(Mandatory = $true)]
        [string[]]$ArgumentList,
        [Parameter(Mandatory = $true)]
        [string]$FailureMessage
    )

    $output = & $FilePath @ArgumentList
    $exitCode = $LASTEXITCODE
    if ($exitCode -ne 0) {
        throw "$FailureMessage (exit code $exitCode)."
    }
    return ($output -join "`n")
}

$scriptExitCode = 0

try {
    $projectDir = $PSScriptRoot
    if (-not $projectDir) {
        $projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    }
    Set-Location -LiteralPath $projectDir
    Write-Host "Project dir: $projectDir"

    $currentBranch = (Get-CheckedNativeOutput -FilePath "git" -ArgumentList @("branch", "--show-current") -FailureMessage "Could not determine the current Git branch").Trim()
    if ($currentBranch -ne "main") {
        throw "Source publishing requires the main branch. Current branch: $currentBranch"
    }

    Write-Host "[1/5] Installing locked dependencies..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "npm.cmd" -ArgumentList @("ci") -FailureMessage "Dependency installation failed"

    Write-Host "[2/5] Building the GitHub Pages bundle..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "npm.cmd" -ArgumentList @("run", "build:github") -FailureMessage "Build failed; source changes were not staged or pushed"

    Write-Host "[3/5] Staging approved source paths..." -ForegroundColor Cyan
    $managementDoc = (-join @(
        [char]0x9879,
        [char]0x76EE,
        [char]0x7BA1,
        [char]0x7406,
        [char]0x8BF4,
        [char]0x660E
    )) + ".md"
    $sourcePaths = @(
        ".gitignore",
        ".github/workflows",
        "deploy.ps1",
        "push-source.ps1",
        "publish-all.ps1",
        "index.html",
        "bank.html",
        "ecommerce.html",
        "novel.html",
        "feimiao.html",
        "vite.config.ts",
        "package.json",
        "package-lock.json",
        "tsconfig.json",
        "src",
        "public",
        $managementDoc
    )
    $gitAddArguments = @("add", "-A", "--") + $sourcePaths
    Invoke-CheckedNative -FilePath "git" -ArgumentList $gitAddArguments -FailureMessage "Could not stage the approved source paths"

    Write-Host "[4/5] Creating a source commit when needed..." -ForegroundColor Cyan
    $gitDiffArguments = @("diff", "--cached", "--quiet", "--exit-code", "--") + $sourcePaths
    & git @gitDiffArguments
    $diffExitCode = $LASTEXITCODE
    if ($diffExitCode -eq 0) {
        Write-Host "No approved source changes to commit." -ForegroundColor Yellow
    } elseif ($diffExitCode -eq 1) {
        $gitCommitArguments = @("commit", "--only", "-m", "Update resume site $(Get-Date -Format 'yyyy-MM-dd HH:mm')", "--") + $sourcePaths
        Invoke-CheckedNative -FilePath "git" -ArgumentList $gitCommitArguments -FailureMessage "Source commit failed"
    } else {
        throw "Could not inspect staged source changes (exit code $diffExitCode)."
    }

    Write-Host "[5/5] Pushing main..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("push", "origin", "main") -FailureMessage "Push to main failed"

    Write-Host "Source validation and push completed successfully." -ForegroundColor Green
} catch {
    $scriptExitCode = 1
    Write-Host ""
    Write-Host "ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to close" | Out-Null
exit $scriptExitCode
