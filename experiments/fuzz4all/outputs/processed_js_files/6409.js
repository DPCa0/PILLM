 

 
async function* asyncFibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));  
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop === 'add') {
      return (value) => {
        print(`Adding ${value} to the set`);
        return target.add(value);
      };
    }
    return target[prop];
  },
};

async function runAsyncFibonacci() {
  const fibSet = new Proxy(new Set(), handler);

  for await (const num of asyncFibonacci(10)) {
    fibSet.add(num);
  }

  print('Final Fibonacci Set:', [...fibSet]);
}

runAsyncFibonacci();
