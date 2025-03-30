class CustomPromise extends Promise {
  constructor(executor) {
    super(executor);
    this._creationTime = Date.now();
  }

  getTimeElapsed() {
    return `${Date.now() - this._creationTime}ms`;
  }
}

async function* fibonacciSequence(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

(async () => {
  const sequence = fibonacciSequence(10);
  const results = [];
  for await (const num of sequence) {
    results.push(num);
  }

  const promise1 = new CustomPromise((resolve) => setTimeout(() => resolve(results), 100));
  const promise2 = new CustomPromise((resolve, reject) => setTimeout(() => reject(new Error("Failed promise")), 200));

  Promise.allSettled([promise1, promise2])
    .then((outcomes) => outcomes.forEach((outcome) => {
      if (outcome.status === 'fulfilled') {
        print(`Success: Fibonacci sequence is ${outcome.value}`);
      } else {
        print(`Error: ${outcome.reason.message}`);
      }
    }))
    .finally(() => {
      print(`Promise1 elapsed time: ${promise1.getTimeElapsed()}`);
      print(`Promise2 elapsed time: ${promise2.getTimeElapsed()}`);
    });

  const url = new URL('https://example.com?param=js');
  const params = new URLSearchParams(url.search);
  print(`Extracted URL parameter 'param': ${params.get('param')}`);
})();
