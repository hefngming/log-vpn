/**
 * Device Session Management Module
 * Ensures only one device can be online per account at a time
 */

import * as db from "./db";
import { nanoid } from "nanoid";

/**
 * Generate a unique device session ID
 */
export function generateSessionId(): string {
  return nanoid(32);
}

/**
 * Register a new device session for a user
 * If another device is already active, it will be kicked off
 */
export async function registerDeviceSession(
  userId: number,
  deviceId: string
): Promise<{
  success: boolean;
  sessionId: string;
  previousDeviceId?: string | null;
  message?: string;
}> {
  const user = await db.getUserById(userId);
  if (!user) {
    return { success: false, sessionId: "", message: "用户不存在" };
  }

  const sessionId = generateSessionId();
  const previousDeviceId = user.activeDeviceId;

  // Update user's active device
  await db.updateUser(userId, {
    activeDeviceId: deviceId || undefined,
    activeDeviceSessionId: sessionId,
    lastActiveAt: new Date(),
  });

  return {
    success: true,
    sessionId,
    previousDeviceId,
    message: previousDeviceId && previousDeviceId !== deviceId 
      ? "新设备已登录，旧设备已被踢下线" 
      : "设备已注册",
  };
}

/**
 * Verify if a device session is still valid
 */
export async function verifyDeviceSession(
  userId: number,
  deviceId: string,
  sessionId: string
): Promise<{
  valid: boolean;
  message?: string;
  shouldKickOff?: boolean;
}> {
  const user = await db.getUserById(userId);
  if (!user) {
    return { valid: false, message: "用户不存在" };
  }

  // Check if this is the active device
  if (user.activeDeviceId !== deviceId) {
    return {
      valid: false,
      message: "您的账号已在其他设备上登录",
      shouldKickOff: true,
    };
  }

  // Check if session ID matches
  if (user.activeDeviceSessionId !== sessionId) {
    return {
      valid: false,
      message: "会话已过期，请重新登录",
      shouldKickOff: true,
    };
  }

  // Update last active time
  await db.updateUser(userId, {
    lastActiveAt: new Date(),
  });

  return { valid: true };
}

/**
 * Kick off a device session (logout)
 */
export async function kickOffDeviceSession(userId: number): Promise<void> {
  await db.updateUser(userId, {
    activeDeviceId: undefined,
    activeDeviceSessionId: undefined,
  });
}

/**
 * Get current active device info
 */
export async function getActiveDeviceInfo(userId: number) {
  const user = await db.getUserById(userId);
  if (!user) {
    return null;
  }

  return {
    deviceId: user.activeDeviceId,
    sessionId: user.activeDeviceSessionId,
    lastActiveAt: user.lastActiveAt,
  };
}
