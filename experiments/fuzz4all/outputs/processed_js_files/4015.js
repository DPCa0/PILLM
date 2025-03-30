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

const emitter = new EventEmitter();

 
async function* asyncGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve('Resolved after 1 second'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Resolved after 2 seconds'), 2000));
  yield new Promise(resolve => setTimeout(() => resolve('Resolved after 3 seconds'), 3000));
}

async function handleGenerator() {
  const gen = asyncGenerator();
  const results = [];

  for await (let result of gen) {
    results.push(result);
  }

  return results;
}

 
const monitoredArrayHandler = {
  get(target, property) {
    print(`Accessing ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const monitoredArray = new Proxy([], monitoredArrayHandler);

 
const uniqueSymbol = Symbol('unique');

 
const largeNumber = 1234567890123456789012345678901234567890n;

 
const complexKeyMap = new Map();
const key1 = {id: 1};
const key2 = {id: 2};
complexKeyMap.set(key1, 'value1');
complexKeyMap.set(key2, 'value2');

 
emitter.on('resultsReady', results => {
  print('Results are ready:', results);
});

(async () => {
   
  monitoredArray.push('a', 'b', 'c');
  monitoredArray[1] = 'modified b';
  print(monitoredArray);

   
  const results = await handleGenerator();
  emitter.emit('resultsReady', results);

   
  console.log('Complex Key