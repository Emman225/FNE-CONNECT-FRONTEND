import { useMemo } from 'react';
import {
    LineItem,
    AdditionalTax,
    GlobalDiscount,
    TotalTax,
    InvoiceTotals,
    TaxRateCode,
    TAX_RATE_VALUES,
    TAX_RATE_LABELS
} from '../types/invoice.types';

/**
 * Hook personnalisé pour gérer tous les calculs automatiques
 * de la facturation en temps réel
 */
export function useInvoiceCalculations(
    lineItems: LineItem[],
    additionalTaxes: AdditionalTax[],
    globalDiscount: GlobalDiscount,
    totalTaxes: TotalTax[],
    acompte: number = 0
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
        let totalTaxAmount = 0;
        lineItems.forEach(item => {
            const lineTotalHT = calculateLineItemTotal(item);
            const rate = TAX_RATE_VALUES[item.taxCode] || 0;
            totalTaxAmount += (lineTotalHT * rate) / 100;

            // Taxes supplémentaires par ligne
            if (item.additionalTaxes) {
                item.additionalTaxes.forEach(tax => {
                    totalTaxAmount += (lineTotalHT * tax.percent) / 100;
                });
            }
        });

        // 5️⃣ Calcul des autres taxes (globales)
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

        const taxSummaryMap = new Map<string, { label: string; baseHT: number; amount: number; rate: number }>();
        lineItems.forEach(item => {
            const lineHT = calculateLineItemTotal(item);

            // Taxe principale
            const rate = TAX_RATE_VALUES[item.taxCode] || 0;
            const taxAmount = (lineHT * rate) / 100;

            if (taxAmount > 0 || rate > 0) {
                const existing = taxSummaryMap.get(item.taxCode) || { label: TAX_RATE_LABELS[item.taxCode], baseHT: 0, amount: 0, rate };
                taxSummaryMap.set(item.taxCode, {
                    ...existing,
                    baseHT: existing.baseHT + lineHT,
                    amount: existing.amount + taxAmount
                });
            }

            // Taxes additionnelles par ligne
            if (item.additionalTaxes) {
                item.additionalTaxes.forEach(tax => {
                    const addTaxAmount = (lineHT * tax.percent) / 100;
                    if (addTaxAmount > 0) {
                        const key = `ADD_${tax.name}`;
                        const existing = taxSummaryMap.get(key) || { label: tax.name, baseHT: 0, amount: 0, rate: tax.percent };
                        taxSummaryMap.set(key, {
                            ...existing,
                            baseHT: existing.baseHT + lineHT,
                            amount: existing.amount + addTaxAmount
                        });
                    }
                });
            }
        });

        // Taxes additionnelles globales (sur HT)
        additionalTaxes.forEach(tax => {
            const taxAmount = (totalAfterDiscount * tax.percent) / 100;
            if (taxAmount > 0 || tax.percent > 0) {
                const key = `GLOBAL_ADD_${tax.id}`;
                taxSummaryMap.set(key, {
                    label: tax.name || 'Autre taxe',
                    baseHT: totalAfterDiscount,
                    amount: taxAmount,
                    rate: tax.percent
                });
            }
        });

        // Taxes sur le total TTC (ex: AIRSI)
        totalTaxes.forEach(tax => {
            const taxAmount = (ttcBeforeFinalTaxes * tax.percent) / 100;
            if (taxAmount > 0 || tax.percent > 0) {
                const key = `TTC_${tax.id}`;
                taxSummaryMap.set(key, {
                    label: tax.name || 'Taxe sur TTC',
                    baseHT: ttcBeforeFinalTaxes, // C'est une base TTC mais on utilise le même champ pour l'affichage
                    amount: taxAmount,
                    rate: tax.percent
                });
            }
        });

        const taxSummary = Array.from(taxSummaryMap.entries()).map(([key, data]) => ({
            code: (key.startsWith('ADD_') || key.startsWith('TTC_') || key.startsWith('GLOBAL_ADD_') ? TaxRateCode.NONE : key) as TaxRateCode,
            label: data.label,
            baseHT: roundToTwo(data.baseHT),
            rate: data.rate,
            amount: roundToTwo(data.amount)
        }));

        const finalNetAPayer = totalTTC - acompte;

        return {
            subtotalHT: roundToTwo(subtotalHT),
            totalDiscount: roundToTwo(totalDiscount),
            totalAfterDiscount: roundToTwo(totalAfterDiscount),
            totalTaxAmount: roundToTwo(totalTaxAmount),
            totalAdditionalTaxes: roundToTwo(totalAdditionalTaxes),
            totalTTCTaxes: roundToTwo(totalTTCTaxes),
            totalTTC: roundToTwo(totalTTC),
            netAPayer: roundToTwo(finalNetAPayer),
            taxSummary
        };
    }, [lineItems, additionalTaxes, globalDiscount, totalTaxes, acompte]);
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
    const rate = TAX_RATE_VALUES[item.taxCode] || 0;
    const taxAmount = (lineTotalHT * rate) / 100;
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
        taxCode: TaxRateCode.TVA_18,
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
