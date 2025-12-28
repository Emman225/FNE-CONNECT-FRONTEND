import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../app/shared/features/documents/StatusBadge';
import { Eye, CheckCircle, XCircle, Search, Mail } from 'lucide-react';
import { formatCurrency } from '../../../utils/financialUtils';

const MOCK_REQUESTS = [
    { id: 1, number: 'FAC-2023-005', vendor: 'Boutique Koumassi', client: 'Alice Yao', amount: 45000, date: '2023-12-22', status: 'verifying', type: 'invoice' },
    { id: 2, number: 'FAC-2023-008', vendor: 'Ets Konan', client: 'Global Tech', amount: 1250000, date: '2023-12-23', status: 'verifying', type: 'invoice' },
    { id: 3, number: 'FAC-2023-009', vendor: 'Marc Konan', client: 'Service Pub', amount: 75000, date: '2023-12-20', status: 'verifying', type: 'invoice' },
    { id: 4, number: 'FAC-2023-010', vendor: 'Boutique Koumassi', client: 'Jean Lux', amount: 35000, date: '2023-12-21', status: 'fne_generated', type: 'invoice' },
];

const FneVerificationPage = () => {
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [filter, setFilter] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const handleValidate = (id) => {
        if (window.confirm("Valider cette facture ? Elle sera générée officiellement et envoyée par mail au vendeur.")) {
            setRequests(requests.map(r => r.id === id ? { ...r, status: 'fne_generated' } : r));
            alert("Facture validée et envoyée par mail !");
        }
    };

    const handleReject = (id) => {
        const reason = window.prompt("Motif du rejet :");
        if (reason) {
            setRequests(requests.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
            alert("Facture rejetée. Le vendeur a été notifié.");
        }
    };

    const filteredRequests = requests.filter(r => {
        const matchesSearch = r.number.toLowerCase().includes(filter.toLowerCase()) ||
            r.vendor.toLowerCase().includes(filter.toLowerCase());
        const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
                    Vérification FNE
                </h1>
                <p className="text-muted">Vérifiez les informations des factures payées avant la génération FNE officielle.</p>
            </div>

            <Card style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher une facture ou un vendeur..."
                            className="input-field"
                            style={{ paddingLeft: '40px' }}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-light'}`}
                            style={{ borderRadius: '2rem', padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
                        >
                            Toutes
                        </button>
                        <button
                            onClick={() => setFilterStatus('verifying')}
                            className={`btn`}
                            style={{
                                borderRadius: '2rem', padding: '0.5rem 1.25rem', fontSize: '0.875rem',
                                backgroundColor: filterStatus === 'verifying' ? 'var(--primary-lighter)' : 'white',
                                color: filterStatus === 'verifying' ? 'var(--primary)' : 'var(--text-muted)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            Vérification
                        </button>
                        <button
                            onClick={() => setFilterStatus('fne_generated')}
                            className={`btn`}
                            style={{
                                borderRadius: '2rem', padding: '0.5rem 1.25rem', fontSize: '0.875rem',
                                backgroundColor: filterStatus === 'fne_generated' ? 'var(--success-light)' : 'white',
                                color: filterStatus === 'fne_generated' ? 'var(--success)' : 'var(--text-muted)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            FNE Envoyées
                        </button>
                    </div>
                </div>
            </Card>

            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Facture / Vendeur</th>
                        <th style={{ textAlign: 'left', padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Client / Date</th>
                        <th style={{ textAlign: 'left', padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Montant</th>
                        <th style={{ textAlign: 'left', padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Statut</th>
                        <th style={{ textAlign: 'right', padding: '0 1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequests.map(req => (
                        <tr key={req.id} style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                            <td style={{ padding: '1.25rem 1rem', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                                <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{req.number}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.vendor}</div>
                            </td>
                            <td style={{ padding: '1.25rem 1rem' }}>
                                <div style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{req.client}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.date}</div>
                            </td>
                            <td style={{ padding: '1.25rem 1rem' }}>
                                <div style={{ fontWeight: '600' }}>{formatCurrency(req.amount)}</div>
                            </td>
                            <td style={{ padding: '1.25rem 1rem' }}>
                                <StatusBadge status={req.status} />
                            </td>
                            <td style={{ padding: '1.25rem 1rem', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <button className="btn-icon" title="Voir les détails" style={{ color: 'var(--info)' }}><Eye size={18} /></button>
                                    {req.status === 'verifying' && (
                                        <>
                                            <button
                                                className="btn-icon"
                                                title="Valider et envoyer par mail"
                                                style={{ color: 'var(--success)' }}
                                                onClick={() => handleValidate(req.id)}
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                            <button
                                                className="btn-icon"
                                                title="Rejeter"
                                                style={{ color: 'var(--danger)' }}
                                                onClick={() => handleReject(req.id)}
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </>
                                    )}
                                    {req.status === 'fne_generated' && (
                                        <button className="btn-icon" title="Renvoyer par mail" style={{ color: 'var(--text-secondary)' }}><Mail size={18} /></button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FneVerificationPage;
