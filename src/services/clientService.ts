import api from './api';

/**
 * Service pour la gestion des clients du vendeur
 */
export const clientService = {
    /**
     * Lister les clients
     */
    getAll: async (params?: any) => {
        const response = await api.get('/clients', { params });
        return response.data;
    },

    /**
     * Obtenir un client par ID
     */
    getById: async (id: string) => {
        const response = await api.get(`/clients/${id}`);
        return response.data;
    },

    /**
     * Créer un client
     */
    create: async (data: any) => {
        const response = await api.post('/clients', data);
        return response.data;
    },

    /**
     * Mettre à jour un client
     */
    update: async (id: string, data: any) => {
        const response = await api.put(`/clients/${id}`, data);
        return response.data;
    },

    /**
     * Supprimer un client
     */
    delete: async (id: string) => {
        const response = await api.delete(`/clients/${id}`);
        return response.data;
    }
};
