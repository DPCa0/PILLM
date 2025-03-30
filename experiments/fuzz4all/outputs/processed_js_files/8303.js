class AsyncCalculator {
  static async add(a, b) {
    return await Promise.resolve(a + b);
  }

  static async subtract(a, b) {
    return await Promise.resolve(a - b);
  }

  static async multiply(a, b) {
    return await Promise.resolve(a * b);
  }

  static async divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero");
    return await Promise.resolve(a / b);
  }
}

(async function complexCalculation() {
  try {
    const [sum, difference, product, quotient] = await Promise.all([
      AsyncCalculator.add(10, 5),
      AsyncCalculator.subtract(10, 5),
      AsyncCalculator.multiply(10, 5),
      AsyncCalculator.divide(10, 5)
    ]);

    const calculations = {
      sum,
      difference,
      product,
      quotient
    };

    print("Calculation results:", calculations);

    const keys = Object.keys(calculations);
    const values = Object.values(calculations);

     
    const [first, second, ...rest] = values;
    const mappedResults = keys.map((key, index) => ({ [key]: values[index] }));
    print("Mapped results with destructuring:", { first, second, rest, mappedResults });

     
    const proxyHandler = {
      get(target, prop) {
        print(`Accessed property: ${prop}, Value: ${target[prop]}`);
        return target[prop];
      }
    };

    const proxyCalculations = new Proxy(calculations, proxyHandler);
    print("Proxy access example:", proxyCalculations.sum, proxyCalculations.quotient);

  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();
