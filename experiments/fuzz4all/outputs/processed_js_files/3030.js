 
const fibonacciAsync = (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fib = [0, 1];
      for (let i = 2; i <= num; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
      }
      resolve(fib);
    }, 1000);
  });
};

 
async function* fibonacciGenerator(max) {
  for (let i = 0; i <= max; i++) {
    yield await fibonacciAsync(i);
  }
}

 
async function displayFibonacci() {
  const fibGen = fibonacciGenerator(10);
  for await (const fib of fibGen) {
    const [first, second, ...rest] = fib;
    print(`First: ${first}, Second: ${second}, Next: ${rest[0]}`);
  }
}

 
const fibProxyHandler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
};

 
const fibObject = { sequence: [] };
const proxy = new Proxy(fibObject, fibProxyHandler);

 
(async () => {
  await displayFibonacci();
  proxy.sequence = await fibonacciAsync(5);
  print(proxy.sequence);
})();
