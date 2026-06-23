import { useLocation, useRoute } from "wouter";
import { ArrowLeft, CheckCircle, AlertCircle, Target, TrendingUp, Download, Zap, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";

// URLs dos PDFs hospedados como assets estáticos
const PDF_URLS: Record<string, string> = {
  SLG: "/manus-storage/diagnostico-slg_fb52dd5c.pdf",
  PLG: "/manus-storage/diagnostico-plg_3eac95af.pdf",
  MLG: "/manus-storage/diagnostico-mlg_f44172cf.pdf",
  FLG: "/manus-storage/diagnostico-flg_129b9f47.pdf",
};

// ── Dados dos modelos ─────────────────────────────────────────────────────────

const modelDetails = {
  SLG: {
    name: "Sales-Led Growth",
    icon: "📞",
    accentColor: "#3b82f6",
    shortDescription: "Seu crescimento é impulsionado pela equipe de vendas.",
    overview: "No modelo Sales-Led Growth, a equipe comercial é o principal motor de aquisição de clientes. O crescimento acontece por meio de contato direto, apresentações, negociações e relacionamentos construídos pelos vendedores. Este modelo é especialmente eficaz para produtos e serviços B2B de alto valor, que exigem explicação, personalização ou contratos mais elaborados.",
    howItWorks: [
      "A equipe de vendas identifica e aborda potenciais clientes ativamente",
      "Realiza apresentações, demonstrações e reuniões de qualificação",
      "Negocia condições, preços e escopo conforme a necessidade de cada cliente",
      "O relacionamento pessoal é determinante para fechar e manter contratos",
      "O crescimento da receita está diretamente ligado ao tamanho e desempenho da equipe comercial",
    ],
    strengths: [
      "Eficaz para produtos complexos que precisam de explicação",
      "Permite personalização e negociação de alto valor",
      "Relacionamentos geram fidelidade e contratos de longo prazo",
      "Pipeline estruturado gera previsibilidade de receita",
      "Ideal para mercados B2B com poucos clientes de grande porte",
    ],
    weaknesses: [
      "Custo de aquisição por cliente tende a ser alto",
      "Crescimento depende de contratar e treinar mais vendedores",
      "Ciclo de vendas longo pode atrasar o retorno",
      "Dependência de talentos comerciais difíceis de encontrar",
      "Menos eficaz para produtos de baixo ticket ou alto volume",
    ],
    applicationStrategies: [
      { title: "Estruture seu Processo Comercial", description: "Mapeie as etapas da venda: prospecção, qualificação, apresentação, proposta e fechamento. Documente tudo em um playbook para que outros vendedores possam replicar com consistência." },
      { title: "Invista em Ferramentas de CRM", description: "Use um CRM para registrar cada contato, acompanhar o estágio de cada negociação e prever receita futura com mais precisão." },
      { title: "Recrute e Treine Bem", description: "Contrate vendedores com perfil consultivo, não apenas transacional. Treine com frequência sobre o produto, o mercado e as objeções mais comuns." },
      { title: "Seja Consultivo, Não Apenas Vendedor", description: "Entenda o problema do cliente antes de apresentar a solução. Quanto mais o vendedor ajuda, mais confiança gera — e mais fácil se torna fechar e reter o cliente." },
      { title: "Crie Metas e Incentivos Claros", description: "Defina metas de vendas mensuráveis e crie uma estrutura de comissões que motive o time. Bônus por retenção de clientes também ajudam a alinhar o comercial com o sucesso do cliente." },
    ],
    internalActions: [
      "Criar ou revisar o playbook de vendas com etapas claras",
      "Implementar um CRM para rastrear o pipeline comercial",
      "Definir metas mensais por vendedor e por equipe",
      "Criar processo de onboarding para novos clientes após o fechamento",
      "Medir métricas como taxa de conversão, ticket médio e tempo de ciclo",
      "Realizar reuniões semanais de pipeline para identificar gargalos",
    ],
    externalActions: [
      "Usar o LinkedIn para mapear e abordar decisores nas empresas-alvo",
      "Fazer prospecção ativa por e-mail e telefone com mensagens personalizadas",
      "Participar de eventos, feiras e conferências do setor",
      "Criar parcerias com consultores e integradores que indicam clientes",
      "Solicitar indicações de clientes satisfeitos",
      "Fazer apresentações e demonstrações ao vivo para prospects qualificados",
    ],
    nextSteps: [
      "Semanas 1-2: Mapear o processo de vendas atual e identificar os principais gargalos",
      "Semanas 3-4: Criar ou atualizar o playbook de vendas e implementar o CRM",
      "Mês 2: Treinar o time e começar a medir as métricas de conversão",
      "Mês 3: Otimizar as etapas com menor taxa de avanço no funil",
      "Mês 4 em diante: Escalar a equipe conforme os resultados se consolidam",
    ],
  },

  PLG: {
    name: "Product-Led Growth",
    icon: "🎯",
    accentColor: "#a855f7",
    shortDescription: "Seu crescimento é impulsionado pelo próprio produto.",
    overview: "No modelo Product-Led Growth, o produto é o principal canal de aquisição, ativação e retenção de clientes. O crescimento acontece porque os usuários experimentam o produto, percebem valor rapidamente e se tornam clientes — muitas vezes sem precisar falar com um vendedor. Este modelo funciona melhor para produtos digitais intuitivos, com baixo atrito de entrada e alto potencial de uso recorrente.",
    howItWorks: [
      "Usuários acessam o produto gratuitamente ou por um período de teste",
      "A experiência de uso é simples o suficiente para gerar valor sem suporte",
      "O upgrade para a versão paga acontece de forma natural, quando o usuário percebe o limite da versão gratuita",
      "O produto em si gera indicações — usuários satisfeitos trazem outros usuários",
      "O foco da empresa está em remover barreiras de uso e melhorar continuamente a experiência",
    ],
    strengths: [
      "Crescimento escalável com custo de aquisição reduzido",
      "O produto se vende sozinho pela experiência que entrega",
      "Usuários chegam ao pagamento já convencidos do valor",
      "Potencial viral: usuários satisfeitos indicam naturalmente",
      "Dados de uso do produto orientam melhorias com precisão",
    ],
    weaknesses: [
      "Exige produto muito bem desenvolvido e fácil de usar",
      "Requer investimento contínuo em produto, design e tecnologia",
      "A conversão de gratuito para pago pode ser baixa se o valor não for claro",
      "Menos eficaz para produtos complexos que precisam de configuração",
      "Competição intensa em categorias de produtos simples e acessíveis",
    ],
    applicationStrategies: [
      { title: "Simplifique o Primeiro Uso", description: "O usuário precisa chegar ao 'momento aha' — aquele instante em que percebe o valor do produto — o mais rápido possível. Remova etapas desnecessárias no cadastro e no onboarding." },
      { title: "Crie uma Versão Gratuita Estratégica", description: "Ofereça funcionalidades genuinamente úteis de graça, mas com limites que incentivem o upgrade. O objetivo é gerar dependência positiva, não frustração." },
      { title: "Invista em Experiência do Usuário", description: "Produto rápido, intuitivo e bonito retém mais. Se o usuário precisa de um tutorial longo para começar, algo precisa ser simplificado. Design e usabilidade são parte do produto." },
      { title: "Crie Mecanismos de Viralidade", description: "Facilite o compartilhamento dentro do produto: convites para colaboradores, exportações com marca, templates públicos. Quanto mais o produto se espalha pelo uso, menor o custo de aquisição." },
      { title: "Meça e Otimize a Conversão", description: "Acompanhe onde os usuários desistem. Use dados para identificar o ponto de maior abandono e teste melhorias. Pequenas mudanças no onboarding podem ter grande impacto na receita." },
    ],
    internalActions: [
      "Mapear a jornada do usuário e identificar os pontos de abandono",
      "Implementar analytics de produto (Mixpanel, Amplitude ou similar)",
      "Criar fluxo de onboarding guiado para novos usuários",
      "Definir e monitorar métricas de ativação, retenção e conversão",
      "Realizar testes A/B para otimizar etapas críticas da jornada",
      "Criar loops de feedback com usuários ativos para orientar o roadmap",
    ],
    externalActions: [
      "Criar tutoriais em vídeo no YouTube mostrando como usar o produto",
      "Publicar Reels e Stories no Instagram com casos de uso reais",
      "Fazer SEO para aparecer em buscas relacionadas ao problema que o produto resolve",
      "Disponibilizar templates, recursos e materiais gratuitos para atrair usuários",
      "Participar de comunidades online onde seu público está presente",
      "Fazer parcerias com criadores de conteúdo e influenciadores do nicho",
    ],
    nextSteps: [
      "Semanas 1-2: Mapear a jornada do usuário e identificar os maiores pontos de fricção",
      "Semanas 3-4: Simplificar o onboarding e o primeiro uso do produto",
      "Mês 2: Implementar analytics e começar a medir ativação e conversão",
      "Mês 3: Testar melhorias baseadas nos dados coletados",
      "Mês 4 em diante: Adicionar mecanismos virais e otimizar retenção",
    ],
  },

  MLG: {
    name: "Marketing-Led Growth",
    icon: "📢",
    accentColor: "#22c55e",
    shortDescription: "Seu crescimento é impulsionado pelo marketing e pela geração de demanda.",
    overview: "No modelo Marketing-Led Growth, o marketing é o principal motor de atração e qualificação de clientes. O crescimento acontece por meio de conteúdo, presença digital, anúncios e estratégias de geração de demanda. Este modelo é eficaz para empresas com ticket médio, ciclos de venda moderados e produtos que podem ser explicados e desejados antes mesmo do primeiro contato comercial.",
    howItWorks: [
      "Conteúdo relevante atrai visitantes e gera autoridade no mercado",
      "SEO e presença digital garantem visibilidade contínua e orgânica",
      "Anúncios pagos ampliam o alcance e aceleram a geração de leads",
      "Leads são nutridos com conteúdo até estarem prontos para comprar",
      "O marketing entrega leads qualificados para o time de vendas ou para conversão direta",
    ],
    strengths: [
      "Gera demanda de forma contínua e escalável",
      "Constrói autoridade e reconhecimento de marca ao longo do tempo",
      "Funciona para uma ampla variedade de produtos e serviços",
      "Resultados mensuráveis e otimizáveis com dados",
      "Conteúdo produzido continua gerando retorno após a publicação",
    ],
    weaknesses: [
      "Resultados de SEO e conteúdo levam tempo para aparecer",
      "Requer investimento constante em produção de conteúdo e mídia",
      "Competição alta em canais pagos pode elevar o custo por lead",
      "Necessita de equipe ou parceiros especializados em marketing digital",
      "Sem conversão bem estruturada, leads gerados não viram clientes",
    ],
    applicationStrategies: [
      { title: "Produza Conteúdo que Resolve Problemas", description: "Publique artigos, vídeos e posts que respondem às dúvidas reais do seu público. Conteúdo educativo gera confiança e atrai pessoas no momento em que estão buscando soluções." },
      { title: "Invista em SEO", description: "Otimize seu site para aparecer no Google quando seu público busca pelo problema que você resolve. Pesquise as palavras-chave certas e crie conteúdo em torno delas de forma consistente." },
      { title: "Use Anúncios Pagos com Inteligência", description: "Teste Google Ads, Instagram Ads e LinkedIn Ads. Comece com orçamento pequeno, meça o retorno e escale apenas o que funciona. Foque em ROI, não em alcance." },
      { title: "Construa Presença nas Redes Sociais", description: "Publique com regularidade no Instagram, LinkedIn ou YouTube. Compartilhe casos reais, bastidores, dicas e resultados. Engajamento consistente constrói audiência e gera oportunidades." },
      { title: "Nutra seus Leads com E-mail", description: "Capture contatos e mantenha uma comunicação regular por e-mail. Envie conteúdo útil antes de tentar vender. Leads bem nutridos convertem mais e com menos resistência." },
    ],
    internalActions: [
      "Definir personas e mapear a jornada de compra do cliente ideal",
      "Criar calendário editorial com frequência e canais definidos",
      "Implementar ferramentas de automação de marketing",
      "Estruturar processo de qualificação e passagem de leads para vendas",
      "Medir e acompanhar métricas como CAC, LTV, taxa de conversão e ROI por canal",
      "Criar fluxos de nutrição de leads por e-mail",
    ],
    externalActions: [
      "Publicar artigos no blog com foco em SEO e educação do mercado",
      "Criar vídeos educativos no YouTube sobre os problemas que seu produto resolve",
      "Postar com consistência no Instagram e LinkedIn",
      "Investir em Google Ads e anúncios em redes sociais com segmentação precisa",
      "Fazer guest posts em portais e blogs relevantes do seu setor",
      "Participar de podcasts, webinars e eventos como especialista convidado",
    ],
    nextSteps: [
      "Semanas 1-2: Definir personas e mapear a jornada de compra do cliente ideal",
      "Semanas 3-4: Criar calendário de conteúdo e publicar as primeiras peças",
      "Mês 2: Implementar SEO básico e iniciar investimento em anúncios pagos",
      "Mês 3: Medir resultados por canal e dobrar o esforço no que funciona",
      "Mês 4 em diante: Escalar os canais com melhor retorno e automatizar a nutrição de leads",
    ],
  },

  FLG: {
    name: "Founder-Led Growth",
    icon: "⭐",
    accentColor: "#f59e0b",
    shortDescription: "Seu crescimento é impulsionado pela sua presença e credibilidade pessoal.",
    overview: "No modelo Founder-Led Growth, o fundador é o principal ativo de crescimento do negócio. Sua expertise, rede de contatos, reputação e presença pública atraem clientes, parceiros e oportunidades. Este modelo funciona especialmente bem para consultorias, serviços especializados e negócios onde a confiança pessoal é determinante para a decisão de compra.",
    howItWorks: [
      "O fundador usa sua rede pessoal e profissional para gerar as primeiras oportunidades",
      "A credibilidade e o posicionamento do fundador atraem clientes de forma orgânica",
      "O fundador é a principal referência pública da empresa — sua voz é a voz da marca",
      "Relacionamentos diretos com clientes geram indicações e contratos",
      "O crescimento está diretamente ligado à presença, energia e tempo do fundador",
    ],
    strengths: [
      "Rápido para começar — não exige grande estrutura ou equipe",
      "Custo de aquisição baixo nos estágios iniciais",
      "Relacionamentos próximos geram alta fidelidade dos primeiros clientes",
      "Autenticidade e confiança são difíceis de replicar pela concorrência",
      "Flexibilidade para testar, pivotar e ajustar rapidamente",
    ],
    weaknesses: [
      "O crescimento não escala sem a presença direta do fundador",
      "O fundador se torna o principal gargalo do negócio",
      "Difícil de delegar sem perder a essência que atrai clientes",
      "Risco de burnout com o aumento da demanda",
      "Transição para um modelo mais escalável exige planejamento e tempo",
    ],
    applicationStrategies: [
      { title: "Construa sua Presença Digital Pessoal", description: "Publique com regularidade no LinkedIn, Instagram ou TikTok. Compartilhe aprendizados, bastidores, opiniões e resultados reais. Autenticidade e consistência constroem audiência e autoridade." },
      { title: "Ative sua Rede de Contatos", description: "Converse com ex-colegas, parceiros e conhecidos. Peça indicações de forma direta e natural. Participe de eventos, grupos e comunidades onde seu público está presente." },
      { title: "Crie Conteúdo que Demonstra Expertise", description: "Escreva artigos, grave vídeos ou participe de podcasts. Compartilhe sua visão sobre o mercado. Isso atrai oportunidades de forma passiva e posiciona você como referência no setor." },
      { title: "Seja Consultivo Antes de Vender", description: "Ajude pessoas gratuitamente. Responda perguntas. Ofereça valor antes de apresentar uma proposta. Quem recebe ajuda genuína tende a comprar e a indicar." },
      { title: "Planeje a Transição para um Modelo Escalável", description: "Documente processos, contrate as primeiras pessoas certas e comece a delegar tarefas operacionais. O objetivo é crescer sem que tudo dependa exclusivamente de você." },
    ],
    internalActions: [
      "Documentar processos e conhecimento para facilitar a delegação",
      "Contratar os primeiros colaboradores para funções operacionais",
      "Criar sistemas que reduzam a dependência direta do fundador",
      "Definir o momento e a estratégia de transição para outro modelo de crescimento",
      "Manter a cultura e os valores da empresa mesmo com a expansão da equipe",
      "Estabelecer rituais de feedback com clientes para orientar o crescimento",
    ],
    externalActions: [
      "Publicar conteúdo diário ou semanal no LinkedIn com aprendizados e perspectivas",
      "Criar vídeos curtos no Instagram ou TikTok mostrando sua visão e expertise",
      "Participar de eventos, conferências e painéis como palestrante ou convidado",
      "Fazer networking ativo com potenciais clientes e parceiros estratégicos",
      "Dar entrevistas para podcasts, blogs e portais do seu setor",
      "Construir uma comunidade em torno da sua área de expertise",
    ],
    nextSteps: [
      "Semanas 1-2: Definir seu posicionamento pessoal e a mensagem central que você quer comunicar",
      "Semanas 3-4: Começar a publicar regularmente em pelo menos um canal digital",
      "Mês 2: Ativar a rede de contatos e iniciar conversas com potenciais clientes",
      "Mês 3: Documentar processos e começar a estruturar a equipe",
      "Mês 4 em diante: Planejar a transição para um modelo de crescimento mais escalável",
    ],
  },
};

// ── Estilos globais ────────────────────────────────────────────────────────────

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .lgm-details * { font-family: 'Inter', sans-serif; box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(57,255,20,0.45); }
    50%       { box-shadow: 0 0 0 12px rgba(57,255,20,0); }
  }
  .lgm-fade-up { animation: fadeUp 0.45s ease-out both; }
  .lgm-btn-pulse { animation: pulse-glow 2.2s infinite; }

  .lgm-section {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 14px;
    padding: 28px;
    margin-bottom: 16px;
  }
  .lgm-section-title {
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.3px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lgm-strategy {
    border-left: 3px solid;
    padding: 14px 16px;
    border-radius: 0 10px 10px 0;
    background: rgba(255,255,255,0.03);
    margin-bottom: 10px;
  }
`;

const BG = "linear-gradient(160deg, #071007 0%, #0c1a0c 45%, #071007 100%)";

export default function ResultDetails() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/resultado/:model");
  const contentRef = useRef<HTMLDivElement>(null);

  const downloadDiagnostico = (modelKey: string) => {
    const url = PDF_URLS[modelKey];
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `Diagnostico-${modelKey}-LedGrowthModels.pdf`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!match) {
    return (
      <div className="lgm-details" style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#fff", marginBottom: "16px" }}>Modelo não encontrado</p>
          <button onClick={() => setLocation("/")} style={{ background: "#39ff14", color: "#050f05", border: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>
            Voltar ao Quiz
          </button>
        </div>
      </div>
    );
  }

  const model = params?.model || "";
  const details = modelDetails[model as keyof typeof modelDetails];

  if (!details) {
    return (
      <div className="lgm-details" style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#fff", marginBottom: "16px" }}>Modelo inválido</p>
          <button onClick={() => setLocation("/")} style={{ background: "#39ff14", color: "#050f05", border: "none", borderRadius: "8px", padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>
            Voltar ao Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lgm-details" style={{ minHeight: "100vh", background: BG, padding: "40px 16px" }}>
      <style>{GLOBAL_STYLES}</style>

      <div ref={contentRef} className="lgm-fade-up" style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Topo */}
        <div style={{ marginBottom: "32px" }}>
          <button
            onClick={() => setLocation("/")}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "8px 16px", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <ArrowLeft size={14} /> Voltar ao Quiz
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <p style={{ color: "#39ff14", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>
            Diagnóstico Estratégico
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 900, lineHeight: 1.15, margin: "0 0 8px" }}>
            LED GROWTH <span style={{ color: "#39ff14" }}>MODELS</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: 0 }}>Diagnóstico completo e plano de ação</p>
        </div>

        {/* Badge do modelo */}
        <div style={{
          background: `${details.accentColor}15`,
          border: `1.5px solid ${details.accentColor}50`,
          borderRadius: "16px",
          padding: "28px",
          textAlign: "center",
          marginBottom: "20px",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>{details.icon}</div>
          <h2 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 900, margin: "0 0 10px" }}>{details.name}</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{details.shortDescription}</p>
        </div>

        {/* Visão geral */}
        <div className="lgm-section">
          <div className="lgm-section-title">
            <Target size={16} color="#39ff14" /> O que é este modelo?
          </div>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.75, margin: 0 }}>{details.overview}</p>
        </div>

        {/* Como funciona */}
        <div className="lgm-section">
          <div className="lgm-section-title">
            <TrendingUp size={16} color="#39ff14" /> Como funciona
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {details.howItWorks.map((item, idx) => (
              <div key={idx} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: "26px", height: "26px", background: "rgba(57,255,20,0.12)", border: "1px solid rgba(57,255,20,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#39ff14", fontSize: "11px", fontWeight: 800 }}>{idx + 1}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.65, margin: 0, paddingTop: "3px" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Forças e fraquezas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div className="lgm-section" style={{ marginBottom: 0 }}>
            <div className="lgm-section-title">
              <CheckCircle size={15} color="#39ff14" /> Pontos fortes
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {details.strengths.map((s, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: "#39ff14", fontWeight: 800, fontSize: "13px", flexShrink: 0 }}>✓</span>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lgm-section" style={{ marginBottom: 0 }}>
            <div className="lgm-section-title">
              <AlertCircle size={15} color="#f87171" /> Pontos de atenção
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {details.weaknesses.map((w, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: "#f87171", fontWeight: 800, fontSize: "13px", flexShrink: 0 }}>✗</span>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>{w}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estratégias */}
        <div className="lgm-section">
          <div className="lgm-section-title">
            <Zap size={16} color="#39ff14" /> Estratégias de aplicação
          </div>
          {details.applicationStrategies.map((s, idx) => (
            <div key={idx} className="lgm-strategy" style={{ borderColor: details.accentColor + "60" }}>
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{s.title}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", lineHeight: 1.65, margin: 0 }}>{s.description}</p>
            </div>
          ))}
        </div>

        {/* Ações internas e externas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div className="lgm-section" style={{ marginBottom: 0 }}>
            <div className="lgm-section-title" style={{ fontSize: "14px" }}>
              Ações internas
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {details.internalActions.map((a, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: details.accentColor, fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>•</span>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lgm-section" style={{ marginBottom: 0 }}>
            <div className="lgm-section-title" style={{ fontSize: "14px" }}>
              <ExternalLink size={14} color="rgba(255,255,255,0.5)" /> Ações externas
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {details.externalActions.map((a, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: details.accentColor, fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>•</span>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plano de ação */}
        <div className="lgm-section">
          <div className="lgm-section-title">
            Seu plano de ação
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {details.nextSteps.map((step, idx) => (
              <div key={idx} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: "26px", height: "26px", background: `${details.accentColor}20`, border: `1px solid ${details.accentColor}50`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: details.accentColor, fontSize: "11px", fontWeight: 800 }}>{idx + 1}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.65, margin: 0, paddingTop: "3px" }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de download */}
        <button
          onClick={() => downloadDiagnostico(model)}
          className="lgm-btn-pulse"
          style={{
            background: "#39ff14",
            color: "#050f05",
            border: "none",
            borderRadius: "10px",
            padding: "15px 24px",
            fontSize: "15px",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px",
            letterSpacing: "0.3px",
          }}
        >
          <Download size={16} />
          Baixar meu diagnóstico
        </button>

        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", textAlign: "center", marginTop: "16px" }}>
          LED GROWTH MODELS · Diagnóstico gerado em {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
