/**
 * Types TypeScript pour les formulaires de facturation
 * (Devis, Proforma, Facture)
 */

import { InvoicePaymentInfo } from './clientPayment.types';

// ==================== ENUMS ====================

export enum DocumentType {
  QUOTE = 'QUOTE',
  PROFORMA = 'PROFORMA',
  INVOICE = 'INVOICE'
}

export enum BillingType {
  B2B = 'B2B', // Business to Business
  B2C = 'B2C', // Business to Consumer
  B2F = 'B2F', // Business to Foreign
  B2G = 'B2G'  // Business to Government
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CREDIT_CARD = 'CREDIT_CARD',
  MOBILE_MONEY = 'MOBILE_MONEY',
  BANK_BILL = 'BANK_BILL', // A terme
  OTHER = 'OTHER'
}

export enum UnitOfMeasure {
  PIECE = 'PIECE',
  KG = 'KG',
  GRAM = 'GRAM',
  METER = 'METER',
  LITER = 'LITER',
  HOUR = 'HOUR',
  DAY = 'DAY',
  MONTH = 'MONTH',
  PACKAGE = 'PACKAGE',
  OTHER = 'OTHER'
}

export enum TaxRateCode {
  TVA_18 = 'TVA_18',      // TVA normal - 18,00% (A)
  TVA_9 = 'TVA_9',        // TVA réduite - 09,00% (B)
  TVA_0_C = 'TVA_0_C',    // TVA exo.conv - 00,00% (C)
  TVA_0_D = 'TVA_0_D',    // TVA exo.lég - 00,00% (D)
  TVA_0_E = 'TVA_0_E',    // TVA exo export
  TOB_5 = 'TOB_5',        // Taxe sur les Opérations Bancaires (5%)
  TOB_10 = 'TOB_10',      // Taxe sur les Opérations Bancaires (10%)
  TDT = 'TDT',            // Taxe pour le Développement Touristique
  NONE = 'NONE'           // Pas de taxe
}

// ==================== INTERFACES ====================

/**
 * Information client (affichage conditionnel selon BillingType)
 */
export interface ClientInfo {
  id?: string;
  // Commun à tous les types
  clientName: string;
  phone?: string;
  email?: string;
  additionalNotes?: string;
  footerText?: string;

  // Spécifique B2B
  ncc?: string; // Numéro de Compte Contribuable

  // Spécifique B2F (International)
  currency?: string;
  exchangeRate?: number;
}

/**
 * Ligne d'article dans la facture
 */
export interface LineItem {
  id: string;
  quantity: number;
  reference: string;
  designation: string;
  unitOfMeasure: UnitOfMeasure;
  unitPriceHT: number; // Hors Taxe
  discountPercent: number;
  taxCode: TaxRateCode;
  additionalTaxes?: AdditionalTax[]; // Taxes supplémentaires par ligne
  totalHT: number; // Calculé automatiquement
}

/**
 * Taxe supplémentaire
 */
export interface AdditionalTax {
  id: string;
  name: string;
  percent: number;
}

/**
 * Remise globale
 */
export interface GlobalDiscount {
  percent: number;
  amount: number; // Calculé automatiquement
}

/**
 * Taxe sur le total TTC
 */
export interface TotalTax {
  id: string;
  name: string;
  percent: number;
  amount: number; // Calculé automatiquement
}

/**
 * Commission FNE Connect
 */
export interface InvoiceCommission {
  rate: number; // Taux de commission (ex: 0.025 pour 2.5%)
  amount: number; // Montant calculé
  status: 'unpaid' | 'paid' | 'refunded';
  paidAt?: Date;
  paymentMethod?: string;
  transactionRef?: string;
}

/**
 * Totaux calculés
 */
export interface InvoiceTotals {
  subtotalHT: number; // Sous-total Hors Taxe
  totalDiscount: number; // Montant total des remises
  totalAfterDiscount: number; // Total après remise globale
  totalTaxAmount: number; // Montant total des taxes (lignes)
  totalAdditionalTaxes: number; // Montant des autres taxes
  totalTTCTaxes: number; // Montant des taxes sur TTC
  totalTTC: number; // Total Toutes Taxes Comprises
  netAPayer: number; // TTC - Acompte
  taxSummary: Array<{
    code: TaxRateCode;
    label: string;
    baseHT: number;
    rate: number;
    amount: number;
  }>;
}

/**
 * État complet du formulaire de facturation
 */
export interface InvoiceFormData {
  id?: string | number;
  dgiUid?: string;
  dgiQrCode?: string;
  dgiSynced?: boolean;
  fneOfficialPdfPath?: string;
  issuer?: {
    name: string;
    ncc: string;
    address: string;
    phone: string;
    email: string;
    city?: string;
    rccm?: string;
    regime?: string;
    center?: string;
    bank?: string;
    legalFooter?: string;
  };
  // Section 1 : Type de document et facturation
  documentType: DocumentType;
  billingType: BillingType;
  serviceType?: 'vente_article' | 'prestation_services';
  paymentMethod: PaymentMethod;
  hasRNE: boolean;
  rneNumber?: string;
  dueDate?: string;

  // Section 2 : Informations client
  clientInfo: ClientInfo;

  // Section 3 : Articles
  lineItems: LineItem[];

  // Section 4 : Autres taxes
  additionalTaxes: AdditionalTax[];

  // Section 5 : Remise globale
  globalDiscount: GlobalDiscount;

  // Section 6 : Taxes sur le total TTC
  totalTaxes: TotalTax[];

  // Section 7 : Documents joints
  purchaseOrderFile?: string | File; // Bon de commande ou contrat
  deliveryNoteFile?: string | File;  // Bon de livraison

  // Acompte
  acompte: number;

  // Totaux calculés
  totals: InvoiceTotals;

  // Commission FNE Connect
  commission?: InvoiceCommission;

  // Informations de paiement client (paiements partiels)
  paymentInfo?: InvoicePaymentInfo;

  // Lien de paiement public
  paymentLink?: {
    token: string;
    url: string;
    expiresAt?: string;
    isActive: boolean;
  };

  // Métadonnées
  invoiceNumber?: string;
  accountNumber?: string;
  isComplete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'draft' | 'sent' | 'paid' | 'partially_paid' | 'cancelled' | 'overdue';
}

/**
 * Erreurs de validation
 */
export interface ValidationErrors {
  documentType?: string;
  billingType?: string;
  paymentMethod?: string;
  rneNumber?: string;
  clientInfo?: Partial<Record<keyof ClientInfo, string>>;
  lineItems?: Record<string, Partial<Record<keyof LineItem, string>>>;
  additionalTaxes?: Record<string, Partial<Record<keyof AdditionalTax, string>>>;
  globalDiscount?: Partial<Record<keyof GlobalDiscount, string>>;
  totalTaxes?: Record<string, Partial<Record<keyof TotalTax, string>>>;
}

/**
 * Props pour le composant principal
 */
export interface InvoiceFormProps {
  invoiceId?: string;
  initialData?: Partial<InvoiceFormData>;
  onSubmit: (data: InvoiceFormData) => Promise<void>;
  onCancel?: () => void;
  onSaveDraft?: (data: InvoiceFormData) => Promise<void>;
  isLoading?: boolean;
  readonly?: boolean;
  watermarkText?: string;
  submitLabel?: string;
  headerTitle?: string;
}

/**
 * Options pour les selects
 */
export interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
  description?: string;
}

// ==================== CONSTANTS ====================

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  [DocumentType.QUOTE]: 'Devis',
  [DocumentType.PROFORMA]: 'Proforma',
  [DocumentType.INVOICE]: 'Facture'
};

export const BILLING_TYPE_LABELS: Record<BillingType, string> = {
  [BillingType.B2B]: 'Entreprise (B2B)',
  [BillingType.B2C]: 'Consommateur final (B2C)',
  [BillingType.B2F]: 'Client international (B2F)',
  [BillingType.B2G]: 'État & collectivités (B2G)'
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: 'Espèces',
  [PaymentMethod.BANK_TRANSFER]: 'Virement bancaire',
  [PaymentMethod.CHECK]: 'Chèque',
  [PaymentMethod.CREDIT_CARD]: 'Carte de crédit',
  [PaymentMethod.MOBILE_MONEY]: 'Mobile Money',
  [PaymentMethod.BANK_BILL]: 'A terme',
  [PaymentMethod.OTHER]: 'Autre'
};

export const UNIT_OF_MEASURE_LABELS: Record<UnitOfMeasure, string> = {
  [UnitOfMeasure.PIECE]: 'Pièce',
  [UnitOfMeasure.KG]: 'Kilogramme',
  [UnitOfMeasure.GRAM]: 'Gramme',
  [UnitOfMeasure.METER]: 'Mètre',
  [UnitOfMeasure.LITER]: 'Litre',
  [UnitOfMeasure.HOUR]: 'Heure',
  [UnitOfMeasure.DAY]: 'Jour',
  [UnitOfMeasure.MONTH]: 'Mois',
  [UnitOfMeasure.PACKAGE]: 'Colis',
  [UnitOfMeasure.OTHER]: 'Autre'
};

export const TAX_RATE_VALUES: Record<TaxRateCode, number> = {
  [TaxRateCode.TVA_18]: 18,
  [TaxRateCode.TVA_9]: 9,
  [TaxRateCode.TVA_0_C]: 0,
  [TaxRateCode.TVA_0_D]: 0,
  [TaxRateCode.TVA_0_E]: 0,
  [TaxRateCode.TOB_5]: 5,
  [TaxRateCode.TOB_10]: 10,
  [TaxRateCode.TDT]: 2,
  [TaxRateCode.NONE]: 0
};

export const TAX_RATE_LABELS: Record<TaxRateCode, string> = {
  [TaxRateCode.TVA_18]: 'TVA normal - 18,00% (A)',
  [TaxRateCode.TVA_9]: 'TVA réduite - 09,00% (B)',
  [TaxRateCode.TVA_0_C]: 'TVA exo.conv - 00,00% (C)',
  [TaxRateCode.TVA_0_D]: 'TVA exo.lég - 00,00% (D)',
  [TaxRateCode.TVA_0_E]: 'TVA exo export',
  [TaxRateCode.TOB_5]: 'Taxe sur Op. Bancaires (5%)',
  [TaxRateCode.TOB_10]: 'Taxe sur Op. Bancaires (10%)',
  [TaxRateCode.TDT]: 'Taxe Dév. Touristique',
  [TaxRateCode.NONE]: 'Sans taxe'
};

export const TAX_RATE_OPTIONS: SelectOption[] = [
  { value: TaxRateCode.TVA_18, label: 'TVA normal - 18,00% (A)' },
  { value: TaxRateCode.TVA_9, label: 'TVA réduite - 09,00% (B)' },
  { value: TaxRateCode.TVA_0_C, label: 'TVA exo.conv - 00,00% (C)' },
  { value: TaxRateCode.TVA_0_D, label: 'TVA exo.lég - 00,00% (D)' },
  { value: TaxRateCode.TVA_0_E, label: 'TVA exo export' },
  { value: TaxRateCode.TOB_5, label: 'Taxe sur Op. Bancaires (5%)' },
  { value: TaxRateCode.TOB_10, label: 'Taxe sur Op. Bancaires (10%)' },
  { value: TaxRateCode.TDT, label: 'Taxe Dév. Touristique' }
];

export const CURRENCY_OPTIONS: SelectOption[] = [
  { value: 'XAF', label: 'XAF - Franc CFA', description: 'Afrique Centrale' },
  { value: 'EUR', label: 'EUR - Euro', description: 'Europe' },
  { value: 'USD', label: 'USD - Dollar américain', description: 'États-Unis' },
  { value: 'GBP', label: 'GBP - Livre sterling', description: 'Royaume-Uni' },
  { value: 'XOF', label: 'XOF - Franc CFA', description: 'Afrique de l\'Ouest' },
  { value: 'GNF', label: 'GNF - Franc guinéen', description: 'Guinée' },
  { value: 'NGN', label: 'NGN - Naira', description: 'Nigeria' }
];
