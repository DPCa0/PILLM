class FibonacciSequence {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  get(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const value = this.get(n - 1) + this.get(n - 2);
    this.memo.set(n, value);
    return value;
  }

  *[Symbol.iterator]() {
    let i = 0;
    while (i < this.maxSize) {
      yield this.get(i++);
    }
  }
}

const range = (start, end, step = 1) => {
  return {
    *[Symbol.iterator]() {
      for (let i = start; i < end; i += step) {
        yield i;
      }
    }
  };
};

const fibonacci = new FibonacciSequence(10);
const squares = Array.from(range(0, 10), x => x * x);

const results = {
  fibonacci: [...fibonacci],
  squares,
  combined: squares.map((x, idx) => x + fibonacci.get(idx))
};

print(results);

const asyncTask = async (message, delay) => {
  return new Promise(resolve => setTimeout(() => resolve(message), delay));
};

(async () => {
  const messages = ['Hello', 'Async', 'World'];
  const promises = messages.map((msg, idx) => asyncTask(msg, idx * 1000));
  for await (const message of promises) {
    print(message);
  }
})();
