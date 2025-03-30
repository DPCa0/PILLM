class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.#generateSequence();
  }

  #generateSequence() {
    const seq = [0, 1];
    while (true) {
      const next = seq.at(-1) + seq.at(-2);  
      if (next >= this.limit) break;
      seq.push(next);
    }
    return seq;
  }

  *[Symbol.iterator]() {  
    for (const num of this.sequence) {
      yield num;
    }
  }
}

const fibonacci = new FibonacciSequence(1000);
const asyncLogFibonacci = async () => {
  for await (const num of fibonacci) {  
    await new Promise(resolve => setTimeout(resolve, 50));  
    print(num);
  }
};

(async () => {
  try {
    await asyncLogFibonacci();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
