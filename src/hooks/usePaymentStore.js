export const usePaymentStore = () => ({
    payCommission: (id, method) => {
        console.log(`Paying commission ${id} via ${method}`);
        return Promise.resolve(true);
    },
    processPayment: (amount, method) => {
        console.log(`Processing payment of ${amount} via ${method}`);
        return Promise.resolve(true);
    }
});
