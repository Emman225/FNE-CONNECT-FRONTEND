import React from 'react';
import { Eye, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import Card from '../ui/Card';

const ClientTable = ({ clients }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '0 1.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nom / Entreprise</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contacts</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Localisation</th>
                        <th style={{ padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</th>
                        <th style={{ padding: '0 1.5rem', width: '50px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr
                            key={client.id}
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        backgroundColor: 'var(--primary-lighter)',
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '700',
                                        fontSize: '1rem'
                                    }}>
                                        {client.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>{client.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{client.invoicesCount} factures</div>
                                    </div>
                                </div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                                    <Phone size={14} color="var(--primary)" /> {client.phone}
                                </div>
                                {client.email && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        <Mail size={14} /> {client.email}
                                    </div>
                                )}
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    <MapPin size={14} color="var(--text-muted)" /> {client.location}
                                </div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    backgroundColor: client.type === 'Entreprise' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                    color: client.type === 'Entreprise' ? 'var(--secondary)' : 'var(--success)'
                                }}>
                                    {client.type}
                                </span>
                            </td>
                            <td style={{ padding: '1rem 1.5rem', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
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
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {clients.length === 0 && (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>Aucun client trouvé.</p>
                </div>
            )}
        </div>
    );
};

export default ClientTable;
