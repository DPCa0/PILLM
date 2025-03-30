class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  *sequence(limit) {
    for (let i = 0; i < limit; i++) {
      yield this.fib(i);
    }
  }

  fib(n) {
    if (this.memo.has(n)) {
      return this.memo.get(n);
    }
    const value = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    print('Fetched data:', data);

    const fibonacci = new Fibonacci();
    const fibIterator = fibonacci.sequence(10);

    print('Fibonacci Sequence:');
    for (let value of fibIterator) {
      print(value);
    }

    const doubledValues = [1, 2, 3, 4, 5].map(n => n * 2);
    print('Doubled Values:', doubledValues);

    const proxyHandler = {
      get: (target, prop) => prop in target ? target[prop] : 'Not Found',
    };
    const dataProxy = new Proxy({ a: 1, b: 2 }, proxyHandler);
    print('Proxy a:', dataProxy.a);
    print('Proxy c:', dataProxy.c);

  } catch (error) {
    console.error('Error:', error);
  }
})();
