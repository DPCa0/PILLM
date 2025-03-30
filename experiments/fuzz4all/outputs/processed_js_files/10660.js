class ComplexOperation {
  constructor(iterations) {
    this.iterations = iterations;
  }

  static async fetchData() {
    const response = await fetch('https://api.publicapis.org/entries');
    const data = await response.json();
    return data.entries.map(entry => entry.Description);
  }

  execute() {
    return new Promise((resolve) => {
      let result = 0;
      for (let i = 0; i < this.iterations; i++) {
        result += Math.sin(i) * Math.cos(i);
      }
      resolve(result);
    });
  }
}

(async () => {
  try {
    const data = await ComplexOperation.fetchData();
    print('Fetched Descriptions:', data.slice(0, 5));

    const operation = new ComplexOperation(1e6);
    const result = await operation.execute();
    print('Complex Operation Result:', result);

    const reducedValue = data.reduce((acc, desc) => acc + desc.length, 0);
    print('Total Description Length:', reducedValue);
  } catch (error) {
    console.error('Error:', error);
  }
})();
