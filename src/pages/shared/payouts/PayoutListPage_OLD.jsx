import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../app/shared/features/documents/StatusBadge';
import PayoutReceipt from '../../../app/shared/features/payouts/PayoutReceipt';
import { TrendingUp, Filter, Download, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { MOCK_PAYOUTS } from '../../../data/mockData';
import { formatCurrency } from '../../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import DataTable from '../../../components/ui/DataTable/DataTable';

const PayoutListPage = () => {
    const [payouts] = useState(MOCK_PAYOUTS);
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    const pendingPayouts = payouts.filter(p => p.status === 'pending');
    const completedPayouts = payouts.filter(p => p.status === 'completed');
    const totalPending = pendingPayouts.reduce((sum, p) => sum + p.netAmount, 0);
    const totalCompleted = completedPayouts.reduce((sum, p) => sum + p.netAmount, 0);

    const handleViewReceipt = (payout) => {
        setSelectedPayout(payout);
        setIsReceiptOpen(true);
    };

    const columns = [
        {
            key: 'reference',
            label: 'Référence',
            sortable: true,
            width: '140px',
            render: (row) => <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{row.reference}</span>
        },
        {
            key: 'invoiceNumber',
            label: 'Facture',
            sortable: true,
            width: '140px',
            render: (row) => <span style={{ fontWeight: '500' }}>{row.invoiceNumber}</span>
        },
        {
            key: 'accountNumber',
            label: 'N° Compte',
            sortable: true,
            width: '140px',
            render: (row) => <span style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{row.accountNumber || 'N/A'}</span>
        },
        {
            key: 'createdAt',
            label: 'Date',
            sortable: true,
            width: '120px',
            render: (row) => format(new Date(row.createdAt), 'dd MMM yyyy', { locale: fr })
        },
        {
            key: 'grossAmount',
            label: 'Montant Brut',
            align: 'right',
            sortable: true,
            width: '140px',
            render: (row) => formatCurrency(row.grossAmount)
        },
        {
            key: 'commissionAmount',
            label: 'Commission',
            align: 'right',
            width: '130px',
            render: (row) => <span style={{ color: 'var(--danger)' }}>-{formatCurrency(row.commissionAmount)}</span>
        },
        {
            key: 'netAmount',
            label: 'Montant Net',
            align: 'right',
            sortable: true,
            width: '140px',
            render: (row) => <span style={{ fontWeight: '700', color: 'var(--success)' }}>{formatCurrency(row.netAmount)}</span>
        },
        {
            key: 'vendorBalance',
            label: 'Solde Vendeur',
            sortable: true,
            width: '150px',
            render: (row) => (
                <span style={{ fontWeight: '600', color: 'var(--primary)' }}>
                    {row.vendorBalance ? formatCurrency(row.vendorBalance) : 'N/A'}
                </span>
            )
        },
        {
            key: 'status',
            label: 'Statut',
            align: 'center',
            sortable: true,
            width: '120px',
            render: (row) => <StatusBadge status={row.status} />
        },
        {
            key: 'method',
            label: 'Méthode',
            width: '130px',
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: row.method === 'wave' ? '#00D9B7' : '#FF6600'
                    }}></div>
                    <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
                        {row.method === 'wave' ? 'Wave' : row.method.replace('_', ' ')}
                    </span>
                </div>
            )
        }
    ];

    const renderRowActions = (payout) => {
        if (payout.status === 'completed') {
            return (
                <button
                    onClick={() => handleViewReceipt(payout)}
                    style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid var(--primary)',
                        borderRadius: 'var(--radius-md)',
                        background: 'white',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                    }}
                    title="Voir reçu"
                >
                    <Eye size={16} />
                    Reçu
                </button>
            );
        }
        return null;
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{
                        fontSize: '1.875rem',
                        fontWeight: '800',
                        color: 'var(--primary)',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.5rem'
                    }}>
                        Reversements
                    </h1>
                    <p className="text-muted">Suivez vos reversements et paiements reçus.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}>
                        <Filter size={18} /> Filtrer
                    </button>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}>
                        <Download size={18} /> Exporter
                    </button>
                </div>
            </div>

            {/* Alert for pending payouts */}
            {pendingPayouts.length > 0 && (
                <div style={{
                    backgroundColor: '#DBEAFE',
                    border: '1px solid #3B82F6',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.5rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <Clock size={24} color="#1E40AF" />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', color: '#1E3A8A', marginBottom: '0.25rem' }}>
                            {pendingPayouts.length} reversement(s) en cours de traitement
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#1E40AF' }}>
                            Vos paiements seront effectués dans un délai de 48h maximum
                        </p>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
            }}>
                <Card style={{ padding: '1.5rem', background: 'var(--gradient-brand)', color: 'white', border: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <TrendingUp size={24} color="white" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
                                Total Reversé
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                                {formatCurrency(totalCompleted)}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#FEF3C7',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Clock size={24} color="#D97706" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                En Attente
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#D97706' }}>
                                {formatCurrency(totalPending)}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--success-light)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <CheckCircle size={24} color="var(--success)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Reversements Effectués
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>
                                {completedPayouts.length}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Payouts Table */}
            <Card style={{ padding: '1.5rem', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    Historique des Reversements
                </h3>

                <DataTable
                    columns={columns}
                    data={payouts}
                    renderRowActions={renderRowActions}
                    searchPlaceholder="Rechercher un reversement..."
                />

                {/* Summary Footer */}
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: 'var(--radius-md)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Total Brut
                        </p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
                            {formatCurrency(payouts.reduce((sum, p) => sum + p.grossAmount, 0))}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Total Commissions
                        </p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--danger)' }}>
                            -{formatCurrency(payouts.reduce((sum, p) => sum + p.commissionAmount, 0))}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Total Net Reversé
                        </p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--success)' }}>
                            {formatCurrency(payouts.reduce((sum, p) => sum + p.netAmount, 0))}
                        </p>
                    </div>
                </div>
            </Card>

            {isReceiptOpen && selectedPayout && (
                <PayoutReceipt
                    payout={selectedPayout}
                    onClose={() => setIsReceiptOpen(false)}
                />
            )}
        </div>
    );
};

export default PayoutListPage;
