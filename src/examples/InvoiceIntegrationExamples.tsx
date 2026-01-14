/**
 * Exemple d'intégration des formulaires de facturation
 * dans votre application React existante
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import des pages de formulaires
import CreateInvoice from './pages/invoices/CreateInvoice';
import CreateProforma from './pages/invoices/CreateProforma';
import CreateQuote from './pages/invoices/CreateQuote';

/**
 * Ajoutez ces routes à votre configuration de routing existante
 */
export const InvoiceRoutes = () => {
    return (
        <Routes>
            {/* Route pour créer une nouvelle facture */}
            <Route path="/factures/nouvelle" element={<CreateInvoice />} />

            {/* Route pour créer une nouvelle proforma */}
            <Route path="/proformas/nouvelle" element={<CreateProforma />} />

            {/* Route pour créer un nouveau devis */}
            <Route path="/devis/nouveau" element={<CreateQuote />} />

            {/* Ajoutez d'autres routes selon vos besoins :
      - Liste des factures
      - Édition d'une facture
      - Détails d'une facture
      - etc.
      */}
        </Routes>
    );
};

/**
 * Exemple d'utilisation directe du composant InvoiceForm
 * dans une page personnalisée
 */
import InvoiceForm from './components/forms/InvoiceForm/InvoiceForm';
import { DocumentType, BillingType, type InvoiceFormData } from './types/invoice.types';

export const CustomInvoicePage: React.FC = () => {
    const handleSubmit = async (data: InvoiceFormData) => {
        try {
            // Votre logique d'API
            const response = await fetch('/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Invoice created:', result);

            // Redirection ou notification
            // navigate('/factures');
            // toast.success('Facture créée avec succès!');

        } catch (error) {
            console.error('Error:', error);
            // toast.error('Erreur lors de la création de la facture');
        }
    };

    const handleCancel = () => {
        // Logique d'annulation
        // navigate(-1);
    };

    return (
        <InvoiceForm
            initialData={{
                documentType: DocumentType.INVOICE,
                billingType: BillingType.B2B,
                // Pré-remplir d'autres données si nécessaire
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={false}
            readonly={false}
        />
    );
};

/**
 * Exemple d'utilisation en mode lecture seule (affichage)
 */
export const ViewInvoicePage: React.FC<{ invoiceData: InvoiceFormData }> = ({ invoiceData }) => {
    return (
        <InvoiceForm
            initialData={invoiceData}
            onSubmit={async () => { }}
            readonly={true}
        />
    );
};

/**
 * Exemple d'édition d'une facture existante
 */
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const EditInvoicePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState<InvoiceFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Charger les données de la facture
        const fetchInvoice = async () => {
            try {
                const response = await fetch(`/api/invoices/${id}`);
                const data = await response.json();
                setInvoiceData(data);
            } catch (error) {
                console.error('Error fetching invoice:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInvoice();
    }, [id]);

    const handleSubmit = async (data: InvoiceFormData) => {
        try {
            const response = await fetch(`/api/invoices/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Update failed');

            navigate(`/factures/${id}`);
        } catch (error) {
            console.error('Error updating invoice:', error);
        }
    };

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!invoiceData) {
        return <div>Facture introuvable</div>;
    }

    return (
        <InvoiceForm
            initialData={invoiceData}
            onSubmit={handleSubmit}
            onCancel={() => navigate(-1)}
        />
    );
};

/**
 * Exemple avec gestion d'état global (Redux, Zustand, etc.)
 */
import { useAppDispatch } from './store/hooks';
import { createInvoice } from './store/slices/invoicesSlice';

export const InvoiceWithRedux: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleSubmit = async (data: InvoiceFormData) => {
        try {
            // Dispatch de l'action Redux
            await dispatch(createInvoice(data)).unwrap();
            // toast.success('Facture créée!');
        } catch (error) {
            // toast.error('Erreur!');
        }
    };

    return (
        <InvoiceForm
            onSubmit={handleSubmit}
        />
    );
};

export default InvoiceRoutes;
