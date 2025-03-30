class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.generateSequence();
  }

  *generator() {
    let [prev, curr] = [0, 1];
    while (curr < this.limit) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  generateSequence() {
    return [...this.generator()];
  }

  [Symbol.iterator]() {
    return this.generator();
  }
}

const fib = new Fibonacci(1000);

const fibonacciPromises = Array.from(fib, num => 
  new Promise(resolve => setTimeout(() => resolve(num), Math.random() * 100))
);

Promise.all(fibonacciPromises).then(results => {
  const doubled = results.map(x => x * 2);
  print(doubled);

  const sum = doubled.reduce((acc, val) => acc + val, 0);
  print(`Sum of doubled Fibonacci numbers under 1000: ${sum}`);
});

const asyncLogger = async function*() {
  for await (const num of fib) {
    print(`Logging: ${num}`);
  }
};

(async () => {
  for await (const _ of asyncLogger()) {
     
  }
})();
