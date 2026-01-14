import React from 'react';
import InvoiceForm from '../../../components/forms/InvoiceForm/InvoiceForm';
import { DocumentType } from '../../../types/invoice.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import showAlert from '../../../utils/sweetAlert';

const InvoiceCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const { basePath } = useDashboardPath();

    const handleSubmit = async (data) => {
        try {
            console.log('Submitting invoice:', data);

            // Simulation d'un délai
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Afficher un message de succès
            await showAlert.success(
                isEditMode ? 'Facture Modifiée' : 'Facture Créée',
                isEditMode ? 'La facture a été modifiée avec succès.' : 'La facture a été créée avec succès.'
            );

            // Rediriger vers la liste des factures
            navigate(`${basePath}/invoices`);
        } catch (error) {
            console.error('Error saving invoice:', error);
            showAlert.error('Erreur', 'Erreur lors de l\'enregistrement de la facture');
        }
    };

    const handleSaveDraft = async (data) => {
        try {
            console.log('Saving draft invoice:', data);
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
            navigate(`${basePath}/invoices`);
        }
    };

    return (
        <InvoiceForm
            invoiceId={id}
            initialData={{
                documentType: DocumentType.INVOICE
            }}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            onCancel={handleCancel}
        />
    );
};

export default InvoiceCreatePage;
