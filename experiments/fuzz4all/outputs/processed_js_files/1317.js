class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Proxy({}, {
      get: (obj, prop) => prop in obj ? obj[prop] : (obj[prop] = this.calculate(prop))
    });
  }

  calculate(n) {
    if (n <= 1) return n;
    return this.memo[n - 1] + this.memo[n - 2];
  }

  *[Symbol.iterator]() {
    let count = 0;
    while (count < this.limit) {
      yield this.memo[count++];
    }
  }
}

const fibonacci = new FibonacciSequence(10);
const sequenceArray = [...fibonacci];

const formattedSequence = sequenceArray
  .map((num, idx) => `${idx + 1}: ${num}`)
  .join('\n');

print('Fibonacci Sequence up to 10:');
print(formattedSequence);

 
const fibSummary = sequenceArray.reduce((acc, num, idx) => ({
  ...acc, 
  [`fibo${idx + 1}`]: num
}), {});

print('\nFibonacci Summary Object:');
print(fibSummary);

 
async function asyncOperation(value) {
  return new Promise(resolve => setTimeout(() => resolve(value * 2), 500));
}

(async () => {
  const results = new Set();
  const promiseMap = new WeakMap();
  
  for (let num of sequenceArray) {
    let promise = asyncOperation(num);
    promiseMap.set(promise, num);
    results.add(await promise);
  }

  print('\nAsync Operations Results Set:');
  print(results);

  print('\nTracked Promises with WeakMap:');
  for (let promise of promiseMap.keys()) {
    print(`Promise for ${promiseMap.get(promise)}`);
  }
})();
