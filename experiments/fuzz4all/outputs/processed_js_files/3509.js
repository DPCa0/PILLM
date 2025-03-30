class Fibonacci {
  constructor() {
    this.memo = new Proxy({}, {
      get: (obj, prop) => prop in obj ? obj[prop] : this.memoize(prop),
    });
  }

  memoize(n) {
    if (n < 2) return n;
    const result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
    return this.memo[n] = result;
  }

  fibonacci(n) {
    return this.memo[n];
  }
}

const fibSeq = new Fibonacci();
const sequenceGenerator = (function* (count) {
  for (let i = 0; i < count; i++) {
    yield fibSeq.fibonacci(i);
  }
})(10);

(async () => {
  for await (let num of sequenceGenerator) {
    print(num);
  }
})();

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function() {
  const numbers = Array.from(sequenceGenerator);
  for (const number of numbers) {
    await delay(500);
    print(`Delayed Fibonacci: ${number}`);
  }
})();
