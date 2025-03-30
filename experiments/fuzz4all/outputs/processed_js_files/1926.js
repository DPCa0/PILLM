 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
};

 
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
async function* asyncNumberGenerator(max) {
  for (let i = 1; i <= max; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

const obj = new Proxy({ x: 10, y: 20 }, handler);

 
(async () => {
  print("Fibonacci of 10:", fibonacci(10));

  print("Async numbers:");
  for await (const num of asyncNumberGenerator(5)) {
    print(num);
  }

  print("Original x value:", obj.x);
  obj.x = 42;
  print("Updated x value:", obj.x);
})();
