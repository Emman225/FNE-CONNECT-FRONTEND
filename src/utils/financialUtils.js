// financialUtils.js - Utilitaires financiers
export const formatCurrency = (amount, currency = 'XOF') => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    }).format(amount);
};

export const calculateTax = (amount, rate = 0.18) => {
    return amount * rate;
};

export const calculateTotal = (subtotal, tax) => {
    return subtotal + tax;
};

export const calculateInvoiceTotals = (items, applyTva = false, applyAirsi = false) => {
    const totalHT = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tvaAmount = applyTva ? totalHT * 0.18 : 0;
    const totalTTC = totalHT + tvaAmount;
    const airsiAmount = applyAirsi ? totalHT * 0.05 : 0; // AIRSI 5% sur le montant HT généralement (ou 7.5%)
    const netToPay = totalTTC - airsiAmount;

    return {
        totalHT,
        tvaAmount,
        totalTTC,
        airsiAmount,
        netToPay
    };
};
