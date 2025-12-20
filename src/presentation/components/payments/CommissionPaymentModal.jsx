import React, { useState } from 'react';
import Button from '../ui/Button';
import { X, Wallet, CreditCard, Smartphone } from 'lucide-react';
import { usePaymentStore } from '../../../store';
import { useNotifications } from '../../../context/NotificationContext';
import { formatCurrency } from '../../../core/utils/financialUtils';

const CommissionPaymentModal = ({ isOpen, onClose, commission, invoice }) => {
    const { payCommission } = usePaymentStore();
    const { showSuccess, showLoading, dismissToast } = useNotifications();
    const [selectedMethod, setSelectedMethod] = useState('wave');
    const [phoneNumber, setPhoneNumber] = useState('+225 07 12 34 56 78');
    const [isPaying, setIsPaying] = useState(false);

    if (!isOpen || !commission) return null;

    const paymentMethods = [
        {
            id: 'wave',
            name: 'Wave',
            icon: <Smartphone size={24} />,
            color: '#00D9B7',
            description: 'Paiement instantané via Wave'
        },
        {
            id: 'orange_money',
            name: 'Orange Money',
            icon: <Smartphone size={24} />,
            color: '#FF6600',
            description: 'Paiement via Orange Money'
        },
        {
            id: 'mtn_momo',
            name: 'MTN Mobile Money',
            icon: <Smartphone size={24} />,
            color: '#FFCC00',
            description: 'Paiement via MTN MoMo'
        },
        {
            id: 'moov_money',
            name: 'Moov Money',
            icon: <Smartphone size={24} />,
            color: '#009FE3',
            description: 'Paiement via Moov Money'
        }
    ];

    const handlePayment = async () => {
        setIsPaying(true);
        const loadingToast = showLoading('Traitement du paiement...');

        // Simulate payment processing
        setTimeout(() => {
            payCommission(commission.id, selectedMethod);
            dismissToast(loadingToast);
            showSuccess(`Commission de ${formatCurrency(commission.amount)} payée avec succès via ${paymentMethods.find(m => m.id === selectedMethod)?.name}!`);
            setIsPaying(false);
            onClose();
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
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
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-secondary)'
                        }}
                        className="hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>

                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--warning-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem'
                    }}>
                        <Wallet size={32} color="var(--warning)" />
                    </div>

                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        textAlign: 'center',
                        marginBottom: '0.5rem',
                        color: 'var(--text-main)'
                    }}>
                        Payer la Commission
                    </h2>

                    <p style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem'
                    }}>
                        Payez votre commission pour générer la facture FNE officielle
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                    {/* Commission Details */}
                    <div style={{
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: 'var(--text-main)'
                        }}>
                            Détails de la Commission
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Facture</span>
                                <span style={{ fontWeight: '600' }}>{invoice?.id || commission.invoiceNumber}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Taux de commission</span>
                                <span style={{ fontWeight: '600' }}>{(commission.rate * 100).toFixed(1)}%</span>
                            </div>
                            <div style={{
                                borderTop: '1px solid var(--border-color)',
                                paddingTop: '0.75rem',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Montant à payer</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--warning)' }}>
                                    {formatCurrency(commission.amount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: 'var(--text-main)'
                        }}>
                            Méthode de Paiement
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    style={{
                                        padding: '1rem',
                                        border: selectedMethod === method.id
                                            ? `2px solid ${method.color}`
                                            : '2px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        backgroundColor: selectedMethod === method.id
                                            ? `${method.color}10`
                                            : 'white',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-normal)',
                                        textAlign: 'left'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <div style={{ color: method.color }}>
                                            {method.icon}
                                        </div>
                                        <span style={{
                                            fontWeight: '600',
                                            fontSize: '0.9375rem',
                                            color: 'var(--text-main)'
                                        }}>
                                            {method.name}
                                        </span>
                                    </div>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--text-secondary)',
                                        margin: 0
                                    }}>
                                        {method.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            marginBottom: '0.5rem',
                            color: 'var(--text-main)'
                        }}>
                            Numéro de téléphone
                        </label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+225 XX XX XX XX XX"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9375rem',
                                transition: 'all var(--transition-normal)'
                            }}
                            className="input-field"
                        />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            style={{ flex: 1 }}
                            disabled={isPaying}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handlePayment}
                            style={{ flex: 1 }}
                            disabled={isPaying}
                        >
                            {isPaying ? 'Paiement en cours...' : `Payer ${formatCurrency(commission.amount)}`}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommissionPaymentModal;
