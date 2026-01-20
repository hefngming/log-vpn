# 新手引导集成指南

## 概述

新手引导流程帮助新用户快速了解 Log VPN 的核心功能。包括 5 个步骤：登录、选择节点、连接、流量统计、设置。

## 集成步骤

### 1. 在 App.tsx 中包装应用

```tsx
import { OnboardingWrapper } from '@/components/OnboardingWrapper';

export default function App() {
  return (
    <OnboardingWrapper>
      {/* Your existing app content */}
      <Router>
        {/* routes */}
      </Router>
    </OnboardingWrapper>
  );
}
```

### 2. 在页面中添加 data-onboarding 属性

为需要高亮的元素添加 `data-onboarding` 属性，对应引导步骤的 target：

```tsx
// 登录页面
<form data-onboarding="login-form">
  {/* login fields */}
</form>

// 节点列表页面
<div data-onboarding="node-list">
  {/* node list */}
</div>

// 连接按钮
<button data-onboarding="connect-button">
  连接
</button>

// 流量统计
<div data-onboarding="traffic-stats">
  {/* traffic stats */}
</div>

// 设置页面
<div data-onboarding="settings">
  {/* settings */}
</div>
```

## 引导步骤详情

| 步骤 | ID | 目标 | 说明 |
|------|----|----|------|
| 1 | login | login-form | 登录账号 |
| 2 | select-node | node-list | 选择节点 |
| 3 | connect | connect-button | 连接节点 |
| 4 | traffic-stats | traffic-stats | 查看流量统计 |
| 5 | settings | settings | 配置设置 |

## 使用 Hook

在任何组件中使用 `useOnboarding` Hook：

```tsx
import { useOnboarding } from '@/hooks/useOnboarding';

function MyComponent() {
  const {
    isActive,           // 引导是否激活
    currentStep,        // 当前步骤索引
    currentStepData,    // 当前步骤数据
    totalSteps,         // 总步骤数
    isCompleted,        // 引导是否完成
    onNext,             // 下一步
    onPrevious,         // 上一步
    onSkip,             // 跳过
    onComplete,         // 完成
  } = useOnboarding();

  return (
    <div>
      {isActive && <p>当前步骤: {currentStep + 1}</p>}
    </div>
  );
}
```

## 存储机制

- 引导状态存储在 localStorage 中
- 键: `log-vpn-onboarding` (状态) 和 `log-vpn-onboarding-completed` (完成标记)
- 用户可以跳过引导，系统会记住选择
- 用户可以手动重置引导状态

## 重置引导

如果需要重置引导状态（用于测试），可以在浏览器控制台执行：

```javascript
import { resetOnboarding } from '@/lib/onboarding';
resetOnboarding();
// 然后刷新页面
```

## 自定义引导步骤

编辑 `client/src/lib/onboarding.ts` 中的 `ONBOARDING_STEPS` 数组来自定义引导内容。

## 样式定制

气泡提示组件使用 Tailwind CSS 和 shadcn/ui 组件。可以在 `OnboardingTooltip.tsx` 中修改样式。
