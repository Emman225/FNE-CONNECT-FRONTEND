import api from './api';
import { apiDownload, apiOpenPdf } from './api';
import { WithdrawalRequest } from '../types/payout.types';

/**
 * Service pour la gestion des retraits (Payouts)
 */
export const payoutService = {
    /**
     * Lister l'historique des retraits du vendeur
     */
    getAll: async () => {
        const response = await api.get('/payouts');
        return response.data;
    },

    /**
     * Faire une demande de retrait (Withdrawal)
     */
    requestWithdrawal: async (data: WithdrawalRequest) => {
        const response = await api.post('/payouts', data);
        return response.data;
    },
    /**
     * Valider (approuver) un retrait (Finance ou Admin)
     */
    approve: async (id: string | number, comments?: string) => {
        const response = await api.post(`/payouts/${id}/approve`, { comments });
        return response.data;
    },

    /**
     * Rejeter un retrait
     */
    reject: async (id: string | number, reason: string, comments?: string) => {
        const response = await api.post(`/payouts/${id}/reject`, { reason, comments });
        return response.data;
    },

    // ========== PAYOUT RECEIPT (PDF & EMAIL) ==========

    /**
     * [Admin] Télécharger le reçu de reversement en PDF
     */
    downloadReceipt: async (id: string, reference: string): Promise<void> => {
        await apiDownload(`/admin/payouts/${id}/receipt/download`, `Recu_Reversement_${reference}.pdf`);
    },

    /**
     * [Admin] Ouvrir le reçu PDF dans un nouvel onglet (pour impression)
     */
    openReceiptPdf: async (id: string): Promise<void> => {
        await apiOpenPdf(`/admin/payouts/${id}/receipt/stream`);
    },

    /**
     * [Admin] Envoyer le reçu de reversement par email au vendeur
     */
    sendReceiptEmail: async (id: string): Promise<void> => {
        await api.post(`/admin/payouts/${id}/receipt/send-email`);
    },

    /**
     * [Vendor] Télécharger le reçu de reversement en PDF
     */
    vendorDownloadReceipt: async (id: string, reference: string): Promise<void> => {
        await apiDownload(`/vendor/payouts/${id}/receipt/download`, `Recu_Reversement_${reference}.pdf`);
    },

    /**
     * [Vendor] Ouvrir le reçu PDF dans un nouvel onglet (pour impression)
     */
    vendorOpenReceiptPdf: async (id: string): Promise<void> => {
        await apiOpenPdf(`/vendor/payouts/${id}/receipt/stream`);
    },
};
