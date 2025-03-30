 

class ComplexCalculator {
  constructor() {
     
    this.result = 0;
  }

  async performOperations(operations) {
     
    const results = await Promise.all(operations.map(op => op()));
    return results.reduce((acc, val) => acc + val, 0);
  }
}

function delayOperation(value, delay) {
  return () =>
    new Promise(resolve => setTimeout(() => resolve(value), delay));
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

(async () => {
  const calculator = new Proxy(new ComplexCalculator(), handler);

  calculator.result = await calculator.performOperations([
    delayOperation(5, 1000),
    delayOperation(10, 1500),
    delayOperation(20, 500)
  ]);

  print(`Final Result: ${calculator.result}`);
})();
