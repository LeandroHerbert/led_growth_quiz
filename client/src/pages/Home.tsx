import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

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
      { text: "Relacionamento pessoal com o fundador", model: "FLG" },
    ],
  },
  {
    id: 6,
    question: "Qual é o seu ciclo de vendas típico?",
    answers: [
      { text: "3-6 meses ou mais (B2B enterprise)", model: "SLG" },
      { text: "Dias ou semanas (self-service)", model: "PLG" },
      { text: "Semanas (inbound leads)", model: "MLG" },
      { text: "Variável, depende da minha disponibilidade", model: "FLG" },
    ],
  },
  {
    id: 7,
    question: "Qual é o seu maior investimento em aquisição de clientes?",
    answers: [
      { text: "Salários e comissões de vendedores", model: "SLG" },
      { text: "Melhorias no produto e UX", model: "PLG" },
      { text: "Publicidade, conteúdo e ferramentas de marketing", model: "MLG" },
      { text: "Meu próprio tempo e networking", model: "FLG" },
    ],
  },
  {
    id: 8,
    question: "Se removesse o elemento principal de sua estratégia por um mês, qual seria o impacto?",
    answers: [
      { text: "Praticamente pararia a aquisição de clientes", model: "SLG" },
      { text: "Conversões cairiam drasticamente", model: "PLG" },
      { text: "Leads inbound diminuiriam significativamente", model: "MLG" },
      { text: "Seria devastador para o crescimento", model: "FLG" },
    ],
  },
  {
    id: 9,
    question: "Como você valida se seu produto/serviço resolve o problema do cliente?",
    answers: [
      { text: "Através de conversas diretas com vendedores", model: "SLG" },
      { text: "Observando o comportamento e uso do produto", model: "PLG" },
      { text: "Através de feedback de conteúdo e comentários", model: "MLG" },
      { text: "Conversas pessoais diretas com clientes", model: "FLG" },
    ],
  },
  {
    id: 10,
    question: "Qual é a sua vantagem competitiva mais forte?",
    answers: [
      { text: "Equipe de vendas experiente e bem treinada", model: "SLG" },
      { text: "Produto intuitivo e fácil de usar", model: "PLG" },
      { text: "Conteúdo de qualidade e presença online", model: "MLG" },
      { text: "Credibilidade e rede pessoal do fundador", model: "FLG" },
    ],
  },
  {
    id: 11,
    question: "Qual é o seu maior desafio de escalabilidade?",
    answers: [
      { text: "Encontrar e manter bons vendedores", model: "SLG" },
      { text: "Manter qualidade enquanto cresce", model: "PLG" },
      { text: "Produzir conteúdo em escala", model: "MLG" },
      { text: "Não conseguir fazer tudo sozinho", model: "FLG" },
    ],
  },
  {
    id: 12,
    question: "Qual é o seu plano para os próximos 2 anos?",
    answers: [
      { text: "Expandir e profissionalizar a equipe de vendas", model: "SLG" },
      { text: "Melhorar o produto e adicionar novas funcionalidades", model: "PLG" },
      { text: "Aumentar visibilidade e autoridade no mercado", model: "MLG" },
      { text: "Construir minha marca pessoal como líder", model: "FLG" },
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
