import { ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  'No credit card required',
  '14-day free trial',
  'Full access to all features',
  'Cancel anytime'
];

export default function CTA() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="p-12 lg:p-16 text-white space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-xl text-blue-50 leading-relaxed">
                Join hundreds of companies using Neapy HR to find exceptional talent faster and more efficiently.
              </p>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                    <span className="text-lg text-blue-50">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30">
                  Schedule Demo
                </button>
              </div>
            </div>

            <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
              <img
                src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional Team"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
