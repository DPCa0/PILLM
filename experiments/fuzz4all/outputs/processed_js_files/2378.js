class Fibonacci {
  constructor(limit) {
    this.limit = limit;
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

const asyncOperation = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Async Operation Complete'), 1000);
  });
};

(async () => {
  const fib = new Fibonacci(10);
  const fibNumbers = [...fib];
  print('Fibonacci Sequence:', fibNumbers);

  const obj = { a: 1, b: 2, c: 3 };
  const { a, ...rest } = obj;
  print('Destructured:', a, rest);

  const asyncResult = await asyncOperation();
  print(asyncResult);

  const map = new Map();
  map.set('key', { nested: 'value' });
  print('Nested Value:', map.get('key')?.nested ?? 'No Value');

  print('Optional Chaining:', obj?.d?.e ?? 'No Value');

  try {
    throw new Error('An error occurred');
  } catch ({ message }) {
    print('Caught Error:', message);
  }
})();
