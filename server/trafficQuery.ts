import { getDb } from './db';
import { subscriptions } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * 流量使用情况
 */
export interface TrafficUsage {
  dailyUsed: number; // 今天已用流量（GB）
  dailyLimit: number; // 每天流量限制（GB）
  monthlyUsed: number; // 本月已用流量（GB）
  monthlyLimit: number; // 每月流量限制（GB）
  dailyRemaining: number; // 今天剩余流量（GB）
  monthlyRemaining: number; // 本月剩余流量（GB）
  dailyPercentage: number; // 今天流量使用百分比（0-100）
  monthlyPercentage: number; // 本月流量使用百分比（0-100）
  isDailyLimitReached: boolean; // 是否达到日流量限制
  isMonthlyLimitReached: boolean; // 是否达到月流量限制
  lastUpdated: number; // 最后更新时间戳
}

/**
 * 获取用户流量使用情况
 */
export async function getUserTrafficUsage(userId: string): Promise<TrafficUsage | null> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('[TrafficQuery] Database not available');
      return null;
    }

    // 获取用户订阅信息
    const subscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, parseInt(userId)))
      .limit(1);

    if (!subscription || subscription.length === 0) {
      return null;
    }

    const sub = subscription[0];

    // 如果订阅已过期或被暂停，返回 0 流量
    if (sub.status === 'expired' || sub.status === 'suspended') {
      return {
        dailyUsed: 0,
        dailyLimit: 0,
        monthlyUsed: 0,
        monthlyLimit: 0,
        dailyRemaining: 0,
        monthlyRemaining: 0,
        dailyPercentage: 0,
        monthlyPercentage: 0,
        isDailyLimitReached: false,
        isMonthlyLimitReached: false,
        lastUpdated: Date.now(),
      };
    }

    // 计算流量使用情况
    const dailyUsed = sub.dailyTrafficUsed || 0;
    const monthlyUsed = sub.monthlyTrafficUsed || 0;
    const dailyLimit = sub.dailyTrafficLimit || 10; // 默认 10GB
    const monthlyLimit = sub.monthlyTrafficLimit || 200; // 默认 200GB

    const dailyRemaining = Math.max(0, dailyLimit - dailyUsed);
    const monthlyRemaining = Math.max(0, monthlyLimit - monthlyUsed);

    const dailyPercentage = dailyLimit > 0 ? Math.round((dailyUsed / dailyLimit) * 100) : 0;
    const monthlyPercentage = monthlyLimit > 0 ? Math.round((monthlyUsed / monthlyLimit) * 100) : 0;

    const isDailyLimitReached = dailyUsed >= dailyLimit;
    const isMonthlyLimitReached = monthlyUsed >= monthlyLimit;

    return {
      dailyUsed,
      dailyLimit,
      monthlyUsed,
      monthlyLimit,
      dailyRemaining,
      monthlyRemaining,
      dailyPercentage,
      monthlyPercentage,
      isDailyLimitReached,
      isMonthlyLimitReached,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error('Error getting user traffic usage:', error);
    return null;
  }
}

/**
 * 检查流量是否接近限制
 */
export function isTrafficNearLimit(usage: TrafficUsage, threshold: number = 80): boolean {
  return usage.dailyPercentage >= threshold || usage.monthlyPercentage >= threshold;
}

/**
 * 获取流量警告消息
 */
export function getTrafficWarningMessage(usage: TrafficUsage): string | null {
  if (usage.isDailyLimitReached) {
    return `⚠️ 今天的流量已用完！已使用 ${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB，请等待明天重置。`;
  }

  if (usage.isMonthlyLimitReached) {
    return `⚠️ 本月的流量已用完！已使用 ${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB，请等待下月重置。`;
  }

  if (usage.dailyPercentage >= 90) {
    return `⚠️ 今天流量即将用完！已使用 ${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB (${usage.dailyPercentage}%)`;
  }

  if (usage.monthlyPercentage >= 90) {
    return `⚠️ 本月流量即将用完！已使用 ${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB (${usage.monthlyPercentage}%)`;
  }

  if (usage.dailyPercentage >= 80) {
    return `💡 今天流量使用已达 ${usage.dailyPercentage}%，剩余 ${usage.dailyRemaining.toFixed(2)}GB`;
  }

  if (usage.monthlyPercentage >= 80) {
    return `💡 本月流量使用已达 ${usage.monthlyPercentage}%，剩余 ${usage.monthlyRemaining.toFixed(2)}GB`;
  }

  return null;
}

/**
 * 格式化流量显示
 */
export function formatTrafficDisplay(usage: TrafficUsage): {
  daily: string;
  monthly: string;
  status: 'normal' | 'warning' | 'critical';
} {
  const dailyDisplay = `${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB`;
  const monthlyDisplay = `${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB`;

  let status: 'normal' | 'warning' | 'critical' = 'normal';
  if (usage.isDailyLimitReached || usage.isMonthlyLimitReached) {
    status = 'critical';
  } else if (usage.dailyPercentage >= 80 || usage.monthlyPercentage >= 80) {
    status = 'warning';
  }

  return {
    daily: dailyDisplay,
    monthly: monthlyDisplay,
    status,
  };
}
