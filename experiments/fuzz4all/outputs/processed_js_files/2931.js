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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

 
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property ${prop} does not exist.`);
    }
  }
};

const data = { message: "Hello, Proxy!" };
const proxyData = new Proxy(data, handler);

 
const eventEmitter = new EventEmitter();

const logData = async (url) => {
  try {
    const data = await fetchData(url);
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

eventEmitter.on('data', logData);
eventEmitter.emit('data', 'https://api.example.com/data');

 
try {
  print(proxyData.message);   
  print(proxyData.nonExistent);   
} catch (error) {
  console.error(error.message);
}
