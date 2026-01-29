import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download } from "lucide-react";
import { useLocation } from "wouter";
import QRCodeStyling from "qr-code-styling";

export default function QRCodePage() {
  const [, setLocation] = useLocation();
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);

  const quizUrl = typeof window !== "undefined" ? window.location.origin : "https://led-growth-quiz.manus.space";

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: quizUrl,
      image: "",
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H",
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.2,
        margin: 0,
      },
      dotsOptions: {
        color: "#000000",
        type: "square",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        color: "#000000",
        type: "square",
      },
      cornersDotOptions: {
        color: "#000000",
        type: "dot",
      },
    });

    setQrCode(qr);

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }
  }, [quizUrl]);

  const downloadQRCode = () => {
    if (qrCode) {
      qrCode.download({ name: "quiz-led-growth-qrcode", extension: "png" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Button
          variant="outline"
          onClick={() => setLocation("/")}
          className="mb-8 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>

        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">QR Code do Quiz</h1>
          <p className="text-xl text-gray-300">Compartilhe este QR Code para que sua audiência acesse o quiz</p>
        </div>

        {/* QR Code Card */}
        <Card className="bg-white p-12 mb-8">
          <div className="flex flex-col items-center">
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div ref={qrRef} className="flex justify-center" />
            </div>

            <div className="text-center mb-8 w-full">
              <p className="text-gray-600 text-sm mb-2">URL do Quiz:</p>
              <p className="text-lg font-mono bg-gray-100 p-3 rounded text-gray-900 break-all">
                {quizUrl}
              </p>
            </div>

            <div className="flex gap-4 w-full">
              <Button
                onClick={downloadQRCode}
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                Baixar QR Code
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(quizUrl);
                  alert("URL copiada!");
                }}
                className="flex-1"
              >
                Copiar URL
              </Button>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="bg-blue-50 border-2 border-blue-200 p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Como Usar</h2>
          <ul className="space-y-3 text-blue-900">
            <li className="flex gap-3">
              <span className="font-bold">1.</span>
              <span>Baixe o QR Code acima</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">2.</span>
              <span>Exiba na sua apresentação (slides, TV, etc)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">3.</span>
              <span>Sua audiência escaneia com o celular</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">4.</span>
              <span>Eles são direcionados automaticamente para o quiz</span>
            </li>
          </ul>
        </Card>

        {/* Tips */}
        <Card className="bg-green-50 border-2 border-green-200 p-8 mt-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">💡 Dicas</h2>
          <ul className="space-y-2 text-green-900 text-sm">
            <li>• Teste o QR Code antes da apresentação</li>
            <li>• Exiba em tela grande para melhor visualização</li>
            <li>• Deixe 10-15 segundos para as pessoas escanear</li>
            <li>• Você pode compartilhar o link também via WhatsApp, email ou chat</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
