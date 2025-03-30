class AsyncOperation {
  constructor(delay) {
    this.delay = delay;
  }

  async execute() {
    print(`Starting async operation with ${this.delay}ms delay`);
    return new Promise(resolve => setTimeout(() => {
      print(`Completed async operation with ${this.delay}ms delay`);
      resolve(this.delay);
    }, this.delay));
  }
}

async function* asyncGenerator(operations) {
  for (const operation of operations) {
    yield await operation.execute();
  }
}

const operations = [
  new AsyncOperation(1000),
  new AsyncOperation(500),
  new AsyncOperation(2000)
];

(async () => {
  const results = [];
  for await (const result of asyncGenerator(operations)) {
    results.push(result);
  }
  print('Final Results:', results);

  const delays = new Set(results);
  print('Unique Delays:', [...delays].join(', '));

  const doubledDelays = results.map(delay => delay * 2);
  print('Doubled Delays:', doubledDelays);

  const totalTime = doubledDelays.reduce((total, current) => total + current, 0);
  print('Total Doubled Time:', totalTime);
})();
