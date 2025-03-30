 

 
const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Sample Data' });
    }, 1000);
  });
};

 
const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  },
};

 
class DataProcessor {
  #data;
  constructor() {
    this.#data = null;
  }

  async initialize() {
    this.#data = new Proxy(await fetchData(), dataHandler);
  }

  displayData() {
    print(`Data: ${this.#data.data}`);
  }
}

 
(async () => {
  const processTasks = async function* () {
    print('Initializing data processor...');
    const dataProcessor = new DataProcessor();
    yield dataProcessor.initialize();
    
    print('Displaying data...');
    yield dataProcessor.displayData();
  };

  for await (const task of processTasks()) {
    await task;
  }
})();
