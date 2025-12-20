// Mock data for development - will be replaced with API calls later

export const MOCK_USER = {
    id: 1,
    phone: '+225 07 12 34 56 78',
    email: 'jean.kouassi@example.ci',
    firstName: 'Jean',
    lastName: 'Kouassi',
    civilite: 'M.',
    nationalite: 'Ivoirienne',
    dateNaissance: '1985-05-15',
    lieuNaissance: 'Abidjan',
    adresse: 'Cocody, Angré 7ème Tranche',

    // Business info
    typeActivite: 'Commerce',
    descriptionActivite: 'Vente de matériel informatique',
    nomCommercial: 'Tech Solutions CI',
    anneeDebut: '2018',

    // KYC status
    kycStatus: 'validated',
    kycValidatedAt: '2023-12-01T10:00:00Z',

    // Payment info
    typeComptePaiement: 'wave',
    telPaiement: '+225 07 12 34 56 78',

    // Stats
    balance: 1250000,
    totalInvoices: 24,
    totalClients: 156,
    monthlyRevenue: 3450000,

    createdAt: '2023-11-15T08:30:00Z'
};

export const MOCK_QUOTES = [
    {
        id: 'DEV-2023-001',
        type: 'quote',
        status: 'draft',
        client: {
            id: 1,
            name: 'Entreprise ABC',
            phone: '+225 07 11 22 33 44',
            email: 'contact@abc.ci'
        },
        items: [
            { id: 1, name: 'Ordinateur portable Dell', quantity: 2, price: 450000 },
            { id: 2, name: 'Imprimante HP LaserJet', quantity: 1, price: 250000 }
        ],
        totalHT: 1150000,
        tvaAmount: 207000,
        totalTTC: 1357000,
        applyTva: true,
        applyAirsi: false,
        createdAt: '2023-12-15T10:00:00Z',
        validUntil: '2024-01-15T23:59:59Z'
    },
    {
        id: 'DEV-2023-002',
        type: 'quote',
        status: 'sent',
        client: {
            id: 2,
            name: 'SARL Ivoire Tech',
            phone: '+225 07 22 33 44 55',
            email: 'info@ivoiretech.ci'
        },
        items: [
            { id: 1, name: 'Serveur Dell PowerEdge', quantity: 1, price: 2500000 }
        ],
        totalHT: 2500000,
        tvaAmount: 450000,
        totalTTC: 2950000,
        applyTva: true,
        applyAirsi: true,
        airsiAmount: 125000,
        createdAt: '2023-12-18T14:30:00Z',
        validUntil: '2024-01-18T23:59:59Z'
    }
];

export const MOCK_PROFORMAS = [
    {
        id: 'PRO-2023-001',
        type: 'proforma',
        status: 'sent',
        createdFrom: 'DEV-2023-003',
        client: {
            id: 3,
            name: 'Cabinet Juridique LMN',
            phone: '+225 07 33 44 55 66',
            email: 'contact@lmn.ci'
        },
        items: [
            { id: 1, name: 'MacBook Pro 16"', quantity: 3, price: 1200000 }
        ],
        totalHT: 3600000,
        tvaAmount: 648000,
        totalTTC: 4248000,
        applyTva: true,
        applyAirsi: false,
        createdAt: '2023-12-10T09:00:00Z',
        validUntil: '2024-01-10T23:59:59Z'
    }
];

export const MOCK_INVOICES = [
    {
        id: 'FAC-2023-001',
        type: 'invoice',
        status: 'fne_generated',
        createdFrom: 'PRO-2023-002',
        fneNumber: 'FNE-CI-2023-1234567890',
        fneQrCode: 'https://example.com/qr/FNE-CI-2023-1234567890',
        client: {
            id: 4,
            name: 'Restaurant Le Palmier',
            phone: '+225 07 44 55 66 77',
            email: 'contact@lepalmier.ci'
        },
        items: [
            { id: 1, name: 'Système de caisse tactile', quantity: 2, price: 350000 },
            { id: 2, name: 'Imprimante tickets', quantity: 2, price: 150000 }
        ],
        totalHT: 1000000,
        tvaAmount: 180000,
        totalTTC: 1180000,
        applyTva: true,
        applyAirsi: false,

        // Commission FNE CONNECT
        commissionRate: 0.03,
        commissionAmount: 35400,
        commissionStatus: 'paid',
        commissionPaidAt: '2023-12-05T11:00:00Z',

        // Payment status
        paymentStatus: 'paid',
        paidAt: '2023-12-08T15:30:00Z',

        createdAt: '2023-12-01T10:00:00Z',
        fneGeneratedAt: '2023-12-05T11:30:00Z'
    },
    {
        id: 'FAC-2023-002',
        type: 'invoice',
        status: 'pending_commission',
        client: {
            id: 5,
            name: 'Boutique Fashion Style',
            phone: '+225 07 55 66 77 88',
            email: 'info@fashionstyle.ci'
        },
        items: [
            { id: 1, name: 'Logiciel de gestion de stock', quantity: 1, price: 500000 }
        ],
        totalHT: 500000,
        tvaAmount: 90000,
        totalTTC: 590000,
        applyTva: true,
        applyAirsi: false,

        commissionRate: 0.03,
        commissionAmount: 17700,
        commissionStatus: 'pending',

        createdAt: '2023-12-18T16:00:00Z'
    }
];

export const MOCK_CLIENTS = [
    {
        id: 1,
        name: 'Entreprise ABC',
        phone: '+225 07 11 22 33 44',
        email: 'contact@abc.ci',
        address: 'Plateau, Abidjan',
        type: 'Entreprise',
        totalInvoices: 5,
        totalRevenue: 2500000,
        createdAt: '2023-10-01T08:00:00Z'
    },
    {
        id: 2,
        name: 'SARL Ivoire Tech',
        phone: '+225 07 22 33 44 55',
        email: 'info@ivoiretech.ci',
        address: 'Cocody, Abidjan',
        type: 'SARL',
        totalInvoices: 8,
        totalRevenue: 4200000,
        createdAt: '2023-09-15T10:30:00Z'
    },
    {
        id: 3,
        name: 'Cabinet Juridique LMN',
        phone: '+225 07 33 44 55 66',
        email: 'contact@lmn.ci',
        address: 'Marcory, Abidjan',
        type: 'Cabinet',
        totalInvoices: 3,
        totalRevenue: 1800000,
        createdAt: '2023-11-20T14:00:00Z'
    }
];

export const MOCK_TRANSACTIONS = [
    {
        id: 1,
        type: 'in',
        reference: 'PAY-2023-8890',
        party: 'Restaurant Le Palmier',
        description: 'Paiement Facture #FAC-2023-001',
        period: 'Dec 2023',
        method: 'Mobile Money',
        provider: 'Wave',
        date: '2023-12-08T15:30:00Z',
        amount: 1180000,
        status: 'completed'
    },
    {
        id: 2,
        type: 'out',
        reference: 'COM-2023-001',
        party: 'FNE Connect',
        description: 'Commission Facture #FAC-2023-001',
        period: 'Dec 2023',
        method: 'Wave',
        provider: 'Wave',
        date: '2023-12-05T11:00:00Z',
        amount: 35400,
        status: 'completed'
    },
    {
        id: 3,
        type: 'in',
        reference: 'PAY-2023-8891',
        party: 'Entreprise ABC',
        description: 'Paiement Facture #FAC-2023-003',
        period: 'Dec 2023',
        method: 'Mobile Money',
        provider: 'Wave',
        date: '2023-12-10T10:15:00Z',
        amount: 850000,
        status: 'completed'
    }
];

export const MOCK_COMMISSIONS = [
    {
        id: 'COM-2023-001',
        invoiceId: 'FAC-2023-001',
        invoiceNumber: 'FAC-2023-001',
        amount: 35400,
        rate: 0.03,
        status: 'paid',
        paymentMethod: 'wave',
        createdAt: '2023-12-01T10:00:00Z',
        paidAt: '2023-12-05T11:00:00Z'
    },
    {
        id: 'COM-2023-002',
        invoiceId: 'FAC-2023-002',
        invoiceNumber: 'FAC-2023-002',
        amount: 17700,
        rate: 0.03,
        status: 'pending',
        createdAt: '2023-12-18T16:00:00Z'
    }
];

export const MOCK_PAYOUTS = [
    {
        id: 'REV-2023-001',
        reference: 'REV-2023-001',
        invoiceId: 'FAC-2023-001',
        invoiceNumber: 'FAC-2023-001',
        grossAmount: 1180000,
        commissionAmount: 35400,
        netAmount: 1144600,
        status: 'completed',
        method: 'wave',
        accountNumber: '+225 07 12 34 56 78',
        createdAt: '2023-12-08T15:30:00Z',
        processedAt: '2023-12-09T10:00:00Z'
    },
    {
        id: 'REV-2023-002',
        reference: 'REV-2023-002',
        invoiceId: 'FAC-2023-003',
        invoiceNumber: 'FAC-2023-003',
        grossAmount: 850000,
        commissionAmount: 25500,
        netAmount: 824500,
        status: 'pending',
        method: 'wave',
        accountNumber: '+225 07 12 34 56 78',
        createdAt: '2023-12-10T10:15:00Z'
    }
];

export const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'payment',
        title: 'Paiement reçu',
        message: 'Vous avez reçu un paiement de 1 180 000 FCFA pour la facture FAC-2023-001',
        read: false,
        createdAt: '2023-12-08T15:30:00Z'
    },
    {
        id: 2,
        type: 'payout',
        title: 'Reversement effectué',
        message: 'Un reversement de 1 144 600 FCFA a été effectué sur votre compte Wave',
        read: false,
        createdAt: '2023-12-09T10:00:00Z'
    },
    {
        id: 3,
        type: 'commission',
        title: 'Commission à payer',
        message: 'Vous devez payer une commission de 17 700 FCFA pour la facture FAC-2023-002',
        read: true,
        createdAt: '2023-12-18T16:00:00Z'
    }
];

export const MOCK_AML_ALERTS = [
    {
        id: 'AML-2023-001',
        type: 'high_amount',
        severity: 'medium',
        vendorId: 1,
        vendorName: 'Jean Kouassi',
        description: 'Transaction supérieure au seuil (2 500 000 FCFA)',
        transactionId: 'PAY-2023-8892',
        amount: 2500000,
        status: 'reviewed',
        createdAt: '2023-12-15T14:00:00Z',
        reviewedAt: '2023-12-15T16:00:00Z',
        reviewedBy: 'Admin',
        notes: 'Transaction légitime - Vente de serveur'
    },
    {
        id: 'AML-2023-002',
        type: 'frequent_transactions',
        severity: 'low',
        vendorId: 2,
        vendorName: 'Marie Diallo',
        description: '10 transactions en 24h',
        status: 'pending',
        createdAt: '2023-12-18T09:00:00Z'
    }
];
