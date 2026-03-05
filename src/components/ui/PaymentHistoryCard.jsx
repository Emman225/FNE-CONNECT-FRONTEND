import React from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Eye
} from 'lucide-react';
import { formatCurrency } from '../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  PaymentStatus,
  getPaymentMethodLabel,
  InvoicePaymentStatus,
  getPaymentStatusColor,
  getPaymentStatusLabel
} from '../../types/clientPayment.types';

const PaymentHistoryCard = ({ paymentInfo, showTitle = true, compact = false }) => {
  if (!paymentInfo || !paymentInfo.payments) {
    return null;
  }

  const { payments, totalAmount, paidAmount, remainingAmount, paymentStatus, paymentCount } = paymentInfo;

  if (payments.length === 0) {
    return null;
  }

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case PaymentStatus.CONFIRMED:
        return <CheckCircle2 size={18} color="var(--success)" />;
      case PaymentStatus.PENDING:
        return <Clock size={18} color="#F59E0B" />;
      case PaymentStatus.FAILED:
        return <XCircle size={18} color="var(--danger)" />;
      case PaymentStatus.REFUNDED:
        return <AlertTriangle size={18} color="#8B5CF6" />;
      default:
        return <Clock size={18} />;
    }
  };

  const getPaymentStatusBadge = (status) => {
    const configs = {
      [PaymentStatus.CONFIRMED]: { label: 'Confirmé', color: 'var(--success)', bg: '#F0FDF4' },
      [PaymentStatus.PENDING]: { label: 'En attente', color: '#F59E0B', bg: '#FFFBEB' },
      [PaymentStatus.FAILED]: { label: 'Échec', color: 'var(--danger)', bg: '#FEF2F2' },
      [PaymentStatus.REFUNDED]: { label: 'Remboursé', color: '#8B5CF6', bg: '#F5F3FF' }
    };

    const config = configs[status] || configs[PaymentStatus.PENDING];

    return (
      <div style={{
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: config.bg,
        border: `1px solid ${config.color}`,
        fontSize: '0.75rem',
        fontWeight: '600',
        color: config.color,
        whiteSpace: 'nowrap'
      }}>
        {config.label}
      </div>
    );
  };

  const statusColor = getPaymentStatusColor(paymentStatus);
  const statusLabel = getPaymentStatusLabel(paymentStatus);

  if (compact) {
    return (
      <div style={{
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }}>
        {/* Summary Bar */}
        <div style={{
          padding: '1rem',
          backgroundColor: `${statusColor}10`,
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
              Statut de paiement
            </p>
            <p style={{ fontWeight: '700', color: statusColor }}>
              {statusLabel}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
              Reste à payer
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '800', color: statusColor }}>
              {formatCurrency(remainingAmount)}
            </p>
          </div>
        </div>

        {/* Payments List */}
        <div style={{ padding: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
            {paymentCount} paiement{paymentCount > 1 ? 's' : ''}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {payments.map((payment) => (
              <div
                key={payment.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem',
                  backgroundColor: '#F9FAFB',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {getPaymentStatusIcon(payment.status)}
                  <span style={{ fontWeight: '600' }}>
                    {formatCurrency(payment.amount)}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>-</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {getPaymentMethodLabel(payment.method)}
                  </span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                  {format(new Date(payment.paidAt), 'd MMM yyyy', { locale: fr })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      backgroundColor: 'white'
    }}>
      {/* Header */}
      {showTitle && (
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Clock size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Historique des Paiements
            </h3>
          </div>

          {/* Payment Status Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                Montant total
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '700' }}>
                {formatCurrency(totalAmount)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                Déjà payé
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--success)' }}>
                {formatCurrency(paidAmount)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                Reste à payer
              </p>
              <p style={{ fontSize: '1.125rem', fontWeight: '700', color: statusColor }}>
                {formatCurrency(remainingAmount)}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div style={{
            marginTop: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: `${statusColor}15`,
            border: `2px solid ${statusColor}`
          }}>
            {paymentStatus === InvoicePaymentStatus.PAID ? (
              <CheckCircle2 size={18} color={statusColor} />
            ) : (
              <Clock size={18} color={statusColor} />
            )}
            <span style={{ fontWeight: '700', color: statusColor, fontSize: '0.875rem' }}>
              {statusLabel}
            </span>
          </div>
        </div>
      )}

      {/* Payments List */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem'
        }}>
          <p style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
            {paymentCount} paiement{paymentCount > 1 ? 's' : ''} enregistré{paymentCount > 1 ? 's' : ''}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {payments.map((payment, index) => (
            <div
              key={payment.id}
              style={{
                padding: '1.25rem',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: payment.status === PaymentStatus.CONFIRMED ? '#F0FDF4' : 'white',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                {/* Left Side */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    {getPaymentStatusIcon(payment.status)}
                    <span style={{
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      color: 'var(--text-main)'
                    }}>
                      {formatCurrency(payment.amount)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Méthode:
                      </span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                        {getPaymentMethodLabel(payment.method)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Compte:
                      </span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {payment.accountNumber}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Date:
                      </span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {format(new Date(payment.paidAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                      </span>
                    </div>

                    {payment.transactionRef && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          Réf:
                        </span>
                        <code style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: '#F3F4F6',
                          padding: '0.25rem 0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontFamily: 'monospace'
                        }}>
                          {payment.transactionRef}
                        </code>
                      </div>
                    )}

                    {payment.notes && (
                      <div style={{
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: '#F9FAFB',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                        borderLeft: '3px solid var(--primary)'
                      }}>
                        "{payment.notes}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side - Status Badge */}
                <div>
                  {getPaymentStatusBadge(payment.status)}
                </div>
              </div>

              {/* Payment Number */}
              <div style={{
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Paiement #{payments.length - index}</span>
                {payment.confirmedBy && (
                  <span>Confirmé par {payment.confirmedBy}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryCard;
