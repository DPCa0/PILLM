class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.generateSequence();
  }

  *generator() {
    let a = 0, b = 1;
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  generateSequence() {
    return [...this.generator()];
  }

  async sumOfEvens() {
    return new Promise((resolve) => {
      const sum = this.sequence.reduce((acc, num) => num % 2 === 0 ? acc + num : acc, 0);
      resolve(sum);
    });
  }
}

(async () => {
  const fib = new Fibonacci(10);
  const evenSum = await fib.sumOfEvens();
  print(`Sequence: ${fib.sequence}`);
  print(`Sum of even numbers: ${evenSum}`);
})();
