class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.generateSequence();
  }

  *generator() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  generateSequence() {
    return [...this.generator()];
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.sequence[index++],
        done: index > this.limit
      })
    };
  }

  static async logSequence(sequence) {
    for await (let number of sequence) {
      print(number);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

(async () => {
  const fibSeq = new FibonacciSequence(10);
  await FibonacciSequence.logSequence(fibSeq);
})();
