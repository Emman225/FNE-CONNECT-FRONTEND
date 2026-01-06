import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreVertical, Edit2, Trash2, Filter, Shield, User, Download, Lock } from 'lucide-react';


import { userRoles, roleLabels } from '../../../../types/roles';
import { mockUsers as MOCK_USERS } from '../../../../data/mockUsers';

// Helper to get role badge color
const getRoleBadgeStyle = (role) => {
    switch (role) {
        case userRoles.ADMIN: return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' }; // Red
        case userRoles.COMPLIANCE: return { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6' }; // Purple
        case userRoles.FINANCE: return { bg: 'rgba(234, 179, 8, 0.1)', text: '#eab308' }; // Yellow
        case userRoles.SUPPORT: return { bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316' }; // Orange
        case userRoles.AUDITOR: return { bg: 'rgba(107, 114, 128, 0.1)', text: '#6b7280' }; // Gray
        default: return { bg: 'rgba(57, 180, 154, 0.1)', text: '#059669' }; // Green (Vendor)
    }
};

const UserListPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    // In a real app, this would be fetched from API
    // Using simple mock delete for demo
    const [users, setUsers] = useState(MOCK_USERS);

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm);

            const matchesRole = roleFilter === 'all'
                ? user.role !== userRoles.VENDOR
                : user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [searchTerm, roleFilter, users]);

    return (
        <div className="fade-in">
            {/* Header */}
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        Gestion des Utilisateurs
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Gérez les accès et les comptes de la plateforme.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/dashboard/users/new')}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={18} />
                    Nouvel Utilisateur
                </button>
            </div>

            {/* Filters */}
            <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Rechercher par nom, email ou téléphone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.625rem 0.625rem 0.625rem 2.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.9rem',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={18} color="var(--text-secondary)" />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        style={{
                            padding: '0.625rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.9rem',
                            backgroundColor: 'white',
                            minWidth: '150px'
                        }}
                    >
                        <option value="all">Tous les rôles</option>
                        {Object.values(userRoles)
                            .filter(role => role !== userRoles.VENDOR)
                            .map(role => (
                                <option key={role} value={role}>{roleLabels[role]}</option>
                            ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Utilisateur</th>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Rôle</th>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Contact</th>
                                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Statut</th>
                                <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => {
                                const roleStyle = getRoleBadgeStyle(user.role);
                                return (
                                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="hover-bg-light">
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--primary-light)',
                                                    color: 'var(--primary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {user.avatar || 'U'}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '500', color: 'var(--text-main)', margin: 0 }}>{user.name}</p>
                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                                                        Créé le {user.date_creation ? new Date(user.date_creation).toLocaleDateString() : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                backgroundColor: roleStyle.bg,
                                                color: roleStyle.text,
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.25rem'
                                            }}>
                                                {user.role === userRoles.ADMIN && <Shield size={12} />}
                                                {roleLabels[user.role]}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                                <div>{user.email}</div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{user.phone}</div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                backgroundColor: user.statut_compte === 'actif' ? 'rgba(57, 180, 154, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: user.statut_compte === 'actif' ? '#059669' : '#ef4444',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                {user.statut_compte === 'actif' ? 'Actif' : 'Suspendu'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => navigate(`/admin/dashboard/users/${user.id}`)} // Should go to edit page, id is enough
                                                    style={{
                                                        padding: '0.5rem',
                                                        borderRadius: 'var(--radius-md)',
                                                        border: '1px solid var(--border-color)',
                                                        backgroundColor: 'white',
                                                        color: 'var(--text-secondary)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title="Modifier"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        borderRadius: 'var(--radius-md)',
                                                        border: '1px solid var(--danger-light)',
                                                        backgroundColor: 'var(--danger-light)', // Light red bg
                                                        color: 'var(--danger)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <User size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>Aucun utilisateur trouvé.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserListPage;
