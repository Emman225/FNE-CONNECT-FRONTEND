import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DocumentForm from '../../../app/shared/features/documents/DocumentForm';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';

const PublicToolPage = () => {
    const { type } = useParams();
    const isProforma = type === 'proforma';
    const title = isProforma ? 'Créer une Proforma' : 'Créer une Facture';

    return (
        <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '4rem 1rem' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{ marginBottom: '3rem' }}>
                        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }} className="hover-lift">
                            <ArrowLeft size={16} /> Retour à l'accueil
                        </Link>
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: '900',
                            color: 'var(--primary)',
                            letterSpacing: '-0.03em',
                            marginBottom: '0.5rem'
                        }}>
                            {title}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Testez notre outil de génération. L'export officiel nécessite un abonnement.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-2xl)',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-xl)',
                        border: '1px solid var(--border-color)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <DocumentForm type={isProforma ? 'proforma' : 'invoice'} isPublic={true} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PublicToolPage;
