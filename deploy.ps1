# Deploy the current site build to the GitHub Pages gh-pages branch.
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

$scriptExitCode = 0

try {
    $projectDir = $PSScriptRoot
    if (-not $projectDir) {
        $projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    }
    Set-Location -LiteralPath $projectDir
    Write-Host "Project dir: $projectDir"

    Write-Host "[1/4] Installing locked dependencies..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "npm.cmd" -ArgumentList @("ci") -FailureMessage "Dependency installation failed"

    Write-Host "[2/4] Building the GitHub Pages bundle..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "npm.cmd" -ArgumentList @("run", "build:github") -FailureMessage "Build failed; deployment was not started"

    $distDir = Join-Path $projectDir "dist"
    $distIndex = Join-Path $distDir "index.html"
    if (-not (Test-Path -LiteralPath $distIndex -PathType Leaf)) {
        throw "Build output is incomplete: dist/index.html was not found."
    }

    Write-Host "[3/4] Preparing the deploy folder..." -ForegroundColor Cyan
    $deployRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
    $deployDir = [IO.Path]::GetFullPath((Join-Path $deployRoot "linxiaoqing-gh-pages"))
    $deployRootPrefix = $deployRoot.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    if (-not $deployDir.StartsWith($deployRootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Deploy folder resolved outside the expected temporary root."
    }

    if (Test-Path -LiteralPath $deployDir) {
        Remove-Item -LiteralPath $deployDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path $deployDir -Force | Out-Null
    Copy-Item -Path (Join-Path $distDir "*") -Destination $deployDir -Recurse -Force
    New-Item -ItemType File -Path (Join-Path $deployDir ".nojekyll") -Force | Out-Null

    $deployPrefix = $deployDir.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    $deployFiles = @(
        Get-ChildItem -LiteralPath $deployDir -Recurse -Force -File |
            ForEach-Object { $_.FullName.Substring($deployPrefix.Length) }
    )
    if ($deployFiles.Count -eq 0) {
        throw "No deploy files were found."
    }

    Write-Host "[4/4] Pushing the gh-pages branch..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "init") -FailureMessage "Could not initialize the deploy repository"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "branch", "-M", "gh-pages") -FailureMessage "Could not create the gh-pages branch"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "config", "user.name", "178517877qq-sketch") -FailureMessage "Could not set the deploy Git user name"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "config", "user.email", "178517877qq-sketch@users.noreply.github.com") -FailureMessage "Could not set the deploy Git email"

    $gitAddArguments = @("-C", $deployDir, "add", "--") + $deployFiles
    Invoke-CheckedNative -FilePath "git" -ArgumentList $gitAddArguments -FailureMessage "Could not stage the generated deploy files"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "commit", "-m", "Deploy resume site $(Get-Date -Format 'yyyy-MM-dd HH:mm')") -FailureMessage "Could not create the deploy commit"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "remote", "add", "origin", "https://github.com/178517877qq-sketch/linxiaoqing-resume-site.git") -FailureMessage "Could not configure the deploy remote"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "push", "--force", "origin", "gh-pages") -FailureMessage "Push to gh-pages failed"

    Write-Host "Deployment completed successfully." -ForegroundColor Green
    Write-Host "Check: https://178517877qq-sketch.github.io/linxiaoqing-resume-site/"
} catch {
    $scriptExitCode = 1
    Write-Host ""
    Write-Host "ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to close" | Out-Null
exit $scriptExitCode
