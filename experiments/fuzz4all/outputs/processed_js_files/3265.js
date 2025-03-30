class AsyncCalculator {
  constructor() {
    this.memo = new Map();
  }

  async complexCalculation(x, y) {
    const key = `${x},${y}`;
    if (this.memo.has(key)) {
      print(`Fetching memoized result for (${x}, ${y})`);
      return this.memo.get(key);
    }

    print(`Calculating result for (${x}, ${y})`);
    const result = await new Promise((resolve) => 
      setTimeout(() => resolve(x ** y + Math.sin(x * y)), 1000)
    );

    this.memo.set(key, result);
    return result;
  }
}

const runCalculations = async () => {
  const calculator = new AsyncCalculator();
  
   
  const results = await Promise.all([
    calculator.complexCalculation(2, 3),
    calculator.complexCalculation(3, 2),
    calculator.complexCalculation(2, 3),   
  ]);

  print("Results: ", results);

   
  const [a, ...rest] = results;
  print("First result:", a);
  print("Remaining results:", rest);

   
  const resultObjects = results.map((res, index) => ({
    [`Result${index + 1}`]: res,
    timestamp: new Date().toISOString()
  }));

  print("Result objects with timestamps:", resultObjects);
};

runCalculations().catch(console.error);
