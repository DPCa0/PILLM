 
class DataProcessor {
  #data;
  #logger;

  constructor(data) {
    this.#data = data;
    this.#logger = new Logger();
  }

  #processData() {
    return this.#data
      .filter(item => item.active)
      .map(item => ({ ...item, processed: true }));
  }

  async run() {
    try {
      const processedData = this.#processData();
      this.#logger.log("Data processed successfully.");
      
      for await (let result of this.#fetchAdditionalData(processedData)) {
        this.#logger.log(result);
      }
      
    } catch (error) {
      this.#logger.log("Error processing data: " + error.message);
    }
  }

  async *#fetchAdditionalData(data) {
    for (const item of data) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield `Fetched additional data for item: ${item.id}`;
    }
  }
}

class Logger {
  log(message) {
    print(`[${new Date().toISOString()}]: ${message}`);
  }
}

 
const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property "${prop}" doesn't exist.`);
      return undefined;
    }
  },
};

const rawData = [
  { id: 1, name: 'Item 1', active: true },
  { id: 2, name: 'Item 2', active: false },
  { id: 3, name: 'Item 3', active: true }
];

const proxiedData = new Proxy(rawData, dataHandler);
const processor = new DataProcessor(proxiedData);

 
processor.run();
