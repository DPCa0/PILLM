class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const asyncFibonacci = async (n) => {
  const fib = new Fibonacci();
  const fibonacciAsync = (num) =>
    new Promise((resolve) => setTimeout(() => resolve(fib.calculate(num)), 0));

  const result = await fibonacciAsync(n);
  return `Fibonacci(${n}) = ${result}`;
};

const demonstrateComplexFeatures = async () => {
  const nums = [10, 15, 20];
  
   
  const results = await Promise.all(
    nums.map(async (num) => {
      let result = await asyncFibonacci(num);
      print(result);
      return result;
    })
  );

   
  const uniqueResults = [...new Set(results)];
  print('Unique Fibonacci results:', uniqueResults);
};

demonstrateComplexFeatures();
