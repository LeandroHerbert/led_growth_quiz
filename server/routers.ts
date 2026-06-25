import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { saveQuizResponse, saveQuizCompletion, getQuizAnalytics, getDetailedQuizData, getQuizLeadsWithResults } from "./quizDb";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { eventoLeads, quizLeads, agendamentos, videos } from "../drizzle/schema";
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

  agendamentos: router({
    /** Retorna os slots disponíveis para 30/06 e 01/07 com horários específicos */
    slotsDisponiveis: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });

      // Buscar agendamentos já confirmados
      const agendados = await db.select({ dataHora: agendamentos.dataHora })
        .from(agendamentos)
        .where(eq(agendamentos.status, "confirmado"));
      const horariosOcupados = new Set(agendados.map(a => a.dataHora));

      // Dias e períodos fixos (horário de Brasília UTC-3)
      const diasConfig = [
        {
          // 30/06/2026 — Segunda-feira
          ano: 2026, mes: 5, dia: 30, // mes é 0-indexed
          nome: "Segunda-feira, 30/06/2026",
          periodos: [
            { inicio: 8, fim: 12 },       // 08:00 às 11:30
            { inicio: 15, fimH: 21, fimMin: 0 }, // 15:30 às 20:30
          ],
          inicioMin: [0, 30], // 15:30 começa em 30min
          periodoInicio2Min: 30, // segundo período começa em :30
        },
        {
          // 01/07/2026 — Terça-feira
          ano: 2026, mes: 6, dia: 1,
          nome: "Terça-feira, 01/07/2026",
          periodos: [
            { inicio: 8, fim: 12 },
            { inicio: 14, fim: 21 },
          ],
          periodoInicio2Min: 0,
        },
      ];

      const slots: { dataHora: string; diaSemana: string; hora: string; disponivel: boolean }[] = [];

      // 30/06: 08:00–11:30 e 15:30–20:30
      const dia30 = new Date(2026, 5, 30); // mês 0-indexed: 5 = junho
      for (let h = 8; h <= 11; h++) {
        for (const min of [0, 30]) {
          if (h === 11 && min === 30) continue;
          const slotDate = new Date(dia30);
          slotDate.setHours(h + 3, min, 0, 0); // +3 para converter BRT→UTC
          const dataHoraKey = slotDate.toISOString();
          const horaStr = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          slots.push({ dataHora: dataHoraKey, diaSemana: "Segunda-feira, 30/06/2026", hora: horaStr, disponivel: !horariosOcupados.has(dataHoraKey) });
        }
      }
      // 15:30 às 20:30
      for (let h = 15; h <= 20; h++) {
        const mins = h === 15 ? [30] : [0, 30];
        for (const min of mins) {
          if (h === 20 && min === 30) continue;
          const slotDate = new Date(dia30);
          slotDate.setHours(h + 3, min, 0, 0);
          const dataHoraKey = slotDate.toISOString();
          const horaStr = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          slots.push({ dataHora: dataHoraKey, diaSemana: "Segunda-feira, 30/06/2026", hora: horaStr, disponivel: !horariosOcupados.has(dataHoraKey) });
        }
      }

      // 01/07: 08:00–11:30 e 14:00–20:30
      const dia01 = new Date(2026, 6, 1); // mês 0-indexed: 6 = julho
      for (let h = 8; h <= 11; h++) {
        for (const min of [0, 30]) {
          if (h === 11 && min === 30) continue;
          const slotDate = new Date(dia01);
          slotDate.setHours(h + 3, min, 0, 0);
          const dataHoraKey = slotDate.toISOString();
          const horaStr = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          slots.push({ dataHora: dataHoraKey, diaSemana: "Terça-feira, 01/07/2026", hora: horaStr, disponivel: !horariosOcupados.has(dataHoraKey) });
        }
      }
      // 14:00 às 20:30
      for (let h = 14; h <= 20; h++) {
        for (const min of [0, 30]) {
          if (h === 20 && min === 30) continue;
          const slotDate = new Date(dia01);
          slotDate.setHours(h + 3, min, 0, 0);
          const dataHoraKey = slotDate.toISOString();
          const horaStr = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          slots.push({ dataHora: dataHoraKey, diaSemana: "Terça-feira, 01/07/2026", hora: horaStr, disponivel: !horariosOcupados.has(dataHoraKey) });
        }
      }

      return slots;
    }),

    /** Cria um agendamento e notifica o dono */
    criar: publicProcedure
      .input(z.object({
        nome: z.string().min(2),
        email: z.string().email(),
        whatsapp: z.string().min(8),
        empresa: z.string().optional(),
        dataHora: z.string(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });

        // Verificar se o slot ainda está disponível
        const existente = await db.select({ id: agendamentos.id })
          .from(agendamentos)
          .where(eq(agendamentos.dataHora, input.dataHora))
          .limit(1);
        if (existente.length > 0) {
          throw new TRPCError({ code: "CONFLICT", message: "Este horário já foi reservado. Escolha outro." });
        }

        const whatsappLimpo = input.whatsapp.replace(/\D/g, "");
        const [ag] = await db.insert(agendamentos).values({
          nome: input.nome.trim(),
          email: input.email.trim().toLowerCase(),
          whatsapp: whatsappLimpo,
          empresa: input.empresa?.trim(),
          dataHora: input.dataHora,
          duracao: 30,
          status: "confirmado",
        }).$returningId();

        // Formatar data para notificação
        const dataFormatada = new Date(input.dataHora).toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          weekday: "long", day: "2-digit", month: "2-digit",
          hour: "2-digit", minute: "2-digit",
        });

        try {
          await notifyOwner({
            title: "Nova sessão estratégica agendada! 📅",
            content: `${input.nome} agendou uma sessão estratégica.\n\nData: ${dataFormatada}\nEmpresa: ${input.empresa ?? "não informado"}\nWhatsApp: ${whatsappLimpo}\nE-mail: ${input.email}`,
          });
        } catch (_) {}

        return { success: true, id: ag.id };
      }),

    /** Lista todos os agendamentos (para o painel admin) */
    listar: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
      return await db.select().from(agendamentos).orderBy(desc(agendamentos.dataHora));
    }),

    atualizarStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pendente", "confirmado", "cancelado", "realizado"]),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db.update(agendamentos).set({ status: input.status }).where(eq(agendamentos.id, input.id));
        return { success: true };
      }),
  }),

  // ── VÍDEOS ──────────────────────────────────────────────────────────────
  videos: router({
    /** Retorna o vídeo ativo para a página /vsl (público) */
    getAtivo: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return null;
      const [video] = await db.select().from(videos).where(eq(videos.ativo, "sim")).limit(1);
      return video ?? null;
    }),

    /** Lista todos os vídeos para o painel admin */
    listar: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(videos).orderBy(desc(videos.createdAt));
    }),

    /** Define um vídeo como ativo na /vsl (desativa os outros) */
    setAtivo: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db.update(videos).set({ ativo: "nao" });
        await db.update(videos).set({ ativo: "sim" }).where(eq(videos.id, input.id));
        return { success: true };
      }),

    /** Remove um vídeo */
    deletar: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        await db.delete(videos).where(eq(videos.id, input.id));
        return { success: true };
      }),

    /** Salva metadados do vídeo após upload (URL já gerada pelo frontend via storage proxy) */
    salvar: publicProcedure
      .input(z.object({
        titulo: z.string().min(1),
        fileKey: z.string(),
        url: z.string().url(),
        mimeType: z.string().default("video/mp4"),
        tamanho: z.number().optional(),
        setAtivo: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB indisponível" });
        if (input.setAtivo) {
          await db.update(videos).set({ ativo: "nao" });
        }
        const [novo] = await db.insert(videos).values({
          titulo: input.titulo,
          fileKey: input.fileKey,
          url: input.url,
          mimeType: input.mimeType,
          tamanho: input.tamanho,
          ativo: input.setAtivo ? "sim" : "nao",
        }).$returningId();
        return { success: true, id: novo.id };
      }),
  }),
});

export type AppRouter = typeof appRouter;
