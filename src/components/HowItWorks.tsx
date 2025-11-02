import { useState, useEffect, useRef } from 'react';
import { Upload, MessageSquare, LineChart, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Post Your Job',
    description: 'Upload job requirements and define the skills and qualities you are looking for in candidates.'
  },
  {
    icon: MessageSquare,
    step: '02',
    title: 'AI Conducts Interviews',
    description: 'Our AI interviews candidates through natural conversations, asking tailored questions and evaluating responses.'
  },
  {
    icon: LineChart,
    step: '03',
    title: 'Review Analytics',
    description: 'Access detailed scorecards with insights on candidate skills, experience, and cultural fit ratings.'
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Make Better Hires',
    description: 'Select top candidates with confidence using data-driven recommendations and comprehensive evaluations.'
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200);
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
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
            Simple Process
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-black mb-6">
            How It <span className="text-gradient from-gray-700 to-black">Works</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Four simple steps to transform your hiring process and find exceptional talent.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent hidden lg:block transform -translate-y-1/2"></div>

          <div className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-black to-gray-500 hidden lg:block transform -translate-y-1/2 transition-all duration-1000"
               style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 delay-${index * 100} ${
                  visibleSteps[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`group relative bg-white rounded-2xl p-8 border-2 transition-all duration-500 h-full hover:shadow-2xl ${
                  activeStep === index
                    ? 'border-black shadow-xl scale-105'
                    : 'border-gray-200 shadow-sm hover:border-gray-400'
                }`}>

                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-100/50 to-gray-200/50 opacity-0 transition-opacity duration-500 ${
                    activeStep === index ? 'opacity-100' : 'group-hover:opacity-100'
                  }`}></div>

                  <div className="relative flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <div className={`absolute inset-0 bg-gradient-to-br from-black to-gray-600 rounded-2xl blur-lg transition-all duration-500 ${
                        activeStep === index ? 'opacity-40 scale-110' : 'opacity-0 group-hover:opacity-20'
                      }`}></div>

                      <div className={`relative w-24 h-24 bg-gradient-to-br from-black to-gray-600 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                        activeStep === index ? 'scale-110 rotate-3' : 'group-hover:scale-105'
                      }`}>
                        <step.icon className="w-12 h-12 text-white" />
                      </div>

                      <div className={`absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xl transition-all duration-500 ${
                        activeStep === index ? 'scale-110' : 'group-hover:scale-105'
                      }`}>
                        {step.step}
                      </div>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-12 -right-8 w-16">
                        <ArrowRight className={`w-6 h-6 text-gray-400 transition-all duration-500 ${
                          activeStep === index ? 'text-black translate-x-2' : ''
                        }`} />
                      </div>
                    )}
                  </div>

                  <h3 className={`relative text-xl font-bold text-center mb-4 transition-colors duration-300 ${
                    activeStep === index ? 'text-black' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="relative text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>

                  <div className={`relative mt-6 h-1 bg-gradient-to-r from-black to-gray-500 rounded-full transition-all duration-500 ${
                    activeStep === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-3">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? 'w-12 bg-gradient-to-r from-black to-gray-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
