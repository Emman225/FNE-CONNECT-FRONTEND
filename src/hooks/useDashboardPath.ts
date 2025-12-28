import { useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to determine the current area (vendor or admin)
 * and provide the base dashboard path.
 * 
 * @returns {Object} Object containing isAdminArea (boolean) and basePath (string)
 */
export const useDashboardPath = () => {
    const location = useLocation();

    // Detect if we're in the admin area
    const isAdminArea = location.pathname.startsWith('/admin');

    // Set appropriate base path
    const basePath = isAdminArea ? '/admin/dashboard' : '/dashboard';

    return { isAdminArea, basePath };
};
