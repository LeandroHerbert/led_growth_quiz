import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

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
      { text: "Meses (precisa de várias conversas)", model: "SLG" },
      { text: "Dias ou semanas (sozinho no produto)", model: "PLG" },
      { text: "Semanas (depois de ver conteúdo)", model: "MLG" },
      { text: "Varia bastante, depende da minha disponibilidade", model: "FLG" },
    ],
  },
  {
    id: 4,
    question: "Qual é seu maior desafio para crescer?",
    answers: [
      { text: "Encontrar e manter bons vendedores", model: "SLG" },
      { text: "Melhorar a experiência do usuário", model: "PLG" },
      { text: "Produzir conteúdo e publicidade", model: "MLG" },
      { text: "Não consigo fazer tudo sozinho", model: "FLG" },
    ],
  },
  {
    id: 5,
    question: "O que faz um cliente permanecer com você?",
    answers: [
      { text: "Relacionamento com o vendedor", model: "SLG" },
      { text: "O produto é fácil e útil", model: "PLG" },
      { text: "Continua vendo conteúdo nosso", model: "MLG" },
      { text: "Relacionamento comigo", model: "FLG" },
    ],
  },
  {
    id: 6,
    question: "Onde você investe mais dinheiro?",
    answers: [
      { text: "Salários e comissões de vendedores", model: "SLG" },
      { text: "Melhorias no produto", model: "PLG" },
      { text: "Publicidade, Instagram, Google Ads", model: "MLG" },
      { text: "Meu tempo e networking", model: "FLG" },
    ],
  },
  {
    id: 7,
    question: "Se parasse com vendas por um mês, o que acontecia?",
    answers: [
      { text: "Praticamente pararia de ganhar clientes", model: "SLG" },
      { text: "Diminuiria, mas o produto ainda venderia", model: "PLG" },
      { text: "Diminuiria gradualmente", model: "MLG" },
      { text: "Seria um desastre para mim", model: "FLG" },
    ],
  },
  {
    id: 8,
    question: "Como você valida se o produto resolve o problema?",
    answers: [
      { text: "Conversas diretas com clientes", model: "SLG" },
      { text: "Vendo como as pessoas usam", model: "PLG" },
      { text: "Feedback nos comentários e redes", model: "MLG" },
      { text: "Conversas pessoais que tenho", model: "FLG" },
    ],
  },
  {
    id: 9,
    question: "Qual é sua vantagem competitiva?",
    answers: [
      { text: "Equipe de vendas experiente", model: "SLG" },
      { text: "Produto fácil de usar", model: "PLG" },
      { text: "Conteúdo e presença online", model: "MLG" },
      { text: "Minha credibilidade e rede", model: "FLG" },
    ],
  },
  {
    id: 10,
    question: "Como você pretende escalar nos próximos 2 anos?",
    answers: [
      { text: "Expandindo a equipe de vendas", model: "SLG" },
      { text: "Melhorando o produto e adicionando funcionalidades", model: "PLG" },
      { text: "Aumentando visibilidade online", model: "MLG" },
      { text: "Construindo minha marca pessoal", model: "FLG" },
    ],
  },
  {
    id: 11,
    question: "Se tivesse R$100k para investir, escolheria:",
    answers: [
      { text: "Contratar 2 vendedores bons", model: "SLG" },
      { text: "Melhorar a experiência do produto", model: "PLG" },
      { text: "Publicidade e produção de conteúdo", model: "MLG" },
      { text: "Aumentar minha presença online", model: "FLG" },
    ],
  },
  {
    id: 12,
    question: "Qual é o seu maior gargalo agora?",
    answers: [
      { text: "Falta de bons vendedores", model: "SLG" },
      { text: "Produto complexo demais", model: "PLG" },
      { text: "Orçamento de marketing", model: "MLG" },
      { text: "Meu tempo pessoal", model: "FLG" },
    ],
  },
];

const modelInfo = {
  SLG: {
    name: "Sales-Led Growth",
    description: "Seu crescimento é impulsionado pela equipe de vendas. Você investe em vendedores, processos de vendas e relacionamentos B2B diretos.",
    color: "from-blue-500 to-blue-600",
    icon: "📞",
  },
  PLG: {
    name: "Product-Led Growth",
    description: "O produto é seu vendedor. Você foca em experiência do usuário, onboarding e conversão self-service.",
    color: "from-purple-500 to-purple-600",
    icon: "🎯",
  },
  MLG: {
    name: "Marketing-Led Growth",
    description: "Marketing gera demanda. Você investe em conteúdo, SEO, publicidade e inbound marketing.",
    color: "from-green-500 to-green-600",
    icon: "📢",
  },
  FLG: {
    name: "Founder-Led Growth",
    description: "Você é o vendedor. Sua marca pessoal e rede são o principal motor de crescimento.",
    color: "from-red-500 to-red-600",
    icon: "⭐",
  },
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    SLG: 0,
    PLG: 0,
    MLG: 0,
    FLG: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [, setLocation] = useLocation();

  const handleAnswer = (model: string) => {
    setScores((prev) => ({
      ...prev,
      [model]: prev[model] + 1,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getPrimaryModel = () => {
    let maxScore = 0;
    let primaryModel = "";
    for (const [model, score] of Object.entries(scores)) {
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
      setLocation(`/resultado/${primaryModel}`);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="bg-white shadow-2xl">
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">Seu Diagnóstico</h1>
                <p className="text-gray-600">Modelo de Led Growth Predominante</p>
              </div>

              {/* Primary Model */}
              <div className={`bg-gradient-to-r ${modelInfo[primaryModel as keyof typeof modelInfo].color} rounded-lg p-8 text-white mb-8`}>
                <div className="text-5xl mb-4">{modelInfo[primaryModel as keyof typeof modelInfo].icon}</div>
                <h2 className="text-3xl font-bold mb-3">{modelInfo[primaryModel as keyof typeof modelInfo].name}</h2>
                <p className="text-lg opacity-90">{modelInfo[primaryModel as keyof typeof modelInfo].description}</p>
              </div>

              {/* Action */}
              <Button
                onClick={handleViewDetails}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg gap-2"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Qual é seu Modelo de <span className="text-blue-400">Led Growth?</span>
          </h1>
          <p className="text-gray-300 text-lg">Descubra qual estratégia de crescimento é predominante no seu negócio</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-white shadow-2xl mb-8">
          <div className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {questions[currentQuestion].question}
            </h2>

            {/* Answers */}
            <div className="space-y-3">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer.model)}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 group-hover:text-blue-600">
                      {answer.text}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          Responda todas as perguntas para obter seu diagnóstico personalizado
        </div>
      </div>
    </div>
  );
}
