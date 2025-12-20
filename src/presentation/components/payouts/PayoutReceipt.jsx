import React from 'react';
import { Download, Printer } from 'lucide-react';
import { formatCurrency } from '../../../core/utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Button from '../ui/Button';

const PayoutReceipt = ({ payout }) => {
    if (!payout) return null;

    const handleDownload = () => {
        console.log('Downloading receipt for:', payout.reference);
        // Simulate PDF download
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                background: 'var(--gradient-brand)',
                color: 'white',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Reçu de Reversement
                </h1>
                <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>
                    FNE CONNECT - Portage Fiscal
                </p>
            </div>

            {/* Content */}
            <div style={{ padding: '2rem' }}>
                {/* Reference & Date */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '2rem',
                    paddingBottom: '1rem',
                    borderBottom: '2px solid var(--border-color)'
                }}>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            Référence
                        </p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>
                            {payout.reference}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            Date de traitement
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: '600' }}>
                            {format(new Date(payout.processedAt || payout.createdAt), 'dd MMMM yyyy', { locale: fr })}
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div style={{
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-main)' }}>
                        Détails du Reversement
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Facture associée</span>
                            <span style={{ fontWeight: '600' }}>{payout.invoiceNumber}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Méthode de paiement</span>
                            <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                                {payout.method === 'wave' ? 'Wave' : payout.method}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Compte bénéficiaire</span>
                            <span style={{ fontWeight: '500' }}>{payout.accountNumber}</span>
                        </div>
                    </div>
                </div>

                {/* Amounts */}
                <div style={{
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-main)' }}>
                        Calcul du Reversement
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Montant brut facture</span>
                            <span style={{ fontWeight: '600' }}>{formatCurrency(payout.grossAmount)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Commission FNE CONNECT (3%)</span>
                            <span style={{ fontWeight: '600', color: 'var(--danger)' }}>
                                -{formatCurrency(payout.commissionAmount)}
                            </span>
                        </div>
                        <div style={{
                            borderTop: '2px solid var(--border-color)',
                            paddingTop: '0.75rem',
                            marginTop: '0.5rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                    Montant net reversé
                                </span>
                                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>
                                    {formatCurrency(payout.netAmount)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div style={{
                    backgroundColor: payout.status === 'completed' ? 'var(--success-light)' : '#FEF3C7',
                    border: `1px solid ${payout.status === 'completed' ? 'var(--success)' : '#F59E0B'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        fontWeight: '600',
                        color: payout.status === 'completed' ? 'var(--success)' : '#D97706',
                        fontSize: '1rem'
                    }}>
                        {payout.status === 'completed'
                            ? '✓ Reversement effectué avec succès'
                            : '⏳ Reversement en cours de traitement'
                        }
                    </p>
                    {payout.status === 'completed' && payout.processedAt && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Traité le {format(new Date(payout.processedAt), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }} className="no-print">
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer size={18} /> Imprimer
                    </Button>
                    <Button onClick={handleDownload}>
                        <Download size={18} /> Télécharger PDF
                    </Button>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: '3rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--border-color)',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)'
                }}>
                    <p>FNE CONNECT - Plateforme de Portage Fiscal</p>
                    <p>Abidjan, Côte d'Ivoire | contact@fneconnect.ci | +225 XX XX XX XX XX</p>
                    <p style={{ marginTop: '0.5rem' }}>
                        Ce document est généré automatiquement et ne nécessite pas de signature
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PayoutReceipt;
