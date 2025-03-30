 

class Fibonacci {
  constructor(limit) {
    this.limit = limit;
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

const delayedLog = async (message) => {
  return new Promise(resolve => setTimeout(() => {
    print(message);
    resolve();
  }, 1000));
};

(async function() {
  const fibLimit = 10;
  const fibonacciSequence = new Fibonacci(fibLimit);
  const fibonacciArray = [...fibonacciSequence];
  
  print(`Fibonacci sequence up to ${fibLimit}:`);
  
  for await (const number of fibonacciArray.map(num => delayedLog(num))) {
     
  }
})();
