import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; background: #f0f0f0; min-height: 100vh;">
        <h1 style="color: #d32f2f;">Error Loading Application</h1>
        <p><strong>Error:</strong> ${event.error?.message || event.message || 'Unknown error'}</p>
        <p><strong>File:</strong> ${event.filename || 'Unknown'}</p>
        <p><strong>Line:</strong> ${event.lineno || 'Unknown'}</p>
        <pre style="background: #fff; padding: 10px; border-radius: 4px; overflow: auto;">${event.error?.stack || 'No stack trace'}</pre>
      </div>
    `;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; background: #f0f0f0; min-height: 100vh;">
      <h1 style="color: #d32f2f;">Error Loading Application</h1>
      <p><strong>Error:</strong> ${error instanceof Error ? error.message : String(error)}</p>
      <pre style="background: #fff; padding: 10px; border-radius: 4px; overflow: auto;">${error instanceof Error ? error.stack : String(error)}</pre>
    </div>
  `;
}
