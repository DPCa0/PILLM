class FibonacciGenerator {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.#generateSequence();
  }

  #generateSequence() {
    return {
      [Symbol.iterator]: function* () {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
          [prev, curr] = [curr, prev + curr];
          yield prev;
        }
      }.bind(this)
    };
  }

  async #simulateAsyncCalculation() {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    print("Async calculation complete.");
  }

  async printSequence() {
    print(`Generating Fibonacci sequence up to ${this.limit}:`);
    for (const number of this.sequence) {
      await this.#simulateAsyncCalculation();
      print(number);
    }
  }
}

(async () => {
  const fibonacci = new FibonacciGenerator(5);
  await fibonacci.printSequence();
})();
