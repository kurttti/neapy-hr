import { useState, useRef, useEffect } from 'react';
import { Eye, Zap, CheckCircle } from 'lucide-react';

export function FaceRecognition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [faceDetected, setFaceDetected] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [biometricData, setBiometricData] = useState({
    eyeContact: 0,
    facialExpression: 0,
    headPosition: 0,
    skinTone: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId: number;
    let progress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 100;

      ctx.strokeStyle = '#666666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      const animProgress = (Math.sin(progress * 0.02) + 1) / 2;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + animProgress * 0.3})`;
      ctx.lineWidth = 1;

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = centerX + Math.cos(angle) * (radius - 20);
        const y1 = centerY + Math.sin(angle) * (radius - 20);
        const x2 = centerX + Math.cos(angle) * (radius + 10);
        const y2 = centerY + Math.sin(angle) * (radius + 10);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      const scanY = centerY - radius + (animProgress * radius * 2);
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - radius - 20, scanY);
      ctx.lineTo(centerX + radius + 20, scanY);
      ctx.stroke();

      const glow = new CanvasGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + animProgress * 0.1})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
      ctx.fill();

      progress++;

      if (isScanning) {
        setScanProgress(Math.round(animProgress * 100));

        if (progress % 120 === 0 && progress > 240) {
          setFaceDetected(true);
          setIsScanning(false);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [isScanning]);

  useEffect(() => {
    if (faceDetected) {
      const interval = setInterval(() => {
        setBiometricData(prev => ({
          eyeContact: Math.min(prev.eyeContact + 5, 95 + Math.random() * 5),
          facialExpression: Math.min(prev.facialExpression + 4, 88 + Math.random() * 7),
          headPosition: Math.min(prev.headPosition + 3, 92 + Math.random() * 5),
          skinTone: Math.min(prev.skinTone + 2, 85 + Math.random() * 10)
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [faceDetected]);

  function CanvasGradient(x1: number, y1: number, x2: number, y2: number) {
    const ctx = canvasRef.current?.getContext('2d');
    return ctx?.createLinearGradient(x1, y1, x2, y2) || ctx?.createLinearGradient(0, 0, 0, 0)!;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-gradient-to-br from-black to-gray-900 rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />

        {isScanning && (
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 glass-effect-bw rounded-lg">
              <Zap className="w-4 h-4 text-gray-400 animate-pulse" />
              <span className="text-xs font-semibold text-gray-300">Scanning</span>
            </div>
            <span className="text-sm font-bold text-white">{scanProgress}%</span>
          </div>
        )}

        {faceDetected && (
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 glass-effect-bw rounded-lg">
            <CheckCircle className="w-4 h-4 text-white animate-pulse" />
            <span className="text-xs font-semibold text-white">Face Detected</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <BiometricIndicator
          label="Eye Contact"
          value={biometricData.eyeContact}
          icon={Eye}
        />
        <BiometricIndicator
          label="Expression"
          value={biometricData.facialExpression}
          icon={Zap}
        />
        <BiometricIndicator
          label="Head Position"
          value={biometricData.headPosition}
          icon={Zap}
        />
        <BiometricIndicator
          label="Skin Analysis"
          value={biometricData.skinTone}
          icon={CheckCircle}
        />
      </div>
    </div>
  );
}

interface BiometricIndicatorProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function BiometricIndicator({ label, value, icon: Icon }: BiometricIndicatorProps) {
  return (
    <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 text-gray-400">{Icon}</div>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
        <span className="text-sm font-bold text-white">{Math.round(value)}%</span>
      </div>
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-white to-gray-400 transition-all duration-300"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
