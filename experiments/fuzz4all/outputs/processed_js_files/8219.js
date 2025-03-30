class ComplexOperation {
  constructor() {
    this.value = 0;
  }

  async performOperation() {
    this.value = await this.complexCalculation();
    return this;
  }

  complexCalculation() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(Math.random() * 1000), 1000);
    });
  }
}

function* generatorFunction(limit) {
  let i = 0;
  while (i < limit) {
    yield i++;
  }
}

(async () => {
  try {
    const operation = await new ComplexOperation().performOperation();
    print(`Initial Computed Value: ${operation.value.toFixed(2)}`);

    const generator = generatorFunction(5);
    for (let value of generator) {
      const sum = (a, b) => a + b;
      const values = [operation.value, value * 100];
      print(`Sum of ${values[0].toFixed(2)} and ${values[1]}: ${sum(...values).toFixed(2)}`);
    }

    const transformedValues = await Promise.all(
      Array.from(generatorFunction(5), async (x) => {
        return x % 2 === 0 ? x * 2 : x * 3;
      })
    );

    print(`Transformed Values: ${transformedValues.join(', ')}`);
  } catch (error) {
    console.error(`Error encountered: ${error.message}`);
  }
})();
