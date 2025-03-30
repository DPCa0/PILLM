class FibonacciSequence {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *[Symbol.iterator]() {
    let n = 0;
    while (true) {
      yield this.getFib(n++);
    }
  }

  getFib(n) {
    if (!this.memo.has(n)) {
      this.memo.set(n, this.getFib(n - 1) + this.getFib(n - 2));
    }
    return this.memo.get(n);
  }
}

(async function() {
   
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
   
  const sequence = new FibonacciSequence();
  const [first, second, third, ...rest] = [...sequence].slice(0, 10);
  print('First three Fibonacci numbers:', first, second, third);

   
  const handler = {
    get: (obj, prop) => {
      print(`Accessing property '${prop}'`);
      return obj[prop];
    }
  };

  const proxiedSequence = new Proxy(sequence, handler);
  print('Tenth Fibonacci number:', [...proxiedSequence][9]);

   
  const showFibonacci = (num = 10) => {
    const fibNumbers = [...sequence].slice(0, num);
    print(`First ${num} Fibonacci numbers: ${fibNumbers.join(', ')}`);
  };

  showFibonacci();

   
  print('Simulating asynchronous operation...');
  await delay(2000);
  print('Operation completed after delay.');
})();
