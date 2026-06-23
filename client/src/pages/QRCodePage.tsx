import { useRef, useEffect, useState } from "react";
import { ArrowLeft, Download, Copy, CheckCheck } from "lucide-react";
import { useLocation } from "wouter";
import QRCodeStyling from "qr-code-styling";

const NEON = "#39ff14";
const BG = "linear-gradient(135deg, #071a0e 0%, #0d2b14 50%, #071a0e 100%)";
const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BORDER = "1px solid rgba(57,255,20,0.15)";
const TEXT = "#e8ffe8";
const MUTED = "#7aad7a";

export default function QRCodePage() {
  const [, setLocation] = useLocation();
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [copied, setCopied] = useState(false);

  const quizUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://ledgrowthquiz-apu9wigq.manus.space";

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 280,
      height: 280,
      data: quizUrl,
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H",
      },
      dotsOptions: {
        color: "#071a0e",
        type: "square",
      },
      backgroundOptions: {
        color: "#39ff14",
      },
      cornersSquareOptions: {
        color: "#071a0e",
        type: "square",
      },
      cornersDotOptions: {
        color: "#071a0e",
        type: "dot",
      },
    });

    setQrCode(qr);

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [quizUrl]);

  const downloadQRCode = () => {
    if (qrCode) {
      qrCode.download({ name: "qrcode-led-growth-models", extension: "png" });
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(quizUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        padding: "32px 16px",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "560px" }}>

        {/* Voltar */}
        <button
          onClick={() => setLocation("/")}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.06)", color: TEXT,
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
            padding: "8px 14px", fontSize: "13px", fontWeight: 600,
            cursor: "pointer", marginBottom: "32px",
          }}
        >
          <ArrowLeft size={14} /> Voltar ao Quiz
        </button>

        {/* Título */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <p style={{ color: NEON, fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", margin: "0 0 8px" }}>
            DIAGNÓSTICO ESTRATÉGICO
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            LED GROWTH <span style={{ color: NEON }}>MODELS</span>
          </h1>
          <p style={{ color: MUTED, fontSize: "15px", margin: 0 }}>
            Exiba este QR Code na sua apresentação. Sua audiência escaneia e cai direto no diagnóstico.
          </p>
        </div>

        {/* Card QR Code */}
        <div
          style={{
            background: CARD_BG,
            border: CARD_BORDER,
            borderRadius: "16px",
            padding: "36px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          {/* QR Code com moldura */}
          <div
            style={{
              background: NEON,
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "28px",
              boxShadow: `0 0 40px ${NEON}44`,
            }}
          >
            <div ref={qrRef} style={{ display: "flex", justifyContent: "center" }} />
          </div>

          {/* URL */}
          <div style={{ width: "100%", marginBottom: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: MUTED, letterSpacing: "0.08em", marginBottom: "6px" }}>
              URL DO QUIZ
            </p>
            <p
              style={{
                fontSize: "13px", fontFamily: "monospace",
                background: "rgba(0,0,0,0.4)", border: "1px solid rgba(57,255,20,0.2)",
                borderRadius: "8px", padding: "10px 14px",
                color: NEON, wordBreak: "break-all", margin: 0,
              }}
            >
              {quizUrl}
            </p>
          </div>

          {/* Botões */}
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <button
              onClick={downloadQRCode}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                background: NEON, color: "#000", border: "none", borderRadius: "10px",
                padding: "13px", fontSize: "14px", fontWeight: 800, cursor: "pointer",
              }}
            >
              <Download size={15} /> Baixar QR Code
            </button>
            <button
              onClick={copyUrl}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                background: "rgba(57,255,20,0.12)", color: NEON,
                border: `1px solid ${NEON}44`, borderRadius: "10px",
                padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer",
              }}
            >
              {copied ? <><CheckCheck size={15} /> Copiado!</> : <><Copy size={15} /> Copiar URL</>}
            </button>
          </div>
        </div>

        {/* Instruções */}
        <div
          style={{
            background: CARD_BG,
            border: CARD_BORDER,
            borderRadius: "12px",
            padding: "22px 24px",
          }}
        >
          <p style={{ color: NEON, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 14px" }}>
            COMO USAR
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              "Baixe o QR Code e insira nos seus slides ou exiba na TV do evento",
              "Sua audiência escaneia com o celular — sem precisar digitar nada",
              "Eles preenchem nome, WhatsApp e e-mail antes de iniciar",
              "Ao concluir, recebem o diagnóstico do modelo de crescimento",
              "Os leads aparecem automaticamente no seu dashboard em /dashboard",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: `${NEON}22`, border: `1px solid ${NEON}55`,
                    color: NEON, fontSize: "11px", fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <p style={{ color: TEXT, fontSize: "13px", margin: 0, lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
