import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  subscriptions, InsertSubscription, 
  orders, InsertOrder,
  nodes, InsertNode,
  plans, InsertPlan,
  paymentConfigs,
  systemSettings,
  trafficLogs, InsertTrafficLog,
  verificationCodes, InsertVerificationCode,
  userPasswords, InsertUserPassword,
  paymentProofs, InsertPaymentProof,
  deviceFingerprints, InsertDeviceFingerprint,
  deviceWhitelist, InsertDeviceWhitelist
} from "../drizzle/schema";
import { ENV } from './_core/env';
import { nanoid } from 'nanoid';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== User Functions ====================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(users).orderBy(desc(users.createdAt));
}

export async function getUsersWithSubscriptions() {
  const db = await getDb();
  if (!db) return [];
  
  const userList = await db.select().from(users).orderBy(desc(users.createdAt));
  const result = [];
  
  for (const user of userList) {
    const sub = await db.select().from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .orderBy(desc(subscriptions.endDate))
      .limit(1);
    
    result.push({
      ...user,
      subscription: sub.length > 0 ? sub[0] : null
    });
  }
  
  return result;
}

// ==================== Subscription Functions ====================

export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.endDate))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createSubscription(data: InsertSubscription) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(subscriptions).values(data);
}

export async function activateSubscription(userId: number, planName: string, days: number, trafficLimit: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const now = new Date();
  const endDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  
  // Check if user has existing subscription
  const existing = await getUserSubscription(userId);
  
  if (existing && existing.status === 'active' && new Date(existing.endDate) > now) {
    // Extend existing subscription
    const newEndDate = new Date(new Date(existing.endDate).getTime() + days * 24 * 60 * 60 * 1000);
    await db.update(subscriptions)
      .set({ 
        endDate: newEndDate, 
        planName,
        trafficLimit: existing.trafficLimit + trafficLimit,
        updatedAt: now 
      })
      .where(eq(subscriptions.id, existing.id));
  } else {
    // Create new subscription
    await db.insert(subscriptions).values({
      userId,
      planName,
      status: 'active',
      trafficLimit,
      trafficUsed: 0,
      startDate: now,
      endDate,
    });
  }
}

export async function updateSubscriptionTraffic(userId: number, bytesUsed: number) {
  const db = await getDb();
  if (!db) return;
  
  const sub = await getUserSubscription(userId);
  if (!sub) return;
  
  await db.update(subscriptions)
    .set({ trafficUsed: sub.trafficUsed + bytesUsed })
    .where(eq(subscriptions.id, sub.id));
}

// ==================== Order Functions ====================

export async function createOrder(data: Omit<InsertOrder, 'orderNo'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const orderNo = `ORD${Date.now()}${nanoid(6)}`;
  await db.insert(orders).values({ ...data, orderNo });
  
  return orderNo;
}

export async function getOrderByNo(orderNo: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(orders).where(eq(orders.orderNo, orderNo)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(orderNo: string, status: 'pending' | 'paid' | 'failed' | 'refunded', paymentMethod?: string) {
  const db = await getDb();
  if (!db) return;
  
  const updateData: Record<string, unknown> = { status };
  if (status === 'paid') {
    updateData.paymentTime = new Date();
    if (paymentMethod) updateData.paymentMethod = paymentMethod;
  }
  
  await db.update(orders).set(updateData).where(eq(orders.orderNo, orderNo));
}

// ==================== Node Functions ====================

export async function getAllNodes() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(nodes).orderBy(nodes.sortOrder);
}

export async function getActiveNodes() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(nodes)
    .where(eq(nodes.isActive, true))
    .orderBy(nodes.sortOrder);
}

export async function createNode(data: InsertNode) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(nodes).values(data);
}

export async function updateNode(id: number, data: Partial<InsertNode>) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(nodes).set(data).where(eq(nodes.id, id));
}

export async function deleteNode(id: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.delete(nodes).where(eq(nodes.id, id));
}

// ==================== Plan Functions ====================

export async function getAllPlans() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(plans).orderBy(plans.sortOrder);
}

export async function getActivePlans() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(plans)
    .where(eq(plans.isActive, true))
    .orderBy(plans.sortOrder);
}

export async function getPlanById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(plans).where(eq(plans.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPlan(data: InsertPlan) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(plans).values(data);
}

// ==================== System Settings Functions ====================

export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(systemSettings).where(eq(systemSettings.key, key)).limit(1);
  return result.length > 0 ? result[0].value : undefined;
}

export async function setSetting(key: string, value: string, description?: string) {
  const db = await getDb();
  if (!db) return;
  
  await db.insert(systemSettings)
    .values({ key, value, description })
    .onDuplicateKeyUpdate({ set: { value, description } });
}

// ==================== Traffic Log Functions ====================

export async function logTraffic(data: InsertTrafficLog) {
  const db = await getDb();
  if (!db) return;
  
  await db.insert(trafficLogs).values(data);
}

export async function getUserTrafficStats(userId: number) {
  const db = await getDb();
  if (!db) return { upload: 0, download: 0 };
  
  const result = await db.select({
    totalUpload: sql<number>`SUM(upload)`,
    totalDownload: sql<number>`SUM(download)`,
  }).from(trafficLogs).where(eq(trafficLogs.userId, userId));
  
  return {
    upload: result[0]?.totalUpload || 0,
    download: result[0]?.totalDownload || 0,
  };
}

// ==================== Stats Functions ====================

export async function getAdminStats() {
  const db = await getDb();
  if (!db) return {
    totalUsers: 0,
    activeSubscriptions: 0,
    totalNodes: 0,
    todayRevenue: 0,
  };
  
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const [userCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(users);
  const [activeSubCount] = await db.select({ count: sql<number>`COUNT(*)` })
    .from(subscriptions)
    .where(and(eq(subscriptions.status, 'active'), gte(subscriptions.endDate, now)));
  const [nodeCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(nodes).where(eq(nodes.isActive, true));
  const [revenue] = await db.select({ total: sql<number>`COALESCE(SUM(amount), 0)` })
    .from(orders)
    .where(and(eq(orders.status, 'paid'), gte(orders.paymentTime, todayStart)));
  
  return {
    totalUsers: userCount?.count || 0,
    activeSubscriptions: activeSubCount?.count || 0,
    totalNodes: nodeCount?.count || 0,
    todayRevenue: revenue?.total || 0,
  };
}


// ==================== Verification Code Functions ====================

/**
 * Create a verification code
 * Rate limited: only one code per email per minute
 */
export async function createVerificationCode(
  email: string, 
  code: string, 
  type: 'password_reset' | 'change_password' | 'register'
): Promise<{ success: boolean; error?: string }> {
  const db = await getDb();
  if (!db) return { success: false, error: "Database not available" };
  
  // Check rate limit (1 per minute)
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const recentCodes = await db.select()
    .from(verificationCodes)
    .where(and(
      eq(verificationCodes.email, email),
      eq(verificationCodes.type, type),
      gte(verificationCodes.createdAt, oneMinuteAgo)
    ));
  
  if (recentCodes.length > 0) {
    return { success: false, error: "请等待 1 分钟后再获取验证码" };
  }
  
  // Set expiry to 10 minutes from now
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  
  await db.insert(verificationCodes).values({
    email,
    code,
    type,
    expiresAt,
  });
  
  return { success: true };
}

/**
 * Verify a code
 * Returns true if valid, false otherwise
 */
export async function verifyCode(
  email: string, 
  code: string, 
  type: 'password_reset' | 'change_password' | 'register'
): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  const now = new Date();
  const result = await db.select()
    .from(verificationCodes)
    .where(and(
      eq(verificationCodes.email, email),
      eq(verificationCodes.code, code),
      eq(verificationCodes.type, type),
      eq(verificationCodes.used, false),
      gte(verificationCodes.expiresAt, now)
    ))
    .limit(1);
  
  if (result.length === 0) return false;
  
  // Mark code as used
  await db.update(verificationCodes)
    .set({ used: true })
    .where(eq(verificationCodes.id, result[0].id));
  
  return true;
}

// ==================== User Password Functions ====================

/**
 * Set or update user password
 */
export async function setUserPassword(userId: number, passwordHash: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(userPasswords)
    .values({ userId, passwordHash })
    .onDuplicateKeyUpdate({ set: { passwordHash } });
}

/**
 * Get user password hash
 */
export async function getUserPasswordHash(userId: number): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select()
    .from(userPasswords)
    .where(eq(userPasswords.userId, userId))
    .limit(1);
  
  return result.length > 0 ? result[0].passwordHash : null;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Search users by email or name
 */
export async function searchUsers(query: string) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(users)
    .where(sql`${users.email} LIKE ${`%${query}%`} OR ${users.name} LIKE ${`%${query}%`}`)
    .limit(50);
}


// ==================== Payment Proof Functions ====================

/**
 * Create a payment proof record
 */
export async function createPaymentProof(data: InsertPaymentProof): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(paymentProofs).values(data);
  return Number(result[0].insertId);
}

/**
 * Get all pending payment proofs for admin review
 */
export async function getPendingPaymentProofs() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(paymentProofs)
    .where(eq(paymentProofs.status, 'pending'))
    .orderBy(desc(paymentProofs.createdAt));
}

/**
 * Get all payment proofs (for admin)
 */
export async function getAllPaymentProofs() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(paymentProofs)
    .orderBy(desc(paymentProofs.createdAt));
}

/**
 * Get payment proof by ID
 */
export async function getPaymentProofById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select()
    .from(paymentProofs)
    .where(eq(paymentProofs.id, id))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Update payment proof status (approve/reject)
 */
export async function updatePaymentProofStatus(
  id: number, 
  status: 'approved' | 'rejected', 
  adminId: number,
  adminNote?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  
  await db.update(paymentProofs)
    .set({ 
      status, 
      reviewedBy: adminId, 
      reviewedAt: new Date(),
      adminNote: adminNote || null
    })
    .where(eq(paymentProofs.id, id));
}

/**
 * Get user's payment proofs
 */
export async function getUserPaymentProofs(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(paymentProofs)
    .where(eq(paymentProofs.userId, userId))
    .orderBy(desc(paymentProofs.createdAt));
}


// ==================== Device Fingerprint Functions ====================

export async function getDeviceFingerprintRecord(fingerprint: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select()
    .from(deviceFingerprints)
    .where(eq(deviceFingerprints.fingerprint, fingerprint))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function createDeviceFingerprintRecord(data: InsertDeviceFingerprint): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(deviceFingerprints).values(data);
  return result[0]?.insertId || 0;
}

export async function isDeviceFingerprintValid(fingerprint: string): Promise<boolean> {
  const record = await getDeviceFingerprintRecord(fingerprint);
  if (!record) return true;
  
  return record.expiresAt > new Date();
}

export async function getUserDeviceFingerprints(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(deviceFingerprints)
    .where(eq(deviceFingerprints.userId, userId))
    .orderBy(desc(deviceFingerprints.createdAt));
}

export async function countFreeTrialDevices(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  
  const result = await db.select({ count: sql<number>`COUNT(DISTINCT fingerprint)` })
    .from(deviceFingerprints)
    .where(eq(deviceFingerprints.planName, '免费版'));
  
  return result[0]?.count || 0;
}

export async function getFreeTrialStats() {
  const db = await getDb();
  if (!db) return {
    totalDevices: 0,
    activeDevices: 0,
    expiredDevices: 0,
  };
  
  const now = new Date();
  
  const [totalResult] = await db.select({ count: sql<number>`COUNT(*)` })
    .from(deviceFingerprints)
    .where(eq(deviceFingerprints.planName, '免费版'));
  
  const [activeResult] = await db.select({ count: sql<number>`COUNT(*)` })
    .from(deviceFingerprints)
    .where(and(
      eq(deviceFingerprints.planName, '免费版'),
      gte(deviceFingerprints.expiresAt, now)
    ));
  
  const [expiredResult] = await db.select({ count: sql<number>`COUNT(*)` })
    .from(deviceFingerprints)
    .where(and(
      eq(deviceFingerprints.planName, '免费版'),
      lte(deviceFingerprints.expiresAt, now)
    ));
  
  return {
    totalDevices: totalResult?.count || 0,
    activeDevices: activeResult?.count || 0,
    expiredDevices: expiredResult?.count || 0,
  };
}


export async function getSubscriptionById(subscriptionId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select()
    .from(subscriptions)
    .where(eq(subscriptions.id, subscriptionId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function updateSubscription(subscriptionId: number, data: Partial<typeof subscriptions.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(subscriptions)
    .set(data)
    .where(eq(subscriptions.id, subscriptionId));
}

export async function resetDailyTraffic(subscriptionId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(subscriptions)
    .set({
      dailyTrafficUsed: 0,
      lastDailyResetDate: new Date(),
    })
    .where(eq(subscriptions.id, subscriptionId));
}

export async function resetMonthlyTraffic(subscriptionId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(subscriptions)
    .set({
      monthlyTrafficUsed: 0,
      lastMonthlyResetDate: new Date(),
    })
    .where(eq(subscriptions.id, subscriptionId));
}


export async function updateUser(userId: number, data: Partial<typeof users.$inferInsert>) {
  const db = await getDb();
  if (!db) return;
  
  await db.update(users)
    .set(data)
    .where(eq(users.id, userId));
}

/**
 * Create a new user with email/password (for client app registration)
 */
export async function createUser(data: {
  email: string;
  passwordHash?: string;
  role?: 'user' | 'admin';
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const openId = 'email-' + Math.random().toString(36).substring(7);
  
  const result = await db.insert(users).values({
    openId,
    email: data.email,
    loginMethod: 'email',
    role: data.role || 'user',
  });
  
  const userId = (result as any).insertId || 1;
  
  if (data.passwordHash) {
    await setUserPassword(userId, data.passwordHash);
  }
  
  return {
    id: userId,
    email: data.email,
    role: data.role || 'user',
  };
}

/**
 * Create a new user with password
 */
export async function createUserWithPassword(data: {
  email: string;
  passwordHash: string;
  role?: 'user' | 'admin';
}) {
  return createUser(data);
}

// ============================================================
// Device Fingerprint Management
// ============================================================

/**
 * Get device fingerprint by fingerprint string
 */
export async function getDeviceFingerprintByFingerprint(fingerprint: string) {
  const db = await getDb();
  if (!db) return null;
  
  const [record] = await db
    .select()
    .from(deviceFingerprints)
    .where(eq(deviceFingerprints.fingerprint, fingerprint))
    .limit(1);
  return record;
}

/**
 * Get all device fingerprints for a user
 */
export async function getDeviceFingerprintsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(deviceFingerprints)
    .where(eq(deviceFingerprints.userId, userId));
}

/**
 * Get active device fingerprint for a user
 */
export async function getActiveDeviceFingerprintByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const [record] = await db
    .select()
    .from(deviceFingerprints)
    .where(
      and(
        eq(deviceFingerprints.userId, userId),
        eq(deviceFingerprints.isActive, true)
      )
    )
    .limit(1);
  return record;
}

/**
 * Create device fingerprint
 */
export async function createDeviceFingerprint(data: InsertDeviceFingerprint) {
  const db = await getDb();
  if (!db) return null;
  
  const [record] = await db
    .insert(deviceFingerprints)
    .values(data)
    .$returningId();
  return record;
}

/**
 * Update device fingerprint
 */
export async function updateDeviceFingerprint(
  fingerprintId: number,
  data: Partial<InsertDeviceFingerprint>
) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(deviceFingerprints)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(deviceFingerprints.id, fingerprintId));
}

/**
 * Deactivate all device fingerprints for a user
 */
export async function deactivateAllDeviceFingerprintsForUser(userId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(deviceFingerprints)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(deviceFingerprints.userId, userId));
}

/**
 * Activate device fingerprint
 */
export async function activateDeviceFingerprint(fingerprintId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(deviceFingerprints)
    .set({ isActive: true, lastActiveAt: new Date(), updatedAt: new Date() })
    .where(eq(deviceFingerprints.id, fingerprintId));
}

/**
 * Delete device fingerprint
 */
export async function deleteDeviceFingerprint(fingerprintId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .delete(deviceFingerprints)
    .where(eq(deviceFingerprints.id, fingerprintId));
}

/**
 * Update user's active device
 */
export async function updateUserActiveDevice(
  userId: number,
  deviceId: string,
  sessionId: string
) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(users)
    .set({
      activeDeviceId: deviceId,
      activeDeviceSessionId: sessionId,
      lastActiveAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

// ============================================================
// Device Whitelist Management
// ============================================================

/**
 * Get device whitelist by user ID
 */
export async function getDeviceWhitelistByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const [record] = await db
    .select()
    .from(deviceWhitelist)
    .where(eq(deviceWhitelist.userId, userId))
    .limit(1);
  return record;
}

/**
 * Create device whitelist
 */
export async function createDeviceWhitelist(data: InsertDeviceWhitelist) {
  const db = await getDb();
  if (!db) return null;
  
  const [record] = await db
    .insert(deviceWhitelist)
    .values(data)
    .$returningId();
  return record;
}

/**
 * Update device whitelist
 */
export async function updateDeviceWhitelist(
  userId: number,
  maxDevices: number,
  reason?: string
) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(deviceWhitelist)
    .set({ maxDevices, reason, updatedAt: new Date() })
    .where(eq(deviceWhitelist.userId, userId));
}

/**
 * Delete device whitelist
 */
export async function deleteDeviceWhitelist(userId: number) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .delete(deviceWhitelist)
    .where(eq(deviceWhitelist.userId, userId));
}
