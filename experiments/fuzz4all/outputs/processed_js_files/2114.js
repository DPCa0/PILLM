 
class Fibonacci {
  *generate(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

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

const expensiveCalculation = (n) => {
  return n * 2;  
};

const memoizedExpensiveCalculation = memoize(expensiveCalculation);

(async () => {
   
  const fib = new Fibonacci();
  const fibNumbers = [...fib.generate(10)];
  print('First 10 Fibonacci numbers:', fibNumbers);

   
  const numbers = [5, 10, 15, 20];
  const results = await Promise.all(
    numbers.map(async (num) => {
      const result = await memoizedExpensiveCalculation(num);
      return { num, result };
    })
  );

  print('Memoized results:', results);

   
  const [first, ...rest] = fibNumbers;
  print('First Fibonacci number:', first);
  print('Rest of the Fibonacci numbers:', rest);

   
  const handler = {
    set: (target, prop, value) => {
      if (typeof value !== 'number') {
        throw new Error('Value must be a number');
      }
      target[prop] = value;
      return true;
    },
  };

  const target = {};
  const proxy = new Proxy(target, handler);
  proxy.a = 42;
  try {
    proxy.b = 'not a number';  
  } catch (e) {
    console.error(e.message);
  }
})();
