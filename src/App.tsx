import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoutes } from './routes/public.routes';
import { AdminRoutes } from './routes/admin.routes';

function App() {
    // console.log('🚀 App component rendering...');
    return (
        <Routes>
            {PublicRoutes}
            {AdminRoutes}

            {/* Unauthorized */}
            <Route path="/unauthorized" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h1>Accès non autorisé</h1><p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p></div>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
