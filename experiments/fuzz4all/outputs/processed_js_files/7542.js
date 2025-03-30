(async () => {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  async function* asyncFibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
      await delay(100);  
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

   
  const memoize = fn => {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (!cache.has(key)) {
        cache.set(key, fn(...args));
      }
      return cache.get(key);
    };
  };

   
  const add = a => b => a + b;
  const multiply = a => b => a * b;
  const composedFunction = x => multiply(2)(add(3)(x));

   
  const targetObject = { a: 1, b: 2 };
  const handler = {
    get: (target, property) => {
      print(`Property '${property}' accessed`);
      return target[property];
    }
  };
  const proxy = new Proxy(targetObject, handler);

   
  async function main() {
    print("Composed Function Result:", composedFunction(5));

    const expensiveFunction = n => {
      print(`Computing expensive function for: ${n}`);
      return n * n;
    };

    const memoizedExpensiveFunction = memoize(expensiveFunction);
    print("Memoized Result 1:", memoizedExpensiveFunction(10));
    print("Memoized Result 2:", memoizedExpensiveFunction(10));

    print("Accessing proxy properties:");
    print("Proxy a:", proxy.a);
    print("Proxy b:", proxy.b);

    print("Fibonacci sequence:");
    for await (const num of asyncFibonacci(10)) {
      print(num);
    }
  }

  main();
})();
