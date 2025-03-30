class ComplexCalculator {
  #history = [];

  constructor() {
    print('Complex Calculator Initialized');
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      print('Fetched Data:', data);
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }

  *fibonacci(n) {
    let a = 0, b = 1, i = 0;
    while (i < n) {
      yield a;
      [a, b] = [b, a + b];
      i++;
    }
  }

  calculate(operation, ...numbers) {
    const ops = {
      'sum': (acc, val) => acc + val,
      'multiply': (acc, val) => acc * val
    };
    const result = numbers.reduce(ops[operation]);
    this.#addToHistory({ operation, numbers, result });
    return result;
  }

  #addToHistory(entry) {
    this.#history.push(entry);
  }

  get history() {
    return [...this.#history];
  }
}

const calculator = new ComplexCalculator();
print(calculator.calculate('sum', 1, 2, 3, 4));
print(calculator.calculate('multiply', 1, 2, 3, 4));

for (const num of calculator.fibonacci(5)) {
  print('Fibonacci:', num);
}

(async () => {
  await calculator.fetchData('https://api.example.com/data');
})();

print('Calculation History:', calculator.history);
