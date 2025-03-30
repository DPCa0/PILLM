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

 
const reactiveHandler = {
  set(target, property, value) {
    if (target[property] !== value) {
      target.emitter.emit(property, value);
      target[property] = value;
    }
    return true;
  }
};

const createReactiveObject = obj => {
  obj.emitter = new EventEmitter();
  return new Proxy(obj, reactiveHandler);
};

 
const person = createReactiveObject({ name: 'Alice', age: 25 });

person.emitter.on('name', newName => {
  print(`Name changed to ${newName}`);
});

person.emitter.on('age', newAge => {
  print(`Age changed to ${newAge}`);
});

 
person.name = 'Bob';
person.age = 26;

 
function* generatorFunction() {
  print('Generator started');
  const response = yield fetch('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched:', response);
}

const asyncIterator = generatorFunction();

async function runGenerator() {
  const { value } = asyncIterator.next();
  const response = await value;
  const data = await response.json();
  asyncIterator.next(data);
}

runGenerator();
