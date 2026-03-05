import api from './api';

export const paymentService = {
    /**
     * Voir les détails d'une facture via lien public
     */
    getPublicInvoice: async (token: string) => {
        const response = await api.get(`/public/payment/${token}`);
        return response.data;
    },

    /**
     * Effectuer un paiement client (Mobile Money)
     */
    processClientPayment: async (token: string, data: { amount: number, method: string, phone: string }) => {
        const response = await api.post(`/public/payment/${token}/process`, data);
        return response.data;
    },

    /**
     * Payer la commission FNE Connect (Vendeur)
     */
    payCommission: async (data: { invoice_id: string | number, amount: number, method: string, account_info: string }) => {
        const response = await api.post('/commissions/pay', data);
        return response.data;
    },

    /**
     * Historique des paiements d'une facture
     */
    getInvoicePayments: async (invoiceId: string | number) => {
        const response = await api.get(`/invoices/${invoiceId}/payments`);
        return response.data;
    },

    /**
     * Voir tous les paiements (Transactions)
     */
    getAll: async (params?: any) => {
        const response = await api.get('/payments', { params });
        return response.data;
    },

    /**
     * Validation finance d'un paiement (étape 1)
     */
    financeValidation: async (id: string, action: 'approve' | 'reject', notes?: string) => {
        const response = await api.post(`/payments/${id}/finance-validation`, { action, notes });
        return response.data;
    },

    /**
     * Validation admin d'un paiement (étape 2)
     */
    adminValidation: async (id: string, action: 'approve' | 'reject', notes?: string) => {
        const response = await api.post(`/payments/${id}/admin-validation`, { action, notes });
        return response.data;
    },

    /**
     * Enregistrer un paiement (admin)
     */
    store: async (data: {
        invoice_id: string,
        amount: number,
        method: string,
        payer_name?: string,
        payer_phone?: string,
        transaction_ref?: string,
        notes?: string,
    }) => {
        const response = await api.post('/payments', data);
        return response.data;
    }
};
