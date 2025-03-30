class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.sequence = [];
    this.generator = this.#generateSequence();
  }

  *#generateSequence() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

  getSequence() {
    for (let value of this.generator) {
      this.sequence.push(value);
    }
    return this.sequence;
  }

  static async printFibonacci(limit) {
    const fib = new Fibonacci(limit);
    const seq = fib.getSequence();
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`First ${limit} Fibonacci numbers: ${seq.join(', ')}`);
  }
}

(async () => {
  await Promise.all([
    Fibonacci.printFibonacci(5),
    Fibonacci.printFibonacci(10),
    Fibonacci.printFibonacci(15)
  ]);
})();
