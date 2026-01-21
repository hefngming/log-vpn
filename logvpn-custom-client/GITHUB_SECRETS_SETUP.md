# GitHub Secrets 配置指南

本文档提供详细的 GitHub Secrets 配置步骤，用于 LogVPN 客户端的自动化编译和部署。

---

## 📋 前置条件

1. 已在 GitHub 上创建仓库（例如：`logvpn-client`）
2. 拥有服务器访问权限（155.94.160.248）
3. 已生成 SSH 密钥对

---

## 🔑 需要配置的 Secrets

| Secret 名称 | 说明 | 值 |
|------------|------|-----|
| `SSH_PRIVATE_KEY` | SSH 私钥，用于连接服务器 | 见下方 |
| `SERVER_HOST` | 服务器地址 | `155.94.160.248` |
| `SERVER_USER` | 服务器用户名 | `ubuntu` |

---

## 📝 第一步：SSH_PRIVATE_KEY

### 1.1 复制私钥内容

私钥文件位于：`logvpn_deploy_key`

**完整的私钥内容**（包括开头和结尾）：

```
-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
```

### 1.2 在 GitHub 上添加 Secret

1. 访问您的仓库设置页面：
   ```
   https://github.com/YOUR_USERNAME/logvpn-client/settings/secrets/actions
   ```

2. 点击 **"New repository secret"** 按钮

3. 填写信息：
   - **Name**: `SSH_PRIVATE_KEY`
   - **Secret**: 粘贴上面的完整私钥内容

4. 点击 **"Add secret"** 保存

---

## 📝 第二步：SERVER_HOST

### 2.1 添加服务器地址

1. 在同一页面，再次点击 **"New repository secret"**

2. 填写信息：
   - **Name**: `SERVER_HOST`
   - **Secret**: `155.94.160.248`

3. 点击 **"Add secret"** 保存

---

## 📝 第三步：SERVER_USER

### 3.1 添加服务器用户名

1. 再次点击 **"New repository secret"**

2. 填写信息：
   - **Name**: `SERVER_USER`
   - **Secret**: `ubuntu`

3. 点击 **"Add secret"** 保存

---

## 🔧 第四步：配置服务器公钥

### 4.1 公钥内容

公钥文件位于：`logvpn_deploy_key.pub`

**完整的公钥内容**：

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDMzn3gXvhxwOhMQJwNISkDYf2cKMoyBmwIkG7UGMl20FE38LwOLB/hU/1e4mPpCYPwEtpF3i7hqz95+Rp+afPOGFoK1wWWhKF1HBTAYdMVeImZ/VEu/itRUj1RRBjdn1fDGvveEhg7OfIHSLATTSO4EdqKqG/P7SEHeBXCJM1VgRjVRBpGC2Gdo/R4aYNBe5NuhPI68sBlIrpBwTBwTY9+T/zRxyIpUXztbyRm40m0fTOBR+NEdSiummju9jw4iv/wtD3UoM0GyniNO4Qu61YBiGhTf2vwn1i9GZVMP3qntuifBdysYlK7yVjF9LbL20Fdt56NBlvi1/TDl7zL8YTADTPJJUhrvNbtLbbNds8WTcxs+KPl/BSN7iMCaTPtHOOW7+ZGus7sPDzcv9onNh4LPnQZ5xxh4JEpr98woSq1FhWVkghP4b1YQr4XtcZRydNYPfQuJisbK9Iw0owBBi88BP1h48/hGXpE4Qc3d5aChShlW6M1HE4dQMeQU63JvyTjTwkrf40MDjLwMxvtnXzPEYzrRV8Pb8fy73l6kBW7L08sJMvP/uUsGE29RUV41Sn/MPO0cKSc3Tpe839otmdC9rJVI4BrrcT5Ku9Poo/WB9FnkjCNIlgUkt0KsAATOR5MczSd/k3qlcsO0zq+/uhtmXYx2zVhLQq4bJeYfYShSQ== logvpn-github-actions
```

### 4.2 在服务器上配置公钥

登录到服务器并执行以下命令：

```bash
# 登录服务器
ssh ubuntu@155.94.160.248

# 创建 .ssh 目录（如果不存在）
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 添加公钥到 authorized_keys
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDMzn3gXvhxwOhMQJwNISkDYf2cKMoyBmwIkG7UGMl20FE38LwOLB/hU/1e4mPpCYPwEtpF3i7hqz95+Rp+afPOGFoK1wWWhKF1HBTAYdMVeImZ/VEu/itRUj1RRBjdn1fDGvveEhg7OfIHSLATTSO4EdqKqG/P7SEHeBXCJM1VgRjVRBpGC2Gdo/R4aYNBe5NuhPI68sBlIrpBwTBwTY9+T/zRxyIpUXztbyRm40m0fTOBR+NEdSiummju9jw4iv/wtD3UoM0GyniNO4Qu61YBiGhTf2vwn1i9GZVMP3qntuifBdysYlK7yVjF9LbL20Fdt56NBlvi1/TDl7zL8YTADTPJJUhrvNbtLbbNds8WTcxs+KPl/BSN7iMCaTPtHOOW7+ZGus7sPDzcv9onNh4LPnQZ5xxh4JEpr98woSq1FhWVkghP4b1YQr4XtcZRydNYPfQuJisbK9Iw0owBBi88BP1h48/hGXpE4Qc3d5aChShlW6M1HE4dQMeQU63JvyTjTwkrf40MDjLwMxvtnXzPEYzrRV8Pb8fy73l6kBW7L08sJMvP/uUsGE29RUV41Sn/MPO0cKSc3Tpe839otmdC9rJVI4BrrcT5Ku9Poo/WB9FnkjCNIlgUkt0KsAATOR5MczSd/k3qlcsO0zq+/uhtmXYx2zVhLQq4bJeYfYShSQ== logvpn-github-actions" >> ~/.ssh/authorized_keys

# 设置正确的权限
chmod 600 ~/.ssh/authorized_keys

# 验证配置
cat ~/.ssh/authorized_keys | grep logvpn-github-actions
```

如果看到输出包含 `logvpn-github-actions`，说明配置成功。

---

## ✅ 第五步：验证配置

### 5.1 检查 Secrets 列表

访问：
```
https://github.com/YOUR_USERNAME/logvpn-client/settings/secrets/actions
```

您应该看到三个 Secrets：
- ✓ SSH_PRIVATE_KEY
- ✓ SERVER_HOST
- ✓ SERVER_USER

### 5.2 测试 SSH 连接

在本地测试 SSH 连接：

```bash
# 使用私钥连接服务器
ssh -i logvpn_deploy_key ubuntu@155.94.160.248

# 如果连接成功，说明配置正确
```

---

## 🚀 第六步：触发 GitHub Actions

### 6.1 推送代码

配置完成后，推送代码到 GitHub 将自动触发编译：

```bash
git add .
git commit -m "feat: Setup GitHub Actions"
git push origin main
```

### 6.2 查看工作流

访问：
```
https://github.com/YOUR_USERNAME/logvpn-client/actions
```

您应该看到一个正在运行的工作流。

---

## 📊 常见问题

### 问题 1：SSH 连接失败

**症状**：GitHub Actions 日志显示 "Permission denied (publickey)"

**解决方案**：
1. 检查公钥是否正确添加到服务器
2. 检查 `~/.ssh/authorized_keys` 的权限（应该是 600）
3. 检查私钥是否完整复制到 GitHub Secrets

### 问题 2：无法推送到 GitHub

**症状**：`git push` 失败，提示认证错误

**解决方案**：
1. 使用 HTTPS 方式推送（需要 GitHub Personal Access Token）
2. 或配置 SSH 密钥用于 GitHub 推送

### 问题 3：工作流未自动触发

**症状**：推送代码后，GitHub Actions 没有运行

**解决方案**：
1. 检查 `.github/workflows/electron-build.yml` 文件是否存在
2. 检查工作流文件的语法是否正确
3. 查看 GitHub Actions 页面是否有错误提示

---

## 📞 获取帮助

如果遇到问题：

1. 查看 GitHub Actions 工作流日志
2. 参考 TROUBLESHOOTING_GUIDE.md
3. 检查服务器连接和权限

---

**配置完成！现在您可以享受自动化编译和部署了。🎉**
