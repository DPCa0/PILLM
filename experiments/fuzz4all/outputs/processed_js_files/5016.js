class AsyncIterableQueue {
  constructor() {
    this.queue = [];
    this.resolve = null;
  }

  enqueue(item) {
    if (this.resolve) {
      this.resolve({ value: item, done: false });
      this.resolve = null;
    } else {
      this.queue.push(item);
    }
  }

  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.queue.length) {
          return Promise.resolve({ value: this.queue.shift(), done: false });
        }
        return new Promise(resolve => this.resolve = resolve);
      }
    };
  }
}

async function* generateFibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
    yield a;
  }
}

(async function main() {
  const queue = new AsyncIterableQueue();
  const fibonacciGenerator = generateFibonacci(10);

  const fibProcessor = async () => {
    for await (const num of fibonacciGenerator) {
      print(`Fibonacci Number: ${num}`);
      queue.enqueue(num);
    }
  };

  const queueConsumer = async () => {
    let sum = 0;
    for await (const value of queue) {
      sum += value;
      print(`Running Sum: ${sum}`);
    }
  };

  await Promise.all([fibProcessor(), queueConsumer()]);
})();
