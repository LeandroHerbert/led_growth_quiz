import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { saveQuizResponse, saveQuizCompletion, getQuizAnalytics, getDetailedQuizData, getQuizLeadsWithResults } from "./quizDb";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { eventoLeads, quizLeads } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const leadStatusEnum = z.enum([
  "lead",
  "1a_mensagem",
  "2a_mensagem",
  "3a_mensagem",
  "participou",
  "nao_participou",
  "marcou_reuniao",
  "comprou",
  "nao_comprou",
]);

const quizCrmStatusEnum = z.enum([
  "novo",
  "em_contato",
  "sessao_marcada",
  "sessao_realizada",
  "comprou",
  "nao_comprou",
]);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  quiz: router({
    saveResponse: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        questionId: z.number(),
        selectedModel: z.string(),
      }))
      .mutation(async ({ input }) => {
        await saveQuizResponse(input);
        return { success: true };
      }),

    saveCompletion: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        primaryModel: z.string(),
        scores: z.record(z.string(), z.number()),
      }))
      .mutation(async ({ input }) => {
        await saveQuizCompletion({
          sessionId: input.sessionId,
          primaryModel: input.primaryModel,
          scores: JSON.stringify(input.scores),
        });

        // Atualiza o resultado no quiz_leads se o lead já foi salvo
        try {
          const db = await getDb();
          if (db) {
            await db
              .update(quizLeads)
              .set({ resultadoModelo: input.primaryModel })
              .where(eq(quizLeads.sessionId, input.sessionId));
          }
        } catch (_) {}

        const modelNames: Record<string, string> = {
          SLG: "Sales-Led Growth",
          PLG: "Product-Led Growth",
          MLG: "Marketing-Led Growth",
          FLG: "Founder-Led Growth",
        };
        try {
          await notifyOwner({
            title: "Novo Quiz Completado! 🎉",
            content: `Um participante completou o quiz.\n\nModelo predominante: ${modelNames[input.primaryModel] || input.primaryModel}\n\nPontuação:\n- SLG: ${input.scores.SLG || 0}\n- PLG: ${input.scores.PLG || 0}\n- MLG: ${input.scores.MLG || 0}\n- FLG: ${input.scores.FLG || 0}`,
          });
        } catch (error) {
          console.error("Failed to send notification:", error);
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

  // ── LEADS DO QUIZ (CRM) ──────────────────────────────────────────────────
  quizLeads: router({
    /** Salva o lead antes de iniciar o quiz */
    salvar: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        nome: z.string().min(2),
        whatsapp: z.string().min(8),
        email: z.string().email(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });

        const whatsappLimpo = input.whatsapp.replace(/\D/g, "");

        await db.insert(quizLeads).values({
          sessionId: input.sessionId,
          nome: input.nome.trim(),
          whatsapp: whatsappLimpo,
          email: input.email.trim().toLowerCase(),
          crmStatus: "novo",
        });

        try {
          await notifyOwner({
            title: "Novo lead no Quiz! 📋",
            content: `${input.nome} iniciou o diagnóstico LED GROWTH MODELS.\n\nWhatsApp: ${whatsappLimpo}\nE-mail: ${input.email}`,
          });
        } catch (_) {}

        return { success: true };
      }),

    /** Lista todos os leads do quiz com resultado */
    listar: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
      return await db
        .select()
        .from(quizLeads)
        .orderBy(desc(quizLeads.createdAt));
    }),

    /** Lista leads com resultado para exportação CSV completa */
    listarParaExport: publicProcedure.query(async () => {
      return await getQuizLeadsWithResults();
    }),

    /** Atualiza o status CRM */
    atualizarStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        crmStatus: quizCrmStatusEnum,
        dataSessao: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db
          .update(quizLeads)
          .set({
            crmStatus: input.crmStatus,
            ...(input.dataSessao !== undefined ? { dataSessao: input.dataSessao } : {}),
          })
          .where(eq(quizLeads.id, input.id));
        return { success: true };
      }),

    /** Salva anotações */
    salvarNotas: publicProcedure
      .input(z.object({ id: z.number(), notas: z.string() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db
          .update(quizLeads)
          .set({ notas: input.notas })
          .where(eq(quizLeads.id, input.id));
        return { success: true };
      }),

    /** Remove um lead */
    remover: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db.delete(quizLeads).where(eq(quizLeads.id, input.id));
        return { success: true };
      }),
  }),

  // ── LEADS DO EVENTO ──────────────────────────────────────────────────────
  leads: router({
    inscrever: publicProcedure
      .input(z.object({
        nome: z.string().min(2, "Nome obrigatório"),
        whatsapp: z.string().min(8, "WhatsApp obrigatório"),
        email: z.string().email("E-mail inválido"),
        eventoData: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const whatsappLimpo = input.whatsapp.replace(/\D/g, "");
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });

        const [lead] = await db.insert(eventoLeads).values({
          nome: input.nome.trim(),
          whatsapp: whatsappLimpo,
          email: input.email.trim().toLowerCase(),
          eventoData: input.eventoData ?? "18/06/2026",
          status: "lead",
        }).$returningId();

        try {
          await notifyOwner({
            title: "Nova inscrição no evento! 🎯",
            content: `${input.nome} se inscreveu no LED GROWTH MODELS.\n\nWhatsApp: ${whatsappLimpo}\nE-mail: ${input.email}\nEvento: ${input.eventoData ?? "18/06/2026"}`,
          });
        } catch (_) {}

        return { success: true, id: lead.id };
      }),

    listar: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
      return await db.select().from(eventoLeads).orderBy(desc(eventoLeads.createdAt));
    }),

    atualizarStatus: publicProcedure
      .input(z.object({ id: z.number(), status: leadStatusEnum }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db.update(eventoLeads).set({ status: input.status }).where(eq(eventoLeads.id, input.id));
        return { success: true };
      }),

    salvarNotas: publicProcedure
      .input(z.object({ id: z.number(), notas: z.string() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db.update(eventoLeads).set({ notas: input.notas }).where(eq(eventoLeads.id, input.id));
        return { success: true };
      }),

    remover: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db.delete(eventoLeads).where(eq(eventoLeads.id, input.id));
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
