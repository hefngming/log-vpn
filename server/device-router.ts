/**
 * Device fingerprint verification router
 * Implements one-account-one-device restriction
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getDeviceFingerprintByFingerprint,
  getDeviceFingerprintsByUserId,
  getActiveDeviceFingerprintByUserId,
  createDeviceFingerprint,
  updateDeviceFingerprint,
  deactivateAllDeviceFingerprintsForUser,
  activateDeviceFingerprint,
  deleteDeviceFingerprint,
  updateUserActiveDevice,
  getUserById,
} from "./db";
import { nanoid } from "nanoid";

export const deviceRouter = router({
  /**
   * Verify device fingerprint and handle device binding
   * Called during login to check if device is allowed
   */
  verifyDevice: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        fingerprint: z.string(),
        deviceInfo: z.object({
          deviceName: z.string().optional(),
          deviceType: z.string().optional(),
          os: z.string().optional(),
          osVersion: z.string().optional(),
          cpuModel: z.string().optional(),
          totalMemory: z.number().optional(),
          macAddress: z.string().optional(),
          userAgent: z.string().optional(),
          screenResolution: z.string().optional(),
          timezone: z.string().optional(),
          language: z.string().optional(),
          hardwareInfo: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, fingerprint, deviceInfo } = input;

      // Check if this fingerprint already exists
      const existingFingerprint = await getDeviceFingerprintByFingerprint(fingerprint);

      if (existingFingerprint) {
        // Fingerprint exists
        if (existingFingerprint.userId === userId) {
          // Same user, same device - allow login
          // Activate this device and deactivate others
          await deactivateAllDeviceFingerprintsForUser(userId);
          await activateDeviceFingerprint(existingFingerprint.id);

          // Generate new session ID
          const sessionId = nanoid();
          await updateUserActiveDevice(userId, fingerprint, sessionId);

          return {
            allowed: true,
            isNewDevice: false,
            sessionId,
            message: "Device verified successfully",
          };
        } else {
          // Different user trying to use same device
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "This device is already bound to another account",
          });
        }
      }

      // New device - check if user has other active devices
      const activeDevice = await getActiveDeviceFingerprintByUserId(userId);

      if (activeDevice) {
        // User has another active device - kick it out
        await deactivateAllDeviceFingerprintsForUser(userId);
      }

      // Bind new device
      const newFingerprint = await createDeviceFingerprint({
        userId,
        fingerprint,
        deviceName: deviceInfo.deviceName,
        deviceType: deviceInfo.deviceType,
        os: deviceInfo.os,
        osVersion: deviceInfo.osVersion,
        cpuModel: deviceInfo.cpuModel,
        totalMemory: deviceInfo.totalMemory,
        macAddress: deviceInfo.macAddress,
        userAgent: deviceInfo.userAgent,
        screenResolution: deviceInfo.screenResolution,
        timezone: deviceInfo.timezone,
        language: deviceInfo.language,
        hardwareInfo: deviceInfo.hardwareInfo,
        isActive: true,
        lastActiveAt: new Date(),
        bindedAt: new Date(),
      });

      // Generate session ID
      const sessionId = nanoid();
      await updateUserActiveDevice(userId, fingerprint, sessionId);

      return {
        allowed: true,
        isNewDevice: true,
        sessionId,
        message: activeDevice
          ? "New device bound. Previous device has been logged out."
          : "Device bound successfully",
      };
    }),

  /**
   * Get all devices for current user
   */
  getMyDevices: protectedProcedure.query(async ({ ctx }) => {
    const devices = await getDeviceFingerprintsByUserId(ctx.user.id);
    return devices;
  }),

  /**
   * Get active device for current user
   */
  getActiveDevice: protectedProcedure.query(async ({ ctx }) => {
    const device = await getActiveDeviceFingerprintByUserId(ctx.user.id);
    return device;
  }),

  /**
   * Unbind device (admin or user can unbind their own device)
   */
  unbindDevice: protectedProcedure
    .input(z.object({ deviceId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { deviceId } = input;

      // Get device info
      const devices = await getDeviceFingerprintsByUserId(ctx.user.id);
      const device = devices.find((d) => d.id === deviceId);

      if (!device) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Device not found",
        });
      }

      // Check permission
      if (device.userId !== ctx.user.id && ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only unbind your own devices",
        });
      }

      // Delete device
      await deleteDeviceFingerprint(deviceId);

      return {
        success: true,
        message: "Device unbound successfully",
      };
    }),

  /**
   * Check if session is still valid
   * Called periodically by client to detect if kicked out
   */
  checkSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        fingerprint: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { sessionId, fingerprint } = input;

      // Get user's current active device
      const user = await getUserById(ctx.user.id);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Check if session matches
      const isValid =
        user.activeDeviceId === fingerprint &&
        user.activeDeviceSessionId === sessionId;

      if (!isValid) {
        return {
          valid: false,
          message: "Your account has been logged in on another device",
        };
      }

      // Update last active time
      const activeDevice = await getActiveDeviceFingerprintByUserId(ctx.user.id);
      if (activeDevice) {
        await updateDeviceFingerprint(activeDevice.id, {
          lastActiveAt: new Date(),
        });
      }

      return {
        valid: true,
        message: "Session is valid",
      };
    }),
});
