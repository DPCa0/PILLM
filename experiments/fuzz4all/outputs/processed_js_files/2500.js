 
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

 
const handler = {
  get(target, property) {
    return property in target ? target[property] : `Property ${property} not found`;
  },
  set(target, property, value) {
    if (typeof value === 'number' && value > 0) {
      target[property] = value;
      return true;
    }
    throw new Error('Value must be a positive number');
  }
};

const obj = new Proxy({}, handler);

 
async function simulateAsyncOperation() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  print('Async operation completed');
}

 
const eventEmitter = new EventEmitter();

 
eventEmitter.on('greet', name => print(`Hello, ${name}!`));
eventEmitter.on('farewell', name => print(`Goodbye, ${name}.`));

 
(async function main() {
   
  eventEmitter.emit('greet', 'Alice');
  eventEmitter.emit('farewell', 'Bob');
  
   
  try {
    obj.value = 42;
    print(obj.value);  
    print(obj.nonexistent);  
  } catch (error) {
    print(error.message);
  }

   
  await simulateAsyncOperation();
})();
