import { ArrowDownLeft, ArrowUpRight, Smartphone, CreditCard } from 'lucide-react';
import TransactionStatusBadge from './TransactionStatusBadge';
import DataTable from '../../../../components/ui/DataTable/DataTable';

const TransactionTable = ({ transactions }) => {
    const columns = [
        {
            key: 'type',
            label: 'Type',
            width: '60px',
            render: (row) => (
                <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: row.type === 'in' ? 'var(--success-light)' : 'var(--danger-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: row.type === 'in' ? 'var(--success)' : 'var(--danger)',
                    boxShadow: row.type === 'in' ? '0 2px 5px rgba(16, 185, 129, 0.2)' : '0 2px 5px rgba(239, 68, 68, 0.2)'
                }}>
                    {row.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
            )
        },
        {
            key: 'reference',
            label: 'Référence',
            sortable: true,
            width: '120px',
            render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: '600', color: 'var(--text-main)' }}>{row.reference}</span>
        },
        {
            key: 'party',
            label: 'Client / Description',
            width: '200px',
            render: (row) => (
                <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{row.party}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.description}</div>
                </div>
            )
        },
        {
            key: 'method',
            label: 'Méthode',
            width: '150px',
            render: (row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {row.method === 'Mobile Money' ? <Smartphone size={16} color="var(--primary)" /> : <CreditCard size={16} color="var(--secondary)" />}
                    {row.provider}
                </div>
            )
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            width: '120px',
            render: (row) => <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{row.date}</span>
        },
        {
            key: 'amount',
            label: 'Montant',
            sortable: true,
            width: '130px',
            render: (row) => (
                <span style={{ fontWeight: '700', color: row.type === 'in' ? 'var(--success)' : 'var(--text-main)', fontSize: '0.95rem' }}>
                    {row.type === 'in' ? '+' : '-'}{row.amount.toLocaleString()} FCFA
                </span>
            )
        },
        {
            key: 'accountNumber',
            label: 'N° Compte',
            sortable: true,
            width: '130px',
            render: (row) => <span style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{row.accountNumber || 'N/A'}</span>
        },
        {
            key: 'vendorBalance',
            label: 'Solde Vendeur',
            sortable: true,
            width: '150px',
            render: (row) => (
                <span style={{ fontWeight: '600', color: 'var(--primary)' }}>
                    {row.vendorBalance ? `${row.vendorBalance.toLocaleString()} FCFA` : 'N/A'}
                </span>
            )
        },
        {
            key: 'status',
            label: 'Statut',
            sortable: true,
            width: '120px',
            render: (row) => <TransactionStatusBadge status={row.status} />
        },
        {
            key: 'agent',
            label: 'Agent opérateur',
            width: '140px',
            render: (row) => (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {row.confirmed_by?.name || row.confirmedByName || '-'}
                </span>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={transactions}
            searchPlaceholder="Rechercher une transaction..."
        />
    );
};

export default TransactionTable;
