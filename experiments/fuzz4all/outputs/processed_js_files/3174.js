class AsyncMath {
  static async fibonacci(n) {
    return n <= 1 ? n : await AsyncMath.fibonacci(n - 1) + await AsyncMath.fibonacci(n - 2);
  }

  static async calculate() {
    let values = [...Array(10).keys()];
    let results = await Promise.all(values.map(async (num) => ({
      input: num,
      fibonacci: await AsyncMath.fibonacci(num)
    })));

    return results.reduce((acc, { input, fibonacci }) => {
      acc[input] = fibonacci;
      return acc;
    }, {});
  }
}

(async () => {
  try {
    let fibResults = await AsyncMath.calculate();
    console.table(fibResults);
  } catch (error) {
    console.error('Error computing Fibonacci:', error);
  }
})();
