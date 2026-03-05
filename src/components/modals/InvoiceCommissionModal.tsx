import React, { useState } from 'react';
import Button from '../ui/Button';
import { X, Wallet, Smartphone, Landmark, AlertCircle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/financialUtils';
import type { InvoiceFormData } from '../../types/invoice.types';
import { paymentService } from '../../services/paymentService';
import toast from 'react-hot-toast';

interface InvoiceCommissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: (paymentMethod: string, transactionRef: string) => void;
    invoice: InvoiceFormData;
    commissionRate?: number; // Taux par défaut: 2.5%
}

const InvoiceCommissionModal: React.FC<InvoiceCommissionModalProps> = ({
    isOpen,
    onClose,
    onPaymentSuccess,
    invoice,
    commissionRate = 0.025
}) => {
    const [selectedMethod, setSelectedMethod] = useState('wave');
    const [accountInfo, setAccountInfo] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const [installmentCount, setInstallmentCount] = useState(2);

    // Calcul de la commission
    const invoiceTotal = invoice.totals.totalTTC;
    const commissionAmount = invoiceTotal * commissionRate;

    // Seuil de 2 000 000 FCFA
    const COMMISSION_THRESHOLD = 2_000_000;
    const isAboveThreshold = commissionAmount > COMMISSION_THRESHOLD;

    const standardPaymentMethods = [
        {
            id: 'wave',
            name: 'Wave',
            icon: <Smartphone size={24} />,
            color: '#00D9B7',
            label: 'Numéro Wave',
            placeholder: '+237 6XX XXX XXX'
        },
        {
            id: 'orange_money',
            name: 'Orange Money',
            icon: <Smartphone size={24} />,
            color: '#FF6600',
            label: 'Numéro Orange',
            placeholder: '+237 6XX XXX XXX'
        },
        {
            id: 'mtn_momo',
            name: 'MTN MoMo',
            icon: <Smartphone size={24} />,
            color: '#FFCC00',
            label: 'Numéro MTN',
            placeholder: '+237 6XX XXX XXX'
        },
        {
            id: 'bank',
            name: 'Carte Bancaire',
            icon: <Landmark size={24} />,
            color: 'var(--primary)',
            label: 'Numéro de carte',
            placeholder: '1234 5678 9012 3456'
        }
    ];

    const thresholdPaymentMethods = [
        {
            id: 'installments',
            name: 'Paiement en tranches',
            icon: <Wallet size={24} />,
            color: '#6366F1',
            label: 'Numéro de paiement',
            placeholder: '+237 6XX XXX XXX'
        },
        {
            id: 'agency',
            name: 'En agence FNE Connect',
            icon: <Landmark size={24} />,
            color: 'var(--primary)',
            label: 'Référence (auto-générée)',
            placeholder: 'Référence générée automatiquement'
        }
    ];

    const paymentMethods = isAboveThreshold ? thresholdPaymentMethods : standardPaymentMethods;

    const handlePayment = async () => {
        if (!accountInfo.trim()) {
            toast.error('Veuillez renseigner les informations du compte.');
            return;
        }

        setIsProcessing(true);

        try {
            const payload: any = {
                invoice_id: invoice.id as string,
                amount: commissionAmount,
                method: selectedMethod,
                account_info: accountInfo
            };

            if (isAboveThreshold && selectedMethod === 'installments') {
                payload.installment_count = installmentCount;
                payload.is_installment = true;
            }

            const result = await paymentService.payCommission(payload);

            toast.success('Commission payée avec succès');
            onPaymentSuccess(selectedMethod, result.transaction_ref);
        } catch (error: any) {
            console.error("Payment failed", error);
            toast.error(error.response?.data?.error || 'Erreur lors du paiement de la commission');
        } finally {
            setIsProcessing(false);
        }
    };

    const currentMethod = paymentMethods.find(m => m.id === selectedMethod);

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
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out'
        }}>
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-xl)',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: 'var(--shadow-xl)',
                    position: 'relative',
                    border: '1px solid var(--border-color)',
                    animation: 'slideUp 0.3s ease-out'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid var(--border-color)',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1,
                    textAlign: 'center'
                }}>
                    <button
                        onClick={onClose}
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
                        width: '72px',
                        height: '72px',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.25rem',
                        transform: 'rotate(-5deg)',
                        boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)'
                    }}>
                        <Wallet size={36} color="white" />
                    </div>

                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: 'var(--text-main)',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.5rem'
                    }}>
                        Commission FNE Connect
                    </h2>

                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        lineHeight: '1.5'
                    }}>
                        Payez la commission pour générer et envoyer votre facture
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                    {/* Alert Info */}
                    <div style={{
                        backgroundColor: '#FEF3C7',
                        border: '1px solid #F59E0B',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'start',
                        gap: '0.75rem'
                    }}>
                        <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <p style={{ fontSize: '0.875rem', color: '#92400E', lineHeight: '1.5', margin: 0 }}>
                                La commission est payée <strong>une seule fois</strong> lors de la génération de la facture.
                                Elle permet de couvrir les frais de plateforme et de transaction.
                            </p>
                        </div>
                    </div>

                    {/* Avertissement seuil > 2M */}
                    {isAboveThreshold && (
                        <div style={{
                            backgroundColor: '#FEE2E2',
                            border: '1px solid #EF4444',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'start',
                            gap: '0.75rem'
                        }}>
                            <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div>
                                <p style={{ fontSize: '0.875rem', color: '#991B1B', lineHeight: '1.5', margin: 0, fontWeight: '600' }}>
                                    Le montant de la commission dépasse 2 000 000 FCFA.
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#991B1B', lineHeight: '1.5', margin: '0.25rem 0 0' }}>
                                    Le paiement doit se faire en plusieurs tranches ou directement en agence chez FNE Connect.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Invoice & Commission Details */}
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
                            Détails de la Commission
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Client</span>
                                <span style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9375rem' }}>
                                    {invoice.clientInfo.clientName}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Montant facture</span>
                                <span style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9375rem' }}>
                                    {formatCurrency(invoiceTotal, invoice.clientInfo.currency)}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Taux de commission</span>
                                <span style={{
                                    fontWeight: '600',
                                    color: '#D97706',
                                    fontSize: '0.9375rem',
                                    backgroundColor: '#FEF3C7',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: 'var(--radius-sm)'
                                }}>
                                    {(commissionRate * 100).toFixed(1)}%
                                </span>
                            </div>

                            <div style={{
                                borderTop: '2px solid var(--border-color)',
                                marginTop: '0.5rem',
                                paddingTop: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '1rem' }}>
                                    Commission à payer
                                </span>
                                <span style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: '#D97706',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {formatCurrency(commissionAmount, invoice.clientInfo.currency)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            color: 'var(--text-main)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Méthode de Paiement
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => !isProcessing && setSelectedMethod(method.id)}
                                    disabled={isProcessing}
                                    style={{
                                        padding: '1.25rem',
                                        border: selectedMethod === method.id
                                            ? `2px solid ${method.color}`
                                            : '2px solid var(--border-color)',
                                        borderRadius: 'var(--radius-lg)',
                                        backgroundColor: selectedMethod === method.id ? `${method.color}08` : 'white',
                                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        opacity: isProcessing ? 0.6 : 1
                                    }}
                                >
                                    <div style={{
                                        color: selectedMethod === method.id ? method.color : 'var(--text-secondary)',
                                        transition: 'all 0.2s'
                                    }}>
                                        {method.icon}
                                    </div>
                                    <span style={{
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: selectedMethod === method.id ? 'var(--text-main)' : 'var(--text-secondary)',
                                        textAlign: 'center'
                                    }}>
                                        {method.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Account Info Input */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            marginBottom: '0.75rem',
                            color: 'var(--text-main)'
                        }}>
                            {currentMethod?.label}
                        </label>
                        <input
                            type="text"
                            value={accountInfo}
                            onChange={(e) => setAccountInfo(e.target.value)}
                            placeholder={currentMethod?.placeholder}
                            disabled={isProcessing}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1rem',
                                border: '2px solid var(--border-color)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: '0.9375rem',
                                transition: 'all 0.2s',
                                opacity: isProcessing ? 0.6 : 1
                            }}
                            className="input-field"
                        />
                        <div style={{
                            marginTop: '0.75rem',
                            display: 'flex',
                            alignItems: 'start',
                            gap: '0.5rem',
                            padding: '0.75rem',
                            backgroundColor: '#DBEAFE',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #93C5FD'
                        }}>
                            <CheckCircle size={16} color="#1D4ED8" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <p style={{ fontSize: '0.75rem', color: '#1E3A8A', lineHeight: '1.5', margin: 0 }}>
                                Vos informations sont sécurisées et ne seront utilisées que pour le traitement du paiement.
                            </p>
                        </div>
                    </div>

                    {/* Sélection du nombre de tranches */}
                    {isAboveThreshold && selectedMethod === 'installments' && (
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                marginBottom: '0.75rem',
                                color: 'var(--text-main)'
                            }}>
                                Nombre de tranches
                            </label>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {[2, 3, 4].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => setInstallmentCount(n)}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            border: installmentCount === n ? '2px solid #6366F1' : '2px solid var(--border-color)',
                                            borderRadius: 'var(--radius-lg)',
                                            backgroundColor: installmentCount === n ? '#EEF2FF' : 'white',
                                            cursor: 'pointer',
                                            fontWeight: '700',
                                            fontSize: '1rem',
                                            color: installmentCount === n ? '#4338CA' : 'var(--text-secondary)',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {n} tranches
                                    </button>
                                ))}
                            </div>
                            <div style={{
                                marginTop: '0.75rem',
                                padding: '0.75rem',
                                backgroundColor: '#EEF2FF',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #C7D2FE'
                            }}>
                                <p style={{ fontSize: '0.8rem', color: '#4338CA', margin: 0, fontWeight: '500' }}>
                                    Montant par tranche : {formatCurrency(commissionAmount / installmentCount, invoice.clientInfo.currency)}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            style={{ flex: 1, height: '54px' }}
                            disabled={isProcessing}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="button"
                            onClick={handlePayment}
                            style={{
                                flex: 2,
                                height: '54px',
                                background: isProcessing
                                    ? 'var(--text-secondary)'
                                    : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                fontWeight: '700'
                            }}
                            disabled={isProcessing || !accountInfo.trim()}
                        >
                            {isProcessing ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className="spinner" style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid white',
                                        borderTopColor: 'transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 0.6s linear infinite'
                                    }} />
                                    Traitement en cours...
                                </span>
                            ) : (
                                `Payer ${formatCurrency(commissionAmount, invoice.clientInfo.currency)}`
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default InvoiceCommissionModal;
