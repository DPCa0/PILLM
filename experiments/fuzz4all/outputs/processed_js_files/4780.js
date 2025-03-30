class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listenerToRemove) {
    if (!this.#events.has(event)) return;
    const listeners = this.#events.get(event).filter(listener => listener !== listenerToRemove);
    if (listeners.length > 0) {
      this.#events.set(event, listeners);
    } else {
      this.#events.delete(event);
    }
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }
  
  async greet() {
    print(`Hello, my name is ${this.name}.`);
    const data = await this.#fetchData();
    print(data);
  }
  
  async #fetchData() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(500);  
    return `Async data fetched for ${this.name}`;
  }
}

const emitter = new EventEmitter();

const greetListener = personName => {
  const person = new Person(personName);
  person.greet();
};

emitter.on('greet', greetListener);

const names = ['Alice', 'Bob', 'Charlie'];
names.forEach(name => emitter.emit('greet', name));

 
emitter.off('greet', greetListener);

 
emitter.emit('greet', 'Dana');
emitter.emit('greet', 'Eve');
