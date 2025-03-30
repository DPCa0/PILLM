class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  *generator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
      yield prev;
      [prev, curr] = [curr, prev + curr];
    }
  }

  calculate(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

async function asyncFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

(async () => {
  print("Advanced JavaScript Features:");
  
   
  const fib = new Fibonacci();
  print("First 10 Fibonacci numbers using Generator:");
  for (let num of fib.generator(10)) {
    print(num);
  }

  print("Fibonacci of 10 using Memoization:", fib.calculate(10));

   
  const data = await asyncFetch('https://jsonplaceholder.typicode.com/todos/1');
  print("Fetched Data:", data);

   
  const target = {};
  const handler = {
    set: (obj, prop, value) => {
      if (typeof value === 'number') {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
      } else {
        console.error(`Property ${prop} can only be a number`);
      }
      return true;
    }
  };

  const proxy = new Proxy(target, handler);
  proxy.count = 1;  
  proxy.name = "test";  
})();
