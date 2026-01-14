import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../app/shared/features/documents/StatusBadge';
import DataTable from '../../../components/ui/DataTable/DataTable';
import showAlert from '../../../utils/sweetAlert';
import FneUploadModal from '../../../app/shared/features/invoices/FneUploadModal';
import { Eye, CheckCircle, XCircle, Mail, Upload } from 'lucide-react';
import { formatCurrency } from '../../../utils/financialUtils';

const MOCK_REQUESTS = [
    { id: 101, number: 'FAC-2023-005', vendor: 'Boutique Koumassi', client: 'Alice Yao', amount: 45000, netToPay: 45000, status: 'verifying', type: 'invoice', date: '2023-12-22' },
    { id: 102, number: 'FAC-2023-008', vendor: 'Ets Konan', client: 'Global Tech', amount: 1250000, netToPay: 1250000, status: 'verifying', type: 'invoice', date: '2023-12-23' },
    { id: 103, number: 'FAC-2023-009', vendor: 'Marc Konan', client: 'Service Pub', amount: 75000, netToPay: 75000, status: 'verifying', type: 'invoice', date: '2023-12-20' },
    { id: 104, number: 'FAC-2023-010', vendor: 'Boutique Koumassi', client: 'Jean Lux', amount: 35000, netToPay: 35000, status: 'fne_generated', type: 'invoice', date: '2023-12-21' },
];

const FneVerificationPage = () => {
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleOpenUpload = (invoice) => {
        setSelectedInvoice(invoice);
        setIsUploadModalOpen(true);
    };

    const handleValidate = async (id) => {
        const result = await showAlert.confirm(
            "Validation FNE",
            "Valider cette facture ? Elle sera générée officiellement et envoyée par mail au vendeur.",
            "Valider"
        );

        if (result.isConfirmed) {
            setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'fne_generated' } : r));
            showAlert.success("Validé", "Facture validée et envoyée par mail !");
        }
    };

    const handleReject = async (id) => {
        const result = await showAlert.prompt(
            "Motif du rejet",
            "Veuillez indiquer la raison du rejet de cette facture :",
            "Ex: Coordonnées bancaires incorrectes..."
        );

        if (result.isConfirmed && result.value) {
            setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
            showAlert.success("Rejeté", "Facture rejetée. Le vendeur a été notifié.");
        }
    };

    const filteredRequests = filterStatus === 'all'
        ? requests
        : requests.filter(req => req.status === filterStatus);

    const columns = [
        {
            key: 'number',
            label: 'Facture / Vendeur',
            sortable: true,
            render: (row) => (
                <div>
                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{row.number}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{row.vendor}</div>
                </div>
            )
        },
        {
            key: 'client',
            label: 'Client / Date',
            sortable: true,
            render: (row) => (
                <div>
                    <div style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{row.client}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.date}</div>
                </div>
            )
        },
        {
            key: 'amount',
            label: 'Montant',
            sortable: true,
            render: (row) => <div style={{ fontWeight: '600' }}>{formatCurrency(row.amount)}</div>
        },
        {
            key: 'status',
            label: 'Statut',
            sortable: true,
            render: (row) => <StatusBadge
                status={row.status}
                label={row.status === 'fne_generated' ? 'Facture FNE Envoyée' : undefined}
            />
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
        if (row.status === 'fne_generated') {
            return [
                {
                    icon: <Eye size={18} />,
                    label: 'Voir les détails',
                    onClick: (row) => navigate(`/admin/dashboard/invoices/${row.id}`)
                },
                {
                    icon: <Mail size={18} />,
                    label: 'Renvoyer par mail',
                    onClick: (row) => showAlert.success("Envoyé", "Email renvoyé au vendeur.")
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
                    onClick={() => setFilterStatus('verifying')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'verifying' ? 'var(--primary-lighter)' : 'white',
                        color: filterStatus === 'verifying' ? 'var(--primary)' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    Vérification
                </button>
                <button
                    onClick={() => setFilterStatus('fne_generated')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'fne_generated' ? 'var(--success-light)' : 'white',
                        color: filterStatus === 'fne_generated' ? 'var(--success)' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    FNE Transmise
                </button>
            </div>

            <Card style={{ padding: '0px', overflow: 'hidden' }}>
                <DataTable
                    columns={columns}
                    data={filteredRequests}
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
