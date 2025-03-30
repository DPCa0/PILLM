class CurrencyConverter {
    constructor() {
        this.rates = new Map();
    }

    async fetchRates(base = 'USD') {
        const response = await fetch(`https: 
        const data = await response.json();
        this.rates = new Map(Object.entries(data.rates));
    }

    convert(amount, fromCurrency, toCurrency) {
        const rate = this.rates.get(toCurrency) / this.rates.get(fromCurrency);
        return amount * rate;
    }
}

const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
};

const factorial = memoize((n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
});

(async () => {
    const converter = new CurrencyConverter();
    await converter.fetchRates('USD');

    const usdToEur = converter.convert(100, 'USD', 'EUR');
    print(`100 USD is equal to ${usdToEur.toFixed(2)} EUR`);

    print(`Factorial of 5 is ${factorial(5)}`);
    print(`Factorial of 6 is ${factorial(6)}`);
})();
