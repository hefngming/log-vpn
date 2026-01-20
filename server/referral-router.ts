import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from './_core/trpc';
import * as db from './db';

export const referralRouter = router({
  // 获取或创建用户的推荐码
  getMyReferralCode: protectedProcedure
    .query(async ({ ctx }) => {
      const code = await db.createReferralCode(ctx.user.id);
      return { code };
    }),

  // 获取推荐统计
  getMyReferralStats: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getReferralStats(ctx.user.id);
    }),

  // 获取推荐记录
  getMyReferralRecords: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getReferralRecords(ctx.user.id);
    }),

  // 验证推荐码（用于注册时）
  validateReferralCode: publicProcedure
    .input(z.object({
      code: z.string(),
    }))
    .query(async ({ input }) => {
      const referrerId = await db.getReferrerByCode(input.code);
      return { valid: referrerId !== null, referrerId };
    }),
});
