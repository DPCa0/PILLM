class Fibonacci {
  constructor() {
    this.memo = new Map();
  }
  
  *generateSequence(n) {
    for (let i = 0; i < n; i++) {
      yield this.calculate(i);
    }
  }

  calculate(n) {
    if (n < 2) return n;
    if (this.memo.has(n)) return this.memo.get(n);

    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);
    return value;
  }

  static async printSequence(n) {
    const fib = new Fibonacci();
    const sequence = fib.generateSequence(n);
    for await (const num of sequence) {
      print(num);
    }
  }
}

 
async function displaySequences() {
  const tasks = [
    Fibonacci.printSequence(10),
    Fibonacci.printSequence(15),
    Fibonacci.printSequence(5)
  ];

  await Promise.all(tasks);
}

displaySequences();
