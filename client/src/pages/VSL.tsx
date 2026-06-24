import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

// ── Declaração de tipos para a YouTube IFrame API ────────────────────────────
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

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

// ── Player YouTube com gate ───────────────────────────────────────────────────
function YouTubeGatePlayer({ onUnlock }: { onUnlock: () => void }) {
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);      // 0–100

  const [completed, setCompleted] = useState(false);
  const unlockedRef = useRef(false);

  // Progresso visual acelerado:
  // - Até 50% real do vídeo: barra anda 3x mais rápido (máx 75% visual)
  // - Acima de 50% real: barra desacelera gradualmente até acompanhar o real
  const visualProgress = (realPct: number): number => {
    if (realPct <= 50) {
      // 3x mais rápido, mas capped em 75%
      return Math.min(realPct * 3, 75);
    } else {
      // Interpola de 75% (visual) até 100% (visual) conforme real vai de 50% a 100%
      const t = (realPct - 50) / 50; // 0..1
      return 75 + t * 25;
    }
  };

  const unlock = () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    setCompleted(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onUnlock();
  };

  const startProgressInterval = (player: any) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      try {
        const cur = player.getCurrentTime?.() ?? 0;
        const dur = player.getDuration?.() ?? 0;
        if (dur > 0) {
          const realPct = (cur / dur) * 100;
          setProgress(visualProgress(realPct));
          if (realPct >= 99.5) unlock();
        }
      } catch (_) {}
    }, 500);
  };

  useEffect(() => {
    // Carregar o script da API se ainda não estiver presente
    const loadAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    };

    const initPlayer = () => {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "aNUnHb95BBM",
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
          showinfo: 0,
          color: "white",
          branding: 0,
        },
        events: {
          onStateChange: (e: any) => {
            const state = e.data;
            // 1 = playing, 2 = paused, 0 = ended
            if (state === 1) {
              setIsPlaying(true);
              startProgressInterval(playerRef.current);
            } else if (state === 2) {
              setIsPlaying(false);
            } else if (state === 0) {
              setIsPlaying(false);
              unlock();
            }
          },
        },
      });
    };

    loadAPI();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      const state = p.getPlayerState?.();
      if (state === 1) {
        p.pauseVideo();
      } else {
        p.playVideo();
      }
    } catch (_) {}
  };

  return (
    <div style={{ width: "100%", maxWidth: "360px", margin: "0 auto" }}>
      {/* Wrapper do player com overlay anti-skip */}
      <div style={{
        position: "relative",
        width: "100%",
        border: "2px solid rgba(57,255,20,0.35)",
        boxShadow: "0 0 48px rgba(57,255,20,0.12), 0 24px 64px rgba(0,0,0,0.6)",
        background: "#000",
        overflow: "hidden",
      }}>
        {/* Div alvo do YouTube IFrame API */}
        <div
          id="yt-player"
          style={{ display: "block", width: "100%", height: "640px" }}
        />

        {/* Overlay anti-skip: cobre o iframe, intercepta cliques */}
        <div
          onClick={togglePlay}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            cursor: "pointer",
            background: "transparent",
          }}
        />

        {/* Thumbnail customizada como capa do player antes do play */}
        {!isPlaying && (
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 11,
            backgroundImage: "url('https://manus-webdev-static-assets.s3.us-east-1.amazonaws.com/manus-storage/thumbnail_vsl_3348bace.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            pointerEvents: "none",
          }} />
        )}

        {/* Ícone de play centralizado quando pausado */}
        {!isPlaying && !completed && (
          <div
            onClick={togglePlay}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              pointerEvents: "none",
            }}
          >
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#39ff14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(57,255,20,0.6)",
            }}>
              <Play size={28} color="#000" fill="#000" style={{ marginLeft: 4 }} />
            </div>
          </div>
        )}
      </div>

      {/* Barra de progresso customizada */}
      <div style={{
        marginTop: "10px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "99px",
        height: "6px",
        overflow: "hidden",
        position: "relative",
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: completed ? "#39ff14" : "#ff0000",
          borderRadius: "99px",
          transition: "width 0.5s linear, background 0.4s",
        }} />
      </div>

      {/* Texto de status */}
      <div style={{ marginTop: "6px", padding: "0 2px", textAlign: "right" }}>
        {completed && (
          <span style={{ fontSize: "11px", color: "#39ff14", fontWeight: 700 }}>✓ Vídeo concluído</span>
        )}
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function VSL() {
  const [unlocked, setUnlocked] = useState(false);

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

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
        .pulse-dot {
          animation: pulse-dot 1.2s ease-in-out infinite;
        }

        .gate-reveal {
          transition: max-height 1.2s cubic-bezier(0.4,0,0.2,1), opacity 1s ease;
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

      {/* ── VÍDEO COM GATE ── */}
      <section style={{ padding: "0 24px 0" }}>
        <FadeIn delay={480}>
          <YouTubeGatePlayer onUnlock={() => setUnlocked(true)} />
        </FadeIn>
      </section>

      {/* ── BANNER DE GATE (visível enquanto não assistiu) ── */}
      <div style={{
        maxWidth: "360px",
        margin: "0 auto",
        padding: "0 24px",
        overflow: "hidden",
        maxHeight: unlocked ? "0px" : "120px",
        opacity: unlocked ? 0 : 1,
        transition: "max-height 0.8s ease, opacity 0.6s ease",
      }}>
        <div style={{
          marginTop: "16px",
          padding: "14px 18px",
          background: "rgba(255,0,0,0.08)",
          border: "1px solid rgba(255,0,0,0.25)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div
            className="pulse-dot"
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ff4444",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: "13px", color: "#ffaaaa", fontWeight: 600 }}>
            Assista ao vídeo completo para liberar o conteúdo
          </span>
        </div>
      </div>

      {/* ── CONTEÚDO BLOQUEADO (texto + CTA) ── */}
      <div
        className="gate-reveal"
        style={{
          maxHeight: unlocked ? "600px" : "0px",
          opacity: unlocked ? 1 : 0,
          overflow: "hidden",
        }}
      >
        {/* Texto pós-vídeo */}
        <section style={{ maxWidth: "640px", margin: "0 auto", padding: "48px 24px 56px", textAlign: "center" }}>
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
        </section>
      </div>

      {/* Espaçamento mínimo quando o gate está ativo */}
      {!unlocked && <div style={{ height: "56px" }} />}

      {/* ── RODAPÉ ── */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ color: "#333", fontSize: "11px", margin: 0, letterSpacing: "1px" }}>
          LED GROWTH MODELS · ECOSSISTEMA ALTUM
        </p>
      </footer>
    </div>
  );
}
