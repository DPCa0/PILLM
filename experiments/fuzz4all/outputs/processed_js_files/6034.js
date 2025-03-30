class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

 
const dataHandler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting value of ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error(`${prop} does not exist`));
        }, 1000);
      });
    }
  }
};

const data = new Proxy({ name: 'JavaScript', type: 'Language' }, dataHandler);

const loadData = async () => {
  try {
    print(await data.name);   
    print(await data.unknown);   
  } catch (error) {
    console.error(error.message);
  }
};

 
const uniqueID = Symbol('id');
const objectWithSymbol = { [uniqueID]: 12345, description: 'A unique object' };

print(objectWithSymbol[uniqueID]);  
print(Object.keys(objectWithSymbol));  

 
const emitter = new EventEmitter();

const onDataReceived = (data) => {
  print(`Data received: ${data}`);
};

emitter.on('data', onDataReceived);
emitter.emit('data', 'Hello, World!');

loadData();
