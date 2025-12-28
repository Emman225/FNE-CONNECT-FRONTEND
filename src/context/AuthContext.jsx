import React, { createContext, useContext, useState, useEffect } from 'react';
import { userRoles } from '../../core/constants/roles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Default to VENDOR role if not in localStorage, or null if not logged in
    // For MVP demo, we can initialize with a logged-in user or handle it in LoginPage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('fne_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('fne_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('fne_user');
    };

    // Helper to check if user has a specific role
    const hasRole = (role) => {
        return user?.role === role;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
