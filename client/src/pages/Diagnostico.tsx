import { useEffect, useRef } from "react";
import { Link } from "wouter";

export default function Diagnostico() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(57,255,20,0.06), transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll(".diag-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("diag-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const quizUrl = "/";

  return (
    <div style={{ background: "#060d06", color: "#fff", fontFamily: "'Inter', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .diag-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .diag-visible { opacity: 1; transform: translateY(0); }

        .diag-btn-primary {
          display: inline-block;
          background: #39ff14;
          color: #060d06;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 18px 48px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          cursor: pointer;
          border: none;
        }
        .diag-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

        .diag-nav-cta {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #060d06;
          background: #39ff14;
          padding: 10px 22px;
          text-decoration: none;
          text-transform: uppercase;
          transition: opacity 0.2s;
        }
        .diag-nav-cta:hover { opacity: 0.85; }

        .diag-problema-item {
          border-left: 2px solid rgba(57,255,20,0.3);
          padding-left: 24px;
        }

        .diag-pergunta-card {
          background: rgba(57,255,20,0.04);
          border: 1px solid rgba(57,255,20,0.12);
          padding: 28px 24px;
        }

        .diag-step { display: flex; gap: 32px; align-items: flex-start; padding-bottom: 40px; position: relative; }
        .diag-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 19px; top: 40px; bottom: 0;
          width: 1px;
          background: rgba(57,255,20,0.2);
        }

        @media (max-width: 600px) {
          .diag-nav-cta { display: none; }
        }
      `}</style>

      {/* SPOTLIGHT */}
      <div
        ref={spotlightRef}
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(600px circle at 50% 50%, rgba(57,255,20,0.06), transparent 70%)",
        }}
      />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(to bottom, rgba(6,13,6,0.95), transparent)",
        backdropFilter: "blur(4px)",
      }}>
        <div style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "3px", color: "#39ff14", textTransform: "uppercase" }}>
          LED Growth Models
        </div>
        <Link href={quizUrl} className="diag-nav-cta">Fazer diagnóstico</Link>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px", zIndex: 1,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(13,32,16,0.8), transparent)",
          zIndex: -1,
        }} />
        <div className="diag-reveal" style={{
          display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "3px",
          color: "#39ff14", textTransform: "uppercase",
          border: "1px solid rgba(57,255,20,0.3)", padding: "6px 18px", marginBottom: "36px",
        }}>
          Diagnóstico gratuito · Resultado imediato
        </div>
        <h1 className="diag-reveal" style={{
          fontSize: "clamp(36px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05,
          letterSpacing: "-1px", maxWidth: "900px", marginBottom: "28px",
        }}>
          Descubra o motor de crescimento{" "}
          <em style={{ fontStyle: "normal", color: "#39ff14" }}>ideal</em>{" "}
          para o seu negócio
        </h1>
        <p className="diag-reveal" style={{
          fontSize: "clamp(16px, 2vw, 20px)", color: "#dddddd",
          maxWidth: "640px", lineHeight: 1.7, marginBottom: "48px",
        }}>
          Cada negócio tem um modelo de crescimento que se encaixa melhor nele. Quando você descobre o seu, pessoas, gestão, marketing e vendas passam a apontar para o mesmo lugar.
        </p>
        <Link href={quizUrl} className="diag-btn-primary diag-reveal">
          Quero descobrir o meu modelo
        </Link>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* PROBLEMA */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="diag-reveal">
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "48px" }}>
              Energia na direção errada não é só desperdício. É prejuízo.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px", marginTop: "0" }}>
            {[
              { title: "Cada negócio tem o seu motor", text: "Não existe uma estratégia universal. O que funciona para um negócio pode ser exatamente o que trava outro — e a maioria dos empresários nunca parou para entender qual é o seu." },
              { title: "O palco do outro não é o seu bastidor", text: "Copiar o modelo de crescimento de quem você admira é um dos erros mais comuns. O que aparece no palco do outro foi construído em um bastidor completamente diferente do seu." },
              { title: "Cada fase tem uma recomendação", text: "O modelo ideal para quem está começando não é o mesmo de quem já tem tração. Crescer com o motor errado para a sua fase atual gera retrabalho, custo e frustração." },
              { title: "O modelo certo alinha tudo", text: "Quando você descobre o motor ideal, ele norteia contratações, processos, marketing e vendas. O negócio para de crescer no improviso e começa a crescer com método." },
            ].map((item, i) => (
              <div key={i} className="diag-problema-item diag-reveal">
                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "10px", color: "#fff" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "#aaaaaa", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* PERGUNTAS */}
      <section style={{ background: "#0d2010", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="diag-reveal">
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "16px" }}>
              Algumas perguntas para você já ir pensando
            </h2>
            <p style={{ color: "#aaaaaa", fontSize: "15px", marginBottom: "40px", maxWidth: "560px", lineHeight: 1.65 }}>
              Não existe resposta certa ou errada. Mas as suas respostas dizem muito sobre como o seu negócio funciona hoje.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[
              "Como você conquistou seus primeiros clientes? Foi você quem foi até eles, ou eles chegaram até você?",
              "Se você precisasse crescer 3x em 12 meses, qual seria o primeiro movimento que você faria?",
              "O que mais influencia um cliente a comprar de você: o produto, o relacionamento, o conteúdo ou a sua reputação pessoal?",
              "Se você saísse do negócio por 3 meses, o que aconteceria com as vendas?",
              "Como você gasta a maior parte do seu tempo: vendendo, melhorando o produto, criando conteúdo ou construindo relacionamentos?",
              "Qual é a sua principal fonte de novos clientes hoje? Isso é sustentável ou depende de você estar presente?",
            ].map((q, i) => (
              <div key={i} className="diag-pergunta-card diag-reveal">
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#39ff14", marginBottom: "12px" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#fff", lineHeight: 1.5 }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* COMO FUNCIONA */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="diag-reveal">
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "48px" }}>
              Dois passos para clareza total
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: "700px" }}>
            {[
              { title: "Responda ao diagnóstico", text: "São 11 perguntas sobre como o seu negócio funciona hoje. Sem respostas certas ou erradas — apenas um mapeamento honesto da sua realidade." },
              { title: "Receba seu resultado imediatamente", text: "Ao final, você descobre qual é o LED Growth Model que mais se encaixa no seu negócio, com uma explicação do que ele significa e como ele funciona na prática." },
            ].map((step, i) => (
              <div key={i} className="diag-step diag-reveal">
                <div style={{
                  width: "40px", height: "40px", minWidth: "40px",
                  border: "1px solid #39ff14",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", fontWeight: 800, color: "#39ff14",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px" }}>{step.title}</h3>
                  <p style={{ fontSize: "14px", color: "#aaaaaa", lineHeight: 1.7 }}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* CTA PRINCIPAL */}
      <section style={{ background: "linear-gradient(135deg, #0d2010 0%, rgba(6,13,6,0.95) 100%)", borderTop: "1px solid rgba(57,255,20,0.15)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }} className="diag-reveal">
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "24px" }}>
            Pare de crescer{" "}
            <em style={{ fontStyle: "normal", color: "#39ff14" }}>no escuro.</em>
          </h2>
          <p style={{ fontSize: "18px", color: "#dddddd", lineHeight: 1.7, marginBottom: "48px", maxWidth: "580px", marginLeft: "auto", marginRight: "auto" }}>
            O diagnóstico é gratuito, leva menos de 5 minutos e entrega o resultado na hora. Você sai sabendo qual é o motor ideal do seu negócio.
          </p>
          <Link href={quizUrl} className="diag-btn-primary">
            Fazer meu diagnóstico agora
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center", zIndex: 1, position: "relative" }}>
        <p style={{ fontSize: "12px", color: "#aaaaaa", letterSpacing: "1px" }}>
          <span style={{ color: "#39ff14" }}>LED GROWTH MODELS</span> · Diagnóstico gratuito de crescimento empresarial
        </p>
      </footer>
    </div>
  );
}
