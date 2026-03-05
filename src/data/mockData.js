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
    { id: 'PROF-2023-001', accountNumber: 'FNE-25897111', client: { name: 'Sarl Ivoir', phone: '0102030405' }, createdAt: '2023-12-01', validUntil: '2023-12-31', totalTTC: 450000, status: 'draft', isComplete: true },
    { id: 'PROF-2023-002', accountNumber: 'FNE-25897112', client: { name: 'Hôtel Splendid', phone: '0707080910' }, createdAt: '2023-12-05', validUntil: '2024-01-05', totalTTC: 1250000, status: 'pending', isComplete: true },
    { id: 'PROF-2023-003', accountNumber: 'FNE-25897113', client: { name: 'Garage Konan', phone: '0505050505' }, createdAt: '2023-12-10', validUntil: '2024-01-10', totalTTC: 75000, status: 'draft', isComplete: false },
];
export const MOCK_QUOTES = [];
export const MOCK_PAYMENTS = [];
export const MOCK_COMMISSIONS = [
    { id: 'COM-001', invoiceId: 'INV001', invoiceNumber: 'FAC-2023-001', createdAt: '2023-12-01', rate: 0.025, amount: 15000, status: 'paid', paidAt: '2023-12-01', accountNumber: 'FNE-25897111', vendorBalance: 1250000 },
    { id: 'COM-002', invoiceId: 'INV002', invoiceNumber: 'FAC-2023-002', createdAt: '2023-12-10', rate: 0.025, amount: 45000, status: 'paid', paidAt: '2023-12-10', accountNumber: 'FNE-25897112', vendorBalance: 1250000 },
    { id: 'COM-003', invoiceId: 'INV003', invoiceNumber: 'FAC-2023-003', createdAt: '2023-12-15', rate: 0.03, amount: 7500, status: 'paid', paidAt: '2023-12-15', accountNumber: 'FNE-25897111', vendorBalance: 1250000 },
    { id: 'COM-004', invoiceId: 'INV004', invoiceNumber: 'FAC-2023-004', createdAt: '2023-12-20', rate: 0.025, amount: 32500, status: 'paid', paidAt: '2023-12-20', accountNumber: 'FNE-25897113', vendorBalance: 985000 },
    { id: 'COM-005', invoiceId: 'INV005', invoiceNumber: 'FAC-2023-005', createdAt: '2023-12-22', rate: 0.025, amount: 18750, status: 'paid', paidAt: '2023-12-22', accountNumber: 'FNE-25897111', vendorBalance: 1250000 },
];

export const MOCK_PAYOUTS = [
    {
        id: 'PAY-001',
        reference: 'RETRAIT-2023-001',
        vendorId: 'V001',
        vendorName: 'Jean Kouassi',
        vendorAccountNumber: 'FNE-25897111',
        invoiceNumber: 'FAC-2023-001',
        invoiceId: 'INV001',
        grossAmount: 485000,
        commissionAmount: 0,
        netAmount: 485000,
        status: 'completed',
        method: 'wave',
        accountInfo: '+237 690 123 456',
        createdAt: '2023-12-01T10:30:00',
        updatedAt: '2023-12-05T16:45:00',
        processedAt: '2023-12-05T16:45:00',
        completedAt: '2023-12-05T16:50:00',
        vendorBalanceAfter: 765000,
        financeValidation: {
            role: 'FINANCE',
            userId: 'FIN001',
            userName: 'Marie Dupont',
            action: 'approved',
            timestamp: '2023-12-02T09:15:00',
            comments: 'Vérification effectuée, tout est conforme'
        },
        adminValidation: {
            role: 'ADMIN',
            userId: 'ADM001',
            userName: 'Thomas Martin',
            action: 'approved',
            timestamp: '2023-12-05T16:30:00'
        }
    },
    {
        id: 'PAY-002',
        reference: 'RETRAIT-2023-002',
        vendorId: 'V002',
        vendorName: 'Aminata Traore',
        vendorAccountNumber: 'FNE-25897112',
        invoiceNumber: 'FAC-2023-002',
        invoiceId: 'INV002',
        grossAmount: 1455000,
        commissionAmount: 0,
        netAmount: 1455000,
        status: 'pending_finance',
        method: 'orange_money',
        accountInfo: '+237 697 765 432',
        createdAt: '2023-12-10T14:20:00',
        updatedAt: '2023-12-10T14:20:00',
        vendorBalanceAfter: 2205000,
        vendorNotes: 'Retrait urgent SVP'
    },
    {
        id: 'PAY-003',
        reference: 'RETRAIT-2023-003',
        vendorId: 'V003',
        vendorName: 'Ibrahim Diallo',
        vendorAccountNumber: 'FNE-25897113',
        invoiceNumber: 'FAC-2023-003',
        invoiceId: 'INV003',
        grossAmount: 727500,
        commissionAmount: 0,
        netAmount: 727500,
        status: 'pending_admin',
        method: 'mtn_momo',
        accountInfo: '+237 654 321 098',
        createdAt: '2023-12-12T09:00:00',
        updatedAt: '2023-12-13T10:30:00',
        vendorBalanceAfter: 1477500,
        financeValidation: {
            role: 'FINANCE',
            userId: 'FIN001',
            userName: 'Marie Dupont',
            action: 'approved',
            timestamp: '2023-12-13T10:30:00',
            comments: 'Documents conformes'
        }
    },
    {
        id: 'PAY-004',
        reference: 'RETRAIT-2023-004',
        vendorId: 'V004',
        vendorName: 'Fatoumata Sow',
        vendorAccountNumber: 'FNE-25897114',
        invoiceNumber: 'FAC-2023-004',
        invoiceId: 'INV004',
        grossAmount: 242500,
        commissionAmount: 0,
        netAmount: 242500,
        status: 'rejected_finance',
        method: 'wave',
        accountInfo: '+237 678 234 567',
        createdAt: '2023-12-08T11:15:00',
        updatedAt: '2023-12-09T14:00:00',
        financeValidation: {
            role: 'FINANCE',
            userId: 'FIN001',
            userName: 'Marie Dupont',
            action: 'rejected',
            timestamp: '2023-12-09T14:00:00',
            reason: 'Justificatifs manquants - Bon de commande non fourni',
            comments: 'Veuillez fournir le bon de commande signé avant de relancer la demande'
        }
    },
    {
        id: 'PAY-005',
        reference: 'RETRAIT-2023-005',
        vendorId: 'V005',
        vendorName: 'Mohamed Kone',
        vendorAccountNumber: 'FNE-25897115',
        invoiceNumber: 'FAC-2023-005',
        invoiceId: 'INV005',
        grossAmount: 3104000,
        commissionAmount: 0,
        netAmount: 3104000,
        status: 'pending_finance',
        method: 'bank_transfer',
        accountInfo: 'CI000 12345 67890 12345 67',
        createdAt: '2023-12-15T16:30:00',
        updatedAt: '2023-12-15T16:30:00',
        vendorBalanceAfter: 4354000,
        vendorNotes: 'Montant important, merci de traiter rapidement'
    },
    {
        id: 'PAY-006',
        reference: 'RETRAIT-2023-006',
        vendorId: 'V006',
        vendorName: 'Aissatou Bah',
        vendorAccountNumber: 'FNE-25897116',
        invoiceNumber: 'FAC-2023-006',
        invoiceId: 'INV006',
        grossAmount: 950600,
        commissionAmount: 0,
        netAmount: 950600,
        status: 'approved',
        method: 'orange_money',
        accountInfo: '+237 690 555 444',
        createdAt: '2023-12-14T08:45:00',
        updatedAt: '2023-12-16T15:20:00',
        processedAt: '2023-12-16T15:20:00',
        vendorBalanceAfter: 1700600,
        financeValidation: {
            role: 'FINANCE',
            userId: 'FIN002',
            userName: 'Pierre Kouame',
            action: 'approved',
            timestamp: '2023-12-15T11:00:00'
        },
        adminValidation: {
            role: 'ADMIN',
            userId: 'ADM001',
            userName: 'Thomas Martin',
            action: 'approved',
            timestamp: '2023-12-16T15:20:00',
            comments: 'Traitement prioritaire effectué'
        }
    }
];

// Données mock pour les factures avec paiements partiels
export const MOCK_INVOICES_WITH_PAYMENTS = [
    {
        id: 'INV-001',
        invoiceNumber: 'FAC-2023-101',
        clientName: 'Restaurant Le Palmier',
        clientEmail: 'contact@lepalmier.ci',
        clientPhone: '+225 07 12 34 56 78',
        vendorName: 'Aminata Traore',
        vendorId: 'V002',
        items: [
            { description: 'Équipement cuisine professionnel', quantity: 5, unitPrice: 250000, total: 1250000 },
            { description: 'Installation et configuration', quantity: 1, unitPrice: 150000, total: 150000 }
        ],
        subtotal: 1400000,
        taxAmount: 252000,
        totalAmount: 1652000,
        paymentInfo: {
            totalAmount: 1652000,
            paidAmount: 800000,
            remainingAmount: 852000,
            paymentStatus: 'partial',
            paymentCount: 2,
            lastPaymentDate: '2023-12-15T14:30:00',
            isOverdue: false,
            payments: [
                {
                    id: 'CPAY-001',
                    invoiceId: 'INV-001',
                    invoiceNumber: 'FAC-2023-101',
                    amount: 500000,
                    method: 'wave',
                    accountNumber: '+225 07 12 34 56 78',
                    transactionRef: 'PAY-1702291800000-XKL9M2P',
                    status: 'confirmed',
                    paidAt: '2023-12-11T10:30:00',
                    confirmedAt: '2023-12-11T10:35:00',
                    notes: 'Premier acompte',
                    createdAt: '2023-12-11T10:30:00',
                    updatedAt: '2023-12-11T10:35:00'
                },
                {
                    id: 'CPAY-002',
                    invoiceId: 'INV-001',
                    invoiceNumber: 'FAC-2023-101',
                    amount: 300000,
                    method: 'orange_money',
                    accountNumber: '+225 07 98 76 54 32',
                    transactionRef: 'PAY-1702650600000-NQT4H8R',
                    status: 'confirmed',
                    paidAt: '2023-12-15T14:30:00',
                    confirmedAt: '2023-12-15T14:32:00',
                    notes: 'Deuxième versement',
                    createdAt: '2023-12-15T14:30:00',
                    updatedAt: '2023-12-15T14:32:00'
                }
            ]
        },
        createdAt: '2023-12-01T09:00:00',
        updatedAt: '2023-12-15T14:32:00',
        notes: 'Facture pour équipement cuisine'
    },
    {
        id: 'INV-002',
        invoiceNumber: 'FAC-2023-102',
        clientName: 'Boutique Étoile',
        clientEmail: 'etoile@email.ci',
        clientPhone: '+225 05 44 55 66 77',
        vendorName: 'Ibrahim Diallo',
        vendorId: 'V003',
        items: [
            { description: 'Mobilier commercial', quantity: 10, unitPrice: 85000, total: 850000 }
        ],
        subtotal: 850000,
        taxAmount: 153000,
        totalAmount: 1003000,
        paymentInfo: {
            totalAmount: 1003000,
            paidAmount: 1003000,
            remainingAmount: 0,
            paymentStatus: 'paid',
            paymentCount: 3,
            lastPaymentDate: '2023-12-20T16:45:00',
            isOverdue: false,
            payments: [
                {
                    id: 'CPAY-003',
                    invoiceId: 'INV-002',
                    invoiceNumber: 'FAC-2023-102',
                    amount: 400000,
                    method: 'mtn_momo',
                    accountNumber: '+237 6 77 88 99 00',
                    transactionRef: 'PAY-1702378200000-WPL6K3V',
                    status: 'confirmed',
                    paidAt: '2023-12-12T11:30:00',
                    confirmedAt: '2023-12-12T11:31:00',
                    createdAt: '2023-12-12T11:30:00',
                    updatedAt: '2023-12-12T11:31:00'
                },
                {
                    id: 'CPAY-004',
                    invoiceId: 'INV-002',
                    invoiceNumber: 'FAC-2023-102',
                    amount: 400000,
                    method: 'mtn_momo',
                    accountNumber: '+237 6 77 88 99 00',
                    transactionRef: 'PAY-1702636800000-BJY9N7Q',
                    status: 'confirmed',
                    paidAt: '2023-12-15T15:00:00',
                    confirmedAt: '2023-12-15T15:01:00',
                    createdAt: '2023-12-15T15:00:00',
                    updatedAt: '2023-12-15T15:01:00'
                },
                {
                    id: 'CPAY-005',
                    invoiceId: 'INV-002',
                    invoiceNumber: 'FAC-2023-102',
                    amount: 203000,
                    method: 'wave',
                    accountNumber: '+237 6 55 44 33 22',
                    transactionRef: 'PAY-1702999500000-DRM2L8K',
                    status: 'confirmed',
                    paidAt: '2023-12-20T16:45:00',
                    confirmedAt: '2023-12-20T16:46:00',
                    notes: 'Solde final',
                    createdAt: '2023-12-20T16:45:00',
                    updatedAt: '2023-12-20T16:46:00'
                }
            ]
        },
        createdAt: '2023-12-08T14:00:00',
        updatedAt: '2023-12-20T16:46:00'
    },
    {
        id: 'INV-003',
        invoiceNumber: 'FAC-2023-103',
        clientName: 'Garage Central',
        clientEmail: 'garage.central@email.ci',
        clientPhone: '+225 07 11 22 33 44',
        vendorName: 'Mohamed Kone',
        vendorId: 'V005',
        items: [
            { description: 'Pièces automobiles', quantity: 20, unitPrice: 45000, total: 900000 },
            { description: 'Huile moteur (bidons)', quantity: 15, unitPrice: 12000, total: 180000 }
        ],
        subtotal: 1080000,
        taxAmount: 194400,
        totalAmount: 1274400,
        paymentInfo: {
            totalAmount: 1274400,
            paidAmount: 0,
            remainingAmount: 1274400,
            paymentStatus: 'unpaid',
            paymentCount: 0,
            isOverdue: false,
            payments: []
        },
        createdAt: '2023-12-18T10:00:00',
        updatedAt: '2023-12-18T10:00:00',
        notes: 'Livraison prévue le 22/12/2023'
    },
    {
        id: 'INV-004',
        invoiceNumber: 'FAC-2023-104',
        clientName: 'Hôtel Lagune',
        clientEmail: 'contact@hotellagune.ci',
        clientPhone: '+225 05 99 88 77 66',
        vendorName: 'Jean Kouassi',
        vendorId: 'V001',
        items: [
            { description: 'Linge de maison professionnel', quantity: 50, unitPrice: 25000, total: 1250000 }
        ],
        subtotal: 1250000,
        taxAmount: 225000,
        totalAmount: 1475000,
        paymentInfo: {
            totalAmount: 1475000,
            paidAmount: 375000,
            remainingAmount: 1100000,
            paymentStatus: 'partial',
            paymentCount: 1,
            lastPaymentDate: '2023-12-19T09:15:00',
            dueDate: '2023-12-05T00:00:00',
            isOverdue: true,
            payments: [
                {
                    id: 'CPAY-006',
                    invoiceId: 'INV-004',
                    invoiceNumber: 'FAC-2023-104',
                    amount: 375000,
                    method: 'bank_transfer',
                    accountNumber: 'CI93 CI 001 0123456789',
                    transactionRef: 'PAY-1703074500000-KPT5M9W',
                    status: 'confirmed',
                    paidAt: '2023-12-19T09:15:00',
                    confirmedAt: '2023-12-19T10:00:00',
                    confirmedBy: 'FIN001',
                    notes: 'Virement bancaire - 1er acompte',
                    createdAt: '2023-12-19T09:15:00',
                    updatedAt: '2023-12-19T10:00:00'
                }
            ]
        },
        createdAt: '2023-11-25T15:30:00',
        updatedAt: '2023-12-19T10:00:00',
        notes: 'URGENT - Échéance dépassée'
    },
    {
        id: 'INV-005',
        invoiceNumber: 'FAC-2023-105',
        clientName: 'Supermarché Bonheur',
        clientEmail: 'bonheur@email.ci',
        clientPhone: '+225 07 33 44 55 66',
        vendorName: 'Aissatou Bah',
        vendorId: 'V006',
        items: [
            { description: 'Rayonnages commerciaux', quantity: 8, unitPrice: 175000, total: 1400000 },
            { description: 'Chariots de courses', quantity: 25, unitPrice: 35000, total: 875000 }
        ],
        subtotal: 2275000,
        taxAmount: 409500,
        totalAmount: 2684500,
        paymentInfo: {
            totalAmount: 2684500,
            paidAmount: 2684500,
            remainingAmount: 0,
            paymentStatus: 'paid',
            paymentCount: 1,
            lastPaymentDate: '2023-12-17T13:20:00',
            isOverdue: false,
            payments: [
                {
                    id: 'CPAY-007',
                    invoiceId: 'INV-005',
                    invoiceNumber: 'FAC-2023-105',
                    amount: 2684500,
                    method: 'bank_transfer',
                    accountNumber: 'CI93 CI 001 9876543210',
                    transactionRef: 'PAY-1702818000000-VZN3Q7L',
                    status: 'confirmed',
                    paidAt: '2023-12-17T13:20:00',
                    confirmedAt: '2023-12-17T14:15:00',
                    confirmedBy: 'FIN002',
                    notes: 'Paiement intégral par virement',
                    createdAt: '2023-12-17T13:20:00',
                    updatedAt: '2023-12-17T14:15:00'
                }
            ]
        },
        createdAt: '2023-12-10T11:00:00',
        updatedAt: '2023-12-17T14:15:00'
    }
];
