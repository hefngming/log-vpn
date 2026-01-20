import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { sendVerificationCode, generateVerificationCode } from "./email";
import * as bcrypt from "bcryptjs";
import { storagePut } from "./storage";
import { notifyNewPaymentProof } from "./telegram";
import { sendSubscriptionActivatedEmail } from "./email";
import { syncNodesFromXui } from "./xui";
import { freeTrialRouter } from "./freetrial-router";
import { deviceRouter } from "./device-router";
import { referralRouter } from "./referral-router";
import { encryptNodeList } from "./nodeEncryption";
import { checkForUpdate, getLatestVersion, getAllVersions, getVersionInfo } from "./versionManagement";
import { getUserTrafficUsage } from "./trafficQuery";

// Admin procedure - requires admin role
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: '需要管理员权限' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  freeTrial: freeTrialRouter,
  referral: referralRouter,
  device: deviceRouter,
  
  download: router({
    getFile: publicProcedure
      .input(z.object({ filename: z.string() }))
      .query(async ({ input }) => {
        // 返回下载链接，前端会直接访问
        const baseUrl = 'https://dj.siumingho.dpdns.org/downloads';
        return {
          url: `${baseUrl}/${input.filename}`,
          filename: input.filename,
        };
      }),
  }),
  
  version: router({
    check: publicProcedure
      .input(z.object({ currentVersion: z.string() }))
      .query(({ input }) => {
        return checkForUpdate(input.currentVersion);
      }),
    
    latest: publicProcedure.query(() => {
      const latestVersion = getLatestVersion();
      return getVersionInfo(latestVersion);
    }),
    
    all: publicProcedure.query(() => {
      return getAllVersions();
    }),
    
    update: adminProcedure
      .input(z.object({
        version: z.string(),
        releaseDate: z.string(),
        downloadUrl: z.string().url(),
        releaseNotes: z.string(),
        mandatory: z.boolean().optional().default(false),
      }))
      .mutation(({ input }) => {
        return { success: true, message: "Version updated successfully" };
      }),
  }),
  
  auth: router({
    // 用户登录
    login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
        machineId: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const user = await db.getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({ code: 'NOT_FOUND', message: '邮箱或密码错误' });
        }

        const passwordHash = await db.getUserPasswordHash(user.id);
        if (!passwordHash) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: '邮箱或密码错误' });
        }
        const passwordMatch = await bcrypt.compare(input.password, passwordHash);
        if (!passwordMatch) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: '邮箱或密码错误' });
        }

        // 返回用户信息和令牌
        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            token: 'mock-token-' + user.id,
          },
        };
      }),

    // 用户注册
    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }))
      .mutation(async ({ input }) => {
        const existingUser = await db.getUserByEmail(input.email);
        if (existingUser) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: '该邮箱已注册' });
        }

        const passwordHash = await bcrypt.hash(input.password, 10);
        const newUser = await db.createUser({
          email: input.email,
          passwordHash,
          role: 'user',
        });

        return {
          success: true,
          message: '注册成功',
          user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
          },
        };
      }),

    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    
    // Send verification code for password reset
    sendResetCode: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const user = await db.getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({ code: 'NOT_FOUND', message: '该邮箱未注册' });
        }
        
        const code = generateVerificationCode();
        const result = await db.createVerificationCode(input.email, code, 'password_reset');
        
        if (!result.success) {
          throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: result.error || '请稍后再试' });
        }
        
        const sent = await sendVerificationCode(input.email, code, 'password_reset');
        if (!sent) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: '发送验证码失败，请稍后再试' });
        }
        
        return { success: true, message: '验证码已发送到您的邮箱' };
      }),
    
    // Reset password with verification code
    resetPassword: publicProcedure
      .input(z.object({
        email: z.string().email(),
        code: z.string().length(6),
        newPassword: z.string().min(6),
      }))
      .mutation(async ({ input }) => {
        const valid = await db.verifyCode(input.email, input.code, 'password_reset');
        if (!valid) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: '验证码无效或已过期' });
        }
        
        const user = await db.getUserByEmail(input.email);
        if (!user) {
          throw new TRPCError({ code: 'NOT_FOUND', message: '用户不存在' });
        }
        
        const passwordHash = await bcrypt.hash(input.newPassword, 10);
        await db.setUserPassword(user.id, passwordHash);
        
        return { success: true, message: '密码重置成功' };
      }),
    
    // Send verification code for password change (authenticated)
    sendChangePasswordCode: protectedProcedure
      .mutation(async ({ ctx }) => {
        if (!ctx.user.email) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: '请先绑定邮箱' });
        }
        
        const code = generateVerificationCode();
        const result = await db.createVerificationCode(ctx.user.email, code, 'change_password');
        
        if (!result.success) {
          throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: result.error || '请稍后再试' });
        }
        
        const sent = await sendVerificationCode(ctx.user.email, code, 'change_password');
        if (!sent) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: '发送验证码失败，请稍后再试' });
        }
        
        return { success: true, message: '验证码已发送到您的邮箱' };
      }),
    
    // Change password with verification code (authenticated)
    changePassword: protectedProcedure
      .input(z.object({
        code: z.string().length(6),
        newPassword: z.string().min(6),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user.email) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: '请先绑定邮箱' });
        }
        
        const valid = await db.verifyCode(ctx.user.email, input.code, 'change_password');
        if (!valid) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: '验证码无效或已过期' });
        }
        
        const passwordHash = await bcrypt.hash(input.newPassword, 10);
        await db.setUserPassword(ctx.user.id, passwordHash);
        
        return { success: true, message: '密码修改成功' };
      }),
  }),

  // User subscription and profile
  user: router({
    getSubscription: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserSubscription(ctx.user.id);
    }),
    
    getOrders: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserOrders(ctx.user.id);
    }),
    
    getTrafficStats: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserTrafficStats(ctx.user.id);
    }),
  }),

  // Nodes - public for listing, protected for details
  nodes: router({
    // Sync 3x-ui nodes
    sync: protectedProcedure.mutation(async ({ ctx }) => {
      // Only admin can sync nodes
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Only admin can sync nodes' });
      }
      
      const result = await syncNodesFromXui();
      return result;
    }),
    
    list: publicProcedure.query(async () => {
      return await db.getActiveNodes();
    }),
    
    all: adminProcedure.query(async () => {
      return await db.getAllNodes();
    }),
    
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        country: z.string(),
        countryCode: z.string(),
        protocol: z.enum(['vless', 'trojan', 'shadowsocks', 'vmess']),
        address: z.string(),
        port: z.number(),
        settings: z.string().optional(),
        isActive: z.boolean().default(true),
        sortOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await db.createNode(input);
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        country: z.string().optional(),
        countryCode: z.string().optional(),
        protocol: z.enum(['vless', 'trojan', 'shadowsocks', 'vmess']).optional(),
        address: z.string().optional(),
        port: z.number().optional(),
        settings: z.string().optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateNode(id, data);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteNode(input.id);
        return { success: true };
      }),
    
    getEncrypted: publicProcedure.query(async () => {
      const nodes = await db.getActiveNodes();
      const encryptedNodes = encryptNodeList(
        nodes.map((node: any) => ({
          id: node.id,
          name: node.name,
          protocol: node.protocol,
          address: node.address,
          port: node.port,
          country: node.country,
          countryCode: node.countryCode,
          settings: node.settings,
        }))
      );
      return {
        success: true,
        nodes: encryptedNodes,
        count: encryptedNodes.length,
        timestamp: Date.now(),
      };
    })
  }),

  // Plans
  plans: router({
    list: publicProcedure.query(async () => {
      return await db.getActivePlans();
    }),
    
    all: adminProcedure.query(async () => {
      return await db.getAllPlans();
    }),
    
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.string(),
        duration: z.number(),
        trafficLimit: z.number(),
        isActive: z.boolean().default(true),
        sortOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await db.createPlan(input);
        return { success: true };
      }),
  }),

  // Orders
  orders: router({
    create: protectedProcedure
      .input(z.object({
        planId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const plan = await db.getPlanById(input.planId);
        if (!plan) {
          throw new TRPCError({ code: 'NOT_FOUND', message: '套餐不存在' });
        }
        
        const orderNo = await db.createOrder({
          userId: ctx.user.id,
          planName: plan.name,
          amount: plan.price,
          status: 'pending',
        });
        
        return { orderNo, amount: plan.price };
      }),
    
    all: adminProcedure.query(async () => {
      return await db.getAllOrders();
    }),
    
    confirm: adminProcedure
      .input(z.object({
        orderNo: z.string(),
        paymentMethod: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const order = await db.getOrderByNo(input.orderNo);
        if (!order) {
          throw new TRPCError({ code: 'NOT_FOUND', message: '订单不存在' });
        }
        
        // Update order status
        await db.updateOrderStatus(input.orderNo, 'paid', input.paymentMethod || 'manual');
        
        // Get plan info and activate subscription
        const plans = await db.getActivePlans();
        const plan = plans.find(p => p.name === order.planName);
        if (plan) {
          await db.activateSubscription(order.userId, plan.name, plan.duration, plan.trafficLimit);
        }
        
        return { success: true };
      }),
    
    cancel: adminProcedure
      .input(z.object({ orderNo: z.string() }))
      .mutation(async ({ input }) => {
        await db.updateOrderStatus(input.orderNo, 'failed');
        return { success: true };
      }),
  }),

  // Payment proofs - user can upload payment screenshots
  paymentProof: router({
    upload: protectedProcedure
      .input(z.object({
        planName: z.string(),
        amount: z.string(),
        imageBase64: z.string(), // Base64 encoded image
        imageType: z.string().default('image/jpeg'),
      }))
      .mutation(async ({ ctx, input }) => {
        // Upload image to S3
        const buffer = Buffer.from(input.imageBase64, 'base64');
        const fileKey = `payment-proofs/${ctx.user.id}-${Date.now()}.jpg`;
        const { url } = await storagePut(fileKey, buffer, input.imageType);
        
        // Create payment proof record
        const proofId = await db.createPaymentProof({
          userId: ctx.user.id,
          userEmail: ctx.user.email || undefined,
          planName: input.planName,
          amount: input.amount,
          imageUrl: url,
          status: 'pending',
        });
        
        // Send Telegram notification to admin
        await notifyNewPaymentProof(
          ctx.user.email || ctx.user.name || `User #${ctx.user.id}`,
          input.planName,
          input.amount
        );
        
        return { success: true, proofId };
      }),
    
    // Get user's own payment proofs
    myProofs: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserPaymentProofs(ctx.user.id);
    }),
  }),

  // Admin functions
  admin: router({
    getStats: adminProcedure.query(async () => {
      return await db.getAdminStats();
    }),
    
    getUsers: adminProcedure.query(async () => {
      return await db.getUsersWithSubscriptions();
    }),
    
    activateUser: adminProcedure
      .input(z.object({
        userId: z.number(),
        planName: z.string(),
        days: z.number(),
        trafficLimit: z.number().default(1073741824 * 50), // 50GB default
      }))
      .mutation(async ({ input }) => {
        await db.activateSubscription(input.userId, input.planName, input.days, input.trafficLimit);
        return { success: true };
      }),
    
    // Get pending payment proofs for review
    getPendingProofs: adminProcedure.query(async () => {
      return await db.getPendingPaymentProofs();
    }),
    
    // Get all payment proofs
    getAllProofs: adminProcedure.query(async () => {
      return await db.getAllPaymentProofs();
    }),
    
    // Approve payment proof and activate subscription
    approveProof: adminProcedure
      .input(z.object({
        proofId: z.number(),
        days: z.number().default(30),
        trafficLimit: z.number().default(1073741824 * 200), // 200GB default
        adminNote: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const proof = await db.getPaymentProofById(input.proofId);
        if (!proof) {
          throw new TRPCError({ code: 'NOT_FOUND', message: '凭证不存在' });
        }
        
        if (proof.status !== 'pending') {
          throw new TRPCError({ code: 'BAD_REQUEST', message: '该凭证已处理' });
        }
        
        // Update proof status
        await db.updatePaymentProofStatus(input.proofId, 'approved', ctx.user.id, input.adminNote);
        
        // Activate user subscription
        await db.activateSubscription(proof.userId, proof.planName, input.days, input.trafficLimit);
        
        // Send confirmation email if user has email
        if (proof.userEmail) {
          await sendSubscriptionActivatedEmail(proof.userEmail, proof.planName, input.days);
        }
        
        return { success: true };
      }),
    
    // Reject payment proof
    rejectProof: adminProcedure
      .input(z.object({
        proofId: z.number(),
        adminNote: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const proof = await db.getPaymentProofById(input.proofId);
        if (!proof) {
          throw new TRPCError({ code: 'NOT_FOUND', message: '凭证不存在' });
        }
        
        await db.updatePaymentProofStatus(input.proofId, 'rejected', ctx.user.id, input.adminNote);
        
        return { success: true };
      }),
  }),

  // Traffic reporting (for client)
  traffic: router({
    getUsage: protectedProcedure.query(async ({ ctx }) => {
      const usage = await getUserTrafficUsage(ctx.user.id.toString());
      if (!usage) {
        throw new TRPCError({ code: 'NOT_FOUND', message: '未找到订阅信息' });
      }
      return usage;
    }),
    
    report: protectedProcedure
      .input(z.object({
        upload: z.number(),
        download: z.number(),
        nodeId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.logTraffic({
          userId: ctx.user.id,
          nodeId: input.nodeId,
          upload: input.upload,
          download: input.download,
        });
        
        // Update subscription traffic
        await db.updateSubscriptionTraffic(ctx.user.id, input.upload + input.download);
        
        return { success: true };
      }),
    
    check: protectedProcedure.query(async ({ ctx }) => {
      const subscription = await db.getUserSubscription(ctx.user.id);
      
      if (!subscription) {
        return { allowed: false, reason: '无有效订阅' };
      }
      
      if (subscription.status !== 'active') {
        return { allowed: false, reason: '订阅已过期' };
      }
      
      if (new Date(subscription.endDate) < new Date()) {
        return { allowed: false, reason: '订阅已过期' };
      }
      
      if (subscription.trafficUsed >= subscription.trafficLimit) {
        return { allowed: false, reason: '流量已用完' };
      }
      
      return { 
        allowed: true, 
        subscription: {
          planName: subscription.planName,
          trafficUsed: subscription.trafficUsed,
          trafficLimit: subscription.trafficLimit,
          endDate: subscription.endDate,
        }
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;

