import { ArrowDownLeft, ArrowUpRight, Smartphone, CreditCard } from 'lucide-react';
import TransactionStatusBadge from './TransactionStatusBadge';
import DataTable from '../../../../components/ui/DataTable/DataTable';

const TransactionTable = ({ transactions }) => {
    const columns = [
        {
            key: 'type',
            label: 'Type',
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
            render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: '600', color: 'var(--text-main)' }}>{row.reference}</span>
        },
        {
            key: 'party',
            label: 'Client / Description',
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
            render: (row) => <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{row.date}</span>
        },
        {
            key: 'amount',
            label: 'Montant',
            sortable: true,
            render: (row) => (
                <span style={{ fontWeight: '700', color: row.type === 'in' ? 'var(--success)' : 'var(--text-main)', fontSize: '0.95rem' }}>
                    {row.type === 'in' ? '+' : '-'}{row.amount.toLocaleString()} FCFA
                </span>
            )
        },
        {
            key: 'status',
            label: 'Statut',
            sortable: true,
            render: (row) => <TransactionStatusBadge status={row.status} />
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
