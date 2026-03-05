import api from './api';

/**
 * Service pour la gestion du profil vendeur, KYC et statistiques
 */
export const vendorService = {
    /**
     * Récupérer les statistiques du dashboard (KPIs + Graphique)
     */
    getDashboardStats: async () => {
        const response = await api.get('/vendor/stats');
        return response.data;
    },

    /**
     * Récupérer le profil vendeur et les docs KYC
     */
    getProfile: async () => {
        const response = await api.get('/vendor/profile');
        return response.data;
    },

    /**
     * Mettre à jour le profil (Identity, Activity, Business)
     */
    updateProfile: async (data: any) => {
        const response = await api.put('/vendor/profile', data);
        return response.data;
    },

    /**
     * Uploader un document KYC (CNI, Selfie, etc.)
     */
    uploadKycDocument: async (type: string, file: File) => {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('file', file);

        const response = await api.post('/vendor/kyc/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Soumettre le dossier KYC complet pour validation
     */
    submitKyc: async () => {
        const response = await api.post('/vendor/kyc/submit');
        return response.data;
    },

    // --- ADMIN METHODS ---

    /**
     * Liste des vendeurs (Admin)
     */
    adminGetAll: async (params?: any) => {
        const response = await api.get('/admin/vendors', { params });
        return response.data;
    },

    /**
     * Revue KYC (Admin)
     */
    adminReviewKyc: async (id: string, status: 'approved' | 'rejected', reason?: string) => {
        const response = await api.post(`/admin/vendors/${id}/review-kyc`, { status, reason });
        return response.data;
    },

    /**
     * Mettre à jour le statut du compte (Admin)
     */
    adminUpdateStatus: async (id: string, status: 'active' | 'suspended') => {
        const response = await api.put(`/admin/vendors/${id}/status`, { status });
        return response.data;
    },

    /**
     * Supprimer un vendeur (Admin)
     */
    adminDeleteVendor: async (id: string) => {
        const response = await api.delete(`/admin/vendors/${id}`);
        return response.data;
    }
};
