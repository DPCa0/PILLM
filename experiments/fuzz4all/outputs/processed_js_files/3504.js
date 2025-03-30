class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

(async () => {
  const limit = 1000;
  const fibs = fibonacciGenerator(limit);
  const deferred = new Deferred();

  function fetchData() {
    setTimeout(() => deferred.resolve('Data fetched!'), 2000);
  }

  fetchData();

  print('Calculating Fibonacci numbers up to:', limit);
  for await (const num of fibs) {
    print(num);
  }

  print(await deferred.promise);
})();
