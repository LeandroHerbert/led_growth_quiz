import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, Play, Pause } from "lucide-react";
import { trpc } from "@/lib/trpc";

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

// ── Player HTML5 customizado: só play/pause, sem barra de tempo ──────────────
function VideoPlayer({ src, mimeType }: { src: string; mimeType?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  // Bloquear cliques na barra de progresso nativa via CSS pointer-events
  // e esconder todos os controles do navegador via CSS
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "360px",
        margin: "0 auto",
        border: "2px solid rgba(57,255,20,0.35)",
        boxShadow: "0 0 48px rgba(57,255,20,0.12), 0 24px 64px rgba(0,0,0,0.6)",
        background: "#000",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={toggle}
    >
      {/* Vídeo sem controles nativos */}
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onCanPlay={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        style={{
          display: "block",
          width: "100%",
          height: "640px",
          objectFit: "cover",
          pointerEvents: "none", // impede interação direta com o vídeo
        }}
      />

      {/* Overlay de play/pause centralizado */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: playing ? "transparent" : "rgba(0,0,0,0.35)",
          transition: "background 0.3s",
        }}
      >
        {!playing && (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#39ff14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(57,255,20,0.6)",
            }}
          >
            <Play size={28} color="#000" fill="#000" style={{ marginLeft: 4 }} />
          </div>
        )}
      </div>

      {/* Barra de controle inferior: só play/pause */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 16px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={toggle}
          disabled={!ready}
          style={{
            background: "rgba(57,255,20,0.15)",
            border: "1px solid rgba(57,255,20,0.4)",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: ready ? "pointer" : "default",
            color: "#39ff14",
          }}
        >
          {playing
            ? <Pause size={16} fill="#39ff14" />
            : <Play size={16} fill="#39ff14" style={{ marginLeft: 2 }} />
          }
        </button>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
          {playing ? "Pausar" : "Reproduzir"}
        </span>
      </div>
    </div>
  );
}

// ── Fallback: embed YouTube quando não há vídeo no S3 ────────────────────────
function YouTubePlayer() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "360px",
        margin: "0 auto",
        border: "2px solid rgba(57,255,20,0.35)",
        boxShadow: "0 0 48px rgba(57,255,20,0.12), 0 24px 64px rgba(0,0,0,0.6)",
        background: "#000",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://www.youtube.com/embed/aNUnHb95BBM?si=qHA3wKt2HNfOd810&controls=1&modestbranding=1&rel=0"
        title="LED Growth Models — VSL"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ display: "block", width: "100%", height: "640px", border: "none" }}
      />
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function VSL() {
  const { data: videoAtivo, isLoading: loadingVideo } = trpc.videos.getAtivo.useQuery();

  const handleCTA = () => {
    const phone = "5561992141518";
    const msg = encodeURIComponent("Quero entrar para a Altum.");
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
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

        .divider-line {
          width: 48px;
          height: 3px;
          background: #39ff14;
          margin: 0 auto 24px;
        }

        @media (max-width: 480px) {
          .vsl-video-wrap { max-width: 100%; }
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
          {loadingVideo ? (
            <div style={{
              width: "100%", maxWidth: "360px", height: "640px", margin: "0 auto",
              background: "rgba(57,255,20,0.04)", border: "2px solid rgba(57,255,20,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 40, height: 40, border: "3px solid #39ff14", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : videoAtivo ? (
            <VideoPlayer src={videoAtivo.url} mimeType={videoAtivo.mimeType} />
          ) : (
            <YouTubePlayer />
          )}
        </FadeIn>
      </section>

      {/* ── TEXTO PÓS-VÍDEO ── */}
      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px 56px", textAlign: "center" }}>
        <FadeIn delay={600}>
          <div className="divider-line" />
          <p style={{
            fontSize: "clamp(17px, 2.2vw, 22px)",
            color: "#ffffff",
            lineHeight: 1.7,
            margin: "0 0 40px",
            fontWeight: 600,
          }}>
            Agora que você entendeu as estruturas de crescimento ordenado, clique no botão
            abaixo e faça parte do{" "}
            <span style={{ color: "#39ff14" }}>Ecossistema Altum</span>{" "}
            — e continue acelerando seu crescimento.
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
            Quero entrar para a Altum
            <ArrowRight size={18} />
          </button>

          <p style={{ color: "#666", fontSize: "13px", marginTop: "14px" }}>
            Resposta rápida · WhatsApp direto com Leandro Herbert
          </p>
        </FadeIn>
      </section>

      {/* ── RODAPÉ ── */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ color: "#333", fontSize: "11px", margin: 0, letterSpacing: "1px" }}>
          LED GROWTH MODELS · ECOSSISTEMA ALTUM
        </p>
      </footer>
    </div>
  );
}
