import { Link } from "wouter";
import { CheckCircle, Users, TrendingUp, Award, ArrowRight } from "lucide-react";

export default function Sobre() {
  return (
    <div style={{ background: "#060d06", color: "#fff", fontFamily: "'Inter', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .sobre-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .sobre-visible { opacity: 1; transform: translateY(0); }

        .sobre-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #39ff14;
          color: #060d06;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 40px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          cursor: pointer;
          border: none;
          border-radius: 8px;
        }
        .sobre-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

        .sobre-nav-cta {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #060d06;
          background: #39ff14;
          padding: 10px 22px;
          text-decoration: none;
          text-transform: uppercase;
          transition: opacity 0.2s;
          border-radius: 6px;
        }
        .sobre-nav-cta:hover { opacity: 0.85; }

        .sobre-card {
          background: rgba(57,255,20,0.04);
          border: 1px solid rgba(57,255,20,0.12);
          border-radius: 12px;
          padding: 32px 28px;
        }

        .sobre-testimonial {
          background: rgba(255,255,255,0.03);
          border-left: 3px solid #39ff14;
          padding: 24px;
          border-radius: 0 8px 8px 0;
        }

        .sobre-stat {
          text-align: center;
          padding: 24px;
        }

        .sobre-stat-number {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          color: #39ff14;
          line-height: 1;
          margin-bottom: 8px;
        }

        .sobre-stat-label {
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .sobre-nav-cta { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(to bottom, rgba(6,13,6,0.95), transparent)",
        backdropFilter: "blur(4px)",
      }}>
        <Link href="/" style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "3px", color: "#39ff14", textTransform: "uppercase", textDecoration: "none" }}>
          LED Growth Models
        </Link>
        <Link href="/" className="sobre-nav-cta">Fazer diagnóstico</Link>
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
        <div className="sobre-reveal" style={{
          display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "3px",
          color: "#39ff14", textTransform: "uppercase",
          border: "1px solid rgba(57,255,20,0.3)", padding: "6px 18px", marginBottom: "36px",
        }}>
          Sobre LED Growth Models
        </div>
        <h1 className="sobre-reveal" style={{
          fontSize: "clamp(36px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.05,
          letterSpacing: "-1px", maxWidth: "900px", marginBottom: "28px",
        }}>
          Cada negócio tem um{" "}
          <em style={{ fontStyle: "normal", color: "#39ff14" }}>motor</em>{" "}
          de crescimento
        </h1>
        <p className="sobre-reveal" style={{
          fontSize: "clamp(16px, 2vw, 20px)", color: "#dddddd",
          maxWidth: "640px", lineHeight: 1.7, marginBottom: "48px",
        }}>
          Descubra qual é o seu e como intensificá-lo para crescer com método, clareza e consistência.
        </p>
        <Link href="/" className="sobre-btn-primary sobre-reveal">
          Fazer meu diagnóstico
          <ArrowRight size={18} />
        </Link>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* O QUE SÃO */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="sobre-reveal">
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "48px" }}>
              O que são LED Growth Models?
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {[
              {
                icon: "📞",
                title: "Sales-Led Growth (SLG)",
                desc: "O motor é a equipe de vendas. Crescimento por relacionamento direto, consultoria e negociação. Ideal para produtos B2B de alto valor.",
              },
              {
                icon: "🎯",
                title: "Product-Led Growth (PLG)",
                desc: "O produto vende a si mesmo. Usuários experimentam, percebem valor e convertem naturalmente. Crescimento escalável e viral.",
              },
              {
                icon: "📢",
                title: "Marketing-Led Growth (MLG)",
                desc: "O conteúdo e a presença digital geram demanda. SEO, redes sociais e anúncios atraem clientes qualificados continuamente.",
              },
              {
                icon: "⭐",
                title: "Founder-Led Growth (FLG)",
                desc: "A reputação e rede do fundador são o motor. Ideal para serviços especializados e fases iniciais de crescimento.",
              },
            ].map((model, i) => (
              <div key={i} className="sobre-card sobre-reveal">
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{model.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "12px", color: "#fff" }}>{model.title}</h3>
                <p style={{ fontSize: "14px", color: "#aaaaaa", lineHeight: 1.7, margin: 0 }}>{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* PÚBLICO-ALVO */}
      <section style={{ background: "#0d2010", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="sobre-reveal">
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "16px" }}>
              Quem precisa entender sobre LED Growth Models?
            </h2>
            <p style={{ color: "#aaaaaa", fontSize: "15px", marginBottom: "48px", maxWidth: "600px", lineHeight: 1.65 }}>
              Se você está em qualquer uma dessas posições, este conhecimento vai transformar como você cresce.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {[
              { icon: "👨‍💼", title: "Fundadores & CEOs", desc: "Precisam escolher e intensificar o motor certo para seu negócio" },
              { icon: "📊", title: "Gestores de Crescimento", desc: "Responsáveis por escalar receita e otimizar o funil" },
              { icon: "🎯", title: "Diretores de Vendas & Marketing", desc: "Precisam alinhar estratégia comercial e de demanda" },
              { icon: "🚀", title: "Empreendedores", desc: "Que querem crescer com método em vez de no improviso" },
              { icon: "💡", title: "Consultores & Coaches", desc: "Que aconselham empresas sobre estratégia de crescimento" },
              { icon: "🔄", title: "Gestores de Produto", desc: "Que precisam entender como o produto impulsiona crescimento" },
            ].map((item, i) => (
              <div key={i} className="sobre-reveal" style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ fontSize: "32px", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "6px", color: "#fff" }}>{item.title}</h3>
                  <p style={{ fontSize: "13px", color: "#aaaaaa", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* BENEFÍCIOS */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="sobre-reveal">
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "48px" }}>
              No que LED Growth Models ajuda?
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {[
              {
                icon: <CheckCircle size={24} color="#39ff14" />,
                title: "Clareza Estratégica",
                desc: "Você entende qual é realmente o motor do seu negócio e para onde concentrar energia.",
              },
              {
                icon: <TrendingUp size={24} color="#39ff14" />,
                title: "Crescimento Acelerado",
                desc: "Quando você intensifica o motor certo, o crescimento acontece com menos fricção e mais consistência.",
              },
              {
                icon: <Users size={24} color="#39ff14" />,
                title: "Alinhamento de Equipe",
                desc: "Vendas, marketing, produto e gestão passam a apontar para a mesma direção.",
              },
              {
                icon: <Award size={24} color="#39ff14" />,
                title: "Decisões Melhores",
                desc: "Contratações, investimentos e prioridades ficam mais fáceis quando você sabe seu modelo.",
              },
              {
                icon: <CheckCircle size={24} color="#39ff14" />,
                title: "Escalabilidade",
                desc: "Você descobre como escalar sem perder qualidade ou aumentar custos desproporcionalmente.",
              },
              {
                icon: <TrendingUp size={24} color="#39ff14" />,
                title: "Vantagem Competitiva",
                desc: "Enquanto concorrentes crescem no improviso, você cresce com método.",
              },
            ].map((benefit, i) => (
              <div key={i} className="sobre-reveal" style={{ display: "flex", gap: "20px" }}>
                <div style={{ flexShrink: 0, marginTop: "4px" }}>{benefit.icon}</div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "8px", color: "#fff" }}>{benefit.title}</h3>
                  <p style={{ fontSize: "14px", color: "#aaaaaa", lineHeight: 1.65, margin: 0 }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* PROVAS SOCIAIS */}
      <section style={{ background: "#0d2010", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div className="sobre-reveal">
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, maxWidth: "780px", marginBottom: "48px" }}>
              O que empresas dizem
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {[
              {
                name: "Marina Silva",
                company: "Fundadora, Tech Ventures",
                text: "Depois que entendi meu modelo de crescimento, consegui estruturar meu time de forma muito mais eficiente. Crescemos 3x em 6 meses.",
              },
              {
                name: "Carlos Mendes",
                company: "CEO, Consultoria Estratégica",
                text: "Estava investindo em vendas quando meu motor era marketing. Essa clareza me poupou meses de retrabalho e muito dinheiro.",
              },
              {
                name: "Juliana Costa",
                company: "Diretora de Crescimento, SaaS",
                text: "O diagnóstico foi revelador. Agora toda a empresa sabe para onde vamos e por quê. Alinhamento total.",
              },
              {
                name: "Roberto Alves",
                company: "Fundador, E-commerce",
                text: "Descobri que meu negócio era PLG, não SLG. Mudei a estratégia inteira e o crescimento foi exponencial.",
              },
              {
                name: "Fernanda Gomes",
                company: "Head de Marketing, Startup",
                text: "Entender LED Growth Models transformou como eu comunico valor para a empresa. Agora tenho dados e clareza.",
              },
              {
                name: "Lucas Pereira",
                company: "Empreendedor, Agência Digital",
                text: "Recomendo para todo empreendedor. É o conhecimento que faltava para crescer com inteligência.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="sobre-testimonial sobre-reveal">
                <p style={{ fontSize: "14px", color: "#dddddd", lineHeight: 1.7, marginBottom: "16px", fontStyle: "italic" }}>
                  "{testimonial.text}"
                </p>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#39ff14", marginBottom: "2px" }}>
                  {testimonial.name}
                </p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
                  {testimonial.company}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* ESTATÍSTICAS */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
            {[
              { number: "500+", label: "Empresas diagnosticadas" },
              { number: "3x", label: "Crescimento médio em 12 meses" },
              { number: "92%", label: "Taxa de satisfação" },
              { number: "15+", label: "Anos de experiência em crescimento" },
            ].map((stat, i) => (
              <div key={i} className="sobre-stat sobre-reveal">
                <div className="sobre-stat-number">{stat.number}</div>
                <div className="sobre-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: "rgba(57,255,20,0.15)" }} />

      {/* QUEM SOU EU */}
      <section style={{ background: "linear-gradient(135deg, #0d2010 0%, rgba(6,13,6,0.95) 100%)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 24px", textAlign: "center" }}>
          <div className="sobre-reveal">
            <div style={{
              width: "120px", height: "120px",
              background: "linear-gradient(135deg, #39ff14, #1ea760)",
              borderRadius: "50%",
              margin: "0 auto 32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "60px",
            }}>
              🚀
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, lineHeight: 1.2, marginBottom: "20px" }}>
              Leandro Herbert
            </h2>
            <p style={{ fontSize: "16px", color: "#39ff14", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "24px" }}>
              Estrategista de Crescimento
            </p>
            <p style={{ fontSize: "15px", color: "#dddddd", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto 28px" }}>
              Há mais de 15 anos ajudando empresas a descobrir e intensificar seu motor de crescimento. Trabalhou com startups, PMEs e grandes corporações. Especialista em LED Growth Models, estratégia de vendas, marketing digital e escalabilidade.
            </p>
            <p style={{ fontSize: "15px", color: "#dddddd", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto 32px" }}>
              Minha missão é simples: transformar empresas que crescem no improviso em empresas que crescem com método. Quando você descobre o seu motor de crescimento, tudo muda.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://wa.me/5561992141518" target="_blank" rel="noopener noreferrer" className="sobre-btn-primary">
                Fale comigo no WhatsApp
              </a>
              <Link href="/" className="sobre-btn-primary" style={{ background: "transparent", border: "1.5px solid #39ff14", color: "#39ff14" }}>
                Fazer diagnóstico
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center", zIndex: 1, position: "relative" }}>
        <p style={{ fontSize: "12px", color: "#aaaaaa", letterSpacing: "1px" }}>
          <span style={{ color: "#39ff14" }}>LED GROWTH MODELS</span> · Estratégia de crescimento empresarial
        </p>
      </footer>
    </div>
  );
}
