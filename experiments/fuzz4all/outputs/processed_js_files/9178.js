 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }
  
  async processData() {
    try {
      const results = await Promise.all(this.data.map(this.complexOperation));
      const filteredResults = results.filter(result => result !== null);
      print('Processed Results:', filteredResults);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  complexOperation(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const processed = Math.random() > 0.2 ? item * 2 : null;  
        processed !== null ? resolve(processed) : reject('Processing error');
      }, Math.random() * 1000);
    }).catch(err => {
      console.warn('Operation failed for item:', item, '-', err);
      return null;  
    });
  }

  static run() {
    const data = Array.from({ length: 10 }, (_, i) => i + 1);
    const processor = new DataProcessor(data);
    processor.processData();
  }
}

 
DataProcessor.run();
