class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  compute(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const result = this.compute(n - 1) + this.compute(n - 2);
    this.memo.set(n, result);
    return result;
  }

  static *generateSequence(limit) {
    const fib = new Fibonacci();
    for (let i = 0; i <= limit; i++) {
      yield fib.compute(i);
    }
  }
}

 
async function asyncFibonacci(limit) {
  const sequence = [];
  const fibGen = Fibonacci.generateSequence(limit);

  for await (let num of fibGen) {
    sequence.push(num);
  }

  print(`Fibonacci sequence up to ${limit}: `, sequence);
}

 
const calculateSum = (sequence) => sequence.reduce((acc, val) => acc + val, 0);

asyncFibonacci(10).then(() => {
  const sequence = [...Fibonacci.generateSequence(10)];
  const sum = calculateSum(sequence);
  print(`Sum of Fibonacci sequence up to 10: ${sum}`);
});
