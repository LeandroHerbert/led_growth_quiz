import { useEffect, useRef } from "react";
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

// Hook para animação de entrada ao rolar
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Pequeno delay para garantir que o DOM está pronto
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        },
        { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
      );
      observer.observe(el);
      // Cleanup
      (el as any).__observer = observer;
    }, 50);
    return () => {
      clearTimeout(timer);
      (el as any).__observer?.disconnect();
    };
  }, []);
  return ref;
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal-hidden');
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.remove('reveal-hidden');
            el.classList.add('reveal-visible');
            observer.unobserve(el);
          }
        },
        { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
      );
      observer.observe(el);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Evento() {
  const handleCadastro = () => {
    if (EVENTO.linkCadastro && EVENTO.linkCadastro !== "#cadastro") {
      window.open(EVENTO.linkCadastro, "_blank");
    } else {
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
      {/* ── ESTILOS GLOBAIS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&display=swap');

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 24px rgba(57,255,20,0.4); transform: scale(1); }
          50% { box-shadow: 0 0 50px rgba(57,255,20,0.75); transform: scale(1.03); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-pulse {
          animation: pulse-glow 2.2s ease-in-out infinite;
        }

        .btn-pulse:hover {
          animation: none;
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 0 60px rgba(57,255,20,0.7) !important;
        }

        .hero-badge { animation: fadeInDown 0.8s ease forwards; }
        .hero-title { animation: fadeInUp 0.9s ease 0.1s both; }
        .hero-sub { animation: fadeInUp 0.9s ease 0.25s both; }
        .hero-cta { animation: fadeInUp 0.9s ease 0.4s both; }

        .reveal-hidden {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        @media (max-width: 768px) {
          .event-info-grid { grid-template-columns: 1fr !important; }
          .event-info-grid > div { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #222 !important; padding-top: 20px !important; }
          .event-info-grid > div:first-child { border-top: none !important; padding-top: 0 !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .audience-grid { grid-template-columns: 1fr !important; }
          .speaker-grid { grid-template-columns: 1fr !important; text-align: center; }
        }
      `}</style>

      {/* ── HERO — fundo com foto palestrando ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Imagem de fundo — palestrando */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(/manus-storage/OficinaHighTicketSoftown040625-78_a3c980f5.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: 0.18,
            zIndex: 0,
          }}
        />
        {/* Overlay escuro para garantir legibilidade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 60%, rgba(10,10,10,0.85) 100%)",
            zIndex: 1,
          }}
        />
        {/* Glow verde */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(57,255,20,0.1) 0%, transparent 70%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "900px",
            margin: "0 auto",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            className="hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #39ff14",
              borderRadius: "4px",
              padding: "6px 16px",
              marginBottom: "36px",
            }}
          >
            <span style={{ color: "#39ff14", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>
              EVENTO PRESENCIAL · BRASÍLIA · GRATUITO
            </span>
          </div>

          {/* Título */}
          <h1
            className="hero-title"
            style={{
              fontSize: "clamp(64px, 10vw, 120px)",
              fontWeight: 900,
              lineHeight: 0.88,
              margin: "0 0 28px",
              letterSpacing: "-3px",
            }}
          >
            <span style={{ color: "#ffffff" }}>LED</span>
            <br />
            <span style={{ color: "#39ff14" }}>GROWTH</span>
            <br />
            <span style={{ color: "#ffffff", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-1px" }}>
              MODELS
            </span>
          </h1>

          {/* Subtítulo */}
          <p
            className="hero-sub"
            style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              color: "#ffffff",
              lineHeight: 1.5,
              margin: "0 auto 12px",
              fontWeight: 500,
              maxWidth: "620px",
            }}
          >
            Descubra o modelo ideal de crescimento para o seu negócio.
          </p>
          <p
            className="hero-sub"
            style={{
              fontSize: "clamp(14px, 1.8vw, 17px)",
              color: "#cccccc",
              lineHeight: 1.7,
              margin: "0 auto 48px",
              maxWidth: "520px",
            }}
          >
            Entenda qual é o motor predominante que impulsiona seu negócio
            e invista energia na direção certa.
          </p>

          {/* CTA */}
          <div className="hero-cta">
            <button
              onClick={handleCadastro}
              className="btn-pulse"
              style={{
                background: "#39ff14",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "4px",
                padding: "20px 52px",
                fontSize: "17px",
                fontWeight: 800,
                letterSpacing: "1px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textTransform: "uppercase",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
            >
              Garantir minha vaga
              <ArrowRight size={18} />
            </button>
            <p style={{ color: "#aaaaaa", fontSize: "13px", marginTop: "14px" }}>
              Apenas {EVENTO.vagas} vagas · Entrada gratuita
            </p>
          </div>
        </div>
      </section>

      {/* ── DADOS DO EVENTO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
        <RevealSection>
          <div
            className="event-info-grid"
            style={{
              border: "1px solid #222",
              borderRadius: "8px",
              background: "#0f0f0f",
              padding: "32px 40px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {/* Data */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <Calendar size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
              <div>
                <p style={{ color: "#aaaaaa", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Data</p>
                <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: "0", lineHeight: 1 }}>{EVENTO.dia}</p>
                <p style={{ color: "#39ff14", fontSize: "14px", fontWeight: 700, margin: "4px 0 0", letterSpacing: "1px" }}>{EVENTO.mesExtenso}</p>
                <p style={{ color: "#aaaaaa", fontSize: "12px", margin: "2px 0 0" }}>{EVENTO.diaSemana}</p>
              </div>
            </div>

            {/* Horário */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", borderLeft: "1px solid #222", paddingLeft: "24px" }}>
              <Clock size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
              <div>
                <p style={{ color: "#aaaaaa", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Horário</p>
                <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: "0", lineHeight: 1 }}>ÀS {EVENTO.horario}</p>
                <p style={{ color: "#aaaaaa", fontSize: "12px", margin: "6px 0 0" }}>Pontualmente</p>
              </div>
            </div>

            {/* Local */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", borderLeft: "1px solid #222", paddingLeft: "24px" }}>
              <MapPin size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
              <div>
                <p style={{ color: "#aaaaaa", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Local</p>
                <p style={{ color: "#fff", fontSize: "20px", fontWeight: 800, margin: "0", lineHeight: 1.2 }}>{EVENTO.local}</p>
                <p style={{ color: "#39ff14", fontSize: "12px", margin: "4px 0 0" }}>{EVENTO.endereco}</p>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── O QUE ACONTECE ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 64px" }}>
        <RevealSection>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>
            O que acontece no evento
          </h2>
          <p style={{ color: "#bbbbbb", fontSize: "15px", margin: "0 0 40px" }}>
            Uma conversa direta sobre como empresas crescem de verdade.
          </p>
        </RevealSection>

        <div
          className="features-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}
        >
          {[
            {
              titulo: "Diagnóstico ao vivo",
              desc: "Você vai identificar qual é o motor predominante que move o seu negócio hoje — e por que isso muda tudo na hora de tomar decisões.",
              delay: 0,
            },
            {
              titulo: "Clareza sobre crescimento",
              desc: "Entenda por que algumas estratégias funcionam para certos negócios e falham em outros. A resposta está no modelo, não na tática.",
              delay: 100,
            },
            {
              titulo: "Conversa entre empresários",
              desc: "Ambiente restrito, com no máximo 30 pessoas. Sem palco, sem plateia. Uma conversa real entre quem está no jogo.",
              delay: 200,
            },
            {
              titulo: "Direção para o próximo passo",
              desc: "Você sai sabendo onde investir energia — e onde parar de desperdiçar. Sem teorias, sem frameworks genéricos.",
              delay: 300,
            },
          ].map((item, i) => (
            <RevealSection key={i} delay={item.delay}>
              <div
                style={{
                  background: "#0f0f0f",
                  border: "1px solid #222",
                  borderRadius: "8px",
                  padding: "28px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  height: "100%",
                }}
              >
                <CheckCircle size={22} color="#39ff14" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px", margin: "0 0 8px" }}>{item.titulo}</p>
                  <p style={{ color: "#cccccc", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            </RevealSection>
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
          <RevealSection>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>
              Para quem é este evento
            </h2>
            <p style={{ color: "#bbbbbb", fontSize: "15px", margin: "0 0 40px" }}>
              Se você se encaixa em algum desses perfis, este evento foi feito para você.
            </p>
          </RevealSection>

          <div
            className="audience-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}
          >
            {[
              "Fundadores e sócios que querem crescer com mais clareza e menos desperdício",
              "Empresários que sentem que estão trabalhando muito mas crescendo pouco",
              "Líderes que querem entender por que certas estratégias não funcionam no seu negócio",
            ].map((texto, i) => (
              <RevealSection key={i} delay={i * 120}>
                <div
                  style={{
                    borderLeft: "3px solid #39ff14",
                    paddingLeft: "20px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                  }}
                >
                  <p style={{ color: "#ffffff", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{texto}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE LEANDRO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px" }}>
        <RevealSection>
          <div
            className="speaker-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {/* Foto do palestrante */}
            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                border: "2px solid #39ff14",
                boxShadow: "0 0 32px rgba(57,255,20,0.15)",
              }}
            >
              <img
                src="/manus-storage/IMG_4819_e6c7de00.jpg"
                alt="Leandro Herbert"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>

            {/* Texto */}
            <div>
              <p style={{ color: "#39ff14", fontSize: "11px", letterSpacing: "2px", margin: "0 0 8px", textTransform: "uppercase" }}>
                Conteúdo com
              </p>
              <h3 style={{ color: "#fff", fontSize: "36px", fontWeight: 900, margin: "0 0 4px", letterSpacing: "-1px" }}>
                Leandro Herbert
              </h3>
              <p style={{ color: "#39ff14", fontSize: "13px", fontWeight: 700, margin: "0 0 20px", letterSpacing: "2px" }}>
                ESTRATEGISTA
              </p>
              <p style={{ color: "#ffffff", fontSize: "16px", lineHeight: 1.75, margin: "0 0 16px", maxWidth: "560px" }}>
                Empresário, escritor e conselheiro de empresas. Especialista em crescimento empresarial
                e estratégia para negócios que querem crescer com clareza e resultados.
              </p>
              <p style={{ color: "#cccccc", fontSize: "15px", lineHeight: 1.7, margin: 0, maxWidth: "560px" }}>
                Já atuou em diferentes setores e modelos de negócio — e usa essa experiência para ajudar
                fundadores a encontrar o caminho certo para o crescimento, sem desperdício de energia.
              </p>
            </div>
          </div>
        </RevealSection>
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
        <RevealSection>
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
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 900,
                margin: "0 0 16px",
                lineHeight: 1.1,
                color: "#fff",
              }}
            >
              Garanta sua vaga agora.
              <br />
              <span style={{ color: "#39ff14" }}>É gratuito.</span>
            </h2>

            <p style={{ color: "#bbbbbb", fontSize: "16px", margin: "0 0 40px", lineHeight: 1.6 }}>
              {EVENTO.dia} de {EVENTO.mesExtenso} · {EVENTO.horario} · {EVENTO.local}, Brasília
            </p>

            <button
              onClick={handleCadastro}
              className="btn-pulse"
              style={{
                background: "#39ff14",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "4px",
                padding: "22px 60px",
                fontSize: "18px",
                fontWeight: 800,
                letterSpacing: "1px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                textTransform: "uppercase",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
            >
              Quero participar
              <ArrowRight size={20} />
            </button>

            <p style={{ color: "#888888", fontSize: "13px", marginTop: "16px" }}>
              Entrada gratuita · Vagas limitadas · Brasília
            </p>
          </div>
        </RevealSection>
      </section>

      {/* ── RODAPÉ ── */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "24px", textAlign: "center" }}>
        <p style={{ color: "#444", fontSize: "12px", margin: 0 }}>
          LED GROWTH MODELS · Evento presencial em Brasília
        </p>
      </footer>
    </div>
  );
}
