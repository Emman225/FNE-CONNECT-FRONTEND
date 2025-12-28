// mockData.js - Données mock pour l'application
export const MOCK_AML_ALERTS = [
    {
        id: 'AL-001',
        type: 'transaction_suspecte',
        vendorId: 'V001',
        vendorName: 'Mamadou Diallo',
        amount: 5000000,
        severity: 'high',
        description: 'Transaction unique dépassant le seuil autorisé',
        createdAt: '2024-03-15T10:30:00',
        status: 'pending'
    },
    {
        id: 'AL-002',
        type: 'kyc_incomplete',
        vendorId: 'V002',
        vendorName: 'Fatou Sow',
        amount: 0,
        severity: 'medium',
        description: 'Documents KYC expirés',
        createdAt: '2024-03-20T14:15:00',
        status: 'pending'
    },
    {
        id: 'AL-003',
        type: 'rapid_movement',
        vendorId: 'V003',
        vendorName: 'Ibrahima Fall',
        amount: 1200000,
        severity: 'low',
        description: 'Série de retraits rapides après encaissement',
        createdAt: '2024-03-22T09:00:00',
        status: 'reviewed',
        reviewedBy: 'Compliance Officer',
        reviewedAt: '2024-03-23T11:00:00'
    }
];

export const MOCK_VENDORS = [];
export const MOCK_INVOICES = [];
export const MOCK_CLIENTS = [];
export const MOCK_PROFORMAS = [
    { id: 'PROF-2023-001', client: { name: 'Sarl Ivoir', phone: '0102030405' }, createdAt: '2023-12-01', validUntil: '2023-12-31', totalTTC: 450000, status: 'draft', isComplete: true },
    { id: 'PROF-2023-002', client: { name: 'Hôtel Splendid', phone: '0707080910' }, createdAt: '2023-12-05', validUntil: '2024-01-05', totalTTC: 1250000, status: 'pending', isComplete: true },
    { id: 'PROF-2023-003', client: { name: 'Garage Konan', phone: '0505050505' }, createdAt: '2023-12-10', validUntil: '2024-01-10', totalTTC: 75000, status: 'draft', isComplete: false },
];
export const MOCK_QUOTES = [];
export const MOCK_PAYMENTS = [];
export const MOCK_COMMISSIONS = [];
export const MOCK_PAYOUTS = [];
