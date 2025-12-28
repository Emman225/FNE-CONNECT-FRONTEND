// Common TypeScript types for the application

export interface Client {
    id: string;
    nom: string;
    prenom?: string;
    email: string;
    telephone: string;
    adresse?: string;
    type: 'particulier' | 'entreprise';
    created_at?: string;
}

export interface Payment {
    id: string;
    invoice_id: string;
    montant: number;
    methode: 'mobile_money' | 'virement' | 'especes' | 'cheque';
    statut: 'en_attente' | 'valide' | 'echoue';
    date_paiement: string;
    reference?: string;
}

export interface Commission {
    id: string;
    vendor_id: string;
    invoice_id: string;
    montant: number;
    taux: number;
    statut: 'calculee' | 'approuvee' | 'payee';
    date_calcul: string;
}

export interface Payout {
    id: string;
    vendor_id: string;
    montant_total: number;
    statut: 'en_attente' | 'traite' | 'complete';
    date_demande: string;
    date_traitement?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
