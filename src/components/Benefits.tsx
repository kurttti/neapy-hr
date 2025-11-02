import { TrendingUp, Users, DollarSign, Star } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    stat: '3x Faster',
    title: 'Hiring Speed',
    description: 'Reduce time-to-hire from weeks to days with automated screening and instant candidate evaluation.'
  },
  {
    icon: Users,
    stat: '500+',
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
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzFhMzU1ZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjMiLz48L2c+PC9zdmc+')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            The Impact on Your Business
          </h2>
          <p className="text-xl text-blue-100">
            Real results from companies using Neapy HR to revolutionize their hiring process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{benefit.stat}</div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy HR Team"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="text-white space-y-6">
              <h3 className="text-3xl font-bold">Loved by HR Teams Worldwide</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                "Neapy HR has completely transformed our hiring process. We've reduced screening time by 85% and found better candidates faster than ever before. The AI interviews are incredibly natural and provide insights we never had access to before."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Sarah Johnson"
                  className="w-16 h-16 rounded-full border-2 border-white/30"
                />
                <div>
                  <div className="font-bold">Sarah Johnson</div>
                  <div className="text-blue-200">Head of HR, TechCorp Inc.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
