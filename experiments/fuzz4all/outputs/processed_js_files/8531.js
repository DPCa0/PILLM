class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

async function* fibonacciAsyncGenerator(limit) {
  let [prev, curr, index] = [0, 1, 0];
  while (index++ < limit) {
    await new Promise(resolve => setTimeout(resolve, 100));
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

const fibonacciObservable = new Observable();
fibonacciObservable.subscribe(num => print(`Fibonacci: ${num}`));

(async () => {
  const limit = 10;
  for await (const num of fibonacciAsyncGenerator(limit)) {
    fibonacciObservable.notify(num);
  }
})();

const doubleValue = (x) => x * 2;
const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);
const doubleAndLog = new Proxy(doubleValue, {
  apply(target, thisArg, args) {
    const result = Reflect.apply(target, thisArg, args);
    print(`Doubling ${args[0]} gives us: ${result}`);
    return result;
  }
});

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(doubleAndLog);

print(`Mapped values in a map: ${[...map].map(([key, value]) => `${key}: ${value}`).join(', ')}`);
