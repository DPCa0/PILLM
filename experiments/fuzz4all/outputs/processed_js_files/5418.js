class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const validatedData = await this.validateData();
      const transformedData = this.transformData(validatedData);
      const result = this.calculateResult(transformedData);
      print(`Processed Result: ${result}`);
    } catch (error) {
      console.error(`Error processing data: ${error.message}`);
    }
  }

  validateData() {
    return new Promise((resolve, reject) => {
      if (this.data && Array.isArray(this.data)) {
        resolve(this.data.filter(item => typeof item === 'number'));
      } else {
        reject(new Error("Invalid data format"));
      }
    });
  }

  transformData(validData) {
    return validData.map(num => num * 2);
  }

  calculateResult(transformedData) {
    return transformedData.reduce((acc, val) => acc + val, 0);
  }
}

const sampleData = [1, 'two', 3, 4, null, 5];
const processor = new DataProcessor(sampleData);
processor.processData();
