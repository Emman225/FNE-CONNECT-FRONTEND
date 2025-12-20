import React from 'react';
import DocumentForm from '../../../components/documents/DocumentForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvoiceCreatePage = () => {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <Link to="/dashboard/invoices" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1rem' }} className="hover:text-primary transition-colors">
                    <ArrowLeft size={16} /> Retour aux factures
                </Link>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em' }}>Nouvelle Facture</h1>
            </div>

            <DocumentForm type="invoice" />
        </div>
    );
};

export default InvoiceCreatePage;
