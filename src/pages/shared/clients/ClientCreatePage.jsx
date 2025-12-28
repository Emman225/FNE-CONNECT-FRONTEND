import React from 'react';
import ClientForm from '../../../app/shared/features/clients/ClientForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';

const ClientCreatePage = () => {
    const { basePath } = useDashboardPath();
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link to={`${basePath}/clients`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1rem' }} className="hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Retour aux clients
                </Link>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em' }}>Ajouter un Client</h1>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <ClientForm />
            </div>
        </div>
    );
};

export default ClientCreatePage;
