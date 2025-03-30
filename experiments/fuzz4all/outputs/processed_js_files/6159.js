 
const EventEmitter = require('events');

 
class ComplexSystem extends EventEmitter {
  constructor() {
    super();
    this.data = new Map();
  }

   
  *fetchData(key) {
    let count = 0;
    while (count < 3) {
      yield new Promise(resolve => setTimeout(() => {
        count++;
        resolve(`Data_${key}_${count}`);
      }, 1000));
    }
  }

   
  async populateData(key) {
    const dataGenerator = this.fetchData(key);
    for await (let data of dataGenerator) {
      this.data.set(key, data);
      this.emit('dataUpdated', { key, data });
    }
  }
}

 
const system = new ComplexSystem();
system.on('dataUpdated', ({ key, data }) => {
  print(`Updated ${key}: ${data}`);
});

 
const handler = {
  get(target, prop) {
    if (target.data.has(prop)) {
      return target.data.get(prop);
    } else {
      print(`No data for ${prop}, fetching now...`);
      target.populateData(prop);
      return 'Fetching...';
    }
  }
};

const proxySystem = new Proxy(system, handler);

 
print(proxySystem['Item1']);
setTimeout(() => print(proxySystem['Item1']), 4000);   
