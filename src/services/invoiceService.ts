import api from './api';
import { InvoiceFormData } from '../types/invoice.types';

/**
 * Service pour la gestion des factures, devis et proformas
 */
export const invoiceService = {
    /**
     * Lister les documents du vendeur
     */
    /**
     * Lister les documents du vendeur
     */
    getAll: async (params?: any) => {
        const response = await api.get('/invoices', { params });
        return {
            ...response.data,
            data: response.data.data.map((item: any) => invoiceService._mapFromResponse(item))
        };
    },

    /**
     * Détails d'un document spécifique
     */
    getById: async (id: string) => {
        const response = await api.get(`/invoices/${id}`);
        return invoiceService._mapFromResponse(response.data.data || response.data);
    },

    /**
     * Convertir un document en un autre type (Facture ou Proforma)
     */
    convertToInvoice: async (id: string | number, type: 'INVOICE' | 'PROFORMA' = 'INVOICE') => {
        const response = await api.post(`/invoices/${id}/convert`, { type });
        return response.data;
    },

    /**
     * Supprimer un document
     */
    delete: async (id: string | number) => {
        const response = await api.delete(`/invoices/${id}`);
        return response.data;
    },

    /**
     * Helper pour mapper les données backend vers le frontend
     */
    _mapFromResponse: (data: any): InvoiceFormData => {
        return {
            documentType: data.type,
            billingType: data.billing_type,
            paymentMethod: data.payment_method || 'BANK_TRANSFER',
            hasRNE: data.has_rne || false,
            rneNumber: data.rne_number,
            dueDate: data.due_date,
            clientInfo: {
                id: data.client_id,
                clientName: data.client?.name || data.client_name || '',
                phone: data.client?.phone || '',
                email: data.client?.email || '',
                additionalNotes: data.notes,
                footerText: data.footer_text,
                ncc: data.client?.ncc,
                currency: data.currency || 'XAF',
                exchangeRate: data.exchange_rate || 1
            },
            lineItems: (data.items || []).map((item: any) => ({
                id: item.id.toString(),
                designation: item.description,
                reference: item.reference,
                quantity: item.quantity,
                unitPriceHT: item.unit_price_ht,
                unitOfMeasure: item.unit_of_measure,
                discountPercent: item.discount_percent || 0,
                taxCode: item.tax_rate,
                totalHT: item.total_ht
            })),
            additionalTaxes: [], // A adapter si le backend les renvoie
            globalDiscount: {
                percent: 0,
                amount: data.global_discount_amount || 0
            },
            totalTaxes: [],
            acompte: data.acompte || 0,
            totals: {
                subtotalHT: data.subtotal_ht || 0,
                totalDiscount: data.total_discount || 0,
                totalAfterDiscount: data.total_after_discount || 0,
                totalTaxAmount: data.total_tax_amount || 0,
                totalAdditionalTaxes: 0,
                totalTTCTaxes: 0,
                totalTTC: data.total_ttc || 0,
                netAPayer: data.net_a_payer || 0,
                taxSummary: []
            },
            invoiceNumber: data.invoice_number || data.number,
            accountNumber: data.account_number,
            isComplete: data.is_complete,
            status: data.status,
            dgiUid: data.dgi_uid,
            dgiQrCode: data.dgi_qr_code,
            dgiSynced: data.dgi_synced,
            fneOfficialPdfPath: data.fne_official_pdf_path,
            issuer: data.vendor ? {
                name: data.vendor.business_name,
                ncc: data.vendor.rne_number || data.vendor.nif,
                address: data.vendor.address,
                phone: data.vendor.contact_phone,
                email: data.vendor.user?.email,
                city: data.vendor.city,
                rccm: data.vendor.rccm,
                regime: data.vendor.tax_regime,
                center: data.vendor.tax_center,
                bank: data.vendor.bank_account_info,
                legalFooter: data.vendor.legal_footer,
            } : undefined,
            id: data.id,
            createdAt: data.created_at ? new Date(data.created_at) : undefined,
            updatedAt: data.updated_at ? new Date(data.updated_at) : undefined
        };
    },

    /**
     * Créer un nouveau document (Facture, Devis, Proforma)
     */
    create: async (data: InvoiceFormData) => {
        const payload = invoiceService._mapToPayload(data);
        const response = await api.post('/invoices', payload);
        return response.data;
    },

    /**
     * Mettre à jour un document existant
     */
    update: async (id: string, data: InvoiceFormData) => {
        const payload = invoiceService._mapToPayload(data);
        const response = await api.put(`/invoices/${id}`, payload);
        return response.data;
    },

    /**
     * Helper pour mapper les données du frontend vers le format backend
     */
    _mapToPayload: (data: InvoiceFormData) => {
        const formData = new FormData();

        formData.append('client_id', String(data.clientInfo.id));
        formData.append('type', data.documentType);
        formData.append('billing_type', data.billingType);
        formData.append('issue_date', new Date().toISOString().split('T')[0]);
        if (data.dueDate) formData.append('due_date', data.dueDate);
        formData.append('currency', data.clientInfo.currency || 'XAF');
        formData.append('has_rne', data.hasRNE ? '1' : '0');
        if (data.rneNumber) formData.append('rne_number', data.rneNumber);
        if (data.clientInfo.additionalNotes) formData.append('notes', data.clientInfo.additionalNotes);
        if (data.clientInfo.footerText) formData.append('footer_text', data.clientInfo.footerText);
        formData.append('global_discount_amount', String(data.globalDiscount.amount || 0));
        formData.append('global_discount_percent', String(data.globalDiscount.percent || 0));
        formData.append('acompte', String(data.acompte || 0));

        // Section 4 & 6 (JSON)
        formData.append('additional_taxes_json', JSON.stringify(data.additionalTaxes || []));
        formData.append('ttc_taxes_json', JSON.stringify(data.totalTaxes || []));

        // Articles (JSON stringified pour le transport via FormData)
        const items = data.lineItems.map(item => ({
            description: item.designation,
            reference: item.reference,
            quantity: item.quantity,
            unit_price_ht: item.unitPriceHT,
            unit_of_measure: item.unitOfMeasure,
            discount_percent: item.discountPercent,
            tax_rate: item.taxCode,
            additional_taxes: item.additionalTaxes // per-item additional taxes
        }));
        formData.append('items_json', JSON.stringify(items));

        // Fichiers
        if (data.purchaseOrderFile instanceof File) {
            formData.append('purchase_order_file', data.purchaseOrderFile);
        }
        if (data.deliveryNoteFile instanceof File) {
            formData.append('delivery_note_file', data.deliveryNoteFile);
        }

        return formData;
    },

    /**
     * Fiscaliser une facture via la DGI
     */
    finalize: async (id: string) => {
        const response = await api.post(`/invoices/${id}/finalize`);
        return {
            ...response.data,
            invoice: invoiceService._mapFromResponse(response.data.invoice)
        };
    },

    /**
     * Récupérer l'historique des paiements d'une facture
     */
    getPayments: async (id: string) => {
        const response = await api.get(`/invoices/${id}/payments`);
        return response.data;
    },

    /**
     * Liste globale pour l'administration
     */
    adminGetAll: async (params = {}) => {
        const response = await api.get('/admin/invoices', { params });
        return {
            ...response.data,
            data: response.data.data.map((item: any) => invoiceService._mapFromResponse(item))
        };
    },

    /**
     * Télécharger le PDF officiel FNE (Admin)
     */
    uploadFnePdf: async (id: string | number, file: File) => {
        const formData = new FormData();
        formData.append('fne_file', file);
        const response = await api.post(`/admin/invoices/${id}/upload-fne`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
};
