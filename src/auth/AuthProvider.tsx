import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '../types/roles';
import { authService } from '../services/authService';

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
    token?: string; // Token JWT
}

interface AuthContextType {
    user: User | null;
    login: (phoneOrEmail: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
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

    // Inactivity logout (5 minutes)
    const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

    React.useEffect(() => {
        if (!user) return;

        let timeoutId: any;

        const resetTimer = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                console.log("Inactivity detected, logging out...");
                logout();
            }, INACTIVITY_TIMEOUT);
        };

        // Events to track user activity
        const activityEvents = [
            'mousedown', 'mousemove', 'keydown',
            'scroll', 'touchstart', 'click'
        ];

        // Initialize timer
        resetTimer();

        // Add event listeners
        activityEvents.forEach(event => {
            window.addEventListener(event, resetTimer);
        });

        // Cleanup
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            activityEvents.forEach(event => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [user]);

    /**
     * Login function
     * Uses real backend API
     */
    const login = async (phoneOrEmail: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
        try {
            const data = await authService.login({
                phone: phoneOrEmail, // Le backend accepte phone ou email sur ce champ dans ma logique simplifiée
                email: phoneOrEmail,
                password
            });

            if (data.access_token) {
                const authenticatedUser: User = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role as UserRole,
                    statut_compte: data.user.status,
                    date_creation: data.user.created_at,
                    date_derniere_connexion: new Date().toISOString(),
                    avatar: data.user.name.substring(0, 2).toUpperCase(),
                    token: data.access_token
                };

                setUser(authenticatedUser);
                localStorage.setItem('fne_user', JSON.stringify(authenticatedUser));
                return { success: true, user: authenticatedUser };
            }

            return { success: false, error: 'Une erreur est survenue lors de la connexion' };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || 'Email/Téléphone ou mot de passe incorrect'
            };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (e) {
            console.error("Logout error", e);
        } finally {
            setUser(null);
            localStorage.removeItem('fne_user');
        }
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
