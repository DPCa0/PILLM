 
const EventEmitter = require('events');

 
class ComplexSystem extends EventEmitter {
  constructor() {
    super();
    this.data = new Map();  
  }

   
  async fetchData(key) {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        const value = this.data.get(key);
        resolve(value);
      }, 1000);
    });
  }

   
  getDataProxy() {
    return new Proxy(this.data, {
      get: (target, property) => {
        print(`Accessing key: ${property}`);
        return target[property];
      },
    });
  }

   
  *processData() {
    yield 'Step 1: Initialize';
    yield 'Step 2: Process';
    yield 'Step 3: Complete';
  }
}

 
const system = new ComplexSystem();

 
system.data.set('key1', 'value1');
system.data.set('key2', 'value2');

 
const dataProxy = system.getDataProxy();

 
system.on('dataFetched', (key, value) => {
  print(`Data fetched for ${key}: ${value}`);
});

 
(async () => {
  const key = 'key1';
  const value = await system.fetchData(key);
  system.emit('dataFetched', key, value);
})();

 
const processor = system.processData();
for (let step of processor) {
  print(step);
}
