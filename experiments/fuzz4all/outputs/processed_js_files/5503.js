class FibonacciSequence {
  constructor() {
    this.memo = new Map();
  }
  
  fib(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    
    const value = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

const fibonacci = new FibonacciSequence();

 
function* generateFibonacci(limit) {
  let i = 0;
  while (i <= limit) {
    yield fibonacci.fib(i);
    i++;
  }
}

 
const fibArray = [...generateFibonacci(10)];

 
const [first, second, third, ...rest] = fibArray;

print('First three Fibonacci numbers:', first, second, third);
print('Rest of the sequence:', rest);

 
function asyncOperation(x) {
  return new Promise((resolve) => setTimeout(() => resolve(x * x), 1000));
}

(async () => {
  const results = await Promise.all(fibArray.map(async (num) => {
    const result = await asyncOperation(num);
    return result;
  }));

  print('Squared Fibonacci numbers:', results);
})();

 
const fibonacciProxy = new Proxy(fibonacci, {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return target[prop];
  }
});

print('Accessing fib(5):', fibonacciProxy.fib(5));
