# Sentry 错误上报配置指南

## 📋 概述

LogVPN 已集成 Sentry 错误上报机制，可以自动收集客户端崩溃日志和错误信息。

## 🔧 配置步骤

### 1. 创建 Sentry 账号和项目

1. 访问 [https://sentry.io](https://sentry.io)
2. 注册账号（免费计划支持 5,000 errors/月）
3. 创建新项目：
   - 选择平台：**Electron**
   - 项目名称：`logvpn-client`
4. 获取 **DSN**（Data Source Name）
   - 格式：`https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`

### 2. 配置环境变量

#### 方式 1：GitHub Actions（推荐）

在 GitHub 仓库中添加 Secret：

1. 访问：`https://github.com/hefngming/log-vpn/settings/secrets/actions`
2. 点击 **"New repository secret"**
3. 添加以下 Secret：
   - Name: `SENTRY_DSN`
   - Value: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`（您的 Sentry DSN）

然后更新 `.github/workflows/build_assets.yml`，在 `Package with Electron Builder` 步骤中添加环境变量：

```yaml
- name: Package with Electron Builder
  run: pnpm run package
  env:
    GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    VITE_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
```

#### 方式 2：本地开发

创建 `.env` 文件（不要提交到 Git）：

```bash
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### 3. 验证集成

#### 测试主进程错误捕获

在 `client-src/main.ts` 中添加测试代码：

```typescript
// 测试错误捕获（开发时使用）
setTimeout(() => {
  throw new Error('Test error from main process');
}, 5000);
```

#### 测试渲染进程错误捕获

在任意 React 组件中添加：

```typescript
import { captureError } from '@/lib/sentry';

// 测试错误捕获
captureError(new Error('Test error from renderer process'));
```

运行应用后，访问 Sentry 项目的 **Issues** 页面，应该能看到错误报告。

## 📊 功能特性

### 主进程错误捕获

- ✅ 未捕获的异常（`uncaughtException`）
- ✅ 未处理的 Promise 拒绝（`unhandledRejection`）
- ✅ 自动包含堆栈跟踪和环境信息

### 渲染进程错误捕获

- ✅ React 组件错误边界
- ✅ 全局 JavaScript 错误
- ✅ 未处理的 Promise 拒绝
- ✅ 网络请求错误
- ✅ 用户会话重放（错误时）

### 用户上下文

在用户登录后，设置用户信息：

```typescript
import { setUser } from '@/lib/sentry';

// 登录成功后
setUser({
  id: user.id,
  email: user.email,
  username: user.name,
});

// 登出时
import { clearUser } from '@/lib/sentry';
clearUser();
```

## 🔒 隐私保护

- ✅ 开发模式下不发送错误（仅在控制台输出）
- ✅ 会话重放时自动遮蔽所有文本和媒体
- ✅ 只在配置了 DSN 时启用 Sentry
- ✅ 不收集敏感的用户输入信息

## 📈 查看错误报告

1. 登录 Sentry 控制台
2. 选择 `logvpn-client` 项目
3. 查看 **Issues** 页面
4. 点击具体错误查看：
   - 错误堆栈跟踪
   - 用户环境信息（操作系统、应用版本）
   - 用户操作历史（Breadcrumbs）
   - 会话重放（如果启用）

## 🚀 生产环境建议

1. **调整采样率**：
   ```typescript
   tracesSampleRate: 0.1, // 10% 的性能监控
   replaysSessionSampleRate: 0.01, // 1% 的会话记录
   ```

2. **设置发布版本**：
   ```typescript
   release: `logvpn@${app.getVersion()}`,
   ```

3. **添加标签**：
   ```typescript
   Sentry.setTag('platform', process.platform);
   Sentry.setTag('arch', process.arch);
   ```

4. **监控关键操作**：
   ```typescript
   Sentry.addBreadcrumb({
     category: 'vpn',
     message: 'User connected to VPN',
     level: 'info',
   });
   ```

## 📝 注意事项

- Sentry 免费计划限制：5,000 errors/月
- 超出限制后错误将被丢弃（应用不受影响）
- 建议定期检查错误报告并修复高频问题
- 生产环境建议购买付费计划以获得更多配额

## 🔗 相关链接

- [Sentry 官方文档](https://docs.sentry.io/)
- [Sentry Electron SDK](https://docs.sentry.io/platforms/javascript/guides/electron/)
- [Sentry React SDK](https://docs.sentry.io/platforms/javascript/guides/react/)
