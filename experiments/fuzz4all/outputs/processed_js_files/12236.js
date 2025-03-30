class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.limit; i++) {
      yield this.fib(i);
    }
  }

  fib(n) {
    if (n < 2) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const sequence = new FibonacciSequence(10);
const logFibonacciSequence = async (seq) => {
  for await (let num of seq) {
    print(`Fibonacci Number: ${num}`);
  }
};

logFibonacciSequence(sequence);

(async function() {
  const data = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/2').then(res => res.json())
  ]);
  const [{ title: title1 }, { title: title2 }] = data;
  print(`Fetched Titles: ${title1}, ${title2}`);
})();
