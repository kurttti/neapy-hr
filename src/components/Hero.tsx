import { useState, useEffect } from 'react';
import { Bot, Sparkles, ArrowRight, Play, ChevronRight, Zap } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const generatedParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 0.5
    }));
    setParticles(generatedParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black min-h-screen perspective">
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.05), transparent 50%)`
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-400/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-600/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.2,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <nav className="relative z-20 px-6 py-6 lg:px-8">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="glass-effect-bw rounded-2xl px-6 py-4 group perspective">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative group/logo">
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-400 rounded-xl blur-lg group-hover/logo:blur-xl transition-all duration-500 opacity-40 animate-breathing"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center shadow-lg transform group-hover/logo:scale-110 group-hover/logo:rotate-3 transition-all duration-300">
                    <Bot className="w-7 h-7 text-black" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-white group-hover/logo:text-transparent group-hover/logo:bg-clip-text group-hover/logo:bg-gradient-to-r group-hover/logo:from-white group-hover/logo:to-gray-300 transition-all duration-300">Neapy HR</span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                {['Features', 'How It Works', 'Pricing'].map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                    className="relative text-gray-300 hover:text-white transition-colors duration-200 font-medium group/link"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover/link:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button className="hidden sm:block px-6 py-2.5 text-white hover:text-gray-300 transition-colors duration-200 font-semibold group/signin">
                  Sign In
                  <span className="block absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover/signin:w-full transition-all duration-300"></span>
                </button>
                <button className="group relative px-6 py-2.5 bg-gradient-to-r from-white to-gray-300 text-black rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 btn-glow-bw">
                  <span className="relative z-10 flex items-center gap-2 group-hover:animate-text-shimmer">
                    Get Started
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 glass-effect-bw rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105">
                <Sparkles className="w-4 h-4 text-gray-300 animate-pulse" />
                <span className="text-sm font-semibold text-gray-200">AI-Powered Recruitment Revolution</span>
                <div className="w-6 h-6 bg-gradient-to-r from-white to-gray-400 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-180 transition-all duration-500">
                  <ArrowRight className="w-3 h-3 text-black" />
                </div>
              </div>
            </div>

            <h1 className={`text-6xl lg:text-7xl font-bold leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Hire Smarter with{' '}
              <span className="relative inline-block">
                <span className="text-gradient from-white via-gray-300 to-white animate-gradient">
                  AI Interviews
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white to-gray-400 rounded-full animate-pulse-glow"></div>
              </span>
            </h1>

            <p className={`text-xl text-gray-300 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Transform your recruitment with advanced AI that conducts natural screening interviews, evaluates candidates instantly, and helps you discover exceptional talent 3x faster than traditional methods.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-white to-gray-300 text-black rounded-xl font-semibold overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 btn-glow-bw">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Free Trial
                  <Zap className="w-5 h-5 group-hover:animate-bounce-in" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
              </button>

              <button className="group px-8 py-4 glass-effect-bw text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 perspective">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            <div className={`grid grid-cols-3 gap-8 pt-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                { value: '15k+', label: 'Interviews', delay: '0ms' },
                { value: '800+', label: 'Companies', delay: '100ms' },
                { value: '90%', label: 'Time Saved', delay: '200ms' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="relative card-hover">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-400/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 animate-pulse-glow"></div>
                    <div className="relative glass-effect-bw rounded-xl p-4 group-hover:bg-white/20 transition-all duration-300">
                      <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative animate-float" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-gray-400/20 rounded-3xl blur-3xl opacity-30 animate-pulse-glow animate-breathing"></div>

              <div className="relative glass-effect-bw rounded-3xl p-8 shadow-2xl group hover:scale-[1.02] transition-all duration-500 perspective card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <img
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="AI Interview Interface"
                  className="relative rounded-2xl shadow-2xl w-full h-auto group-hover:brightness-110 transition-all duration-500"
                />

                <div className="absolute top-4 right-4 glass-effect-bw rounded-xl px-4 py-2 shadow-lg animate-fadeInUp group-hover:animate-bounce-in">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-semibold">Live Interview</span>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 glass-effect-bw rounded-2xl p-6 shadow-2xl max-w-xs animate-slideInRight group-hover:animate-breathing">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-400 rounded-full blur-md animate-pulse-glow animate-breathing"></div>
                      <div className="relative w-14 h-14 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Bot className="w-7 h-7 text-black" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">AI Analysis Complete</div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-gradient from-white to-gray-300">97%</div>
                        <span className="text-sm text-gray-300">Match Score</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 glass-effect-bw rounded-xl p-4 shadow-xl animate-scaleIn group-hover:animate-pulse-glow" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gray-200 animate-bounce-in" />
                    <span className="text-white font-semibold">Top Candidate</span>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="w-full h-full bg-gradient-to-r from-white/20 to-gray-400/20 rounded-full blur-3xl animate-pulse-glow animate-orbit"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </div>
  );
}
