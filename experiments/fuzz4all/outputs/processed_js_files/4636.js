 
class ComplexCalculator {
  #pi = Math.PI;  

   
  [Symbol('calculateCircumference')](radius) {
    return 2 * this.#pi * radius;
  }

   
  calculate(radius) {
    const handler = {
      apply: (target, thisArg, argumentsList) => {
        const [r] = argumentsList;
        if (typeof r !== 'number' || r <= 0) {
          throw new Error("Radius must be a positive number");
        }
        return target.apply(thisArg, argumentsList);
      }
    };

    const circumference = this[Object.getOwnPropertySymbols(this)[0]];
    const proxy = new Proxy(circumference, handler);

    return proxy.call(this, radius);
  }

   
  static async calculatePiPrecision(decimalPlaces) {
    if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0) {
      throw new Error("Decimal places must be a non-negative integer");
    }
    const pi = await new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.PI.toFixed(decimalPlaces));
      }, 1000);
    });
    return pi;
  }
}

 
(async () => {
  const calculator = new ComplexCalculator();
  print("Circumference:", calculator.calculate(5));

  try {
    print("Circumference with invalid input:", calculator.calculate(-5));
  } catch (error) {
    console.error(error.message);
  }

  const precisePi = await ComplexCalculator.calculatePiPrecision(10);
  print("Pi with precision:", precisePi);
})();
