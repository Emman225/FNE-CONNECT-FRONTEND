/**
 * Types pour les retraits (Payouts) avec workflow de validation
 */

// ==================== ENUMS ====================

/**
 * Statuts de retrait avec workflow de validation à deux niveaux
 */
export enum PayoutStatus {
  PENDING_FINANCE = 'pending_finance',     // En attente de validation Finance
  PENDING_ADMIN = 'pending_admin',         // Validé par Finance, en attente Admin
  APPROVED = 'approved',                   // Validé par Admin, en cours de traitement
  COMPLETED = 'completed',                 // Retrait effectué
  REJECTED_FINANCE = 'rejected_finance',   // Rejeté par Finance
  REJECTED_ADMIN = 'rejected_admin',       // Rejeté par Admin
  CANCELLED = 'cancelled'                  // Annulé par le vendeur
}

/**
 * Méthodes de retrait
 */
export enum WithdrawalMethod {
  WAVE = 'wave',
  ORANGE_MONEY = 'orange_money',
  MTN_MOMO = 'mtn_momo',
  MOOV_MONEY = 'moov_money',
  BANK_TRANSFER = 'bank_transfer'
}

// ==================== INTERFACES ====================

/**
 * Action de validation (Finance ou Admin)
 */
export interface ValidationAction {
  role: 'FINANCE' | 'ADMIN';
  userId: string;
  userName: string;
  action: 'approved' | 'rejected';
  reason?: string; // Motif du rejet (obligatoire si rejeté)
  timestamp: Date;
  comments?: string;
}

/**
 * Retrait (Payout) avec workflow de validation
 */
export interface Payout {
  id: string;
  reference: string;

  // Vendeur
  vendorId: string;
  vendorName: string;
  vendorAccountNumber: string;

  // Facture liée (optionnelle pour les retraits de solde général)
  invoiceId?: string;
  invoiceNumber?: string;

  // Montants
  grossAmount: number;         // Montant brut (total facture)
  commissionAmount: number;    // Commission FNE prélevée
  netAmount: number;           // Montant net à reverser

  // Méthode de retrait
  method: WithdrawalMethod;
  accountInfo: string;         // Numéro de compte / téléphone

  // Workflow de validation
  status: PayoutStatus;
  financeValidation?: ValidationAction;
  adminValidation?: ValidationAction;

  // Métadonnées
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;          // Date de traitement effectif
  completedAt?: Date;          // Date de completion

  // Solde vendeur après retrait
  vendorBalanceAfter?: number;

  // Notes additionnelles
  vendorNotes?: string;        // Notes du vendeur lors de la demande
}

/**
 * Requête de retrait (créée par le vendeur)
 */
export interface WithdrawalRequest {
  amount: number;
  method: WithdrawalMethod;
  accountInfo: string;
  notes?: string;
}

/**
 * Requête de validation (Finance ou Admin)
 */
export interface ValidationRequest {
  payoutId: string;
  action: 'approve' | 'reject';
  reason?: string;    // Obligatoire si reject
  comments?: string;
}

/**
 * Statistiques des retraits
 */
export interface PayoutStats {
  totalPendingFinance: number;
  totalPendingFinanceAmount: number;
  totalPendingAdmin: number;
  totalPendingAdminAmount: number;
  totalApproved: number;
  totalApprovedAmount: number;
  totalCompleted: number;
  totalCompletedAmount: number;
  totalRejected: number;
  totalRejectedAmount: number;
}

// ==================== CONSTANTS ====================

export const PAYOUT_STATUS_LABELS: Record<PayoutStatus, string> = {
  [PayoutStatus.PENDING_FINANCE]: 'En attente Finance',
  [PayoutStatus.PENDING_ADMIN]: 'En attente Admin',
  [PayoutStatus.APPROVED]: 'Approuvé',
  [PayoutStatus.COMPLETED]: 'Effectué',
  [PayoutStatus.REJECTED_FINANCE]: 'Rejeté par Finance',
  [PayoutStatus.REJECTED_ADMIN]: 'Rejeté par Admin',
  [PayoutStatus.CANCELLED]: 'Annulé'
};

export const PAYOUT_STATUS_COLORS: Record<PayoutStatus, string> = {
  [PayoutStatus.PENDING_FINANCE]: '#F59E0B',      // Orange
  [PayoutStatus.PENDING_ADMIN]: '#3B82F6',        // Bleu
  [PayoutStatus.APPROVED]: '#8B5CF6',             // Violet
  [PayoutStatus.COMPLETED]: '#10B981',            // Vert
  [PayoutStatus.REJECTED_FINANCE]: '#EF4444',     // Rouge
  [PayoutStatus.REJECTED_ADMIN]: '#DC2626',       // Rouge foncé
  [PayoutStatus.CANCELLED]: '#6B7280'             // Gris
};

export const WITHDRAWAL_METHOD_LABELS: Record<WithdrawalMethod, string> = {
  [WithdrawalMethod.WAVE]: 'Wave',
  [WithdrawalMethod.ORANGE_MONEY]: 'Orange Money',
  [WithdrawalMethod.MTN_MOMO]: 'MTN Mobile Money',
  [WithdrawalMethod.MOOV_MONEY]: 'Moov Money',
  [WithdrawalMethod.BANK_TRANSFER]: 'Virement Bancaire'
};

/**
 * Vérifier si un retrait peut être validé par Finance
 */
export const canFinanceValidate = (status: PayoutStatus): boolean => {
  return status === PayoutStatus.PENDING_FINANCE;
};

/**
 * Vérifier si un retrait peut être validé par Admin
 */
export const canAdminValidate = (status: PayoutStatus): boolean => {
  return status === PayoutStatus.PENDING_ADMIN;
};

/**
 * Obtenir le prochain statut après validation Finance
 */
export const getNextStatusAfterFinance = (action: 'approve' | 'reject'): PayoutStatus => {
  return action === 'approve'
    ? PayoutStatus.PENDING_ADMIN
    : PayoutStatus.REJECTED_FINANCE;
};

/**
 * Obtenir le prochain statut après validation Admin
 */
export const getNextStatusAfterAdmin = (action: 'approve' | 'reject'): PayoutStatus => {
  return action === 'approve'
    ? PayoutStatus.APPROVED
    : PayoutStatus.REJECTED_ADMIN;
};
