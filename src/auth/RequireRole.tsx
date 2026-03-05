import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { UserRole } from '../types/roles';

interface RequireRoleProps {
    allowedRoles: UserRole[];
}

const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    // Safety check for race conditions during navigation
    const storedUser = !user ? localStorage.getItem('fne_user') : null;
    const effectiveUser = user || (storedUser ? JSON.parse(storedUser) : null);

    if (!effectiveUser) {
        // Redirect to appropriate login based on path
        const isAdminPath = location.pathname.startsWith('/admin');
        return <Navigate to={isAdminPath ? "/admin" : "/auth/login"} state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(effectiveUser.role)) {
        // Redirect to appropriate dashboard if role is not allowed
        if (effectiveUser.role === 'vendor' && location.pathname.startsWith('/admin')) {
            return <Navigate to="/dashboard" replace />;
        }
        if (location.pathname.startsWith('/dashboard') && effectiveUser.role !== 'vendor') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default RequireRole;
