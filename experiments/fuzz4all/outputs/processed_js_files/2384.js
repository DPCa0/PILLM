class CurrencyConverter {
    constructor() {
        this.rates = {
            USD: 1.0,
            EUR: 0.85,
            GBP: 0.75
        };
    }

    async fetchRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            this.rates = data.rates;
        } catch (error) {
            console.error('Failed to fetch rates:', error);
        }
    }

    convert(amount, from, to) {
        const fromRate = this.rates[from];
        const toRate = this.rates[to];
        if (!fromRate || !toRate) {
            throw new Error(`Conversion from ${from} to ${to} is not supported.`);
        }
        return (amount / fromRate) * toRate;
    }
}

(async () => {
    const converter = new CurrencyConverter();
    await converter.fetchRates();
    const amount = 100;
    const convertedAmount = converter.convert(amount, 'USD', 'EUR');
    print(`$${amount} USD is approximately €${convertedAmount.toFixed(2)} EUR`);
})();
