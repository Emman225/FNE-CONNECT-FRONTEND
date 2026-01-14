import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from '../../components/forms/InvoiceForm/InvoiceForm';
import { DocumentType, type InvoiceFormData } from '../../types/invoice.types';
import showAlert from '../../utils/sweetAlert';

const CreateProforma: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: InvoiceFormData) => {
        try {
            console.log('Submitting proforma:', data);

            // TODO: Appel API pour créer la proforma
            // const response = await createProforma(data);

            // Simulation d'un délai
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Afficher un message de succès
            await showAlert.success('Proforma Créée', 'Proforma créée avec succès !');

            // Rediriger vers la liste des proformas
            navigate('/proformas');
        } catch (error) {
            console.error('Error creating proforma:', error);
            showAlert.error('Erreur', 'Erreur lors de la création de la proforma');
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
            navigate('/proformas');
        }
    };

    return (
        <InvoiceForm
            initialData={{
                documentType: DocumentType.PROFORMA
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
};

export default CreateProforma;
