import api from './api';

export const auditService = {
    /**
     * Récupérer les journaux d'audit
     */
    getAll: async (params = {}) => {
        const response = await api.get('/admin/audit-logs', { params });
        return response.data;
    },

    /**
     * Récupérer les détails d'un log
     */
    getById: async (id: string | number) => {
        const response = await api.get(`/admin/audit-logs/${id}`);
        return response.data;
    }
};

export default auditService;
