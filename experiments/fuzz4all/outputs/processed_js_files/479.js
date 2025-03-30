 
class AdvancedCalculator {
  #memory = 0;  

  constructor(initialValue = 0) {
    this.currentValue = initialValue;
  }

   
  static #validateNumber(value) {
    if (typeof value !== 'number') {
      throw new TypeError('Input must be a number');
    }
  }

   
  add(value) {
    AdvancedCalculator.#validateNumber(value);
    this.currentValue += value;
    return this;
  }

   
  subtract(value) {
    AdvancedCalculator.#validateNumber(value);
    this.currentValue -= value;
    return this;
  }

   
  #saveToMemory() {
    this.#memory = this.currentValue;
  }

   
  recallFromMemory() {
    this.currentValue = this.#memory;
    return this;
  }

   
  getValue() {
    return this.currentValue;
  }

   
  async calculateAsync(operations, delay = 1000) {
    for (const { op, val } of operations) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      this[op](val);
    }
    this.#saveToMemory();
    return this;
  }
}

 
(async () => {
  try {
    const calc = new AdvancedCalculator(10);
    await calc.calculateAsync([{ op: 'add', val: 5 }, { op: 'subtract', val: 3 }]);
    print(`Result: ${calc.getValue()}`);  
    calc.recallFromMemory().add(8);
    print(`Final Result: ${calc.getValue()}`);  
  } catch (error) {
    console.error(error);
  }
})();
