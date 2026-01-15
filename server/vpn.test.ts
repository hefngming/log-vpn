import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock('./db', () => ({
  getActiveNodes: vi.fn().mockResolvedValue([
    { id: 1, name: '新加坡 SG1', country: '新加坡', countryCode: 'SG', protocol: 'vless', address: 'sg1.example.com', port: 443, isActive: true },
    { id: 2, name: '日本 JP1', country: '日本', countryCode: 'JP', protocol: 'trojan', address: 'jp1.example.com', port: 443, isActive: true },
  ]),
  getAllNodes: vi.fn().mockResolvedValue([
    { id: 1, name: '新加坡 SG1', country: '新加坡', countryCode: 'SG', protocol: 'vless', address: 'sg1.example.com', port: 443, isActive: true },
    { id: 2, name: '日本 JP1', country: '日本', countryCode: 'JP', protocol: 'trojan', address: 'jp1.example.com', port: 443, isActive: true },
    { id: 3, name: '美国 US1', country: '美国', countryCode: 'US', protocol: 'vless', address: 'us1.example.com', port: 443, isActive: false },
  ]),
  getActivePlans: vi.fn().mockResolvedValue([
    { id: 1, name: '月度套餐', price: '29.00', duration: 30, trafficLimit: 107374182400, isActive: true },
    { id: 2, name: '季度套餐', price: '79.00', duration: 90, trafficLimit: 322122547200, isActive: true },
  ]),
  getUserSubscription: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    planName: '月度套餐',
    status: 'active',
    trafficLimit: 107374182400,
    trafficUsed: 5368709120,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  }),
  getUserOrders: vi.fn().mockResolvedValue([
    { id: 1, orderNo: 'ORD123456', planName: '月度套餐', amount: '29.00', status: 'paid' },
  ]),
  getUserTrafficStats: vi.fn().mockResolvedValue({ upload: 1073741824, download: 4294967296 }),
  getAdminStats: vi.fn().mockResolvedValue({
    totalUsers: 100,
    activeSubscriptions: 45,
    totalNodes: 8,
    todayRevenue: 580,
  }),
  getUsersWithSubscriptions: vi.fn().mockResolvedValue([
    { id: 1, name: 'Test User', email: 'test@example.com', subscription: { status: 'active' } },
  ]),
  logTraffic: vi.fn().mockResolvedValue(undefined),
  updateSubscriptionTraffic: vi.fn().mockResolvedValue(undefined),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("nodes.list", () => {
  it("returns active nodes for public access", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.nodes.list();

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('name', '新加坡 SG1');
    expect(result[1]).toHaveProperty('protocol', 'trojan');
  });
});

describe("plans.list", () => {
  it("returns active plans for public access", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.plans.list();

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('name', '月度套餐');
    expect(result[0]).toHaveProperty('price', '29.00');
  });
});

describe("user.getSubscription", () => {
  it("returns user subscription for authenticated user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.user.getSubscription();

    expect(result).toHaveProperty('planName', '月度套餐');
    expect(result).toHaveProperty('status', 'active');
  });

  it("throws error for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.user.getSubscription()).rejects.toThrow();
  });
});

describe("traffic.check", () => {
  it("returns allowed status for user with active subscription", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.traffic.check();

    expect(result).toHaveProperty('allowed', true);
    expect(result.subscription).toHaveProperty('planName', '月度套餐');
  });
});

describe("traffic.report", () => {
  it("accepts traffic report from authenticated user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.traffic.report({
      upload: 1048576,
      download: 5242880,
    });

    expect(result).toEqual({ success: true });
  });
});

describe("admin.getStats", () => {
  it("returns stats for admin user", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.getStats();

    expect(result).toHaveProperty('totalUsers', 100);
    expect(result).toHaveProperty('activeSubscriptions', 45);
    expect(result).toHaveProperty('totalNodes', 8);
  });

  it("throws error for non-admin user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.getStats()).rejects.toThrow('需要管理员权限');
  });
});

describe("nodes.all (admin)", () => {
  it("returns all nodes including inactive for admin", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.nodes.all();

    expect(result).toHaveLength(3);
  });

  it("throws error for non-admin user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.nodes.all()).rejects.toThrow('需要管理员权限');
  });
});
