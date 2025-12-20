import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../components/documents/StatusBadge';
import CommissionPaymentModal from '../../../components/payments/CommissionPaymentModal';
import { Wallet, Filter, Download, AlertCircle } from 'lucide-react';
import { MOCK_COMMISSIONS, MOCK_INVOICES } from '../../../../data/mockData';
import { formatCurrency } from '../../../../core/utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const CommissionListPage = () => {
    const [commissions] = useState(MOCK_COMMISSIONS);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handlePayCommission = (commission) => {
        setSelectedCommission(commission);
        setIsPaymentModalOpen(true);
    };

    const pendingCommissions = commissions.filter(c => c.status === 'pending');
    const paidCommissions = commissions.filter(c => c.status === 'paid');
    const totalPending = pendingCommissions.reduce((sum, c) => sum + c.amount, 0);
    const totalPaid = paidCommissions.reduce((sum, c) => sum + c.amount, 0);

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
                        Commissions FNE CONNECT
                    </h1>
                    <p className="text-muted">Gérez vos commissions et paiements à FNE CONNECT.</p>
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

            {/* Alert for pending commissions */}
            {pendingCommissions.length > 0 && (
                <div style={{
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #F59E0B',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.5rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <AlertCircle size={24} color="#D97706" />
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', color: '#92400E', marginBottom: '0.25rem' }}>
                            Vous avez {pendingCommissions.length} commission(s) en attente
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#78350F' }}>
                            Payez vos commissions pour générer les factures FNE officielles
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
                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--warning-light)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Wallet size={24} color="var(--warning)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Commissions en Attente
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--warning)' }}>
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
                            <Wallet size={24} color="var(--success)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Commissions Payées
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>
                                {formatCurrency(totalPaid)}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--primary-lighter)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Wallet size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Total Commissions
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {formatCurrency(totalPending + totalPaid)}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Commissions Table */}
            <Card style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    Historique des Commissions
                </h3>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Référence
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Facture
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Date
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Taux
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Montant
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Statut
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {commissions.map((commission) => (
                                <tr key={commission.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                            {commission.id}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ fontWeight: '500' }}>
                                            {commission.invoiceNumber}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {format(new Date(commission.createdAt), 'dd MMM yyyy', { locale: fr })}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '500' }}>
                                        {(commission.rate * 100).toFixed(1)}%
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                                            {formatCurrency(commission.amount)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <StatusBadge status={commission.status} />
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        {commission.status === 'pending' ? (
                                            <Button
                                                size="sm"
                                                onClick={() => handlePayCommission(commission)}
                                            >
                                                Payer
                                            </Button>
                                        ) : (
                                            <span style={{ fontSize: '0.875rem', color: 'var(--success)' }}>
                                                ✓ Payée le {format(new Date(commission.paidAt), 'dd/MM/yyyy', { locale: fr })}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Payment Modal */}
            <CommissionPaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                commission={selectedCommission}
                invoice={MOCK_INVOICES.find(inv => inv.id === selectedCommission?.invoiceId)}
            />
        </div>
    );
};

export default CommissionListPage;
