export const ROLES = {
    VENDOR: 'vendeur',
    ADMIN: 'admin',
    COMPLIANCE: 'compliance',
    FINANCE: 'finance',
    SUPPORT: 'support',
    AUDITOR: 'auditor'
};

export const MENU_ACCESS = {
    [ROLES.VENDOR]: [
        'dashboard', 'clients', 'invoices', 'quotes', 'proformas',
        'payments', 'commissions', 'payouts'
    ],
    [ROLES.ADMIN]: [
        'dashboard', 'clients', 'invoices', 'quotes', 'proformas',
        'payments', 'commissions', 'payouts', 'compliance', 'dgi_reports',
        'vendors', 'config', 'global_reporting'
    ],
    [ROLES.COMPLIANCE]: [
        'dashboard', 'compliance', 'dgi_reports', 'vendors', 'global_reporting'
    ],
    [ROLES.FINANCE]: [
        'dashboard', 'invoices', 'payments', 'commissions', 'payouts',
        'dgi_reports', 'global_reporting'
    ],
    [ROLES.SUPPORT]: [
        'dashboard', 'vendors'
    ],
    [ROLES.AUDITOR]: [
        'dashboard', 'clients', 'invoices', 'quotes', 'proformas',
        'payments', 'commissions', 'payouts', 'compliance', 'dgi_reports',
        'vendors', 'config', 'global_reporting'
    ]
};
