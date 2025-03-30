class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

function* generateSequence(start = 0, end = 10, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

async function asyncIteratorHandler(iterator, delay = 1000) {
  for await (const value of iterator) {
    print(`Processing value: ${value}`);
    await new Promise(res => setTimeout(res, delay));
  }
}

function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function complexFunction() {
  const deferred = new Deferred();
  const sequence = generateSequence(1, 5);
  
  const result = Promise.race([
    asyncIteratorHandler(sequence),
    new Promise((_, reject) => setTimeout(() => reject('Timeout'), 4000))
  ]);
  
  result.then(deferred.resolve).catch(deferred.reject);
  
  try {
    print('Starting complex computations...');
    await deferred.promise;
    print('Sequence processed.');
    await sleep(500);
    print(`Fibonacci of 10: ${fibonacci(10)}`);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
}

complexFunction();
