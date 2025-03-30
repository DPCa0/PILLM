 
class ComplexCalculator {
  #memory = 0;  

  constructor(initialValue = 0) {
    this.#setMemory(initialValue);
  }

  #setMemory(value) {  
    if (typeof value !== 'number') {
      throw new TypeError('Memory must be a number');
    }
    this.#memory = value;
  }

  add(...nums) {
    return nums.reduce((acc, num) => acc + num, this.#memory);
  }

  subtract(...nums) {
    return nums.reduce((acc, num) => acc - num, this.#memory);
  }

  get memory() {
    return this.#memory;
  }

  set memory(value) {
    this.#setMemory(value);
  }

  async computeExpression(expression) {
    const evaluate = async (expr) => {
      const func = new Function('return ' + expr);
      return await Promise.resolve(func());
    };
    this.#setMemory(await evaluate(expression));
    return this.#memory;
  }
}

 
(async () => {
  const calculator = new ComplexCalculator(10);
  print(`Initial memory: ${calculator.memory}`);

  print(`Add 5, 15: ${calculator.add(5, 15)}`);
  print(`Subtract 2, 3: ${calculator.subtract(2, 3)}`);

  calculator.memory = 50;
  print(`Updated memory: ${calculator.memory}`);

  try {
    print(`Compute expression "30 + 70 * 2": ${await calculator.computeExpression('30 + 70 * 2')}`);
  } catch (error) {
    console.error('Error computing expression:', error.message);
  }
})();
