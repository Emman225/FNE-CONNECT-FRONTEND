import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { PublicRoutes } from './routes/public.routes';
import { AdminRoutes } from './routes/admin.routes';

function App() {
    const location = useLocation();

    // console.log('🚀 App component rendering...');
    return (
        <ThemeProvider>
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: '#F0FDF4',
                            border: '1px solid #22C55E',
                            color: '#15803D',
                            fontWeight: '500',
                        },
                        iconTheme: {
                            primary: '#22C55E',
                            secondary: '#FFFFFF',
                        },
                    },
                    error: {
                        style: {
                            background: '#FEF2F2',
                            border: '1px solid #EF4444',
                            color: '#B91C1C',
                            fontWeight: '500',
                        },
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#FFFFFF',
                        },
                    },
                    style: {
                        padding: '16px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        fontSize: '0.95rem',
                        maxWidth: '400px',
                    },
                }}
            />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {PublicRoutes}
                    {AdminRoutes}

                    {/* Unauthorized */}
                    <Route path="/unauthorized" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h1>Accès non autorisé</h1><p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p></div>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatePresence>
        </ThemeProvider>
    );
}

export default App;
