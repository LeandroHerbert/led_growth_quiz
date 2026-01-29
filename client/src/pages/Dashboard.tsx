import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BarChart3, TrendingUp, Loader2, Download } from "lucide-react";
import { useLocation } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { trpc } from "@/lib/trpc";

interface AnalyticsData {
  totalQuizzes: number;
  completionRate: number;
  modelDistribution: Record<string, number>;
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
  
  // Fetch analytics from backend
  const { data: analytics, isLoading, error } = trpc.quiz.getAnalytics.useQuery();
  const { data: detailedData } = trpc.quiz.getDetailedData.useQuery();

  const exportToCSV = () => {
    if (!detailedData || detailedData.length === 0) {
      alert("Nenhum dado disponível para exportar");
      return;
    }

    // Create CSV header
    const headers = ["Session ID", "Modelo Predominante", "SLG", "PLG", "MLG", "FLG", "Data/Hora"];
    
    // Create CSV rows
    const rows = detailedData.map((item: any) => [
      item.sessionId,
      item.primaryModel,
      item.scores.SLG || 0,
      item.scores.PLG || 0,
      item.scores.MLG || 0,
      item.scores.FLG || 0,
      new Date(item.completedAt).toLocaleString('pt-BR'),
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `quiz_results_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getMostPredominantModel = () => {
    if (!analytics) return { model: "SLG", count: 0 };
    
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-white p-8">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-lg">Carregando analytics...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-white p-8">
          <p className="text-lg text-red-600">Erro ao carregar analytics: {error.message}</p>
          <Button onClick={() => setLocation("/")} className="mt-4">
            Voltar ao Quiz
          </Button>
        </Card>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const predominant = getMostPredominantModel();
  const totalResponses = Object.values(analytics.modelDistribution).reduce((a, b) => a + b, 0);

  const pieData = Object.entries(analytics.modelDistribution).map(([key, value]) => ({
    name: modelNames[key as keyof typeof modelNames],
    value,
    color: COLORS[key as keyof typeof COLORS],
  }));

  const barData = Object.entries(analytics.modelDistribution).map(([key, value]) => ({
    model: modelNames[key as keyof typeof modelNames],
    respostas: value,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img src="/images/un-logo.png" alt="UN Logo" className="h-12" />
            <div>
              <h1 className="text-4xl font-bold text-white">Dashboard de Analytics</h1>
              <p className="text-gray-300 mt-1">Visualize os resultados do quiz em tempo real</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="gap-2 bg-green-600 text-white hover:bg-green-700 border-green-600"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </Button>
            <Button
              onClick={() => setLocation("/")}
              variant="outline"
              className="gap-2 bg-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Quiz
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Total de Quizzes</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600">{analytics.totalQuizzes}</p>
            <p className="text-sm text-gray-500 mt-1">Completados</p>
          </Card>

          <Card className="bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold">Taxa de Conclusão</h3>
            </div>
            <p className="text-4xl font-bold text-green-600">{analytics.completionRate}%</p>
            <p className="text-sm text-gray-500 mt-1">Dos iniciados</p>
          </Card>

          <Card className="bg-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: COLORS[predominant.model as keyof typeof COLORS] }}
              />
              <h3 className="text-lg font-semibold">Modelo Predominante</h3>
            </div>
            <p className="text-2xl font-bold" style={{ color: COLORS[predominant.model as keyof typeof COLORS] }}>
              {modelNames[predominant.model as keyof typeof modelNames]}
            </p>
            <p className="text-sm text-gray-500 mt-1">{predominant.count} respostas</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <Card className="bg-white p-6">
            <h3 className="text-xl font-bold mb-4">Distribuição de Modelos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
          </Card>

          {/* Bar Chart */}
          <Card className="bg-white p-6">
            <h3 className="text-xl font-bold mb-4">Respostas por Modelo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="respostas" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <Card className="bg-white p-6">
          <h3 className="text-xl font-bold mb-4">Detalhamento por Modelo</h3>
          <div className="space-y-4">
            {Object.entries(analytics.modelDistribution).map(([key, value]) => {
              const percentage = totalResponses > 0 ? ((value / totalResponses) * 100).toFixed(1) : 0;
              return (
                <div key={key} className="flex items-center gap-4">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[key as keyof typeof COLORS] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{modelNames[key as keyof typeof modelNames]}</span>
                      <span className="text-gray-600">
                        {value} respostas ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: COLORS[key as keyof typeof COLORS],
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
