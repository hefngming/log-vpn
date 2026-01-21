# LogVPN GitHub 自动化配置脚本
# 一键完成 SSH 密钥生成、服务器配置、GitHub 仓库初始化和源代码推送

param(
    [Parameter(Mandatory=$true, HelpMessage="您的 GitHub 用户名")]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "logvpn-client",
    
    [Parameter(Mandatory=$false)]
    [string]$ServerHost = "155.94.160.248",
    
    [Parameter(Mandatory=$false)]
    [string]$ServerUser = "ubuntu"
)

# 颜色定义
$ErrorActionPreference = "Continue"

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

# 步骤 1：生成 SSH 密钥对
function Generate-SSHKeys {
    Write-Header "步骤 1：生成 SSH 密钥对"
    
    $sshDir = "$env:USERPROFILE\.ssh"
    $keyPath = "$sshDir\logvpn_deploy"
    
    # 创建 .ssh 目录
    if (!(Test-Path $sshDir)) {
        New-Item -ItemType Directory -Path $sshDir -Force | Out-Null
        Write-Success "创建 .ssh 目录"
    }
    
    # 检查密钥是否已存在
    if (Test-Path $keyPath) {
        Write-Warning-Custom "SSH 密钥已存在: $keyPath"
        $overwrite = Read-Host "是否覆盖现有密钥? (y/N)"
        if ($overwrite -ne "y") {
            Write-Info "使用现有密钥"
            return $keyPath
        }
    }
    
    # 生成 SSH 密钥
    Write-Info "正在生成 SSH 密钥对..."
    ssh-keygen -t rsa -b 4096 -f $keyPath -N '""' -C "logvpn-deploy@github"
    
    if (Test-Path $keyPath) {
        Write-Success "SSH 密钥对已生成"
        Write-Info "私钥: $keyPath"
        Write-Info "公钥: $keyPath.pub"
        return $keyPath
    }
    else {
        Write-Error-Custom "SSH 密钥生成失败"
        exit 1
    }
}

# 步骤 2：配置服务器公钥
function Configure-ServerKey {
    param([string]$KeyPath)
    
    Write-Header "步骤 2：配置服务器公钥"
    
    $publicKey = Get-Content "$KeyPath.pub"
    
    Write-Info "正在配置服务器 $ServerHost ..."
    Write-Warning-Custom "需要输入服务器密码"
    
    # 尝试添加公钥到服务器
    $command = "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '$publicKey' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && echo 'SSH key configured successfully'"
    
    try {
        $result = ssh "$ServerUser@$ServerHost" $command
        if ($result -match "configured successfully") {
            Write-Success "服务器公钥已配置"
        }
        else {
            Write-Warning-Custom "服务器配置可能未成功，请手动验证"
        }
    }
    catch {
        Write-Error-Custom "无法连接到服务器"
        Write-Info "请手动将以下公钥添加到服务器的 ~/.ssh/authorized_keys:"
        Write-Host $publicKey -ForegroundColor Yellow
    }
}

# 步骤 3：测试 SSH 连接
function Test-SSHConnection {
    param([string]$KeyPath)
    
    Write-Header "步骤 3：测试 SSH 连接"
    
    Write-Info "正在测试 SSH 连接..."
    
    try {
        $result = ssh -i $KeyPath -o "StrictHostKeyChecking=no" "$ServerUser@$ServerHost" "echo 'Connection successful'"
        if ($result -match "successful") {
            Write-Success "SSH 连接测试成功"
            return $true
        }
        else {
            Write-Warning-Custom "SSH 连接测试失败"
            return $false
        }
    }
    catch {
        Write-Warning-Custom "SSH 连接测试失败"
        return $false
    }
}

# 步骤 4：生成 GitHub Secrets 配置文件
function Generate-GitHubSecretsFile {
    param([string]$KeyPath)
    
    Write-Header "步骤 4：生成 GitHub Secrets 配置文件"
    
    $privateKey = Get-Content $KeyPath -Raw
    $secretsFile = "github-secrets-config.txt"
    
    $content = @"
========================================
GitHub Secrets 配置信息
========================================

请在 GitHub 仓库中配置以下 Secrets:
https://github.com/$GitHubUsername/$RepoName/settings/secrets/actions

---

1. SSH_PRIVATE_KEY
   Name: SSH_PRIVATE_KEY
   Value: (复制下面的内容)

$privateKey

---

2. SERVER_HOST
   Name: SERVER_HOST
   Value: $ServerHost

---

3. SERVER_USER
   Name: SERVER_USER
   Value: $ServerUser

========================================
配置步骤
========================================

1. 访问: https://github.com/$GitHubUsername/$RepoName/settings/secrets/actions
2. 点击 "New repository secret"
3. 依次添加上述三个 Secrets
4. 保存后返回此脚本继续

========================================
"@
    
    Set-Content -Path $secretsFile -Value $content
    Write-Success "GitHub Secrets 配置文件已生成: $secretsFile"
    Write-Info "请打开此文件并按照说明配置 GitHub Secrets"
    
    # 打开文件
    Start-Process notepad.exe $secretsFile
    
    return $secretsFile
}

# 步骤 5：初始化 Git 仓库
function Initialize-GitRepository {
    Write-Header "步骤 5：初始化 Git 仓库"
    
    # 检查是否已是 Git 仓库
    if (Test-Path ".\.git") {
        Write-Info "已是 Git 仓库"
    }
    else {
        git init
        Write-Success "Git 仓库已初始化"
    }
    
    # 配置 Git 用户信息
    $gitUser = git config user.name
    if ([string]::IsNullOrEmpty($gitUser)) {
        git config user.name "LogVPN Build Bot"
        git config user.email "build@logvpn.local"
        Write-Success "Git 用户信息已配置"
    }
    
    # 配置远程仓库
    $remoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"
    $remoteExists = git remote | Select-String "origin"
    
    if ($remoteExists) {
        git remote set-url origin $remoteUrl
        Write-Info "远程仓库 URL 已更新"
    }
    else {
        git remote add origin $remoteUrl
        Write-Success "远程仓库已添加"
    }
    
    Write-Info "远程仓库: $remoteUrl"
}

# 步骤 6：准备必要文件
function Prepare-RequiredFiles {
    Write-Header "步骤 6：准备必要文件"
    
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

# GitHub Secrets
github-secrets-config.txt
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

## GitHub Actions

This project uses GitHub Actions for automated builds and deployments.

See `.github/workflows/electron-build.yml` for details.

## License

MIT
"@
        Set-Content -Path "README.md" -Value $readmeContent
        Write-Success "README.md 已创建"
    }
}

# 步骤 7：提交并推送代码
function Commit-AndPush {
    Write-Header "步骤 7：提交并推送代码"
    
    # 检查是否有更改
    $status = git status --porcelain
    
    if ($status) {
        Write-Info "发现文件更改，正在提交..."
        
        git add .
        Write-Success "文件已暂存"
        
        git commit -m "feat: Initial commit - LogVPN Electron client with GitHub Actions"
        Write-Success "文件已提交"
    }
    else {
        Write-Info "没有文件更改"
    }
    
    # 推送到 GitHub
    Write-Info "正在推送代码到 GitHub..."
    Write-Warning-Custom "如果这是首次推送，可能需要输入 GitHub 凭据"
    
    try {
        $currentBranch = git rev-parse --abbrev-ref HEAD
        git push -u origin $currentBranch
        Write-Success "代码已推送到 GitHub"
        return $true
    }
    catch {
        Write-Error-Custom "推送失败"
        Write-Info "请手动运行: git push -u origin main"
        return $false
    }
}

# 步骤 8：验证配置
function Verify-Configuration {
    Write-Header "步骤 8：验证配置"
    
    $checks = @(
        @{Name="package.json"; Required=$true},
        @{Name="electron-builder.json"; Required=$true},
        @{Name=".github\workflows\electron-build.yml"; Required=$true},
        @{Name="src\main.ts"; Required=$false},
        @{Name="tsconfig.json"; Required=$false}
    )
    
    $allRequired = $true
    foreach ($check in $checks) {
        if (Test-Path $check.Name) {
            Write-Success "✓ $($check.Name)"
        }
        else {
            if ($check.Required) {
                Write-Error-Custom "✗ $($check.Name) (必需)"
                $allRequired = $false
            }
            else {
                Write-Warning-Custom "✗ $($check.Name) (可选)"
            }
        }
    }
    
    if ($allRequired) {
        Write-Success "所有必需文件都已存在"
    }
    else {
        Write-Warning-Custom "部分必需文件缺失"
    }
    
    return $allRequired
}

# 步骤 9：显示后续步骤
function Show-NextSteps {
    Write-Header "后续步骤"
    
    Write-Host ""
    Write-Host "🎉 自动化配置已完成！" -ForegroundColor Green
    Write-Host ""
    Write-Host "接下来请完成以下步骤:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. 在 GitHub 上创建仓库 (如果还没有):" -ForegroundColor Cyan
    Write-Host "   https://github.com/new" -ForegroundColor White
    Write-Host "   Repository name: $RepoName" -ForegroundColor White
    Write-Host ""
    Write-Host "2. 配置 GitHub Secrets:" -ForegroundColor Cyan
    Write-Host "   https://github.com/$GitHubUsername/$RepoName/settings/secrets/actions" -ForegroundColor White
    Write-Host "   (参考 github-secrets-config.txt 文件)" -ForegroundColor White
    Write-Host ""
    Write-Host "3. 查看 GitHub Actions 工作流:" -ForegroundColor Cyan
    Write-Host "   https://github.com/$GitHubUsername/$RepoName/actions" -ForegroundColor White
    Write-Host ""
    Write-Host "4. 监控编译过程:" -ForegroundColor Cyan
    Write-Host "   - 查看工作流日志" -ForegroundColor White
    Write-Host "   - 验证编译输出" -ForegroundColor White
    Write-Host "   - 下载编译结果" -ForegroundColor White
    Write-Host ""
    Write-Host "5. 验证部署:" -ForegroundColor Cyan
    Write-Host "   https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe" -ForegroundColor White
    Write-Host ""
}

# 主函数
function Main {
    Write-Header "LogVPN GitHub 自动化配置脚本"
    
    Write-Info "GitHub 用户名: $GitHubUsername"
    Write-Info "仓库名称: $RepoName"
    Write-Info "服务器地址: $ServerHost"
    Write-Info "服务器用户: $ServerUser"
    Write-Host ""
    
    # 确认继续
    $confirm = Read-Host "是否继续? (Y/n)"
    if ($confirm -eq "n") {
        Write-Info "已取消"
        exit 0
    }
    
    # 执行步骤
    $keyPath = Generate-SSHKeys
    Configure-ServerKey -KeyPath $keyPath
    $sshWorking = Test-SSHConnection -KeyPath $keyPath
    $secretsFile = Generate-GitHubSecretsFile -KeyPath $keyPath
    
    Write-Host ""
    Write-Warning-Custom "请先在 GitHub 上配置 Secrets，然后按任意键继续..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    Initialize-GitRepository
    Prepare-RequiredFiles
    $pushed = Commit-AndPush
    $verified = Verify-Configuration
    
    Show-NextSteps
    
    if ($pushed -and $verified) {
        Write-Success "✓ 所有步骤已完成！"
    }
    else {
        Write-Warning-Custom "部分步骤需要手动完成"
    }
}

# 运行主函数
try {
    Main
}
catch {
    Write-Error-Custom "发生错误: $_"
    exit 1
}
