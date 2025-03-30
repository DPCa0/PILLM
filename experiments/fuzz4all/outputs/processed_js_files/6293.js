 

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
  }
  
  async fetchRates() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('Failed to fetch rates');
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error(`Error fetching rates: ${error}`);
    }
  }
  
  async convert(amount, from, to) {
    const rates = await this.fetchRates();
    if (!rates) throw new Error('Rates not available');
    
    const [rateFrom, rateTo] = [rates[from], rates[to]];
    if (!rateFrom || !rateTo) throw new Error(`Currency not supported: ${!rateFrom ? from : to}`);
    
    return ((amount / rateFrom) * rateTo).toFixed(2);
  }
}

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
const sampleAmount = 100;

(async () => {
  const converter = new CurrencyConverter('your-api-key');
  const convertPromises = [];

  for (const fromCurrency of currencies) {
    for (const toCurrency of currencies) {
      if (fromCurrency !== toCurrency) {
        convertPromises.push(
          converter.convert(sampleAmount, fromCurrency, toCurrency)
            .then(result => ({from: fromCurrency, to: toCurrency, amount: result}))
        );
      }
    }
  }
  
  const results = await Promise.all(convertPromises);

  results.forEach(({from, to, amount}) => {
    print(`Converted ${sampleAmount} ${from} to ${amount} ${to}`);
  });
})();
