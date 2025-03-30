class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(max) {
  let i = 0;
  while (i < max) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 100));
  }
}

const compose = (...fns) => (arg) => fns.reduce((acc, fn) => acc.then(fn), Promise.resolve(arg));

function addFive(x) {
  return new Promise(resolve => setTimeout(() => resolve(x + 5), 100));
}

function multiplyByTwo(x) {
  return new Promise(resolve => setTimeout(() => resolve(x * 2), 100));
}

function subtractThree(x) {
  return new Promise(resolve => setTimeout(() => resolve(x - 3), 100));
}

const complexAsyncOperation = compose(addFive, multiplyByTwo, subtractThree);

(async function() {
  const deferred = new Deferred();

  setTimeout(() => deferred.resolve('Deferred Promise Resolved!'), 500);

  async function processAsyncGen() {
    for await (const value of asyncGenerator(5)) {
      print('Async Generator value:', value);
    }
  }

  processAsyncGen();

  deferred.promise.then(console.log);

  const result = await complexAsyncOperation(5);
  print('Result of composed operations:', result);
})();
