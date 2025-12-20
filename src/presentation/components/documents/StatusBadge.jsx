import React from 'react';

const STATUS_COLORS = {
    // General statuses
    draft: { bg: '#F3F4F6', color: '#6B7280', label: 'Brouillon' },
    pending: { bg: '#FEF3C7', color: '#D97706', label: 'En attente' },
    paid: { bg: '#DCFCE7', color: '#16A34A', label: 'Payée' },
    cancelled: { bg: '#FEE2E2', color: '#DC2626', label: 'Annulée' },
    late: { bg: '#FEE2E2', color: '#991B1B', label: 'En retard' },

    // Document specific
    sent: { bg: '#DBEAFE', color: '#1E40AF', label: 'Envoyé' },
    converted: { bg: '#E0E7FF', color: '#6366F1', label: 'Converti' },

    // Invoice specific
    pending_commission: { bg: '#FEF3C7', color: '#D97706', label: 'Commission en attente' },
    fne_generated: { bg: '#DCFCE7', color: '#16A34A', label: 'FNE Généré' },

    // Payment/Commission
    completed: { bg: '#DCFCE7', color: '#16A34A', label: 'Complété' },
    failed: { bg: '#FEE2E2', color: '#DC2626', label: 'Échoué' },
};

const StatusBadge = ({ status }) => {
    const config = STATUS_COLORS[status.toLowerCase()] || STATUS_COLORS.draft;

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: config.bg,
            color: config.color,
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
        }}>
            {config.label}
        </span>
    );
};

export default StatusBadge;
