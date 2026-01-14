import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from '../../components/forms/InvoiceForm/InvoiceForm';
import { DocumentType, type InvoiceFormData } from '../../types/invoice.types';
import showAlert from '../../utils/sweetAlert';

const CreateQuote: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: InvoiceFormData) => {
        try {
            console.log('Submitting quote:', data);

            // TODO: Appel API pour créer le devis
            // const response = await createQuote(data);

            // Simulation d'un délai
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Afficher un message de succès
            await showAlert.success('Devis Créé', 'Devis créé avec succès !');

            // Rediriger vers la liste des devis
            navigate('/devis');
        } catch (error) {
            console.error('Error creating quote:', error);
            showAlert.error('Erreur', 'Erreur lors de la création du devis');
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
            navigate('/devis');
        }
    };

    return (
        <InvoiceForm
            initialData={{
                documentType: DocumentType.QUOTE
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
};

export default CreateQuote;
