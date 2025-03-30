 
async function* fetchData() {
  const responses = [
    { id: 1, data: 'Alpha' },
    { id: 2, data: 'Beta' },
    { id: 3, data: 'Gamma' }
  ];
  
  for (const response of responses) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield response;
  }
}

 
function createTrackedObject(target) {
  return new Proxy(target, {
    set(obj, prop, value) {
      print(`Property '${prop}' set to '${value}'`);
      obj[prop] = value;
      return true;
    },
    get(obj, prop) {
      print(`Accessing property '${prop}'`);
      return obj[prop];
    }
  });
}

 
class DataProcessor {
  #privateData = "Secret";

  constructor(data) {
    this.data = createTrackedObject(data);
  }

  #logPrivateData() {
    print(`Private Data: ${this.#privateData}`);
  }

  processData() {
    this.data.lastModified = new Date().toISOString();
    print('Processing data...');
    this.#logPrivateData();
  }
}

 
(async () => {
  const processor = new DataProcessor({ initial: 'value' });
  for await (const response of fetchData()) {
    print(`Fetched data: ${JSON.stringify(response)}`);
    processor.processData();
  }
})();
