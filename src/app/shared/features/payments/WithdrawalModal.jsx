import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { X, Wallet, Smartphone, Landmark, AlertCircle, ArrowRight } from 'lucide-react';
import { usePaymentStore } from '../../../../hooks/usePaymentStore';
import { useNotifications } from '../../../../context/NotificationContext';
import { formatCurrency } from '../../../../utils/financialUtils';

const WithdrawalModal = ({ isOpen, onClose, balance = 1250000 }) => {
    const { showSuccess, showError, showLoading, dismissToast } = useNotifications();
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('wave');
    const [accountInfo, setAccountInfo] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const paymentMethods = [
        {
            id: 'wave',
            name: 'Wave',
            icon: <Smartphone size={24} />,
            color: '#00D9B7',
            label: 'Numéro Wave',
            placeholder: '+225 07 XX XX XX XX'
        },
        {
            id: 'orange_money',
            name: 'Orange Money',
            icon: <Smartphone size={24} />,
            color: '#FF6600',
            label: 'Numéro Orange',
            placeholder: '+225 07 XX XX XX XX'
        },
        {
            id: 'mtn_momo',
            name: 'MTN MoMo',
            icon: <Smartphone size={24} />,
            color: '#FFCC00',
            label: 'Numéro MTN',
            placeholder: '+225 05 XX XX XX XX'
        },
        {
            id: 'bank',
            name: 'Virement Bancaire',
            icon: <Landmark size={24} />,
            color: 'var(--primary)',
            label: 'IBAN / RIB',
            placeholder: 'CI000 00000 00000000000 00'
        }
    ];

    const handleWithdraw = async (e) => {
        e.preventDefault();

        const withdrawalAmount = parseFloat(amount);

        if (!amount || isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
            showError('Veuillez entrer un montant valide.');
            return;
        }

        if (withdrawalAmount > balance) {
            showError('Le montant dépasse votre solde disponible.');
            return;
        }

        if (!accountInfo) {
            showError('Veuillez renseigner les informations du compte.');
            return;
        }

        setIsProcessing(true);
        const loadingToast = showLoading('Traitement de votre demande de retrait...');

        // Simulate API call
        setTimeout(() => {
            dismissToast(loadingToast);
            showSuccess(`Votre demande de retrait de ${formatCurrency(withdrawalAmount)} a été soumise avec succès !`);
            setIsProcessing(false);
            onClose();
        }, 2000);
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
            padding: '1rem'
        }}>
            <div
                className="fade-in"
                style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-xl)',
                    maxWidth: '550px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: 'var(--shadow-xl)',
                    position: 'relative',
                    border: '1px solid var(--border-color)'
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
                        style={{
                            position: 'absolute',
                            top: '1.25rem',
                            right: '1.25rem',
                            background: 'var(--bg-main)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                        className="hover-lift"
                    >
                        <X size={18} />
                    </button>

                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        backgroundColor: 'var(--primary-lighter)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.25rem',
                        transform: 'rotate(-5deg)'
                    }}>
                        <Wallet size={32} color="var(--primary)" />
                    </div>

                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: 'var(--text-main)',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.5rem'
                    }}>
                        Retrait de Fonds
                    </h2>

                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem'
                    }}>
                        Transférez votre solde vers votre compte préféré.
                    </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleWithdraw} style={{ padding: '2rem' }}>
                    {/* Available Balance Info */}
                    <div style={{
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.25rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px dashed var(--border-color)'
                    }}>
                        <div>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Solde disponible</p>
                            <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>{formatCurrency(balance)}</p>
                        </div>
                        <div style={{ color: 'var(--primary)', opacity: 0.5 }}>
                            <ArrowRight size={20} />
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            marginBottom: '0.75rem',
                            color: 'var(--text-main)'
                        }}>
                            Montant à retirer (FCFA)
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="input-field"
                                style={{
                                    paddingLeft: '1rem',
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    height: '60px'
                                }}
                                disabled={isProcessing}
                            />
                            <div style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                display: 'flex',
                                gap: '0.5rem'
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setAmount(balance.toString())}
                                    style={{
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        color: 'var(--primary)',
                                        backgroundColor: 'var(--primary-lighter)',
                                        border: 'none',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    MAX
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Method Selection */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: 'var(--text-main)'
                        }}>
                            Méthode de réception
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => !isProcessing && setSelectedMethod(method.id)}
                                    style={{
                                        padding: '1rem',
                                        border: selectedMethod === method.id
                                            ? `2px solid ${method.color}`
                                            : '2px solid var(--border-color)',
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                                        backgroundColor: selectedMethod === method.id ? `${method.color}08` : 'white',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                >
                                    <div style={{
                                        color: selectedMethod === method.id ? method.color : 'var(--text-secondary)',
                                        transition: 'all 0.2s'
                                    }}>
                                        {method.icon}
                                    </div>
                                    <span style={{
                                        fontSize: '0.8125rem',
                                        fontWeight: '600',
                                        color: selectedMethod === method.id ? 'var(--text-main)' : 'var(--text-secondary)'
                                    }}>
                                        {method.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Account Info Input */}
                    <div style={{ marginBottom: '2.5rem' }}>
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
                            className="input-field"
                            style={{ height: '50px' }}
                            disabled={isProcessing}
                        />
                        <div style={{
                            marginTop: '0.75rem',
                            display: 'flex',
                            alignItems: 'start',
                            gap: '0.5rem',
                            padding: '0.75rem',
                            backgroundColor: '#F0F9FF',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #BAE6FD'
                        }}>
                            <AlertCircle size={16} color="#0369A1" style={{ marginTop: '2px' }} />
                            <p style={{ fontSize: '0.75rem', color: '#0369A1', lineHeight: '1.4' }}>
                                Veuillez vérifier ces informations. Toute erreur pourrait entraîner un retard ou une perte de fonds.
                            </p>
                        </div>
                    </div>

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
                            type="submit"
                            style={{ flex: 1, height: '54px' }}
                            disabled={isProcessing || !amount}
                        >
                            {isProcessing ? 'Traitement...' : 'Confirmer le Retrait'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WithdrawalModal;
