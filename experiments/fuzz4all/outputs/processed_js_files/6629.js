class Singleton {
  constructor(name = 'Singleton') {
    if (Singleton.instance) return Singleton.instance;
    this.name = name;
    Singleton.instance = this;
  }

  getName() {
    return this.name;
  }
}

const singletonInstance = new Singleton();

const asyncAdd = async (a, b) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return a + b;
};

const proxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}`);
      return target[prop];
    }
    return `Property ${prop} does not exist`;
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
  }
};

const obj = new Proxy({}, proxyHandler);

obj.value = 10;
print(obj.value);

(async () => {
  const result = await asyncAdd(5, 7);
  print(`Result of async add: ${result}`);
})();

const fibonacci = (function() {
  const memo = new Map();

  return function fib(n) {
    if (memo.has(n)) return memo.get(n);
    if (n <= 1) return n;
    const value = fib(n - 1) + fib(n - 2);
    memo.set(n, value);
    return value;
  };
})();

print(`Fibonacci of 10: ${fibonacci(10)}`);

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
print(`Generated ID: ${gen.next().value}`);
print(`Generated ID: ${gen.next().value}`);
print(`Generated ID: ${gen.next().value}`);
