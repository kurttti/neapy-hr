import { useState, useEffect, useRef } from 'react';
import { Bot, Clock, Target, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'Интервью на базе ИИ',
    description: 'Продвинутый ИИ проводит естественные, увлекательные беседы с кандидатами, задавая релевантные вопросы на основе требований к должности.',
    gradient: 'from-white to-gray-400'
  },
  {
    icon: Clock,
    title: 'Экономия 85% времени',
    description: 'Автоматизируйте начальные этапы отбора и сосредоточьте команду на финальных кандидатах, которые лучше всего подходят.',
    gradient: 'from-gray-300 to-gray-500'
  },
  {
    icon: Target,
    title: 'Умное сопоставление',
    description: 'Наш ИИ анализирует ответы, навыки и опыт, чтобы предоставить точные оценки соответствия кандидата и вакансии.',
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    icon: BarChart3,
    title: 'Детальная аналитика',
    description: 'Получайте комплексные данные о производительности кандидатов, сильных и слабых сторонах, а также рекомендации по найму.',
    gradient: 'from-white to-gray-300'
  },
  {
    icon: Shield,
    title: 'Беспристрастный отбор',
    description: 'Обеспечьте справедливую и последовательную оценку всех кандидатов с помощью стандартизированных оценок на базе ИИ.',
    gradient: 'from-gray-300 to-white'
  },
  {
    icon: Zap,
    title: 'Мгновенные результаты',
    description: 'Получайте немедленную обратную связь и оценочные карты после каждого интервью, ускоряя процесс найма.',
    gradient: 'from-gray-400 to-gray-300'
  }
];

export default function Features() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(features.map(() => true));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-200/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-300/20 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
            Мощные возможности
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-black mb-6">
            Всё необходимое для{' '}
            <span className="text-gradient from-black via-gray-600 to-black">умного найма</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Мощные возможности, разработанные для оптимизации процесса рекрутинга и быстрого поиска лучших талантов.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 delay-${index * 100} ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                   style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}>
                <div className={`w-full h-full bg-gradient-to-br ${feature.gradient} opacity-10`}></div>
              </div>

              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 h-full group-hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                <div className="mt-6 flex items-center text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  Узнать больше →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
