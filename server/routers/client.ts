/**
 * Client API Router for Hiddify-Next LogVPN Client
 * 
 * This module provides API endpoints specifically for the LogVPN desktop/mobile client
 * based on Hiddify-Next. It handles client authentication, subscription verification,
 * node retrieval, and configuration generation.
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { eq, and } from "drizzle-orm";
import { users, subscriptions, nodes } from "../../drizzle/schema";
import { getDb } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../_core/env";

/**
 * Client authentication token payload
 */
interface ClientTokenPayload {
  userId: number;
  email: string;
  deviceId: string;
  type: "client";
}

/**
 * Generate JWT token for client authentication
 */
function generateClientToken(payload: ClientTokenPayload): string {
  return jwt.sign(payload, ENV.cookieSecret, {
    expiresIn: "30d", // Client tokens last 30 days
  });
}

/**
 * Verify client JWT token
 */
function verifyClientToken(token: string): ClientTokenPayload {
  try {
    const payload = jwt.verify(token, ENV.cookieSecret) as ClientTokenPayload;
    if (payload.type !== "client") {
      throw new Error("Invalid token type");
    }
    return payload;
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid or expired token",
    });
  }
}

/**
 * Generate Sing-box configuration for a node
 */
function generateSingboxConfig(node: typeof nodes.$inferSelect, userId: number) {
  const baseConfig = {
    log: {
      level: "info",
      timestamp: true,
    },
    dns: {
      servers: [
        {
          tag: "google",
          address: "tls://8.8.8.8",
        },
        {
          tag: "local",
          address: "223.5.5.5",
          detour: "direct",
        },
      ],
      rules: [
        {
          outbound: "any",
          server: "local",
        },
      ],
    },
    inbounds: [
      {
        type: "mixed",
        tag: "mixed-in",
        listen: "127.0.0.1",
        listen_port: 2080,
      },
    ],
    outbounds: [] as any[],
    route: {
      rules: [
        {
          protocol: "dns",
          outbound: "dns-out",
        },
        {
          ip_is_private: true,
          outbound: "direct",
        },
      ],
      auto_detect_interface: true,
    },
  };

  // Parse node settings
  const settings = typeof node.settings === "string" 
    ? JSON.parse(node.settings) 
    : node.settings;

  // Generate outbound based on protocol
  let outbound: any = {
    type: node.protocol,
    tag: "proxy",
    server: node.address,
    server_port: node.port,
  };

  switch (node.protocol) {
    case "vless":
      outbound = {
        ...outbound,
        uuid: settings.uuid || settings.id,
        flow: settings.flow || "",
        tls: {
          enabled: settings.security === "tls" || settings.security === "reality",
          server_name: settings.sni || settings.serverName || node.address,
          insecure: settings.allowInsecure || false,
        },
      };
      break;

    case "trojan":
      outbound = {
        ...outbound,
        password: settings.password,
        tls: {
          enabled: true,
          server_name: settings.sni || settings.serverName || node.address,
          insecure: settings.allowInsecure || false,
        },
      };
      break;

    case "shadowsocks":
      outbound = {
        ...outbound,
        method: settings.method || settings.cipher,
        password: settings.password,
      };
      break;

    case "vmess":
      outbound = {
        ...outbound,
        uuid: settings.uuid || settings.id,
        security: settings.security || "auto",
        alter_id: settings.alterId || 0,
      };
      break;
  }

  baseConfig.outbounds.push(outbound);
  baseConfig.outbounds.push({
    type: "direct",
    tag: "direct",
  });
  baseConfig.outbounds.push({
    type: "dns",
    tag: "dns-out",
  });

  return baseConfig;
}

export const clientRouter = router({
  /**
   * Client login endpoint
   * Authenticates user and returns JWT token for client use
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        deviceId: z.string(), // Unique device identifier
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      // Find user by email
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (!user || !user.passwordHash) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(
        input.password,
        user.passwordHash
      );

      if (!isValidPassword) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Check device binding (one device per account)
      if (user.activeDeviceId && user.activeDeviceId !== input.deviceId) {
        // Update to new device (kicks out old device)
        await db
          .update(users)
          .set({
            activeDeviceId: input.deviceId,
            lastActiveAt: new Date(),
          })
          .where(eq(users.id, user.id));
      } else if (!user.activeDeviceId) {
        // First time login, bind device
        await db
          .update(users)
          .set({
            activeDeviceId: input.deviceId,
            lastActiveAt: new Date(),
          })
          .where(eq(users.id, user.id));
      }

      // Generate client token
      const token = generateClientToken({
        userId: user.id,
        email: user.email!,
        deviceId: input.deviceId,
        type: "client",
      });

      return {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    }),

  /**
   * Verify client token and get user info
   */
  verifyToken: publicProcedure
    .input(
      z.object({
        token: z.string(),
        deviceId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      const payload = verifyClientToken(input.token);

      // Verify device ID matches
      if (payload.deviceId !== input.deviceId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Device mismatch",
        });
      }

      // Get user info
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, payload.userId))
        .limit(1);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Check if device is still active
      if (user.activeDeviceId !== input.deviceId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Device has been replaced",
        });
      }

      return {
        valid: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    }),

  /**
   * Get subscription status
   */
  getSubscription: publicProcedure
    .input(
      z.object({
        token: z.string(),
        deviceId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      const payload = verifyClientToken(input.token);

      // Verify device
      if (payload.deviceId !== input.deviceId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Device mismatch",
        });
      }

      // Get active subscription
      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, payload.userId),
            eq(subscriptions.status, "active")
          )
        )
        .limit(1);

      if (!subscription) {
        return {
          active: false,
          message: "No active subscription",
        };
      }

      // Check if expired
      const now = new Date();
      const endDate = new Date(subscription.endDate);
      if (endDate < now) {
        // Update status to expired
        await db
          .update(subscriptions)
          .set({ status: "expired" })
          .where(eq(subscriptions.id, subscription.id));

        return {
          active: false,
          message: "Subscription expired",
        };
      }

      // Calculate remaining days
      const remainingDays = Math.ceil(
        (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        active: true,
        subscription: {
          planName: subscription.planName,
          status: subscription.status,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          remainingDays,
          trafficUsed: Number(subscription.trafficUsed),
          trafficLimit: Number(subscription.trafficLimit),
          dailyTrafficUsed: Number(subscription.dailyTrafficUsed),
          dailyTrafficLimit: Number(subscription.dailyTrafficLimit),
          monthlyTrafficUsed: Number(subscription.monthlyTrafficUsed),
          monthlyTrafficLimit: Number(subscription.monthlyTrafficLimit),
        },
      };
    }),

  /**
   * Get available nodes for client
   */
  getNodes: publicProcedure
    .input(
      z.object({
        token: z.string(),
        deviceId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      const payload = verifyClientToken(input.token);

      // Verify device
      if (payload.deviceId !== input.deviceId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Device mismatch",
        });
      }

      // Check subscription status
      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, payload.userId),
            eq(subscriptions.status, "active")
          )
        )
        .limit(1);

      if (!subscription) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No active subscription",
        });
      }

      // Get all active nodes
      const activeNodes = await db
        .select()
        .from(nodes)
        .where(eq(nodes.isActive, true))
        .orderBy(nodes.sortOrder);

      return {
        nodes: activeNodes.map((node) => ({
          id: node.id,
          name: node.name,
          country: node.country,
          countryCode: node.countryCode,
          protocol: node.protocol,
          // Don't expose sensitive settings directly
        })),
      };
    }),

  /**
   * Get Sing-box configuration for a specific node
   */
  getNodeConfig: publicProcedure
    .input(
      z.object({
        token: z.string(),
        deviceId: z.string(),
        nodeId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      const payload = verifyClientToken(input.token);

      // Verify device
      if (payload.deviceId !== input.deviceId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Device mismatch",
        });
      }

      // Check subscription
      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, payload.userId),
            eq(subscriptions.status, "active")
          )
        )
        .limit(1);

      if (!subscription) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No active subscription",
        });
      }

      // Get node
      const [node] = await db
        .select()
        .from(nodes)
        .where(and(eq(nodes.id, input.nodeId), eq(nodes.isActive, true)))
        .limit(1);

      if (!node) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Node not found",
        });
      }

      // Generate Sing-box config
      const config = generateSingboxConfig(node, payload.userId);

      return {
        nodeId: node.id,
        nodeName: node.name,
        config,
      };
    }),

  /**
   * Report traffic usage from client
   */
  reportTraffic: publicProcedure
    .input(
      z.object({
        token: z.string(),
        deviceId: z.string(),
        upload: z.number(), // bytes
        download: z.number(), // bytes
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      const payload = verifyClientToken(input.token);

      // Verify device
      if (payload.deviceId !== input.deviceId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Device mismatch",
        });
      }

      const totalTraffic = input.upload + input.download;

      // Update subscription traffic
      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, payload.userId),
            eq(subscriptions.status, "active")
          )
        )
        .limit(1);

      if (!subscription) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No active subscription",
        });
      }

      // Update traffic usage
      await db
        .update(subscriptions)
        .set({
          trafficUsed: Number(subscription.trafficUsed) + totalTraffic,
          dailyTrafficUsed: Number(subscription.dailyTrafficUsed) + totalTraffic,
          monthlyTrafficUsed: Number(subscription.monthlyTrafficUsed) + totalTraffic,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.id, subscription.id));

      return {
        success: true,
        message: "Traffic reported successfully",
      };
    }),
});
