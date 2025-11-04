import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, StopCircle } from 'lucide-react';

interface VoiceInteractionProps {
  onVoiceData?: (isListening: boolean, audioFrequency: number) => void;
}

export function VoiceInteraction({ onVoiceData }: VoiceInteractionProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFrequencies, setAudioFrequencies] = useState<number[]>([]);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRefRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 256;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);

      const updateFrequencies = () => {
        analyser.getByteFrequencyData(frequencyData);
        const avgFrequency = Array.from(frequencyData).reduce((a, b) => a + b) / frequencyData.length;
        setAudioFrequencies(prev => [...prev.slice(-19), avgFrequency]);
        onVoiceData?.(true, avgFrequency / 255);
        animationRefRef.current = requestAnimationFrame(updateFrequencies);
      };

      updateFrequencies();

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          simulateTranscription();
        }
      };

      mediaRecorder.onstop = () => {
        if (animationRefRef.current) {
          cancelAnimationFrame(animationRefRef.current);
        }
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      setIsProcessing(true);
      onVoiceData?.(false, 0);

      setTimeout(() => {
        setIsProcessing(false);
      }, 1500);
    }
  };

  const simulateTranscription = () => {
    const phrases = [
      "I have 5 years of experience in software development",
      "My expertise includes React, Node.js, and cloud technologies",
      "I'm passionate about creating scalable applications",
      "I have led teams of 3-5 developers successfully",
      "I completed my degree in Computer Science"
    ];
    setTranscript(phrases[Math.floor(Math.random() * phrases.length)]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="group flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-300 text-black rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <Mic className="w-5 h-5" />
            Start Interview
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="group flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 animate-pulse"
          >
            <StopCircle className="w-5 h-5" />
            Stop Interview
          </button>
        )}
      </div>

      {audioFrequencies.length > 0 && (
        <div className="flex items-end gap-1 h-16 bg-gray-900/50 rounded-lg p-3 backdrop-blur-sm border border-gray-800">
          {audioFrequencies.map((freq, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-white to-gray-300 rounded-t transition-all duration-100"
              style={{
                height: `${(freq / 255) * 100}%`,
                opacity: 0.3 + (freq / 255) * 0.7
              }}
            />
          ))}
        </div>
      )}

      {transcript && (
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <Volume2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-300 leading-relaxed">{transcript}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                Processing...
              </div>
            </div>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">Analyzing biometric data...</span>
          </div>
        </div>
      )}
    </div>
  );
}
