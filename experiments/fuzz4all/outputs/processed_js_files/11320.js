 

class EventEmitter {
  constructor() {
    this.events = {};
    this.uniqueId = Symbol();  
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push({ listener, id: Symbol() });
  }

  off(event, id) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(listenerObj => listenerObj.id !== id);
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listenerObj => listenerObj.listener(...args));
    }
  }

  once(event, listener) {
    const id = Symbol();
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, id);
    };
    this.on(event, { listener: onceWrapper, id });
  }
}

 
const targetObject = { name: 'John Doe', age: 30 };

const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}: ${Reflect.get(...arguments)}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const proxy = new Proxy(targetObject, handler);

const emitter = new EventEmitter();

emitter.on('greet', message => print(`Greeting: ${message}`));
emitter.emit('greet', 'Hello, world!');   

 
proxy.name = 'Jane Doe';
print(proxy.name);

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

 
 
 
 
 
