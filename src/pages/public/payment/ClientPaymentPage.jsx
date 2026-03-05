import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  CreditCard,
  ArrowLeft,
  Download
} from 'lucide-react';
import { formatCurrency } from '../../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  getPaymentStatusColor,
  getPaymentStatusLabel,
  calculateRemainingAmount,
  getPaymentMethodLabel
} from '../../../types/clientPayment.types';
import { MOCK_INVOICES_WITH_PAYMENTS } from '../../../data/mockData';
import PartialPaymentForm from '../../../components/forms/PartialPaymentForm';

const ClientPaymentPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    // Simuler le chargement de la facture via le token
    const loadInvoice = async () => {
      try {
        setLoading(true);

        // Dans une vraie application, on ferait un appel API avec le token
        // const response = await fetch(`/api/public/invoices/${token}`);
        // const data = await response.json();

        // Pour la démo, on utilise les données mock
        await new Promise(resolve => setTimeout(resolve, 800));

        // Trouver une facture mock (on prend la première pour la démo)
        const mockInvoice = MOCK_INVOICES_WITH_PAYMENTS[0];

        if (!mockInvoice) {
          setError('Facture introuvable ou lien expiré');
          return;
        }

        setInvoice(mockInvoice);
      } catch (err) {
        setError('Erreur lors du chargement de la facture');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [token]);

  const handlePaymentSuccess = (payment) => {
    // Mettre à jour la facture avec le nouveau paiement
    setInvoice(prev => {
      const newPaidAmount = prev.paymentInfo.paidAmount + payment.amount;
      const newRemainingAmount = calculateRemainingAmount(prev.totalAmount, newPaidAmount);

      return {
        ...prev,
        paymentInfo: {
          ...prev.paymentInfo,
          paidAmount: newPaidAmount,
          remainingAmount: newRemainingAmount,
          payments: [...prev.paymentInfo.payments, payment],
          paymentCount: prev.paymentInfo.paymentCount + 1,
          lastPaymentDate: payment.paidAt
        }
      };
    });

    setShowPaymentForm(false);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <Card style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px' }}>
          <div className="spinner" style={{ margin: '0 auto 1.5rem' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Chargement de votre facture...</p>
        </Card>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <Card style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <AlertCircle size={64} color="#EF4444" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--danger)' }}>
            {error || 'Facture introuvable'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Le lien de paiement est invalide ou a expiré. Veuillez contacter le vendeur pour obtenir un nouveau lien.
          </p>
          <Button onClick={() => navigate('/')} variant="solid" color="secondary">
            <ArrowLeft size={18} />
            Retour à l'accueil
          </Button>
        </Card>
      </div>
    );
  }

  const { paymentInfo } = invoice;
  const statusColor = getPaymentStatusColor(paymentInfo.paymentStatus);
  const statusLabel = getPaymentStatusLabel(paymentInfo.paymentStatus);
  const isPaid = paymentInfo.paymentStatus === 'paid';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          color: 'white',
          marginBottom: '2rem'
        }}>
          <FileText size={48} style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            Paiement de Facture
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
            Facture N° {invoice.invoiceNumber}
          </p>
        </div>

        {/* Invoice Summary Card */}
        <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
          {/* Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: `${statusColor}15`,
            border: `2px solid ${statusColor}`,
            marginBottom: '1.5rem'
          }}>
            {isPaid ? (
              <CheckCircle2 size={18} color={statusColor} />
            ) : (
              <Clock size={18} color={statusColor} />
            )}
            <span style={{ fontWeight: '600', color: statusColor }}>
              {statusLabel}
            </span>
          </div>

          {/* Vendor Info */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
              Vendeur
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>
              {invoice.vendorName}
            </p>
          </div>

          {/* Client Info */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
              Facturé à
            </p>
            <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
              {invoice.clientName}
            </p>
            {invoice.clientEmail && (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {invoice.clientEmail}
              </p>
            )}
          </div>

          {/* Payment Summary */}
          <div style={{
            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Montant total</span>
              <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                {formatCurrency(paymentInfo.totalAmount)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Déjà payé</span>
              <span style={{ fontWeight: '600', color: 'var(--success)' }}>
                {formatCurrency(paymentInfo.paidAmount)}
              </span>
            </div>
            <div style={{
              height: '1px',
              backgroundColor: 'var(--border-color)',
              margin: '1rem 0'
            }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                Reste à payer
              </span>
              <span style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: isPaid ? 'var(--success)' : 'var(--primary)'
              }}>
                {formatCurrency(paymentInfo.remainingAmount)}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          {!isPaid && (
            <Button
              onClick={() => setShowPaymentForm(true)}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <CreditCard size={20} />
              Effectuer un paiement
            </Button>
          )}

          {isPaid && (
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#F0FDF4',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--success)'
            }}>
              <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--success)' }}>
                Facture entièrement payée
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Merci pour votre paiement !
              </p>
            </div>
          )}
        </Card>

        {/* Payment History */}
        {paymentInfo.payments.length > 0 && (
          <Card style={{ padding: '2rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Clock size={20} />
              Historique des paiements ({paymentInfo.paymentCount})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {paymentInfo.payments.map((payment, index) => (
                <div
                  key={payment.id}
                  style={{
                    padding: '1.25rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: payment.status === 'confirmed' ? '#F0FDF4' : 'white'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={18} color="var(--success)" />
                      <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      {getPaymentMethodLabel(payment.method)} - {payment.accountNumber}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {format(new Date(payment.paidAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </p>
                    {payment.transactionRef && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                        Réf: {payment.transactionRef}
                      </p>
                    )}
                  </div>

                  <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: payment.status === 'confirmed' ? 'var(--success)' : '#F59E0B',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {payment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          color: 'white',
          marginTop: '2rem',
          fontSize: '0.875rem',
          opacity: 0.8
        }}>
          <p>Propulsé par FNE Connect</p>
          <p style={{ marginTop: '0.5rem' }}>
            Des questions? Contactez {invoice.vendorName}
          </p>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <PartialPaymentForm
          invoice={invoice}
          onClose={() => setShowPaymentForm(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default ClientPaymentPage;
