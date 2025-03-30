class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(arr) {
  for (const item of arr) {
    await delay(500);
    yield item * item;
  }
}

async function complexComputation(arr) {
  const deferred = new Deferred();

  (async () => {
    let result = 0;
    for await (const value of asyncGenerator(arr)) {
      print(`Processing value: ${value}`);
      result += value;
    }
    deferred.resolve(result);
  })();

  return deferred.promise;
}

(async function main() {
  const numbers = [1, 2, 3, 4, 5];
  const sumOfSquares = await complexComputation(numbers);
  print(`Sum of squares: ${sumOfSquares}`);
})();
