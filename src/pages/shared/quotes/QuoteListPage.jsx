import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DocumentTable from '../../../app/shared/features/documents/DocumentTable';
import PaymentModal from '../../../app/shared/features/payments/PaymentModal';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import { useNotifications } from '../../../context/NotificationContext';

import showAlert from '../../../utils/sweetAlert';

const MOCK_QUOTES = [
    { id: 1, accountNumber: 'FNE-25897221', number: 'DEV-2023-001', clientName: 'Jean Doe', clientPhone: '0708091011', date: '2023-12-15', amount: 150000, status: 'draft', isComplete: true },
    { id: 2, accountNumber: 'FNE-25897222', number: 'DEV-2023-002', clientName: 'Entreprise ABC', clientPhone: '0102030405', date: '2023-12-16', amount: 2500000, status: 'pending', isComplete: true },
    { id: 3, accountNumber: 'FNE-25897223', number: 'DEV-2023-003', clientName: 'Lamine Touré', clientPhone: '0505443322', date: '2023-12-18', amount: 85000, status: 'draft', isComplete: false },
];

const QuoteListPage = () => {
    const { basePath } = useDashboardPath();
    const { showSuccess } = useNotifications();
    const [quotes, setQuotes] = useState(MOCK_QUOTES);
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const navigate = useNavigate();

    const filteredQuotes = filterStatus === 'all'
        ? quotes
        : quotes.filter(q => q.status === filterStatus);

    const handlePay = (quote) => {
        setSelectedQuote(quote);
        setIsPaymentOpen(true);
    };

    const handleConvert = async (quote, toType) => {
        if (toType === 'proforma') {
            const result = await showAlert.confirm(
                'Conversion en Proforma',
                `Voulez-vous convertir le devis ${quote.number} en Proforma ?`,
                'Convertir'
            );

            if (result.isConfirmed) {
                showSuccess(`Devis ${quote.number} converti en Proforma avec succès !`);
                navigate(`${basePath}/proformas`);
            }
        } else if (toType === 'invoice') {
            const result = await showAlert.confirm(
                'Conversion en Facture',
                `Voulez-vous convertir le devis ${quote.number} en Facture ?`,
                'Convertir'
            );

            if (result.isConfirmed) {
                showSuccess(`Devis ${quote.number} converti en Facture avec succès !`);
                navigate(`${basePath}/invoices`);
            }
        }
    };

    const handleEdit = (quote) => {
        navigate(`${basePath}/quotes/edit/${quote.id}`);
    };

    const handleDelete = async (quote) => {
        const result = await showAlert.confirm(
            'Suppression',
            'Êtes-vous sûr de vouloir supprimer ce devis ?',
            'Supprimer'
        );

        if (result.isConfirmed) {
            setQuotes(quotes.filter(q => q.id !== quote.id));
            showSuccess('Devis supprimé avec succès');
        }
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Devis</h1>
                    <p className="text-muted">Gérez vos propositions commerciales.</p>
                </div>
                <Link to={`${basePath}/quotes/new`}>
                    <button className="btn btn-primary">
                        <Plus size={20} /> Nouveau Devis
                    </button>
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setFilterStatus('all')}
                    className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem', backgroundColor: filterStatus === 'all' ? 'var(--primary)' : 'white' }}
                >
                    Tous
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
                    Brouillons
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
            </div>

            <DocumentTable
                documents={filteredQuotes}
                type="quote"
                onPay={handlePay}
                onConvert={handleConvert}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                invoice={selectedQuote}
                type="quote"
            />
        </div>
    );
};

export default QuoteListPage;
