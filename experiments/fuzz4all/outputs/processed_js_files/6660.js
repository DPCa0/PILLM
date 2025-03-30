class CurrencyConverter {
    constructor(rates) {
        this.rates = rates;
    }

    convert(amount, fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) return amount;
        const rate = this.rates[fromCurrency][toCurrency];
        if (!rate) throw new Error('Conversion rate not found.');
        return amount * rate;
    }

    static async fetchRates() {
         
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    USD: { EUR: 0.85, GBP: 0.75 },
                    EUR: { USD: 1.18, GBP: 0.88 },
                    GBP: { USD: 1.34, EUR: 1.14 },
                });
            }, 1000);
        });
    }
}

(async () => {
    const rates = await CurrencyConverter.fetchRates();
    const converter = new CurrencyConverter(rates);

    const [amount, fromCurrency, toCurrency] = [100, 'USD', 'EUR'];
    const convertedAmount = converter.convert(amount, fromCurrency, toCurrency);

    print(`Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`);
})();
