import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  MessageCircle, ChevronDown, Trash2, StickyNote,
  Users, TrendingUp, Calendar, Search, X, Check
} from "lucide-react";

type LeadStatus =
  | "lead"
  | "1a_mensagem"
  | "2a_mensagem"
  | "3a_mensagem"
  | "participou"
  | "nao_participou"
  | "marcou_reuniao"
  | "comprou"
  | "nao_comprou";

const STATUS_CONFIG: Record<LeadStatus, { label: string; cor: string; bg: string }> = {
  lead:           { label: "Lead",           cor: "#aaaaaa", bg: "#1a1a1a" },
  "1a_mensagem":  { label: "1ª mensagem",    cor: "#60a5fa", bg: "#0d1f3c" },
  "2a_mensagem":  { label: "2ª mensagem",    cor: "#818cf8", bg: "#1a1a3c" },
  "3a_mensagem":  { label: "3ª mensagem",    cor: "#c084fc", bg: "#2a1a3c" },
  participou:     { label: "Participou",     cor: "#39ff14", bg: "#0a2a0a" },
  nao_participou: { label: "Não participou", cor: "#f87171", bg: "#2a0a0a" },
  marcou_reuniao: { label: "Reunião marcada",cor: "#fbbf24", bg: "#2a1a00" },
  comprou:        { label: "Comprou",        cor: "#34d399", bg: "#0a2a1a" },
  nao_comprou:    { label: "Não comprou",    cor: "#fb923c", bg: "#2a1200" },
};

const PIPELINE_ORDER: LeadStatus[] = [
  "lead", "1a_mensagem", "2a_mensagem", "3a_mensagem",
  "participou", "nao_participou", "marcou_reuniao", "comprou", "nao_comprou",
];

function formatWhatsAppLink(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // Adiciona DDI 55 se não tiver
  const withDDI = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${withDDI}`;
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{
      background: cfg.bg, color: cfg.cor,
      border: `1px solid ${cfg.cor}33`,
      borderRadius: "4px", padding: "3px 10px",
      fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap",
    }}>
      {cfg.label}
    </span>
  );
}

function NotasEditor({ leadId, notasIniciais, onSaved }: {
  leadId: number; notasIniciais: string | null; onSaved: () => void;
}) {
  const [texto, setTexto] = useState(notasIniciais ?? "");
  const [editando, setEditando] = useState(false);
  const salvar = trpc.leads.salvarNotas.useMutation({ onSuccess: () => { setEditando(false); onSaved(); } });

  if (!editando) {
    return (
      <button
        onClick={() => setEditando(true)}
        style={{
          background: "none", border: "1px solid #333", borderRadius: "4px",
          color: "#888", fontSize: "12px", padding: "4px 10px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "4px",
        }}
      >
        <StickyNote size={12} />
        {notasIniciais ? "Ver notas" : "Adicionar nota"}
      </button>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "220px" }}>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={3}
        placeholder="Anotações sobre este lead..."
        style={{
          background: "#1a1a1a", border: "1px solid #333", borderRadius: "4px",
          color: "#fff", fontSize: "13px", padding: "8px", resize: "vertical",
          fontFamily: "inherit", outline: "none",
        }}
      />
      <div style={{ display: "flex", gap: "6px" }}>
        <button
          onClick={() => salvar.mutate({ id: leadId, notas: texto })}
          disabled={salvar.isPending}
          style={{
            background: "#39ff14", color: "#0a0a0a", border: "none",
            borderRadius: "4px", padding: "4px 12px", fontSize: "12px",
            fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px",
          }}
        >
          <Check size={12} /> Salvar
        </button>
        <button
          onClick={() => setEditando(false)}
          style={{
            background: "none", border: "1px solid #333", borderRadius: "4px",
            color: "#888", fontSize: "12px", padding: "4px 10px", cursor: "pointer",
          }}
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}

export default function CrmLeads() {
  const { user, loading, isAuthenticated } = useAuth();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<LeadStatus | "todos">("todos");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: leads = [], isLoading } = trpc.leads.listar.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const atualizarStatus = trpc.leads.atualizarStatus.useMutation({
    onSuccess: () => utils.leads.listar.invalidate(),
  });

  const remover = trpc.leads.remover.useMutation({
    onSuccess: () => { setConfirmDelete(null); utils.leads.listar.invalidate(); },
  });

  // ── Proteção de acesso ──
  if (loading) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", fontFamily: "Inter, sans-serif" }}>
        <p style={{ color: "#fff", fontSize: "18px" }}>Acesso restrito</p>
        <a href={getLoginUrl()} style={{ color: "#39ff14", fontSize: "14px" }}>Fazer login</a>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
        <p style={{ color: "#f87171", fontSize: "16px" }}>Você não tem permissão para acessar esta área.</p>
      </div>
    );
  }

  // ── Filtros ──
  const leadsFiltrados = leads.filter((l) => {
    const matchBusca =
      !busca ||
      l.nome.toLowerCase().includes(busca.toLowerCase()) ||
      l.email.toLowerCase().includes(busca.toLowerCase()) ||
      l.whatsapp.includes(busca);
    const matchStatus = filtroStatus === "todos" || l.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  // ── Métricas ──
  const totalLeads = leads.length;
  const compraram = leads.filter((l) => l.status === "comprou").length;
  const participaram = leads.filter((l) => l.status === "participou").length;
  const hoje = leads.filter((l) => {
    const d = new Date(l.createdAt);
    const now = new Date();
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Space Grotesk', 'Inter', sans-serif", color: "#fff" }}>

      {/* ── HEADER ── */}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px" }}>
            <span style={{ color: "#39ff14" }}>LED</span> GROWTH · CRM
          </h1>
          <p style={{ margin: "2px 0 0", color: "#666", fontSize: "12px" }}>Gestão de leads do evento</p>
        </div>
        <a href="/evento" style={{ color: "#666", fontSize: "13px", textDecoration: "none" }}>
          ← Voltar ao site
        </a>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px" }}>

        {/* ── MÉTRICAS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { label: "Total de leads", value: totalLeads, icon: <Users size={18} />, cor: "#39ff14" },
            { label: "Inscritos hoje", value: hoje, icon: <Calendar size={18} />, cor: "#60a5fa" },
            { label: "Participaram", value: participaram, icon: <TrendingUp size={18} />, cor: "#fbbf24" },
            { label: "Compraram", value: compraram, icon: <Check size={18} />, cor: "#34d399" },
          ].map((m, i) => (
            <div key={i} style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: "8px", padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: m.cor }}>
                {m.icon}
                <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>{m.label}</span>
              </div>
              <p style={{ margin: 0, fontSize: "32px", fontWeight: 900, color: "#fff" }}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* ── FILTROS ── */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Busca */}
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#666" }} />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, e-mail ou WhatsApp..."
              style={{
                width: "100%", background: "#0f0f0f", border: "1px solid #222",
                borderRadius: "6px", padding: "10px 12px 10px 34px",
                color: "#fff", fontSize: "14px", outline: "none",
                fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Filtro de status */}
          <div style={{ position: "relative" }}>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as LeadStatus | "todos")}
              style={{
                background: "#0f0f0f", border: "1px solid #222", borderRadius: "6px",
                color: "#fff", fontSize: "13px", padding: "10px 32px 10px 12px",
                outline: "none", fontFamily: "inherit", cursor: "pointer",
                appearance: "none",
              }}
            >
              <option value="todos">Todos os status</option>
              {PIPELINE_ORDER.map((s) => (
                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#666", pointerEvents: "none" }} />
          </div>

          <span style={{ color: "#555", fontSize: "13px" }}>
            {leadsFiltrados.length} lead{leadsFiltrados.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── TABELA ── */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#555" }}>Carregando leads...</div>
        ) : leadsFiltrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#555" }}>
            {leads.length === 0 ? "Nenhum lead cadastrado ainda." : "Nenhum lead encontrado com esses filtros."}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1a1a1a" }}>
                  {["Nome", "WhatsApp", "E-mail", "Evento", "Cadastro", "Status", "Notas", ""].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 14px",
                      color: "#555", fontSize: "11px", fontWeight: 600,
                      letterSpacing: "1px", textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leadsFiltrados.map((lead) => (
                  <tr
                    key={lead.id}
                    style={{ borderBottom: "1px solid #111", transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#0f0f0f")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Nome */}
                    <td style={{ padding: "14px", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {lead.nome}
                    </td>

                    {/* WhatsApp — clicável */}
                    <td style={{ padding: "14px", whiteSpace: "nowrap" }}>
                      <a
                        href={formatWhatsAppLink(lead.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          color: "#39ff14", textDecoration: "none", fontWeight: 600,
                          background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)",
                          borderRadius: "4px", padding: "5px 10px", fontSize: "13px",
                          transition: "background 0.15s",
                        }}
                      >
                        <MessageCircle size={13} />
                        {lead.whatsapp.replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, "($1) $2 $3-$4")}
                      </a>
                    </td>

                    {/* E-mail */}
                    <td style={{ padding: "14px", color: "#aaa", fontSize: "13px" }}>
                      {lead.email}
                    </td>

                    {/* Evento */}
                    <td style={{ padding: "14px", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>
                      {lead.eventoData ?? "—"}
                    </td>

                    {/* Data de cadastro */}
                    <td style={{ padding: "14px", color: "#666", fontSize: "12px", whiteSpace: "nowrap" }}>
                      {formatDate(lead.createdAt)}
                    </td>

                    {/* Status — select inline */}
                    <td style={{ padding: "14px" }}>
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            atualizarStatus.mutate({ id: lead.id, status: e.target.value as LeadStatus })
                          }
                          style={{
                            background: STATUS_CONFIG[lead.status as LeadStatus].bg,
                            color: STATUS_CONFIG[lead.status as LeadStatus].cor,
                            border: `1px solid ${STATUS_CONFIG[lead.status as LeadStatus].cor}44`,
                            borderRadius: "4px", padding: "4px 28px 4px 10px",
                            fontSize: "12px", fontWeight: 600, cursor: "pointer",
                            outline: "none", fontFamily: "inherit", appearance: "none",
                          }}
                        >
                          {PIPELINE_ORDER.map((s) => (
                            <option key={s} value={s} style={{ background: "#1a1a1a", color: "#fff" }}>
                              {STATUS_CONFIG[s].label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={12} style={{
                          position: "absolute", right: "8px", top: "50%",
                          transform: "translateY(-50%)", pointerEvents: "none",
                          color: STATUS_CONFIG[lead.status as LeadStatus].cor,
                        }} />
                      </div>
                    </td>

                    {/* Notas */}
                    <td style={{ padding: "14px" }}>
                      <NotasEditor
                        leadId={lead.id}
                        notasIniciais={lead.notas}
                        onSaved={() => utils.leads.listar.invalidate()}
                      />
                    </td>

                    {/* Excluir */}
                    <td style={{ padding: "14px" }}>
                      {confirmDelete === lead.id ? (
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <button
                            onClick={() => remover.mutate({ id: lead.id })}
                            style={{
                              background: "#7f1d1d", color: "#fca5a5", border: "none",
                              borderRadius: "4px", padding: "4px 10px", fontSize: "12px",
                              cursor: "pointer", fontWeight: 600,
                            }}
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            style={{
                              background: "none", border: "1px solid #333", borderRadius: "4px",
                              color: "#666", fontSize: "12px", padding: "4px 8px", cursor: "pointer",
                            }}
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(lead.id)}
                          style={{
                            background: "none", border: "none", color: "#444",
                            cursor: "pointer", padding: "4px",
                            transition: "color 0.15s",
                          }}
                          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f87171")}
                          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#444")}
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
