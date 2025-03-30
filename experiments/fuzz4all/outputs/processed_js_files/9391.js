class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }

  async process() {
    const results = await Promise.all(this.data.map(async (item) => await this.asyncOperation(item)));
    print('Processed Results:', results);
  }

  asyncOperation(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = item * 2;
        resolve(result);
      }, Math.random() * 1000);
    });
  }
}

const asyncIterable = {
  data: [1, 2, 3, 4, 5],
  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next: async () => {
        if (index < this.data.length) {
          const value = await new Promise((resolve) => setTimeout(() => resolve(this.data[index++]), 500));
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
};

(async () => {
  const processor = new AsyncProcessor([10, 20, 30, 40, 50]);
  processor.process();

  for await (const num of asyncIterable) {
    print('Async Iterable value:', num);
  }
})();

const proxyHandler = {
  get: (target, prop) => {
    if (prop === 'secret') {
      return 'You found the secret!';
    }
    return Reflect.get(target, prop);
  }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, proxyHandler);
print(proxy.a);
print(proxy.secret);

const fibonacci = (function* () {
  let a = 0, b = 1;
  while (true) {
    const next = a + b;
    a = b;
    b = next;
    yield next;
  }
})();

print(fibonacci.next().value);
print(fibonacci.next().value);
print(fibonacci.next().value);
