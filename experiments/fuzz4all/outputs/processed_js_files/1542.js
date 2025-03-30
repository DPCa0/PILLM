 

 
async function* fibonacci(n) {
  let a = 0, b = 1, current = 0;
  while (current < n) {
    yield a;
    [a, b] = [b, a + b];
    current++;
  }
}

async function printFibonacciSequence(n) {
  const gen = fibonacci(n);
  for await (const num of gen) {
    print(num);
  }
}

 
const loggerHandler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return target[prop];
    } else {
      console.error(`Property ${prop} does not exist`);
    }
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const sequenceData = {
  max: 10
};

const proxiedSequenceData = new Proxy(sequenceData, loggerHandler);

 
(async () => {
  print('Starting Fibonacci sequence generation:');
  await printFibonacciSequence(proxiedSequenceData.max);
  proxiedSequenceData.max = 15;  
  print('Extended Fibonacci sequence generation:');
  await printFibonacciSequence(proxiedSequenceData.max);
})();
