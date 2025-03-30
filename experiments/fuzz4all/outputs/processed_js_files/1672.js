class Fibonacci {
  constructor() {
    this.memo = new Map();
    this.memo.set(0, 0);
    this.memo.set(1, 1);
  }

  calculate(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);
    return value;
  }

  *generateSequence(limit) {
    for (let i = 0; i <= limit; i++) {
      yield this.calculate(i);
    }
  }
}

const fetchFibonacci = async (limit) => {
  try {
    const sequence = [...new Fibonacci().generateSequence(limit)];
    return sequence;
  } catch (error) {
    console.error('Error:', error);
  }
};

const printSequence = (sequence) => {
  sequence.forEach((num, index) => {
    print(`Fibonacci(${index}): ${num}`);
  });
};

(async () => {
  const limit = 10;
  const sequence = await fetchFibonacci(limit);
  if (sequence) {
    printSequence(sequence);
  }
})();
