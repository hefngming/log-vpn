# LogVPN 快速开始指南

本指南提供了最快的方式来编译、打包和部署 LogVPN 客户端。

---

## ⚡ 5 分钟快速编译

### 前置条件

- ✅ Windows 10/11 64位
- ✅ Visual Studio 2022 Community（已安装）
- ✅ .NET Framework 4.8 SDK（已安装）
- ✅ NSIS 3.x（已安装）
- ✅ v2rayN 源代码（已克隆）

### 快速编译步骤

```powershell
# 1. 进入项目目录
cd C:\Projects\v2rayN

# 2. 运行编译脚本（一键编译）
.\build.ps1 -Action package

# 3. 等待编译完成（约 2-3 分钟）
# 编译完成后会生成 LogVPN_Setup.exe
```

### 验证编译结果

```powershell
# 检查文件是否生成
Test-Path "LogVPN_Setup.exe"

# 查看文件大小
(Get-Item "LogVPN_Setup.exe").Length / 1MB

# 计算校验和
(Get-FileHash "LogVPN_Setup.exe" -Algorithm MD5).Hash
```

---

## 🚀 一键部署到服务器

### 前置条件

- ✅ SSH 私钥已配置
- ✅ 服务器 IP：155.94.160.248
- ✅ 服务器用户：root

### 部署步骤

```powershell
# 1. 上传安装程序到服务器
scp -i ~/.ssh/id_rsa LogVPN_Setup.exe root@155.94.160.248:/home/ubuntu/log-vpn/client/public/downloads/

# 2. 验证上传
ssh -i ~/.ssh/id_rsa root@155.94.160.248 "ls -lh /home/ubuntu/log-vpn/client/public/downloads/LogVPN_Setup.exe"

# 3. 完成！用户现在可以从以下地址下载：
# https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe
```

---

## 🔄 自动化编译和部署（GitHub Actions）

### 前置条件

- ✅ GitHub 账号
- ✅ GitHub 仓库已创建
- ✅ SSH 密钥已配置到 GitHub Secrets

### 自动化步骤

```bash
# 1. 推送代码到 GitHub
git push origin main

# 2. 创建版本标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 3. GitHub Actions 自动开始编译和部署
# 进度查看：https://github.com/YOUR_USERNAME/logvpn-client/actions
```

---

## 📋 完整工作流

### 本地开发流程

```
1. 修改源代码
   ↓
2. 本地编译测试
   ↓
3. 推送到 GitHub
   ↓
4. GitHub Actions 自动编译
   ↓
5. 自动部署到服务器
   ↓
6. 用户下载最新版本
```

### 命令速查表

| 操作 | 命令 |
|-----|------|
| 本地编译 | `.\build.ps1 -Action compile` |
| 本地打包 | `.\build.ps1 -Action package` |
| 上传到服务器 | `scp LogVPN_Setup.exe root@155.94.160.248:/home/ubuntu/log-vpn/client/public/downloads/` |
| 查看服务器文件 | `ssh root@155.94.160.248 ls -lh /home/ubuntu/log-vpn/client/public/downloads/` |
| 推送代码 | `git push origin main` |
| 创建版本标签 | `git tag -a v1.0.0 -m "Release"` |
| 推送标签 | `git push origin v1.0.0` |

---

## 🧪 测试安装程序

```powershell
# 创建测试目录
New-Item -ItemType Directory -Path "C:\LogVPN_Test" -Force

# 运行安装程序
.\LogVPN_Setup.exe /S /D="C:\LogVPN_Test"

# 启动应用
& "C:\LogVPN_Test\v2rayN.exe"

# 测试登录、订阅、连接等功能
```

---

## 📊 版本管理

### 版本号规则

使用 Semantic Versioning（语义化版本）：`MAJOR.MINOR.PATCH`

- **MAJOR**：不兼容的 API 更改
- **MINOR**：向后兼容的功能添加
- **PATCH**：向后兼容的 bug 修复

### 版本发布流程

```bash
# 1. 修改版本号（在 AssemblyInfo.cs 中）
# [assembly: AssemblyVersion("1.0.1.0")]

# 2. 提交更改
git add .
git commit -m "Bump version to 1.0.1"

# 3. 创建版本标签
git tag -a v1.0.1 -m "Release version 1.0.1"

# 4. 推送到 GitHub
git push origin main
git push origin v1.0.1

# 5. GitHub Actions 自动编译和部署
```

---

## ⚠️ 常见错误

| 错误 | 解决方案 |
|-----|--------|
| "找不到 MSBuild" | 检查 Visual Studio 安装路径 |
| "NuGet 包未找到" | 运行 `nuget restore v2rayN/v2rayN.sln` |
| "NSIS 编译失败" | 确保 NSIS 已安装到 `C:\Program Files (x86)\NSIS` |
| "SSH 连接失败" | 验证 SSH 密钥权限：`chmod 600 ~/.ssh/id_rsa` |
| "GitHub Actions 失败" | 检查 GitHub Secrets 是否正确配置 |

---

## 📞 获取帮助

- 📖 **完整指南**：查看 `BUILD_AND_DEPLOY_GUIDE.md`
- 🔍 **故障排除**：查看 `CUSTOMIZATION_GUIDE.md` 的常见问题部分
- 💬 **技术支持**：联系 siuminghe@gmail.com

---

**祝您编译顺利！🚀**
