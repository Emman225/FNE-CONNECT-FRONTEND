/**
 * Types pour les paiements partiels des clients
 */

/**
 * Méthodes de paiement disponibles pour les clients
 */
export enum ClientPaymentMethod {
  WAVE = 'wave',
  ORANGE_MONEY = 'orange_money',
  MTN_MOMO = 'mtn_momo',
  MOOV_MONEY = 'moov_money',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash'
}

/**
 * Statut d'un paiement client
 */
export enum PaymentStatus {
  PENDING = 'pending',        // En attente de confirmation
  CONFIRMED = 'confirmed',    // Confirmé et validé
  FAILED = 'failed',          // Échec du paiement
  REFUNDED = 'refunded'       // Remboursé
}

/**
 * Statut de paiement d'une facture
 */
export enum InvoicePaymentStatus {
  UNPAID = 'unpaid',          // Aucun paiement
  PARTIAL = 'partial',        // Paiement partiel
  PAID = 'paid',              // Entièrement payée
  OVERDUE = 'overdue',        // En retard
  OVERPAID = 'overpaid'       // Trop payé (rare)
}

/**
 * Interface pour un paiement client individuel
 */
export interface ClientPayment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  method: ClientPaymentMethod;
  accountNumber: string;         // Numéro de téléphone ou compte bancaire
  transactionRef: string;        // Référence de transaction
  status: PaymentStatus;
  paidAt: string;                // Date du paiement
  confirmedAt?: string;          // Date de confirmation
  confirmedBy?: string;          // ID de l'utilisateur qui a confirmé
  notes?: string;                // Notes ou commentaires
  receiptUrl?: string;           // URL du reçu (si disponible)
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface pour les informations de paiement d'une facture
 */
export interface InvoicePaymentInfo {
  totalAmount: number;           // Montant total de la facture
  paidAmount: number;            // Montant déjà payé
  remainingAmount: number;       // Montant restant à payer
  paymentStatus: InvoicePaymentStatus;
  payments: ClientPayment[];     // Historique des paiements
  lastPaymentDate?: string;      // Date du dernier paiement
  paymentCount: number;          // Nombre de paiements effectués
  dueDate?: string;              // Date d'échéance
  isOverdue: boolean;            // Facture en retard?
}

/**
 * Interface pour une facture avec informations de paiement
 */
export interface InvoiceWithPayments {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  vendorName: string;
  vendorId: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paymentInfo: InvoicePaymentInfo;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

/**
 * Interface pour une demande de paiement partiel
 */
export interface PartialPaymentRequest {
  invoiceId: string;
  amount: number;
  method: ClientPaymentMethod;
  accountNumber: string;
  notes?: string;
}

/**
 * Interface pour un lien de paiement unique
 */
export interface PaymentLink {
  id: string;
  invoiceId: string;
  token: string;                 // Token unique pour le lien
  url: string;                   // URL complète du lien
  expiresAt?: string;            // Date d'expiration (optionnel)
  isActive: boolean;             // Lien actif?
  viewCount: number;             // Nombre de fois consulté
  lastViewedAt?: string;         // Dernière consultation
  createdAt: string;
}

/**
 * Fonctions utilitaires pour les paiements
 */

/**
 * Calcule le statut de paiement d'une facture
 */
export function calculatePaymentStatus(
  totalAmount: number,
  paidAmount: number,
  dueDate?: string
): InvoicePaymentStatus {
  if (paidAmount === 0) {
    if (dueDate && new Date(dueDate) < new Date()) {
      return InvoicePaymentStatus.OVERDUE;
    }
    return InvoicePaymentStatus.UNPAID;
  }

  if (paidAmount >= totalAmount) {
    return paidAmount > totalAmount
      ? InvoicePaymentStatus.OVERPAID
      : InvoicePaymentStatus.PAID;
  }

  if (dueDate && new Date(dueDate) < new Date()) {
    return InvoicePaymentStatus.OVERDUE;
  }

  return InvoicePaymentStatus.PARTIAL;
}

/**
 * Calcule le montant restant à payer
 */
export function calculateRemainingAmount(
  totalAmount: number,
  paidAmount: number
): number {
  const remaining = totalAmount - paidAmount;
  return Math.max(0, remaining);
}

/**
 * Vérifie si un montant de paiement est valide
 */
export function isValidPaymentAmount(
  amount: number,
  remainingAmount: number,
  allowOverpayment: boolean = false
): boolean {
  if (amount <= 0) return false;
  if (!allowOverpayment && amount > remainingAmount) return false;
  return true;
}

/**
 * Génère un numéro de référence de transaction unique
 */
export function generateTransactionRef(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `PAY-${timestamp}-${random}`;
}

/**
 * Génère un token unique pour un lien de paiement
 */
export function generatePaymentToken(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

/**
 * Formate un numéro de téléphone ou de compte
 */
export function formatAccountNumber(
  accountNumber: string,
  method: ClientPaymentMethod
): string {
  // Pour les paiements mobiles, formater le numéro de téléphone
  if ([
    ClientPaymentMethod.WAVE,
    ClientPaymentMethod.ORANGE_MONEY,
    ClientPaymentMethod.MTN_MOMO,
    ClientPaymentMethod.MOOV_MONEY
  ].includes(method)) {
    // Supprimer les espaces et caractères spéciaux
    const cleaned = accountNumber.replace(/\D/g, '');
    // Format: +XXX XXX XXX XXX
    if (cleaned.length >= 9) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`.trim();
    }
    return accountNumber;
  }

  return accountNumber;
}

/**
 * Obtient le label d'une méthode de paiement
 */
export function getPaymentMethodLabel(method: ClientPaymentMethod): string {
  const labels: Record<ClientPaymentMethod, string> = {
    [ClientPaymentMethod.WAVE]: 'Wave',
    [ClientPaymentMethod.ORANGE_MONEY]: 'Orange Money',
    [ClientPaymentMethod.MTN_MOMO]: 'MTN Mobile Money',
    [ClientPaymentMethod.MOOV_MONEY]: 'Moov Money',
    [ClientPaymentMethod.BANK_TRANSFER]: 'Virement Bancaire',
    [ClientPaymentMethod.CASH]: 'Espèces'
  };
  return labels[method];
}

/**
 * Obtient la couleur associée à un statut de paiement
 */
export function getPaymentStatusColor(status: InvoicePaymentStatus): string {
  const colors: Record<InvoicePaymentStatus, string> = {
    [InvoicePaymentStatus.UNPAID]: '#6B7280',      // Gris
    [InvoicePaymentStatus.PARTIAL]: '#F59E0B',     // Orange
    [InvoicePaymentStatus.PAID]: '#10B981',        // Vert
    [InvoicePaymentStatus.OVERDUE]: '#EF4444',     // Rouge
    [InvoicePaymentStatus.OVERPAID]: '#8B5CF6'     // Violet
  };
  return colors[status];
}

/**
 * Obtient le label d'un statut de paiement
 */
export function getPaymentStatusLabel(status: InvoicePaymentStatus): string {
  const labels: Record<InvoicePaymentStatus, string> = {
    [InvoicePaymentStatus.UNPAID]: 'Non payée',
    [InvoicePaymentStatus.PARTIAL]: 'Paiement partiel',
    [InvoicePaymentStatus.PAID]: 'Payée',
    [InvoicePaymentStatus.OVERDUE]: 'En retard',
    [InvoicePaymentStatus.OVERPAID]: 'Trop payée'
  };
  return labels[status];
}
