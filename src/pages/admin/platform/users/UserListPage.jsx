import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreVertical, Edit2, Trash2, Filter, Shield, User, Download, Lock } from 'lucide-react';
import { useNotifications } from '../../../../context/NotificationContext';

import { userRoles, roleLabels } from '../../../../types/roles';
import { userService } from '../../../../services/userService';
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
    const { showSuccess, showError } = useNotifications();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            showError("Erreur lors de la récupération des utilisateurs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const result = await showAlert.confirm(
            'Suppression',
            'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            'Supprimer'
        );

        if (result.isConfirmed) {
            try {
                await userService.delete(id);
                showSuccess('Utilisateur supprimé avec succès');
                fetchUsers();
            } catch (error) {
                showError("Erreur lors de la suppression");
            }
        }
    };

    const handleSaveUser = async (userData) => {
        try {
            if (userData.id) {
                await userService.update(userData.id, userData);
                showSuccess('Utilisateur mis à jour avec succès');
            } else {
                await userService.create(userData);
                showSuccess('Utilisateur créé avec succès');
            }
            fetchUsers();
            setIsAddUserModalOpen(false);
        } catch (error) {
            showError("Erreur lors de l'enregistrement de l'utilisateur");
        }
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
            key: 'id',
            label: 'ID',
            sortable: true,
            render: (row) => (
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {row.id.substring(0, 8)}...
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
                        {row.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <p style={{ fontWeight: '500', color: 'var(--text-main)', margin: 0 }}>{row.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                            Créé le {row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}
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
                        {row.role === 'admin' && <Shield size={12} />}
                        {row.role}
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
            key: 'status',
            label: 'Statut',
            sortable: true,
            render: (row) => (
                <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: row.status === 'active' ? 'rgba(57, 180, 154, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: row.status === 'active' ? '#059669' : '#ef4444',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                }}>
                    {row.status === 'active' ? 'Actif' : 'Suspendu'}
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

            {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center' }}>
                    <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
                    <p style={{ color: 'var(--text-secondary)' }}>Chargement des utilisateurs...</p>
                </div>
            ) : (
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
                                <option value="admin">Administrateur</option>
                                <option value="finance">Finance</option>
                                <option value="compliance">Conformité</option>
                                <option value="support">Support</option>
                                <option value="auditor">Auditeur</option>
                            </select>
                        </div>
                    }
                />
            )}
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
