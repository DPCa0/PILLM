class ComplexOperation {
  static #privateMethod(a, b) {
    return a ** b;
  }
  
  async *generateNumbers(limit) {
    for (let i = 0; i <= limit; i++) {
      yield await new Promise(resolve => setTimeout(() => resolve(i), 100));
    }
  }

  async calculate(limit) {
    let results = [];
    for await (let num of this.generateNumbers(limit)) {
      let square = ComplexOperation.#privateMethod(num, 2);
      results.push({ number: num, square });
    }
    return results;
  }
}

const asyncHandler = async () => {
  const operation = new ComplexOperation();
  const results = await operation.calculate(5);
  
  print('Calculations:');
  console.table(results);
};

asyncHandler().catch(console.error);
