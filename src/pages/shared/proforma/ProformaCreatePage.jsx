import React from 'react';
import DocumentForm from '../../../app/shared/features/documents/DocumentForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardPath } from '../../../hooks/useDashboardPath';

const ProformaCreatePage = () => {
    const { basePath } = useDashboardPath();
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link
                    to={`${basePath}/proformas`}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        marginBottom: '1rem'
                    }}
                    className="hover:text-primary transition-colors"
                >
                    <ArrowLeft size={16} /> Retour aux proformas
                </Link>
                <h1 style={{
                    fontSize: '1.875rem',
                    fontWeight: '800',
                    color: 'var(--primary)',
                    letterSpacing: '-0.025em'
                }}>
                    Nouvelle Proforma
                </h1>
            </div>

            <DocumentForm type="proforma" />
        </div>
    );
};

export default ProformaCreatePage;
