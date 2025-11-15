import { Component, ReactNode } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Footer from './components/Footer';

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('App error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
            <p className="text-gray-700 mb-4">Something went wrong. Please refresh the page.</p>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <CTA />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
