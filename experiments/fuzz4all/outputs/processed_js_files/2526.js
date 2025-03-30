 

class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map();
  }

  *generate() {
    let a = 0, b = 1;
    while (a <= this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  memoizedFibonacci(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    
    const result = this.memoizedFibonacci(n - 1) + this.memoizedFibonacci(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fib = new Fibonacci(1000);

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxyFib = new Proxy(fib, handler);

 
async function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 500));
    yield i;
  }
}

(async () => {
   
  print([...proxyFib.generate()]);

   
  const results = [];
  for await (const num of asyncGenerator()) {
    results.push(num);
  }
  print(results);

   
  print(`Fibonacci(10): ${proxyFib.memoizedFibonacci(10)}`);
})();
