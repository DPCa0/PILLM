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
      console.error('Failed to fetch currency rates:', error);
    }
  }

  convert(amount, fromCurrency, toCurrency) {
    const fromRate = this.rates.get(fromCurrency);
    const toRate = this.rates.get(toCurrency);
    if (!fromRate || !toRate) {
      throw new Error('Invalid currency.');
    }
    return ((amount / fromRate) * toRate).toFixed(2);
  }
}

(async () => {
  const converter = new CurrencyConverter();
  await converter.fetchRates();

  const handler = {
    get(target, prop, receiver) {
      if (typeof target[prop] === 'function') {
        return function (...args) {
          try {
            return target[prop].apply(this, args);
          } catch (e) {
            console.error(`Error in method ${prop}: ${e.message}`);
          }
        };
      }
      return Reflect.get(target, prop, receiver);
    }
  };

  const proxyConverter = new Proxy(converter, handler);

  const currencies = ['USD', 'EUR', 'JPY', 'GBP'];
  const randomCurrency = () => currencies[Math.floor(Math.random() * currencies.length)];

  try {
    const from = randomCurrency();
    const to = randomCurrency();
    const amount = Math.floor(Math.random() * 1000);
    print(`Converting ${amount} ${from} to ${to}: ${proxyConverter.convert(amount, from, to)}`);
  } catch (error) {
    console.error('Conversion failed:', error);
  }
})();
