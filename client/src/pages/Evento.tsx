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

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal-hidden");
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.remove("reveal-hidden");
            el.classList.add("reveal-visible");
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
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}>
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
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Space Grotesk', 'Inter', sans-serif", color: "#ffffff" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&display=swap');

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 24px rgba(57,255,20,0.45); transform: scale(1); }
          50% { box-shadow: 0 0 52px rgba(57,255,20,0.8); transform: scale(1.03); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .btn-pulse { animation: pulse-glow 2.2s ease-in-out infinite; }
        .btn-pulse:hover {
          animation: none;
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 0 64px rgba(57,255,20,0.75) !important;
        }

        .hero-badge { animation: fadeInDown 0.8s ease forwards; }
        .hero-title { animation: fadeInUp 0.9s ease 0.1s both; }
        .hero-sub   { animation: fadeInUp 0.9s ease 0.25s both; }
        .hero-cta   { animation: fadeInUp 0.9s ease 0.4s both; }

        .reveal-hidden  { opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0);    transition: opacity 0.7s ease, transform 0.7s ease; }

        @media (max-width: 768px) {
          .event-info-grid { grid-template-columns: 1fr !important; }
          .event-info-grid > div { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #222 !important; padding-top: 20px !important; }
          .event-info-grid > div:first-child { border-top: none !important; padding-top: 0 !important; }
          .features-grid  { grid-template-columns: 1fr !important; }
          .audience-grid  { grid-template-columns: 1fr !important; }
          .speaker-grid   { grid-template-columns: 1fr !important; text-align: center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>

        {/* Imagem de fundo — visível, mas sem disputar com o texto */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(/manus-storage/OficinaHighTicketSoftown040625-78_a3c980f5.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.45,
          zIndex: 0,
        }} />

        {/* Overlay em gradiente: mais escuro onde está o texto (esquerda/centro), mais aberto à direita */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.72) 50%, rgba(10,10,10,0.55) 100%)",
          zIndex: 1,
        }} />
        {/* Gradiente vertical: escurece o topo e a base para ancorar o conteúdo */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 25%, transparent 75%, rgba(10,10,10,0.7) 100%)",
          zIndex: 1,
        }} />

        {/* Glow verde sutil */}
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "480px", height: "480px",
          background: "radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)",
          zIndex: 1, pointerEvents: "none",
        }} />

        {/* Conteúdo */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>

          {/* Badge */}
          <div className="hero-badge" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid #39ff14", borderRadius: "4px",
            padding: "6px 16px", marginBottom: "36px",
          }}>
            <span style={{ color: "#39ff14", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>
              EVENTO PRESENCIAL · BRASÍLIA · GRATUITO
            </span>
          </div>

          {/* Título */}
          <h1 className="hero-title" style={{
            fontSize: "clamp(64px, 10vw, 116px)", fontWeight: 900,
            lineHeight: 0.88, margin: "0 0 32px", letterSpacing: "-3px",
          }}>
            <span style={{ color: "#ffffff" }}>LED</span><br />
            <span style={{ color: "#39ff14" }}>GROWTH</span><br />
            <span style={{ color: "#ffffff", fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 700, letterSpacing: "-1px" }}>
              MODELS
            </span>
          </h1>

          {/* Headline */}
          <p className="hero-sub" style={{
            fontSize: "clamp(19px, 2.5vw, 25px)", color: "#ffffff",
            lineHeight: 1.45, margin: "0 auto 14px", fontWeight: 600,
            maxWidth: "600px",
          }}>
            A maioria das empresas cresce devagar porque investe energia no lugar errado.
          </p>

          {/* Subheadline */}
          <p className="hero-sub" style={{
            fontSize: "clamp(14px, 1.8vw, 17px)", color: "#e0e0e0",
            lineHeight: 1.75, margin: "0 auto 48px", maxWidth: "500px",
          }}>
            Neste encontro, você descobre qual é o motor real do seu negócio
            — e o que fazer com isso.
          </p>

          {/* CTA */}
          <div className="hero-cta">
            <button onClick={handleCadastro} className="btn-pulse" style={{
              background: "#39ff14", color: "#0a0a0a", border: "none",
              borderRadius: "4px", padding: "20px 52px",
              fontSize: "17px", fontWeight: 800, letterSpacing: "1px",
              cursor: "pointer", display: "inline-flex", alignItems: "center",
              gap: "10px", textTransform: "uppercase",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}>
              Garantir minha vaga
              <ArrowRight size={18} />
            </button>
            <p style={{ color: "#cccccc", fontSize: "13px", marginTop: "14px" }}>
              {EVENTO.vagas} vagas · Entrada gratuita · Brasília
            </p>
          </div>
        </div>
      </section>

      {/* ── DADOS DO EVENTO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
        <RevealSection>
          <div className="event-info-grid" style={{
            border: "1px solid #222", borderRadius: "8px",
            background: "#0f0f0f", padding: "32px 40px",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px",
          }}>
            {/* Data */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <Calendar size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
              <div>
                <p style={{ color: "#aaaaaa", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Data</p>
                <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: "0", lineHeight: 1 }}>{EVENTO.dia}</p>
                <p style={{ color: "#39ff14", fontSize: "14px", fontWeight: 700, margin: "4px 0 0", letterSpacing: "1px" }}>{EVENTO.mesExtenso}</p>
                <p style={{ color: "#bbbbbb", fontSize: "12px", margin: "2px 0 0" }}>{EVENTO.diaSemana}</p>
              </div>
            </div>

            {/* Horário */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", borderLeft: "1px solid #222", paddingLeft: "24px" }}>
              <Clock size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
              <div>
                <p style={{ color: "#aaaaaa", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Horário</p>
                <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: "0", lineHeight: 1 }}>ÀS {EVENTO.horario}</p>
                <p style={{ color: "#bbbbbb", fontSize: "12px", margin: "6px 0 0" }}>Pontualmente</p>
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
          <p style={{ color: "#dddddd", fontSize: "15px", margin: "0 0 40px" }}>
            Três horas de conversa densa, sem enrolação.
          </p>
        </RevealSection>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            {
              titulo: "Diagnóstico ao vivo",
              desc: "Você identifica qual é o motor que realmente move o seu negócio — não o que você acha, o que os dados mostram.",
              delay: 0,
            },
            {
              titulo: "Por que sua estratégia pode estar errada",
              desc: "Cada modelo de crescimento exige uma estratégia diferente. Aplicar a estratégia certa no modelo errado é o motivo mais comum de estagnação.",
              delay: 100,
            },
            {
              titulo: "Ambiente de 30 pessoas",
              desc: "Sem palco, sem plateia. Um grupo pequeno de empresários que estão no mesmo jogo — e que têm as mesmas perguntas que você.",
              delay: 200,
            },
            {
              titulo: "Você sai com clareza, não com tarefas",
              desc: "A saída não é uma lista de ações genéricas. É entender onde concentrar energia para crescer com menos desperdício.",
              delay: 300,
            },
          ].map((item, i) => (
            <RevealSection key={i} delay={item.delay}>
              <div style={{
                background: "#0f0f0f", border: "1px solid #222",
                borderRadius: "8px", padding: "28px",
                display: "flex", gap: "16px", alignItems: "flex-start", height: "100%",
              }}>
                <CheckCircle size={22} color="#39ff14" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px", margin: "0 0 8px" }}>{item.titulo}</p>
                  <p style={{ color: "#dddddd", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── PARA QUEM É ── */}
      <section style={{ background: "#0f0f0f", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <RevealSection>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>
              Para quem é este evento
            </h2>
            <p style={{ color: "#dddddd", fontSize: "15px", margin: "0 0 40px" }}>
              Se você reconhece algum desses cenários, este encontro é para você.
            </p>
          </RevealSection>

          <div className="audience-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              {
                titulo: "Você cresce, mas não sabe exatamente por quê",
                desc: "E por isso fica difícil repetir o resultado ou escalar com consistência.",
                delay: 0,
              },
              {
                titulo: "Você trabalha muito e o crescimento não acompanha",
                desc: "A sensação de que falta uma alavanca — não mais esforço.",
                delay: 120,
              },
              {
                titulo: "Você testa estratégias que funcionam para outros, mas não para você",
                desc: "Porque o modelo de crescimento do seu negócio é diferente.",
                delay: 240,
              },
            ].map((item, i) => (
              <RevealSection key={i} delay={item.delay}>
                <div style={{ borderLeft: "3px solid #39ff14", paddingLeft: "20px" }}>
                  <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "15px", lineHeight: 1.4, margin: "0 0 8px" }}>{item.titulo}</p>
                  <p style={{ color: "#dddddd", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE LEANDRO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px" }}>
        <RevealSection>
          <div className="speaker-grid" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "48px", alignItems: "center" }}>
            {/* Foto */}
            <div style={{ borderRadius: "8px", overflow: "hidden", border: "2px solid #39ff14", boxShadow: "0 0 32px rgba(57,255,20,0.15)" }}>
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
              <p style={{ color: "#39ff14", fontSize: "12px", fontWeight: 700, margin: "0 0 20px", letterSpacing: "2px" }}>
                ESTRATEGISTA
              </p>
              <p style={{ color: "#ffffff", fontSize: "16px", lineHeight: 1.75, margin: "0 0 14px", maxWidth: "540px" }}>
                Empresário, escritor e conselheiro de empresas. Trabalha com estratégia de crescimento para negócios que querem escalar com clareza — não com sorte.
              </p>
              <p style={{ color: "#dddddd", fontSize: "15px", lineHeight: 1.7, margin: 0, maxWidth: "540px" }}>
                Já atuou em diferentes setores e modelos de negócio. Usa essa experiência para ajudar fundadores a parar de crescer no escuro e começar a crescer com método.
              </p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="cta-section" style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a0d 100%)",
        borderTop: "1px solid #1a2a1a", padding: "80px 24px", textAlign: "center",
      }}>
        <RevealSection>
          <div style={{ maxWidth: "580px", margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.3)",
              borderRadius: "4px", padding: "6px 16px", marginBottom: "24px",
            }}>
              <Users size={14} color="#39ff14" />
              <span style={{ color: "#39ff14", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>
                APENAS {EVENTO.vagas} VAGAS
              </span>
            </div>

            <h2 style={{ fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, color: "#fff" }}>
              Garanta sua vaga agora.{" "}
              <span style={{ color: "#39ff14" }}>É gratuito.</span>
            </h2>

            <p style={{ color: "#dddddd", fontSize: "16px", margin: "0 0 40px", lineHeight: 1.6 }}>
              {EVENTO.dia} de {EVENTO.mesExtenso} · {EVENTO.horario} · {EVENTO.local}, Brasília
            </p>

            <button onClick={handleCadastro} className="btn-pulse" style={{
              background: "#39ff14", color: "#0a0a0a", border: "none",
              borderRadius: "4px", padding: "22px 60px",
              fontSize: "18px", fontWeight: 800, letterSpacing: "1px",
              cursor: "pointer", display: "inline-flex", alignItems: "center",
              gap: "12px", textTransform: "uppercase",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}>
              Quero participar
              <ArrowRight size={20} />
            </button>

            <p style={{ color: "#bbbbbb", fontSize: "13px", marginTop: "16px" }}>
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
