class ComplexOperation {
  constructor(input) {
    this.input = input;
    this.processedData = new Proxy([], this.createHandler());
  }

  createHandler() {
    return {
      set(target, property, value) {
        if (typeof value !== 'number') {
          throw new TypeError('Only numbers are allowed');
        }
        target[property] = value;
        print(`Array updated: ${JSON.stringify(target)}`);
        return true;
      },
    };
  }

  async perform() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.input.reduce((acc, val) => acc + val ** 2, 0);
  }

  async execute() {
    try {
      const result = await this.perform();
      print(`Computed sum of squares: ${result}`);
      this.processedData.push(...this.input);
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  }
}

const dynamicCalculation = (async (values) => {
  const operation = new ComplexOperation(values);
  await operation.execute();
  return operation.processedData.filter((num) => num % 2 === 0);
})([1, 2, 3, 4, 5]);

dynamicCalculation.then((evenNumbers) => {
  print(`Even numbers: ${JSON.stringify(evenNumbers)}`);
});
