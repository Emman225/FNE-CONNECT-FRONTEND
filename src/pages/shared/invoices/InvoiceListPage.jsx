import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DocumentTable from '../../../app/shared/features/documents/DocumentTable';
import PaymentModal from '../../../app/shared/features/payments/PaymentModal';
import FneInvoiceModal from '../../../app/shared/features/invoices/FneInvoiceModal';
import FneUploadModal from '../../../app/shared/features/invoices/FneUploadModal';
import { Plus, Filter, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import { useNotifications } from '../../../context/NotificationContext';

import showAlert from '../../../utils/sweetAlert';

const INITIAL_MOCK_INVOICES = [
    { id: 1, accountNumber: 'FNE-25897001', number: 'FAC-2023-001', clientName: 'Jean Doe', clientPhone: '0708091011', date: '2023-12-01', amount: 150000, status: 'fne_generated', isComplete: true },
    { id: 2, accountNumber: 'FNE-25897002', number: 'FAC-2023-002', clientName: 'Entreprise ABC', clientPhone: '0102030405', date: '2023-12-05', amount: 2500000, status: 'pending', isComplete: true },
    { id: 3, accountNumber: 'FNE-25897003', number: 'FAC-2023-003', clientName: 'Marc Konan', clientPhone: '0505050505', date: '2023-12-10', amount: 75000, status: 'draft', isComplete: true },
    { id: 4, accountNumber: 'FNE-25897004', number: 'FAC-2023-004', clientName: 'Sarl Ivoire', clientPhone: '0707070707', date: '2023-12-12', amount: 450000, status: 'verifying', isComplete: true },
    { id: 5, accountNumber: 'FNE-25897005', number: 'FAC-2023-005', clientName: 'Boutique Luxe', clientPhone: '0102030405', date: '2023-12-15', amount: 125000, status: 'verifying', isComplete: true },
];

const InvoiceListPage = () => {
    const { basePath, isAdminArea } = useDashboardPath();
    const navigate = useNavigate();
    const { showSuccess } = useNotifications();
    const [invoices, setInvoices] = useState(INITIAL_MOCK_INVOICES);
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isFneModalOpen, setIsFneModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const filteredInvoices = filterStatus === 'all'
        ? invoices
        : invoices.filter(inv => inv.status === filterStatus);

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
            setInvoices(invoices.filter(inv => inv.id !== invoice.id));
            showSuccess('Facture supprimée avec succès');
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
                    onClick={() => setFilterStatus('pending')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'pending' ? 'var(--warning-light)' : 'white',
                        color: filterStatus === 'pending' ? 'var(--warning)' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    En attente
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
                    FNE Envoyées
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
                    {isAdminArea ? 'FNE Transmise' : 'FNE Reçu'}
                </button>
            </div>


            <DocumentTable
                documents={filteredInvoices}
                type="invoice"
                onPay={handlePay}
                onGenerateFne={handleGenerateFne}
                onUploadFne={handleUploadFne}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

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
