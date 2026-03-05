import React, { useState, useMemo, useCallback } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable/DataTable';
import PaymentValidationModal from '../../../components/modals/PaymentValidationModal';
import { Download, Filter, Wallet, ArrowDownLeft, Smartphone, CreditCard } from 'lucide-react';
import { useAuth } from '../../../auth/AuthProvider';
import { isAdminRole } from '../../../types/roles';
import WithdrawalModal from '../../../app/shared/features/payments/WithdrawalModal';
import { paymentService } from '../../../services/paymentService';
import { formatCurrency } from '../../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

const PAYMENT_STATUS_LABELS = {
    pending_finance: 'En attente Finance',
    pending_admin: 'En attente Admin',
    confirmed: 'Confirmé',
    rejected_finance: 'Rejeté (Finance)',
    rejected_admin: 'Rejeté (Admin)',
    failed: 'Échoué',
    pending: 'En attente',
};

const PAYMENT_STATUS_COLORS = {
    pending_finance: { bg: '#FEF3C7', color: '#D97706', border: '#F59E0B' },
    pending_admin: { bg: '#DBEAFE', color: '#1D4ED8', border: '#3B82F6' },
    confirmed: { bg: '#D1FAE5', color: '#065F46', border: '#10B981' },
    rejected_finance: { bg: '#FEE2E2', color: '#991B1B', border: '#EF4444' },
    rejected_admin: { bg: '#FEE2E2', color: '#991B1B', border: '#EF4444' },
    failed: { bg: '#FEE2E2', color: '#991B1B', border: '#EF4444' },
    pending: { bg: '#FEF3C7', color: '#D97706', border: '#F59E0B' },
};

const PaymentListPage = () => {
    const { user } = useAuth();
    const isAdmin = user && isAdminRole(user.role);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableBalance, setAvailableBalance] = useState(0);
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

    const fetchPayments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await paymentService.getAll();
            setTransactions(response.data || []);
        } catch (error) {
            console.error("Failed to fetch payments", error);
            toast.error("Erreur lors du chargement des paiements");
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    // Statistiques
    const pendingFinance = transactions.filter(p => p.status === 'pending_finance');
    const pendingAdmin = transactions.filter(p => p.status === 'pending_admin');
    const confirmed = transactions.filter(p => p.status === 'confirmed');
    const rejected = transactions.filter(p => p.status?.includes('rejected') || p.status === 'failed');

    // Filtrer les paiements
    const filteredTransactions = useMemo(() => {
        if (statusFilter === 'all') return transactions;
        if (statusFilter === 'rejected') {
            return transactions.filter(p => p.status?.includes('rejected') || p.status === 'failed');
        }
        return transactions.filter(p => p.status === statusFilter);
    }, [transactions, statusFilter]);

    const handleOpenValidation = (payment) => {
        setSelectedPayment(payment);
        setIsValidationModalOpen(true);
    };

    const handleValidate = async (paymentId, comments) => {
        try {
            if (user?.role === 'FINANCE') {
                await paymentService.financeValidation(paymentId, 'approve', comments);
                toast.success('✓ Paiement validé par Finance !');
            } else {
                await paymentService.adminValidation(paymentId, 'approve', comments);
                toast.success('✓ Paiement confirmé !');
            }
            fetchPayments();
            setIsValidationModalOpen(false);
            setSelectedPayment(null);
        } catch (error) {
            console.error("Failed to validate payment", error);
            toast.error("Erreur lors de la validation");
        }
    };

    const handleReject = async (paymentId, reason, comments) => {
        try {
            if (user?.role === 'FINANCE') {
                await paymentService.financeValidation(paymentId, 'reject', reason || comments);
                toast.success('Paiement rejeté par Finance');
            } else {
                await paymentService.adminValidation(paymentId, 'reject', reason || comments);
                toast.success('Paiement rejeté par Admin');
            }
            fetchPayments();
            setIsValidationModalOpen(false);
            setSelectedPayment(null);
        } catch (error) {
            console.error("Failed to reject payment", error);
            toast.error("Erreur lors du rejet");
        }
    };

    const methodLabels = {
        wave: 'Wave', orange_money: 'Orange Money', mtn_momo: 'MTN MoMo',
        moov_money: 'Moov Money', bank_transfer: 'Virement', cash: 'Espèces', card: 'Carte',
    };

    const columns = [
        {
            key: 'transaction_ref',
            label: 'Référence',
            sortable: true,
            width: '140px',
            render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: '600', color: 'var(--primary)' }}>{row.transaction_ref}</span>
        },
        {
            key: 'vendor',
            label: 'Vendeur',
            sortable: true,
            width: '160px',
            render: (row) => (
                <div>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{row.vendor?.company_name || '-'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.invoice?.invoice_number || '-'}</div>
                </div>
            )
        },
        {
            key: 'payer_name',
            label: 'Payeur',
            width: '140px',
            render: (row) => (
                <div>
                    <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{row.payer_name || '-'}</div>
                    {row.payer_phone && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.payer_phone}</div>}
                </div>
            )
        },
        {
            key: 'created_at',
            label: 'Date',
            sortable: true,
            width: '120px',
            render: (row) => {
                const dateVal = row.created_at || row.createdAt;
                return dateVal ? format(new Date(dateVal), 'dd MMM yyyy', { locale: fr }) : '-';
            }
        },
        {
            key: 'amount',
            label: 'Montant',
            sortable: true,
            align: 'right',
            width: '140px',
            render: (row) => <span style={{ fontWeight: '700', color: 'var(--success)' }}>{formatCurrency(row.amount)}</span>
        },
        {
            key: 'method',
            label: 'Méthode',
            width: '120px',
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        backgroundColor: row.method === 'wave' ? '#00D9B7' : row.method === 'orange_money' ? '#FF6600' : '#FFCC00'
                    }}></div>
                    <span style={{ fontSize: '0.875rem' }}>{methodLabels[row.method] || row.method}</span>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Statut',
            align: 'center',
            sortable: true,
            width: '180px',
            render: (row) => {
                const statusStyle = PAYMENT_STATUS_COLORS[row.status] || PAYMENT_STATUS_COLORS.pending;
                const statusSteps = [];

                // Workflow indicator
                if (row.status === 'pending_finance') {
                    statusSteps.push({ label: 'Finance', active: true }, { label: 'Admin', active: false });
                } else if (row.status === 'pending_admin') {
                    statusSteps.push({ label: 'Finance ✓', done: true }, { label: 'Admin', active: true });
                } else if (row.status === 'confirmed') {
                    statusSteps.push({ label: 'Finance ✓', done: true }, { label: 'Admin ✓', done: true });
                }

                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{
                            display: 'inline-flex', padding: '0.2rem 0.6rem', borderRadius: '9999px',
                            fontSize: '0.7rem', fontWeight: '600',
                            backgroundColor: statusStyle.bg, color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`,
                        }}>
                            {PAYMENT_STATUS_LABELS[row.status] || row.status}
                        </span>
                        {statusSteps.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                {statusSteps.map((step, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <span style={{ fontSize: '0.6rem', color: '#9CA3AF' }}>→</span>}
                                        <span style={{
                                            fontSize: '0.6rem', fontWeight: '600',
                                            color: step.done ? '#059669' : step.active ? '#D97706' : '#9CA3AF',
                                        }}>
                                            {step.label}
                                        </span>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            key: 'agent',
            label: 'Agent(s) opérateur',
            width: '160px',
            render: (row) => (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {row.finance_validator?.name && <div>Finance: {row.finance_validator.name}</div>}
                    {row.admin_validator?.name && <div>Admin: {row.admin_validator.name}</div>}
                    {!row.finance_validator?.name && !row.admin_validator?.name && (row.confirmed_by?.name || '-')}
                </div>
            )
        }
    ];

    const renderRowActions = (payment) => {
        const canValidateFinance = user?.role === 'FINANCE' && payment.status === 'pending_finance';
        const canValidateAdmin = user?.role === 'ADMIN' && payment.status === 'pending_admin';

        if (canValidateFinance || canValidateAdmin) {
            return (
                <Button
                    size="sm"
                    onClick={() => handleOpenValidation(payment)}
                    style={{ backgroundColor: '#3B82F6', fontWeight: '600' }}
                >
                    Valider
                </Button>
            );
        }

        if (payment.status?.includes('rejected') || payment.status === 'failed') {
            const reason = payment.finance_reason || payment.admin_reason || payment.confirmation_notes;
            return reason ? (
                <div style={{ fontSize: '0.75rem', color: 'var(--danger)', fontStyle: 'italic', maxWidth: '200px', lineHeight: '1.3' }}>
                    {reason}
                </div>
            ) : null;
        }

        return null;
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Paiements</h1>
                    <p className="text-muted">Historique de vos transactions et encaissements.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}> <Filter size={18} /> Filtrer</button>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}> <Download size={18} /> Exporter</button>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isAdmin ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
            }}>
                {!isAdmin && (
                    <Card style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '1.5rem', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
                        <div className="flex-between" style={{ alignItems: 'start', marginBottom: '1.5rem' }}>
                            <div>
                                <p style={{ opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Solde Disponible</p>
                                <h2 style={{ fontSize: '2.25rem', fontWeight: '700', letterSpacing: '-0.02em' }}>{availableBalance.toLocaleString()} FCFA</h2>
                            </div>
                            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '12px' }}>
                                <Wallet size={24} color="white" />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                className="btn"
                                onClick={() => setIsWithdrawModalOpen(true)}
                                style={{ backgroundColor: 'white', color: 'var(--secondary)', border: 'none', fontWeight: '600', padding: '0.5rem 1rem' }}
                            >
                                Retirer des fonds
                            </button>
                        </div>
                    </Card>
                )}

                <Card style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Volume mensuel</h3>
                    <div className="flex-between" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Entrées</span>
                        <span style={{ color: 'var(--success)', fontWeight: '700', fontSize: '1.125rem' }}>+0 FCFA</span>
                    </div>
                    <div className="flex-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Commissions FNE</span>
                        <span style={{ color: 'var(--danger)', fontWeight: '700', fontSize: '1.125rem' }}>-0 FCFA</span>
                    </div>
                </Card>
            </div>

            {/* Status Filters */}
            {isAdmin && (
                <div style={{
                    display: 'flex', gap: '1rem', marginBottom: '2rem',
                    overflowX: 'auto', paddingBottom: '0.5rem'
                }}>
                    {[
                        { key: 'all', label: 'Tous', count: transactions.length, color: 'var(--primary)' },
                        { key: 'pending_finance', label: 'En attente Finance', count: pendingFinance.length, color: '#F59E0B' },
                        { key: 'pending_admin', label: 'En attente Admin', count: pendingAdmin.length, color: '#3B82F6' },
                        { key: 'confirmed', label: 'Confirmés', count: confirmed.length, color: '#10B981' },
                        { key: 'rejected', label: 'Rejetés', count: rejected.length, color: '#EF4444' }
                    ].map(filter => (
                        <button
                            key={filter.key}
                            onClick={() => setStatusFilter(filter.key === statusFilter ? 'all' : filter.key)}
                            style={{
                                padding: '0.875rem 1.5rem', borderRadius: 'var(--radius-lg)',
                                border: statusFilter === filter.key ? `2px solid ${filter.color}` : '2px solid var(--border-color)',
                                backgroundColor: statusFilter === filter.key ? `${filter.color}15` : 'white',
                                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                                alignItems: 'center', gap: '0.25rem', minWidth: '140px',
                                transition: 'all 0.2s',
                                boxShadow: statusFilter === filter.key ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                            }}
                        >
                            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: filter.color }}>{filter.count}</span>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textAlign: 'center' }}>{filter.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Payments Table */}
            <Card style={{ padding: '1.5rem', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    {statusFilter !== 'all' ? `Paiements - ${filteredTransactions.length} résultat(s)` : 'Transactions Récentes'}
                </h3>
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredTransactions}
                        renderRowActions={renderRowActions}
                        searchPlaceholder="Rechercher un paiement..."
                    />
                )}
            </Card>

            <WithdrawalModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                balance={availableBalance}
            />

            {/* Payment Validation Modal */}
            <PaymentValidationModal
                isOpen={isValidationModalOpen}
                onClose={() => {
                    setIsValidationModalOpen(false);
                    setSelectedPayment(null);
                }}
                payment={selectedPayment}
                userRole={user?.role}
                onValidate={handleValidate}
                onReject={handleReject}
            />
        </div>
    );
};

export default PaymentListPage;
