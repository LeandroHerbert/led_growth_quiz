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
      "Equipe de vendedores faz contato direto com potenciais clientes",
      "Realiza apresentações e demonstrações do produto",
      "Negocia termos e preços customizados",
      "Relacionamento pessoal é crítico para fechar negócios",
      "Foco em contas maiores e contratos de alto valor",
    ],

    strengths: [
      "Ideal para produtos que precisam de explicação",
      "Permite negociação de preços e termos customizados",
      "Relacionamentos geram lealdade e retenção",
      "Eficaz para penetração em mercados grandes",
      "Receita previsível através de pipeline estruturado",
    ],

    weaknesses: [
      "Custo alto para adquirir cada cliente",
      "Difícil de crescer sem contratar mais vendedores",
      "Dependência de talentos em vendas",
      "Processo de venda é longo",
      "Menos eficaz para produtos baratos",
    ],

    applicationStrategies: [
      {
        title: "Estruturar Processo de Vendas",
        description: "Defina as etapas: quem você vai procurar → como vai fazer contato → o que vai falar → como vai fechar. Documente tudo para que outros vendedores possam replicar.",
      },
      {
        title: "Recrutar Vendedores Bons",
        description: "Contrate pessoas com experiência em vendas. Treine bem. Pague boas comissões para motivar. Um bom vendedor vale muito.",
      },
      {
        title: "Usar Ferramentas de Vendas",
        description: "Use CRM (como Pipedrive ou HubSpot) para rastrear cada cliente, saber em que etapa está, e prever quanto vai ganhar.",
      },
      {
        title: "Criar Materiais de Venda",
        description: "Prepare apresentações, cases de sucesso, comparações com concorrentes. Quanto melhor o material, mais fácil vender.",
      },
      {
        title: "Encontrar os Clientes Certos",
        description: "Defina exatamente quem é seu cliente ideal. Tamanho da empresa, setor, desafios. Isso ajuda vendedores a focar no que funciona.",
      },
    ],

    internalActions: [
      "Definir exatamente quem é seu cliente ideal",
      "Criar um processo de vendas claro em etapas",
      "Começar a recrutar primeiro vendedor",
      "Implementar CRM para rastrear clientes",
      "Criar apresentação e materiais de venda",
      "Estruturar comissões e incentivos",
    ],

    externalActions: [
      "Fazer lista de empresas que encaixam no seu perfil",
      "Fazer contato direto (email, LinkedIn, telefone)",
      "Participar de eventos e conferências do setor",
      "Pedir referências de clientes satisfeitos",
      "Fazer parcerias com consultores ou agências",
      "Usar LinkedIn para encontrar decision makers",
    ],

    nextSteps: [
      "Semana 1-2: Definir quem é seu cliente ideal e criar lista",
      "Semana 3-4: Começar contatos e primeiras apresentações",
      "Mês 2: Implementar CRM e treinar primeiro vendedor",
      "Mês 3+: Escalar prospecção e otimizar processo",
    ],
  },

  PLG: {
    name: "Product-Led Growth",
    icon: "🎯",
    color: "from-purple-500 to-purple-600",
    shortDescription: "O produto é seu vendedor",

    overview: "No modelo Product-Led Growth, o próprio produto é o principal canal de aquisição. Usuários experimentam o produto (versão gratuita, free trial ou demo) e fazem upgrade quando percebem valor. Este modelo é ideal para SaaS, ferramentas, apps e produtos com proposta de valor clara e rápido 'momento aha'.",

    howItWorks: [
      "Usuários acessam versão gratuita sem barreiras",
      "Onboarding simples guia usuários ao 'momento aha'",
      "Usuários fazem upgrade quando precisam de mais",
      "Ciclo de vendas muito curto (dias/semanas)",
      "Foco em experiência do usuário e retenção",
    ],

    strengths: [
      "Custo muito baixo para adquirir cliente",
      "Escalável sem aumentar equipe proporcionalmente",
      "Feedback direto de usuários sobre o produto",
      "Ciclo de vendas muito mais rápido",
      "Usuários já conhecem o produto antes de pagar",
    ],

    weaknesses: [
      "Requer produto muito intuitivo",
      "Difícil para produtos complexos",
      "Altas taxas de churn se onboarding for ruim",
      "Precisa de grande volume de usuários",
      "Menos eficaz para produtos de alto preço",
    ],

    applicationStrategies: [
      {
        title: "Simplificar o Onboarding",
        description: "Quando alguém entra no seu produto, em 5 minutos precisa entender o valor. Use dicas na tela, tutoriais rápidos, exemplos. Remova tudo que não é essencial.",
      },
      {
        title: "Oferecer Versão Gratuita ou Trial",
        description: "Deixe as pessoas usarem gratuitamente ou por 14-30 dias. Coloque as funcionalidades mais importantes no plano pago, para que vejam valor antes de pagar.",
      },
      {
        title: "Manter Usuários Engajados",
        description: "Envie emails, notificações, mensagens no app para manter usuários usando. Use dados para saber quando alguém está prestes a parar.",
      },
      {
        title: "Usar Dados para Melhorar",
        description: "Rastreie: onde usuários ficam presos, onde desistem, qual é o caminho para upgrade. Use essas informações para melhorar o produto.",
      },
      {
        title: "Criar Planos de Preço Inteligentes",
        description: "Crie planos que façam sentido: básico (gratuito), intermediário, premium. Coloque features importantes em planos pagos.",
      },
    ],

    internalActions: [
      "Identificar o 'momento aha' do seu produto (quando usuário vê valor)",
      "Redesenhar onboarding para ser mais simples",
      "Implementar analytics para rastrear comportamento",
      "Criar planos de preço e estrutura freemium",
      "Definir métricas: quantos fazem upgrade, quantos desistem",
      "Estruturar equipe de produto e design",
    ],

    externalActions: [
      "Pedir feedback de usuários em redes sociais",
      "Participar de comunidades onde seu público está",
      "Criar conteúdo no YouTube mostrando como usar",
      "Fazer posts no Instagram/TikTok com dicas de uso",
      "Criar blog com tutoriais e guias",
      "Incentivar usuários a indicar para amigos",
    ],

    nextSteps: [
      "Semana 1-2: Mapear jornada do usuário e identificar problemas",
      "Semana 3-4: Redesenhar onboarding",
      "Mês 2: Implementar analytics e começar testes",
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
      "Criar conteúdo que atrai seu público (blog, vídeos, Instagram)",
      "Otimizar para aparecer em buscas (Google, YouTube)",
      "Usar publicidade paga (Google Ads, Instagram, LinkedIn)",
      "Leads chegam já qualificados e interessados",
      "Equipe de vendas foca em fechar leads já quentes",
    ],

    strengths: [
      "Leads chegam já qualificados",
      "Conteúdo continua gerando leads mesmo dormindo",
      "Escalável através de publicidade paga",
      "Custo por lead pode ser muito competitivo",
      "Construi autoridade e credibilidade",
    ],

    weaknesses: [
      "Requer investimento consistente em conteúdo",
      "Resultados de SEO levam tempo (3-6+ meses)",
      "Dependência de publicidade paga para escalar",
      "Requer conhecimento em marketing digital",
      "Menos eficaz para produtos muito niche",
    ],

    applicationStrategies: [
      {
        title: "Criar Conteúdo que Atrai",
        description: "Faça blog posts, vídeos no YouTube, reels no Instagram sobre os problemas que seus clientes têm. Quanto mais conteúdo útil, mais pessoas encontram você.",
      },
      {
        title: "Aparecer no Google",
        description: "Escreva sobre palavras que seu cliente busca. Otimize o blog, crie conteúdo de qualidade. Leva tempo, mas depois gera leads gratuitamente.",
      },
      {
        title: "Usar Publicidade Paga",
        description: "Invista em Google Ads, Instagram Ads, LinkedIn Ads. Teste diferentes mensagens e públicos. Duplique o que funciona.",
      },
      {
        title: "Email Marketing",
        description: "Construa lista de emails. Envie conteúdo útil regularmente. Quando alguém está pronto para comprar, já conhece você.",
      },
      {
        title: "Redes Sociais",
        description: "Poste regularmente no Instagram, TikTok, LinkedIn. Compartilhe dicas, cases, histórias. Quanto mais engajado, mais pessoas conhecem.",
      },
    ],

    internalActions: [
      "Definir quem é seu cliente ideal e o que ele busca",
      "Criar calendário de conteúdo (blog, vídeos, posts)",
      "Começar blog e otimizar para Google",
      "Configurar Google Analytics para rastrear resultados",
      "Criar templates de email e sequências",
      "Definir métricas: quanto custa cada lead, quantos viram clientes",
    ],

    externalActions: [
      "Publicar 2-3 posts de blog por semana",
      "Fazer 1-2 vídeos por semana no YouTube",
      "Postar diariamente no Instagram/TikTok",
      "Começar campanhas de publicidade paga",
      "Participar de comunidades e fóruns",
      "Fazer parcerias com outros criadores de conteúdo",
    ],

    nextSteps: [
      "Semana 1-2: Pesquisar o que seu cliente busca no Google",
      "Semana 3-4: Publicar 3-5 posts de blog otimizados",
      "Mês 2: Começar canal no YouTube e Instagram",
      "Mês 3+: Começar publicidade paga e analisar resultados",
    ],
  },

  FLG: {
    name: "Founder-Led Growth",
    icon: "⭐",
    color: "from-red-500 to-red-600",
    shortDescription: "Você é o vendedor",

    overview: "No modelo Founder-Led Growth, o fundador é o principal motor de crescimento. Através da sua marca pessoal, rede de contatos, credibilidade e presença, você atrai clientes e constrói autoridade no mercado. Este modelo é comum em startups iniciais, consultoria, coaching e produtos onde a visão do fundador é diferencial.",

    howItWorks: [
      "Você vende pessoalmente aos primeiros clientes",
      "Constrói marca pessoal em redes sociais",
      "Participa de eventos e comunidades",
      "Relacionamentos pessoais geram referências",
      "Credibilidade atrai investidores e parceiros",
    ],

    strengths: [
      "Custo muito baixo para adquirir cliente",
      "Relacionamentos geram lealdade",
      "Velocidade para validar produto",
      "Atrai investidores e parceiros",
      "Diferencial competitivo claro",
    ],

    weaknesses: [
      "Não é escalável (depende de você)",
      "Risco de cansaço e burnout",
      "Difícil de delegar quando cresce",
      "Cultura pode ficar dependente de você",
      "Transição para modelo escalável é desafiadora",
    ],

    applicationStrategies: [
      {
        title: "Construir Presença no LinkedIn",
        description: "Compartilhe sua jornada, aprendizados, dicas sobre seu setor. Seja autêntico. Construa seguidores ao redor de sua visão. Isso atrai clientes e parceiros.",
      },
      {
        title: "Usar Instagram e TikTok",
        description: "Faça vídeos curtos mostrando sua expertise, dia a dia, dicas rápidas. Pessoas se conectam com pessoas, não com empresas. Seja você mesmo.",
      },
      {
        title: "Criar Blog e YouTube",
        description: "Compartilhe conhecimento profundo em blog posts e vídeos. Isso posiciona você como especialista e atrai clientes que já confiam em você.",
      },
      {
        title: "Ativar Sua Rede",
        description: "Converse com pessoas que conhece. Pense em quem pode se beneficiar do seu produto. Peça indicações. Relacionamentos geram negócios.",
      },
      {
        title: "Participar de Comunidades",
        description: "Encontre grupos e comunidades onde seu público está. Participe, ajude, agregue valor. Não venda, apenas seja útil. Negócios virão naturalmente.",
      },
    ],

    internalActions: [
      "Definir sua visão e o que te diferencia",
      "Criar perfil profissional no LinkedIn",
      "Começar a postar regularmente",
      "Mapear sua rede de contatos",
      "Documentar como você vende",
      "Começar a recrutar alguém para ajudar",
    ],

    externalActions: [
      "Postar 2-3 vezes por semana no LinkedIn",
      "Fazer reels no Instagram/TikTok semanalmente",
      "Começar blog ou YouTube com conteúdo profundo",
      "Participar de eventos e conferências do setor",
      "Fazer podcasts e entrevistas",
      "Construir relacionamentos com líderes do mercado",
    ],

    nextSteps: [
      "Semana 1-2: Criar/atualizar perfil LinkedIn e começar a postar",
      "Semana 3-4: Fazer 3-5 posts de conteúdo pessoal",
      "Mês 2: Começar Instagram/TikTok ou YouTube",
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
          <h2 className="text-2xl font-bold mb-4">O que é?</h2>
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
            O que Fazer Agora
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
            <p className="text-sm text-gray-600 mb-4">O que fazer dentro da empresa:</p>
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
            <p className="text-sm text-gray-600 mb-4">O que fazer no mercado:</p>
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
          <h2 className="text-2xl font-bold mb-6">Seu Plano de Ação</h2>
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
