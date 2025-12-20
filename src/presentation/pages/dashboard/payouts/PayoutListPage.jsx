import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../components/documents/StatusBadge';
import PayoutReceipt from '../../../components/payouts/PayoutReceipt';
import { TrendingUp, Filter, Download, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { MOCK_PAYOUTS } from '../../../../data/mockData';
import { formatCurrency } from '../../../../core/utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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
            <Card style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    Historique des Reversements
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
                                    Montant Brut
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Commission
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Montant Net
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Statut
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Méthode
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {payouts.map((payout) => (
                                <tr key={payout.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                            {payout.reference}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ fontWeight: '500' }}>
                                            {payout.invoiceNumber}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {format(new Date(payout.createdAt), 'dd MMM yyyy', { locale: fr })}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem' }}>
                                        {formatCurrency(payout.grossAmount)}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', color: 'var(--danger)' }}>
                                        -{formatCurrency(payout.commissionAmount)}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--success)' }}>
                                            {formatCurrency(payout.netAmount)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <StatusBadge status={payout.status} />
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: payout.method === 'wave' ? '#00D9B7' : '#FF6600'
                                            }}></div>
                                            <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
                                                {payout.method === 'wave' ? 'Wave' : payout.method}
                                            </span>
                                        </div>
                                        {payout.status === 'completed' && (
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                                {payout.accountNumber}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        {payout.status === 'completed' && (
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
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
