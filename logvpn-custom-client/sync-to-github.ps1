# LogVPN GitHub 同步脚本 (PowerShell)
# 用于将本地源代码同步到 GitHub 仓库

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "logvpn-client"
)

# 颜色定义
function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Blue
    Write-Host $Message -ForegroundColor Blue
    Write-Host "========================================" -ForegroundColor Blue
    Write-Host ""
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Warning-Custom {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Cyan
}

# 检查前置条件
function Check-Prerequisites {
    Write-Header "检查前置条件"
    
    # 检查 Git
    try {
        $gitVersion = git --version
        Write-Success "Git 已安装: $gitVersion"
    }
    catch {
        Write-Error-Custom "Git 未安装或不在 PATH 中"
        exit 1
    }
    
    # 检查 GitHub 用户名
    if ([string]::IsNullOrEmpty($GitHubUsername)) {
        Write-Error-Custom "请提供 GitHub 用户名"
        exit 1
    }
    Write-Success "GitHub 用户名: $GitHubUsername"
    
    # 获取当前目录
    $script:LocalPath = Get-Location
    Write-Success "本地路径: $LocalPath"
}

# 初始化 Git 仓库
function Initialize-GitRepo {
    Write-Header "初始化 Git 仓库"
    
    # 检查是否已是 Git 仓库
    if (Test-Path ".\.git") {
        Write-Info "已是 Git 仓库，跳过初始化"
        return
    }
    
    # 初始化 Git
    git init
    Write-Success "Git 仓库已初始化"
    
    # 配置 Git 用户信息
    git config user.name "LogVPN Build Bot"
    git config user.email "build@logvpn.local"
    Write-Success "Git 用户信息已配置"
}

# 配置远程仓库
function Setup-Remote {
    Write-Header "配置远程仓库"
    
    $remoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"
    
    # 检查远程仓库是否已存在
    $remoteExists = git remote | Select-String "origin"
    
    if ($remoteExists) {
        Write-Info "远程仓库已存在，更新 URL"
        git remote set-url origin $remoteUrl
    }
    else {
        Write-Info "添加远程仓库"
        git remote add origin $remoteUrl
    }
    
    Write-Success "远程仓库 URL: $remoteUrl"
}

# 准备文件
function Prepare-Files {
    Write-Header "准备文件"
    
    # 创建必要的目录
    $directories = @("src", "assets", ".github\workflows")
    foreach ($dir in $directories) {
        if (!(Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }
    }
    Write-Success "目录结构已创建"
    
    # 创建 .gitignore
    if (!(Test-Path ".gitignore")) {
        $gitignoreContent = @"
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build output
dist/
out/
*.exe
*.msi

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.*.local

# Temporary
temp/
tmp/
*.tmp
"@
        Set-Content -Path ".gitignore" -Value $gitignoreContent
        Write-Success ".gitignore 已创建"
    }
    
    # 创建 README.md
    if (!(Test-Path "README.md")) {
        $readmeContent = @"
# LogVPN Client

Secure, Fast, Global VPN Client

## Features

- OAuth 自动登录
- 自动订阅获取
- 一键连接
- 流量统计
- 设备指纹防共享
- 自动更新

## Build

``````bash
npm install
npm run build
npm run dist:win
``````

## Development

``````bash
npm install
npm run dev
``````

## License

MIT
"@
        Set-Content -Path "README.md" -Value $readmeContent
        Write-Success "README.md 已创建"
    }
}

# 提交文件
function Commit-Files {
    Write-Header "提交文件"
    
    # 检查是否有更改
    $status = git status --porcelain
    
    if ($status) {
        Write-Info "发现文件更改，正在提交..."
        
        git add .
        Write-Success "文件已暂存"
        
        git commit -m "Initial commit: LogVPN Electron client setup"
        Write-Success "文件已提交"
    }
    else {
        Write-Info "没有文件更改"
    }
}

# 推送到 GitHub
function Push-ToGitHub {
    Write-Header "推送到 GitHub"
    
    # 获取当前分支
    $currentBranch = git rev-parse --abbrev-ref HEAD
    Write-Info "当前分支: $currentBranch"
    
    # 推送代码
    Write-Info "正在推送代码到 GitHub..."
    try {
        git push -u origin $currentBranch
        Write-Success "代码已推送到 GitHub"
    }
    catch {
        Write-Warning-Custom "推送失败，可能是因为仓库为空或需要身份验证"
        Write-Info "请手动运行: git push -u origin $currentBranch"
    }
}

# 验证配置
function Verify-Setup {
    Write-Header "验证配置"
    
    $files = @(
        "package.json",
        "electron-builder.json",
        ".github\workflows\electron-build.yml",
        "src\main.ts",
        "tsconfig.json"
    )
    
    $missing = 0
    foreach ($file in $files) {
        if (Test-Path $file) {
            Write-Success "✓ $file"
        }
        else {
            Write-Warning-Custom "✗ $file (可选)"
            $missing++
        }
    }
    
    if ($missing -eq 0) {
        Write-Success "所有关键文件都已存在"
    }
    else {
        Write-Warning-Custom "部分文件缺失，请手动创建"
    }
}

# 显示后续步骤
function Show-NextSteps {
    Write-Header "后续步骤"
    
    Write-Host ""
    Write-Host "1. 在 GitHub 上配置 Secrets:" -ForegroundColor Yellow
    Write-Host "   - SSH_PRIVATE_KEY: 您的 SSH 私钥"
    Write-Host "   - SERVER_HOST: 155.94.160.248"
    Write-Host "   - SERVER_USER: ubuntu"
    Write-Host ""
    Write-Host "2. 访问 GitHub Actions:" -ForegroundColor Yellow
    Write-Host "   https://github.com/$GitHubUsername/$RepoName/actions"
    Write-Host ""
    Write-Host "3. 监控编译过程:" -ForegroundColor Yellow
    Write-Host "   - 查看工作流日志"
    Write-Host "   - 验证编译输出"
    Write-Host ""
    Write-Host "4. 下载编译结果:" -ForegroundColor Yellow
    Write-Host "   https://github.com/$GitHubUsername/$RepoName/actions"
    Write-Host ""
}

# 主函数
function Main {
    Write-Header "LogVPN GitHub 同步脚本"
    
    Check-Prerequisites
    Initialize-GitRepo
    Setup-Remote
    Prepare-Files
    Commit-Files
    Push-ToGitHub
    Verify-Setup
    Show-NextSteps
    
    Write-Success "同步完成！"
}

# 运行主函数
Main
