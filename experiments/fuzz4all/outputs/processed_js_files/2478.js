class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }

  *[Symbol.iterator]() {
    let n = 0;
    while (true) {
      yield this.calculate(n++);
    }
  }
}

const fibonacci = new Fibonacci();

 
const proxyFibonacci = new Proxy(fibonacci, {
  get(target, prop, receiver) {
    if (prop === 'next') {
      return function () {
        const { value, done } = target[Symbol.iterator]().next();
        return { value, done };
      };
    }
    return Reflect.get(target, prop, receiver);
  }
});

 
(async () => {
  let count = 0;
  for await (const number of asyncIterator(proxyFibonacci)) {
    print(number);
    if (++count >= 10) break;
  }
})();

async function* asyncIterator(iterable) {
  for (const item of iterable) {
    await new Promise(resolve => setTimeout(resolve, 500));
    yield item;
  }
}
