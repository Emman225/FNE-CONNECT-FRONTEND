import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../app/shared/features/documents/StatusBadge';
import { Wallet, Filter, Download, Info } from 'lucide-react';
import { formatCurrency } from '../../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import DataTable from '../../../components/ui/DataTable/DataTable';
import { paymentService } from '../../../services/paymentService'; // Assuming paymentService handles API calls

const CommissionListPage = () => {
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommissions = async () => {
            setLoading(true);
            try {
                // Fetch payments that are likely commissions (e.g., outgoing payments to FNE)
                // You might need to adjust the filter params based on your backend API
                const response = await paymentService.getAll({ type: 'commission' });

                // Map API response to component structure
                const mappedData = (response.data || []).map(item => ({
                    id: item.reference || `COM-${item.id}`,
                    invoiceNumber: item.related_invoice_number || '-',
                    accountNumber: item.account_number || 'N/A',
                    createdAt: item.created_at,
                    paidAt: item.created_at, // Assuming created_at is payment date for now
                    amount: item.amount,
                    rate: item.rate || 0.03, // Default or fetch from API
                    vendorBalance: item.balance_after,
                    status: item.status || 'completed'
                }));

                setCommissions(mappedData);
            } catch (error) {
                console.error("Failed to fetch commissions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommissions();
    }, []);

    const columns = [
        {
            key: 'id',
            label: 'Référence',
            sortable: true,
            width: '140px',
            render: (row) => <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{row.id}</span>
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
            render: (row) => row.createdAt ? format(new Date(row.createdAt), 'dd MMM yyyy', { locale: fr }) : '-'
        },
        {
            key: 'rate',
            label: 'Taux',
            align: 'right',
            width: '100px',
            render: (row) => `${(row.rate * 100).toFixed(1)}%`
        },
        {
            key: 'amount',
            label: 'Montant',
            align: 'right',
            sortable: true,
            width: '140px',
            render: (row) => <span style={{ fontWeight: '600' }}>{formatCurrency(row.amount)}</span>
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
            width: '140px',
            render: (row) => <StatusBadge status={row.status} />
        }
    ];

    const renderRowActions = (commission) => {
        return (
            <span style={{ fontSize: '0.875rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ✓ Payée le {commission.paidAt ? format(new Date(commission.paidAt), 'dd/MM/yyyy', { locale: fr }) : '-'}
            </span>
        );
    };

    const totalPaid = commissions.reduce((sum, c) => sum + Number(c.amount || 0), 0);

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

            {/* Info banner */}
            <div style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #3B82F6',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'start',
                gap: '1rem'
            }}>
                <Info size={24} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', color: '#1E40AF', marginBottom: '0.5rem' }}>
                        Comment fonctionnent les commissions ?
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#1E3A8A', lineHeight: '1.6' }}>
                        Les commissions sont automatiquement payées <strong>lors de la génération de chaque facture</strong>.
                        Cette page affiche uniquement l'historique des commissions déjà payées pour assurer la transparence de vos transactions.
                    </p>
                </div>
            </div>

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
                            backgroundColor: 'var(--success-light)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Wallet size={24} color="var(--success)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Total Commissions Payées
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
                                Nombre de Factures
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {commissions.length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#F3E8FF',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Wallet size={24} color="#9333EA" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Taux Moyen
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#9333EA' }}>
                                {commissions.length > 0
                                    ? `${((commissions.reduce((sum, c) => sum + (c.rate || 0), 0) / commissions.length) * 100).toFixed(1)}%`
                                    : '0%'
                                }
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Commissions Table */}
            <Card style={{ padding: '1.5rem', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    Historique des Commissions
                </h3>

                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={commissions}
                        renderRowActions={renderRowActions}
                        searchPlaceholder="Rechercher une commission..."
                    />
                )}
            </Card>

        </div>
    );
};

export default CommissionListPage;
