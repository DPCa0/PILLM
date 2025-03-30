 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache:', key);
      return cache.get(key);
    }
    print('Calculating result for:', key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
(async () => {
  const num = 10;
  print(`Fibonacci sequence up to ${num}:`);
  for (let i = 0; i <= num; i++) {
    print(`Fib(${i}) = ${await Promise.resolve(fibonacci(i))}`);
  }
})();

 
const target = {
  message1: "hello",
  message2: "world",
};

const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' has been accessed`);
    return Reflect.get(...arguments);
  },
  set: (obj, prop, value) => {
    print(`Property '${prop}' has been set to '${value}'`);
    return Reflect.set(...arguments);
  },
};

const proxy = new Proxy(target, handler);
proxy.message1 = "hi";
print(proxy.message1);
print(proxy.message2);
