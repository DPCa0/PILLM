 
class ComplexCalculator {
  #history = [];  

  constructor(initialValue = 0) {
    this.currentValue = initialValue;
  }

   
  #logOperation(type, value) {
    this.#history.push({ type, value, timestamp: new Date().toISOString() });
  }

  add(value) {
    this.currentValue += value;
    this.#logOperation('add', value);
    return this;
  }

  subtract(value) {
    this.currentValue -= value;
    this.#logOperation('subtract', value);
    return this;
  }

  multiply(value) {
    this.currentValue *= value;
    this.#logOperation('multiply', value);
    return this;
  }

  divide(value) {
    if (value === 0) throw new Error('Division by zero');
    this.currentValue /= value;
    this.#logOperation('divide', value);
    return this;
  }

   
  static createRandomCalculator() {
    const randomValue = Math.floor(Math.random() * 100);
    return new ComplexCalculator(randomValue);
  }

   
  *history() {
    yield* this.#history;
  }

   
  ['compute' + 'Advanced'](operations) {
    for (const [op, val] of operations) {
      this[op](val);
    }
    return this.currentValue;
  }

   
  [Symbol.iterator]() {
    return this.history();
  }
}

 

(async () => {
  const calc = ComplexCalculator.createRandomCalculator();
  const operations = [
    ['add', 10],
    ['multiply', 2],
    ['subtract', 5],
    ['divide', 3],
  ];

  print('Current Value:', calc.computeAdvanced(operations));  

   
  for (const entry of calc) {
    print(`Operation: ${entry.type}, Value: ${entry.value}, Timestamp: ${entry.timestamp}`);
  }

   
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Final Value:',