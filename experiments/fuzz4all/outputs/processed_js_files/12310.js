 

class ComplexOperation {
  constructor(name) {
    this.name = name;
  }

   
  async performOperation() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      print(`Starting operation: ${this.name}`);

      const result = await Promise.all([
        this._asyncStep(1, delay),
        this._asyncStep(2, delay),
        this._asyncStep(3, delay)
      ]);

      print(`Operation ${this.name} completed with result:`, result);
    } catch (error) {
      console.error(`Error in operation ${this.name}:`, error);
    }
  }

  _asyncStep(stepNumber, delayFn) {
    return new Promise(async (resolve, reject) => {
      try {
        await delayFn(1000 * stepNumber);
        if (stepNumber === 2) throw new Error('Intentional step 2 error');
        resolve(`Step ${stepNumber} success`);
      } catch (error) {
        reject(`Step ${stepNumber} failed: ${error.message}`);
      }
    });
  }
}

const executeComplexOperations = async () => {
  const operations = [
    new ComplexOperation('A'),
    new ComplexOperation('B'),
    new ComplexOperation('C')
  ];

  for (const operation of operations) {
    await operation.performOperation();
  }
};

(async () => {
  await executeComplexOperations();
})();
