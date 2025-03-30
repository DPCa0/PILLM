class CurrencyConverter {
    constructor(rates) {
        this.rates = rates;
    }

    convert(amount, fromCurrency, toCurrency) {
        if (!this.rates[fromCurrency] || !this.rates[toCurrency]) {
            throw new Error('Invalid currency.');
        }
        const rate = this.rates[toCurrency] / this.rates[fromCurrency];
        return (amount * rate).toFixed(2);
    }
}

const fetchRates = async () => {
    try {
        let response = await fetch('https://api.exchangeratesapi.io/latest');
        let data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
    }
};

(async () => {
    try {
        let rates = await fetchRates();
        if (!rates) throw new Error('Rates could not be retrieved');
        let converter = new CurrencyConverter(rates);
        let amount = 100;
        let convertedAmount = converter.convert(amount, 'USD', 'EUR');
        print(`$${amount} USD is ${convertedAmount} EUR`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
