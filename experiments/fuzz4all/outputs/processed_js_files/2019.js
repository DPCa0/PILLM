class ComplexCalculator {
  #internalValue;

  constructor(value = 0) {
    this.#internalValue = value;
  }

  set value(val) {
    if (typeof val === 'number') {
      this.#internalValue = val;
    } else {
      throw new Error('Value must be a number');
    }
  }

  get value() {
    return this.#internalValue;
  }

  #logOperation(operation, result) {
    print(`Performed ${operation}, new value: ${result}`);
  }

  add(...nums) {
    this.#internalValue = nums.reduce((acc, num) => acc + num, this.#internalValue);
    this.#logOperation('addition', this.#internalValue);
    return this;
  }

  multiply(...nums) {
    this.#internalValue = nums.reduce((acc, num) => acc * num, this.#internalValue);
    this.#logOperation('multiplication', this.#internalValue);
    return this;
  }

  async fetchDataAndMultiply(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (typeof data.number !== 'number') throw new Error('Data must contain a number');
      this.multiply(data.number);
    } catch (error) {
      console.error('Fetch failed:', error);
    }
    return this;
  }

  static #complexFormula(x) {
    return Math.pow(x, 2) + Math.sin(x);
  }

  applyComplexFormula() {
    this.#internalValue = ComplexCalculator.#complexFormula(this.#internalValue);
    this.#logOperation('complex formula application', this.#internalValue);
    return this;
  }
}

 
const calc = new ComplexCalculator(5);
calc.add(4, 6).multiply(3).applyComplexFormula().fetchDataAndMultiply('https://api.example.com/data');
print(calc.value);
