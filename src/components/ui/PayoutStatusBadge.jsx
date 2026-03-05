import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { PAYOUT_STATUS_LABELS, PAYOUT_STATUS_COLORS } from '../../types/payout.types';

const PayoutStatusBadge = ({ status, showWorkflow = false }) => {
    const getIcon = () => {
        switch (status) {
            case 'pending_finance':
            case 'pending_admin':
                return <Clock size={14} />;
            case 'completed':
                return <CheckCircle size={14} />;
            case 'approved':
                return <TrendingUp size={14} />;
            case 'rejected_finance':
            case 'rejected_admin':
                return <XCircle size={14} />;
            case 'cancelled':
                return <AlertCircle size={14} />;
            default:
                return <AlertCircle size={14} />;
        }
    };

    const workflowSteps = [
        { key: 'finance', label: 'Finance', active: !['pending_finance'].includes(status) },
        { key: 'admin', label: 'Admin', active: ['approved', 'completed'].includes(status) },
        { key: 'completed', label: 'Traité', active: status === 'completed' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
            {/* Badge principal */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                backgroundColor: `${PAYOUT_STATUS_COLORS[status]}15`,
                border: `1.5px solid ${PAYOUT_STATUS_COLORS[status]}`,
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: PAYOUT_STATUS_COLORS[status],
                whiteSpace: 'nowrap'
            }}>
                {getIcon()}
                {PAYOUT_STATUS_LABELS[status]}
            </div>

            {/* Workflow visuel (optionnel) */}
            {showWorkflow && !status.includes('rejected') && status !== 'cancelled' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    {workflowSteps.map((step, idx) => (
                        <React.Fragment key={step.key}>
                            <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                backgroundColor: step.active ? 'var(--success)' : 'var(--border-color)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.625rem',
                                fontWeight: '700',
                                boxShadow: step.active ? '0 2px 4px rgba(16, 185, 129, 0.3)' : 'none',
                                transition: 'all 0.3s'
                            }}>
                                {step.active ? '✓' : idx + 1}
                            </div>
                            {idx < workflowSteps.length - 1 && (
                                <div style={{
                                    flex: 1,
                                    height: '2px',
                                    backgroundColor: step.active ? 'var(--success)' : 'var(--border-color)',
                                    minWidth: '16px',
                                    maxWidth: '24px',
                                    transition: 'all 0.3s'
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PayoutStatusBadge;
