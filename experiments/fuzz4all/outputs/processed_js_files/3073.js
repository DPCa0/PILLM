class Fibonacci {
  constructor() {
    this.memo = new Proxy({}, {
      get: (obj, prop) => prop in obj ? obj[prop] : (obj[prop] = this.calc(prop))
    });
  }

  calc(n) {
    if (n < 2) return n;
    return this.memo[n - 1] + this.memo[n - 2];
  }
}

async function* asyncFibonacci(n) {
  const fib = new Fibonacci();
  for (let i = 0; i < n; i++) {
    await new Promise(r => setTimeout(r, 100));  
    yield fib.calc(i);
  }
}

(async () => {
  for await (const num of asyncFibonacci(10)) {
    print(num);
  }

   
  const nums = await Promise.all((async function*() {
    yield* asyncFibonacci(5);
  })());

  print(`First 5 Fibonacci numbers: ${nums}`);
})();
