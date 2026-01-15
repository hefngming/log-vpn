import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ url: "https://example.com/test-image.jpg", key: "test-key" }),
}));

// Mock the telegram module
vi.mock("./telegram", () => ({
  notifyNewPaymentProof: vi.fn().mockResolvedValue(true),
}));

// Mock the email module
vi.mock("./email", () => ({
  sendVerificationCode: vi.fn().mockResolvedValue(true),
  generateVerificationCode: vi.fn().mockReturnValue("123456"),
  sendSubscriptionActivatedEmail: vi.fn().mockResolvedValue(true),
}));

// Mock the db module
vi.mock("./db", () => ({
  createPaymentProof: vi.fn().mockResolvedValue(1),
  getUserPaymentProofs: vi.fn().mockResolvedValue([]),
  getPendingPaymentProofs: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      userEmail: "test@example.com",
      planName: "专业版",
      amount: "59",
      imageUrl: "https://example.com/proof.jpg",
      status: "pending",
      createdAt: new Date(),
      reviewedAt: null,
      adminNote: null,
    },
  ]),
  getAllPaymentProofs: vi.fn().mockResolvedValue([]),
  getPaymentProofById: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    userEmail: "test@example.com",
    planName: "专业版",
    amount: "59",
    imageUrl: "https://example.com/proof.jpg",
    status: "pending",
    createdAt: new Date(),
    reviewedAt: null,
    adminNote: null,
  }),
  updatePaymentProofStatus: vi.fn().mockResolvedValue(undefined),
  activateSubscription: vi.fn().mockResolvedValue(undefined),
  getAdminStats: vi.fn().mockResolvedValue({ totalUsers: 0, activeSubscriptions: 0, totalOrders: 0, totalRevenue: "0" }),
  getUsersWithSubscriptions: vi.fn().mockResolvedValue([]),
}));

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createUserContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

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

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

function createAdminContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

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

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

describe("paymentProof.upload", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows authenticated user to upload payment proof", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.paymentProof.upload({
      planName: "专业版",
      amount: "59",
      imageBase64: "dGVzdA==", // "test" in base64
      imageType: "image/jpeg",
    });

    expect(result).toEqual({ success: true, proofId: 1 });
  });
});

describe("paymentProof.myProofs", () => {
  it("returns user's payment proofs", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.paymentProof.myProofs();

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("admin.getPendingProofs", () => {
  it("returns pending proofs for admin", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.getPendingProofs();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].status).toBe("pending");
  });

  it("rejects non-admin users", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.getPendingProofs()).rejects.toThrow("需要管理员权限");
  });
});

describe("admin.approveProof", () => {
  it("allows admin to approve payment proof", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.approveProof({
      proofId: 1,
      days: 30,
      trafficLimit: 200 * 1024 * 1024 * 1024,
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects non-admin users", async () => {
    const { ctx } = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.approveProof({
        proofId: 1,
        days: 30,
        trafficLimit: 200 * 1024 * 1024 * 1024,
      })
    ).rejects.toThrow("需要管理员权限");
  });
});

describe("admin.rejectProof", () => {
  it("allows admin to reject payment proof", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.rejectProof({
      proofId: 1,
      adminNote: "截图不清晰",
    });

    expect(result).toEqual({ success: true });
  });
});
