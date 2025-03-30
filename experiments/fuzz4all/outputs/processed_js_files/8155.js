class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
  
  off(event, listenerToRemove) {
    if (this.events.has(event)) {
      this.events.set(event, 
        this.events.get(event).filter(listener => listener !== listenerToRemove));
    }
  }
}

 
function createObservableObject(obj, callback) {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    set(target, property, value, receiver) {
      const oldValue = target[property];
      const success = Reflect.set(target, property, value, receiver);
      if (success && oldValue !== value) callback(property, value, oldValue);
      return success;
    }
  };
  return new Proxy(obj, handler);
}

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const UNIQUE_KEY = Symbol('unique');
const objectWithUniqueKey = {
  [UNIQUE_KEY]: 'This is unique!'
};

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
const eventEmitter = new EventEmitter();
eventEmitter.on('data', (newData) => print('Data received:', newData));

const data = { count: 0 };
const observableData = createObservableObject(data, (prop, newVal, oldVal) =>
  print(`Property '${prop}' changed from ${oldVal} to ${newVal}`));

observableData.count = 1;  

const fib = fibonacci();
print(fib.next().value);  
console