 
const { EventEmitter } = require('events');

 
async function* fetchData() {
  const data = ['First', 'Second', 'Third'];
  for (const item of data) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield item;
  }
}

 
const privateDataKey = Symbol('privateData');

class AdvancedProcessor extends EventEmitter {
  constructor() {
    super();
     
    this[privateDataKey] = [];
  }

   
  async processData() {
    for await (const item of fetchData()) {
      this[privateDataKey].push(item.toUpperCase());
      this.emit('dataProcessed', item);
    }
    this.emit('processingComplete', this[privateDataKey]);
  }
}

 
function observeProcessing(processor) {
  const handler = {
    get(target, prop, receiver) {
      if (prop === 'emit') {
        return function (event, ...args) {
          print(`Event emitted: ${event}`, ...args);
          return Reflect.apply(target[prop], target, [event, ...args]);
        };
      }
      return Reflect.get(target, prop, receiver);
    }
  };
  return new Proxy(processor, handler);
}

 
const processor = observeProcessing(new AdvancedProcessor());

 
processor.on('dataProcessed', (item) => {
  print(`Data processed: ${item}`);
});

processor.on('processingComplete', (data) => {
  print('Processing complete:', data);
});

 
processor.processData();
