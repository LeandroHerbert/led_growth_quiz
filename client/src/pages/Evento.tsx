import { Calendar, Clock, MapPin, Users, CheckCircle, ArrowRight } from "lucide-react";

// ============================================================
// CONFIGURAÇÃO DO EVENTO — altere apenas esta seção a cada semana
// ============================================================
const EVENTO = {
  dia: "18",
  mesExtenso: "JUNHO",
  diaSemana: "QUINTA-FEIRA",
  horario: "14h",
  local: "Solo Ristorante",
  endereco: "Asa Sul — CLS 403, Bloco C, Loja 22",
  vagas: 30,
  linkCadastro: "#cadastro", // substitua pelo link do formulário quando disponível
};
// ============================================================

export default function Evento() {
  const handleCadastro = () => {
    if (EVENTO.linkCadastro && EVENTO.linkCadastro !== "#cadastro") {
      window.open(EVENTO.linkCadastro, "_blank");
    } else {
      // scroll suave para a seção de cadastro enquanto o link não está disponível
      document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        color: "#ffffff",
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "0",
        }}
      >
        {/* Glow de fundo */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(57,255,20,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "60px 24px 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Coluna esquerda — texto */}
          <div>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #39ff14",
                borderRadius: "4px",
                padding: "6px 14px",
                marginBottom: "32px",
              }}
            >
              <span style={{ color: "#39ff14", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>
                EVENTO PRESENCIAL · BRASÍLIA · GRATUITO
              </span>
            </div>

            {/* Título */}
            <h1
              style={{
                fontSize: "clamp(52px, 7vw, 88px)",
                fontWeight: 900,
                lineHeight: 0.9,
                margin: "0 0 24px",
                letterSpacing: "-2px",
              }}
            >
              <span style={{ color: "#ffffff" }}>LED</span>
              <br />
              <span style={{ color: "#39ff14" }}>GROWTH</span>
              <br />
              <span style={{ color: "#ffffff", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-1px" }}>
                MODELS
              </span>
            </h1>

            {/* Subtítulo */}
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "#cccccc",
                lineHeight: 1.6,
                margin: "0 0 16px",
                fontWeight: 400,
              }}
            >
              Descubra o modelo ideal de crescimento para o seu negócio.
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 16px)",
                color: "#888888",
                lineHeight: 1.7,
                margin: "0 0 40px",
              }}
            >
              Entenda qual é o motor predominante que impulsiona seu negócio
              e invista energia na direção certa.
            </p>

            {/* CTA principal */}
            <button
              onClick={handleCadastro}
              style={{
                background: "#39ff14",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "4px",
                padding: "18px 40px",
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "1px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textTransform: "uppercase",
                transition: "transform 0.15s, box-shadow 0.15s",
                boxShadow: "0 0 24px rgba(57,255,20,0.35)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(57,255,20,0.55)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(57,255,20,0.35)";
              }}
            >
              Garantir minha vaga
              <ArrowRight size={18} />
            </button>

            <p style={{ color: "#555", fontSize: "13px", marginTop: "12px" }}>
              Apenas {EVENTO.vagas} vagas · Entrada gratuita
            </p>
          </div>

          {/* Coluna direita — foto de Leandro */}
          <div style={{ position: "relative", textAlign: "center" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, rgba(57,255,20,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <img
              src="/manus-storage/ChatGPTImage8dejun.de202620_16_33_9e0edc0a.png"
              alt="Leandro Herbert — Estrategista"
              style={{
                width: "100%",
                maxWidth: "460px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
                filter: "drop-shadow(0 0 40px rgba(57,255,20,0.2))",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── DADOS DO EVENTO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
        <div
          style={{
            border: "1px solid #1a1a1a",
            borderRadius: "8px",
            background: "#0f0f0f",
            padding: "32px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="event-info-grid"
        >
          {/* Data */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <Calendar size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
            <div>
              <p style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Data</p>
              <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: "0", lineHeight: 1 }}>
                {EVENTO.dia}
              </p>
              <p style={{ color: "#39ff14", fontSize: "14px", fontWeight: 700, margin: "4px 0 0", letterSpacing: "1px" }}>
                {EVENTO.mesExtenso}
              </p>
              <p style={{ color: "#666", fontSize: "12px", margin: "2px 0 0" }}>{EVENTO.diaSemana}</p>
            </div>
          </div>

          {/* Horário */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", borderLeft: "1px solid #1a1a1a", paddingLeft: "24px" }}>
            <Clock size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
            <div>
              <p style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Horário</p>
              <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: "0", lineHeight: 1 }}>
                ÀS {EVENTO.horario}
              </p>
              <p style={{ color: "#666", fontSize: "12px", margin: "6px 0 0" }}>Pontualmente</p>
            </div>
          </div>

          {/* Local */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", borderLeft: "1px solid #1a1a1a", paddingLeft: "24px" }}>
            <MapPin size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
            <div>
              <p style={{ color: "#555", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Local</p>
              <p style={{ color: "#fff", fontSize: "20px", fontWeight: 800, margin: "0", lineHeight: 1.2 }}>
                {EVENTO.local}
              </p>
              <p style={{ color: "#39ff14", fontSize: "12px", margin: "4px 0 0" }}>{EVENTO.endereco}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── O QUE VOCÊ VAI ENCONTRAR ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 64px" }}>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 800,
            margin: "0 0 8px",
            color: "#fff",
          }}
        >
          O que acontece no evento
        </h2>
        <p style={{ color: "#666", fontSize: "15px", margin: "0 0 40px" }}>
          Uma conversa direta sobre como empresas crescem de verdade.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
          className="features-grid"
        >
          {[
            {
              titulo: "Diagnóstico ao vivo",
              desc: "Você vai identificar qual é o motor predominante que move o seu negócio hoje — e por que isso muda tudo na hora de tomar decisões.",
            },
            {
              titulo: "Clareza sobre crescimento",
              desc: "Entenda por que algumas estratégias funcionam para certos negócios e falham em outros. A resposta está no modelo, não na tática.",
            },
            {
              titulo: "Conversa entre empresários",
              desc: "Ambiente restrito, com no máximo 30 pessoas. Sem palco, sem plateia. Uma conversa real entre quem está no jogo.",
            },
            {
              titulo: "Direção para o próximo passo",
              desc: "Você sai sabendo onde investir energia — e onde parar de desperdiçar. Sem teorias, sem frameworks genéricos.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#0f0f0f",
                border: "1px solid #1a1a1a",
                borderRadius: "8px",
                padding: "28px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <CheckCircle size={22} color="#39ff14" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px", margin: "0 0 8px" }}>
                  {item.titulo}
                </p>
                <p style={{ color: "#777", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARA QUEM É ── */}
      <section
        style={{
          background: "#0f0f0f",
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 800,
              margin: "0 0 8px",
              color: "#fff",
            }}
          >
            Para quem é este evento
          </h2>
          <p style={{ color: "#666", fontSize: "15px", margin: "0 0 40px" }}>
            Se você se encaixa em algum desses perfis, este evento foi feito para você.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
            className="audience-grid"
          >
            {[
              "Fundadores e sócios que querem crescer com mais clareza e menos desperdício",
              "Empresários que sentem que estão trabalhando muito mas crescendo pouco",
              "Líderes que querem entender por que certas estratégias não funcionam no seu negócio",
            ].map((texto, i) => (
              <div
                key={i}
                style={{
                  borderLeft: "3px solid #39ff14",
                  paddingLeft: "20px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                <p style={{ color: "#ccc", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE LEANDRO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "40px",
            alignItems: "center",
          }}
          className="speaker-grid"
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "2px solid #39ff14",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src="/manus-storage/ChatGPTImage8dejun.de202620_16_33_9e0edc0a.png"
              alt="Leandro Herbert"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
          <div>
            <p style={{ color: "#39ff14", fontSize: "11px", letterSpacing: "2px", margin: "0 0 8px", textTransform: "uppercase" }}>
              Conteúdo com
            </p>
            <h3 style={{ color: "#fff", fontSize: "28px", fontWeight: 800, margin: "0 0 4px" }}>
              Leandro Herbert
            </h3>
            <p style={{ color: "#39ff14", fontSize: "13px", fontWeight: 600, margin: "0 0 16px", letterSpacing: "1px" }}>
              ESTRATEGISTA
            </p>
            <p style={{ color: "#888", fontSize: "15px", lineHeight: 1.7, margin: 0, maxWidth: "600px" }}>
              Empresário, escritor e conselheiro de empresas. Especialista em crescimento empresarial
              e estratégia para negócios que querem crescer com clareza e resultados. Já atuou em
              diferentes setores e modelos de negócio — e usa essa experiência para ajudar
              fundadores a encontrar o caminho certo para o crescimento.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        id="cta-section"
        style={{
          background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a0d 100%)",
          borderTop: "1px solid #1a2a1a",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(57,255,20,0.08)",
              border: "1px solid rgba(57,255,20,0.3)",
              borderRadius: "4px",
              padding: "6px 16px",
              marginBottom: "24px",
            }}
          >
            <Users size={14} color="#39ff14" />
            <span style={{ color: "#39ff14", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>
              APENAS {EVENTO.vagas} VAGAS
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 900,
              margin: "0 0 16px",
              lineHeight: 1.1,
            }}
          >
            Garanta sua vaga agora.
            <br />
            <span style={{ color: "#39ff14" }}>É gratuito.</span>
          </h2>

          <p style={{ color: "#777", fontSize: "16px", margin: "0 0 40px", lineHeight: 1.6 }}>
            {EVENTO.dia} de {EVENTO.mesExtenso} · {EVENTO.horario} · {EVENTO.local}, Brasília
          </p>

          <button
            onClick={handleCadastro}
            style={{
              background: "#39ff14",
              color: "#0a0a0a",
              border: "none",
              borderRadius: "4px",
              padding: "20px 56px",
              fontSize: "18px",
              fontWeight: 800,
              letterSpacing: "1px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              textTransform: "uppercase",
              boxShadow: "0 0 40px rgba(57,255,20,0.4)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(57,255,20,0.6)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(57,255,20,0.4)";
            }}
          >
            Quero participar
            <ArrowRight size={20} />
          </button>

          <p style={{ color: "#444", fontSize: "13px", marginTop: "16px" }}>
            Entrada gratuita · Vagas limitadas · Brasília
          </p>
        </div>
      </section>

      {/* ── RODAPÉ ── */}
      <footer
        style={{
          borderTop: "1px solid #1a1a1a",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#333", fontSize: "12px", margin: 0 }}>
          LED GROWTH MODELS · Evento presencial em Brasília
        </p>
      </footer>

      {/* Responsividade inline */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&display=swap');
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .event-info-grid { grid-template-columns: 1fr !important; }
          .event-info-grid > div { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #1a1a1a; padding-top: 20px; }
          .event-info-grid > div:first-child { border-top: none !important; padding-top: 0 !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .audience-grid { grid-template-columns: 1fr !important; }
          .speaker-grid { grid-template-columns: 1fr !important; text-align: center; }
        }
      `}</style>
    </div>
  );
}
