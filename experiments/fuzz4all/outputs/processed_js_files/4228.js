class AdvancedMath {
  static #factorialMemo = new Map();

  static #factorial(n) {
    if (n <= 1) return 1;
    if (this.#factorialMemo.has(n)) return this.#factorialMemo.get(n);
    const result = n * this.#factorial(n - 1);
    this.#factorialMemo.set(n, result);
    return result;
  }

  static fibonacci(n) {
    return n <= 1 ? n : this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  static calculateComplexExpression(n) {
    return (this.#factorial(n) + this.fibonacci(n)) / (n || 1);
  }
}

async function fetchDataAndCalculate(url, transformer) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    const transformedData = transformer(data);
    print('Transformed Data:', transformedData);
    print('Complex Calculation Result:', AdvancedMath.calculateComplexExpression(transformedData));
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

const url = 'https://jsonplaceholder.typicode.com/todos/1';
const transformer = ({ id, userId }) => id + userId;

fetchDataAndCalculate(url, transformer);
