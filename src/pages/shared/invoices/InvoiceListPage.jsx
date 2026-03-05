import React, { useState, useEffect, useCallback } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DocumentTable from '../../../app/shared/features/documents/DocumentTable';
import PaymentModal from '../../../app/shared/features/payments/PaymentModal';
import FneInvoiceModal from '../../../app/shared/features/invoices/FneInvoiceModal';
import FneUploadModal from '../../../app/shared/features/invoices/FneUploadModal';
import { Plus, Filter, Download, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import { useNotifications } from '../../../context/NotificationContext';
import { invoiceService } from '../../../services/invoiceService';
import toast from 'react-hot-toast';
import showAlert from '../../../utils/sweetAlert';

const InvoiceListPage = () => {
    const { basePath, isAdminArea } = useDashboardPath();
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotifications();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isFneModalOpen, setIsFneModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const fetchInvoices = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                type: 'INVOICE'
            };
            // Mapper les statuts du frontend vers ceux du backend si nécessaire
            // Dans notre backend : draft, sent, paid, cancelled
            if (filterStatus !== 'all') {
                params.status = filterStatus;
            }

            const data = await invoiceService.getAll(params);
            setInvoices(data.data || []); // Laravel paginator returns data in 'data' field
        } catch (error) {
            console.error("Failed to fetch invoices", error);
            showError("Erreur lors du chargement des factures");
        } finally {
            setLoading(false);
        }
    }, [filterStatus]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    const handlePay = (invoice) => {
        setSelectedInvoice(invoice);
        setIsPaymentOpen(true);
    };

    const handleGenerateFne = (invoice) => {
        setSelectedInvoice(invoice);
        setIsFneModalOpen(true);
    };

    const handleUploadFne = (invoice) => {
        setSelectedInvoice(invoice);
        setIsUploadModalOpen(true);
    };

    const handleEdit = (invoice) => {
        navigate(`${basePath}/invoices/edit/${invoice.id}`);
    };

    const handleDelete = async (invoice) => {
        const result = await showAlert.confirm(
            'Suppression',
            'Êtes-vous sûr de vouloir supprimer cette facture ?',
            'Supprimer'
        );

        if (result.isConfirmed) {
            try {
                await invoiceService.delete(invoice.id);
                setInvoices(invoices.filter(inv => inv.id !== invoice.id));
                showSuccess('Facture supprimée avec succès');
            } catch (error) {
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Factures</h1>
                    <p className="text-muted">Gérez vos factures et suivis de paiements.</p>
                </div>
                <Link to={`${basePath}/invoices/new`}>
                    <button className="btn btn-primary">
                        <Plus size={20} /> Nouvelle Facture
                    </button>
                </Link>
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
                    onClick={() => setFilterStatus('draft')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'draft' ? 'var(--secondary-lighter)' : 'white',
                        color: filterStatus === 'draft' ? 'var(--secondary)' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    Brouillon
                </button>
                <button
                    onClick={() => setFilterStatus('sent')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'sent' ? 'var(--warning-light)' : 'white',
                        color: filterStatus === 'sent' ? 'var(--warning)' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    En attente de paiement
                </button>
                <button
                    onClick={() => setFilterStatus('paid')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'paid' ? 'var(--success-light)' : 'white',
                        color: filterStatus === 'paid' ? 'var(--success)' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    Payées
                </button>
                <button
                    onClick={() => setFilterStatus('cancelled')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'cancelled' ? '#FEE2E2' : 'white',
                        color: filterStatus === 'cancelled' ? '#DC2626' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    Annulées
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                    <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                </div>
            ) : (
                <DocumentTable
                    documents={invoices}
                    type="invoice"
                    onPay={handlePay}
                    onGenerateFne={handleGenerateFne}
                    onUploadFne={handleUploadFne}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                invoice={selectedInvoice}
                type="invoice"
            />

            <FneInvoiceModal
                isOpen={isFneModalOpen}
                onClose={() => setIsFneModalOpen(false)}
                invoice={selectedInvoice}
            />

            <FneUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                invoice={selectedInvoice}
            />
        </div>
    );
};

export default InvoiceListPage;
