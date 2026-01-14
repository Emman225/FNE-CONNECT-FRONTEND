// mockUsers.ts
import { userRoles } from '../types/roles';

export const mockUsers = [
    {
        id: '1',
        accountNumber: 'FNE-25897201',
        name: 'Vendeur Test',
        email: 'vendor@fne.ci',
        password: 'vendor',
        role: userRoles.VENDOR,
        contact: '0707070707'
    },
    {
        id: '2',
        accountNumber: 'FNE-25897202',
        name: 'Admin Général',
        email: 'admin@fne.ci',
        password: 'admin',
        role: userRoles.ADMIN,
        contact: '0101010101'
    },
    {
        id: '3',
        accountNumber: 'FNE-25897203',
        name: 'Marie Koné',
        email: 'compliance@fne.ci',
        password: 'compliance',
        role: userRoles.COMPLIANCE,
        contact: '0505050505'
    },
    {
        id: '4',
        accountNumber: 'FNE-25897204',
        name: 'Jean Finance',
        email: 'finance@fne.ci',
        password: 'finance',
        role: userRoles.FINANCE,
        contact: '0808080808'
    },
    {
        id: '5',
        accountNumber: 'FNE-25897205',
        name: 'Support Client',
        email: 'support@fne.ci',
        password: 'support',
        role: userRoles.SUPPORT,
        contact: '0909090909'
    },
    {
        id: '6',
        accountNumber: 'FNE-25897206',
        name: 'Auditeur Externe',
        email: 'auditor@fne.ci',
        password: 'auditor',
        role: userRoles.AUDITOR,
        contact: '0606060606'
    }
];

export const findUserByCredentials = (email, password) => {
    return mockUsers.find(u => u.email === email && u.password === password);
};
