import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const quizResponses = mysqlTable("quiz_responses", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  questionId: int("question_id").notNull(),
  selectedModel: varchar("selected_model", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertQuizResponse = typeof quizResponses.$inferInsert;

export const quizCompletions = mysqlTable("quiz_completions", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull().unique(),
  primaryModel: varchar("primary_model", { length: 10 }).notNull(),
  scores: text("scores").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export type QuizCompletion = typeof quizCompletions.$inferSelect;
export type InsertQuizCompletion = typeof quizCompletions.$inferInsert;

/**
 * Leads do evento LED GROWTH MODELS
 * Capturados via formulário de inscrição na landing page /evento
 */
export const eventoLeads = mysqlTable("evento_leads", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  status: mysqlEnum("status", [
    "lead",
    "1a_mensagem",
    "2a_mensagem",
    "3a_mensagem",
    "participou",
    "nao_participou",
    "marcou_reuniao",
    "comprou",
    "nao_comprou",
  ]).default("lead").notNull(),
  notas: text("notas"),
  eventoData: varchar("evento_data", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type EventoLead = typeof eventoLeads.$inferSelect;
export type InsertEventoLead = typeof eventoLeads.$inferInsert;
export type LeadStatus = EventoLead["status"];

/**
 * Leads do Quiz LED GROWTH MODELS
 * Capturados na tela de captação antes das perguntas.
 * Vinculados ao resultado via sessionId.
 */
export const quizLeads = mysqlTable("quiz_leads", {
  id: int("id").autoincrement().primaryKey(),
  /** Mesmo sessionId gerado no frontend — vincula ao quizCompletions */
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  /** Resultado do diagnóstico (preenchido quando o quiz é concluído) */
  resultadoModelo: varchar("resultado_modelo", { length: 10 }),
  /** Pipeline CRM para sessões estratégicas */
  crmStatus: mysqlEnum("crm_status", [
    "novo",
    "em_contato",
    "sessao_marcada",
    "sessao_realizada",
    "comprou",
    "nao_comprou",
  ]).default("novo").notNull(),
  /** Data da sessão estratégica agendada */
  dataSessao: varchar("data_sessao", { length: 30 }),
  /** Anotações internas */
  notas: text("notas"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type QuizLead = typeof quizLeads.$inferSelect;
export type InsertQuizLead = typeof quizLeads.$inferInsert;
export type QuizLeadCrmStatus = QuizLead["crmStatus"];

/**
 * Agendamentos de sessões estratégicas
 * Criados via página /agendar — integração com Google Calendar
 */
export const agendamentos = mysqlTable("agendamentos", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull(),
  empresa: varchar("empresa", { length: 255 }),
  /** Data/hora do agendamento em UTC timestamp (ms) */
  dataHora: varchar("data_hora", { length: 30 }).notNull(),
  /** Duração em minutos */
  duracao: int("duracao").default(30).notNull(),
  /** Status do agendamento */
  status: mysqlEnum("status", ["pendente", "confirmado", "cancelado", "realizado"]).default("pendente").notNull(),
  /** ID do evento no Google Calendar (preenchido após criação) */
  googleEventId: varchar("google_event_id", { length: 255 }),
  /** Link da reunião (Google Meet) */
  meetLink: varchar("meet_link", { length: 500 }),
  /** Notas internas */
  notas: text("notas"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Agendamento = typeof agendamentos.$inferSelect;
export type InsertAgendamento = typeof agendamentos.$inferInsert;

/**
 * Vídeos hospedados no S3
 * Gerenciados pelo painel de admin — player customizado na página /vsl
 */
export const videos = mysqlTable("videos", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  /** Chave do arquivo no S3 */
  fileKey: varchar("file_key", { length: 500 }).notNull(),
  /** URL pública do vídeo no S3 */
  url: text("url").notNull(),
  /** Tipo MIME do arquivo */
  mimeType: varchar("mime_type", { length: 100 }).default("video/mp4").notNull(),
  /** Tamanho em bytes */
  tamanho: int("tamanho"),
  /** Se este é o vídeo ativo exibido na /vsl */
  ativo: mysqlEnum("ativo", ["sim", "nao"]).default("nao").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;
