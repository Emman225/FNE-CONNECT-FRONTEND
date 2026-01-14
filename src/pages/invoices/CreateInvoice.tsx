import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from '../../components/forms/InvoiceForm/InvoiceForm';
import { DocumentType, type InvoiceFormData } from '../../types/invoice.types';
import showAlert from '../../utils/sweetAlert';

const CreateInvoice: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: InvoiceFormData) => {
        try {
            console.log('Submitting invoice:', data);

            // TODO: Appel API pour créer la facture
            // const response = await createInvoice(data);

            // Simulation d'un délai
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Afficher un message de succès
            await showAlert.success('Facture Créée', 'Facture créée avec succès !');

            // Rediriger vers la liste des factures
            navigate('/factures');
        } catch (error) {
            console.error('Error creating invoice:', error);
            showAlert.error('Erreur', 'Erreur lors de la création de la facture');
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
            navigate('/factures');
        }
    };

    return (
        <InvoiceForm
            initialData={{
                documentType: DocumentType.INVOICE
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
};

export default CreateInvoice;
