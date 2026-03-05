import api from './api';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    created_at?: string;
}

/**
 * Service pour la gestion des utilisateurs (Admin)
 */
export const userService = {
    /**
     * Récupérer tous les utilisateurs internes
     */
    getAll: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },

    /**
     * Voir un utilisateur spécifique
     */
    getById: async (id: string) => {
        const response = await api.get(`/admin/users/${id}`);
        return response.data;
    },

    /**
     * Créer un nouvel utilisateur
     */
    create: async (data: any) => {
        const response = await api.post('/admin/users', data);
        return response.data;
    },

    /**
     * Mettre à jour un utilisateur
     */
    update: async (id: string, data: any) => {
        const response = await api.put(`/admin/users/${id}`, data);
        return response.data;
    },

    /**
     * Supprimer un utilisateur
     */
    delete: async (id: string) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    }
};

export default userService;
