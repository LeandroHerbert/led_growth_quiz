import { useState, useCallback, useMemo } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { nanoid } from "nanoid";

// ── Perguntas ─────────────────────────────────────────────────────────────────

interface Question {
  id: number;
  question: string;
  answers: { text: string; model: string }[];
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

// ── Dados dos modelos ─────────────────────────────────────────────────────────

const modelInfo = {
  SLG: {
    name: "Sales-Led Growth",
    icon: "📞",
    accentColor: "#3b82f6",
    description: "Seu crescimento é movido por relacionamento comercial. A força da sua empresa está na capacidade de construir confiança, conduzir negociações e fechar contratos de alto valor.",
  },
  PLG: {
    name: "Product-Led Growth",
    icon: "🎯",
    accentColor: "#a855f7",
    description: "Seu crescimento é movido pelo próprio produto. Quando o produto entrega valor por si só, ele se torna o principal canal de aquisição, retenção e expansão.",
  },
  MLG: {
    name: "Marketing-Led Growth",
    icon: "📢",
    accentColor: "#22c55e",
    description: "Seu crescimento é movido por conteúdo, presença digital e geração de demanda. A audiência que você constrói se converte em clientes de forma previsível.",
  },
  FLG: {
    name: "Founder-Led Growth",
    icon: "⭐",
    accentColor: "#f59e0b",
    description: "Seu crescimento é movido pela sua presença, reputação e autoridade pessoal. Você é o maior ativo estratégico do negócio — e isso é uma vantagem que ninguém consegue copiar.",
  },
};

// ── Estilos globais compartilhados ────────────────────────────────────────────

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

  .lgm-root * { font-family: 'Inter', sans-serif; box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(57,255,20,0.45); }
    50%       { box-shadow: 0 0 0 12px rgba(57,255,20,0); }
  }
  @keyframes question-in {
    from { opacity: 0; transform: translateX(16px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .lgm-fade-up  { animation: fadeUp 0.45s ease-out both; }
  .lgm-q-in     { animation: question-in 0.35s ease-out both; }
  .lgm-btn-pulse { animation: pulse-glow 2.2s infinite; }

  .lgm-input:focus { border-color: #39ff14 !important; outline: none; }

  .lgm-answer {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 14px 18px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: border-color 0.15s, background 0.15s;
    line-height: 1.5;
  }
  .lgm-answer:hover:not(:disabled) {
    border-color: #39ff14;
    background: rgba(57,255,20,0.06);
  }
  .lgm-answer.selected {
    border-color: #39ff14;
    background: rgba(57,255,20,0.12);
  }
  .lgm-answer.dimmed {
    opacity: 0.35;
    cursor: default;
  }
`;

const BG = "linear-gradient(160deg, #071007 0%, #0c1a0c 45%, #071007 100%)";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function Header() {
  return (
    <div style={{ textAlign: "center", marginBottom: "32px" }}>
      <p style={{ color: "#39ff14", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>
        Diagnóstico Estratégico
      </p>
      <h1 style={{ color: "#fff", fontSize: "clamp(26px, 5vw, 36px)", fontWeight: 900, lineHeight: 1.1, margin: 0 }}>
        LED GROWTH <span style={{ color: "#39ff14" }}>MODELS</span>
      </h1>
    </div>
  );
}

// ── Tela 1: Captação de lead ──────────────────────────────────────────────────

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
    onError: (err) => setErrors({ geral: err.message || "Erro ao salvar. Tente novamente." }),
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nome.trim() || nome.trim().length < 2) errs.nome = "Informe seu nome completo";
    if (whatsapp.replace(/\D/g, "").length < 10) errs.whatsapp = "Informe um WhatsApp válido com DDD";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Informe um e-mail válido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    salvarLead.mutate({ sessionId, nome: nome.trim(), whatsapp: whatsapp.replace(/\D/g, ""), email: email.trim().toLowerCase() });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1.5px solid rgba(255,255,255,0.14)",
    borderRadius: "10px",
    padding: "13px 16px",
    color: "#fff",
    fontSize: "15px",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <div className="lgm-root" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: BG }}>
      <style>{GLOBAL_STYLES}</style>

      <div className="lgm-fade-up" style={{ width: "100%", maxWidth: "440px" }}>
        <Header />

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.65, textAlign: "center", marginBottom: "32px" }}>
          Descubra qual é o motor real de crescimento do seu negócio — em menos de 3 minutos.
        </p>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "32px" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", textAlign: "center", marginBottom: "24px" }}>
            Preencha os dados abaixo para acessar o diagnóstico
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Nome completo", key: "nome", type: "text", placeholder: "Seu nome", value: nome, onChange: (v: string) => setNome(v) },
              { label: "WhatsApp (com DDD)", key: "whatsapp", type: "tel", placeholder: "(61) 99999-9999", value: whatsapp, onChange: (v: string) => setWhatsapp(formatWhatsApp(v)) },
              { label: "E-mail", key: "email", type: "email", placeholder: "seu@email.com", value: email, onChange: (v: string) => setEmail(v) },
            ].map((f) => (
              <div key={f.key}>
                <label style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "6px" }}>{f.label}</label>
                <input
                  className="lgm-input"
                  style={{ ...inputStyle, borderColor: errors[f.key] ? "#f87171" : "rgba(255,255,255,0.14)" }}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                />
                {errors[f.key] && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "4px" }}>{errors[f.key]}</p>}
              </div>
            ))}

            {errors.geral && <p style={{ color: "#f87171", fontSize: "13px", textAlign: "center" }}>{errors.geral}</p>}

            <button
              type="submit"
              disabled={salvarLead.isPending}
              className="lgm-btn-pulse"
              style={{
                marginTop: "8px",
                background: salvarLead.isPending ? "#1a3a0a" : "#39ff14",
                color: "#050f05",
                border: "none",
                borderRadius: "10px",
                padding: "15px 24px",
                fontSize: "15px",
                fontWeight: 800,
                cursor: salvarLead.isPending ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                letterSpacing: "0.3px",
              }}
            >
              {salvarLead.isPending ? "Salvando..." : <><span>Iniciar diagnóstico</span><ArrowRight size={16} /></>}
            </button>
          </form>
        </div>

        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "11px", textAlign: "center", marginTop: "16px", lineHeight: 1.5 }}>
          Seus dados são usados apenas para envio do resultado e não serão compartilhados.
        </p>
      </div>
    </div>
  );
}

// ── Tela 2: Quiz ──────────────────────────────────────────────────────────────

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  isProcessing: boolean;
  onAnswer: (model: string) => void;
}

function QuizScreen({ question, questionIndex, totalQuestions, selectedAnswer, isProcessing, onAnswer }: QuizScreenProps) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="lgm-root" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: BG }}>
      <style>{GLOBAL_STYLES}</style>

      <div style={{ width: "100%", maxWidth: "560px" }}>
        <Header />

        {/* Barra de progresso */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600 }}>
              Pergunta {questionIndex + 1} de {totalQuestions}
            </span>
            <span style={{ color: "#39ff14", fontSize: "12px", fontWeight: 700 }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#39ff14", borderRadius: "4px", transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Card da pergunta */}
        <div
          key={questionIndex}
          className="lgm-q-in"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "28px 24px" }}
        >
          <h2 style={{ color: "#fff", fontSize: "clamp(16px, 3vw, 19px)", fontWeight: 700, lineHeight: 1.45, marginBottom: "24px" }}>
            {question.question}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {question.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(answer.model)}
                disabled={isProcessing || selectedAnswer !== null}
                className={`lgm-answer${selectedAnswer === answer.model ? " selected" : ""}${selectedAnswer && selectedAnswer !== answer.model ? " dimmed" : ""}`}
              >
                <span>{answer.text}</span>
                <ChevronRight size={16} style={{ flexShrink: 0, color: selectedAnswer === answer.model ? "#39ff14" : "rgba(255,255,255,0.3)" }} />
              </button>
            ))}
          </div>
        </div>

        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", textAlign: "center", marginTop: "20px" }}>
          {totalQuestions - questionIndex - 1} {totalQuestions - questionIndex - 1 === 1 ? "pergunta restante" : "perguntas restantes"}
        </p>
      </div>
    </div>
  );
}

// ── Tela 3: Resultado ─────────────────────────────────────────────────────────

interface ResultScreenProps {
  primaryModel: string;
  scores: Record<string, number>;
  onViewDetails: () => void;
}

function ResultScreen({ primaryModel, scores, onViewDetails }: ResultScreenProps) {
  const info = modelInfo[primaryModel as keyof typeof modelInfo];
  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <div className="lgm-root" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: BG }}>
      <style>{GLOBAL_STYLES}</style>

      <div className="lgm-fade-up" style={{ width: "100%", maxWidth: "520px" }}>
        <Header />

        {/* Card principal do resultado */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "32px", marginBottom: "16px" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", textAlign: "center", marginBottom: "20px" }}>
            Seu modelo predominante
          </p>

          {/* Badge do modelo */}
          <div style={{
            background: `${info.accentColor}18`,
            border: `1.5px solid ${info.accentColor}55`,
            borderRadius: "12px",
            padding: "24px",
            textAlign: "center",
            marginBottom: "24px",
          }}>
            <div style={{ fontSize: "44px", marginBottom: "12px" }}>{info.icon}</div>
            <h2 style={{ color: "#fff", fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 900, margin: "0 0 10px" }}>
              {info.name}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              {info.description}
            </p>
          </div>

          {/* Distribuição de scores */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>
              Distribuição do seu perfil
            </p>
            {Object.entries(scores)
              .sort(([, a], [, b]) => b - a)
              .map(([model, score]) => {
                const pct = total > 0 ? Math.round((score / total) * 100) : 0;
                const mInfo = modelInfo[model as keyof typeof modelInfo];
                return (
                  <div key={model} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ color: model === primaryModel ? "#fff" : "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: model === primaryModel ? 700 : 500 }}>
                        {mInfo.icon} {mInfo.name}
                      </span>
                      <span style={{ color: model === primaryModel ? "#39ff14" : "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: model === primaryModel ? "#39ff14" : mInfo.accentColor + "88", borderRadius: "4px", transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                );
              })}
          </div>

          <button
            onClick={onViewDetails}
            className="lgm-btn-pulse"
            style={{
              background: "#39ff14",
              color: "#050f05",
              border: "none",
              borderRadius: "10px",
              padding: "15px 24px",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              letterSpacing: "0.3px",
            }}
          >
            <span>Ver detalhes e recomendações</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

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

      saveResponseMutation.mutate({ sessionId, questionId: currentQuestion + 1, selectedModel: model });
      trackAnalytics("quiz_answer_selected", { question_id: currentQuestion + 1, selected_model: model });

      setTimeout(() => {
        const newScores = { ...scores, [model]: (scores[model as keyof typeof scores] || 0) + 1 };
        setScores(newScores);

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsProcessing(false);
        } else {
          let maxScore = 0;
          let primaryModel = "";
          for (const [m, s] of Object.entries(newScores)) {
            if (s > maxScore) { maxScore = s; primaryModel = m; }
          }
          saveCompletionMutation.mutate({ sessionId, primaryModel, scores: newScores });
          setEtapa("resultado");
          trackAnalytics("quiz_completed", { timestamp: new Date().toISOString() });
        }
      }, 300);
    },
    [currentQuestion, isProcessing, selectedAnswer, trackAnalytics, sessionId, scores, saveResponseMutation, saveCompletionMutation]
  );

  const getPrimaryModel = (): string => {
    let maxScore = 0;
    let primaryModel = "";
    for (const [model, score] of Object.entries(scores)) {
      if (score > maxScore) { maxScore = score; primaryModel = model; }
    }
    return primaryModel;
  };

  if (etapa === "lead") {
    return <LeadForm onConcluido={() => setEtapa("quiz")} sessionId={sessionId} />;
  }

  if (etapa === "resultado") {
    const primaryModel = getPrimaryModel();
    return (
      <ResultScreen
        primaryModel={primaryModel}
        scores={scores}
        onViewDetails={() => {
          trackAnalytics("quiz_result_viewed", { primary_model: primaryModel });
          setLocation(`/resultado/${primaryModel}`);
        }}
      />
    );
  }

  return (
    <QuizScreen
      question={questions[currentQuestion]}
      questionIndex={currentQuestion}
      totalQuestions={questions.length}
      selectedAnswer={selectedAnswer}
      isProcessing={isProcessing}
      onAnswer={handleAnswer}
    />
  );
}
