class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.sequence = [...this.generateSequence()];
  }

  *generateSequence() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield prev;
    }
  }

  async processSequence() {
    try {
      const results = this.sequence.map(async (num) => {
        const doubled = await this.doubleNumber(num);
        return this.formatNumber(doubled);
      });
      return Promise.all(results);
    } catch (error) {
      console.error("Error processing sequence:", error);
    }
  }

  doubleNumber(num) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(num * 2), 100);
    });
  }

  formatNumber(num) {
    return `Number: ${num}`;
  }
}

(async () => {
  const fib = new FibonacciSequence(10);
  const processed = await fib.processSequence();
  print(processed.join(', '));
})();
