 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fibonacciGenerator(n) {
  let [prev, curr] = [0, 1];
  while (n--) {
    [prev, curr] = [curr, prev + curr];
    yield delay(500).then(() => curr);
  }
}

 
async function processFibonacci() {
  const fibSequence = fibonacciGenerator(10);
  for await (const num of fibSequence) {
    print(`Fibonacci: ${num}`);
  }
}

 
const handler = {
  apply: async (target, thisArg, argumentsList) => {
    print('Starting Fibonacci Processing...');
    await target.apply(thisArg, argumentsList);
    print('Fibonacci Processing Completed.');
  }
};

const proxyProcessFibonacci = new Proxy(processFibonacci, handler);

 
proxyProcessFibonacci();
