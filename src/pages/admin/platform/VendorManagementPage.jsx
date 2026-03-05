import React, { useState, useEffect } from 'react';
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
import { adminService } from '../../../services/adminService';
import LogoLoader from '../../../components/ui/LogoLoader';
import VendorDocumentsModal from '../../../components/modals/VendorDocumentsModal';

const VendorManagementPage = () => {
    const navigate = useNavigate();
    const { showSuccess, showWarning, showError } = useNotifications();

    const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);

    const fetchVendors = async () => {
        setLoading(true);
        try {
            const response = await adminService.getVendors({
                status: statusFilter !== 'all' ? statusFilter : undefined
            });

            // Backend returns paginate(20), so we expect response.data
            const vendorData = response.data || response;

            setVendors((Array.isArray(vendorData) ? vendorData : []).map(v => ({
                id: v.id,
                accountNumber: v.account_number || `FNE-${v.id.substring(0, 8)}`,
                name: v.user?.name || 'Inconnu',
                email: v.user?.email || 'N/A',
                phone: v.user?.phone || 'N/A',
                company: v.business_name || 'N/A',
                registeredAt: v.created_at,
                kycStatus: v.kyc_status,
                accountStatus: v.user?.status || 'active',
                totalSales: v.total_sales || 0,
                commissionsPaid: v.commissions_paid || 0,
                documentsCount: v.kyc_documents_count || 0,
                clientType: v.client_type,
                ncc: v.ncc_number,
                kycApproverName: v.kyc_approver?.name || null
            })));
        } catch (error) {
            console.error("Failed to fetch vendors:", error);
            showError("Erreur lors de la récupération des vendeurs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, [statusFilter]);

    const getKycStatusColor = (status) => {
        switch (status) {
            case 'approved': return { bg: '#D1FAE5', color: '#065F46', border: '#10B981' };
            case 'pending':
            case 'submitted': return { bg: '#FEF3C7', color: '#92400E', border: '#F59E0B' };
            case 'rejected': return { bg: '#FEE2E2', color: '#991B1B', border: '#EF4444' };
            default: return { bg: '#F3F4F6', color: '#6B7280', border: '#9CA3AF' };
        }
    };

    const handleApproveKyc = async (vendor) => {
        try {
            await adminService.reviewKyc(vendor.id, 'approved');
            showSuccess(`KYC approuvé pour ${vendor.name}`);
            fetchVendors();
        } catch (error) {
            showError("Erreur lors de l'approbation du KYC");
        }
    };

    const handleRejectKyc = async (vendor) => {
        const result = await showAlert.confirm(
            'Rejeter KYC',
            'Voulez-vous rejeter ce dossier KYC ?',
            'Rejeter',
            'danger'
        );

        if (result.isConfirmed) {
            try {
                await adminService.reviewKyc(vendor.id, 'rejected', 'Document non conforme');
                showWarning(`KYC rejeté pour ${vendor.name}`);
                fetchVendors();
            } catch (error) {
                showError("Erreur lors du rejet du KYC");
            }
        }
    };

    const handleSuspendAccount = async (vendor) => {
        const newStatus = vendor.accountStatus === 'active' ? 'suspended' : 'active';
        try {
            await adminService.updateVendorStatus(vendor.id, newStatus);
            showWarning(`Compte ${newStatus === 'active' ? 'réactivé' : 'suspendu'} pour ${vendor.name}`);
            fetchVendors();
        } catch (error) {
            showError("Erreur lors de la modification du statut");
        }
    };

    const handleDeleteVendor = async (id) => {
        const result = await showAlert.confirm(
            'Suppression',
            'Êtes-vous sûr de vouloir supprimer ce vendeur ? Cette action est irréversible.',
            'Supprimer'
        );

        if (result.isConfirmed) {
            try {
                await adminService.deleteVendor(id);
                showSuccess('Vendeur supprimé avec succès');
                fetchVendors();
            } catch (error) {
                showError("Erreur lors de la suppression du vendeur");
            }
        }
    };

    const handleSaveVendor = async (vendorData) => {
        showWarning("La gestion directe des vendeurs par l'admin via ce formulaire sera bientôt disponible.");
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
                let statusLabel = 'Inconnu';
                if (row.kycStatus === 'approved') statusLabel = 'Approuvé';
                else if (row.kycStatus === 'pending' || row.kycStatus === 'submitted') statusLabel = 'En attente';
                else if (row.kycStatus === 'rejected') statusLabel = 'Rejeté';

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
                        {statusLabel}
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
        },
        {
            key: 'kycApproverName',
            label: 'Agent opérateur',
            render: (row) => (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {row.kycApproverName || '-'}
                </span>
            )
        }
    ];

    const actions = [
        {
            label: 'Voir Documents',
            icon: <Eye size={16} />,
            onClick: (row) => {
                setSelectedVendor(row);
                setIsDocModalOpen(true);
            }
        },
        {
            label: 'Modifier',
            icon: <Edit2 size={16} />,
            onClick: (row) => handleOpenEditModal(row)
        },
        {
            label: 'Approuver KYC',
            icon: <CheckCircle size={16} />,
            show: (row) => row.kycStatus === 'pending' || row.kycStatus === 'submitted',
            onClick: (row) => handleApproveKyc(row)
        },
        {
            label: 'Rejeter KYC',
            icon: <XCircle size={16} />,
            show: (row) => row.kycStatus === 'pending' || row.kycStatus === 'submitted',
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

            {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LogoLoader size="lg" />
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Chargement des vendeurs...</p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={vendors}
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
            )}

            <AddVendorModal
                isOpen={isAddVendorModalOpen}
                onClose={() => setIsAddVendorModalOpen(false)}
                onSave={handleSaveVendor}
                vendor={selectedVendor}
            />

            <VendorDocumentsModal
                isOpen={isDocModalOpen}
                onClose={() => { setIsDocModalOpen(false); setSelectedVendor(null); }}
                vendorId={selectedVendor?.id}
                vendorName={selectedVendor?.name}
            />
        </div>
    );
};

export default VendorManagementPage;
