import React, { useState } from 'react';
import Button from '../ui/Button';
import { X, CheckCircle, XCircle, AlertTriangle, Info, User, Calendar, FileText } from 'lucide-react';
import { formatCurrency } from '../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PAYOUT_STATUS_LABELS, WITHDRAWAL_METHOD_LABELS } from '../../types/payout.types';

const PayoutValidationModal = ({ isOpen, onClose, payout, userRole, onValidate, onReject }) => {
    const [action, setAction] = useState(null); // 'approve' or 'reject'
    const [rejectReason, setRejectReason] = useState('');
    const [comments, setComments] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen || !payout) return null;

    const canValidate = (userRole === 'FINANCE' && payout.status === 'pending_finance') ||
                       (userRole === 'ADMIN' && payout.status === 'pending_admin');

    if (!canValidate) {
        return null;
    }

    const handleSubmit = async () => {
        if (action === 'reject' && !rejectReason.trim()) {
            alert('Veuillez saisir le motif du rejet');
            return;
        }

        setIsProcessing(true);

        // Simuler un délai de traitement
        setTimeout(() => {
            if (action === 'approve') {
                onValidate(payout.id, comments);
            } else {
                onReject(payout.id, rejectReason, comments);
            }
            setIsProcessing(false);
            setAction(null);
            setRejectReason('');
            setComments('');
        }, 1500);
    };

    const handleCancel = () => {
        setAction(null);
        setRejectReason('');
        setComments('');
        onClose();
    };

    // Prédéfinis motifs de rejet
    const commonRejectReasons = [
        'Justificatifs manquants',
        'Bon de commande non signé',
        'Informations bancaires incorrectes',
        'Montant non conforme',
        'Documents expirés',
        'Vérification complémentaire nécessaire'
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-xl)',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative',
                border: '1px solid var(--border-color)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid var(--border-color)',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1
                }}>
                    <button
                        onClick={handleCancel}
                        disabled={isProcessing}
                        style={{
                            position: 'absolute',
                            top: '1.25rem',
                            right: '1.25rem',
                            background: 'var(--bg-main)',
                            border: 'none',
                            cursor: isProcessing ? 'not-allowed' : 'pointer',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            opacity: isProcessing ? 0.5 : 1
                        }}
                    >
                        <X size={18} />
                    </button>

                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: userRole === 'FINANCE' ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'
                    }}>
                        <FileText size={32} color="white" />
                    </div>

                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        textAlign: 'center',
                        color: 'var(--text-main)',
                        marginBottom: '0.5rem'
                    }}>
                        Validation {userRole === 'FINANCE' ? 'Finance' : 'Administrative'}
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem'
                    }}>
                        Demande de retrait {payout.reference}
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                    {/* Info Alert */}
                    <div style={{
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #3B82F6',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '0.75rem'
                    }}>
                        <Info size={20} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#1E3A8A', lineHeight: '1.5', margin: 0 }}>
                                {userRole === 'FINANCE' ? (
                                    <>Votre validation permettra au retrait de passer à l'étape de validation administrative. En cas de rejet, le vendeur sera notifié.</>
                                ) : (
                                    <>Votre validation finale permettra le traitement effectif du retrait. Le montant sera transféré au vendeur.</>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Payout Details */}
                    <div style={{
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        border: '1px solid var(--border-color)'
                    }}>
                        <h3 style={{
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            color: 'var(--text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Détails du Retrait
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User size={16} /> Vendeur
                                </span>
                                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                                    {payout.vendorName} ({payout.vendorAccountNumber})
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} /> Date demande
                                </span>
                                <span style={{ fontWeight: '600' }}>
                                    {format(new Date(payout.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                                </span>
                            </div>
                            {payout.invoiceNumber && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Facture liée</span>
                                    <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{payout.invoiceNumber}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Méthode</span>
                                <span style={{ fontWeight: '600' }}>{WITHDRAWAL_METHOD_LABELS[payout.method] || payout.method}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Compte</span>
                                <span style={{ fontWeight: '600', fontFamily: 'monospace' }}>{payout.accountInfo}</span>
                            </div>
                        </div>
                    </div>

                    {/* Amounts */}
                    <div style={{
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)'
                    }}>
                        <h3 style={{
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            color: 'var(--text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            Montant du Retrait
                        </h3>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-md)',
                            border: '2px solid var(--success)'
                        }}>
                            <span style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                Montant à reverser au vendeur
                            </span>
                            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--success)' }}>
                                {formatCurrency(payout.netAmount)}
                            </span>
                        </div>

                        <div style={{
                            marginTop: '1rem',
                            padding: '0.75rem',
                            backgroundColor: '#DBEAFE',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #3B82F6'
                        }}>
                            <p style={{ fontSize: '0.75rem', color: '#1E40AF', margin: 0, lineHeight: '1.4' }}>
                                ℹ️ La commission FNE a déjà été prélevée lors de la génération de la facture. Le montant affiché est le montant net que le vendeur recevra.
                            </p>
                        </div>
                    </div>

                    {/* Vendor Notes */}
                    {payout.vendorNotes && (
                        <div style={{
                            backgroundColor: '#FEF3C7',
                            border: '1px solid #F59E0B',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1rem',
                            marginBottom: '2rem'
                        }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400E', marginBottom: '0.5rem' }}>
                                Note du vendeur :
                            </p>
                            <p style={{ fontSize: '0.875rem', color: '#78350F', margin: 0, fontStyle: 'italic' }}>
                                "{payout.vendorNotes}"
                            </p>
                        </div>
                    )}

                    {/* Finance Validation (visible pour Admin) */}
                    {userRole === 'ADMIN' && payout.financeValidation && (
                        <div style={{
                            backgroundColor: '#DBEAFE',
                            border: '1px solid #3B82F6',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1rem',
                            marginBottom: '2rem'
                        }}>
                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1E3A8A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={16} /> Validé par Finance
                            </p>
                            <p style={{ fontSize: '0.875rem', color: '#1E40AF', margin: 0 }}>
                                {payout.financeValidation.userName} - {format(new Date(payout.financeValidation.timestamp), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                            </p>
                            {payout.financeValidation.comments && (
                                <p style={{ fontSize: '0.875rem', color: '#1E40AF', marginTop: '0.5rem', fontStyle: 'italic' }}>
                                    "{payout.financeValidation.comments}"
                                </p>
                            )}
                        </div>
                    )}

                    {/* Action Selection */}
                    {!action ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <button
                                onClick={() => setAction('approve')}
                                disabled={isProcessing}
                                style={{
                                    padding: '1.25rem',
                                    border: '2px solid var(--success)',
                                    borderRadius: 'var(--radius-lg)',
                                    backgroundColor: 'var(--success-light)',
                                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <CheckCircle size={32} color="var(--success)" />
                                <span style={{ fontWeight: '700', color: 'var(--success)', fontSize: '1rem' }}>
                                    Valider
                                </span>
                            </button>

                            <button
                                onClick={() => setAction('reject')}
                                disabled={isProcessing}
                                style={{
                                    padding: '1.25rem',
                                    border: '2px solid var(--danger)',
                                    borderRadius: 'var(--radius-lg)',
                                    backgroundColor: '#FEE2E2',
                                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <XCircle size={32} color="var(--danger)" />
                                <span style={{ fontWeight: '700', color: 'var(--danger)', fontSize: '1rem' }}>
                                    Rejeter
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            backgroundColor: action === 'approve' ? 'var(--success-light)' : '#FEE2E2',
                            border: `2px solid ${action === 'approve' ? 'var(--success)' : 'var(--danger)'}`,
                            borderRadius: 'var(--radius-lg)',
                            padding: '1.5rem',
                            marginBottom: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {action === 'approve' ? (
                                    <CheckCircle size={24} color="var(--success)" />
                                ) : (
                                    <AlertTriangle size={24} color="var(--danger)" />
                                )}
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: action === 'approve' ? 'var(--success)' : 'var(--danger)' }}>
                                    {action === 'approve' ? 'Validation du retrait' : 'Rejet du retrait'}
                                </h3>
                            </div>

                            {action === 'reject' && (
                                <>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        marginBottom: '0.75rem',
                                        color: 'var(--text-main)'
                                    }}>
                                        Motif du rejet <span style={{ color: 'var(--danger)' }}>*</span>
                                    </label>
                                    <select
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        disabled={isProcessing}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '0.9375rem',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        <option value="">-- Sélectionner un motif --</option>
                                        {commonRejectReasons.map((reason, idx) => (
                                            <option key={idx} value={reason}>{reason}</option>
                                        ))}
                                        <option value="Autre">Autre (saisir ci-dessous)</option>
                                    </select>

                                    {rejectReason === 'Autre' && (
                                        <input
                                            type="text"
                                            placeholder="Saisir le motif..."
                                            onChange={(e) => setRejectReason(e.target.value)}
                                            disabled={isProcessing}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '2px solid var(--border-color)',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '0.9375rem',
                                                marginBottom: '1rem'
                                            }}
                                        />
                                    )}
                                </>
                            )}

                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                marginBottom: '0.75rem',
                                color: 'var(--text-main)'
                            }}>
                                Commentaires additionnels (optionnel)
                            </label>
                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                disabled={isProcessing}
                                placeholder={action === 'approve' ? 'Ajouter un commentaire...' : 'Précisions sur le motif du rejet...'}
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={action ? () => setAction(null) : handleCancel}
                            style={{ flex: 1, height: '50px' }}
                            disabled={isProcessing}
                        >
                            {action ? 'Retour' : 'Annuler'}
                        </Button>
                        {action && (
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                style={{
                                    flex: 2,
                                    height: '50px',
                                    backgroundColor: action === 'approve' ? 'var(--success)' : 'var(--danger)'
                                }}
                                disabled={isProcessing || (action === 'reject' && !rejectReason.trim())}
                            >
                                {isProcessing ? (
                                    'Traitement...'
                                ) : (
                                    action === 'approve' ? `✓ Confirmer la validation` : `✗ Confirmer le rejet`
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayoutValidationModal;
