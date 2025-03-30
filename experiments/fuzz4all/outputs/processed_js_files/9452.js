 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const fibonacciProxy = new Proxy(fibonacci(), {
  get(target, prop) {
    if (typeof prop === 'string' && !isNaN(prop)) {
      for (let i = 0; i <= prop; i++) {
        var result = target.next().value;
      }
      print(`Fibonacci number ${prop}: ${result}`);
      return result;
    }
    return target[prop];
  }
});

 
async function fetchFibonacci(index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fibonacciProxy[index]);
    }, 1000);  
  });
}

 
const UNIQUE_KEY = Symbol('uniqueKey');
const store = {
  [UNIQUE_KEY]: 'This is a unique value'
};

 
(async () => {
  const numbers = await Promise.all([fetchFibonacci(5), fetchFibonacci(6), fetchFibonacci(7)]);
  print(`Fibonacci numbers: ${[...numbers]}`);
  print(`Unique value: ${store[UNIQUE_KEY]}`);
})();
