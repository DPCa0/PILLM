class ComplexOperation {
  constructor(...nums) {
    this.numbers = nums;
  }

  static #privateMethod(x) {
    return x * x;
  }

  #logTransform() {
    print("Transforming numbers: ", this.numbers);
  }

  async processNumbers() {
    this.#logTransform();
    const transformed = this.numbers
      .filter(n => n > 0)
      .map(n => ComplexOperation.#privateMethod(n));

    const result = await Promise.all(transformed.map(n => this.#expensiveOperation(n)));
    return result.reduce((acc, val) => acc + val, 0);
  }

  #expensiveOperation(num) {
    return new Promise(resolve => {
      setTimeout(() => resolve(num + 42), 100);
    });
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(...arguments);
    } else {
      print(`Property ${prop} does not exist.`);
      return undefined;
    }
  }
};

(async () => {
  const proxyOperation = new Proxy(new ComplexOperation(1, 2, -3, 4), handler);
  const sum = await proxyOperation.processNumbers();
  print("Sum of processed numbers:", sum);

   
  print(proxyOperation.numbers);     
  print(proxyOperation.nonExistent);  
})();
