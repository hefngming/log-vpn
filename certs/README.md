# 证书目录

## 📁 目录说明

此目录用于存放代码签名证书文件。

## 🪟 Windows 代码签名证书

### 文件要求

- **文件名**：`windows-cert.pfx`（或 `.p12` 格式）
- **格式**：PKCS#12 格式
- **位置**：`certs/windows-cert.pfx`

### 获取证书

**推荐证书提供商**：

1. **DigiCert**
   - 价格：$400-$600/年
   - 网址：https://www.digicert.com/code-signing
   - 优点：最高信任度，微软推荐

2. **Sectigo (Comodo)**
   - 价格：$200-$300/年
   - 网址：https://sectigo.com/ssl-certificates-tls/code-signing
   - 优点：性价比高

3. **GlobalSign**
   - 价格：$250-$400/年
   - 网址：https://www.globalsign.com/en/code-signing-certificate
   - 优点：国际认可度高

### 购买流程

1. 选择 "Standard Code Signing Certificate"
2. 填写公司信息（需要营业执照）
3. 完成身份验证（1-3 个工作日）
4. 下载证书文件（.pfx 或 .p12 格式）
5. 保存到此目录：`certs/windows-cert.pfx`

### 配置证书密码

**方式 1：环境变量（推荐）**

在 GitHub Actions 中添加 Secret：
- 名称：`WIN_CSC_KEY_PASSWORD`
- 值：您的证书密码

**方式 2：package.json（不推荐）**

```json
"win": {
  "certificatePassword": "your-password"
}
```

⚠️ **警告**：不要将密码提交到 Git 仓库！

### 本地测试

```bash
# 设置环境变量
export WIN_CSC_KEY_PASSWORD="your-password"

# 打包
pnpm run package
```

### 验证签名

在 Windows 上：
1. 右键点击生成的 .exe 文件
2. 选择"属性" → "数字签名"选项卡
3. 应该看到您的证书信息

---

## 🍎 macOS 代码签名证书（可选）

### 文件要求

macOS 证书通常通过环境变量配置，不需要文件。

### 获取证书

1. 加入 Apple Developer Program（$99/年）
2. 创建 "Developer ID Application" 证书
3. 导出证书为 .p12 文件
4. 转换为 base64 编码

### 配置方法

在 GitHub Actions 中添加 Secrets：
- `CSC_LINK`: 证书文件（base64 编码）
- `CSC_KEY_PASSWORD`: 证书密码
- `APPLE_ID`: Apple ID 邮箱
- `APPLE_ID_PASSWORD`: App-specific password

---

## 🔒 安全注意事项

1. ⚠️ **不要提交证书文件到 Git 仓库**
2. ⚠️ **不要在 package.json 中硬编码密码**
3. ✅ 使用环境变量或 GitHub Secrets 存储敏感信息
4. ✅ 将 `certs/` 目录添加到 `.gitignore`

### .gitignore 配置

```gitignore
# 证书文件
certs/*.pfx
certs/*.p12
certs/*.cer
certs/*.pem
```

---

## 📋 检查清单

在打包之前，确保：

- [ ] 证书文件已保存到 `certs/windows-cert.pfx`
- [ ] 证书密码已配置（环境变量或 GitHub Secret）
- [ ] 证书未过期
- [ ] 证书文件未提交到 Git 仓库
- [ ] `.gitignore` 已配置排除证书文件

---

## 🧪 测试签名

### 本地测试

```bash
# 检查证书文件
ls -la certs/windows-cert.pfx

# 设置密码环境变量
export WIN_CSC_KEY_PASSWORD="your-password"

# 打包
pnpm run package

# 检查生成的文件
ls -la release/
```

### GitHub Actions 测试

1. 提交代码到 main 分支
2. 查看 GitHub Actions 构建日志
3. 检查是否有签名相关错误
4. 下载 artifact 并验证签名

---

## 🔍 故障排除

### 错误：Cannot sign, no valid certificate specified

**原因**：
- 证书文件不存在
- 证书路径配置错误
- 证书密码未设置

**解决方案**：
1. 检查 `certs/windows-cert.pfx` 是否存在
2. 检查 `package.json` 中的 `certificateFile` 路径
3. 检查环境变量 `WIN_CSC_KEY_PASSWORD` 是否设置

### 错误：Certificate password is incorrect

**原因**：
- 证书密码错误

**解决方案**：
1. 确认证书密码正确
2. 更新环境变量或 GitHub Secret

### 错误：Certificate has expired

**原因**：
- 证书已过期

**解决方案**：
1. 续费或购买新证书
2. 更新证书文件

---

**当前状态**：
- ⚠️ 证书文件缺失，需要手动添加
- ⚠️ 在添加证书之前，打包会跳过签名步骤

**下一步**：
1. 购买代码签名证书
2. 下载证书文件（.pfx 格式）
3. 保存到 `certs/windows-cert.pfx`
4. 配置证书密码（GitHub Secret）
5. 测试打包和签名
