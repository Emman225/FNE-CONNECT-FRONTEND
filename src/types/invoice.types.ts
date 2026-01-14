/**
 * Types TypeScript pour les formulaires de facturation
 * (Devis, Proforma, Facture)
 */

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

export enum TaxRate {
  RATE_0 = 0,
  RATE_5 = 5,
  RATE_10 = 10,
  RATE_15 = 15,
  RATE_18 = 18,
  RATE_20 = 20
}

// ==================== INTERFACES ====================

/**
 * Information client (affichage conditionnel selon BillingType)
 */
export interface ClientInfo {
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
  taxRate: TaxRate;
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
}

/**
 * État complet du formulaire de facturation
 */
export interface InvoiceFormData {
  // Section 1 : Type de document et facturation
  documentType: DocumentType;
  billingType: BillingType;
  paymentMethod: PaymentMethod;
  hasRNE: boolean;
  rneNumber?: string;

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

  // Totaux calculés
  totals: InvoiceTotals;

  // Métadonnées
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'draft' | 'submitted' | 'approved' | 'rejected';
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

export const TAX_RATE_OPTIONS: SelectOption[] = [
  { value: 0, label: '0%' },
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
  { value: 15, label: '15%' },
  { value: 18, label: '18%' },
  { value: 20, label: '20%' }
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
