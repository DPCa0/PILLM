class AdvancedCalculator {
  constructor() {
    this.operations = [];
  }
  
  addOperation(func) {
    this.operations.push(func);
  }
  
  async calculate(input) {
    for (const operation of this.operations) {
      input = await operation(input);
    }
    return input;
  }
}

const calculator = new AdvancedCalculator();

calculator.addOperation(async (input) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return input * 2;
});

calculator.addOperation((input) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(input + 10), 100);
  });
});

calculator.addOperation(async (input) => {
  return (await Promise.resolve(input / 2));
});

(async () => {
  const result = await calculator.calculate(5);
  print(`The result of the advanced calculation is: ${result}`);
})();
