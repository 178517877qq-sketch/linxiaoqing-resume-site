# Validate and push main, then deploy the validated build to gh-pages.
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
        throw "Publishing requires the main branch. Current branch: $currentBranch"
    }

    Write-Host "[1/7] Installing locked dependencies..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "npm.cmd" -ArgumentList @("ci") -FailureMessage "Dependency installation failed"

    Write-Host "[2/7] Building the GitHub Pages bundle..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "npm.cmd" -ArgumentList @("run", "build:github") -FailureMessage "Build failed; source changes were not staged or pushed"

    $distDir = Join-Path $projectDir "dist"
    $distIndex = Join-Path $distDir "index.html"
    if (-not (Test-Path -LiteralPath $distIndex -PathType Leaf)) {
        throw "Build output is incomplete: dist/index.html was not found."
    }

    Write-Host "[3/7] Staging approved source paths..." -ForegroundColor Cyan
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

    Write-Host "[4/7] Creating a source commit when needed..." -ForegroundColor Cyan
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

    Write-Host "[5/7] Pushing main..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("push", "origin", "main") -FailureMessage "Push to main failed"

    Write-Host "[6/7] Preparing the deploy folder..." -ForegroundColor Cyan
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

    Write-Host "[7/7] Pushing the gh-pages branch..." -ForegroundColor Cyan
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "init") -FailureMessage "Could not initialize the deploy repository"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "branch", "-M", "gh-pages") -FailureMessage "Could not create the gh-pages branch"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "config", "user.name", "178517877qq-sketch") -FailureMessage "Could not set the deploy Git user name"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "config", "user.email", "178517877qq-sketch@users.noreply.github.com") -FailureMessage "Could not set the deploy Git email"

    $deployGitAddArguments = @("-C", $deployDir, "add", "--") + $deployFiles
    Invoke-CheckedNative -FilePath "git" -ArgumentList $deployGitAddArguments -FailureMessage "Could not stage the generated deploy files"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "commit", "-m", "Deploy resume site $(Get-Date -Format 'yyyy-MM-dd HH:mm')") -FailureMessage "Could not create the deploy commit"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "remote", "add", "origin", "https://github.com/178517877qq-sketch/linxiaoqing-resume-site.git") -FailureMessage "Could not configure the deploy remote"
    Invoke-CheckedNative -FilePath "git" -ArgumentList @("-C", $deployDir, "push", "--force", "origin", "gh-pages") -FailureMessage "Push to gh-pages failed; main was pushed but the live site was not updated"

    Write-Host "Source and deployment completed successfully." -ForegroundColor Green
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
