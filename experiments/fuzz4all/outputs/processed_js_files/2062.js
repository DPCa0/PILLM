 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new CustomError(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch data error:', error);
    throw new CustomError('Failed to fetch data');
  }
}

 
const handler = {
  get: function(target, property) {
    return property in target ? target[property] : `Property "${property}" not found.`;
  }
};

const data = { key1: 'value1', key2: 'value2' };
const proxyData = new Proxy(data, handler);

 
const { key1, ...rest } = proxyData;
print(key1);  
print(rest);  

 
const EVENT_SYMBOL = Symbol('event');
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.on(EVENT_SYMBOL, (message) => {
  print('Event received:', message);
});

 
eventEmitter.emit(EVENT_SYMBOL, 'Hello, EventEmitter!');

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  try {
    const fetchedData = await fetchData(url);
    print('Fetched Data:', fetchedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
