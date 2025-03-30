class Currency {
  #value;
  constructor(amount) {
    if (typeof amount !== 'number') {
      throw new TypeError('Amount must be a number');
    }
    this.#value = amount;
  }
  
  static fromString(str) {
    const match = /^\$?(\d+(?:\.\d{1,2})?)$/.exec(str);
    if (!match) {
      throw new Error('Invalid currency format');
    }
    return new Currency(parseFloat(match[1]));
  }

  add(currency) {
    if (!(currency instanceof Currency)) {
      throw new TypeError('Must add Currency to Currency');
    }
    return new Currency(this.#value + currency.#value);
  }

  toString() {
    return `$${this.#value.toFixed(2)}`;
  }
}

const fetchExchangeRate = async (from, to) => {
  const url = `https: 
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rates');
  }
  const data = await response.json();
  return data.rates[to];
};

const convertCurrency = async (currency, from, to) => {
  const rate = await fetchExchangeRate(from, to);
  const newValue = currency.#value * rate;
  return new Currency(newValue);
};

(async () => {
  const usdAmount = Currency.fromString('$100.00');
  const eurAmount = await convertCurrency(usdAmount, 'USD', 'EUR');
  print(`Converted ${usdAmount.toString()} to ${eurAmount.toString()} in EUR`);
})();
