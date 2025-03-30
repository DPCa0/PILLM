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

const asyncOp = (time, value) => new Promise(resolve => setTimeout(() => resolve(value), time));

async function* asyncGenerator() {
  yield await asyncOp(1000, 'First');
  yield await asyncOp(1000, 'Second');
  yield await asyncOp(1000, 'Third');
}

const executeAsyncTasks = async () => {
  const generator = asyncGenerator();
  for await (const val of generator) {
    print(val);
  }
};

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const eventEmitter = new EventEmitter();
eventEmitter.on('greet', debounce((name) => print(`Hello, ${name}!`), 2000));

executeAsyncTasks();

['Alice', 'Bob', 'Charlie'].forEach(name => eventEmitter.emit('greet', name));
