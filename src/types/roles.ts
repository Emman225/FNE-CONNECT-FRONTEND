// Role constants
export const userRoles = {
    VENDOR: 'VENDOR',
    ADMIN: 'ADMIN',
    COMPLIANCE: 'COMPLIANCE',
    FINANCE: 'FINANCE',
    SUPPORT: 'SUPPORT',
    AUDITOR: 'AUDITOR'
} as const;

export type UserRole = typeof userRoles[keyof typeof userRoles];

// Role labels for display
export const roleLabels: Record<UserRole, string> = {
    [userRoles.VENDOR]: 'Vendeur',
    [userRoles.ADMIN]: 'Administrateur Général',
    [userRoles.COMPLIANCE]: 'Agent de Conformité',
    [userRoles.FINANCE]: 'Administrateur Financier',
    [userRoles.SUPPORT]: 'Support Client',
    [userRoles.AUDITOR]: 'Auditeur'
};

// Menu item keys for sidebar - must match the keys in Sidebar component
export const menuKeys = {
    // PRINCIPAL
    DASHBOARD: 'DASHBOARD',

    // GESTION
    CLIENTS: 'CLIENTS',
    INVOICES: 'INVOICES',
    QUOTES: 'QUOTES',
    PROFORMAS: 'PROFORMAS',

    // FINANCE
    PAYMENTS: 'PAYMENTS',
    COMMISSIONS: 'COMMISSIONS',
    PAYOUTS: 'PAYOUTS',

    // CONFORMITÉ
    CONFORMITE_AML: 'CONFORMITE_AML',
    RAPPORTS_DGI: 'RAPPORTS_DGI',

    // ADMINISTRATION
    GESTION_VENDEURS: 'GESTION_VENDEURS',
    GESTION_UTILISATEURS: 'GESTION_UTILISATEURS',
    CONFIGURATION: 'CONFIGURATION',
    REPORTING_GLOBAL: 'REPORTING_GLOBAL',
    VERIFICATION_FNE: 'VERIFICATION_FNE',

    // SETTINGS (accessible to all)
    SETTINGS: 'SETTINGS'
} as const;

export type MenuKey = typeof menuKeys[keyof typeof menuKeys];

/**
 * Role Permissions - Access Control Matrix
 * 
 * This mapping defines which menu items each role can access.
 * Based on the RBAC requirements:
 * 
 * | Menu              | Vendeur | Admin | Compliance | Finance | Support | Auditeur |
 * |-------------------|---------|-------|------------|---------|---------|----------|
 * | Tableau de bord   |    ✅   |  ✅   |     ✅     |   ✅    |   ✅    |    ✅    |
 * | Clients           |    ✅   |  ✅   |     ❌     |   ❌    |   ❌    |    ✅    |
 * | Factures          |    ✅   |  ✅   |     ❌     |   ✅    |   ❌    |    ✅    |
 * | Devis             |    ✅   |  ✅   |     ❌     |   ❌    |   ❌    |    ✅    |
 * | Proformas         |    ✅   |  ✅   |     ❌     |   ❌    |   ❌    |    ✅    |
 * | Paiements         |    ✅   |  ✅   |     ❌     |   ✅    |   ❌    |    ✅    |
 * | Commissions       |    ✅   |  ✅   |     ❌     |   ✅    |   ❌    |    ✅    |
 * | Reversements      |    ✅   |  ✅   |     ❌     |   ✅    |   ❌    |    ✅    |
 * | Conformité AML    |    ❌   |  ✅   |     ✅     |   ❌    |   ❌    |    ✅    |
 * | Rapports DGI      |    ❌   |  ✅   |     ✅     |   ✅    |   ❌    |    ✅    |
 * | Gestion Vendeurs  |    ❌   |  ✅   |     ✅     |   ❌    |   ✅    |    ✅    |
 * | Configuration     |    ❌   |  ✅   |     ❌     |   ❌    |   ❌    |    ✅    |
 * | Reporting Global  |    ❌   |  ✅   |     ✅     |   ✅    |   ❌    |    ✅    |
 */
export const rolePermissions: Record<UserRole, MenuKey[]> = {
    [userRoles.VENDOR]: [
        menuKeys.DASHBOARD,
        menuKeys.CLIENTS,
        menuKeys.INVOICES,
        menuKeys.QUOTES,
        menuKeys.PROFORMAS,
        menuKeys.PAYMENTS,
        menuKeys.COMMISSIONS,
        menuKeys.PAYOUTS,
        menuKeys.SETTINGS
    ],

    [userRoles.ADMIN]: [
        menuKeys.DASHBOARD,
        menuKeys.CLIENTS,
        menuKeys.INVOICES,
        menuKeys.QUOTES,
        menuKeys.PROFORMAS,
        menuKeys.PAYMENTS,
        menuKeys.COMMISSIONS,
        menuKeys.PAYOUTS,
        menuKeys.CONFORMITE_AML,
        menuKeys.RAPPORTS_DGI,
        menuKeys.GESTION_VENDEURS,
        menuKeys.GESTION_UTILISATEURS,
        menuKeys.CONFIGURATION,
        menuKeys.REPORTING_GLOBAL,
        menuKeys.VERIFICATION_FNE,
        menuKeys.SETTINGS
    ],

    [userRoles.COMPLIANCE]: [
        menuKeys.DASHBOARD,
        menuKeys.CONFORMITE_AML,
        menuKeys.RAPPORTS_DGI,
        menuKeys.GESTION_VENDEURS,
        menuKeys.REPORTING_GLOBAL,
        menuKeys.SETTINGS
    ],

    [userRoles.FINANCE]: [
        menuKeys.DASHBOARD,
        menuKeys.INVOICES,
        menuKeys.PAYMENTS,
        menuKeys.COMMISSIONS,
        menuKeys.PAYOUTS,
        menuKeys.RAPPORTS_DGI,
        menuKeys.VERIFICATION_FNE,
        menuKeys.REPORTING_GLOBAL,
        menuKeys.SETTINGS
    ],

    [userRoles.SUPPORT]: [
        menuKeys.DASHBOARD,
        menuKeys.GESTION_VENDEURS,
        menuKeys.SETTINGS
    ],

    [userRoles.AUDITOR]: [
        menuKeys.DASHBOARD,
        menuKeys.CLIENTS,
        menuKeys.INVOICES,
        menuKeys.QUOTES,
        menuKeys.PROFORMAS,
        menuKeys.PAYMENTS,
        menuKeys.COMMISSIONS,
        menuKeys.PAYOUTS,
        menuKeys.CONFORMITE_AML,
        menuKeys.RAPPORTS_DGI,
        menuKeys.GESTION_VENDEURS,
        menuKeys.CONFIGURATION,
        menuKeys.REPORTING_GLOBAL,
        menuKeys.SETTINGS
    ]
};

// Helper function to check if a role has access to a specific menu
export const hasMenuAccess = (role: UserRole, menuKey: MenuKey): boolean => {
    return rolePermissions[role]?.includes(menuKey) ?? false;
};

// Helper function to get all allowed menu keys for a role
export const getAllowedMenuKeys = (role: UserRole): MenuKey[] => {
    return rolePermissions[role] ?? [];
};

// Admin roles (all roles except VENDOR)
export const adminRoles: UserRole[] = [
    userRoles.ADMIN,
    userRoles.COMPLIANCE,
    userRoles.FINANCE,
    userRoles.SUPPORT,
    userRoles.AUDITOR
];

// Check if a role is an admin role
export const isAdminRole = (role: UserRole): boolean => {
    return adminRoles.includes(role);
};
