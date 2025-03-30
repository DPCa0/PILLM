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
  
  off(event, listenerToRemove) {
    if (this.events.has(event)) {
      const listeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
      this.events.set(event, listeners);
    }
  }
}

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
  
  const { data } = await response.json();
  return data;
}

 
const person = { name: 'Alice', age: 25 };

const handler = {
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const personProxy = new Proxy(person, handler);

personProxy.name = 'Bob';
personProxy.age = 30;

 
(async () => {
  const emitter = new EventEmitter();
  
  const logData = data => print(`Received data: ${data}`);
  emitter.on('dataReceived', logData);
  
  try {
    const data = await fetchData('https://api.example.com/data');
    emitter.emit('dataReceived', data);
  } catch (error) {
    console.error(error);
  } finally {
    emitter.off('dataReceived', logData);
  }
})();
