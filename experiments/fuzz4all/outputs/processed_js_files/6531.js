class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  calculate(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.calculate(n - 1) + this.calculate(n - 2);
    this.memo.set(n, result);
    return result;
  }

  *generate(n) {
    for (let i = 0; i < n; i++) {
      yield this.calculate(i);
    }
  }
}

const fib = new Fibonacci();

 
const handler = {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);
    if (!isNaN(prop)) {
      print(`Accessing Fibonacci number at position ${prop}: ${value}`);
    }
    return value;
  }
};

const proxiedFib = new Proxy(fib, handler);
const sequence = [...proxiedFib.generate(10)];

print(sequence);

 
async function fetchFibonacciSequence(length) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...proxiedFib.generate(length)]);
    }, 1000);
  });
}

async function displayFibonacciSequence() {
  try {
    const sequence = await fetchFibonacciSequence(10);
    print('Fetched Fibonacci Sequence:', sequence);
  } catch (error) {
    console.error('Error fetching Fibonacci sequence:', error);
  }
}

displayFibonacciSequence();
