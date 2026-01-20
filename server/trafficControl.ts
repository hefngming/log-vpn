/**
 * Traffic Control Module
 * Manages daily and monthly traffic limits for subscriptions
 */

import * as db from "./db";

/**
 * Check if subscription should be suspended due to traffic limits
 */
export async function checkAndUpdateTrafficStatus(subscriptionId: number): Promise<{
  shouldSuspend: boolean;
  reason?: string;
  dailyRemaining?: number;
  monthlyRemaining?: number;
}> {
  const subscription = await db.getSubscriptionById(subscriptionId);
  if (!subscription) {
    return { shouldSuspend: false };
  }

  const now = new Date();
  let shouldSuspend = false;
  let reason: string | undefined;

  // Check daily traffic limit
  if (subscription.lastDailyResetDate) {
    const lastReset = new Date(subscription.lastDailyResetDate);
    const daysPassed = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysPassed >= 1) {
      // Reset daily traffic
      await db.resetDailyTraffic(subscriptionId);
    } else if (subscription.dailyTrafficUsed >= subscription.dailyTrafficLimit) {
      shouldSuspend = true;
      reason = '今日流量已用尽，请等待明天刷新';
    }
  } else {
    // First time checking, set the reset date
    await db.updateSubscription(subscriptionId, {
      lastDailyResetDate: now,
    });
  }

  // Check monthly traffic limit
  if (subscription.lastMonthlyResetDate) {
    const lastReset = new Date(subscription.lastMonthlyResetDate);
    const monthsPassed = (now.getFullYear() - lastReset.getFullYear()) * 12 + 
                        (now.getMonth() - lastReset.getMonth());
    
    if (monthsPassed >= 1) {
      // Reset monthly traffic
      await db.resetMonthlyTraffic(subscriptionId);
    } else if (subscription.monthlyTrafficUsed >= subscription.monthlyTrafficLimit) {
      shouldSuspend = true;
      reason = '本月流量已用尽，请等待下个月刷新';
    }
  } else {
    // First time checking, set the reset date
    await db.updateSubscription(subscriptionId, {
      lastMonthlyResetDate: now,
    });
  }

  if (shouldSuspend) {
    // Suspend the subscription
    await db.updateSubscription(subscriptionId, {
      status: 'suspended',
    });
  }

  const dailyRemaining = Math.max(0, subscription.dailyTrafficLimit - subscription.dailyTrafficUsed);
  const monthlyRemaining = Math.max(0, subscription.monthlyTrafficLimit - subscription.monthlyTrafficUsed);

  return {
    shouldSuspend,
    reason,
    dailyRemaining,
    monthlyRemaining,
  };
}

/**
 * Log traffic usage and check if limits are exceeded
 */
export async function logTrafficUsage(
  userId: number,
  uploadBytes: number,
  downloadBytes: number
): Promise<{
  success: boolean;
  suspended?: boolean;
  reason?: string;
}> {
  const subscription = await db.getUserSubscription(userId);
  if (!subscription) {
    return { success: false };
  }

  const totalBytes = uploadBytes + downloadBytes;

  // Update traffic usage
  await db.updateSubscription(subscription.id, {
    trafficUsed: subscription.trafficUsed + totalBytes,
    dailyTrafficUsed: subscription.dailyTrafficUsed + totalBytes,
    monthlyTrafficUsed: subscription.monthlyTrafficUsed + totalBytes,
  });

  // Check if limits are exceeded
  const status = await checkAndUpdateTrafficStatus(subscription.id);

  return {
    success: true,
    suspended: status.shouldSuspend,
    reason: status.reason,
  };
}

/**
 * Get traffic status for a user
 */
export async function getTrafficStatus(userId: number) {
  const subscription = await db.getUserSubscription(userId);
  if (!subscription) {
    return null;
  }

  const status = await checkAndUpdateTrafficStatus(subscription.id);

  return {
    status: subscription.status,
    dailyLimit: subscription.dailyTrafficLimit,
    dailyUsed: subscription.dailyTrafficUsed,
    dailyRemaining: status.dailyRemaining,
    monthlyLimit: subscription.monthlyTrafficLimit,
    monthlyUsed: subscription.monthlyTrafficUsed,
    monthlyRemaining: status.monthlyRemaining,
    isSuspended: subscription.status === 'suspended',
    suspendReason: status.reason,
  };
}

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
