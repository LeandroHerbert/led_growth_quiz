import { eq, sql } from "drizzle-orm";
import { quizResponses, quizCompletions, InsertQuizResponse, InsertQuizCompletion } from "../drizzle/schema";
import { getDb } from "./db";

export async function saveQuizResponse(response: InsertQuizResponse) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save quiz response: database not available");
    return;
  }

  try {
    await db.insert(quizResponses).values(response);
  } catch (error) {
    console.error("[Database] Failed to save quiz response:", error);
    throw error;
  }
}

export async function saveQuizCompletion(completion: InsertQuizCompletion) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save quiz completion: database not available");
    return;
  }

  try {
    await db.insert(quizCompletions).values(completion);
  } catch (error) {
    console.error("[Database] Failed to save quiz completion:", error);
    throw error;
  }
}

export async function getQuizAnalytics() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get quiz analytics: database not available");
    return {
      modelDistribution: { SLG: 0, PLG: 0, MLG: 0, FLG: 0 },
      totalQuizzes: 0,
      completionRate: 100,
    };
  }

  try {
    // Get model distribution from responses
    const responses = await db
      .select({
        selectedModel: quizResponses.selectedModel,
        count: sql<number>`count(*)`,
      })
      .from(quizResponses)
      .groupBy(quizResponses.selectedModel);

    const modelDistribution: Record<string, number> = {
      SLG: 0,
      PLG: 0,
      MLG: 0,
      FLG: 0,
    };

    responses.forEach((row) => {
      modelDistribution[row.selectedModel] = Number(row.count);
    });

    // Get total completions
    const completions = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(quizCompletions);

    const totalQuizzes = Number(completions[0]?.count || 0);

    return {
      modelDistribution,
      totalQuizzes,
      completionRate: 100, // Since we only save completed quizzes
    };
  } catch (error) {
    console.error("[Database] Failed to get quiz analytics:", error);
    return {
      modelDistribution: { SLG: 0, PLG: 0, MLG: 0, FLG: 0 },
      totalQuizzes: 0,
      completionRate: 100,
    };
  }
}
