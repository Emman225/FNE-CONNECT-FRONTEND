import api from './api';

/**
 * Service pour les fonctionnalités d'administration
 */
export const adminService = {
    /**
     * Récupérer les statistiques globales du dashboard admin
     */
    getDashboardStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    /**
     * Récupérer la liste des vendeurs
     */
    getVendors: async (params?: any) => {
        const response = await api.get('/admin/vendors', { params });
        return response.data;
    },

    /**
     * Revue d'un dossier KYC
     */
    reviewKyc: async (vendorId: string, status: 'approved' | 'rejected', reason?: string) => {
        const response = await api.post(`/admin/vendors/${vendorId}/review-kyc`, { status, reason });
        return response.data;
    },

    /**
     * Mettre à jour le statut d'un vendeur
     */
    updateVendorStatus: async (vendorId: string, status: 'active' | 'suspended') => {
        const response = await api.put(`/admin/vendors/${vendorId}/status`, { status });
        return response.data;
    },

    /**
     * Supprimer un vendeur
     */
    deleteVendor: async (vendorId: string) => {
        const response = await api.delete(`/admin/vendors/${vendorId}`);
        return response.data;
    },

    /**
     * Récupérer les documents d'un vendeur
     */
    getVendorDocuments: async (vendorId: string) => {
        const response = await api.get(`/admin/vendors/${vendorId}/documents`);
        return response.data;
    },

    /**
     * Récupérer les alertes AML
     */
    getAmlAlerts: async () => {
        const response = await api.get('/admin/aml/alerts');
        return response.data;
    }
};

export default adminService;
