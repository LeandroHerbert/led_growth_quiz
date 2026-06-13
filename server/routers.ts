import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { saveQuizResponse, saveQuizCompletion, getQuizAnalytics, getDetailedQuizData } from "./quizDb";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { eventoLeads } from "../drizzle/schema";
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

  // ── LEADS DO EVENTO ──────────────────────────────────────────
  leads: router({
    /** Inscrição pública — qualquer visitante pode se cadastrar */
    inscrever: publicProcedure
      .input(z.object({
        nome: z.string().min(2, "Nome obrigatório"),
        whatsapp: z.string().min(8, "WhatsApp obrigatório"),
        email: z.string().email("E-mail inválido"),
        eventoData: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Formata o WhatsApp: remove tudo que não for dígito
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

    /** Lista todos os leads — apenas para o owner autenticado */
    listar: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito" });
      }
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
      const leads = await db
        .select()
        .from(eventoLeads)
        .orderBy(desc(eventoLeads.createdAt));
      return leads;
    }),

    /** Atualiza o status (pipeline) de um lead */
    atualizarStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: leadStatusEnum,
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito" });
        }
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db
          .update(eventoLeads)
          .set({ status: input.status })
          .where(eq(eventoLeads.id, input.id));
        return { success: true };
      }),

    /** Salva anotações sobre um lead */
    salvarNotas: protectedProcedure
      .input(z.object({
        id: z.number(),
        notas: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito" });
        }
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db
          .update(eventoLeads)
          .set({ notas: input.notas })
          .where(eq(eventoLeads.id, input.id));
        return { success: true };
      }),

    /** Remove um lead */
    remover: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Acesso restrito" });
        }
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db.delete(eventoLeads).where(eq(eventoLeads.id, input.id));
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
