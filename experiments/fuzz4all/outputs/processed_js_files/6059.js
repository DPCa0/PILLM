class FibonacciSequence {
  constructor() {
    this.memo = new Map();
  }
  
   
  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

async function getFibonacciSum(limit) {
  const fib = new FibonacciSequence();
  let sum = 0;

   
  for await (const num of generateFibonacci(limit, fib)) {
    sum += num;
  }

  return sum;
}

 
async function* generateFibonacci(limit, fibInstance) {
  for (let i = 0; i < limit; i++) {
     
    await new Promise(resolve => setTimeout(resolve, 10));
    yield fibInstance.calculate(i);
  }
}

 
(async () => {
  const limit = 10;
  try {
    const sum = await getFibonacciSum(limit);
    print(`Sum of the first ${limit} Fibonacci numbers: ${sum}`);
  } catch (error) {
    console.error('Error calculating Fibonacci sum:', error);
  }
})();
