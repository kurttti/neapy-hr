import { Bot, Clock, Target, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Interviews',
    description: 'Advanced AI conducts natural, engaging conversations with candidates, asking relevant questions based on job requirements.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Clock,
    title: 'Save 85% Time',
    description: 'Automate initial screening rounds and focus your team on final stage candidates who are the best fit.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Target,
    title: 'Smart Matching',
    description: 'Our AI analyzes responses, skills, and experience to provide accurate candidate-job fit scores.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Get comprehensive insights on candidate performance, strengths, weaknesses, and hiring recommendations.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Shield,
    title: 'Bias-Free Screening',
    description: 'Ensure fair and consistent evaluation for all candidates with standardized AI-driven assessments.',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Receive immediate feedback and scorecards after each interview, accelerating your hiring pipeline.',
    gradient: 'from-yellow-500 to-orange-500'
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need to Hire Smarter
          </h2>
          <p className="text-xl text-slate-600">
            Powerful features designed to streamline your recruitment process and find the best talent faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
