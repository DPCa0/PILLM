class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *[Symbol.iterator]() {
    let i = 0;
    while (true) {
      yield this.get(i++);
    }
  }

  get(n) {
    if (!this.memo.has(n)) {
      this.memo.set(n, this.get(n - 1) + this.get(n - 2));
    }
    return this.memo.get(n);
  }
}

const asyncProcessFib = async (fib, limit) => {
  let iterator = fib[Symbol.iterator]();
  for (let i = 0; i < limit; i++) {
    print(await Promise.resolve(iterator.next().value));
  }
};

 
const fibProxyHandler = {
  get(target, prop, receiver) {
    if (prop === 'get') {
      return function (...args) {
        print(`Calculating Fibonacci for ${args[0]}`);
        return Reflect.get(...arguments).apply(target, args);
      };
    }
    return Reflect.get(...arguments);
  }
};

const fib = new Proxy(new Fibonacci(), fibProxyHandler);
asyncProcessFib(fib, 10).then(() => print("Fibonacci sequence generated."));
