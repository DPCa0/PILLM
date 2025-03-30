class ComplexCalculator {
  constructor() {
    this.cache = new Map();
  }

  fibonacci(n) {
    if (n <= 1) return n;
    if (this.cache.has(n)) return this.cache.get(n);

    let result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
    this.cache.set(n, result);
    return result;
  }

  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }

  debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  processNumbers(numbers, operation = (x) => x ** 2) {
    return numbers.flatMap(operation).reduce((acc, num) => acc + num, 0);
  }
}

 
const calculator = new ComplexCalculator();

 
const debouncedLog = calculator.debounce(console.log, 1000);
debouncedLog('This message is delayed');

 
(async () => {
  try {
    const data = await calculator.fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
})();

 
print('Fibonacci of 10:', calculator.fibonacci(10));
print('Processed Numbers:', calculator.processNumbers([1, 2, 3, 4, 5]));
