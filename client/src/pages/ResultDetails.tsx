import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertCircle, Target, TrendingUp, Download } from "lucide-react";
import { useState } from "react";

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
        title: "Focar em Relacionamento",
        description: "Mantenha contato regular. Entenda os problemas do cliente. Seja consultivo, não apenas vendedor. Isso gera confiança.",
      },
      {
        title: "Otimizar Comissões",
        description: "Crie estrutura de comissões que motiva vendedores a fechar mais e manter clientes. Bônus por retenção também funciona.",
      },
    ],

    internalActions: [
      "Montar equipe de vendas com experiência",
      "Criar playbook de vendas documentado",
      "Implementar CRM para rastrear clientes",
      "Treinar vendedores regularmente",
      "Medir e acompanhar métricas de vendas (taxa de conversão, ticket médio, etc)",
      "Criar processo de onboarding para novos clientes",
    ],

    externalActions: [
      "Usar LinkedIn para encontrar decision makers",
      "Fazer cold calls e emails direcionados",
      "Participar de eventos e conferências da indústria",
      "Criar parcerias com consultores e agências",
      "Fazer apresentações e demos para prospects",
      "Construir relacionamento com clientes chave",
    ],

    nextSteps: [
      "Semana 1-2: Defina seu perfil de cliente ideal e crie lista de prospects",
      "Semana 3-4: Estruture seu pitch e material de vendas",
      "Mês 2: Comece a fazer contatos e agendar demos",
      "Mês 3: Implemente CRM e comece a rastrear pipeline",
      "Mês 4+: Contrate primeiro vendedor e replique processo",
    ],
  },

  PLG: {
    name: "Product-Led Growth",
    icon: "🎯",
    color: "from-purple-500 to-purple-600",
    shortDescription: "Seu crescimento é impulsionado pelo produto",
    
    overview: "No modelo Product-Led Growth, o próprio produto é o principal vendedor. Os usuários experimentam o produto gratuitamente, descobrem valor rapidamente e se convertem em clientes pagos. Este modelo funciona bem para SaaS, ferramentas de produtividade e soluções que são fáceis de usar.",
    
    howItWorks: [
      "Usuários acessam versão gratuita sem precisar falar com vendedor",
      "Experiência é tão boa que eles naturalmente querem versão paga",
      "Onboarding é otimizado para que entendam valor rapidamente",
      "Referências e word-of-mouth crescem organicamente",
      "Dados e feedback dos usuários guiam melhorias",
    ],

    strengths: [
      "Escalável sem aumentar custos com vendas",
      "Usuários experimentam antes de comprar",
      "Menores custos de aquisição",
      "Comunidade engajada e leal",
      "Feedback constante para melhorar produto",
    ],

    weaknesses: [
      "Requer produto muito bom desde o início",
      "Difícil para produtos complexos que precisam explicação",
      "Conversão de free para pago pode ser lenta",
      "Precisa de muitos usuários para gerar receita",
      "Difícil para produtos B2B enterprise",
    ],

    applicationStrategies: [
      {
        title: "Otimizar Onboarding",
        description: "Primeiros 5 minutos são críticos. Usuário precisa entender valor rapidamente. Use tours, tutoriais interativos e exemplos práticos.",
      },
      {
        title: "Criar Versão Gratuita Atrativa",
        description: "A versão gratuita precisa ser útil o suficiente para usuário usar regularmente, mas com limitações que o façam querer pagar.",
      },
      {
        title: "Focar em Retenção",
        description: "Usuários retidos viram clientes pagos. Envie dicas, atualizações, e mantenha contato. Use email e notificações no app.",
      },
      {
        title: "Incentivar Referências",
        description: "Crie programa de referência. Quando usuário traz amigo, ambos ganham algo. Isso cresce exponencialmente.",
      },
      {
        title: "Usar Dados para Melhorar",
        description: "Rastreie como usuários usam o produto. Onde eles desistem? Que features usam mais? Use isso para melhorar.",
      },
    ],

    internalActions: [
      "Melhorar continuamente a experiência do usuário",
      "Criar tutoriais e documentação clara",
      "Implementar analytics para entender comportamento",
      "Fazer testes A/B no onboarding",
      "Coletar feedback de usuários regularmente",
      "Criar roadmap baseado em feedback",
    ],

    externalActions: [
      "Postar tutoriais no YouTube mostrando como usar",
      "Criar reels no Instagram com dicas rápidas",
      "Escrever blog posts sobre como resolver problemas",
      "Participar de comunidades (Reddit, Discord) e ajudar",
      "Fazer webinars gratuitos sobre o tema",
      "Incentivar usuários a compartilhar nas redes",
    ],

    nextSteps: [
      "Semana 1-2: Analise primeiros 5 minutos da experiência",
      "Semana 3-4: Crie tutorial interativo para onboarding",
      "Mês 2: Implemente analytics para rastrear comportamento",
      "Mês 3: Crie programa de referência",
      "Mês 4+: Comece a fazer conteúdo educativo no YouTube",
    ],
  },

  MLG: {
    name: "Marketing-Led Growth",
    icon: "📢",
    color: "from-green-500 to-green-600",
    shortDescription: "Seu crescimento é impulsionado pelo marketing",
    
    overview: "No modelo Marketing-Led Growth, o marketing gera demanda através de conteúdo, publicidade e presença online. O foco está em atrair pessoas através de buscas, redes sociais e conteúdo de valor. Leads vêm educados e prontos para comprar.",
    
    howItWorks: [
      "Criar conteúdo de valor (blog, vídeos, podcasts)",
      "Otimizar para buscas (SEO) para aparecer no Google",
      "Usar publicidade (Google Ads, Instagram, LinkedIn)",
      "Capturar leads através de formulários",
      "Nutrir leads com email marketing",
      "Converter em clientes",
    ],

    strengths: [
      "Gera demanda consistente e previsível",
      "Leads vêm educados e qualificados",
      "Conteúdo fica disponível para sempre",
      "Escalável sem aumentar equipe proporcionalmente",
      "Custo por lead pode ser baixo",
    ],

    weaknesses: [
      "Requer investimento inicial em conteúdo",
      "Resultados levam tempo (3-6 meses)",
      "Competição por atenção é alta",
      "Precisa de expertise em marketing digital",
      "Publicidade pode ficar cara",
    ],

    applicationStrategies: [
      {
        title: "Criar Conteúdo de Valor",
        description: "Escreva blog posts, crie vídeos, faça podcasts sobre temas que seu cliente se importa. Não venda, eduque. Conteúdo é o novo marketing.",
      },
      {
        title: "Otimizar para SEO",
        description: "Use palavras-chave que seu cliente busca no Google. Escreva títulos e descrições que chamem atenção. Mais tráfego orgânico = menos custo.",
      },
      {
        title: "Usar Publicidade Estratégica",
        description: "Google Ads para quem busca solução. Instagram/TikTok para awareness. LinkedIn para B2B. Comece pequeno, teste, escale o que funciona.",
      },
      {
        title: "Capturar Leads",
        description: "Ofereça algo de valor (ebook, webinar, template) em troca de email. Isso constrói sua lista de contatos.",
      },
      {
        title: "Nutrir com Email",
        description: "Envie emails úteis regularmente. Mantenha seu nome em mente. Quando precisarem, vão lembrar de você.",
      },
    ],

    internalActions: [
      "Criar calendário de conteúdo para 3 meses",
      "Escrever 2-3 blog posts por semana",
      "Produzir vídeos para YouTube (1-2 por semana)",
      "Criar templates, guias, checklists para download",
      "Implementar email marketing",
      "Rastrear métricas (tráfego, leads, conversão)",
    ],

    externalActions: [
      "Postar 3-5 vezes por semana no Instagram",
      "Fazer reels curtos e virais no Instagram/TikTok",
      "Postar artigos no LinkedIn",
      "Investir em Google Ads para palavras-chave principais",
      "Investir em Instagram Ads para awareness",
      "Participar de comunidades online e ajudar",
    ],

    nextSteps: [
      "Semana 1-2: Pesquise palavras-chave que seu cliente busca",
      "Semana 3-4: Crie plano de conteúdo para 3 meses",
      "Mês 2: Comece a publicar blog posts (2-3 por semana)",
      "Mês 3: Crie primeiro vídeo para YouTube",
      "Mês 4+: Comece com publicidade paga (Google Ads ou Instagram)",
    ],
  },

  FLG: {
    name: "Founder-Led Growth",
    icon: "⭐",
    color: "from-red-500 to-red-600",
    shortDescription: "Seu crescimento é impulsionado pelo fundador",
    
    overview: "No modelo Founder-Led Growth, você é o principal motor de crescimento. Sua marca pessoal, rede e credibilidade atraem clientes. Você faz vendas, cria conteúdo, participa de eventos. Este modelo é comum em startups iniciais e para consultores.",
    
    howItWorks: [
      "Você constrói presença pessoal online (LinkedIn, Twitter, etc)",
      "Compartilha conhecimento e insights regularmente",
      "Sua rede e reputação geram oportunidades",
      "Você faz vendas diretas e relacionamentos",
      "Clientes compram porque confiam em você",
      "Referências crescem naturalmente",
    ],

    strengths: [
      "Rápido para começar (não precisa de estrutura)",
      "Custo baixo (usa sua própria rede)",
      "Relacionamentos são fortes e leais",
      "Feedback direto dos clientes",
      "Flexibilidade para pivotar",
    ],

    weaknesses: [
      "Não escalável (você é o gargalo)",
      "Dependência total em você",
      "Se você sair, negócio para",
      "Difícil de vender empresa depois",
      "Exige muito tempo seu",
    ],

    applicationStrategies: [
      {
        title: "Construir Presença Online",
        description: "Crie perfil profissional no LinkedIn. Poste regularmente sobre sua indústria. Compartilhe insights, aprendizados, histórias. Seja autêntico.",
      },
      {
        title: "Usar Sua Rede",
        description: "Converse com pessoas que conhece. Conte sobre o que está fazendo. Peça indicações. Sua rede é seu maior ativo.",
      },
      {
        title: "Fazer Vendas Diretas",
        description: "Não tenha medo de vender. Converse com potenciais clientes. Entenda seus problemas. Ofereça solução. Relacionamento é tudo.",
      },
      {
        title: "Criar Conteúdo Pessoal",
        description: "Escreva posts, faça vídeos, participe de podcasts. Compartilhe sua expertise. Isso constrói autoridade e atrai clientes.",
      },
      {
        title: "Participar de Comunidades",
        description: "Junte-se a grupos, eventos, conferências. Conheça pessoas. Ajude sem esperar retorno. Relacionamentos geram negócios.",
      },
    ],

    internalActions: [
      "Dedicar tempo diário para networking",
      "Postar regularmente no LinkedIn (3-5x por semana)",
      "Manter lista de contatos atualizada",
      "Fazer follow-up com potenciais clientes",
      "Documentar case studies e resultados",
      "Preparar pitch claro sobre o que você faz",
    ],

    externalActions: [
      "Participar de eventos e conferências da indústria",
      "Fazer podcasts como convidado",
      "Escrever artigos em publicações importantes",
      "Participar de comunidades online (Slack, Discord, etc)",
      "Fazer lives no Instagram/LinkedIn compartilhando conhecimento",
      "Conectar-se com influenciadores e parceiros",
    ],

    nextSteps: [
      "Semana 1-2: Otimize seu perfil do LinkedIn",
      "Semana 3-4: Comece a postar 3x por semana",
      "Mês 2: Converse com 10 pessoas da sua rede",
      "Mês 3: Participe de 1 evento ou webinar",
      "Mês 4+: Faça seu primeiro podcast como convidado",
    ],
  },
};

export default function ResultDetails() {
  const [match, params] = useRoute("/resultado/:model");
  const [, setLocation] = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadQRCode = (model: string) => {
    setIsDownloading(true);
    try {
      const details = modelDetails[model as keyof typeof modelDetails];
      
      // Create text content
      const textContent = `DIAGNÓSTICO DE LED GROWTH
================================================================================

${details.icon} ${details.name}
${details.shortDescription}

================================================================================

O QUE É?

${details.overview}

================================================================================

COMO FUNCIONA

${details.howItWorks.map((item, i) => `${i + 1}. ${item}`).join('\n')}

================================================================================

PONTOS FORTES

${details.strengths.map(item => `✓ ${item}`).join('\n')}

================================================================================

PONTOS FRACOS

${details.weaknesses.map(item => `✗ ${item}`).join('\n')}

================================================================================

O QUE FAZER AGORA

${details.applicationStrategies.map(s => `\n${s.title}\n${s.description}`).join('\n')}

================================================================================

AÇÕES INTERNAS

${details.internalActions.map(action => `• ${action}`).join('\n')}

================================================================================

AÇÕES EXTERNAS

${details.externalActions.map(action => `• ${action}`).join('\n')}

================================================================================

SEU PLANO DE AÇÃO

${details.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

================================================================================

Diagnóstico gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
Quiz de Led Growth - Descubra sua estratégia de crescimento predominante

================================================================================
`;

      // Create download link
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));
      element.setAttribute('download', `Diagnostico-${details.name.replace(/\s+/g, '-')}.txt`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error generating file:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Modelo não encontrado</h1>
          <Button onClick={() => setLocation("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Quiz
          </Button>
        </div>
      </div>
    );
  }

  const model = params?.model as string;
  const details = modelDetails[model as keyof typeof modelDetails];

  if (!details) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Modelo não encontrado</h1>
          <Button onClick={() => setLocation("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logo */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Quiz
          </Button>
          <img src="/images/un-logo.png" alt="UN Logo" className="h-12 mt-4" />
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            {details.icon} {details.name}
          </h1>
          <p className="text-xl text-gray-300">{details.shortDescription}</p>
        </div>

        {/* Overview */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">O Que É?</h2>
          <p className="text-gray-700 leading-relaxed">{details.overview}</p>
        </Card>

        {/* How It Works */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Como Funciona
          </h2>
          <ul className="space-y-3">
            {details.howItWorks.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-gray-700">
                <span className="text-blue-600 font-bold">{idx + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Strengths and Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Pontos Fortes
            </h2>
            <ul className="space-y-2">
              {details.strengths.map((strength, idx) => (
                <li key={idx} className="flex gap-2 text-gray-700 text-sm">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-white p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              Pontos Fracos
            </h2>
            <ul className="space-y-2">
              {details.weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex gap-2 text-gray-700 text-sm">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Application Strategies */}
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">O Que Fazer Agora</h2>
          <div className="space-y-6">
            {details.applicationStrategies.map((strategy, idx) => (
              <div key={idx} className="pb-6 border-b last:border-b-0">
                <h3 className="text-lg font-bold text-blue-600 mb-2">{strategy.title}</h3>
                <p className="text-gray-700">{strategy.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
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
        <Card className="bg-white p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Seu Plano de Ação
          </h2>
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
            onClick={() => downloadQRCode(model)}
            disabled={isDownloading}
            className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Gerando...' : 'Download Diagnóstico'}
          </Button>
          <Button
            onClick={() => setLocation("/")}
            className="flex-1 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Refazer Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
