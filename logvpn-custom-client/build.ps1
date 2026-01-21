# LogVPN 本地编译脚本 (Windows PowerShell)
# 用法: .\build.ps1 -Action compile|package|deploy

param(
    [string]$Action = "compile",
    [string]$Configuration = "Release",
    [string]$Platform = "x64",
    [string]$Version = "1.0.0"
)

# 颜色定义
$colors = @{
    "Success" = "Green"
    "Error" = "Red"
    "Warning" = "Yellow"
    "Info" = "Cyan"
}

function Write-Log {
    param([string]$Message, [string]$Level = "Info")
    $color = $colors[$Level]
    Write-Host "[$Level] $Message" -ForegroundColor $color
}

function Test-Prerequisites {
    Write-Log "检查编译环境..." "Info"
    
    # 检查 Visual Studio
    $vsPath = "C:\Program Files\Microsoft Visual Studio\2022\Community"
    if (-not (Test-Path $vsPath)) {
        Write-Log "错误：未找到 Visual Studio 2022 Community" "Error"
        Write-Log "请从 https://visualstudio.microsoft.com/zh-hans/downloads/ 下载并安装" "Warning"
        exit 1
    }
    
    # 检查 NSIS
    $nsisPath = "C:\Program Files (x86)\NSIS\makensis.exe"
    if (-not (Test-Path $nsisPath)) {
        Write-Log "警告：未找到 NSIS，打包功能将不可用" "Warning"
        Write-Log "请从 https://nsis.sourceforge.io/Download 下载并安装" "Warning"
    }
    
    # 检查 MSBuild
    $msbuildPath = "$vsPath\MSBuild\Current\Bin\MSBuild.exe"
    if (-not (Test-Path $msbuildPath)) {
        Write-Log "错误：未找到 MSBuild" "Error"
        exit 1
    }
    
    Write-Log "环境检查完成 ✓" "Success"
    return $msbuildPath
}

function Compile-Project {
    param([string]$MSBuildPath)
    
    Write-Log "开始编译项目..." "Info"
    
    # 检查解决方案文件
    $slnFile = ".\v2rayN\v2rayN.sln"
    if (-not (Test-Path $slnFile)) {
        Write-Log "错误：未找到 v2rayN.sln" "Error"
        Write-Log "请确保已克隆 v2rayN 源代码到当前目录" "Warning"
        exit 1
    }
    
    # 清理之前的编译
    Write-Log "清理之前的编译文件..." "Info"
    & $MSBuildPath $slnFile /t:Clean /p:Configuration=$Configuration /p:Platform=$Platform
    
    # 编译项目
    Write-Log "编译 $Configuration 配置..." "Info"
    & $MSBuildPath $slnFile /p:Configuration=$Configuration /p:Platform=$Platform /m
    
    if ($LASTEXITCODE -eq 0) {
        Write-Log "编译成功 ✓" "Success"
        return $true
    } else {
        Write-Log "编译失败" "Error"
        return $false
    }
}

function Package-Installer {
    Write-Log "打包安装程序..." "Info"
    
    $nsisPath = "C:\Program Files (x86)\NSIS\makensis.exe"
    if (-not (Test-Path $nsisPath)) {
        Write-Log "错误：NSIS 未安装" "Error"
        exit 1
    }
    
    # 检查 NSIS 脚本
    $nsiFile = ".\LogVPN_Installer.nsi"
    if (-not (Test-Path $nsiFile)) {
        Write-Log "错误：未找到 LogVPN_Installer.nsi" "Error"
        exit 1
    }
    
    # 编译安装程序
    Write-Log "使用 NSIS 编译安装程序..." "Info"
    & $nsisPath $nsiFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Log "安装程序打包成功 ✓" "Success"
        
        # 获取文件信息
        $exePath = ".\LogVPN_Setup.exe"
        if (Test-Path $exePath) {
            $fileSize = (Get-Item $exePath).Length / 1MB
            $fileMD5 = (Get-FileHash $exePath -Algorithm MD5).Hash
            
            Write-Log "文件大小: $([math]::Round($fileSize, 2)) MB" "Info"
            Write-Log "MD5 校验: $fileMD5" "Info"
            
            return $true
        }
    } else {
        Write-Log "安装程序打包失败" "Error"
        return $false
    }
}

function Deploy-ToServer {
    param([string]$ServerHost, [string]$ServerUser, [string]$PrivateKeyPath)
    
    Write-Log "部署到服务器..." "Info"
    
    # 检查 SSH 私钥
    if (-not (Test-Path $PrivateKeyPath)) {
        Write-Log "错误：SSH 私钥文件不存在: $PrivateKeyPath" "Error"
        exit 1
    }
    
    # 使用 SCP 上传文件
    $exePath = ".\LogVPN_Setup.exe"
    if (-not (Test-Path $exePath)) {
        Write-Log "错误：安装程序文件不存在" "Error"
        exit 1
    }
    
    Write-Log "上传文件到 $ServerHost..." "Info"
    
    # 这里需要使用 SSH 工具，例如 PuTTY 的 pscp.exe 或 OpenSSH
    # 假设已安装 OpenSSH for Windows
    $remotePath = "root@$ServerHost`:/home/ubuntu/log-vpn/client/public/downloads/"
    
    try {
        scp -i $PrivateKeyPath $exePath $remotePath
        Write-Log "文件上传成功 ✓" "Success"
        return $true
    } catch {
        Write-Log "文件上传失败: $_" "Error"
        return $false
    }
}

function Run-Tests {
    Write-Log "运行测试..." "Info"
    
    # 检查编译输出
    $outputDir = ".\v2rayN\bin\$Configuration\$Platform"
    if (-not (Test-Path $outputDir)) {
        Write-Log "错误：编译输出目录不存在" "Error"
        return $false
    }
    
    # 检查关键文件
    $requiredFiles = @(
        "v2rayN.exe",
        "v2rayN.exe.config",
        "v2rayUpgrade.exe"
    )
    
    $allFilesExist = $true
    foreach ($file in $requiredFiles) {
        $filePath = Join-Path $outputDir $file
        if (Test-Path $filePath) {
            Write-Log "✓ 找到 $file" "Success"
        } else {
            Write-Log "✗ 缺少 $file" "Error"
            $allFilesExist = $false
        }
    }
    
    if ($allFilesExist) {
        Write-Log "所有文件检查完成 ✓" "Success"
        return $true
    } else {
        Write-Log "文件检查失败" "Error"
        return $false
    }
}

# 主函数
function Main {
    Write-Log "========================================" "Info"
    Write-Log "LogVPN 编译工具" "Info"
    Write-Log "========================================" "Info"
    Write-Log "操作: $Action" "Info"
    Write-Log "配置: $Configuration" "Info"
    Write-Log "平台: $Platform" "Info"
    Write-Log "版本: $Version" "Info"
    Write-Log "========================================" "Info"
    
    # 测试先决条件
    $msbuildPath = Test-Prerequisites
    
    switch ($Action.ToLower()) {
        "compile" {
            $success = Compile-Project -MSBuildPath $msbuildPath
            if ($success) {
                $success = Run-Tests
            }
            if ($success) {
                Write-Log "编译完成！" "Success"
            } else {
                Write-Log "编译失败！" "Error"
                exit 1
            }
        }
        
        "package" {
            $success = Compile-Project -MSBuildPath $msbuildPath
            if ($success) {
                $success = Run-Tests
            }
            if ($success) {
                $success = Package-Installer
            }
            if ($success) {
                Write-Log "打包完成！" "Success"
            } else {
                Write-Log "打包失败！" "Error"
                exit 1
            }
        }
        
        "deploy" {
            # 部署需要额外的参数
            $serverHost = Read-Host "请输入服务器地址 (例如: 155.94.160.248)"
            $serverUser = Read-Host "请输入服务器用户名 (例如: root)"
            $privateKeyPath = Read-Host "请输入 SSH 私钥路径 (例如: C:\Users\YourName\.ssh\id_rsa)"
            
            $success = Deploy-ToServer -ServerHost $serverHost -ServerUser $serverUser -PrivateKeyPath $privateKeyPath
            if ($success) {
                Write-Log "部署完成！" "Success"
            } else {
                Write-Log "部署失败！" "Error"
                exit 1
            }
        }
        
        default {
            Write-Log "未知操作: $Action" "Error"
            Write-Log "可用操作: compile, package, deploy" "Info"
            exit 1
        }
    }
    
    Write-Log "========================================" "Info"
    Write-Log "任务完成！" "Success"
    Write-Log "========================================" "Info"
}

# 运行主函数
Main
