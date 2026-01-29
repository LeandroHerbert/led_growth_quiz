import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertCircle, Target, TrendingUp } from "lucide-react";

const modelDetails = {
  SLG: {
    name: "Sales-Led Growth",
    icon: "📞",
    color: "from-blue-500 to-blue-600",
    shortDescription: "Seu crescimento é impulsionado pela equipe de vendas",
    
    overview: "No modelo Sales-Led Growth, a equipe de vendas é o motor principal de aquisição de clientes. Este modelo é particularmente eficaz para produtos B2B complexos, soluções enterprise e serviços que requerem customização. O foco está em construir relacionamentos diretos, entender necessidades específicas e negociar contratos de alto valor.",
    
    howItWorks: [
      "Equipe de SDRs qualifica leads através de prospecção outbound",
      "Account Executives conduzem demos e negociações",
      "Ciclo de vendas longo (3-6+ meses) com múltiplos stakeholders",
      "Relacionamento pessoal é crítico para fechar negócios",
      "Foco em grandes contas e contratos de alto valor",
    ],

    strengths: [
      "Ideal para produtos complexos que precisam de explicação",
      "Permite negociação de preços e termos customizados",
      "Relacionamentos pessoais geram lealdade e retenção",
      "Eficaz para penetração em mercados enterprise",
      "Previsibilidade de receita através de pipeline estruturado",
    ],

    weaknesses: [
      "Alto custo de aquisição (CAC) por cliente",
      "Difícil de escalar sem aumentar equipe proporcionalmente",
      "Dependência de talentos em vendas",
      "Ciclo de vendas longo reduz velocidade de crescimento",
      "Menos eficaz para produtos self-service ou baixo preço",
    ],

    applicationStrategies: [
      {
        title: "Estruturar Processo de Vendas",
        description: "Defina um funil claro: prospecção → qualificação → demo → negociação → fechamento. Documente cada etapa e crie playbooks para cada fase.",
      },
      {
        title: "Recrutar Talento de Vendas",
        description: "Contrate vendedores experientes com track record comprovado. Invista em treinamento contínuo e desenvolvimento de habilidades.",
      },
      {
        title: "Usar CRM Eficientemente",
        description: "Implemente um CRM robusto (Salesforce, HubSpot, Pipedrive) para rastrear pipeline, prever receita e identificar gargalos.",
      },
      {
        title: "Desenvolver Argumentos de Venda",
        description: "Crie materiais de vendas convincentes: case studies, ROI calculators, comparativas com concorrentes.",
      },
      {
        title: "Otimizar Comissões e Incentivos",
        description: "Estruture planos de comissão que motivem vendedores a fechar negócios maiores e manter clientes satisfeitos.",
      },
    ],

    internalActions: [
      "Criar job descriptions e começar recrutamento de SDRs e AEs",
      "Implementar CRM e treinar equipe",
      "Definir ICP (Ideal Customer Profile) e buyer personas",
      "Criar sales playbook e scripts de vendas",
      "Estabelecer métricas: CAC, LTV, sales cycle, win rate",
      "Estruturar programa de onboarding para novos vendedores",
    ],

    externalActions: [
      "Prospectar empresas que se encaixam no ICP",
      "Participar de eventos e conferências do setor",
      "Construir relacionamentos com decision makers",
      "Criar conteúdo que educue sobre o problema (webinars, whitepapers)",
      "Buscar referências de clientes satisfeitos",
      "Considerar parcerias com consultores ou agências",
    ],

    nextSteps: [
      "Semana 1-2: Definir ICP e criar sales playbook",
      "Semana 3-4: Começar recrutamento de primeiro SDR/AE",
      "Mês 2: Implementar CRM e treinar equipe",
      "Mês 3+: Escalar prospecção e otimizar funil",
    ],
  },

  PLG: {
    name: "Product-Led Growth",
    icon: "🎯",
    color: "from-purple-500 to-purple-600",
    shortDescription: "O produto é seu vendedor",

    overview: "No modelo Product-Led Growth, o próprio produto é o principal canal de aquisição. Usuários experimentam o produto (versão gratuita, free trial ou demo interativa) e fazem upgrade quando percebem valor. Este modelo é ideal para SaaS, ferramentas, apps e produtos com proposta de valor clara e rápido 'momento aha'.",

    howItWorks: [
      "Usuários acessam versão gratuita ou trial sem barreiras",
      "Onboarding intuitivo guia usuários ao 'momento aha'",
      "Usuários fazem upgrade quando precisam de mais funcionalidades",
      "Ciclo de vendas muito curto (dias/semanas)",
      "Foco em experiência do usuário e retenção",
    ],

    strengths: [
      "Custo de aquisição (CAC) muito baixo ou zero",
      "Escalável sem aumentar equipe proporcionalmente",
      "Feedback direto de usuários sobre o produto",
      "Ciclo de vendas muito mais rápido",
      "Usuários já conhecem o produto antes de pagar",
      "Ideal para produtos com proposta de valor clara",
    ],

    weaknesses: [
      "Requer produto intuitivo e bem pensado",
      "Difícil para produtos complexos ou B2B enterprise",
      "Altas taxas de churn se onboarding for ruim",
      "Precisa de grande volume de usuários",
      "Menos eficaz para produtos de alto preço",
    ],

    applicationStrategies: [
      {
        title: "Otimizar Onboarding",
        description: "Crie um onboarding que leve usuários ao 'momento aha' em minutos. Remova fricções e guie com tooltips e walkthroughs.",
      },
      {
        title: "Implementar Freemium ou Free Trial",
        description: "Oferça versão gratuita com limitações ou trial de 14-30 dias. Certifique-se que usuários vejam valor antes do trial expirar.",
      },
      {
        title: "Criar Loops de Engajamento",
        description: "Mantenha usuários engajados com notificações, email, in-app messaging. Use dados para identificar quando usuários estão prestes a fazer churn.",
      },
      {
        title: "Otimizar Pricing e Planos",
        description: "Crie planos que façam sentido para diferentes segmentos. Coloque features críticas em planos pagos.",
      },
      {
        title: "Usar Dados para Melhorar",
        description: "Rastreie comportamento de usuários: onde eles ficam presos, onde fazem churn, qual é o caminho para upgrade.",
      },
    ],

    internalActions: [
      "Mapear o 'momento aha' do seu produto",
      "Redesenhar onboarding para ser mais intuitivo",
      "Implementar analytics (Mixpanel, Amplitude, Segment)",
      "Criar planos de preço e estrutura de freemium",
      "Definir métricas: CAC, LTV, churn rate, upgrade rate",
      "Estruturar equipe de product e design",
    ],

    externalActions: [
      "Buscar feedback de usuários em redes sociais e comunidades",
      "Participar de comunidades onde seu público está",
      "Criar conteúdo educativo sobre como usar o produto",
      "Incentivar word-of-mouth através de programa de referência",
      "Considerar parcerias com influenciadores ou reviewers",
    ],

    nextSteps: [
      "Semana 1-2: Mapear jornada do usuário e identificar fricções",
      "Semana 3-4: Redesenhar onboarding",
      "Mês 2: Implementar analytics e começar testes A/B",
      "Mês 3+: Iterar baseado em dados de usuário",
    ],
  },

  MLG: {
    name: "Marketing-Led Growth",
    icon: "📢",
    color: "from-green-500 to-green-600",
    shortDescription: "Marketing gera demanda",

    overview: "No modelo Marketing-Led Growth, marketing é o motor principal de geração de demanda. Através de conteúdo, SEO, publicidade paga, email e inbound marketing, você atrai leads qualificados que já estão interessados em sua solução. Este modelo é ideal para B2B SaaS, agências, consultoria e produtos com ciclo de vendas moderado.",

    howItWorks: [
      "Criar conteúdo que atrai seu público-alvo (blog, vídeos, webinars)",
      "Otimizar para SEO para aparecer em buscas relevantes",
      "Usar publicidade paga (Google Ads, LinkedIn, Facebook) para escalar",
      "Leads chegam já qualificados e interessados",
      "Equipe de vendas foca em fechar leads já quentes",
    ],

    strengths: [
      "Leads chegam já qualificados e interessados",
      "Conteúdo continua gerando leads mesmo dormindo",
      "Escalável através de publicidade paga",
      "Custo por lead pode ser muito competitivo",
      "Construi autoridade e credibilidade no mercado",
      "Ideal para produtos com proposta de valor clara",
    ],

    weaknesses: [
      "Requer investimento consistente em conteúdo",
      "Resultados de SEO levam tempo (3-6+ meses)",
      "Dependência de publicidade paga para escalar rápido",
      "Requer expertise em marketing digital",
      "Menos eficaz para produtos muito niche",
    ],

    applicationStrategies: [
      {
        title: "Criar Estratégia de Conteúdo",
        description: "Defina tópicos que seu público busca. Crie blog posts, vídeos, podcasts, webinars que educam e posicionam sua marca.",
      },
      {
        title: "Otimizar para SEO",
        description: "Pesquise keywords, otimize on-page SEO, construa backlinks. Foco em long-tail keywords com menos concorrência.",
      },
      {
        title: "Escalar com Publicidade Paga",
        description: "Use Google Ads, LinkedIn Ads, Facebook Ads para escalar. Teste diferentes mensagens e públicos.",
      },
      {
        title: "Implementar Email Marketing",
        description: "Construa lista de emails. Use sequências automáticas para nutrir leads e convertê-los em clientes.",
      },
      {
        title: "Medir e Otimizar",
        description: "Rastreie ROI de cada canal. Duplique o que funciona, pause o que não funciona.",
      },
    ],

    internalActions: [
      "Definir buyer personas e customer journey",
      "Criar calendário editorial de conteúdo",
      "Implementar blog e otimizar para SEO",
      "Configurar Google Analytics e rastreamento de conversão",
      "Criar templates de email e sequências",
      "Definir métricas: CAC, LTV, conversion rate, ROI",
    ],

    externalActions: [
      "Publicar conteúdo regularmente em blog e redes sociais",
      "Participar de comunidades e fóruns relevantes",
      "Guest posts em blogs de autoridade",
      "Criar campanhas de publicidade paga",
      "Fazer parcerias com outros criadores de conteúdo",
      "Considerar influenciadores ou partnerships",
    ],

    nextSteps: [
      "Semana 1-2: Pesquisar keywords e definir tópicos de conteúdo",
      "Semana 3-4: Publicar 3-5 posts de blog otimizados",
      "Mês 2: Implementar email marketing e começar campanhas pagas",
      "Mês 3+: Analisar dados e otimizar canais com melhor ROI",
    ],
  },

  FLG: {
    name: "Founder-Led Growth",
    icon: "⭐",
    color: "from-red-500 to-red-600",
    shortDescription: "Você é o vendedor",

    overview: "No modelo Founder-Led Growth, o fundador é o principal motor de crescimento. Através da sua marca pessoal, rede de contatos, credibilidade e presença, você atrai clientes e constrói autoridade no mercado. Este modelo é comum em startups iniciais, consultoria, coaching e produtos onde a visão do fundador é diferencial.",

    howItWorks: [
      "Fundador vende pessoalmente aos primeiros clientes",
      "Constrói marca pessoal em redes sociais e comunidades",
      "Participa de eventos, podcasts, conferências",
      "Relacionamentos pessoais geram referências e word-of-mouth",
      "Credibilidade do fundador atrai investidores e parceiros",
    ],

    strengths: [
      "Custo de aquisição (CAC) muito baixo",
      "Relacionamentos pessoais geram lealdade",
      "Velocidade para validar produto-mercado",
      "Atrai investidores e parceiros",
      "Diferencial competitivo claro",
      "Feedback direto de clientes",
    ],

    weaknesses: [
      "Não é escalável a longo prazo (depende do fundador)",
      "Risco de burnout do fundador",
      "Difícil de delegar quando cresce",
      "Cultura pode ficar excessivamente dependente do fundador",
      "Transição para modelo escalável é desafiadora",
    ],

    applicationStrategies: [
      {
        title: "Construir Marca Pessoal",
        description: "Comece a compartilhar sua expertise em LinkedIn, Twitter, blog. Seja autêntico e vulnerável. Construa audiência ao redor de sua visão.",
      },
      {
        title: "Ativar Rede Pessoal",
        description: "Mapeie sua rede. Comece conversas com pessoas que podem se beneficiar do seu produto. Peça referências.",
      },
      {
        title: "Participar de Comunidades",
        description: "Encontre comunidades onde seu público está. Participe, ajude, construa relacionamentos. Não venda, agregue valor.",
      },
      {
        title: "Criar Conteúdo Pessoal",
        description: "Compartilhe sua jornada, aprendizados, fracassos. Crie posts, artigos, vídeos que mostrem sua expertise.",
      },
      {
        title: "Planejar Transição",
        description: "Desde o início, documente seu processo de vendas. Recrute um vendedor que possa replicar seu estilo.",
      },
    ],

    internalActions: [
      "Definir sua visão e diferencial único",
      "Criar perfis em LinkedIn, Twitter, blog pessoal",
      "Começar a produzir conteúdo regularmente",
      "Mapear rede de contatos e identificar oportunidades",
      "Documentar processo de vendas e argumentos",
      "Estruturar equipe para começar a delegar",
    ],

    externalActions: [
      "Publicar conteúdo pessoal em redes sociais",
      "Participar de eventos e conferências do setor",
      "Fazer podcasts e entrevistas",
      "Construir relacionamentos com influenciadores e líderes",
      "Participar de comunidades online",
      "Fazer parcerias com outros fundadores",
    ],

    nextSteps: [
      "Semana 1-2: Criar perfis pessoais e começar a compartilhar",
      "Semana 3-4: Publicar 3-5 posts de conteúdo pessoal",
      "Mês 2: Começar conversas com rede pessoal",
      "Mês 3+: Participar de eventos e construir relacionamentos",
    ],
  },
};

export default function ResultDetails() {
  const [match, params] = useRoute("/resultado/:model");
  const [, setLocation] = useLocation();

  if (!match) {
    return null;
  }

  const model = params?.model?.toUpperCase() as keyof typeof modelDetails;
  const details = modelDetails[model];

  if (!details) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="bg-white p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Modelo não encontrado</h1>
          <Button onClick={() => setLocation("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
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
        <Button
          variant="outline"
          onClick={() => setLocation("/")}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Quiz
        </Button>

        {/* Title Section */}
        <div className={`bg-gradient-to-r ${details.color} rounded-lg p-8 text-white mb-8`}>
          <div className="text-5xl mb-4">{details.icon}</div>
          <h1 className="text-4xl font-bold mb-2">{details.name}</h1>
          <p className="text-lg opacity-90">{details.shortDescription}</p>
        </div>

        {/* Overview */}
        <Card className="bg-white mb-8 p-8">
          <h2 className="text-2xl font-bold mb-4">Visão Geral</h2>
          <p className="text-gray-700 leading-relaxed">{details.overview}</p>
        </Card>

        {/* How It Works */}
        <Card className="bg-white mb-8 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Como Funciona
          </h2>
          <ul className="space-y-3">
            {details.howItWorks.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <span className="text-blue-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Pontos Fortes
            </h2>
            <ul className="space-y-3">
              {details.strengths.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              Pontos Fracos
            </h2>
            <ul className="space-y-3">
              {details.weaknesses.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Application Strategies */}
        <Card className="bg-white mb-8 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Estratégias de Aplicação
          </h2>
          <div className="space-y-6">
            {details.applicationStrategies.map((strategy, idx) => (
              <div key={idx} className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{strategy.title}</h3>
                <p className="text-gray-700">{strategy.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Internal and External Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white p-8">
            <h2 className="text-xl font-bold mb-4">Ações Internas</h2>
            <p className="text-sm text-gray-600 mb-4">O que você deve fazer dentro da empresa:</p>
            <ul className="space-y-2">
              {details.internalActions.map((action, idx) => (
                <li key={idx} className="flex gap-2 text-gray-700 text-sm">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-white p-8">
            <h2 className="text-xl font-bold mb-4">Ações Externas</h2>
            <p className="text-sm text-gray-600 mb-4">O que você deve fazer no mercado:</p>
            <ul className="space-y-2">
              {details.externalActions.map((action, idx) => (
                <li key={idx} className="flex gap-2 text-gray-700 text-sm">
                  <span className="text-green-600 font-bold">→</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-white p-8">
          <h2 className="text-2xl font-bold mb-6">Próximos Passos (Roadmap)</h2>
          <div className="space-y-4">
            {details.nextSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => setLocation("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Refazer Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
