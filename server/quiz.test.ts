import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("quiz endpoints", () => {
  it("saves quiz response successfully", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.saveResponse({
      sessionId: "test-session-123",
      questionId: 1,
      selectedModel: "SLG",
    });

    expect(result).toEqual({ success: true });
  });

  it("saves quiz completion successfully", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.saveCompletion({
      sessionId: "test-session-456",
      primaryModel: "PLG",
      scores: {
        SLG: 2,
        PLG: 8,
        MLG: 1,
        FLG: 1,
      },
    });

    expect(result).toEqual({ success: true });
  });

  it("retrieves analytics successfully", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const analytics = await caller.quiz.getAnalytics();

    expect(analytics).toHaveProperty("modelDistribution");
    expect(analytics).toHaveProperty("totalQuizzes");
    expect(analytics).toHaveProperty("completionRate");
    expect(analytics.modelDistribution).toHaveProperty("SLG");
    expect(analytics.modelDistribution).toHaveProperty("PLG");
    expect(analytics.modelDistribution).toHaveProperty("MLG");
    expect(analytics.modelDistribution).toHaveProperty("FLG");
    expect(typeof analytics.totalQuizzes).toBe("number");
    expect(typeof analytics.completionRate).toBe("number");
  });
});
