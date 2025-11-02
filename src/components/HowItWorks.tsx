import { Upload, MessageSquare, LineChart, CheckCircle } from 'lucide-react';

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
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600">
            Four simple steps to transform your hiring process and find exceptional talent.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 hidden lg:block transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-xl h-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
