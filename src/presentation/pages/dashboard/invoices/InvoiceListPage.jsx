import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DocumentTable from '../../../components/documents/DocumentTable';
import PaymentModal from '../../../components/payments/PaymentModal';
import FneInvoiceModal from '../../../components/invoices/FneInvoiceModal';
import { Plus, Filter, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_INVOICES = [
    { id: 1, number: 'FAC-2023-001', clientName: 'Jean Doe', clientPhone: '0708091011', date: '2023-12-01', amount: 150000, status: 'paid' },
    { id: 2, number: 'FAC-2023-002', clientName: 'Entreprise ABC', clientPhone: '0102030405', date: '2023-12-05', amount: 2500000, status: 'pending' },
    { id: 3, number: 'FAC-2023-003', clientName: 'Marc Konan', clientPhone: '0505050505', date: '2023-12-10', amount: 75000, status: 'draft' },
    { id: 4, number: 'FAC-2023-004', clientName: 'Sarl Ivoire', clientPhone: '0707070707', date: '2023-12-12', amount: 450000, status: 'late' },
];

const InvoiceListPage = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isFneModalOpen, setIsFneModalOpen] = useState(false);

    const filteredInvoices = filterStatus === 'all'
        ? MOCK_INVOICES
        : MOCK_INVOICES.filter(inv => inv.status === filterStatus);

    const handlePay = (invoice) => {
        setSelectedInvoice(invoice);
        setIsPaymentOpen(true);
    };

    const handleGenerateFne = (invoice) => {
        setSelectedInvoice(invoice);
        setIsFneModalOpen(true);
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Factures</h1>
                    <p className="text-muted">Gérez vos factures et suivis de paiements.</p>
                </div>
                <Link to="/dashboard/invoices/new">
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
                    style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem' }}
                >
                    Toutes
                </button>
                <button
                    onClick={() => setFilterStatus('pending')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'pending' ? 'var(--warning-light)' : 'transparent',
                        color: filterStatus === 'pending' ? 'var(--warning)' : 'var(--text-muted)',
                        border: '1px solid transparent'
                    }}
                >
                    En attente
                </button>
                <button
                    onClick={() => setFilterStatus('paid')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'paid' ? 'var(--success-light)' : 'transparent',
                        color: filterStatus === 'paid' ? 'var(--success)' : 'var(--text-muted)',
                        border: '1px solid transparent'
                    }}
                >
                    Payées
                </button>
            </div>

            <DocumentTable
                documents={filteredInvoices}
                type="invoice"
                onPay={handlePay}
                onGenerateFne={handleGenerateFne}
            />

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                invoice={selectedInvoice}
            />

            <FneInvoiceModal
                isOpen={isFneModalOpen}
                onClose={() => setIsFneModalOpen(false)}
                invoice={selectedInvoice}
            />
        </div>
    );
};

export default InvoiceListPage;
