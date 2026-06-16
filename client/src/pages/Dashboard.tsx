import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft, BarChart3, TrendingUp, Loader2, Download,
  Users, MessageCircle, Calendar, CheckCircle, XCircle,
  Phone, ChevronDown, StickyNote, Trash2,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { trpc } from "@/lib/trpc";

// ── Constantes ────────────────────────────────────────────────────────────────

const COLORS = { SLG: "#3b82f6", PLG: "#a855f7", MLG: "#22c55e", FLG: "#ef4444" };

const modelNames: Record<string, string> = {
  SLG: "Sales-Led Growth",
  PLG: "Product-Led Growth",
  MLG: "Marketing-Led Growth",
  FLG: "Founder-Led Growth",
};

const modelEmoji: Record<string, string> = {
  SLG: "📞", PLG: "🎯", MLG: "📢", FLG: "⭐",
};

type CrmStatus = "novo" | "em_contato" | "sessao_marcada" | "sessao_realizada" | "comprou" | "nao_comprou";

const crmStatusConfig: Record<CrmStatus, { label: string; color: string; bg: string }> = {
  novo:             { label: "Novo",              color: "#6b7280", bg: "#f3f4f6" },
  em_contato:       { label: "Em contato",        color: "#2563eb", bg: "#dbeafe" },
  sessao_marcada:   { label: "Sessão marcada",    color: "#d97706", bg: "#fef3c7" },
  sessao_realizada: { label: "Sessão realizada",  color: "#7c3aed", bg: "#ede9fe" },
  comprou:          { label: "Comprou",           color: "#16a34a", bg: "#dcfce7" },
  nao_comprou:      { label: "Não comprou",       color: "#dc2626", bg: "#fee2e2" },
};

// ── Componente CRM Row ────────────────────────────────────────────────────────

function CrmRow({ lead, onRefresh }: { lead: any; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [nota, setNota] = useState(lead.notas ?? "");
  const [dataSessao, setDataSessao] = useState(lead.dataSessao ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const atualizarStatus = trpc.quizLeads.atualizarStatus.useMutation({ onSuccess: onRefresh });
  const salvarNotas = trpc.quizLeads.salvarNotas.useMutation({ onSuccess: onRefresh });
  const remover = trpc.quizLeads.remover.useMutation({ onSuccess: onRefresh });

  const statusCfg = crmStatusConfig[lead.crmStatus as CrmStatus] ?? crmStatusConfig.novo;
  const whatsappLink = `https://wa.me/55${lead.whatsapp}`;

  const handleStatusChange = (newStatus: CrmStatus) => {
    const update: any = { id: lead.id, crmStatus: newStatus };
    if (newStatus === "sessao_marcada" && dataSessao) update.dataSessao = dataSessao;
    atualizarStatus.mutate(update);
  };

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      marginBottom: "10px",
      overflow: "hidden",
      background: "#fff",
    }}>
      {/* Linha principal */}
      <div
        style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: "12px", cursor: "pointer" }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar */}
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: lead.resultadoModelo ? COLORS[lead.resultadoModelo as keyof typeof COLORS] + "22" : "#f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", flexShrink: 0,
        }}>
          {lead.resultadoModelo ? modelEmoji[lead.resultadoModelo] ?? "❓" : "❓"}
        </div>

        {/* Nome + email */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: "14px", color: "#111", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {lead.nome}
          </p>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {lead.email}
          </p>
        </div>

        {/* Resultado */}
        {lead.resultadoModelo ? (
          <span style={{
            fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px",
            background: COLORS[lead.resultadoModelo as keyof typeof COLORS] + "22",
            color: COLORS[lead.resultadoModelo as keyof typeof COLORS],
            flexShrink: 0,
          }}>
            {lead.resultadoModelo}
          </span>
        ) : (
          <span style={{ fontSize: "11px", color: "#9ca3af", flexShrink: 0 }}>Pendente</span>
        )}

        {/* Status CRM */}
        <span style={{
          fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px",
          background: statusCfg.bg, color: statusCfg.color, flexShrink: 0,
        }}>
          {statusCfg.label}
        </span>

        {/* Data */}
        <span style={{ fontSize: "11px", color: "#9ca3af", flexShrink: 0, display: "none" }}
          className="hidden md:block">
          {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
        </span>

        <ChevronDown size={16} style={{ color: "#9ca3af", flexShrink: 0, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </div>

      {/* Painel expandido */}
      {expanded && (
        <div style={{ borderTop: "1px solid #f3f4f6", padding: "16px", background: "#fafafa" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px" }}>

            {/* WhatsApp */}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "#22c55e", color: "#fff", borderRadius: "8px",
                padding: "10px 14px", textDecoration: "none", fontWeight: 700, fontSize: "13px",
              }}>
              <Phone size={15} /> Abrir WhatsApp
            </a>

            {/* Pipeline CRM */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "4px" }}>
                ETAPA DO PIPELINE
              </label>
              <select
                value={lead.crmStatus}
                onChange={(e) => handleStatusChange(e.target.value as CrmStatus)}
                disabled={atualizarStatus.isPending}
                style={{
                  width: "100%", padding: "8px 10px", borderRadius: "6px",
                  border: "1px solid #d1d5db", fontSize: "13px", background: "#fff",
                  color: "#111", cursor: "pointer",
                }}
              >
                {Object.entries(crmStatusConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>

            {/* Data da sessão */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "4px" }}>
                DATA DA SESSÃO
              </label>
              <div style={{ display: "flex", gap: "6px" }}>
                <input
                  type="date"
                  value={dataSessao}
                  onChange={(e) => setDataSessao(e.target.value)}
                  style={{
                    flex: 1, padding: "8px 10px", borderRadius: "6px",
                    border: "1px solid #d1d5db", fontSize: "13px", background: "#fff",
                  }}
                />
                <button
                  onClick={() => atualizarStatus.mutate({ id: lead.id, crmStatus: lead.crmStatus, dataSessao })}
                  disabled={atualizarStatus.isPending}
                  style={{
                    padding: "8px 12px", borderRadius: "6px", border: "none",
                    background: "#2563eb", color: "#fff", fontSize: "12px",
                    fontWeight: 700, cursor: "pointer",
                  }}
                >
                  Salvar
                </button>
              </div>
              {lead.dataSessao && (
                <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>
                  Agendada: {lead.dataSessao}
                </p>
              )}
            </div>
          </div>

          {/* Notas */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
              <StickyNote size={12} /> ANOTAÇÕES
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                rows={2}
                placeholder="Adicione observações sobre este lead..."
                style={{
                  flex: 1, padding: "8px 10px", borderRadius: "6px",
                  border: "1px solid #d1d5db", fontSize: "13px",
                  resize: "vertical", fontFamily: "inherit",
                }}
              />
              <button
                onClick={() => salvarNotas.mutate({ id: lead.id, notas: nota })}
                disabled={salvarNotas.isPending}
                style={{
                  padding: "8px 12px", borderRadius: "6px", border: "none",
                  background: "#6b7280", color: "#fff", fontSize: "12px",
                  fontWeight: 700, cursor: "pointer", alignSelf: "flex-start",
                }}
              >
                {salvarNotas.isPending ? "..." : "Salvar"}
              </button>
            </div>
          </div>

          {/* Info + Delete */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
              Cadastrado em {new Date(lead.createdAt).toLocaleString("pt-BR")}
            </p>
            {!confirmDelete ? (
              <button onClick={() => setConfirmDelete(true)}
                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}>
                <Trash2 size={13} /> Remover
              </button>
            ) : (
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>Confirmar remoção?</span>
                <button onClick={() => remover.mutate({ id: lead.id })}
                  style={{ background: "#ef4444", border: "none", color: "#fff", borderRadius: "4px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}>
                  Sim
                </button>
                <button onClick={() => setConfirmDelete(false)}
                  style={{ background: "#e5e7eb", border: "none", color: "#374151", borderRadius: "4px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}>
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

// ── Aba CRM ───────────────────────────────────────────────────────────────────

function CrmTab() {
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [busca, setBusca] = useState("");

  const { data: leads, isLoading, refetch } = trpc.quizLeads.listar.useQuery();

  const leadsFiltrados = (leads ?? []).filter((l: any) => {
    const matchStatus = filtroStatus === "todos" || l.crmStatus === filtroStatus;
    const matchBusca = !busca || l.nome.toLowerCase().includes(busca.toLowerCase()) ||
      l.email.toLowerCase().includes(busca.toLowerCase()) || l.whatsapp.includes(busca);
    return matchStatus && matchBusca;
  });

  // Métricas rápidas
  const total = (leads ?? []).length;
  const emContato = (leads ?? []).filter((l: any) => l.crmStatus === "em_contato").length;
  const sessoes = (leads ?? []).filter((l: any) => ["sessao_marcada", "sessao_realizada"].includes(l.crmStatus)).length;
  const compraram = (leads ?? []).filter((l: any) => l.crmStatus === "comprou").length;

  if (isLoading) return (
    <div style={{ display: "flex", justifyContent: "center", padding: "48px" }}>
      <Loader2 className="animate-spin" style={{ color: "#6b7280" }} />
    </div>
  );

  return (
    <div>
      {/* Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total de leads", value: total, icon: <Users size={18} />, color: "#2563eb" },
          { label: "Em contato", value: emContato, icon: <MessageCircle size={18} />, color: "#d97706" },
          { label: "Sessões", value: sessoes, icon: <Calendar size={18} />, color: "#7c3aed" },
          { label: "Compraram", value: compraram, icon: <CheckCircle size={18} />, color: "#16a34a" },
        ].map((m) => (
          <div key={m.label} style={{
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px",
            padding: "16px", display: "flex", flexDirection: "column", gap: "6px",
          }}>
            <div style={{ color: m.color }}>{m.icon}</div>
            <p style={{ fontSize: "24px", fontWeight: 800, color: "#111", margin: 0 }}>{m.value}</p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Buscar por nome, e-mail ou WhatsApp..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            flex: 1, minWidth: "200px", padding: "9px 14px", borderRadius: "8px",
            border: "1px solid #d1d5db", fontSize: "13px",
          }}
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={{
            padding: "9px 14px", borderRadius: "8px", border: "1px solid #d1d5db",
            fontSize: "13px", background: "#fff", cursor: "pointer",
          }}
        >
          <option value="todos">Todos os status</option>
          {Object.entries(crmStatusConfig).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Lista */}
      {leadsFiltrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px", color: "#9ca3af" }}>
          <Users size={40} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
          <p style={{ fontSize: "15px" }}>Nenhum lead encontrado</p>
        </div>
      ) : (
        leadsFiltrados.map((lead: any) => (
          <CrmRow key={lead.id} lead={lead} onRefresh={refetch} />
        ))
      )}
    </div>
  );
}

// ── Dashboard principal ───────────────────────────────────────────────────────

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [aba, setAba] = useState<"analytics" | "crm">("analytics");

  const { data: analytics, isLoading, error } = trpc.quiz.getAnalytics.useQuery();
  const { data: detailedData } = trpc.quiz.getDetailedData.useQuery();

  const exportToCSV = () => {
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
    link.download = `quiz_results_${new Date().toISOString().split("T")[0]}.csv`;
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
        name: modelNames[key], value, color: COLORS[key as keyof typeof COLORS],
      }))
    : [];

  const barData = analytics
    ? Object.entries(analytics.modelDistribution).map(([key, value]) => ({
        model: modelNames[key], respostas: value,
      }))
    : [];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "32px 16px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800, margin: 0 }}>
              LED GROWTH <span style={{ color: "#39ff14" }}>MODELS</span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "13px", margin: "4px 0 0" }}>Painel de controle</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {aba === "analytics" && (
              <button onClick={exportToCSV} style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "#16a34a", color: "#fff", border: "none", borderRadius: "8px",
                padding: "9px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
              }}>
                <Download size={14} /> Exportar CSV
              </button>
            )}
            <button onClick={() => setLocation("/")} style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px", padding: "9px 16px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
            }}>
              <ArrowLeft size={14} /> Voltar ao Quiz
            </button>
          </div>
        </div>

        {/* Abas */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "4px", width: "fit-content" }}>
          {[
            { id: "analytics", label: "Analytics", icon: <BarChart3 size={15} /> },
            { id: "crm", label: "CRM de Leads", icon: <Users size={15} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAba(tab.id as any)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 20px", borderRadius: "7px", border: "none",
                background: aba === tab.id ? "#fff" : "transparent",
                color: aba === tab.id ? "#111" : "#94a3b8",
                fontWeight: aba === tab.id ? 700 : 500,
                fontSize: "13px", cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        {aba === "crm" ? (
          <CrmTab />
        ) : (
          <>
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}>
                <Loader2 className="animate-spin" style={{ color: "#94a3b8", width: 32, height: 32 }} />
              </div>
            ) : error ? (
              <Card className="bg-white p-8">
                <p className="text-red-600">Erro ao carregar analytics: {error.message}</p>
              </Card>
            ) : analytics ? (
              <>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "24px" }}>
                  <Card className="bg-white p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <h3 className="text-base font-semibold">Total de Quizzes</h3>
                    </div>
                    <p className="text-4xl font-bold text-blue-600">{analytics.totalQuizzes}</p>
                    <p className="text-sm text-gray-500 mt-1">Completados</p>
                  </Card>
                  <Card className="bg-white p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h3 className="text-base font-semibold">Taxa de Conclusão</h3>
                    </div>
                    <p className="text-4xl font-bold text-green-600">{analytics.completionRate}%</p>
                    <p className="text-sm text-gray-500 mt-1">Dos iniciados</p>
                  </Card>
                  <Card className="bg-white p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-5 h-5 rounded" style={{ backgroundColor: COLORS[predominant.model as keyof typeof COLORS] }} />
                      <h3 className="text-base font-semibold">Modelo Predominante</h3>
                    </div>
                    <p className="text-xl font-bold" style={{ color: COLORS[predominant.model as keyof typeof COLORS] }}>
                      {modelNames[predominant.model]}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{predominant.count} respostas</p>
                  </Card>
                </div>

                {/* Gráficos */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px", marginBottom: "24px" }}>
                  <Card className="bg-white p-6">
                    <h3 className="text-lg font-bold mb-4">Distribuição de Modelos</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80} dataKey="value">
                          {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                  <Card className="bg-white p-6">
                    <h3 className="text-lg font-bold mb-4">Respostas por Modelo</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="model" angle={-30} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="respostas" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Detalhamento */}
                <Card className="bg-white p-6">
                  <h3 className="text-lg font-bold mb-4">Detalhamento por Modelo</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.modelDistribution).map(([key, value]) => {
                      const pct = totalResponses > 0 ? ((value / totalResponses) * 100).toFixed(1) : 0;
                      return (
                        <div key={key} className="flex items-center gap-4">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[key as keyof typeof COLORS] }} />
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium text-sm">{modelNames[key]}</span>
                              <span className="text-gray-500 text-sm">{value} respostas ({pct}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: COLORS[key as keyof typeof COLORS] }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
