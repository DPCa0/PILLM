class Calculator {
  #result = 0;

  constructor(value = 0) {
    this.#result = value;
  }

  add = (value) => (this.#result += value, this);
  subtract = (value) => (this.#result -= value, this);
  multiply = (value) => (this.#result *= value, this);
  divide = (value) => (this.#result /= value, this);

  getResult = () => this.#result;

  static async calculateAsync(calcFunc) {
    const delayedOperation = (fn) => new Promise((resolve) => setTimeout(() => resolve(fn()), 1000));
    const value = await delayedOperation(calcFunc);
    print("Async calculation result:", value);
    return value;
  }
}

const chainCalculate = async () => {
  const calc = new Calculator(10);
  calc.add(5).multiply(2).subtract(3).divide(2);
  print("Chained calculation result:", calc.getResult());

  await Calculator.calculateAsync(() => {
    const asyncCalc = new Calculator(20);
    return asyncCalc.add(30).subtract(10).multiply(3).divide(5).getResult();
  });
};

chainCalculate();
