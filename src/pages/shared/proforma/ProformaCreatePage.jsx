import React from 'react';
import InvoiceForm from '../../../components/forms/InvoiceForm/InvoiceForm';
import { DocumentType } from '../../../types/invoice.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import showAlert from '../../../utils/sweetAlert';

const ProformaCreatePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const { basePath } = useDashboardPath();

    const handleSubmit = async (data) => {
        try {
            console.log('Submitting proforma:', data);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await showAlert.success(
                isEditMode ? 'Proforma Modifiée' : 'Proforma Créée',
                isEditMode ? 'La proforma a été modifiée avec succès.' : 'La proforma a été créée avec succès.'
            );
            navigate(`${basePath}/proformas`);
        } catch (error) {
            console.error('Error saving proforma:', error);
            showAlert.error('Erreur', 'Erreur lors de l\'enregistrement de la proforma');
        }
    };

    const handleSaveDraft = async (data) => {
        try {
            console.log('Saving draft proforma:', data);
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
            navigate(`${basePath}/proformas`);
        }
    };

    return (
        <InvoiceForm
            invoiceId={id}
            initialData={{
                documentType: DocumentType.PROFORMA
            }}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            onCancel={handleCancel}
        />
    );
};

export default ProformaCreatePage;
