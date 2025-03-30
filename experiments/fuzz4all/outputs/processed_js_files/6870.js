class AsyncMath {
  constructor() {
    this.cache = new Map();
  }

  async expensiveComputation(n) {
    if (this.cache.has(n)) {
      return this.cache.get(n);
    }

    const result = await new Promise(resolve => {
      setTimeout(() => resolve(n * n), 1000);  
    });

    this.cache.set(n, result);
    return result;
  }
}

async function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const performMathOperations = async () => {
  const asyncMath = new AsyncMath();
  const gen = numberGenerator();

  const promises = Array.from({ length: 5 }, async () => {
    const { value: number } = await gen.next();
    const result = await asyncMath.expensiveComputation(number);
    print(`The square of ${number} is ${result}`);
  });

  await Promise.all(promises);
};

performMathOperations().catch(console.error);
