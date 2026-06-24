import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BarChart3, TrendingUp, Loader2, Download, Users,
  MessageCircle, Calendar, CheckCircle, Phone, Trash2,
  StickyNote, ChevronDown, ArrowLeft, Clock, Building2, XCircle,
  Video, Upload, Play, Star, AlertCircle,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { trpc } from "@/lib/trpc";

// ── Paleta ────────────────────────────────────────────────────────────────────

const NEON = "#39ff14";
const BG = "linear-gradient(135deg, #071a0e 0%, #0d2b14 50%, #071a0e 100%)";
const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BORDER = "1px solid rgba(57,255,20,0.15)";
const TEXT = "#e8ffe8";
const MUTED = "#7aad7a";

const MODEL_COLORS: Record<string, string> = {
  SLG: "#3b82f6",
  PLG: "#a855f7",
  MLG: "#22c55e",
  FLG: "#f59e0b",
};

const MODEL_NAMES: Record<string, string> = {
  SLG: "Sales-Led Growth",
  PLG: "Product-Led Growth",
  MLG: "Marketing-Led Growth",
  FLG: "Founder-Led Growth",
};

// ── Pipeline CRM ──────────────────────────────────────────────────────────────

type CrmStatus = "novo" | "em_contato" | "sessao_marcada" | "sessao_realizada" | "comprou" | "nao_comprou";

const PIPELINE: { id: CrmStatus; label: string; color: string }[] = [
  { id: "novo",             label: "Novo",             color: "#6b7280" },
  { id: "em_contato",       label: "Em contato",       color: "#3b82f6" },
  { id: "sessao_marcada",   label: "Sessão marcada",   color: "#f59e0b" },
  { id: "sessao_realizada", label: "Sessão realizada", color: "#a855f7" },
  { id: "comprou",          label: "Comprou",          color: "#22c55e" },
  { id: "nao_comprou",      label: "Não comprou",      color: "#ef4444" },
];

// ── Card de lead (sortable) ───────────────────────────────────────────────────

function LeadCard({ lead, onRefresh, isDragging = false }: { lead: any; onRefresh: () => void; isDragging?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [nota, setNota] = useState(lead.notas ?? "");
  const [dataSessao, setDataSessao] = useState(lead.dataSessao ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const atualizarStatus = trpc.quizLeads.atualizarStatus.useMutation({ onSuccess: onRefresh });
  const salvarNotas = trpc.quizLeads.salvarNotas.useMutation({ onSuccess: onRefresh });
  const remover = trpc.quizLeads.remover.useMutation({ onSuccess: onRefresh });

  const whatsappNum = lead.whatsapp?.replace(/\D/g, "");
  const whatsappLink = `https://wa.me/55${whatsappNum}`;
  const modelColor = lead.resultadoModelo ? MODEL_COLORS[lead.resultadoModelo] ?? NEON : MUTED;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: "rgba(7,26,14,0.95)",
        border: `1px solid ${modelColor}33`,
        borderRadius: "10px",
        marginBottom: "8px",
        overflow: "hidden",
        cursor: "grab",
      }}
    >
      {/* Linha principal — drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{ display: "flex", alignItems: "center", padding: "12px 14px", gap: "10px" }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar com inicial */}
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `${modelColor}22`,
          border: `1.5px solid ${modelColor}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "14px", color: modelColor, flexShrink: 0,
        }}>
          {lead.nome?.charAt(0).toUpperCase() ?? "?"}
        </div>

        {/* Nome + email */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: "13px", color: TEXT, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {lead.nome}
          </p>
          <p style={{ fontSize: "11px", color: MUTED, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {lead.email}
          </p>
        </div>

        {/* Badge modelo */}
        {lead.resultadoModelo && (
          <span style={{
            fontSize: "10px", fontWeight: 800, padding: "2px 7px", borderRadius: "20px",
            background: `${modelColor}22`, color: modelColor, flexShrink: 0, letterSpacing: "0.05em",
          }}>
            {lead.resultadoModelo}
          </span>
        )}

        <ChevronDown size={14} style={{ color: MUTED, flexShrink: 0, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </div>

      {/* Painel expandido */}
      {expanded && (
        <div style={{ borderTop: `1px solid rgba(57,255,20,0.1)`, padding: "14px", background: "rgba(0,0,0,0.3)" }}>

          {/* Ações rápidas */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "#22c55e", color: "#fff", borderRadius: "8px",
                padding: "8px 14px", textDecoration: "none", fontWeight: 700, fontSize: "12px",
              }}>
              <Phone size={13} /> WhatsApp
            </a>
            <span style={{ fontSize: "12px", color: MUTED, alignSelf: "center" }}>
              {lead.whatsapp} · {lead.email}
            </span>
          </div>

          {/* Data da sessão */}
          {(lead.crmStatus === "sessao_marcada" || lead.crmStatus === "sessao_realizada") && (
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "10px", fontWeight: 700, color: MUTED, display: "block", marginBottom: "4px", letterSpacing: "0.08em" }}>
                DATA DA SESSÃO
              </label>
              <div style={{ display: "flex", gap: "6px" }}>
                <input
                  type="date"
                  value={dataSessao}
                  onChange={(e) => setDataSessao(e.target.value)}
                  style={{
                    flex: 1, padding: "7px 10px", borderRadius: "6px",
                    border: "1px solid rgba(57,255,20,0.2)", fontSize: "12px",
                    background: "rgba(0,0,0,0.4)", color: TEXT,
                  }}
                />
                <button
                  onClick={() => atualizarStatus.mutate({ id: lead.id, crmStatus: lead.crmStatus, dataSessao })}
                  style={{
                    padding: "7px 12px", borderRadius: "6px", border: "none",
                    background: NEON, color: "#000", fontSize: "11px", fontWeight: 800, cursor: "pointer",
                  }}
                >
                  Salvar
                </button>
              </div>
              {lead.dataSessao && (
                <p style={{ fontSize: "11px", color: MUTED, marginTop: "4px" }}>
                  Agendada: {lead.dataSessao}
                </p>
              )}
            </div>
          )}

          {/* Notas */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "10px", fontWeight: 700, color: MUTED, display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px", letterSpacing: "0.08em" }}>
              <StickyNote size={11} /> ANOTAÇÕES
            </label>
            <div style={{ display: "flex", gap: "6px" }}>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                rows={2}
                placeholder="Observações sobre este lead..."
                style={{
                  flex: 1, padding: "7px 10px", borderRadius: "6px",
                  border: "1px solid rgba(57,255,20,0.2)", fontSize: "12px",
                  background: "rgba(0,0,0,0.4)", color: TEXT, resize: "vertical", fontFamily: "inherit",
                }}
              />
              <button
                onClick={() => salvarNotas.mutate({ id: lead.id, notas: nota })}
                disabled={salvarNotas.isPending}
                style={{
                  padding: "7px 10px", borderRadius: "6px", border: "none",
                  background: "rgba(57,255,20,0.15)", color: NEON, fontSize: "11px",
                  fontWeight: 700, cursor: "pointer", alignSelf: "flex-start",
                }}
              >
                {salvarNotas.isPending ? "..." : "Salvar"}
              </button>
            </div>
          </div>

          {/* Rodapé */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "10px", color: MUTED, margin: 0 }}>
              {new Date(lead.createdAt).toLocaleString("pt-BR")}
            </p>
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)}
                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px" }}>
                <Trash2 size={12} /> Remover
              </button>
            ) : (
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: MUTED }}>Confirmar?</span>
                <button onClick={() => remover.mutate({ id: lead.id })}
                  style={{ background: "#ef4444", border: "none", color: "#fff", borderRadius: "4px", padding: "3px 8px", fontSize: "11px", cursor: "pointer" }}>
                  Sim
                </button>
                <button onClick={() => setConfirmDelete(false)}
                  style={{ background: "rgba(255,255,255,0.1)", border: "none", color: TEXT, borderRadius: "4px", padding: "3px 8px", fontSize: "11px", cursor: "pointer" }}>
                  Não
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Coluna Kanban ─────────────────────────────────────────────────────────────

function KanbanColumn({ stage, leads, onRefresh }: { stage: typeof PIPELINE[0]; leads: any[]; onRefresh: () => void }) {
  const ids = leads.map((l) => l.id);

  return (
    <div style={{
      background: CARD_BG,
      border: CARD_BORDER,
      borderRadius: "12px",
      padding: "14px",
      minWidth: "240px",
      flex: "1 1 240px",
      maxWidth: "320px",
    }}>
      {/* Cabeçalho da coluna */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: stage.color }} />
          <span style={{ fontWeight: 700, fontSize: "12px", color: TEXT, letterSpacing: "0.05em" }}>
            {stage.label.toUpperCase()}
          </span>
        </div>
        <span style={{
          background: `${stage.color}22`, color: stage.color,
          fontSize: "11px", fontWeight: 800, padding: "2px 8px", borderRadius: "20px",
        }}>
          {leads.length}
        </span>
      </div>

      {/* Cards */}
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {leads.length === 0 ? (
          <div style={{
            border: "1px dashed rgba(57,255,20,0.1)", borderRadius: "8px",
            padding: "20px", textAlign: "center", color: MUTED, fontSize: "12px",
          }}>
            Nenhum lead
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onRefresh={onRefresh} />
          ))
        )}
      </SortableContext>
    </div>
  );
}

// ── Aba CRM Kanban ────────────────────────────────────────────────────────────

function CrmKanban() {
  const [busca, setBusca] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);

  const { data: leads, isLoading, refetch } = trpc.quizLeads.listar.useQuery();
  const { data: leadsExport } = trpc.quizLeads.listarParaExport.useQuery();
  const atualizarStatus = trpc.quizLeads.atualizarStatus.useMutation({ onSuccess: () => refetch() });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const leadsFiltrados = (leads ?? []).filter((l: any) => {
    if (!busca) return true;
    const q = busca.toLowerCase();
    return l.nome?.toLowerCase().includes(q) || l.email?.toLowerCase().includes(q) || l.whatsapp?.includes(q);
  });

  const leadsByStatus = useCallback((status: CrmStatus) =>
    leadsFiltrados.filter((l: any) => l.crmStatus === status),
    [leadsFiltrados]
  );

  const activeCard = activeId ? (leads ?? []).find((l: any) => l.id === activeId) : null;

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as number);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    // Verifica se o over é uma coluna (string) ou um card (number)
    const overId = over.id as string;
    const isColumn = PIPELINE.some((s) => s.id === overId);
    if (isColumn) {
      atualizarStatus.mutate({ id: active.id as number, crmStatus: overId as CrmStatus });
    } else {
      // Encontra o status do card de destino
      const targetCard = (leads ?? []).find((l: any) => l.id === over.id);
      if (targetCard && targetCard.crmStatus !== (leads ?? []).find((l: any) => l.id === active.id)?.crmStatus) {
        atualizarStatus.mutate({ id: active.id as number, crmStatus: targetCard.crmStatus });
      }
    }
  };

  const exportCSV = () => {
    const data = leadsExport ?? [];
    if (data.length === 0) { alert("Nenhum lead para exportar"); return; }
    const headers = ["Nome", "E-mail", "WhatsApp", "Link WhatsApp", "Resultado", "Status CRM", "Data Sessão", "Notas", "Cadastrado em"];
    const rows = data.map((l: any) => {
      const num = l.whatsapp?.replace(/\D/g, "");
      return [
        l.nome,
        l.email,
        l.whatsapp,
        `https://wa.me/55${num}`,
        l.resultadoModelo ?? "Pendente",
        PIPELINE.find((s) => s.id === l.crmStatus)?.label ?? l.crmStatus,
        l.dataSessao ?? "",
        (l.notas ?? "").replace(/,/g, ";"),
        new Date(l.createdAt).toLocaleString("pt-BR"),
      ];
    });
    const csv = [headers.join(","), ...rows.map((r: any[]) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `leads_quiz_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Métricas
  const total = (leads ?? []).length;
  const emContato = (leads ?? []).filter((l: any) => l.crmStatus === "em_contato").length;
  const sessoes = (leads ?? []).filter((l: any) => ["sessao_marcada", "sessao_realizada"].includes(l.crmStatus)).length;
  const compraram = (leads ?? []).filter((l: any) => l.crmStatus === "comprou").length;

  if (isLoading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}>
      <Loader2 className="animate-spin" style={{ color: NEON, width: 32, height: 32 }} />
    </div>
  );

  return (
    <div>
      {/* Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total de leads", value: total, icon: <Users size={16} />, color: "#3b82f6" },
          { label: "Em contato", value: emContato, icon: <MessageCircle size={16} />, color: "#f59e0b" },
          { label: "Sessões", value: sessoes, icon: <Calendar size={16} />, color: "#a855f7" },
          { label: "Compraram", value: compraram, icon: <CheckCircle size={16} />, color: NEON },
        ].map((m) => (
          <div key={m.label} style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "10px", padding: "14px" }}>
            <div style={{ color: m.color, marginBottom: "6px" }}>{m.icon}</div>
            <p style={{ fontSize: "26px", fontWeight: 800, color: m.color, margin: 0 }}>{m.value}</p>
            <p style={{ fontSize: "11px", color: MUTED, margin: 0 }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Barra de ações */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Buscar por nome, e-mail ou WhatsApp..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            flex: 1, minWidth: "200px", padding: "9px 14px", borderRadius: "8px",
            border: "1px solid rgba(57,255,20,0.2)", fontSize: "13px",
            background: "rgba(0,0,0,0.4)", color: TEXT,
          }}
        />
        <button onClick={exportCSV} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: NEON, color: "#000", border: "none", borderRadius: "8px",
          padding: "9px 16px", fontSize: "13px", fontWeight: 800, cursor: "pointer",
        }}>
          <Download size={14} /> Exportar CSV
        </button>
      </div>

      {/* Kanban */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "16px" }}>
          {PIPELINE.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              leads={leadsByStatus(stage.id)}
              onRefresh={refetch}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div style={{ opacity: 0.9, transform: "rotate(2deg)" }}>
              <LeadCard lead={activeCard} onRefresh={() => {}} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// ── Aba Agendamentos ─────────────────────────────────────────────────────────

const STATUS_AGEND: Record<string, { label: string; color: string }> = {
  pendente:   { label: "Pendente",   color: "#f59e0b" },
  confirmado: { label: "Confirmado", color: "#22c55e" },
  cancelado:  { label: "Cancelado",  color: "#ef4444" },
  realizado:  { label: "Realizado",  color: "#a855f7" },
};

function AbaAgendamentos() {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  const { data: agends, isLoading, refetch } = trpc.agendamentos.listar.useQuery();
  const atualizarStatus = trpc.agendamentos.atualizarStatus.useMutation({ onSuccess: () => refetch() });

  const lista = (agends ?? []).filter((a: any) => {
    const q = busca.toLowerCase();
    const matchBusca = !busca || a.nome?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.whatsapp?.includes(q);
    const matchStatus = filtroStatus === "todos" || a.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const total = (agends ?? []).length;
  const confirmados = (agends ?? []).filter((a: any) => a.status === "confirmado").length;
  const realizados  = (agends ?? []).filter((a: any) => a.status === "realizado").length;
  const cancelados  = (agends ?? []).filter((a: any) => a.status === "cancelado").length;

  const exportCSV = () => {
    if (!agends || agends.length === 0) { alert("Nenhum agendamento para exportar"); return; }
    const headers = ["Nome", "E-mail", "WhatsApp", "Empresa", "Data/Hora", "Status"];
    const rows = agends.map((a: any) => [
      a.nome, a.email, a.whatsapp, a.empresa ?? "",
      new Date(a.dataHora).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      STATUS_AGEND[a.status]?.label ?? a.status,
    ]);
    const csv = [headers.join(","), ...rows.map((r: any[]) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `agendamentos_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (isLoading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}>
      <Loader2 className="animate-spin" style={{ color: NEON, width: 32, height: 32 }} />
    </div>
  );

  return (
    <div>
      {/* Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total",       value: total,       icon: <Calendar size={16} />,  color: "#3b82f6" },
          { label: "Confirmados", value: confirmados, icon: <CheckCircle size={16} />, color: "#22c55e" },
          { label: "Realizados",  value: realizados,  icon: <Clock size={16} />,      color: "#a855f7" },
          { label: "Cancelados",  value: cancelados,  icon: <XCircle size={16} />,    color: "#ef4444" },
        ].map((m) => (
          <div key={m.label} style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "10px", padding: "14px" }}>
            <div style={{ color: m.color, marginBottom: "6px" }}>{m.icon}</div>
            <p style={{ fontSize: "26px", fontWeight: 800, color: m.color, margin: 0 }}>{m.value}</p>
            <p style={{ fontSize: "11px", color: MUTED, margin: 0 }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Buscar por nome, e-mail ou WhatsApp..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            flex: 1, minWidth: "200px", padding: "9px 14px", borderRadius: "8px",
            border: "1px solid rgba(57,255,20,0.2)", fontSize: "13px",
            background: "rgba(0,0,0,0.4)", color: TEXT,
          }}
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={{
            padding: "9px 14px", borderRadius: "8px",
            border: "1px solid rgba(57,255,20,0.2)", fontSize: "13px",
            background: "rgba(0,0,0,0.4)", color: TEXT, cursor: "pointer",
          }}
        >
          <option value="todos">Todos os status</option>
          {Object.entries(STATUS_AGEND).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <button onClick={exportCSV} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: NEON, color: "#000", border: "none", borderRadius: "8px",
          padding: "9px 16px", fontSize: "13px", fontWeight: 800, cursor: "pointer",
        }}>
          <Download size={14} /> Exportar CSV
        </button>
      </div>

      {/* Tabela */}
      <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "12px", overflow: "hidden" }}>
        {/* Cabeçalho */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1.5fr 1.2fr",
          gap: "12px", padding: "12px 20px",
          borderBottom: "1px solid rgba(57,255,20,0.1)",
          background: "rgba(57,255,20,0.04)",
        }}>
          {["Nome", "E-mail", "WhatsApp", "Empresa", "Data/Hora", "Status"].map((h) => (
            <span key={h} style={{ fontSize: "11px", fontWeight: 700, color: MUTED, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {/* Linhas */}
        {lista.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: MUTED, fontSize: "14px" }}>
            {busca || filtroStatus !== "todos" ? "Nenhum resultado para os filtros aplicados." : "Nenhum agendamento registrado ainda."}
          </div>
        ) : (
          lista.map((a: any, idx: number) => {
            const whatsappNum = a.whatsapp?.replace(/\D/g, "");
            const dataFormatada = new Date(a.dataHora).toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo",
              weekday: "short", day: "2-digit", month: "2-digit",
              hour: "2-digit", minute: "2-digit",
            });
            const statusInfo = STATUS_AGEND[a.status] ?? { label: a.status, color: MUTED };
            return (
              <div
                key={a.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1.5fr 1.2fr",
                  gap: "12px", padding: "14px 20px",
                  borderBottom: idx < lista.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  alignItems: "center",
                }}
              >
                {/* Nome */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(57,255,20,0.1)", border: "1.5px solid rgba(57,255,20,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "13px", color: NEON,
                  }}>
                    {a.nome?.charAt(0).toUpperCase() ?? "?"}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {a.nome}
                  </span>
                </div>

                {/* E-mail */}
                <span style={{ fontSize: "12px", color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {a.email}
                </span>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/55${whatsappNum}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    color: "#22c55e", fontSize: "12px", fontWeight: 600, textDecoration: "none",
                  }}
                >
                  <Phone size={11} /> {a.whatsapp}
                </a>

                {/* Empresa */}
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {a.empresa ? (
                    <><Building2 size={11} style={{ color: MUTED, flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.empresa}</span></>
                  ) : (
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>—</span>
                  )}
                </div>

                {/* Data/Hora */}
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Clock size={11} style={{ color: MUTED, flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", color: TEXT, whiteSpace: "nowrap" }}>{dataFormatada}</span>
                </div>

                {/* Status (select inline) */}
                <select
                  value={a.status}
                  onChange={(e) => atualizarStatus.mutate({ id: a.id, status: e.target.value as any })}
                  style={{
                    padding: "5px 8px", borderRadius: "6px", border: `1px solid ${statusInfo.color}55`,
                    background: `${statusInfo.color}18`, color: statusInfo.color,
                    fontSize: "11px", fontWeight: 700, cursor: "pointer", width: "100%",
                  }}
                >
                  {Object.entries(STATUS_AGEND).map(([k, v]) => (
                    <option key={k} value={k} style={{ background: "#0d2b14", color: v.color }}>{v.label}</option>
                  ))}
                </select>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── Aba Vídeos ───────────────────────────────────────────────────────────────

function AbaVideos() {
  const [titulo, setTitulo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const { data: lista, isLoading, refetch } = trpc.videos.listar.useQuery();
  const salvar = trpc.videos.salvar.useMutation({ onSuccess: () => { refetch(); setTitulo(""); setUploadError(""); } });
  const setAtivo = trpc.videos.setAtivo.useMutation({ onSuccess: () => refetch() });
  const deletar = trpc.videos.deletar.useMutation({ onSuccess: () => refetch() });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!titulo.trim()) { setUploadError("Digite um título para o vídeo antes de fazer o upload."); return; }
    if (file.size > 500 * 1024 * 1024) { setUploadError("Arquivo muito grande. Máximo: 500MB."); return; }

    setUploading(true);
    setUploadError("");
    setUploadProgress(0);

    try {
      const suffix = Math.random().toString(36).slice(2, 8);
      const ext = file.name.split(".").pop() ?? "mp4";
      const fileKey = `videos/${suffix}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

      // Upload via XMLHttpRequest para ter progresso
      const formData = new FormData();
      formData.append("file", file);

      const uploadUrl = `/api/video-upload?key=${encodeURIComponent(fileKey)}`;
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uploadUrl);
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`Upload falhou: ${xhr.status} ${xhr.responseText}`));
        };
        xhr.onerror = () => reject(new Error("Erro de rede durante o upload."));
        xhr.send(formData);
      });

      // Montar URL pública via proxy
      const publicUrl = `/manus-storage/${fileKey}`;

      await salvar.mutateAsync({
        titulo: titulo.trim(),
        fileKey,
        url: publicUrl,
        mimeType: file.type || "video/mp4",
        tamanho: file.size,
        setAtivo: (lista ?? []).length === 0, // primeiro vídeo já fica ativo
      });

      setUploadProgress(100);
    } catch (err: any) {
      setUploadError(err.message ?? "Erro ao fazer upload.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const formatBytes = (bytes?: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}>
      <Loader2 className="animate-spin" style={{ color: NEON, width: 32, height: 32 }} />
    </div>
  );

  return (
    <div>
      {/* Card de upload */}
      <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <p style={{ color: NEON, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", margin: "0 0 12px", textTransform: "uppercase" }}>Novo Vídeo</p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ display: "block", fontSize: "11px", color: MUTED, marginBottom: "6px", fontWeight: 600 }}>Título do vídeo</label>
            <input
              type="text"
              placeholder="Ex: VSL LED Growth Models v2"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={uploading}
              style={{
                width: "100%", padding: "9px 14px", borderRadius: "8px",
                border: "1px solid rgba(57,255,20,0.2)", fontSize: "13px",
                background: "rgba(0,0,0,0.4)", color: TEXT, boxSizing: "border-box",
              }}
            />
          </div>
          <label style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: uploading ? "rgba(57,255,20,0.3)" : NEON,
            color: "#000", border: "none", borderRadius: "8px",
            padding: "9px 20px", fontSize: "13px", fontWeight: 800,
            cursor: uploading ? "not-allowed" : "pointer", whiteSpace: "nowrap",
          }}>
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? `Enviando... ${uploadProgress}%` : "Selecionar arquivo"}
            <input type="file" accept="video/*" onChange={handleUpload} disabled={uploading} style={{ display: "none" }} />
          </label>
        </div>
        {uploading && (
          <div style={{ marginTop: "12px" }}>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "99px", height: "6px", overflow: "hidden" }}>
              <div style={{ width: `${uploadProgress}%`, background: NEON, height: "6px", borderRadius: "99px", transition: "width 0.3s" }} />
            </div>
            <p style={{ fontSize: "11px", color: MUTED, margin: "6px 0 0" }}>{uploadProgress}% enviado</p>
          </div>
        )}
        {uploadError && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", color: "#ef4444", fontSize: "13px" }}>
            <AlertCircle size={14} /> {uploadError}
          </div>
        )}
        <p style={{ fontSize: "11px", color: MUTED, margin: "12px 0 0" }}>Formatos aceitos: MP4, MOV, WebM · Máximo: 500MB</p>
      </div>

      {/* Lista de vídeos */}
      {(lista ?? []).length === 0 ? (
        <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "12px", padding: "48px", textAlign: "center" }}>
          <Video size={32} style={{ color: MUTED, marginBottom: "12px" }} />
          <p style={{ color: MUTED, fontSize: "14px", margin: 0 }}>Nenhum vídeo hospedado ainda. Faça o upload acima.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {(lista ?? []).map((v: any) => (
            <div key={v.id} style={{
              background: v.ativo === "sim" ? "rgba(57,255,20,0.06)" : CARD_BG,
              border: v.ativo === "sim" ? `1px solid ${NEON}55` : CARD_BORDER,
              borderRadius: "12px", padding: "16px 20px",
              display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
            }}>
              {/* Ícone */}
              <div style={{
                width: 44, height: 44, borderRadius: "10px", flexShrink: 0,
                background: v.ativo === "sim" ? "rgba(57,255,20,0.15)" : "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Video size={20} style={{ color: v.ativo === "sim" ? NEON : MUTED }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: "140px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: TEXT }}>{v.titulo}</span>
                  {v.ativo === "sim" && (
                    <span style={{
                      fontSize: "10px", fontWeight: 800, color: "#000",
                      background: NEON, borderRadius: "4px", padding: "2px 7px", letterSpacing: "0.05em",
                    }}>ATIVO NA VSL</span>
                  )}
                </div>
                <p style={{ fontSize: "11px", color: MUTED, margin: 0 }}>
                  {formatBytes(v.tamanho)} · {new Date(v.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>

              {/* Ações */}
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <button
                  onClick={() => setPreviewVideo(previewVideo === v.url ? null : v.url)}
                  title="Pré-visualizar"
                  style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    background: "rgba(255,255,255,0.06)", color: TEXT,
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "7px",
                    padding: "7px 12px", fontSize: "12px", fontWeight: 600, cursor: "pointer",
                  }}
                >
                  <Play size={12} /> Prévia
                </button>
                {v.ativo !== "sim" && (
                  <button
                    onClick={() => setAtivo.mutate({ id: v.id })}
                    title="Usar na VSL"
                    style={{
                      display: "flex", alignItems: "center", gap: "5px",
                      background: "rgba(57,255,20,0.15)", color: NEON,
                      border: `1px solid ${NEON}44`, borderRadius: "7px",
                      padding: "7px 12px", fontSize: "12px", fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    <Star size={12} /> Usar na VSL
                  </button>
                )}
                <button
                  onClick={() => { if (confirm(`Deletar "${v.titulo}"?`)) deletar.mutate({ id: v.id }); }}
                  title="Deletar"
                  style={{
                    display: "flex", alignItems: "center",
                    background: "rgba(239,68,68,0.1)", color: "#ef4444",
                    border: "1px solid rgba(239,68,68,0.2)", borderRadius: "7px",
                    padding: "7px 10px", fontSize: "12px", cursor: "pointer",
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Player de prévia */}
              {previewVideo === v.url && (
                <div style={{ width: "100%", marginTop: "12px" }}>
                  <video
                    src={v.url}
                    controls
                    style={{ width: "100%", maxWidth: "360px", borderRadius: "8px", background: "#000" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Dashboard principal ───────────────────────────────────────────────────────

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [aba, setAba] = useState<"analytics" | "crm" | "agendamentos" | "videos">("crm");

  const { data: analytics, isLoading, error } = trpc.quiz.getAnalytics.useQuery();
  const { data: detailedData } = trpc.quiz.getDetailedData.useQuery();

  const exportAnalyticsCSV = () => {
    if (!detailedData || detailedData.length === 0) { alert("Nenhum dado disponível"); return; }
    const headers = ["Session ID", "Modelo Predominante", "SLG", "PLG", "MLG", "FLG", "Data/Hora"];
    const rows = detailedData.map((item: any) => [
      item.sessionId, item.primaryModel,
      item.scores.SLG || 0, item.scores.PLG || 0, item.scores.MLG || 0, item.scores.FLG || 0,
      new Date(item.completedAt).toLocaleString("pt-BR"),
    ]);
    const csv = [headers.join(","), ...rows.map((r: any[]) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `analytics_quiz_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const getMostPredominantModel = () => {
    if (!analytics) return { model: "SLG", count: 0 };
    let maxCount = 0; let model = "SLG";
    for (const [k, v] of Object.entries(analytics.modelDistribution)) {
      if (v > maxCount) { maxCount = v; model = k; }
    }
    return { model, count: maxCount };
  };

  const predominant = analytics ? getMostPredominantModel() : { model: "SLG", count: 0 };
  const totalResponses = analytics
    ? Object.values(analytics.modelDistribution).reduce((a, b) => a + b, 0)
    : 0;

  const pieData = analytics
    ? Object.entries(analytics.modelDistribution).map(([key, value]) => ({
        name: MODEL_NAMES[key], value, color: MODEL_COLORS[key],
      }))
    : [];

  const barData = analytics
    ? Object.entries(analytics.modelDistribution).map(([key, value]) => ({
        model: MODEL_NAMES[key], respostas: value,
      }))
    : [];

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "28px 16px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p style={{ color: NEON, fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", margin: "0 0 4px" }}>
              PAINEL DE CONTROLE
            </p>
            <h1 style={{ color: "#fff", fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
              LED GROWTH <span style={{ color: NEON }}>MODELS</span>
            </h1>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {aba === "analytics" && (
              <button onClick={exportAnalyticsCSV} style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "rgba(57,255,20,0.15)", color: NEON, border: `1px solid ${NEON}44`,
                borderRadius: "8px", padding: "9px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
              }}>
                <Download size={14} /> Exportar CSV
              </button>
            )}
            <button onClick={() => setLocation("/")} style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.06)", color: TEXT, border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px", padding: "9px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
            }}>
              <ArrowLeft size={14} /> Voltar ao Quiz
            </button>
          </div>
        </div>

        {/* Abas */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "28px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "4px", width: "fit-content" }}>
          {[
            { id: "crm",          label: "CRM de Leads",   icon: <Users size={14} /> },
            { id: "agendamentos", label: "Agendamentos",   icon: <Calendar size={14} /> },
            { id: "videos",      label: "Vídeos",          icon: <Video size={14} /> },
            { id: "analytics",   label: "Analytics",      icon: <BarChart3 size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAba(tab.id as any)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 20px", borderRadius: "7px", border: "none",
                background: aba === tab.id ? NEON : "transparent",
                color: aba === tab.id ? "#000" : MUTED,
                fontWeight: aba === tab.id ? 800 : 500,
                fontSize: "13px", cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        {aba === "crm" ? (
          <CrmKanban />
        ) : aba === "agendamentos" ? (
          <AbaAgendamentos />
        ) : aba === "videos" ? (
          <AbaVideos />
        ) : (
          <>
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}>
                <Loader2 className="animate-spin" style={{ color: NEON, width: 32, height: 32 }} />
              </div>
            ) : error ? (
              <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "12px", padding: "24px" }}>
                <p style={{ color: "#ef4444" }}>Erro ao carregar analytics: {error.message}</p>
              </div>
            ) : analytics ? (
              <>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "24px" }}>
                  {[
                    { label: "Total de Quizzes", value: analytics.totalQuizzes, sub: "Completados", icon: <BarChart3 size={18} />, color: "#3b82f6" },
                    { label: "Taxa de Conclusão", value: `${analytics.completionRate}%`, sub: "Dos iniciados", icon: <TrendingUp size={18} />, color: NEON },
                    { label: "Modelo Predominante", value: predominant.model, sub: `${predominant.count} respostas`, icon: <div style={{ width: 18, height: 18, borderRadius: "4px", background: MODEL_COLORS[predominant.model] }} />, color: MODEL_COLORS[predominant.model] },
                  ].map((s) => (
                    <div key={s.label} style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "12px", padding: "20px" }}>
                      <div style={{ color: s.color, marginBottom: "8px" }}>{s.icon}</div>
                      <p style={{ fontSize: "28px", fontWeight: 900, color: s.color, margin: "0 0 4px" }}>{s.value}</p>
                      <p style={{ fontSize: "12px", color: MUTED, margin: 0 }}>{s.sub}</p>
                      <p style={{ fontSize: "11px", color: MUTED, margin: "2px 0 0", opacity: 0.7 }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Gráficos */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px", marginBottom: "24px" }}>
                  <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "12px", padding: "20px" }}>
                    <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "14px", marginBottom: "16px" }}>Distribuição de Modelos</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80} dataKey="value">
                          {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: "#0d2b14", border: `1px solid ${NEON}33`, color: TEXT }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "12px", padding: "20px" }}>
                    <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "14px", marginBottom: "16px" }}>Respostas por Modelo</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(57,255,20,0.1)" />
                        <XAxis dataKey="model" angle={-30} textAnchor="end" height={80} tick={{ fontSize: 10, fill: MUTED }} />
                        <YAxis tick={{ fontSize: 10, fill: MUTED }} />
                        <Tooltip contentStyle={{ background: "#0d2b14", border: `1px solid ${NEON}33`, color: TEXT }} />
                        <Legend wrapperStyle={{ color: MUTED, fontSize: "12px" }} />
                        <Bar dataKey="respostas" fill={NEON} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Detalhamento */}
                <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: "12px", padding: "20px" }}>
                  <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "14px", marginBottom: "16px" }}>Detalhamento por Modelo</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {Object.entries(analytics.modelDistribution).map(([key, value]) => {
                      const pct = totalResponses > 0 ? ((value / totalResponses) * 100).toFixed(1) : 0;
                      return (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div style={{ width: 12, height: 12, borderRadius: "3px", background: MODEL_COLORS[key], flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                              <span style={{ fontWeight: 600, fontSize: "13px", color: TEXT }}>{MODEL_NAMES[key]}</span>
                              <span style={{ fontSize: "12px", color: MUTED }}>{value} respostas ({pct}%)</span>
                            </div>
                            <div style={{ width: "100%", background: "rgba(255,255,255,0.08)", borderRadius: "99px", height: "6px" }}>
                              <div style={{ width: `${pct}%`, background: MODEL_COLORS[key], borderRadius: "99px", height: "6px" }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
