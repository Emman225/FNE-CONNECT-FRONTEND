console.log('🚀 Main.tsx starting...');
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/theme.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import { NotificationProvider } from './context/NotificationContext'
import { AuthProvider } from './auth/AuthProvider';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

console.log('🚀 Main.tsx starting...');
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

