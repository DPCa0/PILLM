class FibonacciSequence {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

   
  *[Symbol.iterator]() {
    let i = 0;
    while (true) {
      yield this.getFibonacci(i++);
    }
  }

  getFibonacci(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const fibValue = this.getFibonacci(n - 1) + this.getFibonacci(n - 2);
    this.memo.set(n, fibValue);
    return fibValue;
  }
}

 
const fibonacciSequence = new FibonacciSequence();
const [first, second, third, ...nextFive] = Array.from(fibonacciSequence).slice(0, 8);

print(`First three Fibonacci numbers: ${first}, ${second}, ${third}`);
print(`Next five Fibonacci numbers: ${nextFive.join(', ')}`);

 
async function fetchFibonacciInfo(numbers) {
  const promises = numbers.map(num =>
    new Promise((resolve) =>
      setTimeout(() => resolve(`Fibonacci number ${num} is ${fibonacciSequence.getFibonacci(num)}`), Math.random() * 1000)
    )
  );

  const results = await Promise.all(promises);
  results.forEach(result => print(result));
}

fetchFibonacciInfo([5, 10, 15, 20, 25]);
