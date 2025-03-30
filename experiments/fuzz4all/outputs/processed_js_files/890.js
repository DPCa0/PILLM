class CurrencyConverter {
  #exchangeRates;

  constructor(rates) {
    this.#exchangeRates = new Map(Object.entries(rates));
  }

  async convert(amount, from, to) {
    try {
      const rate = await this.#fetchExchangeRate(from, to);
      return amount * rate;
    } catch (error) {
      console.error("Conversion error:", error);
      return null;
    }
  }

  async #fetchExchangeRate(from, to) {
    if (this.#exchangeRates.has(`${from}_${to}`)) {
      return this.#exchangeRates.get(`${from}_${to}`);
    }
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    const rate = data.rates[to];
    if (!rate) throw new Error(`Exchange rate not found for ${to}`);
    this.#exchangeRates.set(`${from}_${to}`, rate);
    return rate;
  }
}

(async () => {
  const rates = { "USD_EUR": 0.85, "EUR_USD": 1.17 };
  const converter = new CurrencyConverter(rates);
  const amount = await converter.convert(100, "USD", "EUR");
  print(`Converted amount: ${amount.toFixed(2)} EUR`);
})();
