import React, { useState } from 'react';
import Button from '../ui/Button';
import {
  X,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { formatCurrency } from '../../utils/financialUtils';
import {
  ClientPaymentMethod,
  PaymentStatus,
  isValidPaymentAmount,
  generateTransactionRef,
  formatAccountNumber,
  getPaymentMethodLabel
} from '../../types/clientPayment.types';

const PartialPaymentForm = ({ invoice, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: '',
    method: ClientPaymentMethod.WAVE,
    accountNumber: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const remainingAmount = invoice.paymentInfo.remainingAmount;

  const paymentMethods = [
    {
      value: ClientPaymentMethod.WAVE,
      label: 'Wave',
      icon: '📱',
      color: '#00D9B7',
      placeholder: '+221 77 123 45 67'
    },
    {
      value: ClientPaymentMethod.ORANGE_MONEY,
      label: 'Orange Money',
      icon: '📱',
      color: '#FF6600',
      placeholder: '+221 77 123 45 67'
    },
    {
      value: ClientPaymentMethod.MTN_MOMO,
      label: 'MTN Mobile Money',
      icon: '📱',
      color: '#FFCC00',
      placeholder: '+237 6XX XXX XXX'
    },
    {
      value: ClientPaymentMethod.MOOV_MONEY,
      label: 'Moov Money',
      icon: '📱',
      color: '#0066CC',
      placeholder: '+225 07 XX XX XX XX'
    },
    {
      value: ClientPaymentMethod.BANK_TRANSFER,
      label: 'Virement Bancaire',
      icon: '🏦',
      color: '#3B82F6',
      placeholder: 'Numéro de compte'
    },
    {
      value: ClientPaymentMethod.CASH,
      label: 'Espèces',
      icon: '💵',
      color: '#10B981',
      placeholder: 'Nom du payeur'
    }
  ];

  const selectedMethod = paymentMethods.find(m => m.value === formData.method);

  const validateForm = () => {
    const newErrors = {};

    // Valider le montant
    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount)) {
      newErrors.amount = 'Veuillez entrer un montant valide';
    } else if (!isValidPaymentAmount(amount, remainingAmount, false)) {
      newErrors.amount = `Le montant ne peut pas dépasser ${formatCurrency(remainingAmount)}`;
    } else if (amount < 1000) {
      newErrors.amount = 'Le montant minimum est de 1,000 FCFA';
    }

    // Valider le numéro de compte
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Veuillez entrer votre numéro de compte/téléphone';
    } else if (formData.method !== ClientPaymentMethod.CASH && formData.accountNumber.length < 8) {
      newErrors.accountNumber = 'Numéro de compte invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Créer l'objet de paiement
      const payment = {
        id: `PAY-${Date.now()}`,
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        amount: parseFloat(formData.amount),
        method: formData.method,
        accountNumber: formatAccountNumber(formData.accountNumber, formData.method),
        transactionRef: generateTransactionRef(),
        status: PaymentStatus.CONFIRMED,
        paidAt: new Date().toISOString(),
        confirmedAt: new Date().toISOString(),
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Dans une vraie application, on enverrait le paiement à l'API
      // const response = await fetch('/api/public/payments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payment)
      // });

      onSuccess(payment);
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setFormData(prev => ({ ...prev, amount: value }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: null }));
    }
  };

  const setQuickAmount = (percentage) => {
    const amount = Math.round(remainingAmount * percentage);
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
    if (errors.amount) {
      setErrors(prev => ({ ...prev, amount: null }));
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <X size={20} color="white" />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CreditCard size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                Effectuer un paiement
              </h2>
              <p style={{ opacity: 0.9, fontSize: '0.875rem' }}>
                Facture N° {invoice.invoiceNumber}
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.875rem' }}>Montant restant à payer</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>
              {formatCurrency(remainingAmount)}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          {/* Amount Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--text-main)'
            }}>
              Montant à payer *
            </label>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={formData.amount ? formatCurrency(parseFloat(formData.amount)) : ''}
                onChange={handleAmountChange}
                placeholder="0 FCFA"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: errors.amount ? '2px solid var(--danger)' : '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            {errors.amount && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                color: 'var(--danger)',
                fontSize: '0.875rem'
              }}>
                <AlertCircle size={16} />
                {errors.amount}
              </div>
            )}

            {/* Quick Amount Buttons */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '0.75rem',
              flexWrap: 'wrap'
            }}>
              {[0.25, 0.5, 0.75, 1].map(percentage => (
                <button
                  key={percentage}
                  type="button"
                  onClick={() => setQuickAmount(percentage)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  {percentage === 1 ? 'Tout' : `${percentage * 100}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.75rem',
              color: 'var(--text-main)'
            }}>
              Méthode de paiement *
            </label>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '0.75rem'
            }}>
              {paymentMethods.map(method => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, method: method.value }))}
                  style={{
                    padding: '1rem',
                    border: formData.method === method.value
                      ? `2px solid ${method.color}`
                      : '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: formData.method === method.value
                      ? `${method.color}10`
                      : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{method.icon}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textAlign: 'center',
                    color: formData.method === method.value ? method.color : 'var(--text-main)'
                  }}>
                    {method.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Account Number */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--text-main)'
            }}>
              {formData.method === ClientPaymentMethod.CASH
                ? 'Nom du payeur *'
                : formData.method === ClientPaymentMethod.BANK_TRANSFER
                  ? 'Numéro de compte *'
                  : 'Numéro de téléphone *'}
            </label>

            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, accountNumber: e.target.value }));
                if (errors.accountNumber) {
                  setErrors(prev => ({ ...prev, accountNumber: null }));
                }
              }}
              placeholder={selectedMethod?.placeholder || 'Entrez votre numéro'}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: errors.accountNumber ? '2px solid var(--danger)' : '2px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                transition: 'border-color 0.2s'
              }}
            />

            {errors.accountNumber && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                color: 'var(--danger)',
                fontSize: '0.875rem'
              }}>
                <AlertCircle size={16} />
                {errors.accountNumber}
              </div>
            )}
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--text-main)'
            }}>
              Notes (optionnel)
            </label>

            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Ajoutez une note pour le vendeur..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Info Box */}
          <div style={{
            padding: '1rem',
            backgroundColor: '#EFF6FF',
            border: '1px solid #3B82F6',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '0.75rem'
          }}>
            <AlertCircle size={20} color="#3B82F6" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
            <p style={{ fontSize: '0.875rem', color: '#1E40AF', lineHeight: '1.5' }}>
              Votre paiement sera enregistré et le vendeur sera notifié immédiatement.
              Vous pouvez effectuer plusieurs paiements partiels jusqu'au règlement complet de la facture.
            </p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#FEF2F2',
              border: '1px solid var(--danger)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--danger)'
            }}>
              <AlertCircle size={20} />
              <span style={{ fontSize: '0.875rem' }}>{errors.submit}</span>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              type="button"
              onClick={onClose}
              variant="solid"
              color="secondary"
              style={{ flex: 1 }}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              style={{
                flex: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: '700'
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" style={{ width: '18px', height: '18px' }}></div>
                  Traitement...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  Confirmer le paiement
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartialPaymentForm;
