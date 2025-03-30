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

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
const person = {
  name: 'John Doe',
  age: 30
};

const personProxy = new Proxy(person, {
  get(target, property) {
    return property in target ? target[property] : `No such property as ${property}`;
  },
  set(target, property, value) {
    if (property === 'age' && (typeof value !== 'number' || value <= 0)) {
      throw new TypeError('Age must be a positive number');
    }
    target[property] = value;
    return true;
  }
});

 
const emitter = new EventEmitter();
emitter.on('greet', message => print(message));

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Data:', data);

    emitter.emit('greet', 'Hello, world!');
    print('Name:', personProxy.name);
    print('Age:', personProxy.age);

     
     
  } catch (error) {
    console.error('Error:', error);
  }
})();
