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
  
  removeListener(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting '${prop}': ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Property '${prop}' not found`);
      return undefined;
    }
  },
  set(target, prop, value, receiver) {
    print(`Setting '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
user.name;  
user.age = 26;  
user.gender;  

 
const eventEmitter = new EventEmitter();

const listener = (msg) => print(`Received message: ${msg}`);

 
eventEmitter.on('greet', listener);

 
eventEmitter.emit('greet', 'Hello, world!');

 
eventEmitter.removeListener('greet', listener);

 
eventEmitter.emit('greet', 'This will not be logged');

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 