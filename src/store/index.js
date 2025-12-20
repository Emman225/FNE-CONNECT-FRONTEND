import { create } from 'zustand';

// User Store
export const useUserStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),

    updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
    }))
}));

// Document Store (Devis, Proforma, Factures)
export const useDocumentStore = create((set) => ({
    quotes: [],
    proformas: [],
    invoices: [],

    addQuote: (quote) => set((state) => ({
        quotes: [...state.quotes, quote]
    })),

    updateQuote: (id, updates) => set((state) => ({
        quotes: state.quotes.map(q => q.id === id ? { ...q, ...updates } : q)
    })),

    deleteQuote: (id) => set((state) => ({
        quotes: state.quotes.filter(q => q.id !== id)
    })),

    addProforma: (proforma) => set((state) => ({
        proformas: [...state.proformas, proforma]
    })),

    addInvoice: (invoice) => set((state) => ({
        invoices: [...state.invoices, invoice]
    })),

    // Transform quote to proforma
    transformToProforma: (quoteId) => set((state) => {
        const quote = state.quotes.find(q => q.id === quoteId);
        if (!quote) return state;

        const proforma = {
            ...quote,
            id: `PRO-${Date.now()}`,
            type: 'proforma',
            status: 'draft',
            createdFrom: quoteId,
            createdAt: new Date().toISOString()
        };

        return {
            proformas: [...state.proformas, proforma],
            quotes: state.quotes.map(q =>
                q.id === quoteId ? { ...q, status: 'converted' } : q
            )
        };
    }),

    // Transform proforma to invoice
    transformToInvoice: (proformaId) => set((state) => {
        const proforma = state.proformas.find(p => p.id === proformaId);
        if (!proforma) return state;

        const invoice = {
            ...proforma,
            id: `FAC-${Date.now()}`,
            type: 'invoice',
            status: 'pending_commission',
            createdFrom: proformaId,
            createdAt: new Date().toISOString()
        };

        return {
            invoices: [...state.invoices, invoice],
            proformas: state.proformas.map(p =>
                p.id === proformaId ? { ...p, status: 'converted' } : p
            )
        };
    })
}));

// Payment Store (Commissions, Transactions, Reversements)
export const usePaymentStore = create((set) => ({
    balance: 1250000,
    commissions: [],
    transactions: [],
    payouts: [],

    addCommission: (commission) => set((state) => ({
        commissions: [...state.commissions, commission]
    })),

    payCommission: (commissionId, paymentMethod) => set((state) => ({
        commissions: state.commissions.map(c =>
            c.id === commissionId
                ? { ...c, status: 'paid', paymentMethod, paidAt: new Date().toISOString() }
                : c
        )
    })),

    addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, transaction],
        balance: transaction.type === 'in'
            ? state.balance + transaction.amount
            : state.balance - transaction.amount
    })),

    addPayout: (payout) => set((state) => ({
        payouts: [...state.payouts, payout]
    }))
}));

// Client Store
export const useClientStore = create((set) => ({
    clients: [],

    addClient: (client) => set((state) => ({
        clients: [...state.clients, client]
    })),

    updateClient: (id, updates) => set((state) => ({
        clients: state.clients.map(c => c.id === id ? { ...c, ...updates } : c)
    })),

    deleteClient: (id) => set((state) => ({
        clients: state.clients.filter(c => c.id !== id)
    }))
}));

// Notification Store
export const useNotificationStore = create((set) => ({
    notifications: [],
    unreadCount: 0,

    addNotification: (notification) => set((state) => ({
        notifications: [
            {
                id: Date.now(),
                read: false,
                createdAt: new Date().toISOString(),
                ...notification
            },
            ...state.notifications
        ],
        unreadCount: state.unreadCount + 1
    })),

    markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1)
    })),

    markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0
    })),

    clearNotifications: () => set({
        notifications: [],
        unreadCount: 0
    })
}));
