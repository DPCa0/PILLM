 
class Fibonacci {
  #memo = new Map();
  
  static *sequence(limit) {
    let a = 0, b = 1;
    while (limit-- > 0) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  calculate(n) {
    if (n < 2) return n;
    if (!this.#memo.has(n)) {
      this.#memo.set(n, this.calculate(n - 1) + this.calculate(n - 2));
    }
    return this.#memo.get(n);
  }
}

 
async function displayFibonacci() {
  const fib = new Fibonacci();
  const result = [];

  for (let i = 0; i < 10; i++) {
    result.push(fib.calculate(i));
  }

  print("First 10 Fibonacci numbers calculated with memoization:", result);

  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(Array.from(Fibonacci.sequence(10))), 1000);
  });

  const sequenceResult = await promise;
  print("First 10 Fibonacci numbers generated with iterator:", sequenceResult);
}

displayFibonacci();
