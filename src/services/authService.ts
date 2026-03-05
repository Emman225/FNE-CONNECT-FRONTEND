import api from './api';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

/**
 * Service gérant l'authentification et les sessions utilisateurs
 */
export const authService = {
    /**
     * Inscription d'un nouveau vendeur
     */
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    /**
     * Vérification du code OTP
     */
    verifyOtp: async (phone: string, otpCode: string): Promise<AuthResponse> => {
        const response = await api.post('/auth/verify-otp', { phone, otp_code: otpCode });
        return response.data;
    },

    /**
     * Connexion utilisateur
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    /**
     * Rafraîchissement du token JWT
     */
    refreshToken: async (): Promise<{ token: string }> => {
        const response = await api.post('/auth/refresh');
        return response.data;
    },

    /**
     * Déconnexion utilisateur
     */
    logout: async (): Promise<void> => {
        try {
            await api.post('/auth/logout');
        } finally {
            localStorage.removeItem('user');
        }
    },

    /**
     * Récupérer le profil utilisateur connecté
     */
    getProfile: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
