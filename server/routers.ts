import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { saveQuizResponse, saveQuizCompletion, getQuizAnalytics, getDetailedQuizData } from "./quizDb";
import { notifyOwner } from "./_core/notification";

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
        
        // Send notification to owner
        const modelNames: Record<string, string> = {
          SLG: "Sales-Led Growth",
          PLG: "Product-Led Growth",
          MLG: "Marketing-Led Growth",
          FLG: "Founder-Led Growth",
        };
        
        try {
          await notifyOwner({
            title: "Novo Quiz Completado! 🎉",
            content: `Um participante completou o quiz.\n\nModelo predominante: ${modelNames[input.primaryModel] || input.primaryModel}\n\nPontuação:\n- SLG: ${input.scores.SLG || 0}\n- PLG: ${input.scores.PLG || 0}\n- MLG: ${input.scores.MLG || 0}\n- FLG: ${input.scores.FLG || 0}\n\nAcesse o dashboard para ver os resultados completos.`,
          });
        } catch (error) {
          console.error("Failed to send notification:", error);
          // Don't fail the mutation if notification fails
        }
        
        return { success: true };
      }),
    getAnalytics: publicProcedure.query(async () => {
      return await getQuizAnalytics();
    }),
    getDetailedData: publicProcedure.query(async () => {
      return await getDetailedQuizData();
    }),
  }),
});

export type AppRouter = typeof appRouter;
