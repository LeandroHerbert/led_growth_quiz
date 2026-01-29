import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, RotateCcw } from "lucide-react";

interface Answer {
  model: string;
  points: number;
}

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
    question: "Se você precisasse triplicar seu faturamento nos próximos 12 meses, qual seria seu primeiro movimento?",
    answers: [
      { text: "Contratar mais vendedores", model: "SLG" },
      { text: "Melhorar o onboarding e experiência do produto", model: "PLG" },
      { text: "Aumentar investimento em marketing e conteúdo", model: "MLG" },
      { text: "Fortalecer a comunidade de usuários", model: "CLG" },
      { text: "Recrutar e habilitar mais parceiros", model: "PLG" },
      { text: "Eu mesmo venderia mais pessoalmente", model: "FLG" },
    ],
  },
  {
    id: 2,
    question: "O que você considera o maior gargalo para crescer mais rápido?",
    answers: [
      { text: "Falta de bons vendedores", model: "SLG" },
      { text: "Experiência e complexidade do produto", model: "PLG" },
      { text: "Orçamento e produção de conteúdo", model: "MLG" },
      { text: "Engajamento e tamanho da comunidade", model: "CLG" },
      { text: "Encontrar e habilitar parceiros qualificados", model: "PLG" },
      { text: "Meu tempo e presença pessoal", model: "FLG" },
    ],
  },
  {
    id: 3,
    question: "Como seus primeiros 10 clientes descobriram você?",
    answers: [
      { text: "Vendedores fizeram prospecção direta", model: "SLG" },
      { text: "Experimentaram o produto gratuitamente", model: "PLG" },
      { text: "Encontraram através de Google ou conteúdo", model: "MLG" },
      { text: "Membros da comunidade indicaram", model: "CLG" },
      { text: "Parceiros trouxeram", model: "PLG" },
      { text: "Rede pessoal do fundador", model: "FLG" },
    ],
  },
  {
    id: 4,
    question: "Se você tivesse que escolher: investir R$100k em um desses, qual escolheria?",
    answers: [
      { text: "Contratar 2 vendedores excelentes", model: "SLG" },
      { text: "Melhorar a experiência do produto", model: "PLG" },
      { text: "Criar conteúdo e campanhas de marketing", model: "MLG" },
      { text: "Fortalecer a comunidade de usuários", model: "CLG" },
      { text: "Recrutar e habilitar parceiros", model: "PLG" },
      { text: "Aumentar minha presença pessoal", model: "FLG" },
    ],
  },
  {
    id: 5,
    question: "Qual é o melhor indicador de que um cliente vai permanecer com você?",
    answers: [
      { text: "Relacionamento forte com o vendedor", model: "SLG" },
      { text: "Usa frequentemente o produto", model: "PLG" },
      { text: "Continua consumindo nosso conteúdo", model: "MLG" },
      { text: "Participa ativamente da comunidade", model: "CLG" },
      { text: "Parceiro continua recomendando", model: "PLG" },
      { text: "Relacionamento pessoal com o fundador", model: "FLG" },
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
  CLG: {
    name: "Community-Led Growth",
    description: "Sua comunidade é o motor. Você constrói relacionamentos, fóruns e programas de advocacy.",
    color: "from-orange-500 to-orange-600",
    icon: "👥",
  },
  PLG2: {
    name: "Partner-Led Growth",
    description: "Parceiros vendem por você. Você recruta, habilita e incentiva resellers e integradores.",
    color: "from-pink-500 to-pink-600",
    icon: "🤝",
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
    CLG: 0,
    PLG2: 0,
    FLG: 0,
  });
  const [showResult, setShowResult] = useState(false);

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

  const getSecondaryModel = () => {
    const sortedModels = Object.entries(scores)
      .filter(([model]) => model !== getPrimaryModel())
      .sort(([, a], [, b]) => b - a);
    return sortedModels[0]?.[0] || "";
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      SLG: 0,
      PLG: 0,
      MLG: 0,
      CLG: 0,
      PLG2: 0,
      FLG: 0,
    });
    setShowResult(false);
  };

  const primaryModel = getPrimaryModel();
  const secondaryModel = getSecondaryModel();
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
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

              {/* Secondary Model */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Modelo Secundário Recomendado</h3>
                <div className={`bg-gradient-to-r ${modelInfo[secondaryModel as keyof typeof modelInfo].color} rounded-lg p-6 text-white`}>
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{modelInfo[secondaryModel as keyof typeof modelInfo].icon}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{modelInfo[secondaryModel as keyof typeof modelInfo].name}</h4>
                      <p className="opacity-90">{modelInfo[secondaryModel as keyof typeof modelInfo].description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sua Pontuação</h3>
                <div className="space-y-3">
                  {Object.entries(scores)
                    .sort(([, a], [, b]) => b - a)
                    .map(([model, score]) => (
                      <div key={model} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{modelInfo[model as keyof typeof modelInfo].icon}</span>
                          <span className="font-medium text-gray-700">{modelInfo[model as keyof typeof modelInfo].name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${(score / questions.length) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-gray-800 w-8">{score}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Refazer Quiz
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Compartilhar Resultado
                </Button>
              </div>
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
