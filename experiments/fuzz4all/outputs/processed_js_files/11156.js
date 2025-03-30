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
    for (let num of this.sequence) {
      yield num;
    }
  }

  async printAsync() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    for await (let num of this) {
      print(num);
      await delay(500);
    }
  }

  get evenNumbers() {
    return this.sequence.filter(num => num % 2 === 0);
  }

  static #privateMethod() {
    return "Access Denied";
  }

  accessPrivateMethod() {
    try {
      return Fibonacci.#privateMethod();
    } catch {
      return "Cannot access private method";
    }
  }
}

(async () => {
  const fib = new Fibonacci(10);
  print("Fibonacci Sequence:");
  await fib.printAsync();

  print("\nEven Numbers in the Sequence:");
  print(fib.evenNumbers);

  print("\nAttempting to Access Private Method:");
  print(fib.accessPrivateMethod());
})();
