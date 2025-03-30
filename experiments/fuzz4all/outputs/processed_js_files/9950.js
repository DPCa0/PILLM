 
import { readFile } from 'fs/promises';

 
class DataProcessor {
  #data;
  
  constructor() {
    this.#data = [];
  }

  async loadData(filePath) {
    try {
      const fileContents = await readFile(filePath, 'utf-8');
      this.#data = JSON.parse(fileContents);
      this.#processData();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  #processData() {
    this.#data = this.#data.map(item => ({
      ...item,
      processed: true
    }));
    print('Data processed:', this.#data);
  }

  getData() {
    return this.#data;
  }
}

 
(async () => {
  const dataProcessor = new DataProcessor();
  
  await dataProcessor.loadData('./data.json');
  
  const processedData = dataProcessor.getData();
  processedData.forEach(({ id, name, processed }) => {
    print(`ID: ${id}, Name: ${name}, Processed: ${processed}`);
  });
})();

 
const handler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  apply(target, thisArg, argumentsList) {
    print(`Calling function with arguments: ${JSON.stringify(argumentsList)}`);
    return target.apply(thisArg, argumentsList);
  }
};

const loggedProcessor = new Proxy(new DataProcessor(), handler);

(async () => {
  await loggedProcessor.loadData('./data.json');
  const data = loggedProcessor.getData();
  print('Logged data:', data);
})();
