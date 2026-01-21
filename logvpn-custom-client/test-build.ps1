# LogVPN 编译验证脚本
# 用途：验证本地编译环境和编译结果

param(
    [string]$Action = "verify",
    [string]$Configuration = "Release",
    [string]$Platform = "x64"
)

# 颜色定义
$colors = @{
    "Success" = "Green"
    "Error" = "Red"
    "Warning" = "Yellow"
    "Info" = "Cyan"
    "Verbose" = "Gray"
}

# 日志函数
function Write-Log {
    param([string]$Message, [string]$Level = "Info")
    $color = $colors[$Level]
    $timestamp = Get-Date -Format "HH:mm:ss"
    Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
}

# 检查环境
function Test-Environment {
    Write-Log "========================================" "Info"
    Write-Log "LogVPN 编译环境检查" "Info"
    Write-Log "========================================" "Info"
    
    $allChecked = $true
    
    # 检查 Visual Studio
    Write-Log "检查 Visual Studio 2022..." "Info"
    $vsPath = "C:\Program Files\Microsoft Visual Studio\2022\Community"
    if (Test-Path $vsPath) {
        Write-Log "✓ Visual Studio 2022 Community 已安装" "Success"
    } else {
        Write-Log "✗ Visual Studio 2022 Community 未安装" "Error"
        $allChecked = $false
    }
    
    # 检查 MSBuild
    Write-Log "检查 MSBuild..." "Info"
    $msbuildPath = "$vsPath\MSBuild\Current\Bin\MSBuild.exe"
    if (Test-Path $msbuildPath) {
        Write-Log "✓ MSBuild 已安装" "Success"
        $msbuildVersion = & $msbuildPath -version | Select-Object -First 1
        Write-Log "  版本: $msbuildVersion" "Verbose"
    } else {
        Write-Log "✗ MSBuild 未安装" "Error"
        $allChecked = $false
    }
    
    # 检查 .NET Framework 4.8
    Write-Log "检查 .NET Framework 4.8..." "Info"
    $dotnetPath = "C:\Program Files\dotnet\dotnet.exe"
    if (Test-Path $dotnetPath) {
        Write-Log "✓ .NET Framework 已安装" "Success"
    } else {
        Write-Log "⚠ .NET Framework 可能未安装" "Warning"
    }
    
    # 检查 NSIS
    Write-Log "检查 NSIS..." "Info"
    $nsisPath = "C:\Program Files (x86)\NSIS\makensis.exe"
    if (Test-Path $nsisPath) {
        Write-Log "✓ NSIS 已安装" "Success"
    } else {
        Write-Log "⚠ NSIS 未安装（打包功能将不可用）" "Warning"
    }
    
    # 检查 Git
    Write-Log "检查 Git..." "Info"
    $gitPath = "C:\Program Files\Git\bin\git.exe"
    if (Test-Path $gitPath) {
        Write-Log "✓ Git 已安装" "Success"
    } else {
        Write-Log "⚠ Git 未安装（版本控制功能将不可用）" "Warning"
    }
    
    # 检查 OpenSSH
    Write-Log "检查 OpenSSH..." "Info"
    $sshPath = "C:\Windows\System32\OpenSSH\ssh.exe"
    if (Test-Path $sshPath) {
        Write-Log "✓ OpenSSH 已安装" "Success"
    } else {
        Write-Log "⚠ OpenSSH 未安装（部署功能将不可用）" "Warning"
    }
    
    Write-Log "========================================" "Info"
    if ($allChecked) {
        Write-Log "环境检查完成：所有必需组件已安装 ✓" "Success"
    } else {
        Write-Log "环境检查完成：存在缺失的必需组件" "Error"
    }
    Write-Log "========================================" "Info"
    
    return $allChecked
}

# 检查编译输出
function Test-BuildOutput {
    Write-Log "========================================" "Info"
    Write-Log "编译输出检查" "Info"
    Write-Log "========================================" "Info"
    
    $outputDir = ".\v2rayN\bin\$Configuration\$Platform"
    
    if (-not (Test-Path $outputDir)) {
        Write-Log "✗ 编译输出目录不存在: $outputDir" "Error"
        return $false
    }
    
    Write-Log "编译输出目录: $outputDir" "Info"
    
    # 检查必需文件
    $requiredFiles = @(
        "v2rayN.exe",
        "v2rayN.exe.config",
        "v2rayUpgrade.exe"
    )
    
    $allFilesExist = $true
    foreach ($file in $requiredFiles) {
        $filePath = Join-Path $outputDir $file
        if (Test-Path $filePath) {
            $fileSize = (Get-Item $filePath).Length / 1MB
            Write-Log "✓ $file ($([math]::Round($fileSize, 2)) MB)" "Success"
        } else {
            Write-Log "✗ 缺少 $file" "Error"
            $allFilesExist = $false
        }
    }
    
    # 检查依赖文件
    Write-Log "检查依赖文件..." "Info"
    $dllFiles = Get-ChildItem $outputDir -Filter "*.dll" | Select-Object -First 5
    if ($dllFiles) {
        Write-Log "✓ 找到 $($dllFiles.Count) 个 DLL 文件" "Success"
    } else {
        Write-Log "⚠ 未找到 DLL 文件" "Warning"
    }
    
    Write-Log "========================================" "Info"
    if ($allFilesExist) {
        Write-Log "编译输出检查完成：所有必需文件已生成 ✓" "Success"
    } else {
        Write-Log "编译输出检查完成：存在缺失的文件" "Error"
    }
    Write-Log "========================================" "Info"
    
    return $allFilesExist
}

# 检查安装程序
function Test-Installer {
    Write-Log "========================================" "Info"
    Write-Log "安装程序检查" "Info"
    Write-Log "========================================" "Info"
    
    $exePath = ".\LogVPN_Setup.exe"
    
    if (-not (Test-Path $exePath)) {
        Write-Log "✗ 安装程序不存在: $exePath" "Error"
        return $false
    }
    
    # 检查文件大小
    $fileSize = (Get-Item $exePath).Length / 1MB
    Write-Log "文件大小: $([math]::Round($fileSize, 2)) MB" "Info"
    
    if ($fileSize -lt 10) {
        Write-Log "⚠ 文件大小过小，可能不完整" "Warning"
    } elseif ($fileSize -gt 100) {
        Write-Log "⚠ 文件大小过大，可能包含不必要的文件" "Warning"
    } else {
        Write-Log "✓ 文件大小正常" "Success"
    }
    
    # 计算校验和
    Write-Log "计算文件校验和..." "Info"
    $md5 = (Get-FileHash $exePath -Algorithm MD5).Hash
    $sha256 = (Get-FileHash $exePath -Algorithm SHA256).Hash
    
    Write-Log "MD5: $md5" "Verbose"
    Write-Log "SHA256: $sha256" "Verbose"
    
    # 检查文件签名
    Write-Log "检查文件签名..." "Info"
    $signature = Get-AuthenticodeSignature $exePath
    if ($signature.Status -eq "Valid") {
        Write-Log "✓ 文件签名有效" "Success"
    } elseif ($signature.Status -eq "NotSigned") {
        Write-Log "⚠ 文件未签名（这是正常的）" "Warning"
    } else {
        Write-Log "⚠ 文件签名无效: $($signature.Status)" "Warning"
    }
    
    Write-Log "========================================" "Info"
    Write-Log "安装程序检查完成 ✓" "Success"
    Write-Log "========================================" "Info"
    
    return $true
}

# 测试安装
function Test-Installation {
    Write-Log "========================================" "Info"
    Write-Log "安装测试" "Info"
    Write-Log "========================================" "Info"
    
    $testDir = "C:\LogVPN_InstallTest"
    $exePath = ".\LogVPN_Setup.exe"
    
    if (-not (Test-Path $exePath)) {
        Write-Log "✗ 安装程序不存在" "Error"
        return $false
    }
    
    # 清理测试目录
    if (Test-Path $testDir) {
        Write-Log "清理之前的测试目录..." "Info"
        Remove-Item -Path $testDir -Recurse -Force
    }
    
    # 创建测试目录
    New-Item -ItemType Directory -Path $testDir -Force | Out-Null
    
    # 运行安装程序
    Write-Log "运行安装程序（静默模式）..." "Info"
    & $exePath /S /D="$testDir"
    
    # 等待安装完成
    Start-Sleep -Seconds 3
    
    # 检查安装结果
    if (Test-Path "$testDir\v2rayN.exe") {
        Write-Log "✓ 应用程序已安装" "Success"
        
        # 获取应用信息
        $appInfo = Get-Item "$testDir\v2rayN.exe"
        Write-Log "  路径: $($appInfo.FullName)" "Verbose"
        Write-Log "  大小: $([math]::Round($appInfo.Length / 1MB, 2)) MB" "Verbose"
        
        Write-Log "========================================" "Info"
        Write-Log "安装测试完成 ✓" "Success"
        Write-Log "========================================" "Info"
        
        return $true
    } else {
        Write-Log "✗ 应用程序安装失败" "Error"
        Write-Log "========================================" "Info"
        Write-Log "安装测试完成（失败）" "Error"
        Write-Log "========================================" "Info"
        
        return $false
    }
}

# 生成测试报告
function Generate-TestReport {
    Write-Log "========================================" "Info"
    Write-Log "生成测试报告..." "Info"
    Write-Log "========================================" "Info"
    
    $reportPath = ".\build-test-report.txt"
    $report = @()
    
    $report += "LogVPN 编译测试报告"
    $report += "生成时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    $report += ""
    $report += "系统信息:"
    $report += "  操作系统: $(Get-WmiObject Win32_OperatingSystem | Select-Object -ExpandProperty Caption)"
    $report += "  处理器: $(Get-WmiObject Win32_Processor | Select-Object -ExpandProperty Name)"
    $report += "  内存: $([math]::Round((Get-WmiObject Win32_ComputerSystem).TotalPhysicalMemory / 1GB, 2)) GB"
    $report += ""
    $report += "编译配置:"
    $report += "  配置: $Configuration"
    $report += "  平台: $Platform"
    $report += ""
    
    $report | Out-File -FilePath $reportPath -Encoding UTF8
    
    Write-Log "报告已保存: $reportPath" "Success"
}

# 主函数
function Main {
    switch ($Action.ToLower()) {
        "verify" {
            $envOk = Test-Environment
            if ($envOk) {
                Write-Log "环境验证通过，可以开始编译" "Success"
            } else {
                Write-Log "环境验证失败，请安装缺失的组件" "Error"
                exit 1
            }
        }
        
        "output" {
            $outputOk = Test-BuildOutput
            if ($outputOk) {
                Write-Log "编译输出验证通过" "Success"
            } else {
                Write-Log "编译输出验证失败" "Error"
                exit 1
            }
        }
        
        "installer" {
            $installerOk = Test-Installer
            if ($installerOk) {
                Write-Log "安装程序验证通过" "Success"
            } else {
                Write-Log "安装程序验证失败" "Error"
                exit 1
            }
        }
        
        "install" {
            $installOk = Test-Installation
            if ($installOk) {
                Write-Log "安装测试通过" "Success"
            } else {
                Write-Log "安装测试失败" "Error"
                exit 1
            }
        }
        
        "all" {
            $envOk = Test-Environment
            if (-not $envOk) {
                Write-Log "环境验证失败，停止测试" "Error"
                exit 1
            }
            
            $outputOk = Test-BuildOutput
            if (-not $outputOk) {
                Write-Log "编译输出验证失败，停止测试" "Error"
                exit 1
            }
            
            $installerOk = Test-Installer
            if (-not $installerOk) {
                Write-Log "安装程序验证失败，停止测试" "Error"
                exit 1
            }
            
            $installOk = Test-Installation
            if (-not $installOk) {
                Write-Log "安装测试失败" "Error"
                exit 1
            }
            
            Generate-TestReport
            Write-Log "所有测试完成 ✓" "Success"
        }
        
        default {
            Write-Log "未知操作: $Action" "Error"
            Write-Log "可用操作: verify, output, installer, install, all" "Info"
            exit 1
        }
    }
}

# 运行主函数
Main
