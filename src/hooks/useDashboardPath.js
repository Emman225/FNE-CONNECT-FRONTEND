// useDashboardPath.js - Hook pour gérer les chemins du dashboard
import { useLocation } from 'react-router-dom';

export const useDashboardPath = () => {
    const location = useLocation();
    const isAdminArea = location.pathname.startsWith('/admin');
    const basePath = isAdminArea ? '/admin/dashboard' : '/dashboard';

    return { basePath, isAdminArea };
};
