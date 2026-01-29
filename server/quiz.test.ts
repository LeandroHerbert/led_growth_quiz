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

    // Use unique sessionId to avoid duplicate key error
    const uniqueSessionId = `test-session-${Date.now()}-${Math.random()}`;

    const result = await caller.quiz.saveCompletion({
      sessionId: uniqueSessionId,
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

  it("retrieves detailed quiz data successfully", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const detailedData = await caller.quiz.getDetailedData();

    expect(Array.isArray(detailedData)).toBe(true);
    // If there's data, verify structure
    if (detailedData.length > 0) {
      expect(detailedData[0]).toHaveProperty("sessionId");
      expect(detailedData[0]).toHaveProperty("primaryModel");
      expect(detailedData[0]).toHaveProperty("scores");
      expect(detailedData[0]).toHaveProperty("completedAt");
    }
  });
});
