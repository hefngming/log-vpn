import { router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { autoReviewRules, autoReviewLogs } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: '需要管理员权限' });
  }
  return next({ ctx });
});

export const autoReviewRouter = router({
  // Get all auto review rules
  getRules: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
    return await db.select().from(autoReviewRules).orderBy(desc(autoReviewRules.priority));
  }),

  // Get a single rule by ID
  getRule: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      const [rule] = await db.select().from(autoReviewRules).where(eq(autoReviewRules.id, input.id));
      if (!rule) {
        throw new TRPCError({ code: 'NOT_FOUND', message: '规则不存在' });
      }
      return rule;
    }),

  // Create a new auto review rule
  createRule: adminProcedure
    .input(z.object({
      name: z.string().min(1, '规则名称不能为空'),
      description: z.string().optional(),
      isEnabled: z.boolean().default(true),
      priority: z.number().default(0),
      conditions: z.string(), // JSON string
      action: z.enum(['auto_approve', 'auto_reject', 'manual_review']),
      autoApproveDays: z.number().optional(),
      autoApproveTrafficGB: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      const [newRule] = await db.insert(autoReviewRules).values({
        ...input,
        createdBy: ctx.user.id,
      }).$returningId();
      
      return { success: true, ruleId: newRule.id };
    }),

  // Update an existing rule
  updateRule: adminProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1, '规则名称不能为空').optional(),
      description: z.string().optional(),
      isEnabled: z.boolean().optional(),
      priority: z.number().optional(),
      conditions: z.string().optional(),
      action: z.enum(['auto_approve', 'auto_reject', 'manual_review']).optional(),
      autoApproveDays: z.number().optional(),
      autoApproveTrafficGB: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      await db.update(autoReviewRules)
        .set(updateData)
        .where(eq(autoReviewRules.id, id));
      
      return { success: true };
    }),

  // Delete a rule
  deleteRule: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      await db.delete(autoReviewRules).where(eq(autoReviewRules.id, input.id));
      return { success: true };
    }),

  // Toggle rule enabled status
  toggleRule: adminProcedure
    .input(z.object({ id: z.number(), isEnabled: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      await db.update(autoReviewRules)
        .set({ isEnabled: input.isEnabled })
        .where(eq(autoReviewRules.id, input.id));
      
      return { success: true };
    }),

  // Get auto review logs
  getLogs: adminProcedure
    .input(z.object({
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      return await db.select()
        .from(autoReviewLogs)
        .orderBy(desc(autoReviewLogs.createdAt))
        .limit(input.limit)
        .offset(input.offset);
    }),

  // Get logs for a specific payment proof
  getLogsByProofId: adminProcedure
    .input(z.object({ paymentProofId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database not available' });
      return await db.select()
        .from(autoReviewLogs)
        .where(eq(autoReviewLogs.paymentProofId, input.paymentProofId))
        .orderBy(desc(autoReviewLogs.createdAt));
    }),
});
