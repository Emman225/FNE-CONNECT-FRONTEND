import React from 'react';
import InvoiceForm from '../../../components/forms/InvoiceForm/InvoiceForm';
import { DocumentType } from '../../../types/invoice.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import showAlert from '../../../utils/sweetAlert';

const QuoteCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const { basePath } = useDashboardPath();

    const handleSubmit = async (data) => {
        try {
            console.log('Submitting quote:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await showAlert.success(
                isEditMode ? 'Devis Modifié' : 'Devis Créé',
                isEditMode ? 'Le devis a été modifié avec succès.' : 'Le devis a été créé avec succès.'
            );
            navigate(`${basePath}/quotes`);
        } catch (error) {
            console.error('Error saving quote:', error);
            showAlert.error('Erreur', 'Erreur lors de l\'enregistrement du devis');
        }
    };

    const handleSaveDraft = async (data) => {
        try {
            console.log('Saving draft quote:', data);
            await new Promise(resolve => setTimeout(resolve, 500));
            showAlert.success('Brouillon', 'Brouillon sauvegardé avec succès !');
        } catch (error) {
            console.error('Error saving draft:', error);
            showAlert.error('Erreur', 'Erreur lors de la sauvegarde du brouillon');
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
            navigate(`${basePath}/quotes`);
        }
    };

    return (
        <InvoiceForm
            invoiceId={id}
            initialData={{
                documentType: DocumentType.QUOTE
            }}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            onCancel={handleCancel}
        />
    );
};

export default QuoteCreatePage;
