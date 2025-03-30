class MathOperation {
  #secretMultiplier = 42;  

  constructor(...values) {
    this.values = values;
  }

  *valueIterator() {
     
    for (let value of this.values) {
      yield value;
    }
  }

  async performOperations() {
     
    const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es/lodash.default.min.js');
    
     
    const sum = _.sum(this.values) ?? 0;
    
    return sum * this.#secretMultiplier;
  }

  static async performComplexMath(...values) {
    const operation = new MathOperation(...values);
    
    const iterator = operation.valueIterator();
    for (const value of iterator) {
      print(`Processing value: ${value}`);
    }

    const result = await operation.performOperations();
    print(`Final Result: ${result}`);
  }
}

(async () => {
   
  await MathOperation.performComplexMath(1, 2, 3, 4, 5);
})();
