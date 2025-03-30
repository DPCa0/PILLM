 

 
function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const fibonacciProxy = new Proxy(fibonacciGenerator(), {
  get: (target, prop) => {
    if (prop === Symbol.iterator) return () => target;
    print(`Accessing property "${prop}"`);
    return target[prop];
  },
});

 
function fetchData(index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fib = [...fibonacciProxy].slice(0, index).pop();
      resolve(`Fibonacci number at position ${index}: ${fib}`);
    }, 1000);
  });
}

 
async function displayFibonacci(index) {
  try {
    print(await fetchData(index));
  } catch (error) {
    console.error('Error:', error);
  }
}

 
async function main() {
  const indices = [5, 10, 15];
  const promises = indices.map((i) => displayFibonacci(i));
  await Promise.all(promises);
}

main();
