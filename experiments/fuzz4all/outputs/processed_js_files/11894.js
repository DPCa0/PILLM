 
const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      next() {
        if (i < 5) {
          return Promise.resolve({ value: i++, done: false });
        }
        return Promise.resolve({ done: true });
      },
    };
  },
};

const handler = {
  get(target, prop) {
    if (prop === 'double') {
      return (x) => x * 2;
    }
    return Reflect.get(target, prop);
  },
};

const operations = new Proxy({}, handler);

(async function () {
  const results = [];
  for await (const num of asyncIterable) {
    results.push(operations.double(num));
  }
  const sum = results.reduce((a, b) => a + b, 0);
  print(`The sum of doubled values is: ${sum}`);
})();
