import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertCircle, Target, TrendingUp, Download } from "lucide-react";
import { useState } from "react";

const modelDetails = {
  SLG: {
    name: "Sales-Led Growth",
    icon: "📞",
    color: "from-blue-500 to-blue-600",
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
      {
        title: "Estruture seu Processo Comercial",
        description: "Mapeie as etapas da venda: prospecção, qualificação, apresentação, proposta e fechamento. Documente tudo em um playbook para que outros vendedores possam replicar com consistência.",
      },
      {
        title: "Invista em Ferramentas de CRM",
        description: "Use um CRM (como Pipedrive, HubSpot ou RD Station CRM) para registrar cada contato, acompanhar o estágio de cada negociação e prever receita futura com mais precisão.",
      },
      {
        title: "Recrute e Treine Bem",
        description: "Contrate vendedores com perfil consultivo, não apenas transacional. Treine com frequência sobre o produto, o mercado e as objeções mais comuns. Bons vendedores multiplicam resultados.",
      },
      {
        title: "Seja Consultivo, Não Apenas Vendedor",
        description: "Entenda o problema do cliente antes de apresentar a solução. Quanto mais o vendedor ajuda, mais confiança gera — e mais fácil se torna fechar e reter o cliente.",
      },
      {
        title: "Crie Metas e Incentivos Claros",
        description: "Defina metas de vendas mensuráveis e crie uma estrutura de comissões que motive o time. Bônus por retenção de clientes também ajudam a alinhar o comercial com o sucesso do cliente.",
      },
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
    color: "from-purple-500 to-purple-600",
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
      {
        title: "Simplifique o Primeiro Uso",
        description: "O usuário precisa chegar ao 'momento aha' — aquele instante em que percebe o valor do produto — o mais rápido possível. Remova etapas desnecessárias no cadastro e no onboarding.",
      },
      {
        title: "Crie uma Versão Gratuita Estratégica",
        description: "Ofereça funcionalidades genuinamente úteis de graça, mas com limites que incentivem o upgrade. O objetivo é gerar dependência positiva, não frustração.",
      },
      {
        title: "Invista em Experiência do Usuário",
        description: "Produto rápido, intuitivo e bonito retém mais. Se o usuário precisa de um tutorial longo para começar, algo precisa ser simplificado. Design e usabilidade são parte do produto.",
      },
      {
        title: "Crie Mecanismos de Viralidade",
        description: "Facilite o compartilhamento dentro do produto: convites para colaboradores, exportações com marca, templates públicos. Quanto mais o produto se espalha pelo uso, menor o custo de aquisição.",
      },
      {
        title: "Meça e Otimize a Conversão",
        description: "Acompanhe onde os usuários desistem. Use dados para identificar o ponto de maior abandono e teste melhorias. Pequenas mudanças no onboarding podem ter grande impacto na receita.",
      },
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
    color: "from-green-500 to-green-600",
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
      {
        title: "Produza Conteúdo que Resolve Problemas",
        description: "Publique artigos, vídeos e posts que respondem às dúvidas reais do seu público. Conteúdo educativo gera confiança e atrai pessoas no momento em que estão buscando soluções.",
      },
      {
        title: "Invista em SEO",
        description: "Otimize seu site para aparecer no Google quando seu público busca pelo problema que você resolve. Pesquise as palavras-chave certas e crie conteúdo em torno delas de forma consistente.",
      },
      {
        title: "Use Anúncios Pagos com Inteligência",
        description: "Teste Google Ads, Instagram Ads e LinkedIn Ads. Comece com orçamento pequeno, meça o retorno e escale apenas o que funciona. Foque em ROI, não em alcance.",
      },
      {
        title: "Construa Presença nas Redes Sociais",
        description: "Publique com regularidade no Instagram, LinkedIn ou YouTube. Compartilhe casos reais, bastidores, dicas e resultados. Engajamento consistente constrói audiência e gera oportunidades.",
      },
      {
        title: "Nutra seus Leads com E-mail",
        description: "Capture contatos e mantenha uma comunicação regular por e-mail. Envie conteúdo útil antes de tentar vender. Leads bem nutridos convertem mais e com menos resistência.",
      },
    ],

    internalActions: [
      "Definir personas e mapear a jornada de compra do cliente ideal",
      "Criar calendário editorial com frequência e canais definidos",
      "Implementar ferramentas de automação de marketing (RD Station, HubSpot, etc.)",
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
    color: "from-amber-500 to-orange-500",
    shortDescription: "Seu crescimento é impulsionado pela presença e credibilidade do fundador.",

    overview: "No modelo Founder-Led Growth, o fundador é o principal ativo de crescimento do negócio. Sua expertise, rede de contatos, reputação e presença pública atraem clientes, parceiros e oportunidades. Este modelo é muito comum em estágios iniciais e funciona especialmente bem para consultorias, serviços especializados, infoprodutos e negócios onde a confiança pessoal é determinante para a decisão de compra.",

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
      {
        title: "Construa sua Presença Digital Pessoal",
        description: "Publique com regularidade no LinkedIn, Instagram ou TikTok. Compartilhe aprendizados, bastidores, opiniões e resultados reais. Autenticidade e consistência constroem audiência e autoridade.",
      },
      {
        title: "Ative sua Rede de Contatos",
        description: "Converse com ex-colegas, parceiros e conhecidos. Peça indicações de forma direta e natural. Participe de eventos, grupos e comunidades onde seu público está presente.",
      },
      {
        title: "Crie Conteúdo que Demonstra Expertise",
        description: "Escreva artigos, grave vídeos ou participe de podcasts. Compartilhe sua visão sobre o mercado. Isso atrai oportunidades de forma passiva e posiciona você como referência no setor.",
      },
      {
        title: "Seja Consultivo Antes de Vender",
        description: "Ajude pessoas gratuitamente. Responda perguntas. Ofereça valor antes de apresentar uma proposta. Quem recebe ajuda genuína tende a comprar e a indicar.",
      },
      {
        title: "Planeje a Transição para um Modelo Escalável",
        description: "Documente processos, contrate as primeiras pessoas certas e comece a delegar tarefas operacionais. O objetivo é crescer sem que tudo dependa exclusivamente de você.",
      },
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

export default function ResultDetails() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/resultado/:model");
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadDiagnostico = async (modelKey: string) => {
    setIsDownloading(true);
    try {
      const details = modelDetails[modelKey as keyof typeof modelDetails];
      if (!details) {
        alert("Modelo inválido");
        return;
      }

      const textContent = `
═══════════════════════════════════════════════════════════════
  DIAGNÓSTICO — LED GROWTH MODELS
═══════════════════════════════════════════════════════════════

${details.icon}  ${details.name.toUpperCase()}
${details.shortDescription}

───────────────────────────────────────────────────────────────
O QUE É ESTE MODELO?
───────────────────────────────────────────────────────────────

${details.overview}

───────────────────────────────────────────────────────────────
COMO FUNCIONA
───────────────────────────────────────────────────────────────

${details.howItWorks.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

───────────────────────────────────────────────────────────────
PONTOS FORTES
───────────────────────────────────────────────────────────────

${details.strengths.map(s => `✓  ${s}`).join('\n')}

───────────────────────────────────────────────────────────────
PONTOS DE ATENÇÃO
───────────────────────────────────────────────────────────────

${details.weaknesses.map(w => `✗  ${w}`).join('\n')}

───────────────────────────────────────────────────────────────
ESTRATÉGIAS DE APLICAÇÃO
───────────────────────────────────────────────────────────────

${details.applicationStrategies.map((s, idx) => `${idx + 1}. ${s.title}\n   ${s.description}`).join('\n\n')}

───────────────────────────────────────────────────────────────
AÇÕES INTERNAS
───────────────────────────────────────────────────────────────

${details.internalActions.map(a => `•  ${a}`).join('\n')}

───────────────────────────────────────────────────────────────
AÇÕES EXTERNAS
───────────────────────────────────────────────────────────────

${details.externalActions.map(a => `•  ${a}`).join('\n')}

───────────────────────────────────────────────────────────────
SEU PLANO DE AÇÃO
───────────────────────────────────────────────────────────────

${details.nextSteps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

═══════════════════════════════════════════════════════════════
Diagnóstico gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
LED GROWTH MODELS — Descubra o Modelo Ideal de Crescimento para seu negócio
═══════════════════════════════════════════════════════════════
      `.trim();

      const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `Diagnostico-${details.name.replace(/\s+/g, '-')}.txt`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao gerar download:', error);
      alert('Erro ao gerar o download. Por favor, tente novamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-white p-8">
          <p className="text-gray-900">Modelo não encontrado</p>
          <Button onClick={() => setLocation("/")} className="mt-4">
            Voltar ao Quiz
          </Button>
        </Card>
      </div>
    );
  }

  const model = params?.model || "";
  const details = modelDetails[model as keyof typeof modelDetails];

  if (!details) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-white p-8">
          <p className="text-gray-900">Modelo inválido</p>
          <Button onClick={() => setLocation("/")} className="mt-4">
            Voltar ao Quiz
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Quiz
          </Button>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Seu Diagnóstico Completo
          </h1>
          <p className="text-xl text-gray-300">
            Recomendações estratégicas e plano de ação para o seu modelo
          </p>
        </div>

        {/* Primary Model */}
        <Card className={`bg-gradient-to-r ${details.color} rounded-lg p-8 text-white mb-8`}>
          <div className="text-5xl mb-4">{details.icon}</div>
          <h2 className="text-3xl font-bold mb-3">{details.name}</h2>
          <p className="text-lg opacity-90">{details.shortDescription}</p>
        </Card>

        {/* Overview */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            O Que É Este Modelo?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">{details.overview}</p>
        </Card>

        {/* How It Works */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Como Funciona
          </h2>
          <div className="space-y-4">
            {details.howItWorks.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">{idx + 1}</span>
                </div>
                <p className="text-gray-700 pt-1">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Pontos Fortes
            </h2>
            <div className="space-y-3">
              {details.strengths.map((strength, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <p className="text-gray-700">{strength}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              Pontos de Atenção
            </h2>
            <div className="space-y-3">
              {details.weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <p className="text-gray-700">{weakness}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Application Strategies */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Estratégias de Aplicação</h2>
          <div className="space-y-4">
            {details.applicationStrategies.map((strategy, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded"
              >
                <h3 className="font-bold text-blue-900 mb-2">{strategy.title}</h3>
                <p className="text-gray-700">{strategy.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Internal Actions */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Ações Internas</h2>
          <div className="space-y-3">
            {details.internalActions.map((action, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-xs">•</span>
                </div>
                <p className="text-gray-700 pt-0.5">{action}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* External Actions */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Ações Externas</h2>
          <div className="space-y-3">
            {details.externalActions.map((action, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-700 font-bold text-xs">•</span>
                </div>
                <p className="text-gray-700 pt-0.5">{action}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Seu Plano de Ação</h2>
          <div className="space-y-4">
            {details.nextSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-700 font-bold text-sm">{idx + 1}</span>
                </div>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <div className="flex gap-4 w-full mt-8">
          <Button
            onClick={() => downloadDiagnostico(model)}
            disabled={isDownloading}
            className="w-full gap-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Gerando Download...' : 'Download do Diagnóstico'}
          </Button>
        </div>
      </div>
    </div>
  );
}
