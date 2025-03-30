 

 
const fibonacciCache = new Proxy({}, {
  get: (target, key) => key in target ? target[key] : undefined,
  set: (target, key, value) => {
    target[key] = value;
    print(`Computed fib(${key}) = ${value}`);
    return true;
  }
});

 
function* fibonacciGen() {
  let [a, b] = [0, 1];
  let index = 0;
  while (true) {
    if (fibonacciCache[index] !== undefined) {
      yield fibonacciCache[index];
    } else {
      fibonacciCache[index] = a;
      yield a;
    }
    [a, b] = [b, a + b];
    index++;
  }
}

 
async function getFibonacciNumber(n) {
  const fibonacci = fibonacciGen();
  let result;
  for (let i = 0; i <= n; i++) {
    result = fibonacci.next().value;
    await new Promise(resolve => setTimeout(resolve, 100));  
  }
  return result;
}

 
(async () => {
  const n = 10;
  print(`Fibonacci number at position ${n}: ${await getFibonacciNumber(n)}`);
})();
