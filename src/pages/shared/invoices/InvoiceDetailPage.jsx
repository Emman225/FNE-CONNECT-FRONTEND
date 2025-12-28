import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import DocumentHistoryTimeline from '../../../app/shared/features/documents/DocumentHistoryTimeline';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

const InvoiceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock invoice data
    const invoice = {
        id: 1,
        number: 'FAC-2023-001',
        type: 'invoice',
        clientName: 'Jean Doe',
        client: { name: 'Jean Doe' },
        clientPhone: '0708091011',
        date: '2023-12-01',
        createdAt: '2023-12-01T10:00:00Z',
        sentAt: '2023-12-01T10:05:00Z',
        paidAt: '2023-12-02T14:30:00Z',
        amount: 150000,
        status: 'paid',
        paymentStatus: 'paid',
        items: [
            { description: 'Prestation de service', quantity: 1, unitPrice: 150000 }
        ]
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/dashboard/invoices')}
                        style={{
                            padding: '0.5rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            background: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{
                            fontSize: '1.875rem',
                            fontWeight: '800',
                            color: 'var(--primary)',
                            letterSpacing: '-0.025em',
                            marginBottom: '0.5rem'
                        }}>
                            Facture {invoice.number}
                        </h1>
                        <p className="text-muted">Détails et historique de la facture</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-light" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} /> Télécharger
                    </button>
                    <button className="btn btn-light" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Share2 size={18} /> Partager
                    </button>
                </div>
            </div>

            {/* Invoice Details */}
            <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                    Détails de la Facture
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Client
                        </p>
                        <p style={{ fontWeight: '600' }}>{invoice.clientName}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Date
                        </p>
                        <p style={{ fontWeight: '600' }}>{invoice.date}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Montant TTC
                        </p>
                        <p style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)' }}>
                            {invoice.amount.toLocaleString('fr-FR')} FCFA
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Statut
                        </p>
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            backgroundColor: 'var(--success-light)',
                            color: 'var(--success)',
                            fontSize: '0.875rem',
                            fontWeight: '600'
                        }}>
                            Payée
                        </span>
                    </div>
                </div>
            </Card>

            {/* Document History Timeline */}
            <Card style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                    Historique du Document
                </h3>
                <DocumentHistoryTimeline document={invoice} />
            </Card>
        </div>
    );
};

export default InvoiceDetailPage;
