class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *generator(n) {
    let a = 0, b = 1, temp;
    while (n-- > 0) {
      yield a;
      temp = a;
      a = b;
      b = temp + b;
    }
  }

  calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    const fibGen = this.generator(n);
    let result;
    for (let num of fibGen) {
      result = num;
    }
    this.memo.set(n, result);
    return result;
  }
}

const asyncFibonacci = async (n) => {
  const fib = new Fibonacci();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fib.calculate(n));
    }, 1000);
  });
};

(async () => {
  const numbers = [5, 10, 15];
  const results = await Promise.all(numbers.map(n => asyncFibonacci(n)));
  
  results.forEach((result, index) => {
    print(`Fibonacci(${numbers[index]}) = ${result}`);
  });
})();
