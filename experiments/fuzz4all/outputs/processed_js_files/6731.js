class Fibonacci {
  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    while (true) {
      [a, b] = [b, a + b];
      yield a;
    }
  }
}

const fib = new Fibonacci();
const fibSequence = Array.from({ length: 10 }, () => fib[Symbol.iterator]().next().value);

const asyncOperation = () => new Promise((resolve) => setTimeout(resolve, 1000));

(async () => {
  for await (const num of (async function*() {
    for (const n of fibSequence) {
      await asyncOperation();
      yield n;
    }
  })()) {
    print(`Fibonacci: ${num}`);
  }
})();

 
const logger = {
  log: (message) => console.log(`LOG: ${message}`),
};

const loggerProxy = new Proxy(logger, {
  get(target, property) {
    if (property in target) {
      return (...args) => {
        print(`Calling ${property} with`, args);
        return target[property](...args);
      };
    }
    return undefined;
  },
});

loggerProxy.log('Hello, Proxy!');
