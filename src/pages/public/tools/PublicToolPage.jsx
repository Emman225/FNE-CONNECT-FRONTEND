import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import InvoiceForm from '../../../components/forms/InvoiceForm/InvoiceForm';
import { DocumentType } from '../../../types/invoice.types';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';

const PublicToolPage = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const isProforma = type === 'proforma';


    return (
        <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '4rem 1rem' }}>
                <div className="container" style={{ maxWidth: '1600px' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover-lift">
                            <ArrowLeft size={16} /> Retour à l'accueil
                        </Link>
                    </div>

                    <InvoiceForm
                        initialData={{
                            documentType: isProforma ? DocumentType.PROFORMA : DocumentType.INVOICE
                        }}
                        watermarkText="BROUILLON"
                        submitLabel="Générer (Abonnement requis)"
                        headerTitle={isProforma ? 'Proforma' : 'Facture'}
                        key={type}
                        onSubmit={async (data) => {
                            // Simulation d'un petit délai pour l'effet UX
                            await new Promise(resolve => setTimeout(resolve, 800));
                            // Redirection vers l'inscription car abonnement requis
                            navigate('/auth/register');
                        }}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PublicToolPage;
