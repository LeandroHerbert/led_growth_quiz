import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const timer = setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, delay);
    return () => clearTimeout(timer);
  }, []);
  return <div ref={ref}>{children}</div>;
}

export default function VSL() {
  const handleCTA = () => {
    window.open("https://profplay.com.br/evento/led-growth-models-53-57-95", "_blank");
  };

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        color: "#ffffff",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800;900&display=swap');

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 24px rgba(57,255,20,0.45); }
          50%       { box-shadow: 0 0 52px rgba(57,255,20,0.85); }
        }
        .btn-pulse {
          animation: pulse-glow 2.2s ease-in-out infinite;
        }
        .btn-pulse:hover {
          animation: none;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 0 64px rgba(57,255,20,0.75) !important;
        }

        .vsl-video-wrap {
          position: relative;
          width: 100%;
          max-width: 360px;
          margin: 0 auto;
          border: 2px solid rgba(57,255,20,0.35);
          box-shadow: 0 0 48px rgba(57,255,20,0.12), 0 24px 64px rgba(0,0,0,0.6);
          background: #000;
          overflow: hidden;
        }
        .vsl-video-wrap iframe {
          display: block;
          width: 100%;
          height: 640px;
          border: none;
        }

        .divider-line {
          width: 48px;
          height: 3px;
          background: #39ff14;
          margin: 0 auto 24px;
        }

        @media (max-width: 480px) {
          .vsl-video-wrap { max-width: 100%; }
          .vsl-video-wrap iframe { height: 520px; }
        }
      `}</style>

      {/* ── TOPO / LOGO MARK ── */}
      <div style={{ textAlign: "center", padding: "32px 24px 0" }}>
        <FadeIn delay={0}>
          <span style={{
            color: "#39ff14",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}>
            LED GROWTH MODELS
          </span>
        </FadeIn>
      </div>

      {/* ── HEADLINE ── */}
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px 0", textAlign: "center" }}>
        <FadeIn delay={100}>
          <h1 style={{
            fontSize: "clamp(34px, 6vw, 68px)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-2px",
            margin: "0 0 24px",
            color: "#ffffff",
          }}>
            Você está crescendo{" "}
            <span style={{ color: "#39ff14" }}>com o motor errado</span>{" "}
            — e nem sabe disso.
          </h1>
        </FadeIn>

        <FadeIn delay={220}>
          <p style={{
            fontSize: "clamp(16px, 2.2vw, 22px)",
            color: "#dddddd",
            lineHeight: 1.65,
            margin: "0 0 32px",
            maxWidth: "580px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Cada negócio tem um modelo de crescimento que cabe melhor nele.
            Quando você descobre o seu, tudo — pessoas, gestão, marketing e vendas —
            passa a apontar para o mesmo lugar.
          </p>
        </FadeIn>

        <FadeIn delay={340}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(57,255,20,0.08)",
            border: "1px solid rgba(57,255,20,0.3)",
            padding: "8px 18px",
            marginBottom: "40px",
          }}>
            <Play size={13} color="#39ff14" fill="#39ff14" />
            <span style={{ color: "#39ff14", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>
              ASSISTA AO VÍDEO ABAIXO — MENOS DE 5 MINUTOS
            </span>
          </div>
        </FadeIn>
      </section>

      {/* ── VÍDEO ── */}
      <section style={{ padding: "0 24px 56px" }}>
        <FadeIn delay={480}>
          <div className="vsl-video-wrap">
            <iframe
              src="https://www.youtube.com/embed/aNUnHb95BBM?si=qHA3wKt2HNfOd810"
              title="LED Growth Models — VSL"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </FadeIn>
      </section>

      {/* ── TEXTO PÓS-VÍDEO ── */}
      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px 56px", textAlign: "center" }}>
        <FadeIn delay={600}>
          <div className="divider-line" />
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#ffffff",
            lineHeight: 1.75,
            margin: "0 0 16px",
            fontWeight: 600,
          }}>
            Energia na direção errada não é só desperdício — é prejuízo.
          </p>
          <p style={{
            fontSize: "clamp(14px, 1.6vw, 17px)",
            color: "#cccccc",
            lineHeight: 1.8,
            margin: "0 0 40px",
          }}>
            No evento presencial <strong style={{ color: "#fff" }}>LED Growth Models</strong>,
            você vai identificar o motor real do seu negócio, entender por que certas
            estratégias não funcionam para você — e sair com clareza sobre onde concentrar
            energia para crescer com menos desperdício e mais resultado.
          </p>
        </FadeIn>

        <FadeIn delay={720}>
          <button
            onClick={handleCTA}
            className="btn-pulse"
            style={{
              background: "#39ff14",
              color: "#0a0a0a",
              border: "none",
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
              width: "100%",
              maxWidth: "420px",
              justifyContent: "center",
            }}
          >
            Quero minha vaga gratuita
            <ArrowRight size={18} />
          </button>

          <p style={{ color: "#666", fontSize: "13px", marginTop: "14px" }}>
            25 de junho · 14h · Espaço RC, Bonaparte Hotel — Brasília · Apenas 30 vagas
          </p>
        </FadeIn>
      </section>

      {/* ── RODAPÉ ── */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ color: "#333", fontSize: "11px", margin: 0, letterSpacing: "1px" }}>
          LED GROWTH MODELS · EVENTO PRESENCIAL · BRASÍLIA
        </p>
      </footer>
    </div>
  );
}
