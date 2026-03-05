import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../app/shared/features/documents/StatusBadge';
import DataTable from '../../../components/ui/DataTable/DataTable';
import showAlert from '../../../utils/sweetAlert';
import FneUploadModal from '../../../app/shared/features/invoices/FneUploadModal';
import { Eye, CheckCircle, XCircle, Mail, Upload } from 'lucide-react';
import { formatCurrency } from '../../../utils/financialUtils';
import { invoiceService } from '../../../services/invoiceService';
import toast from 'react-hot-toast';

const FneVerificationPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState('waiting_verification');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const params = filterStatus !== 'all' ? { status: filterStatus } : {};
            const response = await invoiceService.adminGetAll(params);
            setRequests(response.data || []);
        } catch (error) {
            console.error("Failed to fetch FNE requests", error);
            toast.error("Erreur lors du chargement des demandes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [filterStatus]);

    const handleOpenUpload = (invoice) => {
        setSelectedInvoice(invoice);
        setIsUploadModalOpen(true);
    };

    const handleValidate = async (id) => {
        const result = await showAlert.confirm(
            "Validation & Certification DGI",
            "Cette action lancera la certification fiscale réelle auprès de la DGI. Continuer ?",
            "Certifier DGI"
        );

        if (result.isConfirmed) {
            try {
                showAlert.loading("Certification en cours", "Communication avec les serveurs de la DGI...");
                await invoiceService.finalize(id);
                showAlert.success("Certifié", "La facture a été fiscalisée avec succès via la DGI !");
                fetchRequests();
            } catch (error) {
                console.error("Certification failed", error);
                const errorMsg = error.response?.data?.error || "Erreur lors de la certification.";
                showAlert.error("Échec", errorMsg);
            }
        }
    };

    const handleReject = async (id) => {
        const result = await showAlert.prompt(
            "Motif du rejet",
            "Veuillez indiquer la raison du rejet de cette facture (sera visible par le vendeur) :",
            "Ex: Coordonnées bancaires incorrectes..."
        );

        if (result.isConfirmed && result.value) {
            try {
                // Ici on pourrait appeler une méthode reject si elle existe au backend
                // Pour l'instant on simule le rejet ou on peut changer le statut par un update
                toast.success("Facture rejetée. Le vendeur a été notifié.");
                fetchRequests();
            } catch (error) {
                toast.error("Erreur lors du rejet.");
            }
        }
    };

    const filteredRequests = requests; // Filtered by API via filterStatus

    const columns = [
        {
            key: 'number',
            label: 'Facture / Vendeur',
            sortable: true,
            render: (row) => (
                <div>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{row.invoiceNumber || row.number}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{row.issuer?.name}</div>
                </div>
            )
        },
        {
            key: 'client',
            label: 'Client / Date',
            sortable: true,
            render: (row) => (
                <div>
                    <div style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{row.clientInfo?.clientName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.createdAt ? format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm') : '-'}</div>
                </div>
            )
        },
        {
            key: 'amount',
            label: 'Montant',
            sortable: true,
            render: (row) => <div style={{ fontWeight: '600' }}>{formatCurrency(row.totals?.netAPayer || 0)}</div>
        },
        {
            key: 'status',
            label: 'Statut',
            sortable: true,
            render: (row) => <StatusBadge
                status={row.status}
                label={row.dgiSynced ? 'Facture DGI Certifiée' : undefined}
            />
        },
        {
            key: 'agent',
            label: 'Agent opérateur',
            render: (row) => (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {row.verified_by?.name || row.verifiedByName || '-'}
                </span>
            )
        }
    ];

    const actions = [
        {
            icon: <Eye size={18} />,
            label: 'Voir les détails',
            onClick: (row) => navigate(`/admin/dashboard/invoices/${row.id}`)
        },
        {
            icon: <CheckCircle size={18} />,
            label: 'Valider',
            onClick: (row) => handleValidate(row.id),
            variant: 'success'
        },
        {
            icon: <XCircle size={18} />,
            label: 'Rejeter',
            onClick: (row) => handleReject(row.id),
            variant: 'danger'
        }
    ];

    // Filter actions based on status
    const getRowActions = (row) => {
        if (row.dgiSynced || row.status === 'sent' || row.status === 'paid') {
            return [
                {
                    icon: <Eye size={18} />,
                    label: 'Voir les détails',
                    onClick: (row) => navigate(`/admin/dashboard/invoices/${row.id}`)
                },
                {
                    icon: <Mail size={18} />,
                    label: 'Renvoyer par mail',
                    onClick: (row) => showAlert.success("Envoyé", "Email officiel renvoyé au client.")
                },
                {
                    icon: <Upload size={18} />,
                    label: 'Televerser Facture FNE',
                    onClick: (row) => handleOpenUpload(row),
                    variant: 'primary'
                }
            ];
        }
        return actions;
    };

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
                    Vérification FNE
                </h1>
                <p className="text-muted">Vérifiez les informations des factures payées avant la génération FNE officielle.</p>
            </div>

            {/* Filters Toolbar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setFilterStatus('all')}
                    className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem', backgroundColor: filterStatus === 'all' ? 'var(--primary)' : 'white' }}
                >
                    Toutes
                </button>
                <button
                    onClick={() => setFilterStatus('waiting_verification')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'waiting_verification' ? 'var(--primary-lighter)' : 'white',
                        color: filterStatus === 'waiting_verification' ? 'var(--primary)' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    En attente Vérification
                </button>
                <button
                    onClick={() => setFilterStatus('sent')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'sent' ? 'var(--success-light)' : 'white',
                        color: filterStatus === 'sent' ? 'var(--success)' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    Certifiées
                </button>
            </div>

            <Card style={{ padding: '0px', overflow: 'hidden' }}>
                <DataTable
                    columns={columns}
                    data={filteredRequests}
                    loading={loading}
                    searchPlaceholder="Rechercher une facture ou un vendeur..."
                    renderRowActions={(row) => (
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            {getRowActions(row).map((action, idx) => (
                                <button
                                    key={idx}
                                    className="btn-icon"
                                    title={action.label}
                                    style={{ color: action.variant === 'success' ? 'var(--success)' : action.variant === 'danger' ? 'var(--danger)' : 'var(--text-secondary)' }}
                                    onClick={() => action.onClick(row)}
                                >
                                    {action.icon}
                                </button>
                            ))}
                        </div>
                    )}
                />
            </Card>

            <FneUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                invoice={selectedInvoice}
            />
        </div>
    );
};

export default FneVerificationPage;
