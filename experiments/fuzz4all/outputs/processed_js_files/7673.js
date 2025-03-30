 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  static async processDataAsync(data) {
     
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const processed = data.map(item => item ** 2);  
        resolve(processed);
      }, 1000);
    });
  }

  async enhancedProcess() {
    try {
      const squaredData = await DataProcessor.processDataAsync(this.data);
      const { sum, avg } = this.calculateStats(...squaredData);
      return { squaredData, sum, avg };
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  calculateStats(...numbers) {
    const sum = numbers.reduce((total, num) => total + num, 0);
    const avg = sum / numbers.length;
    return { sum, avg };
  }
}

 
(async () => {
  const initialData = [1, 2, 3, 4, 5];
  const processor = new DataProcessor(initialData);
  const { squaredData, sum, avg } = await processor.enhancedProcess();

  print('Squared Data:', squaredData);
  print('Sum of Squared Data:', sum);
  print('Average of Squared Data:', avg);
})();
