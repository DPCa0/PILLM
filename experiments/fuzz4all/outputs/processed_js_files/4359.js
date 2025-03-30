class ComplexCalculator {
  constructor() {
    this.memoizedResults = new Map();
  }

  async factorial(n) {
    if (n < 0) throw new Error("Negative numbers are not allowed");
    if (n === 0 || n === 1) return 1;
    if (this.memoizedResults.has(n)) return this.memoizedResults.get(n);

    const result = n * await this.factorial(n - 1);
    this.memoizedResults.set(n, result);
    return result;
  }
}

(async () => {
  const calculator = new ComplexCalculator();

  const calculateAndLog = async (n) => {
    try {
      const result = await calculator.factorial(n);
      print(`Factorial of ${n} is ${result}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const numbers = [5, 10, 15, 20, -1];
  await Promise.all(numbers.map(n => calculateAndLog(n)));
})();
