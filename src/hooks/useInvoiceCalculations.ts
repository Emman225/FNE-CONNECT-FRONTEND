import { useMemo } from 'react';
import type {
    LineItem,
    AdditionalTax,
    GlobalDiscount,
    TotalTax,
    InvoiceTotals
} from '../types/invoice.types';

/**
 * Hook personnalisé pour gérer tous les calculs automatiques
 * de la facturation en temps réel
 */
export function useInvoiceCalculations(
    lineItems: LineItem[],
    additionalTaxes: AdditionalTax[],
    globalDiscount: GlobalDiscount,
    totalTaxes: TotalTax[]
): InvoiceTotals {

    return useMemo(() => {
        // 1️⃣ Calcul du sous-total HT (somme de tous les totaux HT des lignes)
        const subtotalHT = lineItems.reduce((sum, item) => {
            const lineTotal = calculateLineItemTotal(item);
            return sum + lineTotal;
        }, 0);

        // 2️⃣ Calcul de la remise globale
        const totalDiscount = (subtotalHT * globalDiscount.percent) / 100;

        // 3️⃣ Total après remise globale
        const totalAfterDiscount = subtotalHT - totalDiscount;

        // 4️⃣ Calcul du montant total des taxes (sur les lignes)
        const totalTaxAmount = lineItems.reduce((sum, item) => {
            const lineTotalHT = calculateLineItemTotal(item);
            const taxAmount = (lineTotalHT * item.taxRate) / 100;
            return sum + taxAmount;
        }, 0);

        // 5️⃣ Calcul des autres taxes
        const totalAdditionalTaxes = additionalTaxes.reduce((sum, tax) => {
            const taxAmount = (totalAfterDiscount * tax.percent) / 100;
            return sum + taxAmount;
        }, 0);

        // 6️⃣ Calcul du TTC avant taxes finales
        const ttcBeforeFinalTaxes = totalAfterDiscount + totalTaxAmount + totalAdditionalTaxes;

        // 7️⃣ Calcul des taxes sur le total TTC
        const totalTTCTaxes = totalTaxes.reduce((sum, tax) => {
            const taxAmount = (ttcBeforeFinalTaxes * tax.percent) / 100;
            return sum + taxAmount;
        }, 0);

        // 8️⃣ Total final TTC
        const totalTTC = ttcBeforeFinalTaxes + totalTTCTaxes;

        return {
            subtotalHT: roundToTwo(subtotalHT),
            totalDiscount: roundToTwo(totalDiscount),
            totalAfterDiscount: roundToTwo(totalAfterDiscount),
            totalTaxAmount: roundToTwo(totalTaxAmount),
            totalAdditionalTaxes: roundToTwo(totalAdditionalTaxes),
            totalTTCTaxes: roundToTwo(totalTTCTaxes),
            totalTTC: roundToTwo(totalTTC)
        };
    }, [lineItems, additionalTaxes, globalDiscount, totalTaxes]);
}

/**
 * Calcule le total HT d'une ligne d'article
 * Formule : Quantité × Prix Unitaire × (1 - Remise%)
 */
export function calculateLineItemTotal(item: LineItem): number {
    const { quantity, unitPriceHT, discountPercent } = item;

    if (!quantity || !unitPriceHT) return 0;

    const subtotal = quantity * unitPriceHT;
    const discountAmount = (subtotal * (discountPercent || 0)) / 100;
    const total = subtotal - discountAmount;

    return roundToTwo(total);
}

/**
 * Calcule le montant de taxe pour une ligne
 */
export function calculateLineItemTax(item: LineItem): number {
    const lineTotalHT = calculateLineItemTotal(item);
    const taxAmount = (lineTotalHT * item.taxRate) / 100;
    return roundToTwo(taxAmount);
}

/**
 * Calcule le montant d'une taxe supplémentaire
 */
export function calculateAdditionalTaxAmount(
    baseAmount: number,
    taxPercent: number
): number {
    return roundToTwo((baseAmount * taxPercent) / 100);
}

/**
 * Calcule le montant de remise globale
 */
export function calculateGlobalDiscountAmount(
    subtotal: number,
    discountPercent: number
): number {
    return roundToTwo((subtotal * discountPercent) / 100);
}

/**
 * Arrondit à 2 décimales
 */
function roundToTwo(num: number): number {
    return Math.round(num * 100) / 100;
}

/**
 * Formate un montant en devise
 */
export function formatCurrency(
    amount: number,
    currency: string = 'XAF',
    locale: string = 'fr-FR'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Formate un pourcentage
 */
export function formatPercent(value: number): string {
    return `${value.toFixed(2)}%`;
}

/**
 * Hook pour valider un article
 */
export function validateLineItem(item: Partial<LineItem>): string[] {
    const errors: string[] = [];

    if (!item.quantity || item.quantity <= 0) {
        errors.push('La quantité doit être supérieure à 0');
    }

    if (!item.designation || item.designation.trim() === '') {
        errors.push('La désignation est obligatoire');
    }

    if (!item.unitPriceHT || item.unitPriceHT <= 0) {
        errors.push('Le prix unitaire doit être supérieur à 0');
    }

    if (item.discountPercent && (item.discountPercent < 0 || item.discountPercent > 100)) {
        errors.push('La remise doit être entre 0% et 100%');
    }

    return errors;
}

/**
 * Crée une nouvelle ligne d'article vide
 */
export function createEmptyLineItem(): Partial<LineItem> {
    return {
        id: crypto.randomUUID(),
        quantity: 1,
        reference: '',
        designation: '',
        unitOfMeasure: 'PIECE' as any,
        unitPriceHT: 0,
        discountPercent: 0,
        taxRate: 18 as any,
        totalHT: 0
    };
}

/**
 * Crée une nouvelle taxe supplémentaire vide
 */
export function createEmptyAdditionalTax(): Partial<AdditionalTax> {
    return {
        id: crypto.randomUUID(),
        name: '',
        percent: 0
    };
}

/**
 * Crée une nouvelle taxe sur TTC vide
 */
export function createEmptyTotalTax(): Partial<TotalTax> {
    return {
        id: crypto.randomUUID(),
        name: '',
        percent: 0,
        amount: 0
    };
}
