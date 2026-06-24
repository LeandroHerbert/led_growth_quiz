import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, MapPin, Users, ArrowRight, ChevronRight } from "lucide-react";
import { InscricaoModal } from "@/components/InscricaoModal";

// ============================================================
// CONFIGURAÇÃO DO EVENTO — altere apenas esta seção a cada semana
// ============================================================
const EVENTO = {
  dia: "25",
  mesExtenso: "JUNHO",
  diaSemana: "QUINTA-FEIRA",
  horario: "14h",
  local: "Espaço RC",
  endereco: "Bonaparte Hotel — Setor Hoteleiro Sul, Brasília",
  vagas: 30,
  linkCadastro: "https://profplay.com.br/evento/led-growth-models-53-57-95",
};
// ============================================================

const PERGUNTAS = [
  "Como você conquistou seus primeiros clientes?",
  "Se precisasse crescer 3x em 12 meses, o que faria primeiro?",
  "Quanto tempo leva para alguém virar cliente?",
  "O que mais influencia um cliente a comprar de você?",
  "Se você saísse do negócio por 3 meses, o que aconteceria?",
  "Qual é sua principal fonte de novos clientes hoje?",
];

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
  const [modalAberto, setModalAberto] = useState(false);

  const handleCadastro = () => {
    if (EVENTO.linkCadastro && EVENTO.linkCadastro !== "#cadastro") {
      window.open(EVENTO.linkCadastro, "_blank");
    } else {
      setModalAberto(true);
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
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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

        .ticker-track { display: flex; animation: ticker 28s linear infinite; width: max-content; }
        .ticker-track:hover { animation-play-state: paused; }

        .pergunta-card {
          background: #0f0f0f;
          border: 1px solid #222;
          padding: 24px 28px;
          position: relative;
          transition: border-color 0.2s, background 0.2s;
          cursor: default;
        }
        .pergunta-card:hover {
          border-color: rgba(57,255,20,0.4);
          background: #111;
        }
        .pergunta-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: #39ff14;
        }

        @media (max-width: 768px) {
          .event-info-grid { grid-template-columns: 1fr !important; }
          .event-info-grid > div { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #222 !important; padding-top: 20px !important; }
          .event-info-grid > div:first-child { border-top: none !important; padding-top: 0 !important; }
          .features-grid  { grid-template-columns: 1fr !important; }
          .audience-grid  { grid-template-columns: 1fr !important; }
          .speaker-grid   { grid-template-columns: 1fr !important; text-align: center; }
          .perguntas-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>

        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(/manus-storage/OficinaHighTicketSoftown040625-78_a3c980f5.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.4,
          zIndex: 0,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 55%, rgba(10,10,10,0.55) 100%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 25%, transparent 75%, rgba(10,10,10,0.7) 100%)",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "480px", height: "480px",
          background: "radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 70%)",
          zIndex: 1, pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>

          <div className="hero-badge" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid #39ff14",
            padding: "6px 16px", marginBottom: "36px",
          }}>
            <span style={{ color: "#39ff14", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>
              EVENTO PRESENCIAL · BRASÍLIA · GRATUITO
            </span>
          </div>

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

          <p className="hero-sub" style={{
            fontSize: "clamp(19px, 2.5vw, 26px)", color: "#ffffff",
            lineHeight: 1.4, margin: "0 auto 16px", fontWeight: 700,
            maxWidth: "640px",
          }}>
            O palco do outro não funciona para o seu bastidor.
          </p>

          <p className="hero-sub" style={{
            fontSize: "clamp(14px, 1.8vw, 18px)", color: "#dddddd",
            lineHeight: 1.75, margin: "0 auto 48px", maxWidth: "520px",
          }}>
            Cada negócio tem um motor de crescimento. Quando você descobre o seu,
            tudo — pessoas, gestão, marketing e vendas — passa a apontar para o mesmo lugar.
          </p>

          <div className="hero-cta">
            <button onClick={handleCadastro} className="btn-pulse" style={{
              background: "#39ff14", color: "#0a0a0a", border: "none",
              padding: "20px 52px",
              fontSize: "17px", fontWeight: 800, letterSpacing: "1px",
              cursor: "pointer", display: "inline-flex", alignItems: "center",
              gap: "10px", textTransform: "uppercase",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}>
              Garantir minha vaga
              <ArrowRight size={18} />
            </button>
            <p style={{ color: "#cccccc", fontSize: "13px", marginTop: "14px" }}>
              {EVENTO.vagas} vagas gratuitas · {EVENTO.dia} de {EVENTO.mesExtenso} · {EVENTO.local}
            </p>
          </div>
        </div>
      </section>

      {/* ── DADOS DO EVENTO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
        <RevealSection>
          <div className="event-info-grid" style={{
            border: "1px solid #222",
            background: "#0f0f0f", padding: "32px 40px",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <Calendar size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
              <div>
                <p style={{ color: "#aaaaaa", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Data</p>
                <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: "0", lineHeight: 1 }}>{EVENTO.dia}</p>
                <p style={{ color: "#39ff14", fontSize: "14px", fontWeight: 700, margin: "4px 0 0", letterSpacing: "1px" }}>{EVENTO.mesExtenso} 2026</p>
                <p style={{ color: "#bbbbbb", fontSize: "12px", margin: "2px 0 0" }}>{EVENTO.diaSemana}</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", borderLeft: "1px solid #222", paddingLeft: "24px" }}>
              <Clock size={28} color="#39ff14" style={{ flexShrink: 0, marginTop: "4px" }} />
              <div>
                <p style={{ color: "#aaaaaa", fontSize: "11px", letterSpacing: "2px", margin: "0 0 4px", textTransform: "uppercase" }}>Horário</p>
                <p style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: "0", lineHeight: 1 }}>ÀS {EVENTO.horario}</p>
                <p style={{ color: "#bbbbbb", fontSize: "12px", margin: "6px 0 0" }}>Pontualmente</p>
              </div>
            </div>

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

      {/* ── POR QUE ISSO IMPORTA ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 72px" }}>
        <RevealSection>
          <p style={{ color: "#39ff14", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 16px", fontWeight: 700 }}>
            O problema que ninguém fala
          </p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 900, margin: "0 0 48px", color: "#fff", lineHeight: 1.15, maxWidth: "780px" }}>
            Energia na direção errada não é só desperdício.{" "}
            <span style={{ color: "#39ff14" }}>É prejuízo.</span>
          </h2>
        </RevealSection>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            {
              titulo: "Cada negócio tem um modelo de crescimento que cabe melhor nele",
              desc: "Não existe uma estratégia universal. O que funciona para um negócio pode ser exatamente o que trava outro — e a maioria dos empresários nunca parou para entender qual é o seu.",
              delay: 0,
            },
            {
              titulo: "O palco do outro não funciona para o seu bastidor",
              desc: "Você vê alguém crescer com uma estratégia e tenta replicar. Mas o que aparece no palco é resultado de uma estrutura que você não vê. Copiar o palco sem entender o bastidor é uma armadilha cara.",
              delay: 100,
            },
            {
              titulo: "Cada fase do negócio tem uma recomendação específica",
              desc: "O que funciona para escalar não é o mesmo que funciona para validar. O que funciona para reter não é o mesmo que funciona para adquirir. Fase errada, estratégia errada.",
              delay: 200,
            },
            {
              titulo: "O modelo certo norteia tudo",
              desc: "Quando você descobre o motor real do seu crescimento, ele passa a orientar as contratações, a gestão, o marketing e as vendas. O negócio cresce mais saudável porque todos estão apontando para o mesmo lugar.",
              delay: 300,
            },
          ].map((item, i) => (
            <RevealSection key={i} delay={item.delay}>
              <div style={{
                background: "#0f0f0f", border: "1px solid #222",
                padding: "28px 28px 28px 32px",
                display: "flex", gap: "16px", alignItems: "flex-start", height: "100%",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "3px", height: "100%",
                  background: "linear-gradient(to bottom, #39ff14, rgba(57,255,20,0.2))",
                }} />
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px", margin: "0 0 10px", lineHeight: 1.3 }}>{item.titulo}</p>
                  <p style={{ color: "#cccccc", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── PERGUNTAS ESTRATÉGICAS ── */}
      <section style={{ background: "#080808", borderTop: "1px solid #161616", borderBottom: "1px solid #161616", padding: "72px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <RevealSection>
            <p style={{ color: "#39ff14", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 16px", fontWeight: 700 }}>
              Antes do evento
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 900, margin: "0 0 12px", color: "#fff", lineHeight: 1.2 }}>
              Algumas perguntas para você já ir pensando
            </h2>
            <p style={{ color: "#aaaaaa", fontSize: "15px", margin: "0 0 48px", maxWidth: "560px", lineHeight: 1.65 }}>
              Não existe resposta certa ou errada. Mas as suas respostas dizem muito sobre como o seu negócio realmente funciona.
            </p>
          </RevealSection>

          <div className="perguntas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            {PERGUNTAS.map((pergunta, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="pergunta-card">
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <span style={{
                      color: "#39ff14", fontSize: "11px", fontWeight: 800,
                      letterSpacing: "1px", flexShrink: 0, marginTop: "3px",
                      fontFamily: "monospace",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={{ color: "#ffffff", fontSize: "15px", fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                      {pergunta}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={600}>
            <p style={{
              color: "#666", fontSize: "13px", marginTop: "32px",
              textAlign: "center", fontStyle: "italic",
            }}>
              No evento, você vai entender o que cada resposta revela sobre o motor do seu negócio.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── PARA QUEM É ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "72px 24px" }}>
        <RevealSection>
          <p style={{ color: "#39ff14", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 16px", fontWeight: 700 }}>
            Para quem é este evento
          </p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, margin: "0 0 8px", color: "#fff" }}>
            Se você se reconhece em algum desses cenários,{" "}
            <span style={{ color: "#39ff14" }}>este encontro é para você.</span>
          </h2>
          <p style={{ color: "#dddddd", fontSize: "15px", margin: "0 0 40px" }}></p>
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
              desc: "Porque o motor de crescimento do seu negócio é diferente do deles.",
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
      </section>

      {/* ── O QUE ACONTECE ── */}
      <section style={{ background: "#0f0f0f", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "72px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <RevealSection>
            <p style={{ color: "#39ff14", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 16px", fontWeight: 700 }}>
              O que acontece no evento
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>
              Um encontro de prática, que vira ponteiro no seu negócio.
            </h2>
            <p style={{ color: "#dddddd", fontSize: "15px", margin: "0 0 40px" }}>
              Um grupo de 30 empresários. Ambiente fechado. Conteúdo que você não encontra em curso.
            </p>
          </RevealSection>

          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {[
              {
                num: "01",
                titulo: "Diagnóstico ao vivo",
                desc: "Você identifica qual é o motor que realmente move o seu negócio — não o que você acha, o que os dados mostram.",
                delay: 0,
              },
              {
                num: "02",
                titulo: "Por que sua estratégia pode estar errada",
                desc: "Cada modelo de crescimento exige uma abordagem diferente. Aplicar a estratégia certa no modelo errado é o motivo mais comum de estagnação.",
                delay: 100,
              },
              {
                num: "03",
                titulo: "Ambiente de 30 pessoas",
                desc: "Sem palco, sem plateia. Um grupo pequeno de empresários que estão no mesmo jogo — e que têm as mesmas perguntas que você.",
                delay: 200,
              },
              {
                num: "04",
                titulo: "Você sai com clareza",
                desc: "A saída não é uma lista de ações genéricas. É entender onde concentrar energia para crescer com menos desperdício.",
                delay: 300,
              },
            ].map((item, i) => (
              <RevealSection key={i} delay={item.delay}>
                <div style={{
                  background: "#0a0a0a", border: "1px solid #222",
                  padding: "28px",
                  display: "flex", gap: "20px", alignItems: "flex-start", height: "100%",
                }}>
                  <span style={{
                    color: "#39ff14", fontSize: "28px", fontWeight: 900,
                    lineHeight: 1, flexShrink: 0, fontFamily: "monospace", opacity: 0.7,
                  }}>
                    {item.num}
                  </span>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px", margin: "0 0 8px" }}>{item.titulo}</p>
                    <p style={{ color: "#cccccc", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE LEANDRO ── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "72px 24px" }}>
        <RevealSection>
          <div className="speaker-grid" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "48px", alignItems: "center" }}>
            <div style={{ overflow: "hidden", border: "2px solid #39ff14", boxShadow: "0 0 32px rgba(57,255,20,0.15)" }}>
              <img
                src="/manus-storage/IMG_4819_e6c7de00.jpg"
                alt="Leandro Herbert"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
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
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.3)",
              padding: "6px 16px", marginBottom: "24px",
            }}>
              <Users size={14} color="#39ff14" />
              <span style={{ color: "#39ff14", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>
                APENAS {EVENTO.vagas} VAGAS · ENTRADA GRATUITA
              </span>
            </div>

            <h2 style={{ fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, color: "#fff" }}>
              Descubra o motor do seu negócio.{" "}
              <span style={{ color: "#39ff14" }}>Ao vivo.</span>
            </h2>

            <p style={{ color: "#dddddd", fontSize: "16px", margin: "0 0 12px", lineHeight: 1.6 }}>
              {EVENTO.dia} de {EVENTO.mesExtenso} · {EVENTO.horario} · {EVENTO.local}
            </p>
            <p style={{ color: "#888", fontSize: "14px", margin: "0 0 40px" }}>
              {EVENTO.endereco}
            </p>

            <button onClick={handleCadastro} className="btn-pulse" style={{
              background: "#39ff14", color: "#0a0a0a", border: "none",
              padding: "22px 60px",
              fontSize: "18px", fontWeight: 800, letterSpacing: "1px",
              cursor: "pointer", display: "inline-flex", alignItems: "center",
              gap: "12px", textTransform: "uppercase",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}>
              Quero participar
              <ArrowRight size={20} />
            </button>

            <p style={{ color: "#bbbbbb", fontSize: "13px", marginTop: "16px" }}>
              Vagas limitadas · Sem custo · Brasília
            </p>
          </div>
        </RevealSection>
      </section>

      {/* ── RODAPÉ ── */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "24px", textAlign: "center" }}>
        <p style={{ color: "#444", fontSize: "12px", margin: 0 }}>
          LED GROWTH MODELS · Evento presencial em Brasília · {EVENTO.dia}/{EVENTO.mesExtenso}/2026
        </p>
      </footer>

      {/* ── MODAL DE INSCRIÇÃO ── */}
      <InscricaoModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        eventoData={`${EVENTO.dia}/${EVENTO.mesExtenso}/2026`}
      />
    </div>
  );
}
