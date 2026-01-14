import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../app/shared/features/documents/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNotifications } from '../../../context/NotificationContext';
import AddVendorModal from './AddVendorModal';
import DataTable from '../../../components/ui/DataTable/DataTable';
import showAlert from '../../../utils/sweetAlert';

const VendorManagementPage = () => {
    const navigate = useNavigate();
    const { showSuccess, showWarning, showError } = useNotifications();

    const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    // Mock vendor data
    const [vendors, setVendors] = useState([
        {
            id: 'V001',
            accountNumber: 'FNE-25897101',
            name: 'Mamadou Diallo',
            email: 'mamadou.diallo@example.com',
            phone: '+221 77 123 45 67',
            company: 'Diallo Services SARL',
            registeredAt: '2024-01-15T10:30:00',
            kycStatus: 'approved',
            accountStatus: 'active',
            totalSales: 15750000,
            commissionsPaid: 472500,
            documentsCount: 45,
            clientType: 'B2B',
            ncc: 'NCC-00123'
        },
        {
            id: 'V002',
            accountNumber: 'FNE-25897102',
            name: 'Fatou Sow',
            email: 'fatou.sow@example.com',
            phone: '+221 76 234 56 78',
            company: 'Sow Trading',
            registeredAt: '2024-02-20T14:15:00',
            kycStatus: 'pending',
            accountStatus: 'active',
            totalSales: 8500000,
            commissionsPaid: 255000,
            documentsCount: 28,
            clientType: 'B2B',
            ncc: 'NCC-99887'
        },
        {
            id: 'V003',
            accountNumber: 'FNE-25897103',
            name: 'Ibrahima Fall',
            email: 'ibrahima.fall@example.com',
            phone: '+221 78 345 67 89',
            company: 'Fall Enterprises',
            registeredAt: '2024-03-10T09:00:00',
            kycStatus: 'rejected',
            accountStatus: 'suspended',
            totalSales: 3200000,
            commissionsPaid: 96000,
            documentsCount: 12,
            clientType: 'B2B'
        },
        {
            id: 'V004',
            accountNumber: 'FNE-25897104',
            name: 'Aissatou Ndiaye',
            email: 'aissatou.ndiaye@example.com',
            phone: '+221 77 456 78 90',
            company: 'Ndiaye Commerce',
            registeredAt: '2024-03-25T11:45:00',
            kycStatus: 'approved',
            accountStatus: 'active',
            totalSales: 12300000,
            commissionsPaid: 369000,
            documentsCount: 38,
            clientType: 'B2C'
        }
    ]);

    const [statusFilter, setStatusFilter] = useState('all');

    const statusFilteredVendors = vendors.filter(vendor => {
        return statusFilter === 'all' || vendor.accountStatus === statusFilter;
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
        setVendors(vendors.map(v => v.id === vendor.id ? { ...v, kycStatus: 'approved' } : v));
        showSuccess(`KYC approuvé pour ${vendor.name}`);
    };

    const handleRejectKyc = (vendor) => {
        setVendors(vendors.map(v => v.id === vendor.id ? { ...v, kycStatus: 'rejected' } : v));
        showWarning(`KYC rejeté pour ${vendor.name}`);
    };

    const handleSuspendAccount = (vendor) => {
        const newStatus = vendor.accountStatus === 'active' ? 'suspended' : 'active';
        setVendors(vendors.map(v => v.id === vendor.id ? { ...v, accountStatus: newStatus } : v));
        showWarning(`Compte ${newStatus === 'active' ? 'réactivé' : 'suspendu'} pour ${vendor.name}`);
    };

    const handleDeleteVendor = async (id) => {
        const result = await showAlert.confirm(
            'Suppression',
            'Êtes-vous sûr de vouloir supprimer ce vendeur ?',
            'Supprimer'
        );

        if (result.isConfirmed) {
            setVendors(vendors.filter(v => v.id !== id));
            showSuccess('Vendeur supprimé avec succès');
        }
    };

    const handleSaveVendor = (vendorData) => {
        if (selectedVendor) {
            // Update
            setVendors(vendors.map(v => v.id === selectedVendor.id ? {
                ...v,
                name: vendorData.clientName,
                email: vendorData.clientEmail,
                phone: vendorData.clientPhone,
                company: vendorData.clientName,
                ncc: vendorData.clientNcc,
                clientType: vendorData.clientType,
                currency: vendorData.currency,
                exchangeRate: vendorData.exchangeRate
            } : v));
            showSuccess('Vendeur mis à jour avec succès !');
        } else {
            // Create
            const newVendor = {
                id: 'V' + Math.floor(Math.random() * 1000),
                accountNumber: 'FNE-' + Math.floor(10000000 + Math.random() * 90000000).toString(),
                name: vendorData.clientName,
                email: vendorData.clientEmail,
                phone: vendorData.clientPhone,
                company: vendorData.clientName,
                ncc: vendorData.clientNcc,
                clientType: vendorData.clientType,
                registeredAt: new Date().toISOString(),
                kycStatus: 'pending',
                accountStatus: 'active',
                totalSales: 0,
                commissionsPaid: 0,
                documentsCount: 0
            };
            setVendors([...vendors, newVendor]);
            showSuccess('Vendeur ajouté avec succès !');
        }
        setIsAddVendorModalOpen(false);
    };

    const handleOpenAddModal = () => {
        setSelectedVendor(null);
        setIsAddVendorModalOpen(true);
    };

    const handleOpenEditModal = (vendor) => {
        setSelectedVendor(vendor);
        setIsAddVendorModalOpen(true);
    };

    const columns = [
        {
            key: 'accountNumber',
            label: 'N° Compte',
            sortable: true,
            render: (row) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {row.accountNumber}
                </span>
            )
        },
        {
            key: 'name',
            label: 'Vendeur',
            sortable: true,
            render: (row) => (
                <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{row.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.email}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.phone}</div>
                </div>
            )
        },
        {
            key: 'company',
            label: 'Entreprise',
            sortable: true
        },
        {
            key: 'kycStatus',
            label: 'KYC',
            sortable: true,
            render: (row) => {
                const kycStyle = getKycStatusColor(row.kycStatus);
                return (
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
                        {row.kycStatus === 'approved' ? 'Approuvé' : row.kycStatus === 'pending' ? 'En attente' : 'Rejeté'}
                    </span>
                );
            }
        },
        {
            key: 'accountStatus',
            label: 'Statut',
            sortable: true,
            render: (row) => (
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: row.accountStatus === 'active' ? 'var(--success-light)' : '#FEE2E2',
                    color: row.accountStatus === 'active' ? 'var(--success)' : '#DC2626',
                    textTransform: 'uppercase'
                }}>
                    {row.accountStatus === 'active' ? 'Actif' : 'Suspendu'}
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
            label: 'Approuver KYC',
            icon: <CheckCircle size={16} />,
            show: (row) => row.kycStatus === 'pending',
            onClick: (row) => handleApproveKyc(row)
        },
        {
            label: 'Rejeter KYC',
            icon: <XCircle size={16} />,
            show: (row) => row.kycStatus === 'pending',
            onClick: (row) => handleRejectKyc(row)
        },
        {
            label: 'Suspendre/Activer',
            icon: <Clock size={16} />,
            onClick: (row) => handleSuspendAccount(row)
        },
        {
            label: 'Supprimer',
            icon: <Trash2 size={16} />,
            variant: 'danger',
            onClick: (row) => handleDeleteVendor(row.id)
        }
    ];

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        Gestion des Vendeurs
                    </h1>
                    <p className="text-muted">Gérez les vendeurs, validez les KYC et surveillez l'activité.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={18} /> Ajouter un Vendeur
                    </button>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}>
                        <Download size={18} /> Exporter
                    </button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={statusFilteredVendors}
                actions={actions}
                searchPlaceholder="Rechercher par nom, email ou entreprise..."
                selectable
                renderToolbar={
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.875rem',
                            minWidth: '200px'
                        }}
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="active">Actifs</option>
                        <option value="suspended">Suspendus</option>
                    </select>
                }
            />

            <AddVendorModal
                isOpen={isAddVendorModalOpen}
                onClose={() => setIsAddVendorModalOpen(false)}
                onSave={handleSaveVendor}
                vendor={selectedVendor}
            />
        </div>
    );
};

export default VendorManagementPage;
