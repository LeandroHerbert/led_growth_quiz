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
  const whatsappUrl =
    "https://wa.me/5561992141518?text=RESPONDI%20O%20QUIZ%20E%20QUERO%20UMA%20CALL%20PARA%20FALAR%20SOBRE%20LED%20GROWTH%20MODELS";

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

        .diag-btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1px solid #39ff14;
          color: #39ff14;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 32px;
          text-decoration: none;
          margin-top: 32px;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .diag-btn-whatsapp:hover { background: #39ff14; color: #060d06; }

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

        .diag-modelo-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
        }
        .diag-modelo-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #39ff14;
          opacity: 0.4;
        }

        .diag-step { display: flex; gap: 32px; align-items: flex-start; padding-bottom: 40px; position: relative; }
        .diag-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 19px; top: 40px; bottom: 0;
          width: 1px;
          background: rgba(57,255,20,0.2);
        }

        .diag-call-item { display: flex; align-items: flex-start; gap: 12px; }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .diag-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #39ff14, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @media (max-width: 600px) {
          .diag-nav-cta { display: none; }
          .diag-call-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
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
        <p className="diag-reveal" style={{ marginTop: "20px", fontSize: "12px", color: "#aaaaaa", letterSpacing: "1px" }}>
          Menos de 5 minutos · Sem cadastro · Resultado na hora
        </p>
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#aaaaaa", textTransform: "uppercase" }}>Rolar</span>
          <div className="diag-scroll-line" />
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* PROBLEMA */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="diag-reveal">
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#39ff14", textTransform: "uppercase", marginBottom: "16px" }}>
              O problema que ninguém fala
            </p>
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
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#39ff14", textTransform: "uppercase", marginBottom: "16px" }}>
              Antes de responder ao diagnóstico
            </p>
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
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#39ff14", textTransform: "uppercase", marginBottom: "16px" }}>
              Como funciona
            </p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "48px" }}>
              Três passos para clareza total
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: "700px" }}>
            {[
              { title: "Responda ao diagnóstico", text: "São 11 perguntas sobre como o seu negócio funciona hoje. Sem respostas certas ou erradas — apenas um mapeamento honesto da sua realidade." },
              { title: "Receba seu resultado imediatamente", text: "Ao final, você descobre qual é o LED Growth Model que mais se encaixa no seu negócio, com uma explicação do que ele significa e como ele funciona na prática." },
              { title: "Coloque em prática com suporte", text: "Se quiser ir além do diagnóstico, você pode agendar uma call estratégica para entender como aplicar o modelo no seu negócio em uma rota de 90 dias." },
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

      {/* MODELOS */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="diag-reveal">
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#39ff14", textTransform: "uppercase", marginBottom: "16px" }}>
              Os 4 modelos
            </p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "16px" }}>
              Qual desses motores está rodando no seu negócio?
            </h2>
            <p style={{ color: "#aaaaaa", fontSize: "15px", marginBottom: "48px", maxWidth: "600px", lineHeight: 1.65 }}>
              Cada modelo tem características, vantagens e armadilhas específicas. O diagnóstico revela qual é o seu — e o que fazer com isso.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {[
              { sigla: "SLG", nome: "Crescimento por Vendas", desc: "O motor é a equipe comercial. Funciona bem em negócios de ticket alto, ciclo longo e relacionamento consultivo." },
              { sigla: "PLG", nome: "Crescimento pelo Produto", desc: "O produto vende a si mesmo. O usuário experimenta, vê valor e converte — sem precisar de um vendedor no meio do caminho." },
              { sigla: "MLG", nome: "Crescimento pelo Marketing", desc: "O conteúdo e a presença digital geram demanda. Clientes chegam atraídos por buscas, redes sociais e autoridade construída." },
              { sigla: "FLG", nome: "Crescimento pelo Fundador", desc: "A reputação e a rede do fundador são o principal motor. Funciona bem em fases iniciais e em negócios de alta especialização." },
            ].map((m, i) => (
              <div key={i} className="diag-modelo-card diag-reveal">
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#39ff14", marginBottom: "8px", letterSpacing: "-1px" }}>{m.sigla}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>{m.nome}</div>
                <p style={{ fontSize: "13px", color: "#aaaaaa", lineHeight: 1.6 }}>{m.desc}</p>
                <p style={{ marginTop: "16px", fontSize: "11px", color: "rgba(57,255,20,0.5)", letterSpacing: "1px", fontWeight: 600 }}>Descubra se é o seu →</p>
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
            O diagnóstico é gratuito, leva menos de 5 minutos e entrega o resultado na hora. Você sai sabendo qual é o motor ideal do seu negócio — e o que fazer com essa informação.
          </p>
          <Link href={quizUrl} className="diag-btn-primary">
            Fazer meu diagnóstico agora
          </Link>
          <p style={{ marginTop: "20px", fontSize: "12px", color: "#aaaaaa", letterSpacing: "1px" }}>
            Gratuito · Sem cadastro · Resultado imediato
          </p>
        </div>
      </section>

      {/* CALL ESTRATÉGICA */}
      <section style={{ background: "#0a140a", borderTop: "1px solid rgba(57,255,20,0.1)", position: "relative", zIndex: 1 }}>
        <div
          className="diag-call-grid"
          style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}
        >
          <div className="diag-reveal">
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "#39ff14", textTransform: "uppercase", marginBottom: "16px" }}>
              Próximo passo
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, lineHeight: 1.15, marginBottom: "20px" }}>
              Já fez o diagnóstico? Vamos colocar em prática.
            </h2>
            <p style={{ fontSize: "15px", color: "#dddddd", lineHeight: 1.75, marginBottom: "16px" }}>
              Descobrir o modelo é o primeiro passo. O segundo é entender como aplicá-lo no seu negócio com clareza, sem tentar adaptar o que funciona para outro.
            </p>
            <p style={{ fontSize: "15px", color: "#dddddd", lineHeight: 1.75 }}>
              Em uma call estratégica de 30 minutos, você entende como intensificar o seu motor de crescimento e como combiná-lo para maximizar resultados em uma rota de 90 dias.
            </p>
            <a href={whatsappUrl} className="diag-btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Agendar minha call estratégica
            </a>
          </div>
          <div className="diag-reveal">
            <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "2px", color: "#39ff14", textTransform: "uppercase", marginBottom: "20px" }}>
              O que você vai descobrir na call
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                "Como intensificar o motor de crescimento identificado no seu diagnóstico",
                "Quais combinações de modelos fazem sentido para a sua fase atual",
                "Onde está o maior desperdício de energia no seu negócio hoje",
                "Uma rota de 90 dias para alinhar pessoas, gestão, marketing e vendas ao redor do motor certo",
                "Como parar de crescer no improviso e começar a crescer com método",
              ].map((item, i) => (
                <div key={i} className="diag-call-item">
                  <div style={{ width: "6px", height: "6px", minWidth: "6px", background: "#39ff14", marginTop: "7px" }} />
                  <p style={{ fontSize: "14px", color: "#dddddd", lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
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
