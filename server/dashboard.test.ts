import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(role: "admin" | "manager" | "technician" = "admin"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@nasayim.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Dashboard Access Control", () => {
  it("allows authenticated users to access dashboard", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.role).toBe("admin");
  });

  it("allows manager role to access dashboard", async () => {
    const ctx = createAuthContext("manager");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();
    expect(result?.role).toBe("manager");
  });

  it("allows technician role to access dashboard", async () => {
    const ctx = createAuthContext("technician");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();
    expect(result?.role).toBe("technician");
  });
});

describe("Authentication", () => {
  it("returns current user info", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();
    expect(user).toMatchObject({
      email: "test@nasayim.com",
      name: "Test User",
      role: "admin",
    });
  });
});
