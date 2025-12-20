import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DocumentTable from '../../../components/documents/DocumentTable';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_QUOTES = [
    { id: 1, number: 'DEV-2023-001', clientName: 'Jean Doe', clientPhone: '0708091011', date: '2023-12-15', amount: 150000, status: 'draft' },
    { id: 2, number: 'DEV-2023-002', clientName: 'Entreprise ABC', clientPhone: '0102030405', date: '2023-12-16', amount: 2500000, status: 'pending' },
];

const QuoteListPage = () => {
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredQuotes = filterStatus === 'all'
        ? MOCK_QUOTES
        : MOCK_QUOTES.filter(q => q.status === filterStatus);

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Devis</h1>
                    <p className="text-muted">Gérez vos propositions commerciales.</p>
                </div>
                <Link to="/dashboard/quotes/new">
                    <button className="btn btn-primary">
                        <Plus size={20} /> Nouveau Devis
                    </button>
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setFilterStatus('all')}
                    className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-light'}`}
                    style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem' }}
                >
                    Tous
                </button>
                <button
                    onClick={() => setFilterStatus('draft')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'draft' ? 'var(--bg-main)' : 'transparent',
                        color: filterStatus === 'draft' ? 'var(--text-main)' : 'var(--text-muted)',
                        border: '1px solid transparent'
                    }}
                >
                    Brouillons
                </button>
                <button
                    onClick={() => setFilterStatus('pending')}
                    className={`btn`}
                    style={{
                        borderRadius: '2rem',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: filterStatus === 'pending' ? 'var(--warning-light)' : 'transparent',
                        color: filterStatus === 'pending' ? 'var(--warning)' : 'var(--text-muted)',
                        border: '1px solid transparent'
                    }}
                >
                    En attente
                </button>
            </div>

            <DocumentTable documents={filteredQuotes} type="quote" />
        </div>
    );
};

export default QuoteListPage;
