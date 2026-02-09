Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "Repository: DaBoB6868.github.io"
Write-Host "Remote: https://github.com/DaBoB6868/DaBoB6868.github.io"

$git = Get-Command git -ErrorAction SilentlyContinue
if (-not $git) {
  Write-Host "Git is not available in PATH. Install Git and try again."
  exit 1
}

$repoRoot = Resolve-Path -Path (Join-Path -Path $PSScriptRoot -ChildPath "..")
Set-Location -Path $repoRoot

$changes = git status --porcelain
if (-not $changes) {
  Write-Host "No changes to commit."
  exit 0
}

Write-Host "Changes detected:"
$changes | Write-Host

$commitMessage = Read-Host "Enter a commit message"
if (-not $commitMessage) {
  Write-Host "Commit message is required."
  exit 1
}

git add -A

git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
  Write-Host "Commit failed."
  exit 1
}

$branch = git rev-parse --abbrev-ref HEAD
if (-not $branch) {
  Write-Host "Unable to determine branch."
  exit 1
}

git push origin $branch
if ($LASTEXITCODE -ne 0) {
  Write-Host "Push failed. Check your authentication and remote settings."
  exit 1
}

Write-Host "Push complete on branch $branch."