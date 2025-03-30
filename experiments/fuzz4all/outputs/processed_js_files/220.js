class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.#generateSequence();
  }

   
  #generateSequence() {
    const seq = [0, 1];
    while (seq.length < this.limit) {
      seq.push(seq.at(-1) + seq.at(-2));
    }
    return seq;
  }

  *[Symbol.iterator]() {
    for (const num of this.sequence) {
      yield num;
    }
  }

  async printSequenceWithDelay(delay = 1000) {
    for await (const num of this.#delayedGenerator(delay)) {
      print(num);
    }
  }

  async *#delayedGenerator(delay) {
    for (const num of this) {
      await new Promise(resolve => setTimeout(resolve, delay));
      yield num;
    }
  }
}

const fib = new Fibonacci(10);

(async () => {
  print("Fibonacci Sequence:");
  await fib.printSequenceWithDelay();
})();
