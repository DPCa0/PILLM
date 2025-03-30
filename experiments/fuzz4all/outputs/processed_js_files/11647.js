class AsyncIterable {
  constructor(data) {
    this.data = data;
  }

  [Symbol.asyncIterator]() {
    let i = 0;
    const data = this.data;

    return {
      async next() {
        if (i < data.length) {
          return new Promise((resolve) => {
            setTimeout(() => resolve({ value: data[i++], done: false }), 1000);
          });
        }
        return { done: true };
      }
    };
  }
}

async function* fibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(a), 500));
    [a, b] = [b, a + b];
  }
}

(async () => {
  const data = [10, 20, 30, 40];
  const asyncData = new AsyncIterable(data);

  print("Processing async iterable data:");
  for await (const num of asyncData) {
    print(`Received: ${num}`);
  }

  print("\nGenerating Fibonacci sequence:");
  for await (const num of fibonacci(5)) {
    print(`Fibonacci: ${num}`);
  }
})();
