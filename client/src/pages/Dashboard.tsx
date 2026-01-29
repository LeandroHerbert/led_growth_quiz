import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalyticsData {
  totalQuizzes: number;
  completionRate: number;
  modelDistribution: Record<string, number>;
  questionsData: Array<{
    question: number;
    SLG: number;
    PLG: number;
    MLG: number;
    FLG: number;
  }>;
}

const COLORS = {
  SLG: "#3b82f6",
  PLG: "#a855f7",
  MLG: "#22c55e",
  FLG: "#ef4444",
};

const modelNames = {
  SLG: "Sales-Led Growth",
  PLG: "Product-Led Growth",
  MLG: "Marketing-Led Growth",
  FLG: "Founder-Led Growth",
};

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalQuizzes: 0,
    completionRate: 0,
    modelDistribution: {
      SLG: 0,
      PLG: 0,
      MLG: 0,
      FLG: 0,
    },
    questionsData: [],
  });

  useEffect(() => {
    // Load analytics from localStorage
    const storedAnalytics = localStorage.getItem("quiz_analytics");
    if (storedAnalytics) {
      try {
        setAnalytics(JSON.parse(storedAnalytics));
      } catch (error) {
        console.error("Error loading analytics:", error);
      }
    }

    // Also try to get from console logs or other sources
    console.log("Analytics Dashboard Loaded");
  }, []);

  const getMostPredominantModel = () => {
    let maxCount = 0;
    let model = "SLG";
    for (const [key, value] of Object.entries(analytics.modelDistribution)) {
      if (value > maxCount) {
        maxCount = value;
        model = key;
      }
    }
    return { model, count: maxCount };
  };

  const predominant = getMostPredominantModel();
  const totalResponses = Object.values(analytics.modelDistribution).reduce((a, b) => a + b, 0);

  const pieData = Object.entries(analytics.modelDistribution).map(([key, value]) => ({
    name: modelNames[key as keyof typeof modelNames],
    value: value,
    color: COLORS[key as keyof typeof COLORS],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Button
          variant="outline"
          onClick={() => setLocation("/")}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Quiz
        </Button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard de Analytics</h1>
          <p className="text-gray-300">Análise dos resultados do quiz de Led Growth</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total de Quizzes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalResponses}</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </Card>

          <Card className="bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Taxa de Conclusão</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.completionRate}%</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </Card>

          <Card className="bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Modelo Predominante</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">{predominant.model}</p>
                <p className="text-sm text-gray-600 mt-1">{predominant.count} respostas</p>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
          </Card>

          <Card className="bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Modelos Únicos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <Card className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Distribuição de Modelos
            </h2>
            {totalResponses > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) =>
                      `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Nenhum dado disponível ainda
              </div>
            )}
          </Card>

          {/* Bar Chart */}
          <Card className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Contagem por Modelo
            </h2>
            {totalResponses > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(analytics.modelDistribution).map(([key, value]) => ({
                    name: key,
                    count: value,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Nenhum dado disponível ainda
              </div>
            )}
          </Card>
        </div>

        {/* Model Details */}
        <Card className="bg-white p-8">
          <h2 className="text-2xl font-bold mb-6">Detalhes por Modelo</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(analytics.modelDistribution).map(([key, value]) => (
              <div
                key={key}
                className="p-4 rounded-lg border-2"
                style={{ borderColor: COLORS[key as keyof typeof COLORS] }}
              >
                <p className="font-bold text-gray-900 mb-2">
                  {modelNames[key as keyof typeof modelNames]}
                </p>
                <p className="text-3xl font-bold" style={{ color: COLORS[key as keyof typeof COLORS] }}>
                  {value}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {totalResponses > 0 ? ((value / totalResponses) * 100).toFixed(1) : 0}%
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Info Box */}
        <Card className="bg-blue-50 border-2 border-blue-200 p-6 mt-8">
          <p className="text-blue-900">
            <strong>💡 Nota:</strong> Este dashboard mostra dados agregados de todas as sessões. Os dados são armazenados localmente no navegador e sincronizados com o Umami Analytics.
          </p>
        </Card>
      </div>
    </div>
  );
}
