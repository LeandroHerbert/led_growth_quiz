import { useState, useCallback, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
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
    question: "Quanto tempo leva para alguém virar cliente?",
    answers: [
      { text: "Meses", model: "SLG" },
      { text: "Dias ou semanas", model: "PLG" },
      { text: "Semanas", model: "MLG" },
      { text: "Varia bastante", model: "FLG" },
    ],
  },
  {
    id: 4,
    question: "Qual é seu maior desafio para crescer?",
    answers: [
      { text: "Encontrar bons vendedores", model: "SLG" },
      { text: "Melhorar a experiência do usuário", model: "PLG" },
      { text: "Gerar demanda e leads", model: "MLG" },
      { text: "Escalar sem perder qualidade", model: "FLG" },
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
    question: "Como você gasta a maioria do seu tempo?",
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
    question: "Se você saísse do negócio por 3 meses, o que aconteceria?",
    answers: [
      { text: "Vendas cairiam drasticamente", model: "SLG" },
      { text: "Produto continuaria gerando receita", model: "PLG" },
      { text: "Leads diminuiriam, mas conteúdo ainda atrairia", model: "MLG" },
      { text: "Crescimento pararia quase completamente", model: "FLG" },
    ],
  },
  {
    id: 9,
    question: "Qual é o seu ciclo de vendas típico?",
    answers: [
      { text: "3+ meses", model: "SLG" },
      { text: "Dias a 1 semana", model: "PLG" },
      { text: "2-4 semanas", model: "MLG" },
      { text: "Varia muito", model: "FLG" },
    ],
  },
  {
    id: 10,
    question: "Como você se diferencia da concorrência?",
    answers: [
      { text: "Relacionamento e atendimento pessoal", model: "SLG" },
      { text: "Qualidade e facilidade de uso do produto", model: "PLG" },
      { text: "Conteúdo educativo e presença online", model: "MLG" },
      { text: "Minha expertise e credibilidade pessoal", model: "FLG" },
    ],
  },
  {
    id: 11,
    question: "Qual é o seu ticket médio?",
    answers: [
      { text: "Alto (acima de R$10k)", model: "SLG" },
      { text: "Baixo (até R$500)", model: "PLG" },
      { text: "Médio (R$500 a R$5k)", model: "MLG" },
      { text: "Varia bastante", model: "FLG" },
    ],
  },
  {
    id: 12,
    question: "Qual é sua prioridade para os próximos 6 meses?",
    answers: [
      { text: "Contratar e treinar mais vendedores", model: "SLG" },
      { text: "Melhorar onboarding e retenção", model: "PLG" },
      { text: "Aumentar tráfego e leads", model: "MLG" },
      { text: "Expandir minha presença e rede", model: "FLG" },
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

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ SLG: 0, PLG: 0, MLG: 0, FLG: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate session ID once per quiz session
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

      // Save response to backend
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
          
          // Get primary model
          let maxScore = 0;
          let primaryModel = "";
          for (const [m, score] of Object.entries(newScores)) {
            if (score > maxScore) {
              maxScore = score;
              primaryModel = m;
            }
          }

          // Save completion to backend
          saveCompletionMutation.mutate({
            sessionId,
            primaryModel,
            scores: newScores,
          });

          setShowResult(true);
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

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
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
        <div className="w-full max-w-2xl">
          <Card className="bg-white shadow-2xl">
            <div className="p-8 md:p-12">
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-4xl font-bold mb-2">Seu Diagnóstico</h1>
                <p className="text-gray-600">Modelo de Led Growth Predominante</p>
              </div>

              {/* Primary Model */}
              <div className={`bg-gradient-to-r ${primaryModel ? modelInfo[primaryModel as keyof typeof modelInfo]?.color : ''} rounded-lg p-8 text-white mb-8 animate-fade-in`}>
                <div className="text-5xl mb-4">{modelInfo[primaryModel as keyof typeof modelInfo].icon}</div>
                <h2 className="text-3xl font-bold mb-3">{modelInfo[primaryModel as keyof typeof modelInfo].name}</h2>
                <p className="text-lg opacity-90">{modelInfo[primaryModel as keyof typeof modelInfo].description}</p>
              </div>

              {/* Pulse Animation */}
              <style>{`
                @keyframes pulse-shadow {
                  0%, 100% {
                    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
                  }
                  50% {
                    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
                  }
                }
                @keyframes fade-in {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                .animate-fade-in {
                  animation: fade-in 0.5s ease-out;
                }
                .pulse-button {
                  animation: pulse-shadow 2s infinite;
                }
              `}</style>

              {/* CTA Button */}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <img src="/images/un-logo.png" alt="UN Logo" className="h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Qual é seu Modelo de <span className="text-blue-400">Led Growth?</span>
          </h1>
          <p className="text-xl text-gray-300">
            Descubra qual estratégia de crescimento é predominante no seu negócio
          </p>
        </div>

        {/* Progress */}
        <Card className="bg-white bg-opacity-10 backdrop-blur-sm border-gray-700 p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300 font-medium">Pergunta {currentQuestion + 1} de {questions.length}</span>
            <span className="text-gray-300 font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-gray-400 text-sm mt-2">{questions.length - currentQuestion - 1} perguntas restantes</p>
        </Card>

        {/* Question Card */}
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

        {/* Footer */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-gray-400 text-sm">Responda todas as perguntas para obter seu diagnóstico personalizado</p>
        </div>
      </div>
    </div>
  );
}
