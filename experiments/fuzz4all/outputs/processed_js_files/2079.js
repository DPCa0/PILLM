class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.generateFibonacci();
  }

  *fibonacciGenerator() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  generateFibonacci() {
    return [...this.fibonacciGenerator()];
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.sequence[index++],
        done: index > this.sequence.length,
      }),
    };
  }

  static async printFibonacciAsync(limit) {
    const sequence = new FibonacciSequence(limit);
    for (let num of sequence) {
      await new Promise((resolve) => setTimeout(resolve, 100));  
      print(num);
    }
  }
}

 
(async () => {
  await FibonacciSequence.printFibonacciAsync(10);
})();
