import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '../types/roles';
import { findUserByCredentials } from '../data/mockUsers';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    statut_compte?: string;
    date_creation?: string;
    date_derniere_connexion?: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
    logout: () => void;
    hasRole: (role: UserRole) => boolean;
    hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('fne_user');
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error("Failed to parse user from local storage", e);
            return null;
        }
    });

    /**
     * Login function
     * Returns the authenticated user so the login component can handle navigation
     */
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
        // Simulate authentication delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find user by credentials
        const mockUser = findUserByCredentials(email, password);

        if (!mockUser) {
            return {
                success: false,
                error: 'Email ou mot de passe incorrect'
            };
        }

        // Create user object
        const authenticatedUser: User = {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
            statut_compte: 'actif',
            date_creation: new Date().toISOString(),
            date_derniere_connexion: new Date().toISOString(),
            avatar: mockUser.name.substring(0, 2).toUpperCase()
        };

        setUser(authenticatedUser);
        localStorage.setItem('fne_user', JSON.stringify(authenticatedUser));

        return { success: true, user: authenticatedUser };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('fne_user');
    };

    const hasRole = (role: UserRole): boolean => {
        return user?.role === role;
    };

    const hasAnyRole = (roles: UserRole[]): boolean => {
        return user ? roles.includes(user.role) : false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole, hasAnyRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
