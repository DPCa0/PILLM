class FibonacciSequence {
  constructor(maxLength) {
    this.maxLength = maxLength;
    this.sequence = this.generateSequence();
  }

  *[Symbol.iterator]() {
    for (const num of this.sequence) {
      yield num;
    }
  }

  generateSequence() {
    const seq = [0, 1];
    while (seq.length < this.maxLength) {
      seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
    }
    return seq;
  }
}

const fetchFibonacci = async (n) => {
  const sequence = new FibonacciSequence(n);
  const results = [];

  for await (const num of sequence) {
    results.push(num);
    await new Promise((resolve) => setTimeout(resolve, 100));  
  }

  return results;
};

const main = async () => {
  try {
    const n = 10;
    const fibonacciNumbers = await fetchFibonacci(n);
    print(`First ${n} Fibonacci numbers: ${fibonacciNumbers.join(', ')}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
