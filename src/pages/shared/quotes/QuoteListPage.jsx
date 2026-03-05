import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DocumentTable from '../../../app/shared/features/documents/DocumentTable';
import PaymentModal from '../../../app/shared/features/payments/PaymentModal';
import { invoiceService } from '../../../services/invoiceService';
import toast from 'react-hot-toast';
import { Plus, Loader2 } from 'lucide-react';
import { useNotifications } from '../../../context/NotificationContext';
import showAlert from '../../../utils/sweetAlert';

const QuoteListPage = () => {
    const { basePath } = useDashboardPath();
    const { showSuccess, showError } = useNotifications();
    const [quotes, setQuotes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const navigate = useNavigate();

    const fetchQuotes = React.useCallback(async () => {
        setLoading(true);
        try {
            const params = { type: 'QUOTE' };
            if (filterStatus !== 'all') {
                params.status = filterStatus;
            }
            const response = await invoiceService.getAll(params);
            setQuotes(response.data || []);
        } catch (error) {
            console.error("Failed to fetch quotes", error);
            showError("Erreur lors du chargement des devis");
        } finally {
            setLoading(false);
        }
    }, [filterStatus]);

    React.useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    const filteredQuotes = quotes;

    const handlePay = (quote) => {
        setSelectedQuote(quote);
        setIsPaymentOpen(true);
    };

    const handleConvert = async (quote, toType) => {
        if (toType === 'proforma') {
            const result = await showAlert.confirm(
                'Conversion en Proforma',
                `Voulez-vous convertir le devis ${quote.invoiceNumber || quote.id} en Proforma ?`,
                'Convertir'
            );

            if (result.isConfirmed) {
                try {
                    await invoiceService.convertToInvoice(quote.id, 'PROFORMA');
                    showSuccess(`Devis converti en Proforma avec succès !`);
                    navigate(`${basePath}/proformas`);
                } catch (error) {
                    toast.error("Erreur lors de la conversion");
                }
            }
        } else if (toType === 'invoice') {
            const result = await showAlert.confirm(
                'Conversion en Facture',
                `Voulez-vous convertir le devis ${quote.invoiceNumber || quote.id} en Facture ?`,
                'Convertir'
            );

            if (result.isConfirmed) {
                try {
                    await invoiceService.convertToInvoice(quote.id);
                    showSuccess(`Devis converti en Facture avec succès !`);
                    navigate(`${basePath}/invoices`);
                } catch (error) {
                    toast.error("Erreur lors de la conversion");
                }
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
            try {
                await invoiceService.delete(quote.id);
                setQuotes(quotes.filter(q => q.id !== quote.id));
                showSuccess('Devis supprimé avec succès');
            } catch (error) {
                toast.error("Erreur lors de la suppression");
            }
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
