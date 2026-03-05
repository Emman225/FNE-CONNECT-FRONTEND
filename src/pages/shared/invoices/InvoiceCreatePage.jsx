import React from 'react';
import InvoiceForm from '../../../components/forms/InvoiceForm/InvoiceForm';
import { DocumentType } from '../../../types/invoice.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import showAlert from '../../../utils/sweetAlert';

import { invoiceService } from '../../../services/invoiceService';
import { useNotifications } from '../../../context/NotificationContext';

const InvoiceCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { showError } = useNotifications();
    const isEditMode = !!id;
    const { basePath } = useDashboardPath();
    const [loading, setLoading] = React.useState(false);
    const [initialInvoiceData, setInitialInvoiceData] = React.useState(null);

    React.useEffect(() => {
        if (id) {
            const fetchInvoice = async () => {
                setLoading(true);
                try {
                    const response = await invoiceService.getById(id);
                    setInitialInvoiceData(response);
                } catch (error) {
                    console.error("Failed to fetch invoice", error);
                    showError("Erreur lors du chargement de la facture");
                } finally {
                    setLoading(false);
                }
            };
            fetchInvoice();
        }
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            setLoading(true);
            if (isEditMode) {
                await invoiceService.update(id, data);
                await showAlert.success('Facture Modifiée', 'La facture a été modifiée avec succès.');
            } else {
                await invoiceService.create(data);
                await showAlert.success('Facture Créée', 'La facture a été créée avec succès.');
            }
            navigate(`${basePath}/invoices`);
        } catch (error) {
            console.error('Error saving invoice:', error);
            showError(error.response?.data?.message || "Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = async (data) => {
        try {
            setLoading(true);
            await invoiceService.create({ ...data, status: 'draft' });
            showAlert.success('Brouillon', 'Brouillon sauvegardé avec succès !');
            navigate(`${basePath}/invoices`);
        } catch (error) {
            console.error('Error saving draft:', error);
            showError("Erreur lors de la sauvegarde du brouillon");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        const result = await showAlert.confirm(
            'Annuler',
            'Voulez-vous vraiment annuler ? Toutes les modifications seront perdues.',
            'Oui, quitter',
            'Continuer'
        );

        if (result.isConfirmed) {
            navigate(`${basePath}/invoices`);
        }
    };

    return (
        <InvoiceForm
            invoiceId={id}
            initialData={initialInvoiceData || {
                documentType: DocumentType.INVOICE
            }}
            isLoading={loading}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            onCancel={handleCancel}
        />
    );
};

export default InvoiceCreatePage;
