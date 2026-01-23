import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { calculateFreeTrialExpiration } from "./deviceFingerprint";

export const freeTrialRouter = router({
  activate: protectedProcedure
    .input(z.object({
      deviceFingerprint: z.string(),
      userAgent: z.string().optional(),
      screenResolution: z.string().optional(),
      timezone: z.string().optional(),
      language: z.string().optional(),
      cores: z.number().optional(),
      memory: z.number().optional(),
      platform: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!/^[a-f0-9]{64}$/.test(input.deviceFingerprint)) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: '设备指纹格式无效' });
      }

      const existingRecord = await db.getDeviceFingerprintRecord(input.deviceFingerprint);
      if (existingRecord) {
        if (existingRecord.expiresAt && existingRecord.expiresAt > new Date()) {
          throw new TRPCError({ code: 'CONFLICT', message: '该设备已激活免费版，请等待过期后再试' });
        }
        throw new TRPCError({ code: 'CONFLICT', message: '该设备已使用过免费版体验' });
      }

      const userSub = await db.getUserSubscription(ctx.user.id);
      const activeFreeTrialSub = userSub && userSub.planName === '免费版' && userSub.status === 'active' && userSub.endDate > new Date() ? userSub : null;
      if (activeFreeTrialSub) {
        throw new TRPCError({ code: 'CONFLICT', message: '您已有一个活跃的免费版订阅' });
      }

      const expiresAt = calculateFreeTrialExpiration();
      await db.createDeviceFingerprintRecord({
        fingerprint: input.deviceFingerprint,
        userId: ctx.user.id,
        planName: '免费版',
        userAgent: input.userAgent,
        screenResolution: input.screenResolution,
        timezone: input.timezone,
        language: input.language,
        hardwareInfo: JSON.stringify({
          cores: input.cores,
          memory: input.memory,
          platform: input.platform,
        }),
        activatedAt: new Date(),
        expiresAt,
      });

      const plans = await db.getActivePlans();
      const freeTrialPlan = plans.find(p => p.name === '免费版');
      if (!freeTrialPlan) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: '免费版套餐配置错误' });
      }

      await db.activateSubscription(
        ctx.user.id,
        '免费版',
        freeTrialPlan.duration,
        freeTrialPlan.trafficLimit
      );

      return {
        success: true,
        message: '免费版已激活，有效期 1 天',
        expiresAt,
      };
    }),

  checkDevice: publicProcedure
    .input(z.object({
      deviceFingerprint: z.string(),
    }))
    .query(async ({ input }) => {
      const record = await db.getDeviceFingerprintRecord(input.deviceFingerprint);
      if (!record) {
        return { canUseFreeTrialOnDevice: true };
      }

      const isExpired = record.expiresAt ? record.expiresAt <= new Date() : true;
      return {
        canUseFreeTrialOnDevice: false,
        message: isExpired ? '该设备的免费版已过期' : '该设备已激活免费版',
        expiresAt: record.expiresAt,
        usedBy: record.userId,
      };
    }),

  stats: protectedProcedure.use(({ ctx, next }) => {
    if (ctx.user.role !== 'admin') {
      throw new TRPCError({ code: 'FORBIDDEN', message: '需要管理员权限' });
    }
    return next({ ctx });
  }).query(async () => {
    return await db.getFreeTrialStats();
  }),
});
