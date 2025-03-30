 

 
class AdvancedCalculator {
  #result = 0;  

  constructor() {
    this.operations = [];
  }

  add(number) {
    this.#result += number;
    this.operations.push(`Add: ${number}`);
    return this;
  }

  subtract(number) {
    this.#result -= number;
    this.operations.push(`Subtract: ${number}`);
    return this;
  }

  multiply(number) {
    this.#result *= number;
    this.operations.push(`Multiply: ${number}`);
    return this;
  }

  divide(number) {
    if (number !== 0) {
      this.#result /= number;
      this.operations.push(`Divide: ${number}`);
    } else {
      console.error("Division by zero is not allowed.");
    }
    return this;
  }

  get result() {
    return this.#result;
  }

  getOperationHistory() {
    return this.operations;
  }

  static describe() {
    return "AdvancedCalculator can perform chained arithmetic operations.";
  }
}

 
const calculateArea = ({ width = 0, height = 0, ...rest }) => {
  print("Additional properties:", rest);
  return width * height;
};

 
async function* fetchNumbers() {
  const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
  for (const promise of promises) {
    yield await promise;
  }
}

 
(async () => {
  const advCalc = new AdvancedCalculator();
  advCalc.add(5).subtract(2).multiply(3).divide(2);
  print("Result:", advCalc.result);
  print("Operation History:", advCalc.getOperationHistory());
  print(AdvancedCalculator.describe());

  const area = calculateArea({ width: 5, height: 10, color: "red" });
  print("Area:", area);

  print("Fetched numbers:");
  for await (const number of fetchNumbers()) {
    print(number);
  }
})();
