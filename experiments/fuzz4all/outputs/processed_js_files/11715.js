 
const EventEmitter = require('events');

 
class ComplexSystem extends EventEmitter {
  constructor() {
    super();
    this.state = new Proxy({}, this.createHandler());  
  }
  
  createHandler() {
    return {
      set: (target, key, value) => {
        target[key] = value;
        this.emit('stateChange', { [key]: value });
        return true;
      }
    };
  }
  
  async processItems(items) {
    for await (const item of this.streamItems(items)) {
      print(`Processing item: ${item}`);
    }
  }
  
  async *streamItems(items) {
    for (const item of items) {
      yield new Promise(resolve => setTimeout(() => resolve(item), 1000));  
    }
  }
}

 
const system = new ComplexSystem();

 
system.on('stateChange', (newState) => {
  print(`State changed: ${JSON.stringify(newState)}`);
});

 
system.state.mode = 'init';
system.state.status = 'active';

 
const items = ['task1', 'task2', 'task3'];
system.processItems(items).then(() => {
  system.state.status = 'completed';
});
