import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertCircle, Target, TrendingUp, Download } from "lucide-react";
import { useState, useRef } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";

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
      "Usuários descobrem e acessam o produto facilmente",
      "Experimentam versão gratuita ou trial sem barreiras",
      "Vivenciam valor rapidamente",
      "Convertem para pagos quando veem benefício",
      "Crescimento viral através de recomendações",
    ],

    strengths: [
      "Custo de aquisição muito baixo",
      "Crescimento escalável sem aumentar equipe de vendas",
      "Feedback direto dos usuários",
      "Melhor retenção porque usuários já conhecem o produto",
      "Crescimento viral e orgânico",
    ],

    weaknesses: [
      "Requer produto muito bom e intuitivo",
      "Difícil para produtos complexos",
      "Conversão pode ser lenta",
      "Menos eficaz para produtos caros",
      "Precisa de muitos usuários para gerar receita",
    ],

    applicationStrategies: [
      {
        title: "Otimizar Onboarding",
        description: "Faça com que novos usuários vivenciem valor em minutos, não horas. Remova fricção. Cada clique a menos = mais conversão.",
      },
      {
        title: "Criar Versão Gratuita Atrativa",
        description: "Ofereça versão gratuita que mostra valor real. Limite features, não valor. Usuários devem querer pagar para ter mais.",
      },
      {
        title: "Medir Engagement",
        description: "Rastreie o que usuários fazem. Qual ação prediz conversão? Otimize para que mais usuários façam essa ação.",
      },
      {
        title: "Criar Conteúdo de Educação",
        description: "Faça vídeos, tutoriais e guias mostrando como usar. Coloque no YouTube, Instagram, TikTok. Conteúdo educativo vira marketing.",
      },
      {
        title: "Implementar Referral Program",
        description: "Incentive usuários a indicar amigos. Ofereça desconto ou features extras. Crescimento viral é o melhor marketing.",
      },
    ],

    internalActions: [
      "Melhorar experiência de onboarding do produto",
      "Criar dashboard de analytics para rastrear engagement",
      "Implementar sistema de feedback de usuários",
      "Otimizar funil de conversão (free → paid)",
      "Criar programa de referência",
      "Treinar time de suporte para ser consultivo",
    ],

    externalActions: [
      "Criar tutoriais em vídeo no YouTube",
      "Postar conteúdo educativo no Instagram e TikTok",
      "Participar de comunidades online relevantes",
      "Fazer webinars mostrando como usar o produto",
      "Colaborar com influenciadores da área",
      "Criar case studies de clientes bem-sucedidos",
    ],

    nextSteps: [
      "Semana 1-2: Analisar jornada atual de novos usuários",
      "Semana 3-4: Identificar pontos de fricção e remover",
      "Mês 2: Implementar analytics para rastrear engagement",
      "Mês 3: Criar conteúdo educativo e começar a publicar",
      "Mês 4+: Testar e otimizar programa de referência",
    ],
  },

  MLG: {
    name: "Marketing-Led Growth",
    icon: "📢",
    color: "from-green-500 to-green-600",
    shortDescription: "Seu crescimento é impulsionado pelo marketing",
    
    overview: "No modelo Marketing-Led Growth, o marketing é o principal motor de aquisição. Através de conteúdo, publicidade e presença online, você atrai e qualifica leads que depois são convertidos. Este modelo funciona bem para produtos com ciclo de venda médio e que precisam de educação.",
    
    howItWorks: [
      "Criar conteúdo relevante que atrai seu público",
      "Publicar em blog, YouTube, Instagram, LinkedIn",
      "Usar Google Ads e redes sociais para amplificar",
      "Capturar emails de interessados",
      "Nutrir leads com conteúdo até conversão",
    ],

    strengths: [
      "Escalável através de conteúdo e publicidade",
      "Gera demanda consistente",
      "Conteúdo continua gerando leads por meses",
      "Melhor controle sobre custo de aquisição",
      "Cria autoridade e marca",
    ],

    weaknesses: [
      "Requer investimento em conteúdo e publicidade",
      "Resultados levam tempo (3-6 meses)",
      "Precisa de expertise em marketing",
      "Competição por atenção é alta",
      "Requer testes e otimização contínua",
    ],

    applicationStrategies: [
      {
        title: "Criar Estratégia de Conteúdo",
        description: "Defina tópicos que seu público busca. Crie conteúdo em blog, vídeo, podcast. Foco em educação, não venda.",
      },
      {
        title: "Dominar SEO",
        description: "Otimize conteúdo para Google. Palavras-chave certas = tráfego grátis. Blog bem feito é ativo que gera leads por anos.",
      },
      {
        title: "Usar Redes Sociais Estrategicamente",
        description: "Instagram, TikTok, LinkedIn. Escolha onde seu público está. Poste 2-3x por semana. Engajamento > seguidores.",
      },
      {
        title: "Investir em Google Ads",
        description: "Google Ads traz resultados rápidos. Comece com orçamento pequeno, teste, otimize. Cada real gasto deve trazer mais de volta.",
      },
      {
        title: "Construir Email List",
        description: "Email é seu ativo. Capture emails através de conteúdo gratuito. Envie newsletter semanal com valor. Email converte melhor que redes.",
      },
    ],

    internalActions: [
      "Criar calendário editorial de conteúdo",
      "Implementar blog e otimizar para SEO",
      "Configurar Google Analytics e rastrear conversões",
      "Criar landing pages para cada campanha",
      "Implementar email marketing automation",
      "Treinar time em marketing digital",
    ],

    externalActions: [
      "Publicar 2-3 posts por semana no blog",
      "Criar vídeos educativos no YouTube",
      "Postar conteúdo diário no Instagram e TikTok",
      "Fazer campanhas de Google Ads",
      "Participar de comunidades online",
      "Fazer parcerias com outros criadores de conteúdo",
    ],

    nextSteps: [
      "Semana 1-2: Definir estratégia de conteúdo e palavras-chave",
      "Semana 3-4: Criar primeiros 5 posts de blog otimizados",
      "Mês 2: Começar a publicar em redes sociais regularmente",
      "Mês 3: Lançar primeira campanha de Google Ads",
      "Mês 4+: Escalar conteúdo e publicidade conforme resultados",
    ],
  },

  FLG: {
    name: "Founder-Led Growth",
    icon: "⭐",
    color: "from-red-500 to-red-600",
    shortDescription: "Seu crescimento é impulsionado pelo fundador",
    
    overview: "No modelo Founder-Led Growth, o fundador é o principal motor de crescimento. Através de sua rede, credibilidade pessoal e presença, ele atrai clientes, parceiros e investidores. Este modelo é comum em startups iniciais e em negócios baseados em expertise pessoal.",
    
    howItWorks: [
      "Fundador usa sua rede pessoal para conseguir clientes",
      "Constrói credibilidade através de conteúdo e presença",
      "Faz vendas diretas e relacionamentos pessoais",
      "Participa de eventos e comunidades",
      "Cria buzz e atrai atenção da mídia",
    ],

    strengths: [
      "Crescimento rápido nos primeiros meses",
      "Relacionamentos geram lealdade",
      "Fundador tem autonomia total",
      "Custo inicial baixo",
      "Feedback direto de clientes",
    ],

    weaknesses: [
      "Não escala sem delegar",
      "Dependência total do fundador",
      "Difícil contratar sem processos",
      "Fundador fica sobrecarregado",
      "Crescimento limita-se à rede do fundador",
    ],

    applicationStrategies: [
      {
        title: "Construir Presença Online",
        description: "LinkedIn, Twitter, YouTube. Compartilhe insights sobre sua indústria. Construa audiência. Audiência = clientes potenciais.",
      },
      {
        title: "Participar de Comunidades",
        description: "Encontre comunidades onde seu cliente ideal está. Participe ativamente. Ajude pessoas. Relacionamentos viram negócios.",
      },
      {
        title: "Fazer Vendas Diretas",
        description: "Ligue, envie email, converse. Relacionamento pessoal é poderoso. Você é o melhor vendedor do seu produto.",
      },
      {
        title: "Criar Conteúdo Pessoal",
        description: "Escreva sobre sua jornada, aprendizados, insights. Conteúdo autêntico atrai pessoas que se identificam com você.",
      },
      {
        title: "Buscar Parcerias Estratégicas",
        description: "Encontre pessoas/empresas complementares. Faça parcerias que beneficiam ambos. Crescimento mútuo.",
      },
    ],

    internalActions: [
      "Definir processo de vendas para replicar",
      "Documentar playbook de como você vende",
      "Começar a delegar tarefas operacionais",
      "Criar sistema de CRM simples",
      "Treinar primeiro vendedor/operacional",
      "Medir quais ações geram mais clientes",
    ],

    externalActions: [
      "Postar conteúdo pessoal 3-4x por semana no LinkedIn",
      "Fazer 5-10 ligações/contatos por semana",
      "Participar de 1-2 eventos por mês",
      "Criar conteúdo em vídeo (YouTube, TikTok)",
      "Fazer podcast ou entrevistas",
      "Construir relacionamento com jornalistas e influenciadores",
    ],

    nextSteps: [
      "Semana 1-2: Mapear sua rede e identificar 20 prospects",
      "Semana 3-4: Fazer contato com 10 prospects",
      "Mês 2: Começar a postar conteúdo regularmente",
      "Mês 3: Fechar primeiros clientes e documentar processo",
      "Mês 4+: Começar a delegar e escalar",
    ],
  },
};

export default function ResultDetails() {
  const [match, params] = useRoute("/resultado/:model");
  const [, setLocation] = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = (model: string) => {
    setIsDownloading(true);
    try {
      const details = modelDetails[model as keyof typeof modelDetails];
      
      const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 8px; margin-bottom: 30px;">
            <div style="font-size: 48px; margin-bottom: 15px;">${details.icon}</div>
            <h1 style="margin: 0; font-size: 32px; font-weight: bold;">${details.name}</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${details.shortDescription}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #667eea; font-size: 20px; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-bottom: 15px;">O Que É?</h2>
            <p style="text-align: justify;">${details.overview}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #667eea; font-size: 20px; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-bottom: 15px;">Como Funciona</h2>
            <ol style="margin: 0; padding-left: 20px;">
              ${details.howItWorks.map(item => `<li style="margin-bottom: 8px;">${item}</li>`).join('')}
            </ol>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div>
              <h2 style="color: #22c55e; font-size: 20px; border-bottom: 3px solid #22c55e; padding-bottom: 10px; margin-bottom: 15px;">Pontos Fortes</h2>
              <ul style="margin: 0; padding-left: 20px;">
                ${details.strengths.map(item => `<li style="margin-bottom: 8px; color: #22c55e;">✓ ${item}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h2 style="color: #ef4444; font-size: 20px; border-bottom: 3px solid #ef4444; padding-bottom: 10px; margin-bottom: 15px;">Pontos Fracos</h2>
              <ul style="margin: 0; padding-left: 20px;">
                ${details.weaknesses.map(item => `<li style="margin-bottom: 8px; color: #ef4444;">✗ ${item}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #667eea; font-size: 20px; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-bottom: 15px;">O Que Fazer Agora</h2>
            ${details.applicationStrategies.map(s => `
              <div style="background: #f0f9ff; border-left: 4px solid #667eea; padding: 15px; margin-bottom: 15px; border-radius: 4px;">
                <h3 style="margin: 0 0 8px 0; color: #667eea; font-size: 16px;">${s.title}</h3>
                <p style="margin: 0; font-size: 14px;">${s.description}</p>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #667eea; font-size: 20px; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-bottom: 15px;">Ações Internas</h2>
            <ul style="margin: 0; padding-left: 20px;">
              ${details.internalActions.map(action => `<li style="margin-bottom: 8px;">${action}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #667eea; font-size: 20px; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-bottom: 15px;">Ações Externas</h2>
            <ul style="margin: 0; padding-left: 20px;">
              ${details.externalActions.map(action => `<li style="margin-bottom: 8px;">${action}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="color: #667eea; font-size: 20px; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-bottom: 15px;">Seu Plano de Ação</h2>
            <ol style="margin: 0; padding-left: 20px;">
              ${details.nextSteps.map(step => `<li style="margin-bottom: 12px;">${step}</li>`).join('')}
            </ol>
          </div>

          <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
            <p style="margin: 0;">Diagnóstico gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
            <p style="margin: 5px 0 0 0;">Quiz de Led Growth - Descubra sua estratégia de crescimento predominante</p>
          </div>
        </div>
      `;

      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      element.style.display = 'none';
      document.body.appendChild(element);

      const opt: any = {
        margin: 10,
        filename: `Diagnostico-${details.name.replace(/\s+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };

      html2pdf().set(opt).from(element).save().then(() => {
        document.body.removeChild(element);
      }).catch((error: any) => {
        console.error('PDF generation error:', error);
        document.body.removeChild(element);
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
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
            {isDownloading ? 'Gerando PDF...' : 'Download Diagnóstico (PDF)'}
          </Button>
        </div>
      </div>
    </div>
  );
}
