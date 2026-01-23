# LogVPN 客户端 API 文档

本文档为 Hiddify-Next 定制客户端（LogVPN）提供完整的后端 API 集成指南。

---

## 基础信息

**API 基础 URL**: `https://log-vpn.manus.space/api/trpc`

**协议**: tRPC over HTTP

**认证方式**: JWT Token（30天有效期）

**品牌配色**: 紫色系（主色调 #9C27B0）

---

## API 端点列表

### 1. 客户端登录

**端点**: `client.login`

**方法**: Mutation

**描述**: 用户使用邮箱和密码登录，返回 JWT Token 用于后续请求。同时绑定设备，实现一账号一设备限制。

**请求参数**:
```typescript
{
  email: string;        // 用户邮箱
  password: string;     // 密码（最少6位）
  deviceId: string;     // 设备唯一标识符
}
```

**响应**:
```typescript
{
  success: boolean;
  token: string;        // JWT Token，30天有效期
  user: {
    id: number;
    email: string;
    name: string | null;
  };
}
```

**错误码**:
- `UNAUTHORIZED`: 邮箱或密码错误

**示例**:
```typescript
const result = await trpc.client.login.mutate({
  email: "user@example.com",
  password: "password123",
  deviceId: "device-uuid-12345"
});

// 保存 token 供后续使用
localStorage.setItem("logvpn_token", result.token);
```

---

### 2. 验证 Token

**端点**: `client.verifyToken`

**方法**: Query

**描述**: 验证 Token 是否有效，检查设备绑定状态。

**请求参数**:
```typescript
{
  token: string;        // JWT Token
  deviceId: string;     // 设备唯一标识符
}
```

**响应**:
```typescript
{
  valid: boolean;
  user: {
    id: number;
    email: string;
    name: string | null;
  };
}
```

**错误码**:
- `UNAUTHORIZED`: Token 无效或已过期
- `UNAUTHORIZED`: 设备不匹配（被其他设备替换）

**示例**:
```typescript
const result = await trpc.client.verifyToken.query({
  token: localStorage.getItem("logvpn_token"),
  deviceId: "device-uuid-12345"
});

if (!result.valid) {
  // 跳转到登录页面
}
```

---

### 3. 获取订阅状态

**端点**: `client.getSubscription`

**方法**: Query

**描述**: 获取用户当前的订阅状态、有效期、流量使用情况。

**请求参数**:
```typescript
{
  token: string;        // JWT Token
  deviceId: string;     // 设备唯一标识符
}
```

**响应**:
```typescript
{
  active: boolean;
  subscription?: {
    planName: string;           // 套餐名称
    status: string;             // 状态：active/expired/cancelled
    startDate: Date;            // 开始日期
    endDate: Date;              // 结束日期
    remainingDays: number;      // 剩余天数
    trafficUsed: number;        // 已使用流量（字节）
    trafficLimit: number;       // 总流量限制（字节）
    dailyTrafficUsed: number;   // 今日已使用流量
    dailyTrafficLimit: number;  // 每日流量限制
    monthlyTrafficUsed: number; // 本月已使用流量
    monthlyTrafficLimit: number;// 每月流量限制
  };
  message?: string;     // 无订阅时的提示信息
}
```

**错误码**:
- `UNAUTHORIZED`: Token 无效或设备不匹配

**示例**:
```typescript
const result = await trpc.client.getSubscription.query({
  token: localStorage.getItem("logvpn_token"),
  deviceId: "device-uuid-12345"
});

if (!result.active) {
  // 显示订阅已过期，引导用户续费
  showSubscriptionExpiredDialog();
} else {
  // 显示订阅信息
  displaySubscriptionInfo(result.subscription);
}
```

---

### 4. 获取节点列表

**端点**: `client.getNodes`

**方法**: Query

**描述**: 获取所有可用的 VPN 节点列表。

**请求参数**:
```typescript
{
  token: string;        // JWT Token
  deviceId: string;     // 设备唯一标识符
}
```

**响应**:
```typescript
{
  nodes: Array<{
    id: number;
    name: string;           // 节点名称，如"香港-快速专线"
    country: string;        // 国家名称
    countryCode: string;    // 国家代码，如"HK"
    protocol: string;       // 协议类型：vless/trojan/shadowsocks/vmess
  }>;
}
```

**错误码**:
- `UNAUTHORIZED`: Token 无效或设备不匹配
- `FORBIDDEN`: 无有效订阅

**示例**:
```typescript
const result = await trpc.client.getNodes.query({
  token: localStorage.getItem("logvpn_token"),
  deviceId: "device-uuid-12345"
});

// 显示节点列表供用户选择
displayNodeList(result.nodes);
```

---

### 5. 获取节点配置

**端点**: `client.getNodeConfig`

**方法**: Query

**描述**: 获取指定节点的 Sing-box 配置文件。

**请求参数**:
```typescript
{
  token: string;        // JWT Token
  deviceId: string;     // 设备唯一标识符
  nodeId: number;       // 节点 ID
}
```

**响应**:
```typescript
{
  nodeId: number;
  nodeName: string;
  config: {
    // Sing-box 完整配置对象
    log: { ... },
    dns: { ... },
    inbounds: [ ... ],
    outbounds: [ ... ],
    route: { ... }
  };
}
```

**错误码**:
- `UNAUTHORIZED`: Token 无效或设备不匹配
- `FORBIDDEN`: 无有效订阅
- `NOT_FOUND`: 节点不存在或已禁用

**示例**:
```typescript
const result = await trpc.client.getNodeConfig.query({
  token: localStorage.getItem("logvpn_token"),
  deviceId: "device-uuid-12345",
  nodeId: 1
});

// 使用配置启动 Sing-box 核心
startSingboxCore(result.config);
```

---

### 6. 上报流量使用

**端点**: `client.reportTraffic`

**方法**: Mutation

**描述**: 定期向服务器上报流量使用情况。

**请求参数**:
```typescript
{
  token: string;        // JWT Token
  deviceId: string;     // 设备唯一标识符
  upload: number;       // 上传流量（字节）
  download: number;     // 下载流量（字节）
}
```

**响应**:
```typescript
{
  success: boolean;
  message: string;
}
```

**错误码**:
- `UNAUTHORIZED`: Token 无效或设备不匹配
- `FORBIDDEN`: 无有效订阅

**建议**:
- 每 30 秒上报一次流量
- 客户端关闭时立即上报最后的流量数据

**示例**:
```typescript
// 每30秒上报一次
setInterval(async () => {
  const stats = getTrafficStats(); // 获取自上次上报以来的流量
  
  await trpc.client.reportTraffic.mutate({
    token: localStorage.getItem("logvpn_token"),
    deviceId: "device-uuid-12345",
    upload: stats.upload,
    download: stats.download
  });
  
  resetTrafficStats(); // 重置计数器
}, 30000);
```

---

## 设备标识符生成

**设备 ID** 用于实现一账号一设备限制。建议使用以下方法生成：

### Windows
```dart
import 'package:device_info_plus/device_info_plus.dart';
import 'package:crypto/crypto.dart';
import 'dart:convert';

Future<String> getDeviceId() async {
  final deviceInfo = DeviceInfoPlugin();
  final windowsInfo = await deviceInfo.windowsInfo;
  
  // 组合多个硬件信息生成唯一 ID
  final rawId = '${windowsInfo.computerName}-${windowsInfo.machineId}';
  final bytes = utf8.encode(rawId);
  final digest = sha256.convert(bytes);
  
  return 'win-${digest.toString().substring(0, 32)}';
}
```

### Android
```dart
Future<String> getDeviceId() async {
  final deviceInfo = DeviceInfoPlugin();
  final androidInfo = await deviceInfo.androidInfo;
  
  final rawId = '${androidInfo.id}-${androidInfo.androidId}';
  final bytes = utf8.encode(rawId);
  final digest = sha256.convert(bytes);
  
  return 'android-${digest.toString().substring(0, 32)}';
}
```

### iOS
```dart
Future<String> getDeviceId() async {
  final deviceInfo = DeviceInfoPlugin();
  final iosInfo = await deviceInfo.iosInfo;
  
  final rawId = '${iosInfo.identifierForVendor}';
  final bytes = utf8.encode(rawId);
  final digest = sha256.convert(bytes);
  
  return 'ios-${digest.toString().substring(0, 32)}';
}
```

---

## 错误处理

所有 API 调用都应该包含错误处理：

```typescript
try {
  const result = await trpc.client.getNodes.query({
    token: localStorage.getItem("logvpn_token"),
    deviceId: deviceId
  });
  
  // 处理成功响应
  handleSuccess(result);
  
} catch (error) {
  if (error.code === 'UNAUTHORIZED') {
    // Token 无效，跳转到登录页面
    redirectToLogin();
  } else if (error.code === 'FORBIDDEN') {
    // 无订阅权限，引导用户购买
    showSubscriptionDialog();
  } else {
    // 其他错误，显示错误信息
    showErrorMessage(error.message);
  }
}
```

---

## 完整的客户端流程

### 1. 启动流程

```
1. 检查本地是否有保存的 Token
2. 如果有 Token：
   - 调用 verifyToken 验证
   - 如果验证成功：跳转到主界面
   - 如果验证失败：清除 Token，显示登录界面
3. 如果没有 Token：
   - 显示登录界面
```

### 2. 登录流程

```
1. 用户输入邮箱和密码
2. 生成设备 ID
3. 调用 client.login
4. 保存返回的 Token
5. 跳转到主界面
```

### 3. 主界面流程

```
1. 调用 getSubscription 获取订阅状态
2. 显示订阅信息（有效期、流量使用）
3. 调用 getNodes 获取节点列表
4. 显示节点列表供用户选择
```

### 4. 连接流程

```
1. 用户选择节点
2. 调用 getNodeConfig 获取配置
3. 使用配置启动 Sing-box 核心
4. 开始流量统计
5. 每30秒调用 reportTraffic 上报流量
```

### 5. 断开流程

```
1. 停止 Sing-box 核心
2. 立即调用 reportTraffic 上报最后的流量
3. 停止流量统计
```

---

## 测试端点

可以使用以下测试账号进行开发测试：

**测试账号**:
- 邮箱: `test@logvpn.com`
- 密码: `test123456`

**测试环境**:
- API URL: `https://log-vpn.manus.space/api/trpc`

---

## 技术支持

如有任何问题，请联系开发团队。

**API 版本**: v1.0.0  
**最后更新**: 2026-01-23
