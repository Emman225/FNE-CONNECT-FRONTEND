import api from './api';

export const settingService = {
    /**
     * Get settings by group
     */
    getByGroup: async (group: string) => {
        const response = await api.get(`/admin/settings`, { params: { group } });
        return response.data;
    },

    /**
     * Update multiple settings
     */
    updateBulk: async (settings: Array<{ key: string, value: any }>) => {
        const response = await api.post('/admin/settings/bulk', { settings });
        return response.data;
    },

    /**
     * Update a single setting
     */
    update: async (key: string, value: any) => {
        const response = await api.put(`/admin/settings/${key}`, { value });
        return response.data;
    }
};

export default settingService;
