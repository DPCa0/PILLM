class Fibonacci {
  #memo = new Map();

  constructor() {
    this.#memo.set(0, 0);
    this.#memo.set(1, 1);
  }

  calculate(n) {
    if (this.#memo.has(n)) {
      return this.#memo.get(n);
    }
    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.#memo.set(n, value);
    return value;
  }
}

const asyncHandler = async (fn, ...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    console.error('Error:', error);
  }
};

const fib = new Fibonacci();
(async () => {
  const result = await asyncHandler(fib.calculate.bind(fib), 10);
  print('Fibonacci(10):', result);
})();

function* numberGenerator(max) {
  for (let i = 0; i <= max; i++) {
    yield i;
  }
}

const doubleNumbers = (async function* () {
  for await (let num of numberGenerator(5)) {
    yield num * 2;
  }
})();

(async () => {
  for await (let num of doubleNumbers) {
    print('Doubled:', num);
  }
})();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const delayLog = async () => {
  print('Waiting 2 seconds...');
  await delay(2000);
  print('Done waiting!');
};

delayLog();

const symbol = Symbol('uniqueIdentifier');
const obj = {
  [symbol]: 'secretData',
  publicData: 'This is public',
};

print('Accessing symbol data:', obj[symbol]);
print('Public data:', obj.publicData);
