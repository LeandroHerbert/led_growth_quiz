import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const MODELO_LABELS: Record<string, string> = {
  SLG: "Sales-Led Growth",
  PLG: "Product-Led Growth",
  MLG: "Marketing-Led Growth",
  FLG: "Founder-Led Growth",
};

type Step = "form" | "slots" | "confirmado";

export default function Agendar() {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", empresa: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [slotSelecionado, setSlotSelecionado] = useState<string | null>(null);
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);

  const { data: slots, isLoading: loadingSlots } = trpc.agendamentos.slotsDisponiveis.useQuery(undefined, {
    enabled: step === "slots",
  });

  const criar = trpc.agendamentos.criar.useMutation({
    onSuccess: () => setStep("confirmado"),
    onError: (err) => toast.error(err.message),
  });

  const slotsPorDia = useMemo(() => {
    if (!slots) return {};
    const map: Record<string, typeof slots> = {};
    for (const s of slots) {
      if (!map[s.diaSemana]) map[s.diaSemana] = [];
      map[s.diaSemana].push(s);
    }
    return map;
  }, [slots]);

  const dias = useMemo(() => Object.keys(slotsPorDia), [slotsPorDia]);

  function validarForm() {
    const e: Record<string, string> = {};
    if (!form.nome.trim() || form.nome.trim().length < 2) e.nome = "Nome obrigatório";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido";
    if (!form.whatsapp.trim() || form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "WhatsApp inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validarForm()) setStep("slots");
  }

  function handleConfirmar() {
    if (!slotSelecionado) return toast.error("Selecione um horário");
    criar.mutate({ ...form, dataHora: slotSelecionado });
  }

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050a05; }
    .page {
      min-height: 100vh;
      background: linear-gradient(135deg, #050a05 0%, #0a1a0a 50%, #071007 100%);
      font-family: 'Inter', sans-serif;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .grid-bg {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image:
        linear-gradient(rgba(57,255,20,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(57,255,20,0.03) 1px, transparent 1px);
      background-size: 80px 80px;
      pointer-events: none;
    }
    .top-bar {
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #39FF14, #22c55e, #16a34a);
      flex-shrink: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      padding: 48px 24px 64px;
      position: relative;
      z-index: 1;
    }
    .label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.35em;
      color: #39FF14;
      text-transform: uppercase;
      margin-bottom: 12px;
      text-align: center;
    }
    .headline {
      font-size: 36px;
      font-weight: 900;
      color: #fff;
      line-height: 1.1;
      text-align: center;
      margin-bottom: 8px;
    }
    .headline span { color: #39FF14; }
    .subheadline {
      font-size: 15px;
      font-weight: 400;
      color: #aaa;
      text-align: center;
      margin-bottom: 40px;
      line-height: 1.5;
    }
    .card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(57,255,20,0.15);
      padding: 32px;
    }
    .field { margin-bottom: 20px; }
    .field label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 8px;
    }
    .field input {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      padding: 12px 16px;
      outline: none;
      transition: border-color 0.2s;
    }
    .field input:focus { border-color: #39FF14; }
    .field input::placeholder { color: #555; }
    .field-error { font-size: 12px; color: #f87171; margin-top: 4px; }
    .btn-primary {
      width: 100%;
      background: #39FF14;
      color: #000;
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 700;
      padding: 14px;
      border: none;
      cursor: pointer;
      margin-top: 8px;
      animation: pulse-glow 2s infinite;
    }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(57,255,20,0.4); }
      50% { box-shadow: 0 0 20px 6px rgba(57,255,20,0.2); }
    }
    .dia-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
    }
    .dia-tab {
      flex: 1;
      padding: 10px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      color: #aaa;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
    }
    .dia-tab.active {
      background: rgba(57,255,20,0.1);
      border-color: #39FF14;
      color: #39FF14;
    }
    .slots-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 24px;
    }
    .slot-btn {
      padding: 10px 6px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      color: #ccc;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
    }
    .slot-btn:hover:not(:disabled) {
      border-color: rgba(57,255,20,0.5);
      color: #fff;
    }
    .slot-btn.selected {
      background: rgba(57,255,20,0.15);
      border-color: #39FF14;
      color: #39FF14;
    }
    .slot-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      text-decoration: line-through;
    }
    .slot-info {
      background: rgba(57,255,20,0.06);
      border: 1px solid rgba(57,255,20,0.2);
      padding: 14px 16px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #ccc;
    }
    .slot-info strong { color: #39FF14; }
    .success-icon {
      width: 64px;
      height: 64px;
      background: rgba(57,255,20,0.1);
      border: 2px solid #39FF14;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 28px;
    }
    .success-title {
      font-size: 28px;
      font-weight: 900;
      color: #fff;
      text-align: center;
      margin-bottom: 12px;
    }
    .success-desc {
      font-size: 15px;
      color: #aaa;
      text-align: center;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .back-btn {
      background: transparent;
      border: 1px solid rgba(57,255,20,0.3);
      color: #39FF14;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 20px;
      cursor: pointer;
      display: block;
      margin: 0 auto;
    }
    .step-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 32px;
    }
    .step-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
    }
    .step-dot.active { background: #39FF14; }
    .step-dot.done { background: rgba(57,255,20,0.4); }
  `;

  const slotSelecionadoObj = slots?.find(s => s.dataHora === slotSelecionado);

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="grid-bg" />
        <div className="top-bar" />
        <div className="container">
          <div className="label">Sessão Estratégica</div>
          <h1 className="headline">Agende sua <span>sessão</span></h1>
          <p className="subheadline">
            30 minutos para entender qual é o motor real do seu crescimento
            e o que fazer com isso.
          </p>

          <div className="step-indicator">
            <div className={`step-dot ${step === "form" ? "active" : "done"}`} />
            <div className={`step-dot ${step === "slots" ? "active" : step === "confirmado" ? "done" : ""}`} />
            <div className={`step-dot ${step === "confirmado" ? "active" : ""}`} />
          </div>

          {step === "form" && (
            <div className="card">
              <form onSubmit={handleFormSubmit}>
                <div className="field">
                  <label>Nome completo</label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                  />
                  {errors.nome && <div className="field-error">{errors.nome}</div>}
                </div>
                <div className="field">
                  <label>WhatsApp (com DDD)</label>
                  <input
                    type="tel"
                    placeholder="(61) 99999-9999"
                    value={form.whatsapp}
                    onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                  />
                  {errors.whatsapp && <div className="field-error">{errors.whatsapp}</div>}
                </div>
                <div className="field">
                  <label>E-mail</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                  {errors.email && <div className="field-error">{errors.email}</div>}
                </div>
                <div className="field">
                  <label>Empresa <span style={{ color: "#666", fontWeight: 400 }}>(opcional)</span></label>
                  <input
                    type="text"
                    placeholder="Nome da sua empresa"
                    value={form.empresa}
                    onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Ver horários disponíveis →
                </button>
              </form>
            </div>
          )}

          {step === "slots" && (
            <div className="card">
              {loadingSlots ? (
                <div style={{ textAlign: "center", color: "#39FF14", padding: "32px 0" }}>
                  Carregando horários...
                </div>
              ) : (
                <>
                  <div className="dia-tabs">
                    {dias.map(dia => (
                      <button
                        key={dia}
                        className={`dia-tab ${diaSelecionado === dia || (!diaSelecionado && dia === dias[0]) ? "active" : ""}`}
                        onClick={() => { setDiaSelecionado(dia); setSlotSelecionado(null); }}
                      >
                        {dia.split(",")[0]}
                        <br />
                        <span style={{ fontSize: "11px", fontWeight: 400 }}>{dia.split(", ")[1]}</span>
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const diaAtivo = diaSelecionado ?? dias[0];
                    const slotsAtivos = slotsPorDia[diaAtivo] ?? [];
                    return (
                      <div className="slots-grid">
                        {slotsAtivos.map(s => (
                          <button
                            key={s.dataHora}
                            className={`slot-btn ${slotSelecionado === s.dataHora ? "selected" : ""}`}
                            disabled={!s.disponivel}
                            onClick={() => setSlotSelecionado(s.dataHora)}
                          >
                            {s.hora}
                          </button>
                        ))}
                      </div>
                    );
                  })()}

                  {slotSelecionadoObj && (
                    <div className="slot-info">
                      Horário selecionado: <strong>{slotSelecionadoObj.diaSemana} às {slotSelecionadoObj.hora}</strong>
                    </div>
                  )}

                  <button
                    className="btn-primary"
                    onClick={handleConfirmar}
                    disabled={!slotSelecionado || criar.isPending}
                  >
                    {criar.isPending ? "Confirmando..." : "Confirmar agendamento →"}
                  </button>

                  <button
                    onClick={() => setStep("form")}
                    style={{ background: "transparent", border: "none", color: "#666", fontFamily: "Inter", fontSize: "13px", cursor: "pointer", width: "100%", marginTop: "12px", paddingTop: "8px" }}
                  >
                    ← Voltar
                  </button>
                </>
              )}
            </div>
          )}

          {step === "confirmado" && (
            <div className="card" style={{ textAlign: "center" }}>
              <div className="success-icon">✓</div>
              <div className="success-title">Sessão confirmada!</div>
              <p className="success-desc">
                {slotSelecionadoObj && (
                  <>
                    <strong style={{ color: "#39FF14" }}>
                      {slotSelecionadoObj.diaSemana} às {slotSelecionadoObj.hora}
                    </strong>
                    <br />
                  </>
                )}
                Você receberá uma confirmação no e-mail <strong style={{ color: "#fff" }}>{form.email}</strong>.
                <br /><br />
                Prepare-se para uma conversa direta sobre o motor de crescimento do seu negócio.
              </p>
              <button className="back-btn" onClick={() => window.location.href = "/"}>
                Voltar ao diagnóstico
              </button>
            </div>
          )}

          <p style={{ textAlign: "center", fontSize: "12px", color: "#444", marginTop: "24px" }}>
            Seus dados são usados apenas para o agendamento e não serão compartilhados.
          </p>
        </div>
      </div>
    </>
  );
}
