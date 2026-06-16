import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { nanoid } from "nanoid";

interface Question {
  id: number;
  question: string;
  answers: {
    text: string;
    model: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Como você conquistou seus primeiros clientes?",
    answers: [
      { text: "Vendedores fizeram contato direto e apresentação", model: "SLG" },
      { text: "Eles experimentaram o produto sozinhos e compraram", model: "PLG" },
      { text: "Encontraram você através de buscas ou conteúdo online", model: "MLG" },
      { text: "Conhecidos meus indicaram para eles", model: "FLG" },
    ],
  },
  {
    id: 2,
    question: "Se você precisasse crescer 3x em 12 meses, o que faria primeiro?",
    answers: [
      { text: "Contratar mais vendedores", model: "SLG" },
      { text: "Melhorar como o produto funciona", model: "PLG" },
      { text: "Investir em publicidade e conteúdo", model: "MLG" },
      { text: "Usar minha rede pessoal e credibilidade", model: "FLG" },
    ],
  },
  {
    id: 3,
    question: "Quanto tempo leva, em média, para alguém se tornar cliente?",
    answers: [
      { text: "Vários meses", model: "SLG" },
      { text: "Dias ou até uma semana", model: "PLG" },
      { text: "Algumas semanas", model: "MLG" },
      { text: "Varia muito, depende do contexto", model: "FLG" },
    ],
  },
  {
    id: 4,
    question: "Qual é o seu maior desafio atual para crescer?",
    answers: [
      { text: "Contratar e reter bons vendedores", model: "SLG" },
      { text: "Melhorar a experiência e ativação do usuário no produto", model: "PLG" },
      { text: "Gerar mais demanda e atrair leads qualificados", model: "MLG" },
      { text: "Escalar sem que tudo dependa de mim", model: "FLG" },
    ],
  },
  {
    id: 5,
    question: "O que mais influencia um cliente a comprar de você?",
    answers: [
      { text: "Relacionamento com o vendedor", model: "SLG" },
      { text: "A utilidade do produto na vida do cliente", model: "PLG" },
      { text: "A qualidade do nosso conteúdo", model: "MLG" },
      { text: "Minha reputação pessoal", model: "FLG" },
    ],
  },
  {
    id: 6,
    question: "No âmbito profissional, como você investe a maior parte do seu tempo?",
    answers: [
      { text: "Vendendo e negociando com clientes", model: "SLG" },
      { text: "Melhorando o produto", model: "PLG" },
      { text: "Criando conteúdo e fazendo marketing", model: "MLG" },
      { text: "Construindo relacionamentos e networking", model: "FLG" },
    ],
  },
  {
    id: 7,
    question: "Qual é sua principal fonte de novos clientes?",
    answers: [
      { text: "Equipe de vendas", model: "SLG" },
      { text: "Usuários experimentando versão gratuita", model: "PLG" },
      { text: "Buscas no Google e redes sociais", model: "MLG" },
      { text: "Indicações da minha rede", model: "FLG" },
    ],
  },
  {
    id: 8,
    question: "Se você se afastasse do negócio por 3 meses, o que aconteceria?",
    answers: [
      { text: "As vendas cairiam muito sem a equipe comercial ativa", model: "SLG" },
      { text: "O produto continuaria funcionando e gerando receita", model: "PLG" },
      { text: "Os leads cairiam, mas o conteúdo publicado ainda atrairia visitas", model: "MLG" },
      { text: "O crescimento pararia, pois depende da minha presença", model: "FLG" },
    ],
  },
  {
    id: 9,
    question: "Como você se diferencia da concorrência?",
    answers: [
      { text: "Pelo relacionamento próximo e atendimento personalizado", model: "SLG" },
      { text: "Pela qualidade, facilidade de uso e experiência do produto", model: "PLG" },
      { text: "Pela autoridade, conteúdo e presença digital", model: "MLG" },
      { text: "Pela minha expertise, história e credibilidade pessoal", model: "FLG" },
    ],
  },
  {
    id: 10,
    question: "Qual é o seu ticket médio por cliente?",
    answers: [
      { text: "Alto — acima de R$10.000", model: "SLG" },
      { text: "Baixo — até R$500", model: "PLG" },
      { text: "Médio — entre R$500 e R$10.000", model: "MLG" },
      { text: "Varia muito conforme o projeto ou cliente", model: "FLG" },
    ],
  },
  {
    id: 11,
    question: "Qual é sua principal prioridade para os próximos 6 meses?",
    answers: [
      { text: "Estruturar e expandir minha equipe comercial", model: "SLG" },
      { text: "Melhorar a experiência do usuário e aumentar retenção", model: "PLG" },
      { text: "Aumentar tráfego orgânico e gerar mais leads", model: "MLG" },
      { text: "Ampliar minha rede e fortalecer minha presença pessoal", model: "FLG" },
    ],
  },
];

const modelInfo = {
  SLG: {
    name: "Sales-Led Growth",
    icon: "📞",
    color: "from-blue-500 to-blue-600",
    description: "Seu crescimento é impulsionado pela equipe de vendas",
  },
  PLG: {
    name: "Product-Led Growth",
    icon: "🎯",
    color: "from-purple-500 to-purple-600",
    description: "Seu crescimento é impulsionado pelo produto",
  },
  MLG: {
    name: "Marketing-Led Growth",
    icon: "📢",
    color: "from-green-500 to-green-600",
    description: "Seu crescimento é impulsionado pelo marketing",
  },
  FLG: {
    name: "Founder-Led Growth",
    icon: "⭐",
    color: "from-red-500 to-red-600",
    description: "Seu crescimento é impulsionado pelo fundador",
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// ── Tela de captação de lead ─────────────────────────────────────────────────

interface LeadFormProps {
  onConcluido: () => void;
  sessionId: string;
}

function LeadForm({ onConcluido, sessionId }: LeadFormProps) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const salvarLead = trpc.quizLeads.salvar.useMutation({
    onSuccess: () => onConcluido(),
    onError: (err) => {
      setErrors({ geral: err.message || "Erro ao salvar. Tente novamente." });
    },
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nome.trim() || nome.trim().length < 2) errs.nome = "Informe seu nome completo";
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10) errs.whatsapp = "Informe um WhatsApp válido com DDD";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Informe um e-mail válido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    salvarLead.mutate({
      sessionId,
      nome: nome.trim(),
      whatsapp: whatsapp.replace(/\D/g, ""),
      email: email.trim().toLowerCase(),
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const errorStyle: React.CSSProperties = {
    color: "#f87171",
    fontSize: "12px",
    marginTop: "4px",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #0f1a0f 50%, #0a0a0a 100%)" }}>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lead-card { animation: fadeUp 0.5s ease-out both; }
        .lead-input:focus { border-color: #39ff14 !important; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(57,255,20,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(57,255,20,0); }
        }
        .btn-pulse { animation: pulse-glow 2.2s infinite; }
      `}</style>

      <div className="lead-card w-full max-w-md">

        {/* Logo / título */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{ color: "#39ff14", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
            Diagnóstico Estratégico
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px, 6vw, 38px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 12px" }}>
            LED GROWTH<br />
            <span style={{ color: "#39ff14" }}>MODELS</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
            Descubra qual é o motor real de crescimento do seu negócio — em menos de 3 minutos.
          </p>
        </div>

        {/* Card do formulário */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "32px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "24px", textAlign: "center" }}>
            Preencha os dados abaixo para acessar o diagnóstico
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Nome */}
            <div>
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                Nome completo
              </label>
              <input
                className="lead-input"
                style={{ ...inputStyle, borderColor: errors.nome ? "#f87171" : "rgba(255,255,255,0.15)" }}
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
              />
              {errors.nome && <p style={errorStyle}>{errors.nome}</p>}
            </div>

            {/* WhatsApp */}
            <div>
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                WhatsApp (com DDD)
              </label>
              <input
                className="lead-input"
                style={{ ...inputStyle, borderColor: errors.whatsapp ? "#f87171" : "rgba(255,255,255,0.15)" }}
                type="tel"
                placeholder="(61) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                autoComplete="tel"
              />
              {errors.whatsapp && <p style={errorStyle}>{errors.whatsapp}</p>}
            </div>

            {/* E-mail */}
            <div>
              <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                E-mail
              </label>
              <input
                className="lead-input"
                style={{ ...inputStyle, borderColor: errors.email ? "#f87171" : "rgba(255,255,255,0.15)" }}
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>

            {errors.geral && (
              <p style={{ ...errorStyle, textAlign: "center", marginTop: 0 }}>{errors.geral}</p>
            )}

            <button
              type="submit"
              disabled={salvarLead.isPending}
              className="btn-pulse"
              style={{
                marginTop: "8px",
                background: salvarLead.isPending ? "#1a3a0a" : "#39ff14",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "8px",
                padding: "14px 24px",
                fontSize: "15px",
                fontWeight: 800,
                cursor: salvarLead.isPending ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                letterSpacing: "0.5px",
                transition: "background 0.2s",
              }}
            >
              {salvarLead.isPending ? "Salvando..." : (
                <>Iniciar diagnóstico <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>

        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", textAlign: "center", marginTop: "16px" }}>
          Seus dados são usados apenas para envio do resultado e não serão compartilhados.
        </p>
      </div>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────

export default function Home() {
  const [, setLocation] = useLocation();
  const [etapa, setEtapa] = useState<"lead" | "quiz" | "resultado">("lead");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ SLG: 0, PLG: 0, MLG: 0, FLG: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const sessionId = useMemo(() => nanoid(), []);

  const saveResponseMutation = trpc.quiz.saveResponse.useMutation();
  const saveCompletionMutation = trpc.quiz.saveCompletion.useMutation();

  const trackAnalytics = useCallback((eventName: string, data: any) => {
    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami.track(eventName, data);
    }
  }, []);

  const handleAnswer = useCallback(
    (model: string) => {
      if (isProcessing || selectedAnswer) return;

      setIsProcessing(true);
      setSelectedAnswer(model);

      saveResponseMutation.mutate({
        sessionId,
        questionId: currentQuestion + 1,
        selectedModel: model,
      });

      trackAnalytics("quiz_answer_selected", {
        question_id: currentQuestion + 1,
        question: questions[currentQuestion].question,
        selected_model: model,
      });

      setTimeout(() => {
        setScores((prev: any) => ({
          ...prev,
          [model]: (prev[model] || 0) + 1,
        }));

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsProcessing(false);
        } else {
          const newScores = {
            ...scores,
            [model]: (scores[model as keyof typeof scores] || 0) + 1,
          };

          let maxScore = 0;
          let primaryModel = "";
          for (const [m, score] of Object.entries(newScores)) {
            if (score > maxScore) {
              maxScore = score;
              primaryModel = m;
            }
          }

          saveCompletionMutation.mutate({
            sessionId,
            primaryModel,
            scores: newScores,
          });

          setEtapa("resultado");
          trackAnalytics("quiz_completed", {
            total_questions: questions.length,
            timestamp: new Date().toISOString(),
          });
        }
      }, 300);
    },
    [currentQuestion, isProcessing, selectedAnswer, trackAnalytics, sessionId, scores, saveResponseMutation, saveCompletionMutation]
  );

  const getPrimaryModel = (): string => {
    let maxScore = 0;
    let primaryModel = "";
    const scoresObj = scores as Record<string, number>;
    for (const [model, score] of Object.entries(scoresObj)) {
      if (score > maxScore) {
        maxScore = score;
        primaryModel = model;
      }
    }
    return primaryModel;
  };

  // ── Etapa 1: Captação de lead ──────────────────────────────────────────────
  if (etapa === "lead") {
    return <LeadForm onConcluido={() => setEtapa("quiz")} sessionId={sessionId} />;
  }

  // ── Etapa 3: Resultado ─────────────────────────────────────────────────────
  if (etapa === "resultado") {
    const primaryModel = getPrimaryModel();
    const handleViewDetails = () => {
      trackAnalytics("quiz_result_viewed", {
        primary_model: primaryModel,
        scores: scores,
      });
      setLocation(`/resultado/${primaryModel}`);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <style>{`
          @keyframes pulse-shadow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            50%       { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out; }
          .pulse-button { animation: pulse-shadow 2s infinite; }
        `}</style>
        <div className="w-full max-w-2xl">
          <Card className="bg-white shadow-2xl">
            <div className="p-8 md:p-12">
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-4xl font-bold mb-2">Seu Diagnóstico</h1>
                <p className="text-gray-600">Modelo de Led Growth Predominante</p>
              </div>
              <div className={`bg-gradient-to-r ${primaryModel ? modelInfo[primaryModel as keyof typeof modelInfo]?.color : ''} rounded-lg p-8 text-white mb-8 animate-fade-in`}>
                <div className="text-5xl mb-4">{modelInfo[primaryModel as keyof typeof modelInfo].icon}</div>
                <h2 className="text-3xl font-bold mb-3">{modelInfo[primaryModel as keyof typeof modelInfo].name}</h2>
                <p className="text-lg opacity-90">{modelInfo[primaryModel as keyof typeof modelInfo].description}</p>
              </div>
              <Button
                onClick={handleViewDetails}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-bold gap-2 pulse-button shadow-lg"
              >
                Ver Detalhes e Recomendações
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ── Etapa 2: Quiz ──────────────────────────────────────────────────────────
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
      `}</style>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-blue-400">LED GROWTH MODELS</span>
          </h1>
          <p className="text-xl text-gray-300">
            Descubra o Modelo Ideal de Crescimento para seu negócio
          </p>
        </div>

        <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-gray-700 p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300 font-medium">Pergunta {currentQuestion + 1} de {questions.length}</span>
            <span className="text-gray-300 font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-gray-400 text-sm mt-2">{questions.length - currentQuestion - 1} perguntas restantes</p>
        </Card>

        <Card className="bg-white p-8 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">{questions[currentQuestion].question}</h2>
          <div className="space-y-3">
            {questions[currentQuestion].answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(answer.model)}
                disabled={isProcessing || selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === answer.model
                    ? "bg-blue-100 border-blue-500 text-blue-900"
                    : selectedAnswer
                    ? "bg-gray-50 border-gray-200 text-gray-600 opacity-50"
                    : "bg-gray-50 border-gray-200 text-gray-900 hover:border-blue-300 hover:bg-blue-50"
                } ${isProcessing ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{answer.text}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-gray-400 text-sm">Responda todas as perguntas para obter seu diagnóstico personalizado</p>
        </div>
      </div>
    </div>
  );
}
