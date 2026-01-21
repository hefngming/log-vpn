import * as Sentry from '@sentry/electron/renderer';
import { init as reactInit } from '@sentry/react';

// 初始化 Sentry（渲染进程）
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN || '';
  
  if (!dsn) {
    console.log('[Sentry] DSN not configured, skipping initialization');
    return;
  }

  Sentry.init(
    {
      dsn,
      environment: import.meta.env.MODE || 'production',
      enabled: !!dsn,
      tracesSampleRate: 1.0,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      replaysSessionSampleRate: 0.1, // 10% 的会话记录
      replaysOnErrorSampleRate: 1.0, // 错误时 100% 记录
      beforeSend(event) {
        // 在开发模式下不发送错误
        if (import.meta.env.DEV) {
          console.log('[Sentry] Event:', event);
          return null;
        }
        return event;
      },
    },
    reactInit
  );

  console.log('[Sentry] Initialized successfully');
}

// 手动捕获错误
export function captureError(error: Error, context?: Record<string, any>) {
  console.error('[Sentry] Capturing error:', error);
  if (context) {
    Sentry.setContext('additional', context);
  }
  Sentry.captureException(error);
}

// 设置用户信息
export function setUser(user: { id: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

// 清除用户信息
export function clearUser() {
  Sentry.setUser(null);
}
