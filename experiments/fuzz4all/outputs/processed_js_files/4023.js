class Fibonacci {
  constructor(max) {
    this.memo = new Map();
    this.max = max;
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (curr <= this.max) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  compute(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.compute(n - 1) + this.compute(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fib = new Fibonacci(100);
print([...fib]);

const asyncFetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const data = await asyncFetchData(url);
  print('Fetched Data:', data);
})();

const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);

const proxy = new Proxy(map, {
  get(target, prop) {
    return target.has(prop) ? target.get(prop) : 'Default Value';
  },
  set(target, prop, value) {
    if (prop.startsWith('key')) {
      target.set(prop, value);
    } else {
      throw new Error('Property must start with "key"');
    }
    return true;
  }
});

print(proxy.key1);
print(proxy.nonExistent);
proxy.key3 = 'value3';
print(proxy.key3);
