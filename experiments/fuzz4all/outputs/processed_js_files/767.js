class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  get(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.get(n - 1) + this.get(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fibonacci = new Fibonacci();

const asyncIterable = {
  [Symbol.asyncIterator]: () => ({
    i: 0,
    async next() {
      if (this.i > 10) return { done: true };
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { value: fibonacci.get(this.i++), done: false };
    },
  }),
};

(async function() {
  for await (const num of asyncIterable) {
    print(num);
  }
})();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async function complexOperation() {
  print("Starting complex operations...");
  await sleep(2000);
  print("Complex operation completed!");
})();
