 
class MathOperations {
  constructor() {
    this.history = [];
  }

  add(a, b) {
    const result = a + b;
    this.history.push(`add(${a}, ${b}) = ${result}`);
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this.history.push(`subtract(${a}, ${b}) = ${result}`);
    return result;
  }
}

const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'history') {
      print('Accessed history');
    }
    return Reflect.get(...arguments);
  }
};

const proxiedMath = new Proxy(new MathOperations(), handler);

function* performCalculations() {
  yield proxiedMath.add(5, 10);
  yield proxiedMath.subtract(15, 7);
}

async function logCalculations() {
  const generator = performCalculations();
  for (let result of generator) {
    print(`Result: ${await Promise.resolve(result)}`);
  }
  print(`History: ${proxiedMath.history.join(' | ')}`);
}

logCalculations();
