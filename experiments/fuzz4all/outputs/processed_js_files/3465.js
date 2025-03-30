 
import fs from 'fs/promises';

 
class DataProcessor {
  #data = [];

  constructor(initialData) {
    this.#data = initialData;
  }

  async #loadDataFromFile(filePath) {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      this.#data = JSON.parse(data);
      print('Data loaded successfully.');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  #transformData() {
    return this.#data.map(item => ({
      ...item,
      processed: true,
      timestamp: new Date().toISOString()
    }));
  }

  processData() {
    const transformedData = this.#transformData();
    print('Processed Data:', transformedData);
  }

  async init(filePath) {
    await this.#loadDataFromFile(filePath);
    this.processData();
  }
}

 
const initialData = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 }
];

 
const processor = new DataProcessor(initialData);
processor.init('./data.json');

 
async function* asyncGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 100));
  }
}

 
(async () => {
  print('Async Generator Start:');
  for await (const num of asyncGenerator(1, 5)) {
    print(num);
  }
  print('Async Generator End.');
})();
