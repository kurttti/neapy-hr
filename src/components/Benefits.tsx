import { useState, useEffect, useRef, Suspense, lazy, Component, ReactNode } from 'react';
import { TrendingUp, Users, DollarSign, Star, Quote } from 'lucide-react';

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Component error:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Avatar3D = lazy(() => import('./Avatar3D').then(module => ({ default: module.Avatar3D })));
const VoiceInteraction = lazy(() => import('./VoiceInteraction').then(module => ({ default: module.VoiceInteraction })));
const FaceRecognition = lazy(() => import('./FaceRecognition').then(module => ({ default: module.FaceRecognition })));

const benefits = [
  {
    icon: TrendingUp,
    stat: '3x Faster',
    title: 'Hiring Speed',
    description: 'Reduce time-to-hire from weeks to days with automated screening and instant candidate evaluation.'
  },
  {
    icon: Users,
    stat: '800+',
    title: 'Companies Trust Us',
    description: 'Join hundreds of forward-thinking companies that have modernized their recruitment process.'
  },
  {
    icon: DollarSign,
    stat: '60%',
    title: 'Cost Reduction',
    description: 'Lower recruitment costs by automating initial screening and reducing recruiter workload significantly.'
  },
  {
    icon: Star,
    stat: '4.9/5',
    title: 'Customer Rating',
    description: 'Highly rated by HR professionals for ease of use, accuracy, and impact on hiring quality.'
  }
];

export default function Benefits() {
  const [visibleStats, setVisibleStats] = useState<boolean[]>([]);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const [activeTab, setActiveTab] = useState<'avatar' | 'voice' | 'face'>('avatar');
  const [avatarState, setAvatarState] = useState({ isListening: false, isAnalyzing: false, matchScore: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            benefits.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visibleStats.some(v => v)) {
      const interval = setInterval(() => {
        setCounters(prev => prev.map((val, idx) => {
          if (!visibleStats[idx]) return 0;
          if (idx === 0) return Math.min(val + 0.1, 3);
          if (idx === 1) return Math.min(val + 20, 800);
          if (idx === 2) return Math.min(val + 2, 60);
          if (idx === 3) return Math.min(val + 0.1, 4.9);
          return val;
        }));
      }, 30);

      return () => clearInterval(interval);
    }
  }, [visibleStats]);

  const handleVoiceData = (isListening: boolean, audioFrequency: number) => {
    setAvatarState(prev => ({
      ...prev,
      isListening,
      matchScore: isListening ? Math.min(95 + audioFrequency * 5, 100) : prev.matchScore
    }));
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-500/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm text-gray-300 rounded-full text-sm font-semibold border border-white/20">
            Real Impact
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            The Impact on Your{' '}
            <span className="text-gradient from-white to-gray-400">Business</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Real results from companies using Neapy HR to revolutionize their hiring process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 delay-${index * 100} ${
                visibleStats[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              <div className="relative glass-effect-bw rounded-2xl p-8 group-hover:bg-white/20 transition-all duration-500 h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-400 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <benefit.icon className="w-8 h-8 text-black" />
                  </div>
                </div>

                <div className="text-5xl font-bold text-white mb-2">
                  {index === 0 && `${counters[0].toFixed(1)}x`}
                  {index === 1 && `${Math.floor(counters[1])}+`}
                  {index === 2 && `${Math.floor(counters[2])}%`}
                  {index === 3 && counters[3].toFixed(1)}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative glass-effect-bw rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden group hover:bg-white/20 transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-gray-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            <div className="relative">
              <div className="space-y-4">
                <div className="flex gap-2 mb-6">
                  {(['avatar', 'voice', 'face'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        activeTab === tab
                          ? 'bg-white text-black'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {tab === 'avatar' && '3D Avatar'}
                      {tab === 'voice' && 'Voice'}
                      {tab === 'face' && 'Face Recognition'}
                    </button>
                  ))}
                </div>

                <div className="min-h-96">
                  <Suspense fallback={<div className="flex items-center justify-center h-96 text-white">Loading 3D component...</div>}>
                    {activeTab === 'avatar' && (
                      <ErrorBoundary fallback={<div className="text-white p-4">3D Avatar unavailable</div>}>
                        <Avatar3D isAnalyzing={false} matchScore={92} />
                      </ErrorBoundary>
                    )}
                    {activeTab === 'voice' && (
                      <ErrorBoundary fallback={<div className="text-white p-4">Voice component unavailable</div>}>
                        <VoiceInteraction onVoiceData={handleVoiceData} />
                      </ErrorBoundary>
                    )}
                    {activeTab === 'face' && (
                      <ErrorBoundary fallback={<div className="text-white p-4">Face recognition unavailable</div>}>
                        <FaceRecognition />
                      </ErrorBoundary>
                    )}
                  </Suspense>
                </div>
              </div>
            </div>

            <div className="text-white space-y-6 relative">
              <Quote className="w-12 h-12 text-gray-400 mb-4 opacity-50" />

              <h3 className="text-3xl lg:text-4xl font-bold">
                Advanced Biometric{' '}
                <span className="text-gradient from-white to-gray-300">Analysis</span>
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                Our AI-powered system combines 3D facial recognition, voice analysis, and biometric evaluation to assess candidates with unprecedented accuracy. Real-time visualization shows engagement levels, facial expression analysis, and voice pattern recognition.
              </p>

              <div className="space-y-3 pt-4">
                {[
                  '3D Facial Mapping & Recognition',
                  'Voice Frequency & Emotion Analysis',
                  'Real-time Biometric Metrics',
                  'Engagement Level Tracking'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-white to-gray-400 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-1 pt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300 fill-gray-300" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
