// Placeholder service for Invoice API calls
// TODO: Replace with real Laravel API integration

import { User } from '../auth/AuthProvider';

export interface Invoice {
    id: string;
    numero: string;
    client_id: string;
    montant_ht: number;
    montant_ttc: number;
    tva: number;
    statut: 'brouillon' | 'envoyee' | 'payee' | 'annulee';
    date_emission: string;
    date_echeance: string;
    created_at?: string;
}

export const invoiceService = {
    async getAll(): Promise<Invoice[]> {
        // Mock implementation
        return [];
    },

    async getById(id: string): Promise<Invoice | null> {
        // Mock implementation
        return null;
    },

    async create(data: Partial<Invoice>): Promise<Invoice> {
        // Mock implementation
        throw new Error('Not implemented');
    },

    async update(id: string, data: Partial<Invoice>): Promise<Invoice> {
        // Mock implementation
        throw new Error('Not implemented');
    },

    async delete(id: string): Promise<void> {
        // Mock implementation
        throw new Error('Not implemented');
    }
};
