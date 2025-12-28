import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import TransactionTable from '../../../app/shared/features/payments/TransactionTable';
import Button from '../../../components/ui/Button';
import { Download, Filter, Wallet } from 'lucide-react';

const MOCK_TRANSACTIONS = [
    { id: 1, type: 'in', reference: 'PAY-2023-8890', party: 'Entreprise ABC', description: 'Paiement Facture #FAC-002', period: 'Dec 2023', method: 'Mobile Money', provider: 'Orange Money', date: '18 Dec 2023, 14:30', amount: 2500000, status: 'completed' },
    { id: 2, type: 'in', reference: 'PAY-2023-8891', party: 'Jean Doe', description: 'Paiement Facture #FAC-001', period: 'Dec 2023', method: 'Mobile Money', provider: 'Wave', date: '18 Dec 2023, 10:15', amount: 150000, status: 'completed' },
    { id: 3, type: 'out', reference: 'VIR-2023-005', party: 'FNE Connect', description: 'Commission Service', period: 'Dec 2023', method: 'Bank Transfer', provider: 'Virement', date: '17 Dec 2023, 09:00', amount: 26500, status: 'completed' },
    { id: 4, type: 'in', reference: 'PAY-2023-8892', party: 'Marc Konan', description: 'Acompte Devis #DEV-005', period: 'Dec 2023', method: 'Mobile Money', provider: 'MTN MoMo', date: '16 Dec 2023, 16:45', amount: 50000, status: 'failed' },
];

const PaymentListPage = () => {
    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Paiements</h1>
                    <p className="text-muted">Historique de vos transactions et encaissements.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}> <Filter size={18} /> Filtrer</button>
                    <button className="btn btn-light" style={{ border: '1px solid var(--border-color)' }}> <Download size={18} /> Exporter</button>
                </div>
            </div>

            {/* Balance Summary Card */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <Card style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '1.5rem', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
                    <div className="flex-between" style={{ alignItems: 'start', marginBottom: '1.5rem' }}>
                        <div>
                            <p style={{ opacity: 0.8, fontSize: '0.875rem', marginBottom: '0.25rem' }}>Solde Disponible</p>
                            <h2 style={{ fontSize: '2.25rem', fontWeight: '700', letterSpacing: '-0.02em' }}>1,250,000 FCFA</h2>
                        </div>
                        <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '12px' }}>
                            <Wallet size={24} color="white" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn" style={{ backgroundColor: 'white', color: 'var(--secondary)', border: 'none', fontWeight: '600', padding: '0.5rem 1rem' }}>Retirer des fonds</button>
                    </div>
                </Card>

                <Card style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Volume mensuel</h3>
                    <div className="flex-between" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Entrées</span>
                        <span style={{ color: 'var(--success)', fontWeight: '700', fontSize: '1.125rem' }}>+2,850,000 FCFA</span>
                    </div>
                    <div className="flex-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Commissions FNE</span>
                        <span style={{ color: 'var(--danger)', fontWeight: '700', fontSize: '1.125rem' }}>-85,500 FCFA</span>
                    </div>
                </Card>
            </div>

            <Card style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Transactions Récentes</h3>
                <TransactionTable transactions={MOCK_TRANSACTIONS} />
            </Card>
        </div>
    );
};

export default PaymentListPage;
