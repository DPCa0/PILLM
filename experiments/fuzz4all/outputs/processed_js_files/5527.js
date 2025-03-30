class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* fibonacci(max) {
  let [prev, curr] = [0, 1];
  while (curr <= max) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fiboPromise = async (max) => {
  const results = [];
  for await (const num of fibonacci(max)) {
    results.push(num);
  }
  return results;
};

const logger = (tag) => ({
  log: (...args) => console.log(`[${tag}]`, ...args)
});

async function advancedProgram() {
  const deferred = new Deferred();
  const consoleLog = logger('Fibonacci');
  
  fiboPromise(1000)
    .then(deferred.resolve)
    .catch(deferred.reject);
  
  const fiboNumbers = await deferred.promise;
  consoleLog.log('Fibonacci numbers up to 1000:', fiboNumbers.join(', '));
}

advancedProgram();
