import { useState } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface InscricaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventoData?: string;
}

function formatWhatsApp(value: string): string {
  // Remove tudo que não for dígito
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function InscricaoModal({ isOpen, onClose, eventoData }: InscricaoModalProps) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sucesso, setSucesso] = useState(false);

  const GRUPO_WHATSAPP = "https://chat.whatsapp.com/IsS6G36GB0r3hN6TLawFSQ?mode=gi_t";

  const inscrever = trpc.leads.inscrever.useMutation({
    onSuccess: () => {
      setSucesso(true);
      // Redireciona automaticamente após 1.5s
      setTimeout(() => {
        window.open(GRUPO_WHATSAPP, "_blank");
      }, 1500);
    },
    onError: (err) => {
      setErrors({ geral: err.message || "Erro ao realizar inscrição. Tente novamente." });
    },
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nome.trim() || nome.trim().length < 2) errs.nome = "Informe seu nome completo";
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10) errs.whatsapp = "Informe um WhatsApp válido com DDD";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Informe um e-mail válido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    inscrever.mutate({
      nome: nome.trim(),
      whatsapp: whatsapp.replace(/\D/g, ""),
      email: email.trim().toLowerCase(),
      eventoData: eventoData ?? "18/06/2026",
    });
  };

  const handleClose = () => {
    if (!inscrever.isPending) {
      setNome(""); setWhatsapp(""); setEmail("");
      setErrors({}); setSucesso(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0f0f0f",
          border: "1px solid #2a2a2a",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "460px",
          padding: "40px 36px",
          position: "relative",
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        }}
      >
        {/* Fechar */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "none", border: "none", cursor: "pointer",
            color: "#666", padding: "4px",
          }}
        >
          <X size={20} />
        </button>

        {sucesso ? (
          /* ── TELA DE SUCESSO ── */
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <CheckCircle2 size={52} color="#39ff14" style={{ margin: "0 auto 20px" }} />
            <h2 style={{
              color: "#fff", fontSize: "24px", fontWeight: 800,
              margin: "0 0 16px", lineHeight: 1.2,
            }}>
              Inscrição confirmada!
            </h2>
            <p style={{ color: "#dddddd", fontSize: "15px", lineHeight: 1.7, margin: "0 0 24px" }}>
              Você está sendo direcionado para o grupo exclusivo de participantes no WhatsApp...
            </p>
            <a
              href={GRUPO_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#39ff14", color: "#0a0a0a", border: "none",
                borderRadius: "4px", padding: "14px 36px",
                fontSize: "15px", fontWeight: 800, cursor: "pointer",
                letterSpacing: "0.5px", textDecoration: "none",
              }}
            >
              Entrar no grupo agora
            </a>
          </div>
        ) : (
          /* ── FORMULÁRIO ── */
          <>
            <div style={{ marginBottom: "28px" }}>
              <span style={{
                color: "#39ff14", fontSize: "11px", fontWeight: 700,
                letterSpacing: "2px", display: "block", marginBottom: "8px",
              }}>
                GARANTA SUA VAGA
              </span>
              <h2 style={{
                color: "#fff", fontSize: "22px", fontWeight: 800,
                margin: "0 0 6px", lineHeight: 1.2,
              }}>
                Inscrição gratuita
              </h2>
              <p style={{ color: "#aaaaaa", fontSize: "13px", margin: 0 }}>
                Apenas {/* vagas */} 30 vagas disponíveis. Preencha para reservar a sua.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Nome */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ color: "#cccccc", fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "6px", letterSpacing: "0.5px" }}>
                  NOME COMPLETO
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => { setNome(e.target.value); setErrors(p => ({ ...p, nome: "" })); }}
                  placeholder="Seu nome"
                  style={{
                    width: "100%", background: "#1a1a1a", border: `1px solid ${errors.nome ? "#ff4444" : "#333"}`,
                    borderRadius: "4px", padding: "12px 14px", color: "#fff",
                    fontSize: "15px", outline: "none", boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
                {errors.nome && <p style={{ color: "#ff6666", fontSize: "12px", margin: "4px 0 0" }}>{errors.nome}</p>}
              </div>

              {/* WhatsApp */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ color: "#cccccc", fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "6px", letterSpacing: "0.5px" }}>
                  WHATSAPP
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => { setWhatsapp(formatWhatsApp(e.target.value)); setErrors(p => ({ ...p, whatsapp: "" })); }}
                  placeholder="(61) 99999-9999"
                  style={{
                    width: "100%", background: "#1a1a1a", border: `1px solid ${errors.whatsapp ? "#ff4444" : "#333"}`,
                    borderRadius: "4px", padding: "12px 14px", color: "#fff",
                    fontSize: "15px", outline: "none", boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
                {errors.whatsapp && <p style={{ color: "#ff6666", fontSize: "12px", margin: "4px 0 0" }}>{errors.whatsapp}</p>}
              </div>

              {/* E-mail */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ color: "#cccccc", fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "6px", letterSpacing: "0.5px" }}>
                  E-MAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                  placeholder="seu@email.com"
                  style={{
                    width: "100%", background: "#1a1a1a", border: `1px solid ${errors.email ? "#ff4444" : "#333"}`,
                    borderRadius: "4px", padding: "12px 14px", color: "#fff",
                    fontSize: "15px", outline: "none", boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
                {errors.email && <p style={{ color: "#ff6666", fontSize: "12px", margin: "4px 0 0" }}>{errors.email}</p>}
              </div>

              {errors.geral && (
                <p style={{ color: "#ff6666", fontSize: "13px", margin: "0 0 16px", textAlign: "center" }}>{errors.geral}</p>
              )}

              <button
                type="submit"
                disabled={inscrever.isPending}
                style={{
                  width: "100%", background: inscrever.isPending ? "#2a5a10" : "#39ff14",
                  color: "#0a0a0a", border: "none", borderRadius: "4px",
                  padding: "16px", fontSize: "16px", fontWeight: 800,
                  cursor: inscrever.isPending ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "8px", letterSpacing: "0.5px", textTransform: "uppercase",
                  transition: "background 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {inscrever.isPending ? "Enviando..." : (
                  <>Confirmar inscrição <ArrowRight size={16} /></>
                )}
              </button>

              <p style={{ color: "#555", fontSize: "11px", textAlign: "center", margin: "12px 0 0" }}>
                Seus dados são usados apenas para confirmar sua vaga.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
