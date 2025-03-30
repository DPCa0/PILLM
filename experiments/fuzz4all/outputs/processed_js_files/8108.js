 

 
class ComplexOperation {
  static description = 'Performs complex operations with various inputs.';
  
  constructor(...inputs) {
    this.inputs = inputs;
  }
  
   
  compute({ factor = 1, power = 2 } = {}) {
    return this.inputs.map(x => (x * factor) ** power);
  }
  
   
  static async *processData(data) {
    for (let item of data) {
      yield new Promise(resolve => setTimeout(() => resolve(item * 2), 100));
    }
  }
}

 
const createValidatedOperation = (operation) => {
  return new Proxy(operation, {
    construct(target, args) {
      if (args[0].some(x => typeof x !== 'number')) {
        throw new Error('All inputs must be numbers');
      }
      return new target(...args);
    }
  });
};

 
(async () => {
  const ValidatedOperation = createValidatedOperation(ComplexOperation);
  const operation = new ValidatedOperation(1, 2, 3, 4);

  print(`Description: ${ComplexOperation.description}`);

  const computedValues = operation.compute({ factor: 3, power: 3 });
  print(`Computed Values: ${computedValues}`);

  for await (let item of ComplexOperation.processData(computedValues)) {
    print(`Processed Item: ${item}`);
  }
})();
