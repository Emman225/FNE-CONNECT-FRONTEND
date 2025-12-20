import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusBadge from '../../../components/documents/StatusBadge';
import DocumentTable from '../../../components/documents/DocumentTable';
import { Plus, Filter, Download, FileText } from 'lucide-react';
import { MOCK_PROFORMAS } from '../../../../data/mockData';
import { formatCurrency } from '../../../../core/utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ProformaListPage = () => {
    const [proformas] = useState(MOCK_PROFORMAS);

    const columns = [
        {
            key: 'id',
            label: 'Numéro',
            render: (proforma) => (
                <span style={{ fontWeight: '600', color: 'var(--primary)' }}>
                    {proforma.id}
                </span>
            )
        },
        {
            key: 'client',
            label: 'Client',
            render: (proforma) => (
                <div>
                    <div style={{ fontWeight: '500' }}>{proforma.client.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {proforma.client.phone}
                    </div>
                </div>
            )
        },
        {
            key: 'date',
            label: 'Date',
            render: (proforma) => format(new Date(proforma.createdAt), 'dd MMM yyyy', { locale: fr })
        },
        {
            key: 'validUntil',
            label: 'Valide jusqu\'au',
            render: (proforma) => format(new Date(proforma.validUntil), 'dd MMM yyyy', { locale: fr })
        },
        {
            key: 'amount',
            label: 'Montant TTC',
            render: (proforma) => (
                <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                    {formatCurrency(proforma.totalTTC)}
                </span>
            )
        },
        {
            key: 'status',
            label: 'Statut',
            render: (proforma) => <StatusBadge status={proforma.status} type="proforma" />
        }
    ];

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{
                        fontSize: '1.875rem',
                        fontWeight: '800',
                        color: 'var(--primary)',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.5rem'
                    }}>
                        Proformas
                    </h1>
                    <p className="text-muted">Gérez vos factures proforma.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}>
                        <Filter size={18} /> Filtrer
                    </button>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}>
                        <Download size={18} /> Exporter
                    </button>
                    <Link to="/dashboard/proformas/new">
                        <Button>
                            <Plus size={18} /> Nouvelle Proforma
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
            }}>
                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--primary-lighter)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <FileText size={24} color="var(--primary)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Total Proformas
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {proformas.length}
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--secondary-lighter)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <FileText size={24} color="var(--secondary)" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Montant Total
                            </p>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                {formatCurrency(proformas.reduce((sum, p) => sum + p.totalTTC, 0))}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Proforma Table */}
            <Card style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                    Liste des Proformas
                </h3>
                <DocumentTable
                    documents={proformas.map(p => ({
                        id: p.id,
                        number: p.id,
                        clientName: p.client.name,
                        clientPhone: p.client.phone,
                        date: format(new Date(p.createdAt), 'dd MMM yyyy', { locale: fr }),
                        amount: p.totalTTC,
                        status: p.status
                    }))}
                    type="proforma"
                />
            </Card>
        </div>
    );
};

export default ProformaListPage;
