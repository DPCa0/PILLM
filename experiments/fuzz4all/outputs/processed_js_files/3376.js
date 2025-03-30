class FibonacciGenerator {
  constructor(limit) {
    this.limit = limit;
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield prev;
    }
  }

  async printFibonacci() {
    const fibonacciNumbers = [...this];
    for await (let num of this.#delayedPrint(fibonacciNumbers)) {
      print(num);
    }
  }

  async *#delayedPrint(numbers) {
    for (const num of numbers) {
      await new Promise(resolve => setTimeout(resolve, 500));
      yield num;
    }
  }
}

const fibGen = new FibonacciGenerator(10);
fibGen.printFibonacci();
