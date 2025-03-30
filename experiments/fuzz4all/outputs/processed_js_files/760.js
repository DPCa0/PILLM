class Fibonacci {
  constructor(max) {
    this.max = max;
    this.memo = new Map();
  }

  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.max; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  get(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    if (n <= 1) return n;
    const result = this.get(n - 1) + this.get(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const fib = new Fibonacci(10);

   
  for await (const num of (async function* (iterator) {
    for (const num of iterator) {
      await delay(500);  
      yield num;
    }
  })(fib)) {
    print(`Fibonacci: ${num}`);
  }

  print(`10th Fibonacci: ${fib.get(10)}`);

   
  const obj = { a: 1, b: { c: 2, d: 3 }, e: 4 };
  const {
    a,
    b: { c, ...rest },
    ...restOfObj
  } = obj;
  print({ a, c, rest, restOfObj });

   
  const nestedObj = { foo: { bar: { baz: 42 } } };
  const bazValue = nestedObj?.foo?.bar?.baz ?? 'default value';
  print(`Nested value: ${bazValue}`);
})();
