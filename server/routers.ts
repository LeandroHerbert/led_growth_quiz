import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { saveQuizResponse, saveQuizCompletion, getQuizAnalytics } from "./quizDb";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  quiz: router({
    saveResponse: publicProcedure
      .input(
        z.object({
          sessionId: z.string(),
          questionId: z.number(),
          selectedModel: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        await saveQuizResponse(input);
        return { success: true };
      }),
    saveCompletion: publicProcedure
      .input(
        z.object({
          sessionId: z.string(),
          primaryModel: z.string(),
          scores: z.record(z.string(), z.number()),
        })
      )
      .mutation(async ({ input }) => {
        await saveQuizCompletion({
          sessionId: input.sessionId,
          primaryModel: input.primaryModel,
          scores: JSON.stringify(input.scores),
        });
        return { success: true };
      }),
    getAnalytics: publicProcedure.query(async () => {
      return await getQuizAnalytics();
    }),
  }),
});

export type AppRouter = typeof appRouter;
