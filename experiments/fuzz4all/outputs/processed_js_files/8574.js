class CurrencyConverter {
    constructor() {
        this.rates = new Map();
    }
  
    async fetchRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            this.rates = new Map(Object.entries(data.rates));
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    }

    convert(amount, fromCurrency, toCurrency) {
        if (!this.rates.has(fromCurrency) || !this.rates.has(toCurrency)) {
            throw new Error('Invalid currency.');
        }
        const rateFromBase = this.rates.get(toCurrency) / this.rates.get(fromCurrency);
        return (amount * rateFromBase).toFixed(2);
    }
}

(async () => {
    const converter = new CurrencyConverter();
    await converter.fetchRates();

     
    const ratesHandler = {
        get(target, prop) {
            if (!target[prop]) {
                console.warn(`Rate for ${prop} not found. Defaulting to 1.`);
                return 1;
            }
            return target[prop];
        },
        set(target, prop, value) {
            print(`Setting rate for ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
    };

    const ratesProxy = new Proxy(converter.rates, ratesHandler);
    
     
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    
    print(`${amount} ${fromCurrency} is ${converter.convert(amount, fromCurrency, toCurrency)} ${toCurrency}`);
    
     
    print('Rate for ABC:', ratesProxy.get('ABC'));
    
     
    ratesProxy.set('GBP', 0.75);

    print(`New rate for GBP: ${ratesProxy.get('GBP')}`);
})();
