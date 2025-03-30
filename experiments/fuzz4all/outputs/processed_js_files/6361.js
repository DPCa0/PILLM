 

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.exchangerate-api.com/v4/latest/';
  }

  async fetchRates(baseCurrency) {
    const response = await fetch(`${this.apiUrl}${baseCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    const data = await response.json();
    return data.rates;
  }

  async convert(amount, fromCurrency, toCurrency) {
    const rates = await this.fetchRates(fromCurrency);
    const rate = rates[toCurrency];
    if (!rate) {
      throw new Error(`Unable to find rate for currency: ${toCurrency}`);
    }
    return amount * rate;
  }
}

async function main() {
  try {
    const converter = new CurrencyConverter('your-api-key-here');
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';

    print(`Converting ${amount} ${fromCurrency} to ${toCurrency}...`);

    const convertedAmount = await converter.convert(amount, fromCurrency, toCurrency);
    print(`${amount} ${fromCurrency} is ${convertedAmount.toFixed(2)} ${toCurrency}.`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
