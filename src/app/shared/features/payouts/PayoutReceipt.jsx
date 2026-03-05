import React, { useState } from 'react';
import { Download, Printer, Mail, Loader2 } from 'lucide-react';
import { formatCurrency } from '../../../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Button from '../../../../components/ui/Button';
import Barcode from 'react-barcode';
import { payoutService } from '../../../../services/payoutService';

const PayoutReceipt = ({ payout, isAdmin = false }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    if (!payout) return null;

    const formatMethod = (method) => {
        const methods = {
            'wave': 'Wave',
            'orange_money': 'Orange Money',
            'mtn_momo': 'MTN MoMo',
            'moov_money': 'Moov Money',
            'bank_transfer': 'Virement Bancaire',
        };
        return methods[method] || method || 'N/A';
    };

    // Build account display from available fields
    const getAccountDisplay = () => {
        // 1. Payout's own account_number (set on vendor-initiated withdrawals)
        if (payout.account_number && payout.account_number !== 'N/A') {
            const parts = [payout.account_number];
            if (payout.account_holder_name) parts.push(`(${payout.account_holder_name})`);
            if (payout.bank_name) parts.push(`- ${payout.bank_name}`);
            return parts.join(' ');
        }
        // 2. Vendor's account_number (when vendor relationship is loaded)
        if (payout.vendor?.account_number) {
            return payout.vendor.account_number + (payout.vendor.company_name ? ` (${payout.vendor.company_name})` : '');
        }
        // 3. Fallback: show method label (for auto-payouts)
        return `Compte ${formatMethod(payout.method)}`;
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            if (isAdmin) {
                await payoutService.downloadReceipt(payout.id, payout.reference);
            } else {
                await payoutService.vendorDownloadReceipt(payout.id, payout.reference);
            }
        } catch (error) {
            console.error('Error downloading receipt:', error);
            alert(error.message || 'Erreur lors du téléchargement du reçu.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handlePrint = async () => {
        setIsPrinting(true);
        try {
            if (isAdmin) {
                await payoutService.openReceiptPdf(payout.id);
            } else {
                await payoutService.vendorOpenReceiptPdf(payout.id);
            }
        } catch (error) {
            console.error('Error opening PDF:', error);
            alert(error.message || 'Erreur lors de l\'ouverture du PDF.');
        } finally {
            setIsPrinting(false);
        }
    };

    const handleSendEmail = async () => {
        if (!window.confirm(`Envoyer le reçu de reversement par email au vendeur (${payout.vendor?.user?.email || 'email non disponible'}) ?`)) {
            return;
        }
        setIsSendingEmail(true);
        try {
            await payoutService.sendReceiptEmail(payout.id);
            alert('Le reçu de reversement a été envoyé avec succès au vendeur.');
        } catch (error) {
            console.error('Error sending email:', error);
            alert(error.message || 'Erreur lors de l\'envoi de l\'email.');
        } finally {
            setIsSendingEmail(false);
        }
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
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: 'white',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#FFFFFF' }}>
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
                            {format(new Date(payout.completed_at || payout.processedAt || payout.created_at || payout.createdAt), 'dd MMMM yyyy', { locale: fr })}
                        </p>
                    </div>
                </div>

                {/* Barcode */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <Barcode
                        value={payout.reference || payout.transaction_ref || 'N/A'}
                        width={1.5}
                        height={50}
                        fontSize={12}
                        displayValue={true}
                        background="transparent"
                    />
                </div>

                {/* Vendor Info (if admin) */}
                {isAdmin && payout.vendor && (
                    <div style={{
                        backgroundColor: '#f0f9ff',
                        border: '1px solid #0ea5e9',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0369a1', marginBottom: '0.5rem' }}>
                            Bénéficiaire
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>
                            {payout.vendor.company_name || payout.vendor?.user?.name || 'N/A'}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            N° Compte: {payout.vendor.account_number || 'N/A'}
                        </p>
                    </div>
                )}

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
                        {(payout.invoice?.invoice_number || payout.invoiceNumber) && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Facture associée</span>
                                <span style={{ fontWeight: '600' }}>{payout.invoice?.invoice_number || payout.invoiceNumber}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Méthode de paiement</span>
                            <span style={{ fontWeight: '500' }}>
                                {formatMethod(payout.method)}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Compte bénéficiaire</span>
                            <span style={{ fontWeight: '500' }}>
                                {getAccountDisplay()}
                            </span>
                        </div>
                        {payout.transaction_reference && (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Référence transaction</span>
                                <span style={{ fontWeight: '500', fontFamily: 'monospace' }}>{payout.transaction_reference}</span>
                            </div>
                        )}
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
                        Montant du Reversement
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-main)' }}>
                            Montant reversé
                        </span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>
                            {formatCurrency(payout.net_amount || payout.netAmount)}
                        </span>
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
                    {payout.status === 'completed' && (payout.completed_at || payout.processedAt) && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Traité le {format(new Date(payout.completed_at || payout.processedAt), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                        </p>
                    )}
                </div>

                {/* Agent FNE Connect */}
                {(payout.admin_validator || payout.finance_validator) && (
                    <div style={{
                        backgroundColor: '#f5f3ff',
                        border: '1px solid #7c3aed',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#7c3aed', marginBottom: '0.5rem' }}>
                            Agent FNE Connect
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {payout.admin_validator && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#6b7280' }}>Traité par</span>
                                    <span style={{ fontWeight: '600', color: '#111827' }}>{payout.admin_validator.name}</span>
                                </div>
                            )}
                            {payout.finance_validator && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#6b7280' }}>Validé (Finance)</span>
                                    <span style={{ fontWeight: '600', color: '#111827' }}>{payout.finance_validator.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="no-print">
                    <Button
                        variant="outline"
                        onClick={handlePrint}
                        disabled={isPrinting}
                    >
                        {isPrinting ? (
                            <><Loader2 size={18} className="animate-spin" /> Chargement...</>
                        ) : (
                            <><Printer size={18} /> Imprimer</>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleDownload}
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <><Loader2 size={18} className="animate-spin" /> Téléchargement...</>
                        ) : (
                            <><Download size={18} /> Télécharger PDF</>
                        )}
                    </Button>
                    {isAdmin && (
                        <Button
                            onClick={handleSendEmail}
                            disabled={isSendingEmail}
                            style={{ backgroundColor: '#059669' }}
                        >
                            {isSendingEmail ? (
                                <><Loader2 size={18} className="animate-spin" /> Envoi...</>
                            ) : (
                                <><Mail size={18} /> Envoyer par email</>
                            )}
                        </Button>
                    )}
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
