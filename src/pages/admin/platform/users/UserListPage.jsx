import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreVertical, Edit2, Trash2, Filter, Shield, User, Download, Lock } from 'lucide-react';
import { useNotifications } from '../../../../context/NotificationContext';

import { userRoles, roleLabels } from '../../../../types/roles';
import { mockUsers as MOCK_USERS } from '../../../../data/mockUsers';
import AddUserModal from './AddUserModal';
import DataTable from '../../../../components/ui/DataTable/DataTable';
import showAlert from '../../../../utils/sweetAlert';

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
    const { showSuccess } = useNotifications();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // In a real app, this would be fetched from API
    const [users, setUsers] = useState(MOCK_USERS);

    const handleDelete = async (id) => {
        const result = await showAlert.confirm(
            'Suppression',
            'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            'Supprimer'
        );

        if (result.isConfirmed) {
            setUsers(users.filter(u => u.id !== id));
            showSuccess('Utilisateur supprimé avec succès');
        }
    };

    const handleSaveUser = (userData) => {
        if (userData.id) {
            // Update
            setUsers(users.map(u => u.id === userData.id ? userData : u));
        } else {
            // Create
            const newUser = {
                ...userData,
                id: 'u-' + Math.random().toString(36).substr(2, 9),
                accountNumber: 'FNE-' + Math.floor(10000000 + Math.random() * 90000000).toString(),
                date_creation: new Date().toISOString()
            };
            setUsers([...users, newUser]);
        }
        setIsAddUserModalOpen(false);
    };

    const handleOpenAddModal = () => {
        setSelectedUser(null);
        setIsAddUserModalOpen(true);
    };

    const handleOpenEditModal = (user) => {
        setSelectedUser(user);
        setIsAddUserModalOpen(true);
    };

    // Filter by role only, let DataTable handle search
    const roleFilteredUsers = useMemo(() => {
        return users.filter(user => {
            if (roleFilter === 'all') return user.role !== userRoles.VENDOR;
            return user.role === roleFilter;
        });
    }, [roleFilter, users]);

    const columns = [
        {
            key: 'accountNumber',
            label: 'N° Compte',
            sortable: true,
            render: (row) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {row.accountNumber || '-'}
                </span>
            )
        },
        {
            key: 'name',
            label: 'Utilisateur',
            sortable: true,
            render: (row) => (
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
                        {row.avatar?.charAt(0) || row.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <p style={{ fontWeight: '500', color: 'var(--text-main)', margin: 0 }}>{row.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                            Créé le {row.date_creation ? new Date(row.date_creation).toLocaleDateString() : '-'}
                        </p>
                    </div>
                </div>
            )
        },
        {
            key: 'role',
            label: 'Rôle',
            sortable: true,
            render: (row) => {
                const roleStyle = getRoleBadgeStyle(row.role);
                return (
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
                        {row.role === userRoles.ADMIN && <Shield size={12} />}
                        {roleLabels[row.role]}
                    </span>
                );
            }
        },
        {
            key: 'email',
            label: 'Contact',
            render: (row) => (
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    <div>{row.email}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{row.phone}</div>
                </div>
            )
        },
        {
            key: 'statut_compte',
            label: 'Statut',
            sortable: true,
            render: (row) => (
                <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: row.statut_compte === 'actif' ? 'rgba(57, 180, 154, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: row.statut_compte === 'actif' ? '#059669' : '#ef4444',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                }}>
                    {row.statut_compte === 'actif' ? 'Actif' : 'Suspendu'}
                </span>
            )
        }
    ];

    const actions = [
        {
            label: 'Modifier',
            icon: <Edit2 size={16} />,
            onClick: (row) => handleOpenEditModal(row)
        },
        {
            label: 'Supprimer',
            icon: <Trash2 size={16} />,
            variant: 'danger',
            onClick: (row) => handleDelete(row.id)
        }
    ];

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
                    onClick={handleOpenAddModal}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={18} />
                    Nouvel Utilisateur
                </button>
            </div>

            <DataTable
                columns={columns}
                data={roleFilteredUsers}
                actions={actions}
                searchPlaceholder="Rechercher par nom, email ou téléphone..."
                selectable
                renderToolbar={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={16} color="var(--text-secondary)" />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            style={{
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-color)',
                                fontSize: '0.875rem',
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
                }
            />
            <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onSave={handleSaveUser}
                user={selectedUser}
            />
        </div>
    );
};

export default UserListPage;
