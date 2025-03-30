class ComplexCalc {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  async performCalculations(...operations) {
    for (const op of operations) {
      try {
        this.value = await op(this.value);
      } catch (err) {
        console.error('Operation failed:', err);
      }
    }
    return this.value;
  }
}

function multiply(factor) {
  return async (val) => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));  
    return val * factor;
  };
}

function add(term) {
  return async (val) => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));  
    return val + term;
  };
}

function subtract(term) {
  return async (val) => {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));  
    return val - term;
  };
}

(async () => {
  const calc = new ComplexCalc(10);

  const operations = [
    multiply(2),
    add(5),
    subtract(3),
    multiply(4),
  ];

  const result = await calc.performCalculations(...operations);

  print('Final Result:', result);
})();
