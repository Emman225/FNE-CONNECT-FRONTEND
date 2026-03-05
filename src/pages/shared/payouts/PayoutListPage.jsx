import React, { useState, useMemo } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import PayoutStatusBadge from '../../../components/ui/PayoutStatusBadge';
import PayoutReceipt from '../../../app/shared/features/payouts/PayoutReceipt';
import PayoutValidationModal from '../../../components/modals/PayoutValidationModal';
import { TrendingUp, Filter, Download, Eye } from 'lucide-react';
import { MOCK_PAYOUTS } from '../../../data/mockData';
import { formatCurrency } from '../../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '../../../auth/AuthProvider';
import DataTable from '../../../components/ui/DataTable/DataTable';

import { payoutService } from '../../../services/payoutService';
import toast from 'react-hot-toast';

const PayoutListPage = () => {
    const { user } = useAuth();
    const [payouts, setPayouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

    const fetchPayouts = React.useCallback(async () => {
        setLoading(true);
        try {
            const data = await payoutService.getAll();
            setPayouts(data.data || []);
        } catch (error) {
            console.error("Failed to fetch payouts", error);
            toast.error("Erreur lors du chargement des reversements");
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchPayouts();
    }, [fetchPayouts]);

    // Filtrer les payouts
    const filteredPayouts = useMemo(() => {
        if (statusFilter === 'all') return payouts;
        if (statusFilter === 'rejected') {
            return payouts.filter(p => p.status.includes('rejected'));
        }
        return payouts.filter(p => p.status === statusFilter);
    }, [payouts, statusFilter]);

    // Statistiques
    const pendingFinance = payouts.filter(p => p.status === 'pending_finance');
    const pendingAdmin = payouts.filter(p => p.status === 'pending_admin');
    const approved = payouts.filter(p => p.status === 'approved');
    const completed = payouts.filter(p => p.status === 'completed');
    const rejected = payouts.filter(p => p.status.includes('rejected'));

    const handleViewReceipt = (payout) => {
        setSelectedPayout(payout);
        setIsReceiptOpen(true);
    };

    const handleOpenValidation = (payout) => {
        setSelectedPayout(payout);
        setIsValidationModalOpen(true);
    };

    const handleValidate = async (payoutId, comments) => {
        try {
            setLoading(true);
            await payoutService.approve(payoutId, comments);
            toast.success('✓ Retrait validé avec succès !');
            fetchPayouts();
            setIsValidationModalOpen(false);
            setSelectedPayout(null);
        } catch (error) {
            console.error("Failed to approve payout", error);
            toast.error("Erreur lors de la validation");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (payoutId, reason, comments) => {
        try {
            setLoading(true);
            await payoutService.reject(payoutId, reason, comments);
            toast.success(`✗ Retrait rejeté : ${reason}`);
            fetchPayouts();
            setIsValidationModalOpen(false);
            setSelectedPayout(null);
        } catch (error) {
            console.error("Failed to reject payout", error);
            toast.error("Erreur lors du rejet");
        } finally {
            setLoading(false);
        }
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
            key: 'vendor_name',
            label: 'Vendeur',
            sortable: true,
            width: '160px',
            render: (row) => (
                <div>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{row.vendor_name || row.vendorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.vendor_account_number || row.vendorAccountNumber}</div>
                </div>
            )
        },
        {
            key: 'invoice_number',
            label: 'Facture',
            sortable: true,
            width: '120px',
            render: (row) => <span style={{ fontWeight: '500' }}>{row.invoice_number || row.invoiceNumber}</span>
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
            key: 'net_amount',
            label: 'Montant Net',
            align: 'right',
            sortable: true,
            width: '140px',
            render: (row) => <span style={{ fontWeight: '700', color: 'var(--success)' }}>{formatCurrency(row.net_amount || row.netAmount)}</span>
        },
        {
            key: 'status',
            label: 'Statut',
            align: 'center',
            sortable: true,
            width: '200px',
            render: (row) => <PayoutStatusBadge status={row.status} showWorkflow={true} />
        }
        ,
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
                        backgroundColor: row.method === 'wave' ? '#00D9B7' : row.method === 'orange_money' ? '#FF6600' : '#FFCC00'
                    }}></div>
                    <span style={{ fontSize: '0.875rem', textTransform: 'capitalize' }}>
                        {row.method === 'wave' ? 'Wave' : row.method.replace('_', ' ')}
                    </span>
                </div>
            )
        },
        {
            key: 'agent',
            label: 'Agent(s) opérateur',
            width: '160px',
            render: (row) => (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {row.finance_validator?.name && <div>Finance: {row.finance_validator.name}</div>}
                    {row.admin_validator?.name && <div>Admin: {row.admin_validator.name}</div>}
                    {!row.finance_validator?.name && !row.admin_validator?.name && '-'}
                </div>
            )
        }
    ];

    const renderRowActions = (payout) => {
        const canValidateFinance = user?.role === 'FINANCE' && payout.status === 'pending_finance';
        const canValidateAdmin = user?.role === 'ADMIN' && payout.status === 'pending_admin';

        if (canValidateFinance || canValidateAdmin) {
            return (
                <Button
                    size="sm"
                    onClick={() => handleOpenValidation(payout)}
                    style={{ backgroundColor: '#3B82F6', fontWeight: '600' }}
                >
                    Valider
                </Button>
            );
        }

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
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}
                    title="Voir reçu"
                >
                    <Eye size={16} />
                    Reçu
                </button>
            );
        }

        if (payout.status.includes('rejected')) {
            const validation = payout.financeValidation || payout.adminValidation;
            return (
                <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--danger)',
                    fontStyle: 'italic',
                    maxWidth: '200px',
                    lineHeight: '1.3'
                }}>
                    {validation?.reason || 'Rejeté'}
                </div>
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
                    <p className="text-muted">Suivez et validez les demandes de retrait.</p>
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

            {/* Filtres par Statut */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem'
            }}>
                {[
                    { key: 'all', label: 'Tous', count: payouts.length, color: 'var(--primary)' },
                    { key: 'pending_finance', label: 'En attente Finance', count: pendingFinance.length, color: '#F59E0B' },
                    { key: 'pending_admin', label: 'En attente Admin', count: pendingAdmin.length, color: '#3B82F6' },
                    { key: 'approved', label: 'Approuvés', count: approved.length, color: '#8B5CF6' },
                    { key: 'completed', label: 'Effectués', count: completed.length, color: '#10B981' },
                    { key: 'rejected', label: 'Rejetés', count: rejected.length, color: '#EF4444' }
                ].map(filter => (
                    <button
                        key={filter.key}
                        onClick={() => setStatusFilter(filter.key === statusFilter ? 'all' : filter.key)}
                        style={{
                            padding: '0.875rem 1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            border: statusFilter === filter.key ? `2px solid ${filter.color}` : '2px solid var(--border-color)',
                            backgroundColor: statusFilter === filter.key ? `${filter.color}15` : 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            minWidth: '140px',
                            transition: 'all 0.2s',
                            boxShadow: statusFilter === filter.key ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                    >
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: filter.color }}>
                            {filter.count}
                        </span>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', textAlign: 'center' }}>
                            {filter.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Payouts Table */}
            <Card style={{ padding: '1.5rem', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    {statusFilter !== 'all' ? `Retraits - ${filteredPayouts.length} résultat(s)` : 'Historique des Reversements'}
                </h3>

                <DataTable
                    columns={columns}
                    data={filteredPayouts}
                    renderRowActions={renderRowActions}
                    searchPlaceholder="Rechercher un reversement..."
                />
            </Card>

            {/* Receipt Modal */}
            {isReceiptOpen && selectedPayout && (
                <PayoutReceipt
                    payout={selectedPayout._original || selectedPayout}
                    isAdmin={['ADMIN', 'SUPER_ADMIN', 'FINANCE'].includes(user?.role)}
                />
            )}

            {/* Validation Modal */}
            <PayoutValidationModal
                isOpen={isValidationModalOpen}
                onClose={() => {
                    setIsValidationModalOpen(false);
                    setSelectedPayout(null);
                }}
                payout={selectedPayout}
                userRole={user?.role}
                onValidate={handleValidate}
                onReject={handleReject}
            />
        </div>
    );
};

export default PayoutListPage;
