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

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirect to unauthorized page or dashboard if role is not allowed
        // For now, redirect to dashboard or show unauthorized message
        // If user is vendor trying to access admin, go to /dashboard (vendor dashboard)
        // If user is admin trying to access vendor, go to /admin/dashboard
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default RequireRole;
