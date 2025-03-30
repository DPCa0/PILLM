class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* fibonacciGen(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

function asyncTimeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const deferred = new Deferred();
  const fibSequence = fibonacciGen(1000);

  for await (const num of fibSequence) {
    print(num);
    if (num === 21) {
      deferred.resolve('Found 21!');
    }
    await asyncTimeout(500);
  }

  const message = await deferred.promise;
  print(message);
}

main();
