import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const features = [
  'No credit card required',
  '14-day free trial',
  'Full access to all features',
  'Cancel anytime'
];

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-200/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300/30 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="relative bg-gradient-to-br from-gray-800 via-black to-gray-800 rounded-3xl overflow-hidden shadow-2xl animate-gradient">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>

          <div className="grid lg:grid-cols-2 gap-0 items-stretch relative">
            <div className="p-12 lg:p-16 text-white space-y-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full w-fit shadow-lg">
                <Sparkles className="w-4 h-4 text-gray-300" />
                <span className="text-sm font-semibold">Limited Time Offer</span>
              </div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Ready to Transform Your Hiring?
              </h2>

              <p className="text-xl text-gray-200 leading-relaxed">
                Join hundreds of companies using Neapy HR to find exceptional talent faster and more efficiently.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-gray-100 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-white to-gray-300 text-black rounded-xl font-semibold overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                </button>

                <button className="group px-8 py-4 glass-effect-bw text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg flex items-center justify-center gap-2">
                  Schedule Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-gray-200">
                <div className="flex -space-x-3">
                  {[
                    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
                    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
                    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
                    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100'
                  ].map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`User ${idx + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-white/30 object-cover"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">Join 800+ companies</div>
                  <div className="text-gray-300">Already using Neapy HR</div>
                </div>
              </div>
            </div>

            <div className="relative h-full min-h-[500px] lg:min-h-[700px] group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
              <img
                src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional Team"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute bottom-8 left-8 right-8 z-20 glass-effect-bw rounded-2xl p-6 shadow-2xl transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-2xl mb-1">85% Time Saved</div>
                    <div className="text-gray-300">Average across all clients</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
                    <CheckCircle className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
