import { ipcMain, dialog, BrowserWindow } from 'electron';
import type { TrafficUsage } from '../server/trafficQuery';

/**
 * 流量监控配置
 */
interface TrafficMonitorConfig {
  checkInterval: number; // 检查间隔（毫秒）
  warningThreshold: number; // 警告阈值（百分比）
  criticalThreshold: number; // 严重阈值（百分比）
}

/**
 * 流量监控类
 */
export class TrafficMonitor {
  private config: TrafficMonitorConfig;
  private checkTimer: NodeJS.Timer | null = null;
  private lastWarningTime: number = 0;
  private warningCooldown: number = 60000; // 1 分钟内不重复警告
  private mainWindow: BrowserWindow | null = null;

  constructor(
    config: Partial<TrafficMonitorConfig> = {},
    mainWindow?: BrowserWindow
  ) {
    this.config = {
      checkInterval: config.checkInterval || 60000, // 默认 1 分钟检查一次
      warningThreshold: config.warningThreshold || 80,
      criticalThreshold: config.criticalThreshold || 95,
    };
    this.mainWindow = mainWindow || null;
  }

  /**
   * 启动流量监控
   */
  public start(getTrafficUsage: () => Promise<TrafficUsage | null>) {
    if (this.checkTimer) {
      console.warn('[TrafficMonitor] Monitor already running');
      return;
    }

    console.log('[TrafficMonitor] Starting traffic monitor');

    // 立即检查一次
    this.checkTraffic(getTrafficUsage);

    // 定期检查
    this.checkTimer = setInterval(() => {
      this.checkTraffic(getTrafficUsage);
    }, this.config.checkInterval);
  }

  /**
   * 停止流量监控
   */
  public stop() {
    if (this.checkTimer) {
      clearInterval(this.checkTimer);
      this.checkTimer = null;
      console.log('[TrafficMonitor] Traffic monitor stopped');
    }
  }

  /**
   * 检查流量并发送警告
   */
  private async checkTraffic(getTrafficUsage: () => Promise<TrafficUsage | null>) {
    try {
      const usage = await getTrafficUsage();
      if (!usage) {
        return;
      }

      // 检查是否需要发送警告
      const now = Date.now();
      const shouldWarn =
        (usage.dailyPercentage >= this.config.warningThreshold ||
          usage.monthlyPercentage >= this.config.warningThreshold) &&
        now - this.lastWarningTime > this.warningCooldown;

      if (shouldWarn) {
        this.lastWarningTime = now;
        this.showWarning(usage);
      }

      // 发送流量更新到渲染进程
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        this.mainWindow.webContents.send('traffic-update', usage);
      }
    } catch (error) {
      console.error('[TrafficMonitor] Error checking traffic:', error);
    }
  }

  /**
   * 显示流量警告
   */
  private showWarning(usage: TrafficUsage) {
    const message = this.getWarningMessage(usage);
    if (!message) {
      return;
    }

    console.log('[TrafficMonitor] Showing warning:', message);

    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      dialog.showMessageBox(this.mainWindow, {
        type: 'warning',
        title: '流量使用提醒',
        message: message,
        buttons: ['确定', '查看详情'],
      });
    }
  }

  /**
   * 生成警告消息
   */
  private getWarningMessage(usage: TrafficUsage): string | null {
    if (usage.isDailyLimitReached) {
      return `⚠️ 今天的流量已用完！\n已使用：${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB\n请等待明天重置。`;
    }

    if (usage.isMonthlyLimitReached) {
      return `⚠️ 本月的流量已用完！\n已使用：${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB\n请等待下月重置。`;
    }

    if (usage.dailyPercentage >= this.config.criticalThreshold) {
      return `⚠️ 今天流量即将用完！\n已使用：${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB (${usage.dailyPercentage}%)\n剩余：${usage.dailyRemaining.toFixed(2)}GB`;
    }

    if (usage.monthlyPercentage >= this.config.criticalThreshold) {
      return `⚠️ 本月流量即将用完！\n已使用：${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB (${usage.monthlyPercentage}%)\n剩余：${usage.monthlyRemaining.toFixed(2)}GB`;
    }

    if (usage.dailyPercentage >= this.config.warningThreshold) {
      return `💡 今天流量使用已达 ${usage.dailyPercentage}%\n已使用：${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB\n剩余：${usage.dailyRemaining.toFixed(2)}GB`;
    }

    if (usage.monthlyPercentage >= this.config.warningThreshold) {
      return `💡 本月流量使用已达 ${usage.monthlyPercentage}%\n已使用：${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB\n剩余：${usage.monthlyRemaining.toFixed(2)}GB`;
    }

    return null;
  }

  /**
   * 设置主窗口
   */
  public setMainWindow(mainWindow: BrowserWindow | null) {
    this.mainWindow = mainWindow;
  }

  /**
   * 获取配置
   */
  public getConfig(): TrafficMonitorConfig {
    return { ...this.config };
  }

  /**
   * 更新配置
   */
  public updateConfig(config: Partial<TrafficMonitorConfig>) {
    this.config = { ...this.config, ...config };
  }
}

/**
 * 初始化 IPC 监听器
 */
export function setupTrafficMonitorIPC(trafficMonitor: TrafficMonitor) {
  // 获取当前流量使用情况
  ipcMain.handle('get-traffic-usage', async () => {
    // 这个会在渲染进程中调用后端 API
    return null;
  });

  // 启动流量监控
  ipcMain.handle('start-traffic-monitor', async () => {
    console.log('[IPC] Starting traffic monitor');
    return { success: true };
  });

  // 停止流量监控
  ipcMain.handle('stop-traffic-monitor', async () => {
    trafficMonitor.stop();
    console.log('[IPC] Traffic monitor stopped');
    return { success: true };
  });

  // 获取流量监控配置
  ipcMain.handle('get-traffic-config', async () => {
    return trafficMonitor.getConfig();
  });

  // 更新流量监控配置
  ipcMain.handle('update-traffic-config', async (_, config) => {
    trafficMonitor.updateConfig(config);
    console.log('[IPC] Traffic monitor config updated:', config);
    return { success: true };
  });
}

/**
 * 示例：在 main.ts 中的使用
 *
 * import { TrafficMonitor, setupTrafficMonitorIPC } from './trafficMonitor';
 *
 * const trafficMonitor = new TrafficMonitor(
 *   {
 *     checkInterval: 60000, // 1 分钟检查一次
 *     warningThreshold: 80,
 *     criticalThreshold: 95,
 *   },
 *   mainWindow
 * );
 *
 * setupTrafficMonitorIPC(trafficMonitor);
 *
 * // 启动监控
 * trafficMonitor.start(async () => {
 *   // 从后端 API 获取流量使用情况
 *   const response = await fetch('http://localhost:3000/api/trpc/traffic.getUsage', {
 *     headers: {
 *       'Authorization': `Bearer ${authToken}`,
 *     },
 *   });
 *   return response.json();
 * });
 */
