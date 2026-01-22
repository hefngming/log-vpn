import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, bigint, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  activeDeviceId: varchar("activeDeviceId", { length: 255 }),
  activeDeviceSessionId: varchar("activeDeviceSessionId", { length: 255 }),
  lastActiveAt: timestamp("lastActiveAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User subscriptions table - tracks VPN subscription status
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  planName: varchar("planName", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["active", "expired", "cancelled", "pending", "suspended"]).default("pending").notNull(),
  trafficLimit: bigint("trafficLimit", { mode: "number" }).default(1073741824).notNull(),
  trafficUsed: bigint("trafficUsed", { mode: "number" }).default(0).notNull(),
  monthlyTrafficLimit: bigint("monthlyTrafficLimit", { mode: "number" }).default(214748364800).notNull(),
  monthlyTrafficUsed: bigint("monthlyTrafficUsed", { mode: "number" }).default(0).notNull(),
  dailyTrafficLimit: bigint("dailyTrafficLimit", { mode: "number" }).default(10737418240).notNull(),
  dailyTrafficUsed: bigint("dailyTrafficUsed", { mode: "number" }).default(0).notNull(),
  lastDailyResetDate: timestamp("lastDailyResetDate"),
  lastMonthlyResetDate: timestamp("lastMonthlyResetDate"),
  startDate: timestamp("startDate").defaultNow().notNull(),
  endDate: timestamp("endDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Orders table - tracks payment orders
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  orderNo: varchar("orderNo", { length: 64 }).notNull().unique(),
  planName: varchar("planName", { length: 100 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "paid", "failed", "refunded"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  paymentTime: timestamp("paymentTime"),
  remark: text("remark"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * VPN Nodes table - stores node information from X-ui
 */
export const nodes = mysqlTable("nodes", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  country: varchar("country", { length: 50 }).notNull(),
  countryCode: varchar("countryCode", { length: 10 }).notNull(),
  protocol: mysqlEnum("protocol", ["vless", "trojan", "shadowsocks", "vmess"]).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  port: int("port").notNull(),
  settings: text("settings"), // JSON string for protocol-specific settings
  isActive: boolean("isActive").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Node = typeof nodes.$inferSelect;
export type InsertNode = typeof nodes.$inferInsert;

/**
 * Subscription plans table
 */
export const plans = mysqlTable("plans", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: int("duration").notNull(), // days
  trafficLimit: bigint("trafficLimit", { mode: "number" }).notNull(), // bytes
  isActive: boolean("isActive").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Plan = typeof plans.$inferSelect;
export type InsertPlan = typeof plans.$inferInsert;

/**
 * Payment configurations table - for multiple payment providers
 */
export const paymentConfigs = mysqlTable("paymentConfigs", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  provider: mysqlEnum("provider", ["epay", "alipay", "wechat", "manual"]).notNull(),
  config: text("config"), // JSON string for provider-specific config
  isActive: boolean("isActive").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PaymentConfig = typeof paymentConfigs.$inferSelect;
export type InsertPaymentConfig = typeof paymentConfigs.$inferInsert;

/**
 * System settings table
 */
export const systemSettings = mysqlTable("systemSettings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  description: text("description"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SystemSetting = typeof systemSettings.$inferSelect;
export type InsertSystemSetting = typeof systemSettings.$inferInsert;

/**
 * Traffic logs table - for tracking user traffic
 */
export const trafficLogs = mysqlTable("trafficLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  nodeId: int("nodeId"),
  upload: bigint("upload", { mode: "number" }).default(0).notNull(),
  download: bigint("download", { mode: "number" }).default(0).notNull(),
  recordedAt: timestamp("recordedAt").defaultNow().notNull(),
});

export type TrafficLog = typeof trafficLogs.$inferSelect;
export type InsertTrafficLog = typeof trafficLogs.$inferInsert;


/**
 * Email verification codes table
 * Used for password reset and security verification
 * Codes expire after 10 minutes and have rate limiting (1 per minute)
 */
export const verificationCodes = mysqlTable("verificationCodes", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  code: varchar("code", { length: 6 }).notNull(),
  type: mysqlEnum("type", ["password_reset", "change_password", "register"]).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type VerificationCode = typeof verificationCodes.$inferSelect;
export type InsertVerificationCode = typeof verificationCodes.$inferInsert;

/**
 * User passwords table (separate from OAuth users)
 * For users who register with email/password
 */
export const userPasswords = mysqlTable("userPasswords", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPassword = typeof userPasswords.$inferSelect;
export type InsertUserPassword = typeof userPasswords.$inferInsert;


/**
 * Payment proofs table - stores user uploaded payment screenshots
 * Used for manual payment verification workflow
 */
export const paymentProofs = mysqlTable("paymentProofs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  userEmail: varchar("userEmail", { length: 320 }),
  planName: varchar("planName", { length: 100 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("imageUrl").notNull(), // S3 URL of the uploaded screenshot
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  adminNote: text("adminNote"), // Admin can add notes when reviewing
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: int("reviewedBy"), // Admin user ID who reviewed
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PaymentProof = typeof paymentProofs.$inferSelect;
export type InsertPaymentProof = typeof paymentProofs.$inferInsert;

/**
 * Device fingerprints table - for device binding and anti-sharing
 * Tracks device identifiers to ensure one account per device
 */
export const deviceFingerprints = mysqlTable("deviceFingerprints", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fingerprint: varchar("fingerprint", { length: 255 }).notNull().unique(),
  deviceName: varchar("deviceName", { length: 255 }),
  deviceType: varchar("deviceType", { length: 50 }), // windows, macos, linux
  os: varchar("os", { length: 100 }),
  osVersion: varchar("osVersion", { length: 50 }),
  cpuModel: varchar("cpuModel", { length: 255 }),
  totalMemory: bigint("totalMemory", { mode: "number" }),
  macAddress: varchar("macAddress", { length: 100 }),
  userAgent: text("userAgent"),
  screenResolution: varchar("screenResolution", { length: 50 }),
  timezone: varchar("timezone", { length: 50 }),
  language: varchar("language", { length: 20 }),
  hardwareInfo: text("hardwareInfo"),
  planName: varchar("planName", { length: 100 }),
  isActive: boolean("isActive").default(true).notNull(),
  lastActiveAt: timestamp("lastActiveAt").defaultNow().notNull(),
  bindedAt: timestamp("bindedAt").defaultNow().notNull(),
  activatedAt: timestamp("activatedAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DeviceFingerprint = typeof deviceFingerprints.$inferSelect;
export type InsertDeviceFingerprint = typeof deviceFingerprints.$inferInsert;

// Device Whitelist Table
export const deviceWhitelist = mysqlTable('deviceWhitelist', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('userId').notNull(),
  maxDevices: int('maxDevices').notNull().default(1),
  reason: text('reason'),
  createdBy: int('createdBy').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow().onUpdateNow(),
});

export type InsertDeviceWhitelist = typeof deviceWhitelist.$inferInsert;


// 推荐系统表
export const referralCodes = mysqlTable('referral_codes', {
  id: int('id').autoincrement().primaryKey(),
  userId: int('user_id').notNull().references(() => users.id),
  code: varchar('code', { length: 20 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const referralRecords = mysqlTable('referral_records', {
  id: int('id').autoincrement().primaryKey(),
  referrerId: int('referrer_id').notNull().references(() => users.id),
  referredId: int('referred_id').notNull().references(() => users.id),
  referralCode: varchar('referral_code', { length: 20 }).notNull(),
  referrerReward: int('referrer_reward').notNull().default(0), // 推荐人获得的流量奖励（MB）
  referredReward: int('referred_reward').notNull().default(0), // 被推荐人获得的流量奖励（MB）
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


/**
 * Auto review rules table - defines automatic payment proof review rules
 */
export const autoReviewRules = mysqlTable("autoReviewRules", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // Rule name
  description: text("description"), // Rule description
  isEnabled: boolean("isEnabled").default(true).notNull(), // Enable/disable rule
  priority: int("priority").default(0).notNull(), // Higher priority rules are checked first
  
  // Conditions (JSON string)
  conditions: text("conditions").notNull(), // { amountMatch: true, minAmount: 199, maxAmount: 199, ... }
  
  // Action
  action: mysqlEnum("action", ["auto_approve", "auto_reject", "manual_review"]).notNull(),
  
  // Auto-approval settings (only used when action is "auto_approve")
  autoApproveDays: int("autoApproveDays").default(30), // Subscription days to grant
  autoApproveTrafficGB: int("autoApproveTrafficGB").default(200), // Traffic limit in GB
  
  createdBy: int("createdBy").notNull(), // Admin user ID who created the rule
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AutoReviewRule = typeof autoReviewRules.$inferSelect;
export type InsertAutoReviewRule = typeof autoReviewRules.$inferInsert;

/**
 * Auto review logs table - tracks automatic review decisions
 */
export const autoReviewLogs = mysqlTable("autoReviewLogs", {
  id: int("id").autoincrement().primaryKey(),
  paymentProofId: int("paymentProofId").notNull(), // Reference to paymentProofs table
  ruleId: int("ruleId"), // Which rule was applied (null if no rule matched)
  ruleName: varchar("ruleName", { length: 100 }), // Rule name at the time of execution
  decision: mysqlEnum("decision", ["auto_approved", "auto_rejected", "manual_review_required", "no_rule_matched"]).notNull(),
  reason: text("reason"), // Explanation of the decision
  conditionsChecked: text("conditionsChecked"), // JSON string of conditions that were evaluated
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AutoReviewLog = typeof autoReviewLogs.$inferSelect;
export type InsertAutoReviewLog = typeof autoReviewLogs.$inferInsert;
