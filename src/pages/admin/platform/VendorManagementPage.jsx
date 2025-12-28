import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../app/shared/features/documents/StatusBadge';
import { Users, Search, Filter, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNotifications } from '../../../context/NotificationContext';

const VendorManagementPage = () => {
    const { showSuccess, showWarning } = useNotifications();

    // Mock vendor data
    const [vendors] = useState([
        {
            id: 'V001',
            name: 'Mamadou Diallo',
            email: 'mamadou.diallo@example.com',
            phone: '+221 77 123 45 67',
            company: 'Diallo Services SARL',
            registeredAt: '2024-01-15T10:30:00',
            kycStatus: 'approved',
            accountStatus: 'active',
            totalSales: 15750000,
            commissionsPaid: 472500,
            documentsCount: 45
        },
        {
            id: 'V002',
            name: 'Fatou Sow',
            email: 'fatou.sow@example.com',
            phone: '+221 76 234 56 78',
            company: 'Sow Trading',
            registeredAt: '2024-02-20T14:15:00',
            kycStatus: 'pending',
            accountStatus: 'active',
            totalSales: 8500000,
            commissionsPaid: 255000,
            documentsCount: 28
        },
        {
            id: 'V003',
            name: 'Ibrahima Fall',
            email: 'ibrahima.fall@example.com',
            phone: '+221 78 345 67 89',
            company: 'Fall Enterprises',
            registeredAt: '2024-03-10T09:00:00',
            kycStatus: 'rejected',
            accountStatus: 'suspended',
            totalSales: 3200000,
            commissionsPaid: 96000,
            documentsCount: 12
        },
        {
            id: 'V004',
            name: 'Aissatou Ndiaye',
            email: 'aissatou.ndiaye@example.com',
            phone: '+221 77 456 78 90',
            company: 'Ndiaye Commerce',
            registeredAt: '2024-03-25T11:45:00',
            kycStatus: 'approved',
            accountStatus: 'active',
            totalSales: 12300000,
            commissionsPaid: 369000,
            documentsCount: 38
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || vendor.accountStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getKycStatusColor = (status) => {
        switch (status) {
            case 'approved': return { bg: '#D1FAE5', color: '#065F46', border: '#10B981' };
            case 'pending': return { bg: '#FEF3C7', color: '#92400E', border: '#F59E0B' };
            case 'rejected': return { bg: '#FEE2E2', color: '#991B1B', border: '#EF4444' };
            default: return { bg: '#F3F4F6', color: '#6B7280', border: '#9CA3AF' };
        }
    };

    const handleApproveKyc = (vendor) => {
        showSuccess(`KYC approuvé pour ${vendor.name}`);
    };

    const handleRejectKyc = (vendor) => {
        showWarning(`KYC rejeté pour ${vendor.name}`);
    };

    const handleSuspendAccount = (vendor) => {
        showWarning(`Compte suspendu pour ${vendor.name}`);
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
                        Gestion des Vendeurs
                    </h1>
                    <p className="text-muted">Gérez les vendeurs, validez les KYC et surveillez l'activité.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}>
                        <Download size={18} /> Exporter
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
            }}>
                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--primary-lighter)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Users size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Total Vendeurs
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {vendors.length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--success-light)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <CheckCircle size={24} color="var(--success)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                KYC Approuvés
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--success)' }}>
                                {vendors.filter(v => v.kycStatus === 'approved').length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#FEF3C7',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Clock size={24} color="#D97706" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                KYC En Attente
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#D97706' }}>
                                {vendors.filter(v => v.kycStatus === 'pending').length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: '#FEE2E2',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <XCircle size={24} color="#DC2626" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Comptes Suspendus
                            </p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#DC2626' }}>
                                {vendors.filter(v => v.accountStatus === 'suspended').length}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-secondary)'
                        }} />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, email ou entreprise..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 3rem',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9375rem'
                            }}
                            className="input-field"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{
                            padding: '0.75rem 1rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.9375rem',
                            minWidth: '200px'
                        }}
                        className="input-field"
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="active">Actifs</option>
                        <option value="suspended">Suspendus</option>
                        <option value="pending">En attente</option>
                    </select>
                </div>
            </Card>

            {/* Vendors Table */}
            <Card style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    Liste des Vendeurs ({filteredVendors.length})
                </h3>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Vendeur
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Entreprise
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Inscription
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    KYC
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Statut
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    CA Total
                                </th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVendors.map((vendor) => {
                                const kycStyle = getKycStatusColor(vendor.kycStatus);
                                return (
                                    <tr key={vendor.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div>
                                                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{vendor.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                    {vendor.email}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                    {vendor.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                                            {vendor.company}
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            {format(new Date(vendor.registeredAt), 'dd MMM yyyy', { locale: fr })}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                backgroundColor: kycStyle.bg,
                                                color: kycStyle.color,
                                                border: `1px solid ${kycStyle.border}`,
                                                textTransform: 'uppercase'
                                            }}>
                                                {vendor.kycStatus === 'approved' && 'Approuvé'}
                                                {vendor.kycStatus === 'pending' && 'En attente'}
                                                {vendor.kycStatus === 'rejected' && 'Rejeté'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                backgroundColor: vendor.accountStatus === 'active' ? 'var(--success-light)' : '#FEE2E2',
                                                color: vendor.accountStatus === 'active' ? 'var(--success)' : '#DC2626',
                                                textTransform: 'uppercase'
                                            }}>
                                                {vendor.accountStatus === 'active' ? 'Actif' : 'Suspendu'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                                            {vendor.totalSales.toLocaleString('fr-FR')} FCFA
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: '1px solid var(--border-color)',
                                                        borderRadius: 'var(--radius-md)',
                                                        background: 'white',
                                                        cursor: 'pointer'
                                                    }}
                                                    title="Voir détails"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                {vendor.kycStatus === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApproveKyc(vendor)}
                                                            style={{
                                                                padding: '0.5rem',
                                                                border: '1px solid var(--success)',
                                                                borderRadius: 'var(--radius-md)',
                                                                background: 'white',
                                                                color: 'var(--success)',
                                                                cursor: 'pointer'
                                                            }}
                                                            title="Approuver KYC"
                                                        >
                                                            <CheckCircle size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectKyc(vendor)}
                                                            style={{
                                                                padding: '0.5rem',
                                                                border: '1px solid #EF4444',
                                                                borderRadius: 'var(--radius-md)',
                                                                background: 'white',
                                                                color: '#DC2626',
                                                                cursor: 'pointer'
                                                            }}
                                                            title="Rejeter KYC"
                                                        >
                                                            <XCircle size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default VendorManagementPage;
