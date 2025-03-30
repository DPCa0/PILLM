 
const { EventEmitter } = require('events');

 
class Calculator {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
  }
}

 
async function asyncOperation(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value * 10), 1000));
}

 
async function calculateAsync() {
  try {
    const value = await asyncOperation(5);
    print(`Async Operation Result: ${value}`);
    print(`Sum: ${Calculator.add(value, 10)}`);
    print(`Difference: ${Calculator.subtract(value, 10)}`);
    print(`Product: ${Calculator.multiply(value, 2)}`);
    print(`Quotient: ${Calculator.divide(value, 5)}`);
  } catch (error) {
    console.error(error);
  }
}

 
const handler = {
  apply: (target, thisArg, argumentsList) => {
    print(`Method ${target.name} called with arguments: ${argumentsList}`);
    return target(...argumentsList);
  }
};

const proxiedCalculator = new Proxy(Calculator, {
  get: (target, prop) => {
    if (typeof target[prop] === 'function') {
      return new Proxy(target[prop], handler);
    }
    return target[prop];
  }
});

 
const eventEmitter = new EventEmitter();

eventEmitter.on('calculate', async () => {
  await calculateAsync();
  print('Calculation complete.');
});

 
eventEmitter.emit('calculate');
