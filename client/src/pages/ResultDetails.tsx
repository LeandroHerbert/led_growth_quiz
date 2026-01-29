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
      "Semana 1-2: Documentar processo de vendas atual e identificar gaps",
      "Semana 3-4: Recrutar ou treinar vendedores para preencher gaps",
      "Mês 2: Implementar CRM e estruturar pipeline de vendas",
      "Mês 3: Começar a medir e otimizar métricas de conversão",
      "Mês 4+: Escalar equipe e processos conforme resultados",
    ],
  },

  PLG: {
    name: "Product-Led Growth",
    icon: "🎯",
    color: "from-purple-500 to-purple-600",
    shortDescription: "Seu crescimento é impulsionado pelo produto",
    
    overview: "No modelo Product-Led Growth, o próprio produto é o principal canal de aquisição e retenção. Os usuários descobrem valor rapidamente, experimentam sem fricção e convertem naturalmente. Este modelo funciona melhor para produtos intuitivos, com baixo ticket e fácil onboarding.",
    
    howItWorks: [
      "Usuários experimentam o produto gratuitamente ou com trial",
      "Produto é tão bom que eles continuam usando",
      "Upgrade para versão paga acontece naturalmente",
      "Produto se vende sozinho pela experiência",
      "Foco em facilitar uso e remover barreiras",
    ],

    strengths: [
      "Crescimento rápido e escalável",
      "Custo de aquisição baixo",
      "Produto se vende sozinho",
      "Usuários já conhecem o valor antes de pagar",
      "Viral: usuários trazem outros usuários",
    ],

    weaknesses: [
      "Produto precisa ser muito bom e fácil de usar",
      "Difícil para produtos complexos",
      "Requer investimento grande em produto",
      "Conversão de gratuito para pago pode ser baixa",
      "Competição alta em produtos simples",
    ],

    applicationStrategies: [
      {
        title: "Simplificar Onboarding",
        description: "Faça o primeiro uso ser rápido e fácil. Remova cadastros longos. Deixe o usuário experimentar antes de pedir informações.",
      },
      {
        title: "Criar Versão Gratuita Atrativa",
        description: "Ofereça funcionalidades úteis de graça, mas limite o suficiente para que usuários queiram pagar. Exemplo: limite de projetos ou usuários.",
      },
      {
        title: "Melhorar Experiência do Usuário",
        description: "Invista em design, velocidade e usabilidade. Produto precisa ser intuitivo. Se usuário precisa de tutorial longo, algo está errado.",
      },
      {
        title: "Adicionar Viralidade",
        description: "Facilite compartilhamento. Exemplo: convites para colaboradores, templates públicos, integração com redes sociais.",
      },
      {
        title: "Medir e Otimizar Conversão",
        description: "Acompanhe onde usuários desistem. Teste mudanças pequenas (A/B testing). Foque em remover barreiras para upgrade.",
      },
    ],

    internalActions: [
      "Investir em equipe de produto e design",
      "Criar sistema de analytics robusto",
      "Implementar onboarding guiado",
      "Testar e iterar constantemente",
      "Medir métricas de ativação e retenção",
      "Criar loops virais no produto",
    ],

    externalActions: [
      "Criar tutoriais e vídeos no YouTube",
      "Postar reels no Instagram mostrando como usar",
      "Fazer SEO para aparecer em buscas",
      "Criar templates e recursos gratuitos",
      "Participar de comunidades online relevantes",
      "Fazer parcerias com influenciadores",
    ],

    nextSteps: [
      "Semana 1-2: Mapear jornada do usuário e identificar pontos de fricção",
      "Semana 3-4: Simplificar onboarding e primeiros passos",
      "Mês 2: Implementar analytics e começar a medir conversão",
      "Mês 3: Testar melhorias no produto baseadas em dados",
      "Mês 4+: Adicionar funcionalidades virais e otimizar retenção",
    ],
  },

  MLG: {
    name: "Marketing-Led Growth",
    icon: "📢",
    color: "from-green-500 to-green-600",
    shortDescription: "Seu crescimento é impulsionado pelo marketing",
    
    overview: "No modelo Marketing-Led Growth, o marketing é o principal motor de geração de demanda e aquisição de clientes. Este modelo funciona através de conteúdo, publicidade, SEO e presença online forte. É eficaz para produtos com ticket médio e ciclos de venda moderados.",
    
    howItWorks: [
      "Criar conteúdo relevante que atrai audiência",
      "Usar SEO para aparecer em buscas do Google",
      "Investir em anúncios pagos (Google Ads, Instagram, etc)",
      "Construir presença forte em redes sociais",
      "Gerar leads e nutrir até estarem prontos para comprar",
    ],

    strengths: [
      "Escalável através de canais digitais",
      "Gera demanda constante de leads",
      "Funciona para diversos tipos de produtos",
      "Mensurável e otimizável",
      "Constrói autoridade e marca",
    ],

    weaknesses: [
      "Requer investimento constante em marketing",
      "Competição alta em canais pagos",
      "Demora para ver resultados de SEO e conteúdo",
      "Precisa de equipe especializada",
      "Custo de aquisição pode ser alto",
    ],

    applicationStrategies: [
      {
        title: "Criar Conteúdo Valioso",
        description: "Publique artigos, vídeos e posts que resolvem problemas reais. Foque em educar, não vender. Isso atrai audiência e gera confiança.",
      },
      {
        title: "Investir em SEO",
        description: "Otimize seu site para aparecer no Google. Pesquise palavras-chave que seu público busca. Crie conteúdo em torno dessas palavras.",
      },
      {
        title: "Usar Anúncios Pagos",
        description: "Teste Google Ads e anúncios em redes sociais. Comece pequeno, meça resultados, escale o que funciona. Foque em ROI positivo.",
      },
      {
        title: "Construir Presença Social",
        description: "Poste regularmente no Instagram, LinkedIn ou TikTok. Engaje com audiência. Compartilhe cases, dicas e bastidores.",
      },
      {
        title: "Nutrir Leads",
        description: "Capture emails e mantenha contato. Envie conteúdo relevante. Não venda logo de cara. Eduque até estarem prontos para comprar.",
      },
    ],

    internalActions: [
      "Montar equipe de marketing (conteúdo, SEO, ads)",
      "Criar calendário editorial de conteúdo",
      "Implementar ferramentas de automação de marketing",
      "Definir personas e jornada do cliente",
      "Medir e otimizar métricas de marketing (CAC, LTV, ROI)",
      "Criar processos de geração e qualificação de leads",
    ],

    externalActions: [
      "Publicar 2-3 artigos por semana no blog",
      "Criar vídeos educativos no YouTube",
      "Postar diariamente no Instagram e LinkedIn",
      "Investir em Google Ads e anúncios sociais",
      "Fazer guest posts em sites relevantes",
      "Participar de podcasts e webinars",
    ],

    nextSteps: [
      "Semana 1-2: Definir personas e mapear jornada do cliente",
      "Semana 3-4: Criar calendário de conteúdo e começar a publicar",
      "Mês 2: Implementar SEO básico e começar a investir em ads",
      "Mês 3: Medir resultados e otimizar canais que funcionam",
      "Mês 4+: Escalar investimento em canais com ROI positivo",
    ],
  },

  FLG: {
    name: "Founder-Led Growth",
    icon: "⭐",
    color: "from-red-500 to-red-600",
    shortDescription: "Seu crescimento é impulsionado pelo fundador",
    
    overview: "No modelo Founder-Led Growth, o fundador é o principal ativo de crescimento. Sua expertise, rede de contatos e credibilidade pessoal atraem clientes. Este modelo é comum em estágios iniciais e funciona bem para consultoria, serviços e produtos premium.",
    
    howItWorks: [
      "Fundador usa rede pessoal para conseguir clientes",
      "Credibilidade e reputação do fundador atraem oportunidades",
      "Relacionamentos diretos com clientes chave",
      "Fundador é a cara da empresa",
      "Crescimento depende da presença e ação do fundador",
    ],

    strengths: [
      "Rápido para começar (não precisa de equipe grande)",
      "Custo baixo de aquisição inicial",
      "Relacionamentos fortes com primeiros clientes",
      "Flexibilidade para pivotar",
      "Autenticidade e confiança",
    ],

    weaknesses: [
      "Não escala sem o fundador",
      "Fundador vira gargalo",
      "Difícil de delegar",
      "Burnout é comum",
      "Crescimento limitado pelo tempo do fundador",
    ],

    applicationStrategies: [
      {
        title: "Construir Presença Online",
        description: "Poste regularmente no LinkedIn, TikTok ou Instagram. Compartilhe aprendizados, bastidores e insights. Seja autêntico e consistente.",
      },
      {
        title: "Usar Rede de Contatos",
        description: "Fale com conhecidos, ex-colegas e amigos. Peça indicações. Participe de eventos e faça networking ativo.",
      },
      {
        title: "Criar Conteúdo Pessoal",
        description: "Escreva artigos, faça vídeos ou podcasts. Compartilhe sua expertise. Isso atrai oportunidades e constrói autoridade.",
      },
      {
        title: "Ser Consultivo",
        description: "Ajude pessoas gratuitamente. Responda perguntas. Ofereça valor antes de vender. Isso gera confiança e referências.",
      },
      {
        title: "Planejar Transição",
        description: "Documente processos. Contrate pessoas aos poucos. Delegue tarefas operacionais. Prepare a empresa para crescer sem você.",
      },
    ],

    internalActions: [
      "Documentar processos e conhecimento",
      "Contratar primeiros funcionários chave",
      "Criar sistemas para reduzir dependência do fundador",
      "Treinar equipe para assumir responsabilidades",
      "Definir quando e como transicionar para outro modelo",
      "Manter cultura e valores mesmo com crescimento",
    ],

    externalActions: [
      "Postar diariamente no LinkedIn compartilhando aprendizados",
      "Fazer vídeos curtos no TikTok ou Instagram",
      "Participar de eventos e conferências",
      "Fazer networking ativo com potenciais clientes",
      "Dar palestras e participar de podcasts",
      "Construir comunidade em torno da sua expertise",
    ],

    nextSteps: [
      "Semana 1-2: Definir sua mensagem e posicionamento pessoal",
      "Semana 3-4: Começar a postar regularmente em redes sociais",
      "Mês 2: Ativar rede de contatos e pedir indicações",
      "Mês 3: Documentar processos e começar a contratar",
      "Mês 4+: Planejar transição para modelo mais escalável",
    ],
  },
};

export default function ResultDetails() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/resultado/:model");
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async (modelKey: string) => {
    setIsDownloading(true);
    try {
      const details = modelDetails[modelKey as keyof typeof modelDetails];
      if (!details) {
        alert("Modelo inválido");
        return;
      }

      // Create text content for download
      const textContent = `
═══════════════════════════════════════════════════════════════
  DIAGNÓSTICO DE LED GROWTH
═══════════════════════════════════════════════════════════════

${details.icon} ${details.name}
${details.shortDescription}

───────────────────────────────────────────────────────────────
O QUE É?
───────────────────────────────────────────────────────────────

${details.overview}

───────────────────────────────────────────────────────────────
COMO FUNCIONA
───────────────────────────────────────────────────────────────

${details.howItWorks.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

───────────────────────────────────────────────────────────────
PONTOS FORTES
───────────────────────────────────────────────────────────────

${details.strengths.map(s => `✓ ${s}`).join('\n')}

───────────────────────────────────────────────────────────────
PONTOS FRACOS
───────────────────────────────────────────────────────────────

${details.weaknesses.map(w => `✗ ${w}`).join('\n')}

───────────────────────────────────────────────────────────────
O QUE FAZER AGORA
───────────────────────────────────────────────────────────────

${details.applicationStrategies.map((s, idx) => `\n${idx + 1}. ${s.title}\n   ${s.description}`).join('\n')}

───────────────────────────────────────────────────────────────
AÇÕES INTERNAS
───────────────────────────────────────────────────────────────

${details.internalActions.map(a => `• ${a}`).join('\n')}

───────────────────────────────────────────────────────────────
AÇÕES EXTERNAS
───────────────────────────────────────────────────────────────

${details.externalActions.map(a => `• ${a}`).join('\n')}

───────────────────────────────────────────────────────────────
SEU PLANO DE AÇÃO
───────────────────────────────────────────────────────────────

${details.nextSteps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

═══════════════════════════════════════════════════════════════
Diagnóstico gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
Quiz de Led Growth - Descubra sua estratégia de crescimento predominante
═══════════════════════════════════════════════════════════════
      `.trim();

      // Create blob and download
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
      console.error('Error generating download:', error);
      alert('Erro ao gerar download. Por favor, tente novamente.');
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
            Seu Diagnóstico Completo
          </h1>
          <p className="text-xl text-gray-300">
            Recomendações estratégicas e plano de ação para seu modelo
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
            O Que É?
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
              Pontos Fracos
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
          <h2 className="text-2xl font-bold mb-6">O Que Fazer Agora</h2>
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
            onClick={() => downloadPDF(model)}
            disabled={isDownloading}
            className="w-full gap-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Gerando Download...' : 'Download Diagnóstico'}
          </Button>
        </div>
      </div>
    </div>
  );
}
