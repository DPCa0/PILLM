class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator() {
  const values = [1, 2, 3, 4, 5];
  for (const value of values) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    yield value * 2;
  }
}

async function complexComputation() {
  const deferred = new Deferred();
  const generator = asyncGenerator();
  let result = 0;

  for await (const value of generator) {
    if (value === 8) {
      deferred.resolve('Reached threshold value, computation will stop.');
      break;
    }
    result += value;
  }

  const message = await deferred.promise;
  print(message);
  print('Final result:', result);
}

(async () => {
  try {
    await complexComputation();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
