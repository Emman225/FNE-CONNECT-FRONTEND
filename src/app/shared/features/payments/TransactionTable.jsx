import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Smartphone, CreditCard } from 'lucide-react';
import TransactionStatusBadge from './TransactionStatusBadge';

const TransactionTable = ({ transactions }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '0 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Référence</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client / Description</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Méthode</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Montant</th>
                        <th style={{ padding: '0 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr
                            key={tx.id}
                            style={{
                                backgroundColor: 'white',
                                boxShadow: 'var(--shadow-sm)',
                                borderRadius: 'var(--radius-lg)',
                                transition: 'all var(--transition-fast)',
                                cursor: 'default'
                            }}
                            className="hover-lift"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                        >
                            <td style={{ padding: '1rem 1.5rem', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '10px',
                                    background: tx.type === 'in' ? 'var(--success-light)' : 'var(--danger-light)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: tx.type === 'in' ? 'var(--success)' : 'var(--danger)',
                                    boxShadow: tx.type === 'in' ? '0 2px 5px rgba(16, 185, 129, 0.2)' : '0 2px 5px rgba(239, 68, 68, 0.2)'
                                }}>
                                    {tx.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                </div>
                            </td>
                            <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: '600', color: 'var(--text-main)' }}>{tx.reference}</td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{tx.party}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tx.description}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    {tx.method === 'Mobile Money' ? <Smartphone size={16} color="var(--primary)" /> : <CreditCard size={16} color="var(--secondary)" />}
                                    {tx.provider}
                                </div>
                            </td>
                            <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{tx.date}</td>
                            <td style={{ padding: '1rem', fontWeight: '700', color: tx.type === 'in' ? 'var(--success)' : 'var(--text-main)', fontSize: '0.95rem' }}>
                                {tx.type === 'in' ? '+' : '-'}{tx.amount.toLocaleString()} FCFA
                            </td>
                            <td style={{ padding: '1rem 1.5rem', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                                <TransactionStatusBadge status={tx.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
