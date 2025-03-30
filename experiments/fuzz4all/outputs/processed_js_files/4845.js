 
const { EventEmitter } = require('events');

 
async function fetchData() {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: 'Sample Data' }), 1000)
  );
}

 
class DataProcessor extends EventEmitter {
  constructor() {
    super();
    this.on('dataFetched', this.processData);  
  }

   
  async getData() {
    const data = await fetchData();
    this.emit('dataFetched', data);  
  }

   
  processData({ data }) {
    print(`Processing data: ${data}`);
    const processed = data.toUpperCase();
    this.emit('dataProcessed', processed);  
  }
}

 
const handler = {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Calling ${prop} with arguments: ${args}`);
        return target[prop](...args);
      };
    }
    return target[prop];
  }
};

 
const processor = new DataProcessor();
const proxyProcessor = new Proxy(processor, handler);

 
proxyProcessor.on('dataProcessed', (data) => {
  print(`Data has been processed: ${data}`);
});

 
proxyProcessor.getData();
