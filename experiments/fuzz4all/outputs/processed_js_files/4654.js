 
class ComplexCalculator {
  #result = 0;
  
  constructor() {
    this.#log('Initialized calculator.');
  }

  #log(message) {
    print(`[Log]: ${message}`);
  }

   
  add(...numbers) {
    this.#result = numbers.reduce((acc, num) => acc + num, this.#result);
    this.#log(`Added numbers: ${numbers.join(', ')}`);
    return this;
  }

  subtract(...numbers) {
    this.#result = numbers.reduce((acc, num) => acc - num, this.#result);
    this.#log(`Subtracted numbers: ${numbers.join(', ')}`);
    return this;
  }

  multiply(...numbers) {
    this.#result = numbers.reduce((acc, num) => acc * num, this.#result || 1);
    this.#log(`Multiplied numbers: ${numbers.join(', ')}`);
    return this;
  }

  divide(...numbers) {
    this.#result = numbers.reduce((acc, num) => acc / num, this.#result);
    this.#log(`Divided by numbers: ${numbers.join(', ')}`);
    return this;
  }
  
  getResult() {
    this.#log(`Current result: ${this.#result}`);
    return this.#result;
  }

   
  static createCalculatorProxy() {
    const handler = {
      get(target, prop) {
        if (prop in target) {
          return Reflect.get(target, prop);
        } else {
          console.warn(`Property ${prop} does not exist on target.`);
          return undefined;
        }
      }
    };
    return new Proxy(new ComplexCalculator(), handler);
  }
}

 
const calculator = ComplexCalculator.createCalculatorProxy();
calculator.add(10, 20, 30).subtract(5, 2).multiply(3).divide(2);
print(calculator.getResult());  
