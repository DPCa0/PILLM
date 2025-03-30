 
const handler = {
  get(target, propKey, receiver) {
    const origMethod = target[propKey];
    return function (...args) {
      print(`Method ${propKey} was called with arguments: ${JSON.stringify(args)}`);
      return origMethod.apply(this, args);
    };
  }
};

 
class Calculator {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }
}

 
const calculator = new Proxy(new Calculator(), handler);

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
async function asyncOperation() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Async operation completed');
    }, 1000);
  });

  const result = await promise;
  print(result);
}

 
const { log } = console;
const [first, second, ...rest] = [1, 2, 3, 4, 5];
log(`First: ${first}, Second: ${second}, Rest: ${rest}`);

const newNumbers = [0, ...rest];
log(`New numbers with spread: ${newNumbers}`);

 
log(`Add: ${calculator.add(3, 4)}`);
log(`Multiply: ${calculator.multiply(5, 6)}`);

 
const fibGen = fibonacci();
log(`Fibonacci sequence: ${fibGen.next().value}, ${fibGen.next().value}, ${fibGen.next().value}`);

 
asyncOperation();
