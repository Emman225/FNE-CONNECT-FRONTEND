/**
 * Calculate totals for a document line item
 */
export const calculateLineTotal = (quantity, price) => {
    return quantity * price;
};

/**
 * Calculate invoice global totals
 * @param {Array} items - List of items {quantity, price}
 * @param {boolean} applyTva - Whether to apply 18% VAT
 * @param {boolean} applyAirsi - Whether to apply 5% AIRSI
 */
export const calculateInvoiceTotals = (items, applyTva = false, applyAirsi = false) => {
    const totalHT = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    let tvaAmount = 0;
    if (applyTva) {
        tvaAmount = Math.round(totalHT * 0.18);
    }

    let airsiAmount = 0;
    // AIRSI is calculated on TTC usually, or specific base depending on regime. 
    // For simplicity here: 5% of TotalHT if Simplifié, 7.5% if Normal.
    // We assume 5% standard retention on services.
    if (applyAirsi) {
        airsiAmount = Math.round(totalHT * 0.05); // 5% standard
    }

    const totalTTC = totalHT + tvaAmount;
    const netToPay = totalTTC - airsiAmount;

    return {
        totalHT,
        tvaAmount,
        airsiAmount,
        totalTTC,
        netToPay
    };
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'XOF' }).format(amount);
};
