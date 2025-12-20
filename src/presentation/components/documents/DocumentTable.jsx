import { Eye, Edit, Trash2, MoreVertical, Banknote, FileText, FileCheck } from 'lucide-react';
import Card from '../ui/Card';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';

const DocumentTable = ({ documents, type = 'invoice', onPay, onGenerateFne }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '0 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Numéro</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Montant TTC</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Statut</th>
                        <th style={{ padding: '0 1.5rem', width: '50px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc, index) => (
                        <tr
                            key={doc.id}
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
                            <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--primary)', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        background: 'var(--primary-lighter)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--primary)',
                                        boxShadow: '0 2px 4px rgba(0, 186, 113, 0.1)'
                                    }}>
                                        <FileText size={18} />
                                    </div>
                                    <span style={{ fontFamily: 'monospace', fontSize: '0.95rem' }}>{doc.number}</span>
                                </div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{doc.clientName}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{doc.clientPhone}</div>
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{doc.date}</td>
                            <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>{doc.amount.toLocaleString('fr-FR')} FCFA</td>
                            <td style={{ padding: '1rem' }}>
                                <StatusBadge status={doc.status} />
                            </td>
                            <td style={{ padding: '1rem 1.5rem', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <Link to={`/dashboard/invoices/${doc.id}`}>
                                        <button className="btn-icon" style={{
                                            color: 'var(--text-secondary)',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-main)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            title="Voir">
                                            <Eye size={16} />
                                        </button>
                                    </Link>

                                    {/* Generate FNE button for paid invoices */}
                                    {doc.status === 'paid' && onGenerateFne && type === 'invoice' && (
                                        <button onClick={() => onGenerateFne(doc)} className="btn-icon" style={{
                                            color: 'var(--primary)',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'all 0.2s',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--primary-lighter)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                            title="Générer FNE">
                                            <FileCheck size={16} />
                                        </button>
                                    )}

                                    {['draft', 'pending'].includes(doc.status) && (
                                        <>
                                            {doc.status === 'pending' && onPay && (
                                                <button onClick={() => onPay(doc)} className="btn-icon" style={{
                                                    color: 'var(--success)',
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'all 0.2s',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--success-light)'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    title="Payer">
                                                    <Banknote size={16} />
                                                </button>
                                            )}
                                            <button className="btn-icon" style={{
                                                color: 'var(--info)',
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s',
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.1)'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                title="Modifier">
                                                <Edit size={16} />
                                            </button>
                                            <button className="btn-icon" style={{
                                                color: 'var(--danger)',
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s',
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                title="Supprimer">
                                                <Trash2 size={16} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {documents.length === 0 && (
                <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--bg-main)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        <FileText size={32} color="var(--text-muted)" />
                    </div>
                    <p style={{ fontSize: '1rem' }}>Aucun document trouvé.</p>
                </div>
            )}
        </div>
    );
};

export default DocumentTable;
