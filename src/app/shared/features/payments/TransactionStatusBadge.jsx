import React from 'react';

const STATUS_CONFIG = {
    completed: { bg: '#DCFCE7', color: '#16A34A', label: 'Succès' },
    pending: { bg: '#FEF3C7', color: '#D97706', label: 'En cours' },
    failed: { bg: '#FEE2E2', color: '#DC2626', label: 'Échec' },
    refunded: { bg: '#F3F4F6', color: '#4B5563', label: 'Remboursé' },
};

const TransactionStatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status.toLowerCase()] || STATUS_CONFIG.pending;

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
        }}>
            {config.label}
        </span>
    );
};

export default TransactionStatusBadge;
